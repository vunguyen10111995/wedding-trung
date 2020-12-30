var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    order = require('gulp-order');

var jsSources = ['js/*.js'],
    sassSources = ['sass/*.scss'],
    htmlSources = ['**/*.html'],
    outputCSSDir = 'css',
    outputJSDir = 'js',
    outputDir = 'dist';


gulp.task('sass', function() {
  return new Promise((resolve, reject) => {
    gulp.src(sassSources)
  .pipe(sass({outputStyle: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest(outputCSSDir))
  .pipe(connect.reload());

  resolve();
  })
});

gulp.task('js', function() {
	return new Promise((resolve, reject) => {
    gulp
		.src(jsSources)
		.pipe(order([
			'js/jquery.min.js',
			'js/jquery.easing.1.3.js',
			'js/bootstrap.min.js',
			'js/jquery.waypoints.min.js',
			'js/sticky.js',
			'js/jquery.stellar.min.js',
			'js/hoverIntent.js',
			'js/superfish.js',
			'js/jquery.magnific-popup.min.js',
			'js/magnific-popup-options.js',
			'js/google_map.js',
			'js/main.js'
		], {base: './'}))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(outputDir))
		.pipe(uglify({mangle: false}))
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest(outputDir))
    .pipe(connect.reload());

    resolve();
  });

  
});

gulp.task('watch', function() {
  return new Promise((resolve, reject) => {
    gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);

  resolve();
  })
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
 return new Promise((resolve, reject) => {
  gulp.src(htmlSources)
  .pipe(connect.reload());

  resolve();
 })
});

gulp.task('default', gulp.series('html', 'js', 'sass', 'connect', 'watch'), function() {
  console.log('Running default task');
});

