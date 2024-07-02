USE notes_app;

CREATE TABLE notes(
    id integer Primary KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content VARCHAR(255),
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes(title,content) VALUES
('note1','a note'),
('note2','a second note');
