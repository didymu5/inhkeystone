var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'issue';
	locals.filters = {
		issue: req.params.issue
	};

	locals.data = {
		posts: [],
		issues: []
	};

	// Load a particular Issue or all Issues
	view.on('init', function(next) {

		if (req.params.issueNumber) {
			//List one issue

			keystone.list('Issue').model.findOne({issueNumber: req.params.issueNumber}).exec(function(err, result) {
				
				if (err) {
					return next(err);
				}

				locals.data.issue = result;
				
				next();
			});


		} else {
			//list All issues
			keystone.list('Issue').model.find().where('state','published').sort('issueNumber').exec(function(err, results) {
				if (err || !results.length) {
					return next(err);
				}
				locals.data.issues = results;
				next();
			});

		}

	});
	// Load the current Issues filter
	view.on('init', function(next) {
			
		if (locals.data.issue) {
			
				// keystone.list('Issue').model.findOne({ issueNumber: req.params.issueNumber }).exec(function(err, result) {
				// 	console.log(result);
				// 	next(err);
				// });

			keystone.list('Post').model.find()
				.where('issue' , locals.data.issue.key)
				.where('state', 'published')
				.sort('-publishedDate')
				.populate('author categories issue')
				.exec(function(err, result) {
					locals.data.posts = result;
					next(err);
			});


		} else {
			next();
		}

	});

	// Load the posts
	// view.on('init', function(next) {

	// 	var q = keystone.list('Post').paginate({
	// 			page: req.query.page || 1,
	// 			perPage: 10,
	// 			maxPages: 10
	// 		})
	// 		.where('state', 'published')
	// 		.sort('-publishedDate')
	// 		.populate('author categories');

	// 	if (locals.data.category) {
	// 		q.where('categories').in([locals.data.category]);
	// 	}

	// 	q.exec(function(err, results) {
	// 		locals.data.posts = results;
	// 		next(err);
	// 	});

	// });

	// Render the view
	view.render('issue');

};