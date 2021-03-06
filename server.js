var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// environments
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var config = require('./server/config/environments')[env];
var port = process.env.PORT || 8080;

// express config
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public'));

// database
require('./server/models/todo');
require('./server/models/post');
require('./server/models/comment');
mongoose.connect(config.db);

// routes
var todos = require('./server/routes/todos');
var posts = require('./server/routes/posts');
var index = require('./server/routes/index');

app.use('/api', posts);
app.use('/api', todos);
app.use('/', index);

app.listen(port);
console.log('app is listening on port ' + port);
