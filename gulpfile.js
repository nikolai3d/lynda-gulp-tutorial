var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee"),
    gconcat = require("gulp-concat"),
    browserify = require("gulp-browserify"),
    compass = require("gulp-compass");


gulp.task('log', function() {
    gutil.log('works workflows are awesome');
});

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];


gulp.task('coffee', function() {

    var srcNode = gulp.src(coffeeSources);
    var processNode = gcoffee({
        bare: true
    }).on('error', gutil.log);
    var destNode = gulp.dest('components/scripts');

    srcNode.pipe(processNode).pipe(destNode);

});

gulp.task('js', function() {
    var srcNode = gulp.src(jsSources);

    var concatNode = gconcat('script.js');

    var browserifyNode = browserify();

    var destNode = gulp.dest('builds/development/js');

    srcNode.pipe(concatNode).pipe(browserifyNode).pipe(destNode);
});

gulp.task('compass', function() {
    var srcNode = gulp.src(sassSources);

    var compassNode = compass({
        sass: 'components/sass',
        image: 'builds/development/images',
        style: 'expanded'
    }).on('error', gutil.log);

    var destNode = gulp.dest('builds/development/css');

    srcNode.pipe(compassNode).pipe(destNode);
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);

});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);
