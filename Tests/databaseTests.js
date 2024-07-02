import * as dbFunctions from '../database.js'

//TESTING GET FUNCTIONS

console.log("TESTING: getTeacherEmail, Result: Jack Black's record")
let result = await dbFunctions.getTeacherEmail("kungfu@gmail.com")
console.log(result)
console.log("\n\n")

console.log("TESTING: getTeacherID, Result: Jack Black's record")
result = await dbFunctions.getTeacherID(1)
console.log(result)
console.log("\n\n")


console.log("TESTING: getTeachersClass, Result: Section: 02")
result = await dbFunctions.getTeachersClasses(1)
console.log(result)
console.log("\n\n")

console.log("TESTING: getClass, Result: Section: 10")
result = await dbFunctions.getClass(2)
console.log(result)
console.log("\n\n")

console.log("TESTING: getStudent, Result: Alex Pereira")
result = await dbFunctions.getStudent(10)
console.log(result)
console.log("\n\n")

console.log("TESTING: getStudentsInClass, Result: 2 Students")
result = await dbFunctions.getStudentsInClass(2)
console.log(result)
console.log("\n\n")

console.log("TESTING: getAttendance, Result: student_id 12, class_id 1")
result = await dbFunctions.getAttendance(6)
console.log(result)
console.log("\n\n")

console.log("TESTING: getStudentAttendance, Result: status=0,1")
result = await dbFunctions.getStudentAttendance(8,2)
console.log(result)
console.log("\n\n")

console.log("TESTING: getClassAttendance, Result: 3 records from class 2")
result = await dbFunctions.getClassAttendance(2)
console.log(result)
console.log("\n\n")

// TESTING CREATE FUNCTIONS
console.log("TESTING: createTeacher, Result: Luis Perez")
result = await dbFunctions.createTeacher("Luis","Perez","lp@gmail.com","1234")
console.log(result)
console.log("\n\n")

console.log("TESTING: createClass, Result: Section: 12")
result = await dbFunctions.createClass("Section 12",3)
console.log(result)
console.log("\n\n")

console.log("TESTING: createStudent, Result: Jorge Masvidal")
result = await dbFunctions.createStudent("Jorge","Masvidal",3)
console.log(result)
console.log("\n\n")
