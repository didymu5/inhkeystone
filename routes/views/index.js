var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {};
	view.on('init', function(next) {

			// keystone.list('Issue').model.find().where('state','published')


			keystone.list('Issue').model.findOne().where('state', 'published').exec(function(err, result) {

				if (err) {
					return next(err);
				}

				locals.data.issue = result;
				

				keystone.list('Post').model.find()
				.where('issue' , result.key)
				.where('state', 'published')
				.sort('-publishedDate')
				.populate('author categories issue')
				.exec(function(err, result) {
					// locals.data.posts = result;
					locals.data.posts = result;
					
					next(err);
				});

				// next();
			});
			
			
		})
		// Render the view
	view.render('index');

};