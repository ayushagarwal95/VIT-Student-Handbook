/**
 * Created by Shivam Mathur on 22-06-2015.
 */
var controllers = {};
var x = 0;
var b=1;
/***
 *  header Controller
 * */
controllers.header = function ($scope, $http, $q,$rootScope) {


    $scope.searchArt = function () {
        searchArticle($scope, $http, $q,$rootScope);

    };
    $scope.$on('$routeChangeSuccess', setDynamicElements());
};
controllers.sideBar = function ($scope, $http, $q,$rootScope) {

    $scope.b = function(v){
        var category;
        if(!v){v=1;}
        b = v;
        if(v == 1)
            category = "Academics";
        else if(v==2)
            category = "Student Organization";
        else if(v==3)
            category = "College";
        else if(v==4)
            category = "LifeHack";
        else if(v==5)
            category = "Hostel";
        else if(v==6)
            category = "Around VIT and Vellore";

        searchCat($rootScope,$http,$q,category);
      //  console.log($rootScope.err);
    };


};
controllers.browse = function ($scope,$rootScope) {
    $scope.setup = function(){
        $rootScope.err = 'Please choose a category from the category section.';
        setcard();
        setDynamicElements();
    };
    $scope.cat = function(){
        if( $rootScope.err != 'Please choose a category from the category section.')
            return b;
        else
            return 0;
    };

    $scope.brow = function(){
        return $rootScope.searchCat;
    };
    $scope.$on('$routeChangeSuccess');
};
function setcard(){
    document.getElementById('browse_card').style.height = window.innerHeight + 'px';
}

controllers.results = function ($scope,$rootScope) {
    $scope.setup = function(){
        $rootScope.err = 'Use the Search Bar to search for Articles';
        setDynamicElements();
    };
    $scope.$on('$routeChangeSuccess', setDynamicElements(1));
    $scope.res = function(){
        return $rootScope.searchTag;
    };


};

/***
 * Main
 */
controllers.main = function ($scope, $http) {
    $scope.$on('$routeChangeSuccess', setDynamicElements());
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
        var formDataEdit = {};
        formDataEdit.e_m_category = $scope.formDataGet.main_category;
        formDataEdit.e_s_category = $scope.formDataGet.sub_category;
        formDataEdit.e_topic = $scope.formDataGet.topic;
        formDataEdit.e_heading = $scope.formDataGet.heading;
        formDataEdit.e_contentText = $scope.formDataGet.content;
        formDataEdit.e_tag = $scope.formDataGet.tags;
       // console.log(formDataEdit);
        edit($http, $scope, formDataEdit);
    };
    $scope.deleteArticle = function () {
        deleteArt($http, $scope);
    };
    $scope.$on('$routeChangeSuccess', setDynamicElements());

};

appname.controller(controllers);
