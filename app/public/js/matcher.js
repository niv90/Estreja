var app = angular.module('matcher',[]);
//support location service
app.config(function($locationProvider) {
    $locationProvider.html5Mode(true); 
});

var userSystemUUID;
var uuid;
var match;
var model = {

};

app.run(function($location,$http) {
    //$scope.myUrl = $location.search()['uuid'];

    //uuid user system
    userSystemUUID = $location.search()['myid'];
    //uuid user matcher
    uuid = $location.search()['uuid'];
    match = $location.search()['match'];
    //get user matcher data
    $http.get("https://estreja.herokuapp.com/ws_horoscope/getUserMatcherData/"+uuid+"/"+userSystemUUID).success(function(data){
        console.log(data);
        model.userData = data;
        
        $http.get("https://estreja.herokuapp.com/ws_horoscope/getHoroTitle/"+data.user[0].zodiac).success(function(data){
            console.log(data);
            model.userSystem = data;
        });
    });

});

app.controller('matcherData', function ($scope) {
    $scope.matcher = model;
    $scope.matchValue = match;
    $scope.myUrl = userSystemUUID;
    
});


app.controller('header', function ($scope) {
        $scope.header = model;
        $scope.myUrl = userSystemUUID;
         $scope.jsFunction = function() {
             seeMore();
         }
});


app.controller('hamburger', function ($scope) {
    $scope.myUrl = userSystemUUID;
    
});

//Capitalize the first letter of string
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


