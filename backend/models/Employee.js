const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  role: String,
  department: String,
  location: String,
  joinDate: String,
  status: String,
  skills: [String],
  bio: String,
  avatar: String
});

module.exports = mongoose.model('Employee', employeeSchema);
