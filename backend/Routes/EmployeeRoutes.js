const express = require('express');
const router = express.Router();
const employees = require('../data/Employes.json');


router.get('/', (req, res) => {
  res.json(employees);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res.json(employee);
});

module.exports = router;
