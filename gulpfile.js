// Gulp
var gulp = require('gulp');
var gulpUtil = require('gulp-util');

// Tools
var complexity = require('gulp-complexity');
var bump = require('gulp-bump');

// Validation
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');

// Testing
var mocha = require('gulp-mocha');

// Reports
var istanbul = require('gulp-istanbul');
var plato = require('gulp-plato');

// Target Files
var sources = ['app.js', './lib/*.js', './test/specs/*.js'];
var pkg = './package.json';
var tests = './test/specs/*.js';

// Tasks
gulp.task('bump:patch', function(){
	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function(){
	gulp.src(pkg)
		.pipe(bump({type: 'minor'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:major', function(){
	gulp.src(pkg)
		.pipe(bump({type: 'major'}))
		.pipe(gulp.dest('./'));
});

gulp.task('format', function(){
	gulp.src(sources)
		.pipe(jscs());
});

gulp.task('lint', function(){
	gulp.src(sources)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('plato', function(){
	gulp.src(sources)
		.pipe(plato('./metrics/report', {
			jshint: {
				options: {
					strict: true
				}
			},
			complexity: {
				trycatch: true
			}
		}));
});

gulp.task('complexity', function(){
	gulp.src(sources)
		.pipe(complexity());
});


gulp.task('test', function(){
	gulp.src(['./test/specs/*.js'])
		.pipe(mocha());
});

gulp.task('comverage', function (cb) {
  gulp.src(['./lib/**/*.js'])
    .pipe(istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(['./test/specs/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports('./metrics/coverage')) // Creating the reports after tests runned
        .on('end', cb);
    });
});

// Grouped Tasks
gulp.task('default', ['format', 'lint', 'complexity', 'test']);
gulp.task('report', ['plato', 'coverage']);
