module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],
        //browsers: ['PhantomJS'],
        browsers: ['Chrome'],
        files: [
            '../../vendor/assets/bower_components/jquery/dist/jquery.js',
            '../../vendor/assets/bower_components/angular/angular.js',
            '../../vendor/assets/bower_components/angular-resource/angular-resource.js',
            '../../vendor/assets/bower_components/angular-mocks/angular-mocks.js',
            '../../karma/templates.js',
            '../../karma/app/**/*.js'
        ]
    });
};
