const express = require('express');
const body_parser = require('body-parser');
const fs = require('fs');
const https = require('https');

const DateOperations = require('./classes/DateOperations');
const ManagerCreator = require('./classes/Managers/ManagerCreator');

const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('assets'));

var options = {
    key: fs.readFileSync('certs/key.pem'),
    cert: fs.readFileSync('certs/cert.pem')
};
https.createServer(options, app).listen(443);



app.get('/api/countries', async (req, res) => {
    const man = ManagerCreator.getManager();
    res.json(await man.getCountries());
});

app.get('/api/:country/groups', async (req, res) => {
    const { country } = req.params;
    const man = ManagerCreator.getManager();
    res.json(await man.getGroups(country, DateOperations.getYesterday()));
});


app.get('/api/:country/:social/accounts', async (req, res) => {
    const { country, social } = req.params;
    const man = ManagerCreator.getManager(social);
    res.json(await man.getAccounts(country, DateOperations.getYesterday()));
});

app.get('/api/:social/accounts/:group/all', async (req, res) => {
    const { social, group } = req.params;
    const man = ManagerCreator.getManager(social);
    res.json(await man.getAccountsByGroup(group, DateOperations.getYesterday()));
});

app.get('/api/:social/accounts/:handle/info', async (req, res) => {
    const { social, handle } = req.params;
    const man = ManagerCreator.getManager(social);
    res.json(await man.getAccountInfo(handle, DateOperations.getYesterday()));
});

app.get('/api/:social/accounts/:handle/insights', async (req, res) => {
    const { social, handle } = req.params;
    const man = ManagerCreator.getManager(social);
    res.json(await man.getAccountInsights(handle, DateOperations.getYesterday()));
});

app.get('/api/:social/groups/:group/info', async (req, res) => {
    const { social, group } = req.params;
    const man = ManagerCreator.getManager(social);
    res.json(await man.getGroupInfo(group, DateOperations.getYesterday()));
});

app.get('/api/:social/groups/:group/insights', async (req, res) => {
    const { social, group } = req.params;
    const man = ManagerCreator.getManager(social);
    res.json(await man.getGroupInsights(group, DateOperations.getYesterday()));
});


app.get('/api/:social/accounts/:handle/hashtags/:since/:limit', async (req, res) => {
    const { social, handle, since, limit } = req.params;
    const since_mapper = {
        'w': DateOperations.goDaysBackFromNow(7),
        'm': DateOperations.goMonthsBackFromNow(1),
        'y': DateOperations.goYearsBackFromNow(1)
    };

    const man = ManagerCreator.getManager(social);
    res.json(await man.getAccountHashtags(handle, since_mapper[since], limit));
});