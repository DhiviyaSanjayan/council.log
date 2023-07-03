const Registration = require('../models/Registration');


class RegistrationController {
    static async getAllRegistrations(req, res) {
        try {
            const registrations = await Registration.getAll();
            res.json(registrations);
        } catch (error) {
            res.status(500).json({ error: 'Unable to retrieve registrations.' });
        }
    }

    static async getRegistrationById(req, res) {
        const { id } = req.params;
        try {
            const registration = await Registration.getById(id);
            res.json(registration);
        } catch (error) {
            res.status(404).json({ error: 'Registration not found.' });
        }
    }

    static async createRegistration(req, res) {
        const { userId, classId, role } = req.body;
        try {
            const newRegistration = await Registration.create({ userId, classId, role });
            res.status(201).json(newRegistration);
        } catch (error) {
            res.status(500).json({ error: 'Unable to create registration.' });
        }
    }

    static async updateRegistration(req, res) {
        const { id } = req.params;
        const { userId, classId, role } = req.body;
        try {
            const registration = await Registration.getById(id);
            registration.userId = userId;
            registration.classId = classId;
            registration.role = role;
            await registration.update();
            res.json(registration);
        } catch (error) {
            res.status(404).json({ error: 'Registration not found.' });
        }
    }

    static async deleteRegistration(req, res) {
        const { id } = req.params;
        try {
            const registration = await Registration.getById(id);
            await registration.delete();
            res.json({ message: 'Registration deleted successfully.' });
        } catch (error) {
            res.status(404).json({ error: 'Registration not found.' });
        }
    }
}

module.exports = RegistrationController;