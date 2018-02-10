const mongoose = require('mongoose');
const moment = require('moment');
const db = require('./db.js');
var Schema = mongoose.Schema;

var ReadingSchema = new Schema({
    title: {type: String, required: true},
    quote: String,
    content: String,
    ending: String,
    // date: { type: Date, default: Date.now },
    date: { type: Date},
    hidden: {type: Boolean, default: true},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

ReadingSchema.virtual('date_formatted').get(function () {
    return moment.parse(this.date);
});

ReadingSchema.virtual('_title').get(function () {
    return this.title.toLowerCase();
});

module.exports = db.model('Reading', ReadingSchema);