const mongoose = require('mongoose');

const sponsorshipConnection = mongoose.createConnection('mongodb://localhost:27017/sponsorship_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sponsorshipSchema = new mongoose.Schema({
  event: String,
  alumniName: String,
  amount: String,
  message: String,
  contact: String
});

const Sponsorship = sponsorshipConnection.model('Sponsorship', sponsorshipSchema);

module.exports = Sponsorship;
