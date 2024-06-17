const express = require('express');
const router = express.Router();
const Lecturer = require('../models/Lecturer');
const bcrypt = require('bcryptjs');

// Lecturer login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const lecturer = await Lecturer.findOne({ username });
        if (!lecturer) return res.status(404).json({ message: 'Lecturer not found' });

        const isMatch = await bcrypt.compare(password, lecturer.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', lecturer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new lecturer (for admin use)
router.post('/register', async (req, res) => {
    const { username, password, department } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newLecturer = new Lecturer({ username, password: hashedPassword, department });
        const savedLecturer = await newLecturer.save();

        res.status(201).json(savedLecturer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
