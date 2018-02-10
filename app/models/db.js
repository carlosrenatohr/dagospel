const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dagospel');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
});
module.exports = db;