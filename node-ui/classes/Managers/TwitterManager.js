const Sequelize = require('sequelize');
const Manager = require('./Manager');

const PoliticalGroups = require('../Database/PoliticalGroups');
const TwitterAccounts = require('../Database/TwitterAccounts');
const TwitterDailyStatsAccounts = require('../Database/TwitterDailyStatsAccounts');
const TwitterDailyStatsGroups = require('../Database/TwitterDailyStatsGroups');
const TwitterHashtagsAccounts = require('../Database/TwitterHashtagsAccounts');

class TwitterManager extends Manager {

    async getAccounts(country, date) {
        return await TwitterAccounts.findAll({
            attributes: ['handle', 'profile_image_url'],
            include: [{
                required: true,
                model: PoliticalGroups,
                where: { country: country },
                attributes: ['name'],
            }],
            where: { last_update: date }
        });
    }

    async getAccountHashtags(username, date, limit) {
        return TwitterHashtagsAccounts.findAll({
            attributes: ['hashtag', [Sequelize.fn('COUNT', 'handle'), 'occurrences']],
            group: ['handle', 'hashtag'],
            order: [['occurrences', 'DESC']],
            limit: parseInt(limit),
            where: {
                handle: username,
                date: { [Sequelize.Op.gte]: date }
            }
        });
    }

    async getAccountsByGroup(name, date) {
        return await TwitterAccounts.findAll({
            attributes: ['handle'],
            where: { 
                last_update: date,
                name: name
            }
        });
    }

    async getAccountInfo(username, date) {
        return await TwitterAccounts.findAll({
            where: { 
                handle: username,
                last_update: date
            }
        });
    }

    async getAccountInsights(username, date) {
        return await TwitterDailyStatsAccounts.findAll({
            where: { 
                handle: username,
                date: date
            }
        });
    }

    async getGroupInfo(name, date) {
        return await PoliticalGroups.findAll({
            where: { 
                name: name,
                last_update: date
            }
        });
    }

    async getGroupInsights(name, date) {
        return await TwitterDailyStatsGroups.findAll({
            where: { 
                name: name,
                date: date
            }
        });
    }
}

module.exports = TwitterManager