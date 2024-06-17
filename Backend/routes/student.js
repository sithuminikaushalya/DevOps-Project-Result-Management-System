const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get student by registration number
router.get('/:registrationNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ registrationNumber: req.params.registrationNumber });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new student
router.post('/', async (req, res) => {
    const student = new Student(req.body);
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a student
router.put('/:registrationNumber', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { registrationNumber: req.params.registrationNumber },
            req.body,
            { new: true }
        );
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student
router.delete('/:registrationNumber', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ registrationNumber: req.params.registrationNumber });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
