var appname = angular.module('handbook', ['ngRoute']);
appname.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
appname.service('share',function(){
    var property = [];
    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
            console.log(property);
        }
    };
});

appname.directive('testDir', function() {
    return function(scope, element, attrs) {

        if (scope.$last){
           trans();

        }
    };
})
