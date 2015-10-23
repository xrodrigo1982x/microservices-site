app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/timeline/:user', {templateUrl: 'pages/timeline.html'})
        .when('/login', {templateUrl: 'pages/login.html'})
        .when('/logout', {templateUrl: 'pages/login.html'})
        .when('/entrar', {templateUrl: 'pages/entrar.html'})
        .when('/perfil', {templateUrl: 'pages/editProfile.html'})
        .when('/seguindo/:user?', {templateUrl: 'pages/seguindo.html'})
        .when('/busca', {templateUrl: 'pages/search.html'})
        .otherwise({redirectTo: '/'});
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.options = {
            'Authorization': 'Basic d2ViOndlYnBhc3M='
    };
    $httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json;charset=utf-8'};
}]);

app.factory('tokenInterceptor', ['$cookies', function($cookies) {
    return {
        'request': function(config) {
            if($cookies.get('user') != null){
                config.headers.authorization = 'Bearer ' + $cookies.getObject('user').token;
            }
            return config;
        }
    };
}]);

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('tokenInterceptor');
}]);
