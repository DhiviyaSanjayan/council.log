const PointsLog = require('../models/PointsLog');


class PointsLogController {
    static async getAllPointsLogs(req, res) {
        try {
            const pointsLogs = await PointsLog.getAll();
            res.json(pointsLogs);
        } catch (error) {
            console.error('Error retrieving points logs:', error);
            res.status(500).json({ error: 'Unable to retrieve points logs.' });
        }
    }

    static async getPointsLogById(req, res) {
        const { id } = req.params;
        try {
            const pointsLog = await PointsLog.getById(id);
            res.json(pointsLog);
        } catch (error) {
            res.status(404).json({ error: 'Points log not found.' });
        }
    }

    static async createPointsLog(req, res) {
        const { userId, points, role } = req.body;
        try {
            const newPointsLog = await PointsLog.create({ userId, points, role });
            res.status(201).json(newPointsLog);
        } catch (error) {
            res.status(500).json({ error: 'Unable to create points log.' });
        }
    }

    static async updatePointsLog(req, res) {
        const { id } = req.params;
        const { userId, points, role } = req.body;
        try {
            const pointsLog = await PointsLog.getById(id);
            pointsLog.userId = userId;
            pointsLog.points = points;
            pointsLog.role = role;
            await pointsLog.update();
            res.json(pointsLog);
        } catch (error) {
            res.status(404).json({ error: 'Points log not found.' });
        }
    }

    static async deletePointsLog(req, res) {
        const { id } = req.params;
        try {
            const pointsLog = await PointsLog.getById(id);
            await pointsLog.delete();
            res.json({ message: 'Points log deleted successfully.' });
        } catch (error) {
            res.status(404).json({ error: 'Points log not found.' });
        }
    }
}

module.exports = PointsLogController;
