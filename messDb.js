const mongoose = require('mongoose');

const messConnection = mongoose.createConnection('mongodb://localhost:27017/mess_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messSchema = new mongoose.Schema({
  mess: String,
  feedback: String,
});

const MessFeedback = messConnection.model('MessFeedback', messSchema);

module.exports = MessFeedback;


