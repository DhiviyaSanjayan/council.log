const db = require('../database/db');

class Registration {
    constructor({ registration_id, user_id, class_id, role, registration_time }) {
        this.id = registration_id;
        this.userId = user_id;
        this.classId = class_id;
        this.role = role;
        this.registrationTime = registration_time;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM registrations');
        return response.rows.map((row) => new Registration(row));
    }

    static async getById(id) {
        const response = await db.query('SELECT * FROM registrations WHERE registration_id = $1', [id]);
        if (response.rows.length !== 1) {
            throw new Error('Unable to locate registration.');
        }
        return new Registration(response.rows[0]);
    }

    static async create(data) {
        const { userId, classId, role } = data;
        const query = 'INSERT INTO registrations (user_id, class_id, role) VALUES ($1, $2, $3) RETURNING registration_id';
        const values = [userId, classId, role];
        const response = await db.query(query, values);
        const newId = response.rows[0].registration_id;
        return Registration.getById(newId);
    }

    async update() {
        const query = 'UPDATE registrations SET user_id = $1, class_id = $2, role = $3 WHERE registration_id = $4';
        const values = [this.userId, this.classId, this.role, this.id];
        await db.query(query, values);
        return this;
    }

    async delete() {
        await db.query('DELETE FROM registrations WHERE registration_id = $1', [this.id]);
    }
}

module.exports = Registration;
