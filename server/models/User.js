const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastSeen: { type: Date, default: Date.now },
  online: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
