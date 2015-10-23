var app = angular.module('app', ['ngRoute', 'ngCookies', 'angularMoment']);
app.run(function (amMoment) {
    amMoment.changeLocale('pt-br');
});
var apiBase = '';
var URLS = {
    TWEETS: apiBase + '/tweet',
    FOLLOW: apiBase + '/follow',
    LOGIN: apiBase + '/oauth/token',
    CRIAR: apiBase + '/conta/criar',
    USER: apiBase + '/user/'
};

var EVENTS = {
    onLoadTweets: 'onLoadTweets',
    onSaveTweet: 'onSaveTweet',
    onLogin: 'onLogin',
    onLoginFailed: 'onLoginFailed',
    onCriar: 'onCriar',
    onCriarFailed: 'onCriarFailed',
    onLoadUser: 'onLoadUser',
    onUserLoaded: 'onUserLoaded',
    onUserSaved: 'onUserSaved',
    onFollowLoaded: 'onFollowLoaded'
}