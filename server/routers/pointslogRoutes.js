const express = require('express');
const PointsLogController = require('../controllers/pointslog');

const router = express.Router();

router.get('/', PointsLogController.getAllPointsLogs);
router.get('/:id', PointsLogController.getPointsLogById);
router.post('/', PointsLogController.createPointsLog);
router.put('/:id', PointsLogController.updatePointsLog);
router.delete('/:id', PointsLogController.deletePointsLog);

module.exports = router;
