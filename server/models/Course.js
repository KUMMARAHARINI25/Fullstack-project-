const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    uppercase: true,
  },
  description: {
    type: String,
    default: '',
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  semester: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  instructorEmail: {
    type: String,
    required: true,
  },
  classroom: {
    type: String,
    required: true,
  },
  schedule: {
    days: [String],
    startTime: String,
    endTime: String,
  },
  capacity: {
    type: Number,
    default: 60,
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', courseSchema);
