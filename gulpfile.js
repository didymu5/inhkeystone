var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jshintReporter = require('jshint-stylish'),
	watch = require('gulp-watch');
	sass = require('gulp-sass');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};
gulp.task('sass', function () {
  gulp.src('public/styles/**/*.scss')
  	.pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('public/styles/'));
});
// watch sass files
gulp.task('watch', function() {
  gulp.watch('public/styles/**/*.scss', ['sass']);
});

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));

});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});
