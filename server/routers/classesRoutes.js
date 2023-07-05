const express = require('express');
const ClassesController = require('../controllers/classes');
const authenticator = require('../middleware/authenticator');

const router = express.Router();

//router.use(authenticator); 
//adds authenticator middleware to all theses routes...

router.get('/', ClassesController.getAllClasses);
router.get('/:id', ClassesController.getClassById);
router.post('/', ClassesController.createClass);
router.put('/:id', ClassesController.updateClass);
router.delete('/:id', ClassesController.deleteClass);

module.exports = router;
