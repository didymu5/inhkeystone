var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Creative Model
 * ==========
 */

var Creative = new keystone.List('Creative');

Creative.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: false, index: true },
	bio: { type: Types.Html, wysiwyg: true, height: 150 }
});

// Provide access to Keystone
// Creative.schema.virtual('canAccessKeystone').get(function() {
// 	return this.isAdmin;
// });


/**
 * Relationships
 */

Creative.relationship({ ref: 'Post', path: 'posts', refPath: 'Creative' });


/**
 * Registration
 */

Creative.defaultColumns = 'name, email, bio';
Creative.register();
