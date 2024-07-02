USE AttendanceApp;

-- Insert Teachers
INSERT INTO teachers(teacher_id,first_name,last_name,email,password) 
VALUES(1,"Jack","Black","kungfu@gmail.com","1234");

INSERT INTO teachers(teacher_id,first_name,last_name,email,password) 
VALUES(2,"John","Doe","JDog@gmail.com","1234");

-- Insert Class
INSERT INTO class(class_id,class_name,teacher_id)
VALUES(1,"Section: 02",1);

INSERT INTO class(class_id,class_name,teacher_id)
VALUES(2,"Section: 10",2);

-- Insert Students
INSERT INTO students (student_id,first_name, last_name, class_id)
VALUES(10,"Alex","Pereira",1);

INSERT INTO students (student_id,first_name, last_name, class_id)
VALUES(12,"Jon","Jones",1);

INSERT INTO students (student_id,first_name, last_name, class_id)
VALUES(8,"Tony","Ferguson",2);

INSERT INTO students (student_id,first_name, last_name, class_id)
VALUES(4,"Nick","Diaz",2);

-- Insert Attendance
INSERT into attendance(student_id,class_id,teacher_id,date,status)
VALUES(10,1,1,"2024-07-01",TRUE);

INSERT into attendance(student_id,class_id,teacher_id,date,status)
VALUES(12,1,1,"2024-07-01",TRUE);

INSERT into attendance(student_id,class_id,teacher_id,date,status)
VALUES(8,2,2,"2024-07-01",FALSE);

INSERT into attendance(student_id,class_id,teacher_id,date,status)
VALUES(4,2,2,"2024-07-01",TRUE);
