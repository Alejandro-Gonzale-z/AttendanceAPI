USE AttendanceApp;

ALTER TABLE attendance
ADD CONSTRAINT fk_student
FOREIGN KEY (student_id)
REFERENCES students(student_id)
ON DELETE CASCADE;
