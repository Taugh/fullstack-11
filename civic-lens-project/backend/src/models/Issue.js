const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Defines the issues table schema used by Phase 2 CRUD operations.
const Issue = sequelize.define(
  'Issue',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'general',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open',
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'issues',
    // Adds createdAt and updatedAt automatically.
    timestamps: true,
  }
);

module.exports = Issue;