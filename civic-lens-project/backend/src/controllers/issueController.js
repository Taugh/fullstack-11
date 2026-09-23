const issues = [];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const getAllIssues = (req, res) => {
  res.status(200).json(issues);
};

const getIssueById = (req, res) => {
  const issueId = Number(req.params.id);
  const issue = issues.find((item) => item.id === issueId);

  if (!issue) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  return res.status(200).json(issue);
};

const postIssue = (req, res) => {
  const { title, description, category, status } = req.body;

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!isNonEmptyString(description)) {
    return res.status(400).json({ message: 'Description is required' });
  }

  const newIssue = {
    id: issues.length + 1,
    title: title.trim(),
    description: description.trim(),
    category: isNonEmptyString(category) ? category.trim() : 'general',
    status: isNonEmptyString(status) ? status.trim() : 'open',
    createdAt: new Date().toISOString(),
  };

  issues.push(newIssue);
  return res.status(201).json(newIssue);
};

const putIssue = (req, res) => {
  const issueId = Number(req.params.id);
  const issueIndex = issues.findIndex((item) => item.id === issueId);

  if (issueIndex === -1) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  if ('title' in req.body && !isNonEmptyString(req.body.title)) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }

  if ('description' in req.body && !isNonEmptyString(req.body.description)) {
    return res.status(400).json({ message: 'Description cannot be empty' });
  }

  issues[issueIndex] = {
    ...issues[issueIndex],
    ...req.body,
    id: issues[issueIndex].id,
  };

  return res.status(200).json(issues[issueIndex]);
};

const deleteIssue = (req, res) => {
  const issueId = Number(req.params.id);
  const issueIndex = issues.findIndex((item) => item.id === issueId);

  if (issueIndex === -1) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  const deletedIssue = issues.splice(issueIndex, 1);
  return res.status(204).send();
};

module.exports = {
  getAllIssues,
  getIssueById,
  postIssue,
  putIssue,
  deleteIssue,
};