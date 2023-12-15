const { DataTypes } = require('sequelize');
const sequelize = require('./base');
const PoliticalGroups = require('./PoliticalGroups');

const TwitterDailyStatsGroups = sequelize.define('twitter_dailystats_groups', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        references: {
            model: PoliticalGroups,
            key: 'name',
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
    num_analyzed_accounts: {
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
    tot_tweets_count: {
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

TwitterDailyStatsGroups.belongsTo(PoliticalGroups, {foreignKey: 'name', targetKey: 'name', onDelete: 'CASCADE'});

module.exports = TwitterDailyStatsGroups