import express from "express";
import serverless from "serverless-http"
import * as db from "./database.js";

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error("Error", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message,
  });

  res.status(500).send("Something broke!");
});

//get request for individual teacher using id
//not sure if we actually need this?
app.get("/teacher/:id", async (req, res) => {
  const id = req.params.id;
  const teacher = await db.getTeacherID(id);
  res.send(teacher);
});

//get request for teacher using email
app.get("/teacher/email/:email", async (req, res) => {
  const email = req.params.email;
  const teacher = await db.getTeacherEmail(email);
  res.send(teacher);
});

//get request for teacher's classes
app.get("/class/:teacher", async (req, res) => {
  const teacherID = req.params.teacher;
  const Class = await db.getTeachersClasses(teacherID);
  res.send(Class);
});

//get students in a class
app.get("/students/:classID", async (req, res) => {
  const classID = req.params.classID;
  const students = await db.getStudentsInClass(classID);
  res.send(students);
});

//get a students attendance for a class
app.get("/attendance/:studentID/:classID", async (req, res) => {
  const studentID = req.params.studentID;
  const classID = req.params.classID;
  const attendance = await db.getStudentAttendance(studentID, classID);
  res.send(attendance);
});

//get a class attendance
app.get("/attendance/:classID", async (req, res) => {
  const classID = req.params.classID;
  const attendance = await db.getClassAttendance(classID);
  res.send(attendance);
});

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

app.post("/create/class", async (req, res) => {
  const { class_name, teacher_id } = req.body;
  const teacher = await db.createClass(class_name, teacher_id);
  res.status(201).send(teacher);
});

app.post("/create/student", async (req, res) => {
  const { first_name, last_name, class_id } = req.body;
  const student = await db.createStudent(first_name, last_name, class_id);
  res.status(201).send(student);
});

app.post("/create/attendance", async (req, res) => {
  const { student_id, class_id, date, status } = req.body;
  const teacher = await db.createAttendance(student_id, class_id, date, status);
  res.status(201).send(teacher);
});

//dev only
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// module.exports.handler = serverless(app)
