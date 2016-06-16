var mongoose = require('mongoose');
var User = require('./user');

exports.getUserExist = function(req,res){
    console.log("inside user exist");
    var userEmail = req.params.email;
    checkUserExist(userEmail);
    return;

};

checkUserExist = function(userEmail){
    console.log("inside check in mlab if user exist - userEmail: " + userEmail);
    //check if the the user exist in mlab
    var result = User.find( { email: { $exists: true , $eq: userEmail } } ) 
    console.log("result: " result);


    });



}