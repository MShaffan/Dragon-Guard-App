const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'Dragon Guard Backend is operational!' });
});

// Module 1: Password Strength Checker
app.post('/api/check-password', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strength = score <= 2 ? 'Weak' : score <= 4 ? 'Moderate' : 'Strong';
  res.json({ score, strength });
});

// Module 2: Security Header Analyzer
app.post('/api/analyze-headers', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  try {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const response = await fetch(formattedUrl, { method: 'HEAD' });
    const headers = Object.fromEntries(response.headers.entries());

    const securityHeaders = ['content-security-policy', 'strict-transport-security', 'x-frame-options', 'x-content-type-options'];
    const audit = {};

    securityHeaders.forEach(header => {
      audit[header] = headers[header] ? 'Present' : 'Missing';
    });

    res.json({ target: formattedUrl, audit });
  } catch (err) {
    res.status(500).json({ error: 'Failed to inspect headers for target URL.' });
  }
});

// Module 3: URL & Domain Safety Scanner
app.post('/api/scan-url', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(url);
  const isSuspiciousTLD = /\.(zip|kim|top|work|gq|cf)$/i.test(url);
  const hasExcessiveSubdomains = (url.match(/\./g) || []).length > 3;

  const threatDetected = isIP || isSuspiciousTLD || hasExcessiveSubdomains;
  const status = threatDetected ? 'Suspicious / High Risk' : 'Safe / Low Risk';

  res.json({ url, status, checks: { IPDirectAccess: isIP, SuspiciousTLD: isSuspiciousTLD, SubdomainSpam: hasExcessiveSubdomains } });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}