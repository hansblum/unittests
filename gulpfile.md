# Gulpfile documentation

## documentation about this gulpfile.js

### Requiring dependencies

This gulpfile needs `gulp`, `gulp-mocha` and `gulp-istanbul`.
We use the `require`, because that is the way to inject a node module in your `gulpfile.js`.

```
var gulp=require('gulp'),
    mocha=require('gulp-mocha'), 
    istanbul=require('gulp-istanbul');
```
In this gulpfile we require these node modules:
 `gulp`, the task runner
 `gulp-mocha`, the gulp interface to `mocha`, a popular unit test framework.
 `gulp-istanbul`, the gulp interface to `istanbul`, the most popular coverage tool for JavaScript.


### Preparation

For code coverage reporting, `istanbul` needs to do some preparation.  

```
gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js', '!src/**/*.spec.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});
```

### Running the tests

This is the `test` task. It loads all the sources with `.src(['src/**/*.spec.js', 'src/**/*.js'])`. After `mocha` performs the tests, `istanbul` writes the test reports and checks the test coverage threshold. If the test coverage percentage is below 90, 
the task fails.

```
gulp.task('test', ['pre-test'], function() {
	return gulp
		.src(['src/**/*.spec.js','src/**/*.js'])
		.pipe(mocha())
    	.pipe(istanbul.writeReports())
    	.pipe(istanbul.enforceThresholds({thresholds: {global: 90}}));
});
```
