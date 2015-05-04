var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

		var view = new keystone.View(req, res),
			locals = res.locals;

		// Set locals
		locals.section = 'about';
		locals.title = 'About - Inheritance Magazine';
		locals.data = {};

		view.on('init', function(next) {
				var q = keystone.list('Post').model.findOne({
					slug: 'about',
					InfoArticle2: 'static'
				});

				q.exec(function(err, result) {
					locals.data.post = result;
					next(err);
				});
			});

view.render('about');
};