const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const moment = require('moment');
const http = require('http');
const reading = require('../models/Reading');

/* GET reading data. */
router.get('/', function (req, res, next) {
  var promises = [];
  var start_date = '2018-01-01';
  var end_date = '2018-01-05';
  var path = '/calendario-lecturas/evangelio-del-dia/?f=';
  var options = {
    host: 'www.ciudadredonda.org',
    path: ''// ?f=2018-12-31
  }


  var objs = [];

  while (start_date != end_date) {
    console.log(start_date);
    var funct = new Promise(function (resolve, reject) {
      var data = '';
      var this_date = start_date;
      options.path = path + this_date;
      var request = http.request(options, function (resp) {
        resp.on('data', function (chunk) {
          data += chunk;
        });

        resp.on('end', function () {
          console.log('Ciudad Redonda Content:'); //console.log(data);
          var $ = cheerio.load(data);

          var lecturas = $('.lecturas section');
          var dayname = $('.ar_titulo').text();
          var dayval = $('.subtitulo time').attr('datetime');
          console.log('lecturas del dia')
          lecturas.each(function (i, el) {
            if ($(el).find('.texto_evangelio').length > 0) {
              var content_class = '.texto_evangelio';
            } else {
              var content_class = '.texto_palabra';
            }

            var new_reading = {
              dayname: dayname,
              dayval: dayval,
              title: $(el).find('h2').html(),
              quote: $(el).find('.texto_palabra b').first().text(),
              date: new Date(moment(this_date).format()).toISOString(),
              content: $(el).find(content_class).clone().children().remove().end().text(),
              ending: $(el).find('.texto_palabra b').last().text(),
            };
            objs[i] = new_reading;
            //console.log(new_reading);
            reading.create(new_reading);
            data = '';
          });

        });
      });

      request.on('error', function (e) {
        console.log(e.message);
      });

      request.end();
      start_date = moment(start_date).add(1, 'days').format('YYYY-MM-DD');
      resolve(start_date);
    });

    funct.then(function (data) {});
    promises.push(funct);
  }

  Promise.all(promises)
    .then(data => {
      //res.send(JSON.stringify(objs));
      res.send({success: true, msg: "Daily readings are ready to go."});
    });

});

module.exports = router;