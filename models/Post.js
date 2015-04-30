var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	subTitle: { type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Author', index: true, many:true },
	byLine: {type: Types.Text},
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.Url, select: true},
	content: {
		brief: { type: Types.Markdown, toolbarOptions: {  }, height: 150 },
		extended: { type: Types.Markdown, toolbarOptions: {  }, height: 400 }
	},
	InfoArticle: { type: Types.Markdown, toolbarOptions: {  }, height: 150 },
	kindOf: {type: Types.Select, options:'authored, interview', default: 'authored'},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	issue:{type: Types.Relationship, ref:'Issue', many: false},
	articleClass: {type: Types.Text, default:"isArticle", many: true}
});

Post.relationship({ ref: 'Post', path: 'posts' });

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, issue|20%,publishedDate|20%';
Post.register();
