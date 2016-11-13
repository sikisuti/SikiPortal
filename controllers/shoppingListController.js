module.exports = function(app){

  app.get("/shop", function(req, res){
		res.render("shoppingList/shoppingList");
	});

};
