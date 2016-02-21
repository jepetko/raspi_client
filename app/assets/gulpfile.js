var gulp = require('gulp');
var ts = require('gulp-typescript');
var templateCache = require('gulp-angular-templatecache');

var Server = require('karma').Server;

/**
 * compile all typescripts into "javascripts" folder which is served by Rails.
 * Omit karma files!
 */
gulp.task('typescripts', function () {
    return gulp.src(['typescripts/**/*.ts', '!typescripts/**/*.karma.ts'])
        .pipe(ts({
            noImplicitAny: false,
            //troubles in the browser, fix this later
            target: 'ES5'
        }))
        .pipe(gulp.dest('javascripts'));
});

/**
 * copy all templates into the "javascripts" folder. The folder structure is preserved.
 * Rails maintains its own template cache (have a look at Gemfile / gem 'angular-rails-templates').
 */
gulp.task('copy-templates', function() {
    return gulp.src('typescripts/**/*.html')
        .pipe(gulp.dest('javascripts'));
});

/**
 * compile all typescripts into the "../../karma" folder.
 */
gulp.task('karma-typescripts', function() {
    return gulp.src('typescripts/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            //TODO: karma seems to have troubles with ES6
            target: 'ES5'
        }))
        .pipe(gulp.dest('../../karma'));
});

/**
 * create the template cache for karma tests
 */
gulp.task('create-template-cache', function () {
    return gulp.src('typescripts/**/*.html')
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(gulp.dest('../../karma'));
});

/**
 * perform karma tests. Dependencies:
 * * typescripts
 * * karma-typescripts
 * * create-template-cache
 */
gulp.task('karma-tests', ['typescripts', 'karma-typescripts', 'create-template-cache'], function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

/**
 * execute "typescripts" task if a file changes
 */
gulp.task('watch', function() {
    gulp.watch('**/*.ts', ['typescripts']);
    gulp.watch('**/*.html', ['copy-templates']);
});

gulp.task('default', ['karma-tests']);