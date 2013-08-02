module.exports = function(grunt) {

	// Configuration
	// =======================================
	grunt.initConfig({

		// Server
		connect: {
			server: {
				options: {
					port: 8989
				}
			}
		},

		// Watch
		watch: {
            // Setup a LiveReload server.
            options: { livereload: true },
			files: [
				'app/vendor/lib/**/*',
				'app/*.js',
				'app/styles/**/*.scss',
				'app/styles/**/*.sass',
				'app/templates/**/*.jade',
				'app/modules/**/*.js',
				'data/**/*',
				'source/icons/*',

                // Ignore:
                '!app/styles/exts/_icons.scss'
			],
			tasks: ['sass', 'jade', 'fontcustom']
		},

		// Compile SASS/SCSS
		// Since all other stylesheets are @import-ed in index.scss,
		// that's the only one we need to compile.
		sass: {
			app: {
				files: {
					'app/styles/index.css': 'app/styles/index.sass'	
				}
			}
		},

		// Compile Jade templates.
		jade: {
			compile: {
				options: {
					pretty: true,
					client: true,
					amd: true,
					compileDebug: false
				},
				files: {
					'app/templates/templates.js': ['app/templates/**/*.jade']
				}
			}
		},

        bower: {
            main: {
                rjsConfig: 'app/config.js'
            }
        },

        // JS linting with JSHint.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'app/**/*.js',
                '!app/templates/templates.js',
                '!app/vendor/**/*.js'
            ]
        },

        csslint: {
            main: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['app/styles/index.css']
            }
        },

		shell: {
            // Compile Font Custom font.
			fontcustom: {
				command: 'fontcustom compile source/icons'
			}
		},
		copy: {
            // Copy Font Custom fonts to proper place.
			fontcustom: {
				files: [
					{src: ['source/icons/fontcustom/*.woff'], dest: 'app/styles/fonts/icons.woff'},
					{src: ['source/icons/fontcustom/*.eot'],  dest: 'app/styles/fonts/icons.eot'},
					{src: ['source/icons/fontcustom/*.svg'],  dest: 'app/styles/fonts/icons.svg'},
					{src: ['source/icons/fontcustom/*.ttf'],  dest: 'app/styles/fonts/icons.ttf'}
				]
			},

            // Copy over files for release.
            release: {
                files: [
                    {
                        src: [
                            '.htaccess',
                            'favicon.ico',
                            'crossdomain.xml',
                            'humans.txt',
                            'robots.txt'
                        ],
                        dest: 'release/'
                    }
                ]
            }
		},
		replace: {
            // Replace Font Custom CSS.
			fontcustom: {
				src: ['source/icons/fontcustom/fontcustom.css'],
				dest: ['app/styles/exts/_icons.scss'],
				replacements: [{
					from: /fontcustom_[^.]+/g,
					to: 'fonts/icons'
				}, {
					from: 'fontcustom',
					to: 'icons'
				}]
			},

            // Replace for release.
            release: {
                src: ['index.html'],
                dest: ['release/index.html'],
                replacements: [{
                    from: '/app/vendor/bower/requirejs/require.js',
                    to: 'scripts/release.js'
                }, {
                    from: ' data-main="/app/config"',
                    to: ''
                }]
            }
		},


        /*== Release ================================================*/

        // Clean out the release directory
        // to remove old files.
        clean: ['release/'],

        // Optimize RequireJS scripts.
        requirejs: {
            compile: {
                options: {
                    almond: true,                       // Use Almond instead of RequireJS.
                    mainConfigFile: 'app/config.js',
                    baseUrl: 'app',
                    out: 'release/scripts/release.js',
                    name: 'config'
                }
            }
        },

        // Minify CSS.
        cssmin: {
            options: {
                report: 'gzip'
            },
            files: {
                expand: true,
                cwd: '.',
                src: ['app/styles/index.css'],
                dest: 'release/'
            }
        },

        // Compress PNG and JPG images.
         imagemin: {
             main: {
                 options: {
                     optimizationLevel: 3,              // Optimization level (png).
                     progressive: true                  // Loseless conversion to progressive (jpg).
                 },
                 files: [{
                     expand: true,
                     cwd: 'assets/images',
                     src: '{,*/}*.{png,jpg,jpeg}',
                     dest: 'release/assets/images'
                 }]
             }
         }

	});

	// Define grunt tasks
	// =======================================
	grunt.registerTask('default', ['sass', 'jade', 'connect', 'watch']);
	grunt.registerTask('fontcustom', ['shell:fontcustom', 'copy:fontcustom', 'replace:fontcustom']);
    grunt.registerTask('release', ['jshint', 'csslint', 'clean', 'replace:release', 'copy:release', 'cssmin', 'imagemin', 'requirejs']);

	// Load grunt packages
	// =======================================
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-shell');

};
