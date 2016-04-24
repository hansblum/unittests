var gulp=require('gulp'),
    mocha=require('gulp-mocha');

gulp.task('test', function() {
	return gulp
		.src(['src/**/*.spec.js','src/**/*.js'])
		.pipe(mocha());
});
