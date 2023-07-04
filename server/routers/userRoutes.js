const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

router.get('/username', UserController.getUserByUsername);
router.get('/email', UserController.getUserByEmail);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
