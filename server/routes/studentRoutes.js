const express = require('express');
const Student = require('../models/Student');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all students
router.get('/', protect, async (req, res) => {
  try {
    const { search, semester, branch, status } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { rollNumber: { $regex: search, $options: 'i' } },
        { userId: { $regex: search, $options: 'i' } },
      ];
    }
    if (semester) filter.semester = semester;
    if (branch) filter.branch = branch;
    if (status) filter.status = status;

    const students = await Student.find(filter).populate('userId', 'fullName email phone').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single student
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId', 'fullName email phone');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create student
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
