var express = require('express')
	, Db = require('mongodb').Db
	, Server = require('mongodb').Server
	, server_config = new Server('localhost',27017,{auto_reconnect:true,native_parser:true})
	, db = new Db('qiushafa',server_config,{})
	, mongoStore = require('connect-mongodb')
	, routes = require('./routes')
  , connectdb = require('./routes/connect_db');

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
	app.use(express.cookieParser());
  app.use(express.methodOverride());
	app.use(express.logger());
	app.use(express.session({
		cookie: {maxAge: 1000 * 60 * 60 * 24 * 10 }
		, secret:"qiusofa"
		, store: new mongoStore({db:db})
	}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.dynamicHelpers({
	session: function(req,res){
		return req.session;
  }
});

connectdb.add_routes(app);

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
