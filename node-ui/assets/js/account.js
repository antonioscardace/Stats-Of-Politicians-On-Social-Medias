var app = angular.module('account', []);

app.controller('dataCtrl', ($scope, $http, $q) => {

    $scope.verified = false;
    $scope.redirect = (handle) => location.href="account.html?handle=" + handle;
    const handle = getParamFromUrl('handle');

    let info = $http.get(`/api/twitter/accounts/${handle}/info`);
    let stats = $http.get(`/api/twitter/accounts/${handle}/insights`);
    let whashtags = $http.get(`/api/twitter/accounts/${handle}/hashtags/w/5`);
    let mhashtags = $http.get(`/api/twitter/accounts/${handle}/hashtags/m/5`);
    let yhashtags = $http.get(`/api/twitter/accounts/${handle}/hashtags/y/5`);

    $q.all([info, stats, whashtags, mhashtags, yhashtags]).then(responses => {

        if (Object.keys(responses[0].data).length === 0 ||
            Object.keys(responses[1].data).length === 0)
            throw new Error('Check your parameters.');

        $scope.name = responses[0].data[0].name;
        $scope.handle = responses[0].data[0].handle;
        $scope.img_url = responses[0].data[0].profile_image_url;
        $scope.verified = responses[0].data[0].verified;
        $scope.created_on = responses[0].data[0].created_on;
        $scope.followers = responses[0].data[0].followers_count;
        $scope.following = responses[0].data[0].following_count;
        $scope.tot_tweets = responses[0].data[0].tot_tweets_count;

        $scope.descr = (responses[0].data[0].description.length > 0) ?
            responses[0].data[0].description :
            '⚠️ No description found. ⚠️';

        $scope.num_tweets = responses[1].data[0].fetched_tweets_count;
        $scope.tot_likes = responses[1].data[0].tot_likes;
        $scope.tot_retweets = responses[1].data[0].tot_retweets;
        $scope.tot_replies = responses[1].data[0].tot_replies;
        $scope.avg_len = responses[1].data[0].avg_len;
        $scope.avg_likes = responses[1].data[0].avg_likes;
        $scope.avg_retweets = responses[1].data[0].avg_retweets;
        $scope.avg_replies = responses[1].data[0].avg_replies;
        $scope.avg_sentiment = responses[1].data[0].avg_sentiment;

        $scope.whashtags = responses[2].data;
        $scope.mhashtags = responses[3].data;
        $scope.yhashtags = responses[4].data;

    })
    .catch(error => console.error(error));

});

$(document).ready(async () => {
    try {
        let mq_smartphone = window.matchMedia('(min-width: 320px) and (max-width: 480px)');
        let mq_tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
        let fromTime = mq_smartphone.matches ? '1M' : (mq_tablet.matches ? '3M' : '6M');
        const handle = getParamFromUrl('handle');
        
        $('#iframe-num-followers').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=13&theme=light&var-account_name=${handle}`);
        $('#iframe-num-tweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=2&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-len').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=14&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-likes').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=15&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-retweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=16&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-replies').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=17&theme=light&var-account_name=${handle}`);
    }
    catch(err) {
        console.error('Error during loading.');
    }
});
