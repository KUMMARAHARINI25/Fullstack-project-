const express = require('express');
const Grade = require('../models/Grade');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all grades
router.get('/', protect, async (req, res) => {
  try {
    const { studentId, courseId } = req.query;
    let filter = {};

    if (studentId) filter.studentId = studentId;
    if (courseId) filter.courseId = courseId;

    const grades = await Grade.find(filter)
      .populate('studentId', 'rollNumber')
      .populate('courseId', 'name code')
      .sort({ recordedAt: -1 });

    res.status(200).json({
      success: true,
      count: grades.length,
      data: grades,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single grade record
router.get('/:id', protect, async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('studentId', 'rollNumber')
      .populate('courseId', 'name code');

    if (!grade) {
      return res.status(404).json({ error: 'Grade record not found' });
    }
    res.status(200).json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create grade
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update grade
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ error: 'Grade record not found' });
    }

    grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete grade
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) {
      return res.status(404).json({ error: 'Grade record not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Grade record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
