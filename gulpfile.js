var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee"),
    gconcat = require("gulp-concat");
    
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


gulp.task('coffee', function() {
    
    var srcNode =  gulp.src(coffeeSources);
    var processNode = gcoffee({bare: true}).on('error', gutil.log);
    var destNode = gulp.dest('components/scripts');
    
    srcNode.pipe(processNode).pipe(destNode);
    
});

gulp.task('js', function(){
    var srcNode = gulp.src(jsSources);
    
    var concatNode = gconcat('script.js');
    
    var destNode = gulp.dest('builds/development/js');

    srcNode.pipe(concatNode).pipe(destNode);
    
    
});
