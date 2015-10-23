app.factory('LoginService', ['$rootScope', '$http', function ($rootScope, $http) {

    var login = function (user) {
        user.grant_type = 'password';
        user.scope = 'api_scope';

        $http({
            method: 'POST',
            url: URLS.LOGIN,
            data: $.param(user),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic d2ViOndlYnBhc3M='
            }
        })
            .success(function (response) {
                $rootScope.$broadcast(EVENTS.onLogin, {token: response.access_token, user: user.username});
            })
            .error(function (data) {
                $rootScope.$broadcast(EVENTS.onLoginFailed, data);
            });
    };

    var criar = function(user){
        $http.post(URLS.CRIAR, user)
            .then(function (response) {
                $rootScope.$broadcast(EVENTS.onCriar, {user: user.username});
            }, function (response) {
                $rootScope.$broadcast(EVENTS.onCriarFailed, response);
            });
    }

    return {
        login: login,
        criar: criar
    }

}]);