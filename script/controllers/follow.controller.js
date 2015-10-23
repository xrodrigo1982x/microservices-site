app.controller('FollowController', ['$scope', '$rootScope', 'FollowService', '$routeParams', 'UserService', function ($scope, $rootScope, FollowService, $routeParams, UserService) {

    $scope.loadFollowing = function () {
        var user = $routeParams.user || UserService.currentUsername();
        FollowService.loadFollowing(user, function(following){
            $scope.following = following;
        });
    }

    $scope.unfollow = function(user){
        FollowService.unfollow(user.followed.id, function(response){
            user.alreadyFollowed = false;
        });
    }

    $scope.dofollow = function(user){
        FollowService.follow(user.followed.id, function(response){
            user.alreadyFollowed = true;
        });
    }

}]);