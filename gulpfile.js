var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee"),
    gconcat = require("gulp-concat"),
    browserify = require("gulp-browserify"),
    connect = require("gulp-connect"),
    compass = require("gulp-compass");

var env,
    coffeeSources,
    jsSources,
    htmlSources,
    jsonData,
    sassSources,
    outputDir;

env = process.env.NODE_ENV || 'development';

gutil.log("ENV === '" + env+ "'");

if (env === 'development') {
    outputDir = "builds/development/";
}
else {
    outputDir = 'builds/production/';
}

coffeeSources = ['components/coffee/tagline.coffee'];

jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

sassSources = ['components/sass/style.scss'];

htmlSources = [outputDir + '*.html'];

jsonData = [outputDir + 'js/*.json'];

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

    var destNode = gulp.dest(outputDir + 'js');

    srcNode.pipe(concatNode).pipe(browserifyNode).pipe(destNode).pipe(connect.reload());
});

gulp.task('compass', function() {
    var srcNode = gulp.src(sassSources);

    var compassNode = compass({
        sass: 'components/sass',
        image: outputDir + 'images',
        style: 'expanded'
    }).on('error', gutil.log);

    var destNode = gulp.dest(outputDir + 'css');

    srcNode.pipe(compassNode).pipe(destNode).pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonData, ['json']);

});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(htmlSources).pipe(connect.reload());
});

gulp.task('json', function() {
    gulp.src(jsonData).pipe(connect.reload());
});

gulp.task('default', ['coffee', 'js', 'compass', 'html', 'json', 'connect', 'watch']);
