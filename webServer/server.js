var express = require('express');
var app = express();
var horoscopeBuilder = require('./horoscopeController');
var userController = require('./userController');
var horosocpeMatcher = require('./matcherController');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var port = process.env.PORT | 3000

app.set('port',port);
app.use('/',express.static('./public'));
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers" ,"Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces',4);
    res.set("Content-Type", "application/json");
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//get horoscope time line by email
app.get('/ws_horoscope/getTimeLineHoroscope/:id',horoscopeBuilder.getTimeLineHoroscope);
//get horoscope time line by specify day
app.get('/ws_horoscope/getTimeLineHoroByDay/:id/:day',horoscopeBuilder.getTimeLineHoroByDay);
//get full horoscope
app.get('/ws_horoscope/getFullHoroscope/:id',horoscopeBuilder.getFullHoroscope);
//get horosocpe title by zodiac
app.get('/ws_horoscope/getHoroTitle/:zodiac',horoscopeBuilder.getHoroTitle);
//check if user already registerd to system
app.get('/ws_horoscope/getUser/:email',userController.getUserExist);
//get top 3 matcher by name
app.get('/ws_horoscope/getMatcherData/:id',horosocpeMatcher.getMatchData);
//set new user in mlab
app.post('/ws_horoscope/setNewUser',userController.addNewUser);
//get user mathcer details
app.get('/ws_horoscope/getUserMatcherData/:id/:userSystemUUID',userController.getUserMatcherData);
app.listen(port);
console.log("service is listeing on port: " + port);