// Set the require.js configuration for your application.
require.config({
    deps: [
        'main'
    ],
    paths: {
        lodash: 'vendor/bower/lodash/dist/lodash.compat',
        backbone: 'vendor/bower/backbone/backbone',
        jade: 'vendor/bower/jade/runtime',
        jquery: 'vendor/bower/jquery/jquery',
        layoutmanager: 'vendor/bower/layoutmanager/backbone.layoutmanager',
        requirejs: 'vendor/bower/requirejs/require',
        underscore: 'vendor/bower/underscore/underscore',
        'underscore.string': 'vendor/bower/underscore.string/lib/underscore.string'
    },
    map: {
        '*': {
            underscore: 'lodash'
        }
    },
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
});
