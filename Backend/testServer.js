const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Body parsing
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

// Donor route
app.post('/api/donors', (req, res) => {
  console.log('Received donor data:', req.body);
  res.json({
    success: true,
    message: 'Donor received',
    data: req.body
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
