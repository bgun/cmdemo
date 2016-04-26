'use strict';

var fs = require('fs');

var express = require('express');

var server = express();
var PORT = process.env.PORT || 9000;

let indexHtml = fs.readFileSync('./index.html', 'utf-8');

server.use('/public', express.static('public'));
server.get('*', function(req, res) {
  res.send(indexHtml);
});

console.log("Server listening on port %d", PORT);
server.listen(PORT);