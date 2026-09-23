const express = require('express');
const cors = require('cors');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

// Parse incoming JSON so req.body is available in controllers.
app.use(express.json());
// Allow frontend requests from another origin during development.
app.use(cors());

// All issue endpoints are grouped under /issues.
app.use('/issues', issueRoutes);

module.exports = app;
