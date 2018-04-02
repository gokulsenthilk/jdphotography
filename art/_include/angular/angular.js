var app = angular.module('jd', ['ngRoute']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
		.when("/", {
			templateUrl: "page1.html",
			controller: "MainCtrl"
		})
		.when("/page2", {
			templateUrl: "page2.html",
			controller: "SecondCtrl"
		})
		// .otherwise({ redirectTo: '/'})
		;
}]);

app.controller('MainCtrl', function($scope, srvShareData, $location) {
  
  $scope.dataToShare = [];
  
  $scope.showgallery = function (myValue) {

    $scope.dataToShare = myValue;
    srvShareData.addData($scope.dataToShare);
    
    window.location.href = "showgallery.html";
  }
});

app.controller('SecondCtrl', function($scope, srvShareData,$http) {
  
    $http.get("json/gallerylist.json").success(function(response)
{
$scope.directory=response.data;
        console.log($scope.directory);
});
    
  $scope.sharedData = srvShareData.getData();
    $scope.page = parseInt(srvShareData.getData(), 10);
    
    $scope.showgallery = function (myValue) {

    $scope.dataToShare = myValue;
    srvShareData.addData($scope.dataToShare);
    
    window.location.href = "showgallery.html";
  }

});

app.service('srvShareData', function($window) {
        var KEY = 'App.SelectedValue';

        var addData = function(newObj) {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            } else {
                mydata = "";
            }
            mydata = newObj;
            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
        };

        var getData = function(){
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || "";
        };

        return {
            addData: addData,
            getData: getData
        };
    });

app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});