const mongoose = require('mongoose');

const internshipPostsConnection = mongoose.createConnection('mongodb://localhost:27017/internship_posts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const internshipPostsSchema = new mongoose.Schema({
  company: String,
  title: String,
  description: String,
  stipend: String,
  skills: String,
  contact: String
});

const InternshipPosts = internshipPostsConnection.model('InternshipPosts', internshipPostsSchema);

module.exports = InternshipPosts;

