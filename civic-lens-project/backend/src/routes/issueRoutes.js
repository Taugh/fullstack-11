const express = require('express');
const { getAllIssues, getIssueById, postIssue, putIssue, deleteIssue } = require('../controllers/issueController');

const router = express.Router();

router.get('/', getAllIssues);

router.get('/:id', getIssueById);

router.post('/', postIssue);

router.put('/:id', putIssue);

router.delete('/:id', deleteIssue);

module.exports = router;