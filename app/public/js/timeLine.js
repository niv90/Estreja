var app = angular.module('timeLine',[]);
//support location service
app.config(function($locationProvider) {
    $locationProvider.html5Mode(true); 
});

var uuid;
var model = {

};

app.run(function($location,$http) {
    day = $location.search()['day'];
    //uuid user's
    uuid = $location.search()['uuid'];

    if(day){
        console.log(day);
        $http.get("https://estreja.herokuapp.com/ws_horoscope/getTimeLineHoroByDay/"+uuid+"/"+day).success(function(data){
            console.log(data);
            model.items = data;
        });
    }
    else{
        console.log("0");
        $http.get("https://estreja.herokuapp.com/ws_horoscope/getTimeLineHoroscope/"+uuid).success(function(data){
            console.log(data);
            model.items = data;
        });
    }

    $http.get("https://estreja.herokuapp.com/ws_horoscope/getMatcherData/"+uuid).success(function(data){
        console.log(data);
        model.matcher = data;
    });
});

app.controller('timeLine', function ($scope) {
        $scope.horoscopes = model;
        $scope.myUrl = uuid;  
});

app.controller('matcherByHoro', function ($scope) {
        $scope.matcherHoro = model;
        $scope.myUrl = uuid;
});

app.controller('matcherByName', function ($scope) {
        $scope.matcherName = model;
        $scope.myUrl = uuid;
});

app.controller('header', function ($scope) {
        $scope.header = model;
        $scope.myUrl = uuid;
});

app.controller('zodiacLogo', function ($scope) {
        $scope.zodiac = model;
        $scope.myUrl = uuid;
});

app.controller('hamburger', function ($scope) {
        $scope.zodiac = model;
        $scope.myUrl = uuid;
});
//Capitalize the first letter of string
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

