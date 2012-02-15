exports.add_routes = function(app){
	// self
	app.get('/buddy/:id',function(req,res){
	  res.render('buddy');	
	});
	
	app.post('/buddy/:id',function(req,res){
	  res.render('buddy');	
	});
}
