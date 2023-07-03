const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();


router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
