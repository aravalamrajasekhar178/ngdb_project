const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Transport = require('./transportDb');
const Internship = require('./internshipDb'); // Student internship applications
const Alumni = require('./alumniDb');
const HostelFeedback = require('./hostelDb');
const MessFeedback = require('./messDb'); 
const InternshipPosts = require('./internshipPostDb'); // Alumni internship posts
const Sponsorship = require('./sponsorshipDb');
const Doctor = require('./doctorDb');
const Course = require('./CourseDb'); // Add this with other DB imports


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();  
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- Student Internship Application ----------------- //
app.post('/submit-internship', async (req, res) => {
  console.log('Received internship form data:', req.body);
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(200).json({ message: 'Internship application submitted successfully' });
  } catch (error) {
    console.error('Error saving internship:', error);
    res.status(500).json({ error: 'Failed to save internship data' });
  }
});

// ----------------- Alumni Internship Posts ----------------- //
app.post('/post-internship', async (req, res) => {
  console.log('Received internship post from alumni:', req.body);
  try {
    const post = new InternshipPosts(req.body);
    await post.save();
    res.status(200).json({ message: 'Internship posted successfully' });
  } catch (error) {
    console.error('Error saving internship post:', error);
    res.status(500).json({ error: 'Failed to save internship post' });
  }
});

// Get all internship posts (for dynamic scrolling cards)
app.get('/get-internship-posts', async (req, res) => {
  try {
    const posts = await InternshipPosts.find().sort({ _id: -1 }); // latest first
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching internship posts:', error);
    res.status(500).json({ error: 'Failed to fetch internship posts' });
  }
});

// ----------------- Alumni Requests ----------------- //
app.post('/add-alumni', async (req, res) => {
  try {
    const alumni = new Transport({ name:'Rajasekhar',course:'M.Tech(Data Analytics)',message:'Hello! Rajasekhar requested you' });
    await alumni.save();
    res.status(201).send({ message: 'Alumni connection stored successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to store alumni connection' });
  }
});

// ----------------- Hostel Feedback ----------------- //
app.post('/submit-hostel-feedback', async (req, res) => {
  console.log('Received hostel feedback:', req.body);
  try {
    const feedback = new HostelFeedback(req.body);
    await feedback.save();
    res.status(200).json({ message: 'Hostel feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving hostel feedback:', error);
    res.status(500).json({ error: 'Failed to save hostel feedback' });
  }
});

// ----------------- Mess Feedback ----------------- //
app.post('/submit-mess-feedback', async (req, res) => {
  console.log('Received mess feedback:', req.body);
  try {
    const feedback = new MessFeedback(req.body);
    await feedback.save();
    res.status(200).json({ message: 'Mess feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving mess feedback:', error);
    res.status(500).json({ error: 'Failed to save mess feedback' });
  }
});

app.post('/post-sponsorship', async (req, res) => {
  console.log('Received sponsorship data:', req.body);
  try {
    const sponsorship = new Sponsorship(req.body);
    await sponsorship.save();
    res.status(200).json({ message: 'Sponsorship offer submitted successfully' });
  } catch (error) {
    console.error('Error saving sponsorship:', error);
    res.status(500).json({ error: 'Failed to save sponsorship data' });
  }
});

// ----------------- Doctor Submission ----------------- //
app.post('/submit-doctor', async (req, res) => {
  console.log('Received doctor data:', req.body);
  try {
    const doctorEntry = new Doctor(req.body);
    await doctorEntry.save();
    res.status(200).json({ message: 'Doctor information submitted successfully' });
  } catch (error) {
    console.error('Error saving doctor data:', error);
    res.status(500).json({ error: 'Failed to save doctor data' });
  }
});

// ----------------- Course Submission ----------------- //
app.post('/submit-course', async (req, res) => {
  console.log('Received course data:', req.body);
  try {
    const courseEntry = new Course(req.body);
    await courseEntry.save();
    res.status(200).json({ message: 'Course information submitted successfully' });
  } catch (error) {
    console.error('Error saving course data:', error);
    res.status(500).json({ error: 'Failed to save course data' });
  }
});
app.post('/save-transport-contact', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newContact = new Transport({ name:'Rajasekhar',phone:'9849692369' });
    await newContact.save();
    res.status(200).json({ message: 'Driver contact saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save driver contact' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
