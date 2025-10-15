// alumniDb.js
const mongoose = require('mongoose');
const alumniConnection = mongoose.createConnection('mongodb://localhost:27017/alumniDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const alumniSchema = new mongoose.Schema({
  name: String,
  course: String,
  message: String
});

const Alumni = mongoose.model('Alumni', alumniSchema);
module.exports = Alumni;




