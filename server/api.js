const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');

const userRoutes = require('./routers/userRoutes');
const classesRoutes = require('./routers/classesRoutes');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.use('/user', userRoutes);

api.use('/class', classesRoutes);

module.exports = api;
