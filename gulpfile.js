var gulp=require('gulp'),
    mocha=require('gulp-mocha'), 
    istanbul=require('gulp-istanbul');

gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});


gulp.task('test', ['pre-test'], function() {
	return gulp
		.src(['src/**/*.spec.js','src/**/*.js'])
		.pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({thresholds: {global: 100}}));
});
