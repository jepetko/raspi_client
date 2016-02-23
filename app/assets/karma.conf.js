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
            '../../vendor/assets/bower_components/ace-builds/src-noconflict/ace.js',
            '../../vendor/assets/bower_components/ace-builds/src-noconflict/theme-clouds_midnight.js',
            '../../vendor/assets/bower_components/ace-builds/src-noconflict/mode-ruby.js',
            '../../vendor/assets/bower_components/angular-ui-ace/ui-ace.js',
            '../../karma/templates.js',
            '../../karma/app/**/*.js'
        ]
    });
};
