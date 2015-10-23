app.factory('FollowService', ['$rootScope', '$http', '$q', 'UserService', function ($rootScope, $http, $q, UserService) {

    var loadFollowing = function (user) {
        var callback = arguments[1];
        var requests = {followedBy: $http.get(URLS.FOLLOW + '/followedby/' + user)};
        if(UserService.currentUsername()){
            requests.followedByCurrentUser = $http.get(URLS.FOLLOW + '/followedby/' + UserService.currentUsername());
        }
        $q.all(requests).then(function (results) {
            if(results.followedByCurrentUser){
                var followedByUser = _.map(results.followedByCurrentUser.data, function(f){return f.followed.id;});
                _.each(results.followedBy.data, function(followed){
                        followed.alreadyFollowed = followedByUser.indexOf(followed.followed.id) > -1;
                });
            }
            if(callback) callback(results.followedBy.data);
        });
    };

    var unfollow = function(user){
        var callback = arguments[1];
        $http.post(URLS.FOLLOW+'/unfollow', {id: user}).then(function (response) {
            if(callback) callback(response.data);
        });
    }

    var follow = function(user){
        var callback = arguments[1];
        $http.post(URLS.FOLLOW+'/follow', {id: user}).then(function (response) {
            if(callback) callback(response.data);
        });
    }

    return {
        loadFollowing: loadFollowing,
        unfollow: unfollow,
        follow: follow
    }

}]);