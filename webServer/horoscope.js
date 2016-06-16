var mongoose = require('mongoose');
var schema = mongoose.Schema;

var horoscopeSchema = new schema({
    day: { type:String, index:1 },
    zodiac : String,
    time_line : [{ time: String, category: String, horoscope: String, good: Boolean }],
    full_horoscope : String,
    love : String,
    title : String,
    career : String,
    finance : String,
    total : String,
    title_full_horo : String
}, {collection:'horoscopes'} );

var Horoscope = mongoose.model('Horoscope',horoscopeSchema);
module.exports = Horoscope;



