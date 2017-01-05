'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css'
            ],
            js: [
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-translate/angular-translate.js',
                'public/lib/angular-messages/angular-messages.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angular-file-upload/angular-file-upload.js',
                'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
                'public/lib/angular-ui-event/dist/event.min.js',
                'public/lib/angular-ui-map/src/map.js',
                'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=onGoogleReady',
                'https://apis.google.com/js/platform.js',
                'http://maps.google.com/maps/api/js', // I'm using a CDN
                'public/lib/ngmap/build/scripts/ng-map.min.js',
                'https://s.yimg.com/uv/dm/scripts/partnertest/syndicationtest.js',
                '//fonts.googleapis.com/css?family=Bowlby+One',
                'public/lib/angular-aria/angular-aria.js'
            ],
            tests: ['public/lib/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/css/*.css',
            'modules/*/client/assets/css/*.css'
        ],
        less: [
            'modules/*/client/less/*.less'
        ],
        sass: [
            'modules/*/client/scss/*.scss'
        ],
        js: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js',
            'modules/*/client/assets/js/*.js',
            'modules/*/client/assets/js/**/*.js'


        ],
        img: [
            'modules/**/*/img/*.jpg',
            'modules/**/*/img/**/*.jpg',
            'modules/**/*/img/**/*.png',
            'modules/**/*/img/**/*.gif',
            'modules/**/*/img/**/*.svg'
        ],
        views: ['modules/*/client/views/**/*.html'],
        templates: ['build/templates.js']
    },
    server: {
        gruntConfig: ['gruntfile.js'],
        gulpConfig: ['gulpfile.js'],
        allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        sockets: 'modules/*/server/sockets/**/*.js',
        config: ['modules/*/server/config/*.js'],
        policies: 'modules/*/server/policies/*.js',
        views: ['modules/*/server/views/*.html']
    }
};
