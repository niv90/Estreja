var app = angular.module('fullHoroScopeApp',[]);
app.config(function($locationProvider) {
    $locationProvider.html5Mode(true); 
});

var uuid;
var model = {
   
};


app.run(function($location,$http) {
    //uuid user's
    uuid = $location.search()['uuid'];
    $http.get("https://estreja.herokuapp.com/ws_horoscope/getFullHoroscope/"+uuid).success(function(data){
         console.log(data);
         model.user = data;
    });
});

app.controller('fullHoroscope',function ($scope) {
    $scope.details = model
    $scope.myUrl = uuid
    $scope.jsFunction = function() {
        seeMore();
    }
});

//Capitalize the first letter of string
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});