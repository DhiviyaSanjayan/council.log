const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');

const userRoutes = require('./routers/userRoutes');
const classesRoutes = require('./routers/classesRoutes');
const registrationRoutes = require('./routers/registrationRoutes');
const pointsLogRoutes = require('./routers/pointslogRoutes');
const tokenRoutes = require('./routers/tokenRoutes');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.use('/user', userRoutes);

api.use('/class', classesRoutes);

api.use('/registration', registrationRoutes);

api.use('/points', pointsLogRoutes);

api.use('/token', tokenRoutes)

module.exports = api;
