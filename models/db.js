const mongoose = require('mongoose');
let str = 'mongodb://';
if (process.env.DB_USER && process.env.DB_PASS) {
    str += process.env.DB_USER +':'+process.env.DB_PASS +'@';
}
str += process.env.DB_HOST+'/'+process.env.DB_NAME
// DB connection
mongoose.connect(str);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
});
module.exports = db;