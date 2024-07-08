USE AttendanceApp;

CREATE TABLE teachers(
    teacher_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email varchar(100) UNIQUE,
    password varchar(50),
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
