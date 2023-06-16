import express from 'express';
import { search } from '../controllers/SearchController.js';

const router = express.Router();

router.get('/search', search);

export default router;