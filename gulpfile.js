var gulp = require('gulp');

// Include Our Plugins

// Convert SCSS file to CSS
var sass = require('gulp-sass');

// Includes prefixes to CSS properties automatically
var autoprefixer = require('gulp-autoprefixer');

// Optimizes CSS files and remove unused styles
var uncss = require('gulp-uncss');

// Minify CSS with CSSO
var csso = require('gulp-csso');

// Format CSS coding style with CSScomb
var csscomb = require('gulp-csscomb');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var jshint = require('gulp-jshint');

// CSSlint
var csslint = require('gulp-csslint');

// Compile Our Sass - convery scss into CSS and saves the compiled CSS file in our build/styles directory
gulp.task('sass', function() {
	return gulp.src('src/styles/*.scss')
		.pipe(autoprefixer({
			browsers: ['last 4 versions']
		}))
		.pipe(sass())
		//.pipe(csscomb())
		.pipe(csso())
		.pipe(uncss({
            html: ['index.html']
        }))
        .pipe(csslint())
        .pipe(csslint.formatter())
		.pipe(gulp.dest('build/styles'));
});

// Lint Task -  makes sure there are no errors in our code
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('build/scripts'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('src/scripts/*.js', ['lint']);
	gulp.watch('/*.html'); 
    gulp.watch('src/styles/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch', 'lint']);
//gulp.task('default', ['sass', 'lint', 'watch']);
//gulp.task('default', ['sass', 'lint', 'watch']);