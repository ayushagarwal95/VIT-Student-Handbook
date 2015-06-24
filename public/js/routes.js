/**
 * Created by Shivam Mathur on 22-06-2015.
 */
appname.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/main',
            controller: 'main'
        })
        .when('/input', {
            templateUrl: '/input',
            controller: 'input'
        })
        .when('/results', {
            templateUrl: '/results',
            controller: 'results'
        })
        .when('/browse', {
            templateUrl: '/browse',
            controller: 'browse'
        })
        .otherwise({
            redirectTo: '/'
        });
});