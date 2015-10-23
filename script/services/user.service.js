app.factory('UserService', ['$rootScope', '$http', '$cookies', function ($rootScope, $http, $cookies) {

    return {
        load: function () {
            var event = arguments[1];
            var optional = arguments[2] || null;
            $http.get(URLS.USER + arguments[0]).success(function (response) {
                if (optional == null) {
                    $rootScope.$broadcast(event, response);
                } else {
                    optional.response = response;
                    $rootScope.$broadcast(event, optional);
                }
            })
        },
        currentUsername: function () {
            if($cookies.getObject('user') == null){
                return "";
            }else{
                return $cookies.getObject('user').user;
            }
        },
        logout: function () {
            $cookies.remove('user');
            $cookies.remove('name');
        },
        name: function(){
            return $cookies.get('name');
        },
        saveUser: function(user){
            $cookies.putObject('user', user);
        },
        saveName: function(name){
            $cookies.put('name', name);
        },
        isLoggedIn: function(){
            return $cookies.get('user') != null;
        },
        save: function(user){
            $http.post(URLS.USER, user).success(function(response){
                $rootScope.$broadcast(EVENTS.onUserSaved, response);
            }).error(function(response){
                console.log(response);
            });
        }
    }
}]);