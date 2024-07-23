import express from "express";
import cors from 'cors';
import serverless from "serverless-http"
import * as db from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error("Error", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message,
  });

  res.status(500).send("Something broke!");
});

app.get("/", async(req,res) => {
  res.send("<h1>Attendance API</h1>")
})

//get request for individual teacher using id
//not sure if we actually need this?
app.get("/read/teacher/:id", async (req, res) => {
  const id = req.params.id;
  const teacher = await db.getTeacherID(id);
  res.send(teacher);
});

//get request for teacher using email
app.get("/read/teacher/email/:email", async (req, res) => {
  const email = req.params.email;
  const teacher = await db.getTeacherEmail(email);
  res.send(teacher);
});

//get request for teacher's classes
app.get("/read/class/:teacher", async (req, res) => {
  const teacherID = req.params.teacher;
  const Class = await db.getTeachersClasses(teacherID);
  res.send(Class);
});

//get students in a class
app.get("/read/students/:classID", async (req, res) => {
  const classID = req.params.classID;
  const students = await db.getStudentsInClass(classID);
  res.send(students);
});

//get a students attendance for a class
app.get("/read/attendance/:studentID/:classID", async (req, res) => {
  const studentID = req.params.studentID;
  const classID = req.params.classID;
  const attendance = await db.getStudentAttendance(studentID, classID);
  res.send(attendance);
});

//get a class attendance
app.get("/read/attendance/:classID", async (req, res) => {
  const classID = req.params.classID;
  const attendance = await db.getClassAttendance(classID);
  res.send(attendance);
});

//create a teacher
app.post("/create/teacher", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const teacher = await db.createTeacher(
    first_name,
    last_name,
    email,
    password
  );
  res.status(201).send(teacher);
});

//create a class
app.post("/create/class", async (req, res) => {
  const { class_name, teacher_id } = req.body;
  const teacher = await db.createClass(class_name, teacher_id);
  res.status(201).send(teacher);
});

//create a student
app.post("/create/student", async (req, res) => {
  const { first_name, last_name, class_id } = req.body;
  const student = await db.createStudent(first_name, last_name, class_id);
  res.status(201).send(student);
});

//create an attendance record
app.post("/create/attendance", async (req, res) => {
  const { student_id, class_id, teacher_id, date, status } = req.body;
  const attendance = await db.createAttendance(student_id, class_id, teacher_id, date, status);
  res.status(201).send(attendance);
});

//deletes a student record according to their studentID
app.delete("/delete/student/:studentId", async (req,res) => {
  const student_id = req.params.studentId;
  const del = await db.deleteStudent(student_id);
  res.end();
});

//delete a class and all the students in it
//there is no reason to store students record if they are no longer in their associated class
app.delete("/delete/class/:classId", async (req,res) => {
  const class_id = req.params.classId;
  const delStudents = await db.deleteStudentsInClass(class_id);
  const delClass = await db.deleteClass(class_id);
  res.end();
});

// dev only
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

//for lambda aws hosting
// export const handler = serverless(app)
