// ngdb/models/DoctorDb.js
const mongoose = require('mongoose');

const doctorConnection = mongoose.createConnection('mongodb://localhost:27017/DoctorDb1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  doctor: { type: String, required: true },
  problem: { type: String, required: true },
}, { timestamps: true });

const Consultation = doctorConnection.model('Consultation', doctorSchema);

module.exports = Consultation;

