var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');

var app = express();

var port = process.env.PORT || 3000;

app.use (morgan("combined"));

http.createServer(app).listen(3000);