const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  videoId: String,
  timestamp: Number,
  content: String,
  // userId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
