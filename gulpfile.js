var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gcoffee = require("gulp-coffee");

gulp.task('log', function() {
    gutil.log('works workflows are awesome');
});


gulp.task('coffee', function() {

    gulp.src('components/coffee/tagline.coffee')
        .pipe(gcoffee({
                bare: true
            })
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'));
});
