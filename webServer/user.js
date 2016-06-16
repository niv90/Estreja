var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    email: { type:String, index:1,required:true,unique:true },
    name : String,
    lastName : String,
    zodiac : String,
    art : Number,
    travel : Number,
    nature : Number,
    imageUrl: String,
    gender : String
}, {collection:'users'} );

var User = mongoose.model('User',userSchema);
module.exports = User;