/**
 * Created by Shivam Mathur on 22-06-2015.
 */
function setDynamicElements(s) {

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('#article_tabs .tabs').tabs();
    x = 0;
    if (s) {
        stickFooter();
    } else {
        removeSticky();
    }
}
function stickFooter() {

    if ($('#footer').offset().top + 10 < window.innerHeight) {
        document.getElementById('footer').style.position = 'absolute';
        document.getElementById('footer').style.bottom = '0';
        document.getElementById('footer').style.width = '100%';
    } else {
        removeSticky();
    }
}
function removeSticky() {
    document.getElementById('footer').style.position = 'relative';
}
/***
 * Ajax Calls
 *
 */
function edit($http, $scope, editData) {
    $http({
        method: 'POST',
        url: '/input/edit',
        data: $.param(editData),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function (data) {
            console.log(data);

            if (!data) {
                // if not successful, bind errors to error variables
                $scope.msg = data.message;

            } else {
                // if successful, bind success message to message
                $scope.msg = data.message;
                alert($scope.msg);
                clearData($scope);
            }
        });
}
function newArticle($http, $scope) {
    $http({
        method: 'POST',
        url: '/input/new',
        data: $.param($scope.formDatain),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function (data) {
            console.log(data);

            if (!data) {
                // if not successful, bind errors to error variables
                $scope.message = data.message;

            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
                alert($scope.message);
                clearData($scope);
            }
        });
}
function deleteArt($http, $scope) {
    $http({
        method: 'POST',
        url: '/input/delete',
        data: $.param($scope.formDelete),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function (data) {
            console.log(data);

            if (!data) {
                // if not successful, bind errors to error variables
                $scope.message = data.message;

            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
                alert($scope.message);

            }
        });
}
function clearData($scope) {
    $scope.formDatain = {};
    $scope.formDataGet = {};
    $scope.findMessage = null;
}
function find_article($http, $scope) {
    $http({
        method: 'POST',
        url: '/input/find',
        data: $.param($scope.formDataFind),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function (data) {
            console.log(data);

            if (!data) {
                // if not successful, bind errors to error variables
                $scope.findMessage = "Not Found";

            } else {
                // if successful, bind success message to message
                $scope.findMessage = data.message;

                $scope.formDataGet = data.results;
                console.log(data);
            }
            alert($scope.findMessage);
        });
}

function searchArticle($scope, $http, $q, callback) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: '/search',
        params: {tag: $scope.search}
    }).success(function (data) {
        deferred.resolve(data);
        deferred.promise.then(function (data) {
            console.log(data);
            callback(data);
        });

    });

}
function trans() {
    Materialize.showStaggeredList("#article_tabs ul");

}
