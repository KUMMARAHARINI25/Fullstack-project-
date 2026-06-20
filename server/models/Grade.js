const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  assignments: {
    type: Number,
    default: 0,
    min: 0,
    max: 30,
  },
  midterm: {
    type: Number,
    default: 0,
    min: 0,
    max: 20,
  },
  finalExam: {
    type: Number,
    default: 0,
    min: 0,
    max: 50,
  },
  totalMarks: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F', 'Not Graded'],
    default: 'Not Graded',
  },
  gradePoint: {
    type: Number,
    default: 0,
    min: 0,
    max: 4,
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate total marks and grade before saving
gradeSchema.pre('save', function (next) {
  this.totalMarks = this.assignments + this.midterm + this.finalExam;

  if (this.totalMarks >= 90) {
    this.grade = 'A+';
    this.gradePoint = 4.0;
  } else if (this.totalMarks >= 85) {
    this.grade = 'A';
    this.gradePoint = 3.7;
  } else if (this.totalMarks >= 80) {
    this.grade = 'A-';
    this.gradePoint = 3.3;
  } else if (this.totalMarks >= 75) {
    this.grade = 'B+';
    this.gradePoint = 3.0;
  } else if (this.totalMarks >= 70) {
    this.grade = 'B';
    this.gradePoint = 2.7;
  } else if (this.totalMarks >= 65) {
    this.grade = 'B-';
    this.gradePoint = 2.3;
  } else if (this.totalMarks >= 60) {
    this.grade = 'C+';
    this.gradePoint = 2.0;
  } else if (this.totalMarks >= 55) {
    this.grade = 'C';
    this.gradePoint = 1.7;
  } else {
    this.grade = 'F';
    this.gradePoint = 0.0;
  }

  next();
});

module.exports = mongoose.model('Grade', gradeSchema);
