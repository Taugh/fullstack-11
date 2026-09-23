const Issue = require('../models/Issue');

// Reusable guard for required text fields.
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const getAllIssues = async (req, res) => {
  try {
    // Newest issues first for easier UI display.
    const issues = await Issue.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json(issues);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch issues' });
  }
};

const getIssueById = async (req, res) => {
  const issueId = Number(req.params.id);

  // Reject non-numeric ids before querying the database.
  if (!Number.isInteger(issueId) || issueId <= 0) {
    return res.status(400).json({ message: 'Invalid issue id' });
  }

  try {
    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    return res.status(200).json(issue);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch issue' });
  }
};

const postIssue = async (req, res) => {
  const { title, description, category, status } = req.body;

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!isNonEmptyString(description)) {
    return res.status(400).json({ message: 'Description is required' });
  }

  try {
    // Defaults keep API behavior consistent when optional fields are missing.
    const newIssue = await Issue.create({
      title: title.trim(),
      description: description.trim(),
      category: isNonEmptyString(category) ? category.trim() : 'general',
      status: isNonEmptyString(status) ? status.trim() : 'open',
    });

    return res.status(201).json(newIssue);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create issue' });
  }
};

const putIssue = async (req, res) => {
  const issueId = Number(req.params.id);

  if (!Number.isInteger(issueId) || issueId <= 0) {
    return res.status(400).json({ message: 'Invalid issue id' });
  }

  if ('title' in req.body && !isNonEmptyString(req.body.title)) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }

  if ('description' in req.body && !isNonEmptyString(req.body.description)) {
    return res.status(400).json({ message: 'Description cannot be empty' });
  }

  try {
    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Merge updates while preserving existing values for omitted fields.
    const updatedIssue = await issue.update({
      ...req.body,
      title: isNonEmptyString(req.body.title) ? req.body.title.trim() : issue.title,
      description: isNonEmptyString(req.body.description) ? req.body.description.trim() : issue.description,
      category: isNonEmptyString(req.body.category) ? req.body.category.trim() : issue.category,
      status: isNonEmptyString(req.body.status) ? req.body.status.trim() : issue.status,
    });

    return res.status(200).json(updatedIssue);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update issue' });
  }
};

const deleteIssue = async (req, res) => {
  const issueId = Number(req.params.id);

  if (!Number.isInteger(issueId) || issueId <= 0) {
    return res.status(400).json({ message: 'Invalid issue id' });
  }

  try {
    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // destroy() removes the record from the issues table.
    await issue.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete issue' });
  }
};

module.exports = {
  getAllIssues,
  getIssueById,
  postIssue,
  putIssue,
  deleteIssue,
};