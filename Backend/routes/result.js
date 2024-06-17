const express = require('express');
const router = express.Router();
const Result = require('../models/Result');


// Route to add a new result
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body); 
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating result:', error); 
    res.status(500).json({ error: error.message });
  }
});

// Route to update a result by registration number
router.put('/:registrationNumber', async (req, res) => {
  try {
      const { name, modules, gpa, sgpa } = req.body; 
      const updatedResult = await Result.findOneAndUpdate(
          { registrationNumber: req.params.registrationNumber },
          { name, modules, gpa, sgpa }, 
          { new: true }
      );

      if (!updatedResult) {
          return res.status(404).json({ error: 'Result not found' });
      }

      res.json(updatedResult);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Route to delete a result by registration number
router.delete('/:registrationNumber', async (req, res) => {
  try {
    const deletedResult = await Result.findOneAndDelete({ registrationNumber: req.params.registrationNumber });
    if (!deletedResult) {
        return res.status(404).json({ error: 'Result not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get students by department and semester
router.get('/', async (req, res) => {
  const { department, semester } = req.query;
  try {
      let query = {};
      if (department) {
          query.department = department;
      }
      if (semester) {
          query.semester = semester;
      }
      console.log('Query parameters:', query);  
      const students = await Result.find(query);
      console.log('Fetched students:', students);  

      res.setHeader('Cache-Control', 'no-store');
      res.json(students);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
