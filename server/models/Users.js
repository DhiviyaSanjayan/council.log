const db = require('../database/db');
require("dotenv").config();

class User {
    constructor({ user_id, email, username, password, is_student, is_teacher, student_points, teacher_points }) {
        this.id = user_id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.isStudent = is_student;
        this.isTeacher = is_teacher;
        this.studentPoints = student_points;
        this.teacherPoints = teacher_points;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM users');
        return response.rows.map((row) => new User(row));
    }

    static async getById(id) {
        const response = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
        if (response.rows.length !== 1) {
            throw new Error('Unable to locate user.');
        }
        return new User(response.rows[0]);
    }

    static async getByUsername(username) {
        const response = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (response.rows.length !== 1) {
            throw new Error('Unable to locate user.');
        }
        console.log(response.rows);
        return new User(response.rows[0]);
    }

    static async getByEmail(email) {
        const response = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (response.rows.length !== 1) {
            throw new Error('Unable to locate user.');
        }
        return new User(response.rows[0]);
    }


    static async create(data) {
        const {
            email: userEmail,
            username: userUsername,
            password,
            isStudent,
            isTeacher
        } = data;
        const query = 'INSERT INTO users (email, username, password, is_student, is_teacher) ' +
            'VALUES ($1, $2, $3, $4, $5) RETURNING user_id';
        const values = [userEmail, userUsername, password, isStudent, isTeacher];
        const response = await db.query(query, values);
        const newId = response.rows[0].user_id;
        return User.getById(newId);
    }


    async update() {
        const query = 'UPDATE users SET username = $1, password = $2, is_student = $3, is_teacher = $4, ' +
            'student_points = $5, teacher_points = $6 WHERE user_id = $7';
        const values = [this.username, this.password, this.isStudent, this.isTeacher, this.studentPoints, this.teacherPoints, this.id];
        await db.query(query, values);
        return this;
    }

    async delete() {
        await db.query('DELETE FROM users WHERE user_id = $1', [this.id]);
    }
}


module.exports = User;
