const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  nama: {
    type: String,
  },
  nim: {
    type: String,
  },
  jurusan: {
    type: String,
  },
  fakultas: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
