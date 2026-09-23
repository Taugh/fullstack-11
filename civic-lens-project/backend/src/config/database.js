const { Sequelize } = require('sequelize');

// Prefer DATABASE_URL from .env; fallback helps local setup during early development.
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/civiclens';

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;