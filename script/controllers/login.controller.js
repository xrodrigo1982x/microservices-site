app.controller('LoginController', ['$scope', '$rootScope', 'LoginService', 'UserService', '$routeParams', '$location',
    function($scope, $rootScope, LoginService, UserService, $routeParams, $location){

    $scope.user = {username: $routeParams.user};

    $scope.logout = function(){
        UserService.logout();
        $location.path('/login');
    }

    $scope.isLoggedIn = function(){
        return UserService.isLoggedIn();
    }

    $scope.currentUsername = function(){
        return UserService.currentUsername();
    }

    $scope.login = function(user){
        LoginService.login(user);
    }

    $scope.criar = function(user){
        LoginService.criar(user);
    }

    $scope.name = function(){
        return UserService.name();
    }

    $rootScope.$on(EVENTS.onLogin, function(evt, data){
        UserService.saveUser(data);
        $location.path("timeline/"+data.user);
        UserService.load(data.user, EVENTS.onUserLoaded+'login');
    });

    $rootScope.$on(EVENTS.onCriar, function(evt, data){
        $location.path('/login');
        $location.search('user', data.user);
    });

    $rootScope.$on(EVENTS.onUserLoaded+'login', function(evt, data){
        UserService.saveName(data.name);
    });

    $rootScope.$on(EVENTS.onCriarFailed, function(evt, data){
        if(data.status == 302)
            $scope.userExists = true;
        if(data.status == 400)
            $scope.errors = data.data;
    });

}]);