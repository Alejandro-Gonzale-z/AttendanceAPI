USE AttendanceApp;

CREATE TABLE students(
    student_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    class_id INTEGER,
    FOREIGN KEY (class_id) REFERENCES class(class_id)
);

