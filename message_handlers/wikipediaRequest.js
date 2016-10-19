var request = require('request');

var wikipediaRequest = function(message, searchParam, callback) {
  var baseUrl = 'https://en.wikipedia.org/w/api.php'
  var qs = {
    action: 'query',
    titles: searchParam,
    format: 'json',
    prop: 'info',
    inprop: 'url'
  }
  var query = { uri: baseUrl, qs: qs }

  request.get(query, function(err, _m, rawBody){
    var body = JSON.parse(rawBody);
    var pageId = wikiPageId(body);
    if (pageId > 0) {
      response = 'Check out ' + wikiPageUrl(body);
    } else {
      response = 'No wikipedia page found.';
    }
    callback(message, response);

  })
};

var wikiPageId = function(wikiResponse) {
  return parseInt(Object.keys(wikiResponse.query.pages)[0]);
};

var wikiPageUrl = function(wikiResponse) {
  var pageId = wikiPageId(wikiResponse);
  return wikiResponse.query.pages[pageId].fullurl;
};

module.exports = wikipediaRequest;
