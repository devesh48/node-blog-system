var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var express = require('express');
var router = express.Router();

router.get('/show/:title',function(req,res,next){
	var db = req.db;
	var posts = db.get('posts');
	posts.find({category: req.params.title},{},function(err,posts){
			res.render ('index',{
			"title" : req.params.title,
			"posts" : posts
		});
	});
});

/* GET home page. */

router.get('/add', function(req, res, next) {
	var db = req.db;
	res.render ('addcategories',{
		"title" : "Add Categories"
	})
});

router.post('/add', function(req, res, next) {
  // Get Form Value
  var title = req.body.title;
  
    //Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	
	// Check for Erros	
	var errors = req.validationErrors();
	 if (errors){
		 res.render('addcategories',{
			 "errors" : errors,
			 "title" : title
		});
	}else {
		var category = db.get('categories');
		
		//Submit to DB
		category.insert({
			"title" : title
		}, function(err,category){
			if (err){
				res.send('There was an issue submitting the Category');
			} else {
				req.flash('success', 'Category Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});




// Home page BlogPosts
/*router.get('/', function(req, res, next) {
	var db = req.db;
	var categories = db.get('categories');
	categories.find({},{},function(err, categories){
		res.render('index',{
			"categories" : categories
		});
	});
});*/

module.exports = router;