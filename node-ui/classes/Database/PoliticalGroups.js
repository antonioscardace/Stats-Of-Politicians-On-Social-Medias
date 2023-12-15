const { DataTypes } = require('sequelize');
const sequelize = require('./base');

const PoliticalGroups = sequelize.define('political_groups', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true
    },
    country: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    logo_color: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    last_update: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = PoliticalGroups