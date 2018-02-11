const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST+'/'+process.env.DB_NAME);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
});
module.exports = db;