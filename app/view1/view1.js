'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($http,$scope) {
    $scope.status = ["perspective", "non-active", "current"];

    $scope.setValue = function () {
        //$scope.users.status = $scope.selectedStatus;
        alert($scope.selectedStatus)
    }

    $scope.getStatus = function () {
        for(var i = 0;i<$scope.status.length;i++){
            if($scope.status[i]==$scope.users.userStatus){
                break;
            }
        }
        return "status[" + i + "]";
    }

    function GetUrlParam(paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");

        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    }


    var id = GetUrlParam("id");

    $scope.loadFirst = function(){
        $http.get("http://localhost:8080/demo/v1/users/" + id)
            .then(function (result) {
                $scope.users = result.data;
                for(var i = 0;i<$scope.status.length;i++){
                    if($scope.status[i]==$scope.users.userStatus){
                        return "selectedStatus = status[" + i + "]";
                    }
                }
            });



    }

    $scope.save = function(users){
        $http.put("http://localhost:8080/demo/v1/users/" + users.id ,users)
            .success(function (result) {

            });
        location.href="#!/view2";


    }
});
