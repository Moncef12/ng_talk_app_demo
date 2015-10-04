var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    shell = require('gulp-shell'),
    flatten = require('gulp-flatten');



gulp.task('browser-sync', function () {
    browserSync.init([
        'client/app/partials/*.html',
        'public/assets/css/*.css',
        'public/assets/js/*.js'
    ],{
        browser: "chrome",
        server : {
            baseDir: 'index.html',
        }
    });
});


gulp.task('build-js', function () {
    var files = [
        './app/app.module.js',
        './app/app.config.js',
        './app/**/*.module.js',
        './app/**/*.js',
        './app/**/*.*.js',
    ];
    return gulp.src(files)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/js/'));
});


// Will publish all necessary assert into public/
// vendors/ for dev
// index.html
/*gulp.task('assets', function () {
    return gulp.src('./client/index.html')
        .pipe(gulp.dest('public'))
})*/


/*gulp.task('start-webdriver-manager', shell.task([
    'webdriver-manager start'
]))*/

// copy partials views from app/ to public /partials.
gulp.task('partials', function () {
     return gulp.src('./app/**/*.html')
         .pipe(flatten())
         .pipe(gulp.dest('partials'));
})

gulp.task('jshint', function () {
    return gulp.src('./client/src/app/**/*.js')
        .pipe(jshint());
});

gulp.task('watch', /*['browser-sync'],*/  function () {
    gulp.watch('./app/**/*.js', ['jshint', 'build-js']);
    gulp.watch('./app/**/*.html', ['partials']);
    //gulp.watch('client/index.html', ['assets']);
})