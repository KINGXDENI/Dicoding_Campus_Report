import express from 'express';
import { addLike, getLikesByReportId } from '../controllers/LikeController.js';

const router = express.Router();

// Definisikan rute untuk menambahkan like
router.post('/reports/:id/like', addLike);
router.get('/reports/:id/like', getLikesByReportId);

export default router;