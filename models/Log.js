const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  session_id: String,
  intent_name: String,
  user_message: String,
  bot_response: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Log', LogSchema);
