const http = require('http');
const bent = require('bent');
const getJson = bent('json', 200);
const key = process.env.SIMPLECAST_KEY;

function request(endpoint) {
  return getJson(`https://api.simplecast.com/${endpoint}?api_key=${key}`);
}

const server = http.createServer(function(req, res) {
  request(req.url).then(function(data) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    if (Array.isArray(data)) {
      data = data.filter(
        i => typeof i.published === 'undefined' || i.published === true
      );
    }
    res.end(JSON.stringify(data));
  });
});

server.listen(process.env.PORT || 5000);
