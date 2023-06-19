const express = require('express');
const { addLike, getLikesByReportId, removeLike } = require('../controllers/likeController.js');
const router = express.Router();

// Definisikan rute untuk menambahkan like
router.post('/report/:id/like', addLike);
router.get('/report/:id/like', getLikesByReportId);
router.delete('/report/:id/like', removeLike);

module.exports = router;
