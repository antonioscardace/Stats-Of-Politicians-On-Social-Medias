var app = angular.module('general', []);

app.controller('groupsCtrl', ($scope, $http) => {

    $scope.redirect = (name) => location.href="group.html?name=" + name;

    $http.get('/api/ITA/groups')
    .then(res => $scope.groups = res.data)
    .catch(error => console.error(error));

});

app.controller('accountsCtrl', ($scope, $http) => {

    $scope.accounts = [];
    $scope.redirect = (handle) => location.href="account.html?handle=" + handle;

    $http.get('/api/ITA/twitter/accounts')
    .then(res => {
        for (const account of res.data) {
            $http.get(`api/twitter/accounts/${account.handle}/info`)
            .then(accountRes => $scope.accounts.push(accountRes.data[0]))
            .catch(error => console.error(error));
        }
    })
    .catch(error => console.error(error));

});

$(document).ready(() => {  
    let mq_smartphone = window.matchMedia('(min-width: 320px) and (max-width: 480px)');
    let mq_tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
    let fromTime = mq_smartphone.matches ? '5d' : (mq_tablet.matches ? '12d' : '3M');

    $('#iframe-num-followers').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=30&theme=light`);
    $('#iframe-num-tweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=32&theme=light`);
    $('#iframe-avg-len').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=29&theme=light`);
    $('#iframe-avg-likes').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=28&theme=light`);
    $('#iframe-avg-retweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=33&theme=light`);
    $('#iframe-avg-replies').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=31&theme=light`);
});