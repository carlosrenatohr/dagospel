const baseUrl = 'http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/?f=';
$(function () {
    $.ajax({
        // url: baseUrl + '2017-09-09',
        url: 'https://api.apifier.com/v1/scg7t7v7bXcwwxCPp/crawlers/ciudad-redonda/execute?token=LZQp4otHtCw7vSaLdiFcnMdWP&wait=120',
        method: 'post',
        async: false,
        dataType: 'json',
        success: function(response) {
            if (response.hasOwnProperty('resultsUrl')) {
                console.log(response.resultsUrl)
                    $.ajax({
                        url: response.resultsUrl,
                        method: 'get',
                        dataType: 'json',
                        async: false,
                        success: function(resp) {
                            console.log('resp', resp[0].pageFunctionResult)
                        }
                    })
            }
        }
    })
});