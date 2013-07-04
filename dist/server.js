console.log("Starting....");
var express = require('express'),
    routes = require('./routes'),
    engines = require('consolidate'),
    config = require("./config");

var a = function(config, callback) {

  var port = process.env.PORT || config.server.port;


  var app = express();
  var server = app.listen(port, function() {
    console.log("ExpressJalla server listening on port %d in %s mode", server.address().port, app.settings.env);
  });

  app.configure(function() {
    app.set('port', port);
    app.set('views', config.server.views.path);
    app.engine(config.server.views.extension, engines[config.server.views.compileWith]);
    app.set('view engine', config.server.views.extension);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compress());
    app.use(config.server.base, app.router);
    app.use(express.static(config.watch.compiledDir));
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  app.get('/', routes.index(config));

  callback(server);
};


a.startServer(config, function(){});