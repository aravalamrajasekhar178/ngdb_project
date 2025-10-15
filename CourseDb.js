const mongoose = require('mongoose');

const courseConnection = mongoose.createConnection('mongodb://localhost:27017/course_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const courseSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  tutorName: { type: String, required: true },
  subject: { type: String, required: true },
  willingTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CourseApplication = courseConnection.model('CourseApplication', courseSchema);

module.exports = CourseApplication;
