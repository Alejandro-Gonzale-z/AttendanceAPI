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
        WHERE teacher_id = ?`,
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
        FROM attendance 
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
        FROM attendance
        WHERE class_id = ?    
    `,
    [class_id]
  );
  return result;
}

//creates a teacher
export async function createTeacher(first_name, last_name, email, password) {
  const [result] = await pool.query(
    `
        INSERT INTO teachers (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)        
        `,
    [first_name, last_name, email, password]
  );
  return await getTeacherID(result.insertId);
}

//create a class
export async function createClass(class_name, teacher_id) {
  const [result] = await pool.query(
    `
        INSERT INTO class (class_name, teacher_id)
        VALUES (?, ?)
        `,
    [class_name, teacher_id]
  );
  return await getClass(result.insertId)
}

//creates student
export async function createStudent(first_name, last_name, class_id) {
  const [result] = await pool.query(
    `
        INSERT INTO students (first_name, last_name, class_id)
        VALUES (?, ?, ?)
        `,
    [first_name, last_name, class_id]
  );
  return await getStudent(result.insertId)
}

//creates attendance for a student
export async function createAttendance(student_id, class_id, teacher_id, date, status) {
  const [result] = await pool.query(
    `
        INSERT INTO attendance (student_id,class_id,teacher_id,date,status)
        VALUES (?, ?, ?, ?, ?)
        `,
    [student_id, class_id, teacher_id, date, status]
  );
  return await getAttendance(result.insertId)
}

//deletes a teacher's class
export async function deleteClass(class_id) {
  const [result] = await pool.query(
    `
      DELETE FROM class 
      WHERE class_id = ?
    `,
    [class_id]
  );
  return result
}

//deletes a student record
export async function deleteStudent(student_id) {
  const [result] = await pool.query(
    `
      DELETE FROM students
      WHERE student_id = ?
    `,
    [student_id]
  );
  return result
}

//deletes all of the students in a specific class 
export async function deleteStudentsInClass(class_id) {
  const [result] = await pool.query(
    `
      DELETE FROM students
      WHERE class_id = ?
    `,
    [class_id]
  );
  return result
}