var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	enquiryType: { type: Types.Select, options: [
		{ value: 'editor', label: 'Letter to the Editor' },
		{ value: 'involvement', label: 'Want to get involved' },
		{ value: 'subscription', label: 'Subscription Adjustment' },
		{ value: 'feedback', label: 'Constructive Criticism' },
		{ value: 'other', label: 'other' }
	] },
	message: { type: Types.Text, required: true },
	createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var enquiry = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('enquiry-notification').send({
			to: admins,
			from: {
				name: 'inhkey',
				email: 'contact@inhkey.com'
			},
			subject: 'New Enquiry for inhkey',
			enquiry: enquiry
		}, callback);
		
	});
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
