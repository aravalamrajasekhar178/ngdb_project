const mongoose = require('mongoose');

const hostelConnection = mongoose.createConnection('mongodb://localhost:27017/hostel_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hostelSchema = new mongoose.Schema({
  hostel: String,
  feedback: String,
});

const HostelFeedback = hostelConnection.model('HostelFeedback', hostelSchema);

module.exports = HostelFeedback;


