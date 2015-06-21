/**
 * Created by Shivam Mathur on 22-06-2015.
 */
appname.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl:'/main',
            controller: 'main'
        })
        .when('/input', {
            templateUrl: '/input',
            controller: 'input'
        })
        .when('/route1', {
            templateUrl: 'views/route1.html',
            controller: 'content'
        })
        .otherwise({
            redirectTo: '/'
        });
});