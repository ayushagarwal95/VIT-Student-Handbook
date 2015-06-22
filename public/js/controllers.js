/**
 * Created by Shivam Mathur on 22-06-2015.
 */
var articles = [];
var controllers = {};
var resultsScope;
var x = 0;
/***
 *  header Controller
 * */
controllers.header = function ($scope, $http, $q) {

    $scope.searchArt = function () {
        searchArticle($scope, $http, $q, testing);

    };
};
controllers.browse = function ($scope, $http, $q) {
    $scope.searchArt = function () {
        searchArticle($scope, $http, $q, $scope.displayArt)
    };
    $scope.displayArt = function (data) {
        console.log(data);
    };
};
controllers.results = function ($scope) {
    $scope.articles = [];
    resultsScope = $scope;
    $scope.fun = function () {

        if (x == 0) {
            trans();
            x = 1;
        }
    };


};
function testing(data) {

    resultsScope.articles = data;

    setDynamicElements();
    resultsScope.fun();

}
/***
 * Main
 */
controllers.main = function ($scope, $http) {

};
/***
 *  Input Controller
 * */
controllers.input = function ($scope, $http, FileUploader) {
    $scope.formDatain = {};
    $scope.formDataFind = {};
    $scope.formDataGet = {};
    $scope.formDelete = {};
    $scope.formImage = {};
    $scope.findMessage = null;
    $scope.uploader = new FileUploader({
        url: '/input/upload'
    });
    $scope.addImage = function () {
        $scope.uploader.queue[0].upload();
    };

    $scope.findData = function () {
        find_article($http, $scope)
    };
    $scope.processForm = function () {
        newArticle($http, $scope);
    };
    $scope.editArticle = function () {
        var formDataEdit = {}
        formDataEdit.e_m_category = $scope.formDataGet.main_category;
        formDataEdit.e_s_category = $scope.formDataGet.sub_category;
        formDataEdit.e_topic = $scope.formDataGet.topic;
        formDataEdit.e_heading = $scope.formDataGet.heading;
        formDataEdit.e_contentText = $scope.formDataGet.content;
        formDataEdit.e_tag = $scope.formDataGet.tags;

        edit($http, $scope, formDataEdit);
    }
    $scope.deleteArticle = function () {
        deleteArt($http, $scope);
    }
    $scope.$on('$routeChangeSuccess', setDynamicElements());

}

appname.controller(controllers);