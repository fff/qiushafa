var util = require('util');
var oauth = require('oauth-douban');

var _doubanConsumerKey="02828cfc6ffb89750787a6f54ff29c5f";
var _doubanConsumerSecret="68f49e17e6a02ec5";
var serverAddr="localhost:3000";

oauth.init({
	consumerKey:"02828cfc6ffb89750787a6f54ff29c5f"
	,consumerSecret:"68f49e17e6a02ec5"
});

console.log(oauth);
oauth.isDebugMode=true;

opts={
	loginUrl:"/connect/douban"
	,callbackUrl:"/connect/douban_back"
};

exports.add_routes = function (app) {

	app.get('/connect/douban',oauth.middleware(opts));

	app.get('/connect/douban_back',oauth.middleware(opts),function(req,res){
		res.render('douban_back',{pair:oauth.accessTokenPair(req)});
	});

	app.post('/test/douban_user',
			function(req,res,next){
				console.log(req.param('pair'));
				oauth.accessTokenPair(req,req.param('pair'));
				next();
			},
			function(req,res){oauth.getUserInfo(req,function(err,json){
				if(err)
					res.send("ERROR:"+util.inspect(err),500);
				else
					res.send(json);
			})});


	app.get('/test/douban_back',function(req,res){
		res.render('douban_back',{pair:{token:"ccdd57fe627f54ad669807fb277dfe07",tokenSecret:"ab67fdc2bef39b68"}});
	});		
			
			
			
			
//			function(req,res){
//		oauth.getUserInfo(req,function(err,json){
//			if(err){
//				res.send(util.inspect(err),500);
//			}
//			else{
//				res.send(json);
//			}
//		});
//	});
//
//
}
