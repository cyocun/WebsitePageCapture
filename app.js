var data = require('./cuptureSetting.js')
var sites = data.sites;

var captured = 0;
var totalpage = 0;
var exportDir = './export/';
var ua = { 
    pc : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12',
    sp : 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H141 Safari/600.1.4'
}
var size = { 
    pc : { width: 1024, height: 800 },
    sp :  { width: 320, height: 200 }
}

 /**
  * capture function
  * @param  {Object} site    サイトのobject
  * @param  {String} url    ページの URL
  * @param  {Number} number urlのindex number
  */
function capture( site, url, number ) {
    var page = require('webpage').create();
    page.settings = {
      userAgent: ua[ url[0] ],
      javascriptEnabled:true,
      loadImages:true
    };

    page.viewportSize =  size[ url[0] ];

    page.open(url[1], function() {

        setTimeout(function() {
            page.render( exportDir + site.name + number + '.png' );
            console.log('captured ' + url[1]);
            captured++;

            if (captured === totalpage) {
                phantom.exit();
            }
        }, site.timeout );
    });
}
 
for (var i = 0, sitesLen = sites.length; i < sitesLen; i++) {
    var pageLen = sites[i].url.length;
    for (var j = 0; j < pageLen; j++) {
        totalpage++;
        capture( sites[i], sites[i].url[j], j );
    }
}
