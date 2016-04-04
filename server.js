'use strict';

var express = require('express');

var server = express();
var PORT = 9000;

server.use(express.static('public'));


console.log("Server listening on port %d", PORT);
server.listen(PORT);