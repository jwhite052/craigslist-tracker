$(document).foundation()

$(document).ready(function() {

  var requestUrlObject = {
    "base": "https://philadelphia.craigslist.org/search/sss",
    "keywords": "gtx 1080",
    "sort": "date" // priceasc, pricedsc, rel
  };

  var requestUrlString = requestUrlObject.base + '?query=' + requestUrlObject.keywords + '&sort=' + requestUrlObject.sort;
  requestUrlString = encodeURIComponent(requestUrlString);
  var crossOriginUrlString = "http://anyorigin.com/go?url=" + requestUrlString + "&callback=?";

  var request = $.getJSON(crossOriginUrlString, function(data) {
    var _data = data.contents.replace(/ï»¿/g,''); // remove random characters
    console.log( "success" );

    var $data = $(_data);
    var productElements = $data.find('.result-row');
    var productObjects = [];
    var resultTemplate = $('.result'); // Template for results, pull in from dom
    var totalResultsCount = $data.find('.totalcount:first').text();
    var $mainElement = $('#main');

    $mainElement.append('Total count: ' + totalResultsCount);

    $.each(productElements, function(index, value) {
      var _this = $(this);
      var product = {
        "data-pid": _this.attr('href'),
        "title": _this.find('.result-title:first').text(),
        "link": _this.find('.result-title:first').attr('href'),
        "price": _this.find('.result-price:first').text(),
        "date": _this.find('.result-date:first').attr('datetime'),
        "template": resultTemplate
      }
      productObjects.push(product);
      $mainElement
        .append('Title: ' + product.title + '<br>')
        .append('Link: ' + product.link + '<br>')
        .append('Price: ' + product.price + '<br>');
    });
  })
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
});
