const express = require('express');
const cors = require('cors');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/issues', issueRoutes);

module.exports = app;
