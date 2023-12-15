const { DataTypes } = require('sequelize');
const sequelize = require('./base');
const TwitterAccounts = require('./TwitterAccounts');

const TwitterDailyStatsAccounts = sequelize.define('twitter_dailystats_accounts', {
    handle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
            model: TwitterAccounts,
            key: 'handle',
        },
        onDelete: 'CASCADE'
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true
    },
    followers_count: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    fetched_tweets_count: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    tot_likes: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    tot_retweets: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    tot_replies: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    avg_len: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false
    },
    avg_likes: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false
    },
    avg_retweets: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false
    },
    avg_replies: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false
    },
    avg_sentiment: {
        type: DataTypes.ENUM('Positive', 'Negative', 'Neutral', 'Null'),
        allowNull: false
    }
});

TwitterDailyStatsAccounts.belongsTo(TwitterAccounts, {foreignKey: 'handle', targetKey: 'handle', onDelete: 'CASCADE'});

module.exports = TwitterDailyStatsAccounts