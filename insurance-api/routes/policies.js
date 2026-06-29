const express = require('express');
const router = express.Router();
const policies = require('../data/policies');

router.get('/', (req, res) => {
  res.json(policies);
});

router.get('/:id', (req, res) => {
  const policy = policies.find((item) => item.id === req.params.id);
  if (!policy) {
    return res.status(404).json({ error: 'Policy not found' });
  }
  res.json(policy);
});

router.post('/', (req, res) => {
  const { customer, type, premium, status } = req.body;
  if (!customer || !type || typeof premium !== 'number') {
    return res.status(400).json({ error: 'customer, type, and premium are required' });
  }

  const newPolicy = {
    id: Date.now().toString(),
    customer,
    type,
    premium,
    status: status || 'active'
  };

  policies.push(newPolicy);
  res.status(201).json(newPolicy);
});

router.post('/quote', (req, res) => {
  const { age, vehicleValue, coverageLevel } = req.body;
  if (typeof age !== 'number' || typeof vehicleValue !== 'number') {
    return res.status(400).json({ error: 'age and vehicleValue must be numbers' });
  }

  const baseRate = 0.015;
  const coverageMultiplier = coverageLevel === 'premium' ? 1.4 : coverageLevel === 'standard' ? 1.1 : 1.0;
  const premium = Math.round(vehicleValue * baseRate * coverageMultiplier + age * 2);

  res.json({ quote: premium, coverageLevel: coverageLevel || 'basic' });
});

module.exports = router;
