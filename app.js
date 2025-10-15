const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./user');

const app = express();

mongoose.connect('mongodb://localhost:27017/ngdb_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, roll_number, department, course, branch, email, mobile, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(`<script>alert('Email already registered! Please login.'); window.location.href='/student_login_form.html';</script>`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      roll_number,
      department,
      course,
      branch,
      email,
      mobile,
      password: hashedPassword,
    });
    await user.save();
    res.send(`<script>alert('Registration successful! Please login.'); window.location.href='/student_login_form.html';</script>`);
  } catch (error) {
    res.status(500).send(`<script>alert('Registration failed. Try again later.'); window.location.href='/student_registration_form.html';</script>`);
  }
});

// Login route with all user info passed in redirect query params
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send(`<script>alert('Invalid credentials! Please try again.'); window.location.href='/student_login_form.html';</script>`);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send(`<script>alert('Invalid credentials! Please try again.'); window.location.href='/student_login_form.html';</script>`);
    }

    const query = new URLSearchParams({
      username: user.name,
      email: user.email,
      roll_number: user.roll_number,
      department: user.department,
      course: user.course,
      branch: user.branch,
      mobile: user.mobile,
    }).toString();

    res.redirect(`/dashboard.html?${query}`);
  } catch (error) {
    res.status(500).send(`<script>alert('Login failed. Try again later.'); window.location.href='/student_login_form.html';</script>`);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
