app.controller('UserController', ['$scope', '$rootScope', 'LoginService', 'UserService', '$routeParams', '$location',
    function ($scope, $rootScope, LoginService, UserService, $routeParams, $location) {

        $scope.loadCurrentUser = function(){
            $scope.load(UserService.currentUsername());
        }

        $scope.save = function(user){
            UserService.save(user);
        }

        $scope.load = function(username){
            UserService.load(username, EVENTS.onUserLoaded+'Profile');
        }

        $rootScope.$on(EVENTS.onUserSaved, function(evt, data){
            UserService.saveName(data.name);
            $location.path('/timeline/'+data.username);
        });

        $rootScope.$on(EVENTS.onUserLoaded+'Profile', function(evt, data){
            $scope.user = data;
        });

}]);