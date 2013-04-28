
var express = require('express');
var request = require('request');

var app = express();
var hostname = "http://localhost";
var port = "2403";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/url/:url', function(req, res){
  console.log(req.params);
  console.log(req.body);
  request(hostname+":"+port+"/"+req.params.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    var body = JSON.parse(body);
    var newBody = {'page': '1', 'records': '10','total': '2' , rows: body};

      //console.log(getSchema(body));
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newBody));
    };
    res.end('fail');
  });
 
});

app.listen(4001);
console.log('Listening on port 3000');



request(hostname+":"+port+"/programming", function (error, response, body) {
  if (!error && response.statusCode == 200) {

  var body = JSON.parse(body);
    console.log(getSchema(body));
  };
});

function getSchema(body){
  var schema = [];

  var length = body.length > 1 ? 1 : body.length;

  for (var i= 0 ; i< length;i++){
    var obj = body[i];
    for(var k in obj){
      schema.push({key:k, type: defineType(obj[k])})
    }
  }
  return schema;
}

function defineType(target){
  switch(target.constructor){
    case String:
      // .... String .. number .. .... ...
      return 'String';
    break;

    case Number:
      return 'Number';
    break;

    case Array:
      return 'Array';
    break;

    case Boolean:
      return 'Boolean';
    break;

    case Object:
      return 'Object';
    break;
  }
}
