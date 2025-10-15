const mongoose = require('mongoose');

const internshipConnection = mongoose.createConnection('mongodb://localhost:27017/internship_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const internshipSchema = new mongoose.Schema({
  applyingTo: String,
  name: String,
  qualification: String,
  experience: String,
  skills: String,
  project: String,
});

const InternshipModel = internshipConnection.model('Internship', internshipSchema);

module.exports = InternshipModel;


