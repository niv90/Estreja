var mongoose = require('mongoose');
var User = require('./user');

exports.getUserExist = function(req,res){
    console.log("inside user exist");
    var userEmail = req.params.email;

    checkUserExist(userEmail,function(data){
        res.status(200).json(data);
        return;
    });
}
//add new user to system and save is detaisl in mlab
exports.addNewUser = function(req,res){
    console.log("inside add user");
    console.log("imageUrl: " + req.body.imageUrl);
    //define new user for save it in mlab
    newUser = new User({
         email: req.body.email,
         name: req.body.name,
         lastName: req.body.lastName,
         zodiac: req.body.zodiac,
         art: req.body.art,
         travel: req.body.travel,
         nature: req.body.nature,
         imageUrl : req.body.imageUrl,
         gender: req.body.gender
    });

    newUser.save(function(err,doc){
        if(err)
            console.log(err);
         else{
            console.log("\n saved doc: " + doc);
            //if the user register to the system we direct him to index page
            res.redirect('http://localhost:8080/timeLine.html?uuid='+doc._id);
            return;
         }
   });  
}

//the function return 1 if the user exist in mlab else 0
checkUserExist = function(userEmail,callback){
    console.log("inside check in mlab if user exist - userEmail: " + userEmail);
    //check if the the user exist in mlab
    User.find({'email': userEmail }).select('_id').
    exec(function(err,result){
        if (err) return next(err);
        console.log("user exist" + result);
        return callback(result);
    });

}

//get user matcher details and the image url of the user system
exports.getUserMatcherData = function(req,res){
    
    User.find({}).where("_id").equals(req.params.id).select(' -email').
    exec(function(err,docs){
        User.find({}).where("_id").equals(req.params.userSystemUUID).select('imageUrl zodiac').
            exec(function(err,data){
                    console.log("docs: " + docs);
                    res.json({matcher:docs,user:data});
            });
    return;
    });  

};