var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee"),
    gconcat = require("gulp-concat"),
    browserify = require("gulp-browserify"),
    connect = require("gulp-connect"),
    gulpif = require("gulp-if"),
    uglify = require("gulp-uglify"),
    minifyHTML = require("gulp-minify-html"),
    minifyJSON = require("gulp-jsonminify"),
    compass = require("gulp-compass");

var env,
    coffeeSources,
    jsSources,
    htmlSources,
    jsonData,
    sassSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

gutil.log("ENV === '" + env + "'");

if (env === 'development') {
    outputDir = "builds/development/";
    sassStyle = 'expanded';
}
else {
    outputDir = "builds/production/";
    sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/tagline.coffee'];

jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

sassSources = ['components/sass/style.scss'];

htmlSources = ['builds/development/' + '*.html'];

jsonData = ['builds/development/' + 'js/*.json'];

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

    srcNode.pipe(concatNode).pipe(browserifyNode).pipe(gulpif(env === 'production', uglify()))
        .pipe(destNode).pipe(connect.reload());
});

gulp.task('compass', function() {

    gulp.src(sassSources).pipe(compass({
        sass: 'components/sass',
        image: 'builds/development/' + 'images',
        style: sassStyle
    }).on('error', gutil.log)).pipe(gulp.dest(outputDir + 'css'));


    gutil.log("COMPASS dest === '" + outputDir + 'css' + "'");

    //.pipe(connect.reload());
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
    gulp.src(htmlSources).
    pipe(gulpif(env === 'production', minifyHTML())).
    pipe(gulpif(env === 'production', gulp.dest(outputDir))).
    pipe(connect.reload());
});

gulp.task('json', function() {
    gulp.src(jsonData).
    pipe(gulpif(env === 'production', minifyJSON())).
    pipe(gulpif(env === 'production', gulp.dest(outputDir+"js"))).
    pipe(connect.reload());
});

gulp.task('default', ['coffee', 'js', 'compass', 'html', 'json', 'connect', 'watch']);
