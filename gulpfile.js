var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee");

gulp.task('log', function() {
    gutil.log('works workflows are awesome');
});

var coffeeSources = ['components/coffee/tagline.coffee'];

gulp.task('coffee', function() {
    
    var srcNode =  gulp.src(coffeeSources);
    var processNode = gcoffee({bare: true}).on('error', gutil.log);
    var destNode = gulp.dest('components/scripts');
    
    srcNode.pipe(processNode).pipe(destNode);
    
});
