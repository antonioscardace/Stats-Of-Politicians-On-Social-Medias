var app = angular.module('group', []);

app.controller('dataCtrl', ($scope, $http, $q) => {

    $scope.redirect = (handle) => location.href="account.html?handle=" + handle;
    const name = getParamFromUrl('name');

    let info = $http.get(`/api/twitter/groups/${name}/info`);
    let stats = $http.get(`/api/twitter/groups/${name}/insights`);
    let accounts = $http.get(`/api/twitter/accounts/${name}/all`);

    $q.all([info, stats, accounts]).then(responses => {

        if (Object.keys(responses[0].data).length === 0 ||
            Object.keys(responses[1].data).length === 0 ||
            Object.keys(responses[2].data).length === 0)
            throw new Error('Check your parameters.');

        $scope.name = responses[0].data[0].name;
        $scope.logo_color = responses[0].data[0].logo_color;

        $scope.accounts = responses[2].data;

        $scope.followers_count = responses[1].data[0].followers_count;
        $scope.tot_tweets = responses[1].data[0].tot_tweets_count;
        $scope.num_accounts = responses[1].data[0].num_analyzed_accounts;
        $scope.fetched_tweets = responses[1].data[0].fetched_tweets_count;
        $scope.tot_likes = responses[1].data[0].tot_likes;
        $scope.tot_retweets = responses[1].data[0].tot_retweets;
        $scope.tot_replies = responses[1].data[0].tot_replies;
        $scope.avg_len = responses[1].data[0].avg_len;
        $scope.avg_likes = responses[1].data[0].avg_likes;
        $scope.avg_retweets = responses[1].data[0].avg_retweets;
        $scope.avg_replies = responses[1].data[0].avg_replies;
        $scope.avg_sentiment = responses[1].data[0].avg_sentiment;

    })
    .catch(error => console.error(error));

});

$(document).ready(async () => {
    try {
        let mq_smartphone = window.matchMedia('(min-width: 320px) and (max-width: 480px)');
        let mq_tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
        let fromTime = mq_smartphone.matches ? '1M' : (mq_tablet.matches ? '3M' : '6M');
        const name = getParamFromUrl('name');
        
        $('#iframe-num-followers').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=19&theme=light&var-group_name=${name}`);
        $('#iframe-num-tweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=21&theme=light&var-group_name=${name}`);
        $('#iframe-avg-len').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=22&theme=light&var-group_name=${name}`);
        $('#iframe-avg-likes').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=23&theme=light&var-group_name=${name}`);
        $('#iframe-avg-retweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=24&theme=light&var-group_name=${name}`);
        $('#iframe-avg-replies').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=25&theme=light&var-group_name=${name}`);
    }
    catch(err) {
        console.error('Error during loading.');
    }
});