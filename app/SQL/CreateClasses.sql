USE AttendanceApp;

CREATE TABLE class(
    class_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(100),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

