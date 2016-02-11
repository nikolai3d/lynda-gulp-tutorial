var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee");

gulp.task('log', function() {
    gutil.log('works workflows are awesome');
});


gulp.task('coffee', function() {
    
    var srcNode =  gulp.src('components/coffee/tagline.coffee');
    var processNode = gcoffee({bare: true}).on('error', gutil.log);
    var destNode = gulp.dest('components/scripts');
    
    srcNode.pipe(processNode).pipe(destNode);
    
});
