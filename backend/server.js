const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configured CORS middleware
app.use(cors({
  origin: [
    'https://dragon-guard-app-qrpz.vercel.app',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'Dragon Guard Backend is operational!' });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Dragon Guard API is running smoothly!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});