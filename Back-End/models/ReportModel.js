const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const reportSchema = new Schema({
    perihal: String,
    lokasi: String,
    gambar: String,
    deskripsi: String,
    URL: String,
    likes: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        default: 'diproses',
    },
    nim: String,
}, {
    timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
