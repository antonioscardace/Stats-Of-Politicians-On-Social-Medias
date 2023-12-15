const { DataTypes } = require('sequelize');
const sequelize = require('./base');
const PoliticalGroups = require('./PoliticalGroups');

const TwitterAccounts = sequelize.define('twitter_accounts', {
    handle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    id: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    profile_image_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    created_on: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    followers_count: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    following_count: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    tot_tweets_count: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    last_update: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        references: {
            model: PoliticalGroups,
            key: 'name',
        },
        onDelete: 'CASCADE'
    }
});

TwitterAccounts.belongsTo(PoliticalGroups, {foreignKey: 'name', onDelete: 'CASCADE'});

module.exports = TwitterAccounts