var mongoose = require('mongoose');
var Horoscope = require('./horoscope');
var User = require('./user');


exports.getTimeLineHoroscope = function(req,res){
    console.log("inside getTimeLineHoroscope");

    var day = getNameWeekDay();
    console.log("day: " + day);
    console.log("day: " + day + " id :" + day + "21313123123131111111111111");

    getUserZodiac(req.params.id,function(data){
        console.log("zodiac: " + data[0].zodiac);
        Horoscope.find({}).where("day").equals(day).where("zodiac").equals(data[0].zodiac).select('time_line title_full_horo -_id').
        exec(function(err,docs){
            //add user image url to document
            //docs.push({imageUrl : data[0].imageUrl});
            console.log("docs: " + docs);
            res.json(docs);
            return;
        });  
    });
}

exports.getTimeLineHoroByDay = function(req,res){
   
    console.log("inside getTimeLineHoroByDay");
    
    //var day = getNameWeekDay();
    //console.log("day: " + day + " id :"  + req.params.id + "21313123123131111111111111");

    getUserZodiac(req.params.id,function(data){
        console.log("zodiac: " + data[0].zodiac + " day: "+ req.params.day);
        Horoscope.find({}).where("day").equals(req.params.day).where("zodiac").equals(data[0].zodiac).select('time_line title_full_horo -_id').
        exec(function(err,docs){
            //add user image url to document
            //docs.push({imageUrl : data[0].imageUrl});
            console.log("docs: " + docs);
            res.json(docs);
            return;
        });  
    });
}

exports.getFullHoroscope = function(req,res){
    console.log("inside get fullHoroscope");

    var day = getNameWeekDay();
    console.log("day: " + day);
    
    getUserDetail(req.params.id,function(data){
        console.log("zodiac: " + data[0].zodiac + "name: " + data[0].name);
        Horoscope.find({}).where("day").equals(day).where("zodiac").equals(data[0].zodiac).select('zodiac love career finance total title_full_horo full_horoscope -_id').
        exec(function(err,docs){
            //add user name to document
            docs.push({name: data[0].name,imageUrl:data[0].imageUrl});
            //docs["name"] = data[0].name;
            console.log("docs: " + docs);
            res.json(docs);
            return;
        });  
    });


};

//get the horoscope title by zodiac and day
exports.getHoroTitle = function(req,res){
    console.log("inside get getHoroTitle");

    var day = getNameWeekDay();
    console.log("day: " + day);

    Horoscope.find({}).where("day").equals(day).where("zodiac").equals(req.params.zodiac).select('title_full_horo -_id').
        exec(function(err,docs){
            res.json(docs);
            return;
        });  


};

getNameWeekDay = function(){
    console.log("inside getNameWeekDay");

    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";
    return weekday[d.getDay()];

}

getUserZodiac = function(userId,callback){
    console.log("inside getUserZodiac user id : " + userId);
    
    var query = User.find({}).where("_id").equals(userId).select('zodiac imageUrl -_id');
    query.exec(function (err, data) {
        if (err) return next(err);
        return callback(data);
    });
}

getUserDetail = function(userId,callback){
    console.log("inside getUserDetails id: " + userId);
   
    var query = User.find({}).where("_id").equals(userId).select('zodiac name imageUrl');
    query.exec(function (err, data) {
        if (err) return next(err);
        return callback(data);
    });
}