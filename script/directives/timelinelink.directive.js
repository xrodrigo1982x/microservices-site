app.directive('timelineLink', function(){
    return {
        restrict: 'E',
        scope: {
            text: '@',
            user: '='
        },
        template: "<a href='#/timeline/{{user}}'>{{text || user}}</a>"
    };
});