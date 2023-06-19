const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
