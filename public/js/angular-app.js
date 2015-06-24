var appname = angular.module('handbook', ['ngRoute', 'angularFileUpload','angular-loading-bar']);
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
appname.directive('ngRepeatFinish', function() {
    return function(scope, element, attrs) {
        angular.element(element).css('color','blue');
        if (scope.$last){
            setDynamicElements();
        }
    };
});
appname.directive('ngElementReady', [function() {
    return {
        priority: -1000, // a low number so this directive loads after all other directives have loaded.
        restrict: "A", // attribute only
        link: function($scope, $element, $attributes) {
            console.log(" -- Element ready!");
            setDynamicElements();
            // do what you want here.
        }
    };
}]);
appname.service('share', function () {
    var property = [];
    return {
        getProperty: function () {
            return property;
        },
        setProperty: function (value) {
            property = value;
            console.log(property);
        }
    };
});

appname.directive('testDir', function () {
    return function (scope, element, attrs) {

        if (scope.$last) {
            trans();

        }
    };
});
appname.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 0;
}]);