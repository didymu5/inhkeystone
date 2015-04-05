var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Author Model
 * ==========
 */

var Author = new keystone.List('Author');

Author.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: false, index: true },
	image: { type: Types.CloudinaryImage, select: true},
	bio: { type: Types.Markdown, wysiwyg: true, height: 150 }
});

// Provide access to Keystone
// Author.schema.virtual('canAccessKeystone').get(function() {
// 	return this.isAdmin;
// });


/**
 * Relationships
 */

Author.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Author.defaultColumns = 'name, email, bio';
Author.register();
