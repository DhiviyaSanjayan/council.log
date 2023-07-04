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
        console.log("Request Body: ", req.body); // logs the incoming request body to check if all required fields are present
    
        const { category, class_name, class_time, duration, description, teacher_id } = req.body;
    
        if(!category || !class_name || !class_time || !duration || !description || !teacher_id) {
            console.log("Error: Missing field(s) in request body"); // checks if all required fields are present
            return res.status(400).json({ error: 'Missing field(s) in request body' });
        }
    
        try {
            const newClass = new Class({ category, class_name, class_time, duration, description, teacher_id });
            const createdClass = await newClass.create();
            console.log("Created Class: ", createdClass); // logs the created class for verification
    
            res.status(201).json(createdClass);
        } catch (error) {
            console.log("Error while creating class: ", error); // logs any error that occurs while trying to create a new class
            res.status(500).json({ error: 'Unable to create class.' });
        }
    }
    

    static async updateClass(req, res) {
        const { id } = req.params;
        const { category, class_name, class_time, duration, description, teacher_id } = req.body;
        try {
            const classObj = await Class.getById(id);
            classObj.category = category;
            classObj.className = class_name;
            classObj.classTime = class_time;
            classObj.duration = duration;
            classObj.description = description;
            classObj.teacherId = teacher_id;
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
