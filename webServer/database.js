//------------Connect to mongodb on mLab via Mongoose---------------//
var mongoose = require('mongoose');
config = {
    mongoUrl:'mongodb://db_usr:db_pass@ds015909.mlab.com:15909/estreja'
};
//The server option auto_reconnect is defaulted to true
var options = {
    server: {
        auto_reconnect:true,
    }
};
mongoose.connect(config.mongoUrl, options);

db  = mongoose.connection;

// Event handlers for Mongoose
db.on('error', function (err) {
    console.log('Mongoose: Error: ' + err);
});
db.on('open', function() {
    console.log('Mongoose: Connection established');
});
db.on('disconnected', function() {
    console.log('Mongoose: Connection stopped, recconect');
    mongoose.connect(config.mongoUrl, options);
});
db.on('reconnected', function () {
    console.info('Mongoose reconnected!');
});

function exitHandler(options, err) {
    if (options.cleanup){
     mongoose.disconnect();
     console.log('clean system');
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));