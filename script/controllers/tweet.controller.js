app.controller('TweetController', ['$scope', '$rootScope', 'TweetService', '$routeParams', 'UserService',
    function ($scope, $rootScope, TweetService, $routeParams, UserService) {

    if($scope.showTweetBox == null){
        $scope.showTweetBox = false;
    };

    $scope.loadTweets = function (page) {
        TweetService.loadTweets($routeParams.user, page, function(tweets){
            if ($scope.tweets == null) $scope.tweets = [];
            _.each(tweets.content, function(t){
                $scope.tweets.push(t);
            });
        });
    };

    $scope.showNewTweetBox = function(){
        $scope.showTweetBox = true;
        $scope.newTweet = {content: ''};
    };

    $scope.cancelTweet = function(){
        $scope.showTweetBox = false;
    };

    $scope.saveTweet = function () {
        TweetService.saveTweet($scope.newTweet, function(tweet){
            $scope.tweets.unshift(tweet);
            $scope.showTweetBox = false;
        });
    };

    $scope.search = function(q){
        TweetService.search(q, function(tweets){
            $scope.tweets = tweets.content;
        });
    };

    $scope.canAddTweet = function(){
        return $routeParams.user == UserService.currentUsername();
    };

    $scope.fromCurrentUsername = function(tweet){
         return tweet.user == UserService.currentUsername();
    };

}]);