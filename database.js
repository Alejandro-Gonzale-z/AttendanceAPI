import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//retrieves all teachers
export async function getTeachers() {
  const [result] = await pool.query("SELECT * FROM teachers");
  return result;
}

//retrieves all classes
export async function getClasses() {
  const [result] = await pool.query("SELECT * FROM class");
  return result;
}

//retrieves all students
export async function getStudents() {
  const [result] = await pool.query("SELECT * FROM students");
  return result;
}

//retrieves a specific teacher using their email
//sign in helper
export async function getTeacherEmail(email) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM teachers 
        WHERE email = ?`,
    [email]
  );
  return result;
}

//retrieves a specific teacher using their ID
export async function getTeacherID(id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM teachers 
        WHERE id = ?`,
    [id]
  );
  return result;
}

//retrieves all classes a teacher has
export async function getTeachersClasses(id) {
  const [result] = await pool.query(
    `SELECT * 
        FROM class 
        WHERE teacher_id = ?
    `,
    [id]
  );
  return result;
}

//retrieves a specific class
export async function getClass(id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM class 
        WHERE class_id = ?
    `,
    [id]
  );
  return result;
}

export async function getTeacherClasses(teacher_id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM class
        WHERE teacher_id = ? 
    `,
    [teacher_id]
  );
  return result;
}

//retrieves a specific student
export async function getStudent(id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM students 
        WHERE student_id = ?`,
    [id]
  );
  return result;
}

//retrieves all students in a class using class_id
export async function getStudentsInClass(id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM students 
        where class_id = ?
        `,
    [id]
  );
  return result;
}

//retrieves an attendance record using ID
export async function getAttendance(id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM attendance
        where attendance_id = ?
    `,
    [id]
  );
  return result;
}

//retrieves all attendance records for a student in a specific class
export async function getStudentAttendance(student_id, class_id) {
  const [result] = await pool.query(
    `
        SELECT * 
        FROM ATTENDANCE 
        WHERE student_id = ? AND class_id = ?     
    `,
    [student_id, class_id]
  );
  return result;
}

//retrieves the attendance records of an entire class
export async function getClassAttendance(class_id) {
  const [result] = await pool.query(
    `
        SELECT *
        FROM ATTENDANCE
        WHERE class_id = ?    
    `,
    [student_id, class_id]
  );
  return result;
}

//creates a teacher
export async function createTeacher(first_name, last_name, email, password) {
  const result = await pool.query(
    `
        INSERT INTO teachers (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)        
        `,
    [first_name, last_name, email, password]
  );
  const id = result.insertId;
  return getTeacher(id);
}

//create a class
export async function createClass(class_name, teacher_id) {
  const result = await pool.query(
    `
        INSERT INTO class (class_name, teacher_id)
        VALUES (?, ?)
        `,
    [class_name, teacher_id]
  );
  const id = result.insertId;
  return getClass(id);
}

//creates student
export async function createStudent(first_name, last_name, class_id) {
  const result = await pool.query(
    `
        INSERT INTO students (first_name, last_name, class_id)
        VALUES (?, ?, ?)
        `,
    [first_name, last_name, class_id]
  );
  const id = result.insertId;
  return getStudent(id);
}

//creates attendance for a student
export async function createAttendance(student_id, class_id, date, status) {
  const result = await pool.query(
    `
        INSERT INTO attendance (student_id,class_id,date,status)
        VALUES (?, ?, ?, ?)
        `,
    [student_id, class_id, date, status]
  );
  const id = result.insertId;
  return getAttendance(id);
}

const result = await getStudentsInClass(1);
console.log(result);
