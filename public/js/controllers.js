/**
 * Created by Shivam Mathur on 22-06-2015.
 */

var controllers = {};

/***
 *  header Controller
 * */
controllers.header = function ($scope) {



};

/***
 *  Input Controller
 * */
controllers.input = function ($scope, $http) {
    $scope.formDatain = {};
    $scope.formDataFind = {};
    $scope.formDataGet = {};
    $scope.formDelete ={};
    $scope.formImage = {};
    $scope.findMessage = null;
    $scope.addImage = function(){
        var fd = new FormData();
        fd.append('file', $scope.File);
        $http.post('/input/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': ''}
        })
            .success(function(data){
                if (!data) {
                    // if not successful, bind errors to error variables
                    $scope.message = data.message;

                } else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                    alert($scope.message);

                }
            })
            .error(function(){
            });
    };

    $scope.findData = function () {
        find_article($http, $scope)
    };
    $scope.processForm = function () {
        newArticle($http, $scope);
    };
    $scope.editArticle = function () {
        var formDataEdit = {}
        formDataEdit.e_m_category= $scope.formDataGet.main_category;
        formDataEdit.e_s_category= $scope.formDataGet.sub_category;
        formDataEdit.e_topic= $scope.formDataGet.topic;
        formDataEdit.e_heading= $scope.formDataGet.heading;
        formDataEdit.e_contentText= $scope.formDataGet.content;
        formDataEdit.e_tag= $scope.formDataGet.tags;

        edit($http, $scope, formDataEdit);
    }
    $scope.deleteArticle = function(){
        deleteArt($http, $scope);
    }
    $scope.$on('$routeChangeSuccess', setDynamicElements());

}

appname.controller(controllers);