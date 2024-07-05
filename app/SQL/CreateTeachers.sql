USE AttendanceApp;

CREATE TABLE teachers(
    teacher_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email UNIQUE varchar(100),
    password varchar(50),
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
