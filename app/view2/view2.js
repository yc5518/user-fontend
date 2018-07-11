'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($http,$scope) {
    $http.get("http://localhost:8080/demo/v1/users")
        .then(function (result) {
            if(result.data.userList)
                $scope.userList = result.data.userList;
        });

    $scope.view = function(x){
        if(x)
            location.href="#!/view1?id=" + x.id;
        else
            alert("No data to view!");
    }
    $scope.search = function(){
        var url = "http://localhost:8080/demo/v1/users";
        if($scope.searchName){
            if($scope.searchName.trim()){
                url = "http://localhost:8080/demo/v1/users?name=" + $scope.searchName
            }
        }
        $http.get(url)
            .then(function (result) {
                if(result.data.userList)
                    $scope.userList = result.data.userList;
            });
    }

});
