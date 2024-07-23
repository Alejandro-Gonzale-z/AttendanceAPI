USE AttendanceApp;

CREATE TABLE attendance(
    attendance_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    student_id INTEGER,
    class_id INTEGER,
    teacher_id INTEGER,
    date DATE,
    status bool,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,  
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);