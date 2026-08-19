const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// API Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'Dragon Guard Backend is operational!' });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Dragon Guard API is running smoothly!');
});

// Export the Express app for Vercel serverless compatibility
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}