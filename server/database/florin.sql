DROP TABLE IF EXISTS points_log CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;
DROP TABLE IF EXISTS verification_tokens CASCADE;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_student BOOLEAN DEFAULT false,
    is_teacher BOOLEAN DEFAULT false,
    student_points INTEGER DEFAULT 0,
    teacher_points INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT true
);

CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    category VARCHAR(50),
    class_name VARCHAR(100),
    class_time TIMESTAMP,
    address VARCHAR(255),
    duration INTEGER,
    description TEXT,
    teacher_id INTEGER REFERENCES users(user_id),
    is_group BOOLEAN DEFAULT true
);

CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(class_id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE points_log (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    role VARCHAR(20) NOT NULL,
    time_logged TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tokens (
  token_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL
);

CREATE TABLE verification_tokens(
    token_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)  ON DELETE CASCADE NOT NULL,
    token VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, username, password, is_student, is_teacher, student_points, teacher_points, is_verified)
VALUES 
    ('John', 'Doe', 'user1@example.com', 'user1', 'password1', true, false, 100, 0, true),
    ('Jane', 'Smith', 'user2@example.com', 'user2', 'password2', true, false, 50, 0,true),
    ('Mike', 'Johnson', 'user3@example.com', 'user3', 'password3', false, true, 0, 200,true),
    ('Emily', 'Davis', 'user4@example.com', 'user4', 'password4', true, true, 50, 150,true);


INSERT INTO classes (category, class_name, class_time, address, duration, description, teacher_id, is_group)
VALUES ('Pottery', 'Wheel Throwing', '2023-07-05 10:00:00', '123 Street', 120, 'Learn the skill of wheel throwing and create beautiful pottery.', 1, false),
       ('Pottery', 'Ceramic Painting', '2023-07-15 14:30:00', '456 Avenue', 90, 'Explore the world of ceramic painting and unleash your creativity', 1, true),
       ('Gardening', 'Urban Gardening', '2023-07-20 11:00:00','789 Road', 60, 'Discover the techniques of urban gardening and create your own mini garden', 2, true);


INSERT INTO registrations (user_id, class_id, role)
VALUES (1, 1, 'student'),
       (2, 1, 'student'),
       (3, 1, 'teacher'),
       (4, 2, 'teacher');

INSERT INTO points_log (user_id, points, role)
VALUES (1, 10, 'student'),
       (2, 5, 'student'),
       (3, 20, 'teacher'),
       (4, -5, 'teacher');
