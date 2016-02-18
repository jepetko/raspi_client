var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('typescripts', function () {
    return gulp.src('typescripts/**/*.ts')
        .pipe(ts({
            noImplicitAny: false
        }))
        .pipe(gulp.dest('javascripts'));
});

gulp.task('watch', ['typescripts'], function() {
    gulp.watch('**/*.ts', ['typescripts']);
});

gulp.task('default', ['typescripts']);