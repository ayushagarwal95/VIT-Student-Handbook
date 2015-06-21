/**
 * Created by Shivam Mathur on 21-06-2015.
 */
var app = angular.module('handbook', ['ngRoute']);

var controllers ={};
controllers.header = function($scope,$http){
    $scope.name = 'stuff';
    $http.get('/input').
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.name = data;
            $scope.alert(status);
            console.log(headers,config);
        }).
        error(function(data, status, headers, config) {
           $scope.name = 'err';
        });
};

controllers.content = function($scope){$scope.content = 'Controller Change';};
app.controller(controllers);

app.config(function($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'main.ejs'
        })
        .when('/route1',{
            templateUrl: 'views/route1.html',
            controller:'content'
        })
        .otherwise({
            redirectTo : '/'
        });
});

