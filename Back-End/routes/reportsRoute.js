const express = require('express');
const router = express.Router();
const {
    getReports,
    getReportById,
    saveReport,
    updateReport,
    deleteReport
} = require('../controllers/reportController');

// GET /reports
router.get('/report', getReports);

// GET /reports/:id
router.get('/report/:id', getReportById);

// POST /reports
router.post('/report', saveReport);

// patch /reports/:id
router.patch('/report/:id', updateReport);

// DELETE /reports/:id
router.delete('/report/:id', deleteReport);

module.exports = router;