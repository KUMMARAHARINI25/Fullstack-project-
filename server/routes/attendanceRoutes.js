const express = require('express');
const Attendance = require('../models/Attendance');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all attendance records
router.get('/', protect, async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.query;
    let filter = {};

    if (studentId) filter.studentId = studentId;
    if (courseId) filter.courseId = courseId;
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const attendance = await Attendance.find(filter)
      .populate('studentId', 'rollNumber')
      .populate('courseId', 'name code')
      .populate('recordedBy', 'fullName')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single attendance record
router.get('/:id', protect, async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('studentId', 'rollNumber')
      .populate('courseId', 'name code')
      .populate('recordedBy', 'fullName');

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create attendance record
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { studentId, courseId, date, status, remarks } = req.body;

    const attendance = await Attendance.create({
      studentId,
      courseId,
      date,
      status,
      remarks,
      recordedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update attendance record
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete attendance record
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Attendance record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
