const express = require('express');
const TokenController = require('../controllers/token');

const router = express.Router();

router.get('/:token', TokenController.getOneByToken);

module.exports = router;
