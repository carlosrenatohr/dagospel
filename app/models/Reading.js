const Reading = require('../models/ReadingSchema.js');

exports.create = function(data) {
    let model = new Reading(data);

    Reading.create(data, function (err, reading) {
      if (err) return console.error(err);
      // saved!
      return reading;
    })
}

exports.module = Reading;