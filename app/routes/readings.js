const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const moment = require('moment');
const http = require('http');
const reading = require('../models/Reading');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var start_date = '2018-01-01';
  var end_date = '2018-01-31';
  var options = {
    host: 'www.ciudadredonda.org',
    path: '/calendario-lecturas/evangelio-del-dia/?f=' // ?f=2018-12-31
  }

  var data = '';
  var objs = [];

  while(start_date != end_date) {
    var now = moment(start_date).format('YYYY-MM-DD');
    console.log(now);
    
    options.path = options.path + now;
    var request = http.request(options, function (resp) {
      resp.on('data', function (chunk) {
        data += chunk;
      });
      
      resp.on('end', function () {
        console.log('Ciudad Redonda Content:')
        //console.log(data);
        var $ = cheerio.load(data);
  
        var lecturas = $('.lecturas section');
        console.log('lecturas del dia')
        lecturas.each(function(i, el) {
          if ($(el).find('.texto_evangelio').length > 0) {
            var content_class = '.texto_evangelio';
          } else {
            var content_class = '.texto_palabra';
          }
          var new_reading = {
            title: $(el).find('h2').html(),
            quote: $(el).find('.texto_palabra b').first().text(),
            date: now,
            content: $(el).find(content_class).clone().children().remove().end().text(),
            ending: $(el).find('.texto_palabra b').last().text(),
          };
          objs[i] = new_reading;
          console.log(new_reading);
          reading.create(new_reading); // {title: 'Primera Lectura', date: moment() }
        });

      });
    });
  
    request.on('error', function (e) {
      console.log(e.message);
    });
  
    request.end();
    start_date = moment(start_date).add(1, 'days').format('YYYY-MM-DD');
  }
  res.send(JSON.stringify(objs));

});

module.exports = router;
