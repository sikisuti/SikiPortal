module.exports = function(app, pool){

  app.get("/shop", function(req, res){
		res.render("shoppingList/shoppingList");
	});

};
