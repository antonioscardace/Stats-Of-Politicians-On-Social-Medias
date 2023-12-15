const { DataTypes } = require('sequelize');
const sequelize = require('./base');
const TwitterAccounts = require('./TwitterAccounts');

const TwitterHashtagsAccounts = sequelize.define('twitter_hashtags_accounts', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    hashtag: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    handle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: TwitterAccounts,
            key: 'handle',
        },
        onDelete: 'CASCADE'
    }
});

TwitterHashtagsAccounts.belongsTo(TwitterAccounts, {foreignKey: 'handle', targetKey: 'handle', onDelete: 'CASCADE'});

module.exports = TwitterHashtagsAccounts