import express from "express";
import {
    getReports,
    getReportById,
    saveReport,
    updateReport,
    deleteReport
} from "../controllers/ReportController.js";

const router = express.Router();

router.get('/reports', getReports);
router.get('/reports/:id', getReportById);
router.post('/reports', saveReport);
router.patch('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

export default router;