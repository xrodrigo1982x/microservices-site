app.factory('TweetService', ['$rootScope', '$http', '$q', 'UserService', function ($rootScope, $http, $q, UserService) {

    var loadTweets = function (user, page) {
        var callback = arguments[2];
        /*$http.get(URLS.TWEETS + '/timeline/' + user).then(function (response) {
            if(callback) callback(response.data);
        });*/
        var requests = {
            tweets: $http.get(URLS.TWEETS + '/timeline/' + user)
        };
        if(UserService.currentUsername()){
            requests.followedByCurrentUser = $http.get(URLS.FOLLOW + '/followedby/' + UserService.currentUsername());
        }
        $q.all(requests).then(function (results) {
            if(results.followedByCurrentUser){
                var followedByUser = _.map(results.followedByCurrentUser.data, function(f){return f.followed.id;});
                _.each(results.tweets.data.content, function(tweet){
                    tweet.alreadyFollowed = followedByUser.indexOf(tweet.user) > -1;
                    tweet.followed = {};
                    tweet.followed.id = tweet.user;
                });
            }
            if(callback) callback(results.tweets.data);
        });
    };

    var search = function (q) {
        var callback = arguments[1];
        var requests = {
            tweets: $http.get(URLS.TWEETS + '/search', {params: {q: q}})
        };
        if(UserService.currentUsername()){
            requests.followedByCurrentUser = $http.get(URLS.FOLLOW + '/followedby/' + UserService.currentUsername());
        }
        $q.all(requests).then(function (results) {
            if(results.followedByCurrentUser){
                var followedByUser = _.map(results.followedByCurrentUser.data, function(f){return f.followed.id;});
                _.each(results.tweets.data.content, function(tweet){
                    tweet.alreadyFollowed = followedByUser.indexOf(tweet.user) > -1;
                    tweet.followed = {};
                    tweet.followed.id = tweet.user;
                });
            }
            if(callback) callback(results.tweets.data);
        });
    };

    var saveTweet = function (tweet) {
        var callback = arguments[1];
        $http.post(URLS.TWEETS, tweet).then(function (response) {
            if(callback) callback(response.data);
        });
    }

    return {
        loadTweets: loadTweets,
        saveTweet: saveTweet,
        search: search
    }

}]);