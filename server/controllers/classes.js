const Class = require('../models/Classes');

class ClassesController {
    static async getAllClasses(req, res) {
        try {
            const classes = await Class.getAll();
            res.json(classes);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch classes.' });
        }
    }

    static async getClassById(req, res) {
        const { id } = req.params;
        try {
            const classObj = await Class.getById(id);
            res.json(classObj);
        } catch (error) {
            res.status(404).json({ error: 'Class not found.' });
        }
    }

    static async createClass(req, res) {
        const { name, description, teacherId } = req.body;
        try {
            const newClass = await Class.create({ name, description, teacherId });
            res.status(201).json(newClass);
        } catch (error) {
            res.status(500).json({ error: 'Unable to create class.' });
        }
    }

    static async updateClass(req, res) {
        const { id } = req.params;
        const { name, description, teacherId } = req.body;
        try {
            const classObj = await Class.getById(id);
            classObj.name = name;
            classObj.description = description;
            classObj.teacherId = teacherId;
            await classObj.update();
            res.json(classObj);
        } catch (error) {
            res.status(404).json({ error: 'Class not found.' });
        }
    }

    static async deleteClass(req, res) {
        const { id } = req.params;
        try {
            const classObj = await Class.getById(id);
            await classObj.delete();
            res.json({ message: 'Class deleted successfully.' });
        } catch (error) {
            res.status(404).json({ error: 'Class not found.' });
        }
    }
}

module.exports = ClassesController;
