const express = require('express');
const RegistrationController = require('../controllers/RegistrationController');
const authenticator = require('../middleware/authenticator');

const router = express.Router();

router.get('/', authenticator, RegistrationController.getAllRegistrations);
router.get('/:id', RegistrationController.getRegistrationById);
router.post('/', RegistrationController.createRegistration);
router.put('/:id', RegistrationController.updateRegistration);
router.delete('/:id', RegistrationController.deleteRegistration);

module.exports = router;
