var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Issue Model
 * ==========
 */

var Issue = new keystone.List('Issue', {
	autokey: {
		from: 'key',
		path:'key',
		unique: true,
		fixed: false
	},
	defaultSort: 'issueNumber'
});

Issue.add({
	name: {
		type: String,
		required: false
	},
	issueNumber: {
		type: Types.Number,
		required: true,
		initial: true
	},
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published'
		}
	},
	coverImage: {
		type: Types.Url
	},
	magazineImage:{
		type: Types.Url
	},
	theme:{
		type: Types.Select,
		options: 'dark, light',
		default: 'dark'
	},
	content: {
		brief: {
			type: Types.Markdown,
			toolbarOptions: {},
			height: 150
		},
		extended: {
			type: Types.Markdown,
			toolbarOptions: {},
			height: 400
		}
	}
});

Issue.relationship({ ref: 'Post', path: 'issues', refPath: 'issue' });

Issue.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Issue.defaultColumns = 'name, state|20%, issueNumber|20%, coverImage|20%';
Issue.register();