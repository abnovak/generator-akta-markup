// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    'app/**/*',
                    'app/templates/**/*',
                    'app/js/**/*',
                    'app/css/**/*',
                    'app/img/**/*'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        'bower-install': {

            target: {

                // Point to the html file that should be updated
                // when you run `grunt bower-install`
                html: 'app/templates/index.html',

                // Optional:
                // ---------

                // If your file paths shouldn't contain a certain
                // portion of a url, it can be excluded
                //
                //   default: ''
                ignorePath: 'app/',

                // Customize how your stylesheets are included on
                // your page.
                //
                //   default: '<link rel="stylesheet" href="{{filePath}}" />'
                cssPattern: '<link href="{{filePath}}" rel="stylesheet">',

                // Customize how your <script>s are included into
                // your HTML file.
                //
                //   default: '<script src="{{filePath}}"></script>'
                jsPattern: '<script type="text/javascript" src="{{filePath}}"></script>',

                // An array of strings or regular expressions to
                // exclude from your HTML file.
                //
                //   default: [],
                exclude: []
            }
        },
        execute: {
            deploy: {
                src: ['build.js']
            }
        },
        clean: {
            build: ["build/"]
        }
    });

    grunt.registerTask('default', ['server']);

    grunt.registerTask('server', ['express:dev', 'connect:livereload', 'watch']);

    grunt.registerTask('stop-server', ['express:dev:stop']);

    grunt.registerTask('build', 'Building your templates.', ['express:dev', 'execute:deploy', 'express:dev:stop']);
};