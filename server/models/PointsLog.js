const db = require('../database/db');
require("dotenv").config();

class PointsLog {
    constructor(pointsLogData) {
        if (pointsLogData) {
            const { log_id, user_id, points, role, time_logged } = pointsLogData;
            this.logId = log_id;
            this.userId = user_id;
            this.points = points;
            this.role = role;
            this.timeLogged = time_logged;
        }
    }

    static async getAll() {
        const query = 'SELECT * FROM points_log';
        const { rows } = await db.query(query);
        const pointsLogs = rows.map((row) => new PointsLog(row));
        return pointsLogs;
    }

    static async getById(id) {
        const query = 'SELECT * FROM points_log WHERE log_id = $1';
        const values = [id];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            throw new Error('Points log not found.');
        }
        const pointsLog = new PointsLog(rows[0]);
        return pointsLog;
    }

    static async create(pointsLogData) {
        const { userId, points, role } = pointsLogData;
        const query =
            'INSERT INTO points_log (user_id, points, role) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, points, role];
        const { rows } = await db.query(query, values);
        const newPointsLog = new PointsLog(rows[0]);
        return newPointsLog;
    }

    async update() {
        const query =
            'UPDATE points_log SET user_id = $1, points = $2, role = $3 WHERE log_id = $4';
        const values = [this.userId, this.points, this.role, this.logId];
        await db.query(query, values);
    }

    async delete() {
        const query = 'DELETE FROM points_log WHERE log_id = $1';
        const values = [this.logId];
        await db.query(query, values);
    }
}

module.exports = PointsLog;