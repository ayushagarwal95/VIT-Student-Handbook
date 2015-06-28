var appname = angular.module('handbook', ['ngRoute', 'angularFileUpload','angular-loading-bar','ngSanitize']);
appname.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
var setDynEle = 0;
/*

appname.directive('testDir', function () {
    return function (scope, element, attrs) {

        if (scope.$last) {
            trans();

        }
    };
});*/
appname.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 0;
}]);

appname.run(function($rootScope) {
    $rootScope.searchTag = [];
    $rootScope.searchCat = [];
    $rootScope.err = '';
});