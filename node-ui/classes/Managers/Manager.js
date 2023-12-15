const Sequelize = require('sequelize');
const PoliticalGroups = require('../Database/PoliticalGroups');

class Manager {

    async getCountries() {
        return await PoliticalGroups.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('country')), 'country']]
        });
    }

    async getGroups(country, date) {
        return await PoliticalGroups.findAll({
            where: {
                country: country,
                last_update: date
            }
        });
    }

    async getAccounts() {
        throw new Error('Method must be implemented.');
    }
}

module.exports = Manager