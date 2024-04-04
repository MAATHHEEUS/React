var carros = '['+
  '{"id": 1, "marca": "Honda", "modelo": "HRV"},'+
  '{"id": 2, "marca": "VW", "modelo": "Golf"},'+
  '{"id": 3, "marca": "Fiat", "modelo": "Toro"},'+
  '{"id": 4, "marca": "GM", "modelo": "Onix"}'+
  ']';

// Modelo Json
var obj = JSON.parse(carros);

var http = require('http');
var server = http.createServer(function(request, response){
  response.setHeader('access-control-allow-origin', '*');
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write(carros);
  response.end();
});

server.listen(3000);