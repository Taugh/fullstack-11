const express = require('express');
const { getAllIssues, getIssueById, postIssue, putIssue, deleteIssue } = require('../controllers/issueController');

const router = express.Router();

// GET /issues -> return all issues.
router.get('/', getAllIssues);

// GET /issues/:id -> return one issue by id.
router.get('/:id', getIssueById);

// POST /issues -> create a new issue.
router.post('/', postIssue);

// PUT /issues/:id -> update an existing issue.
router.put('/:id', putIssue);

// DELETE /issues/:id -> remove an issue.
router.delete('/:id', deleteIssue);

module.exports = router;