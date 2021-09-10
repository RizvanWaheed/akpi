module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		emberTemplates: {
			compile: {
				options: {
					precompile: true,
					amd: false,
					//concatenate: false,
					templateNamespace: 'HTMLBars',
					templateCompilerPath: 'assets/ember/lib/ember-template-compiler.js',
					handlebarsPath: 'node_modules/handlebars/dist/handlebars.js',
					templateBasePath: /assets\/ember\/app\/templates\//
				},
				files: {
					'assets/ember/dist/templates.js': ['assets/ember/app/templates/**/*.hbs']
				}
			}
		},

		concat: {
			options: {
				sourceMap: true
			},
			lib: {
				src: [
					'assets/ember/lib/handlebars-v2.0.0.js',
					'assets/ember/lib/matchMedia.js',
					'assets/ember/lib/matchMedia.addListener.js',
					'assets/ember/lib/ember-template-compiler.js',
					'assets/ember/lib/ember.prod.js',
					//'assets/ember/lib/ember.debug.js',
					//'assets/ember/lib/ember-handlebars-loader-0.0.1.js',//not used
					'assets/ember/lib/ember-websocket.js',
					'assets/ember/lib/ember-data.js',
					'assets/ember/lib/localstorage_adapter.js',


					//'assets/ember/lib/ember-fastclick.js',
					'assets/ember/lib/ember-touch.js',
					'assets/ember/lib/ember-animate.js',
					'assets/ember/lib/ember-responsive.js',
					//    'assets/ember/lib/typeahead.js'
				],
				dest: 'assets/ember/dist/lib.js'
			},
			app: {
				src: [
					'assets/ember/app/telenor.js',
					'assets/ember/app/router.js',
					'assets/ember/app/store.js',
					//    'assets/ember/app/initializer.js',
				],
				dest: 'assets/ember/dist/app.js'
			},
			initializers: {
				src: 'assets/ember/app/initializers/**/*.js',
				dest: 'assets/ember/dist/initializers.js'
			},
			helpers: {
				src: 'assets/ember/app/helpers/**/*.js',
				dest: 'assets/ember/dist/helpers.js'
			},
			adapters: {
				src: 'assets/ember/app/adapters/**/*.js',
				dest: 'assets/ember/dist/adapters.js'
			},
			mixins: {
				src: 'assets/ember/app/mixins/**/*.js',
				dest: 'assets/ember/dist/mixins.js'
			},
			components: {
				src: 'assets/ember/app/components/**/*.js',
				dest: 'assets/ember/dist/components.js'
			},
			controllers: {
				src: 'assets/ember/app/controllers/**/*.js',
				dest: 'assets/ember/dist/controllers.js'
			},
			models: {
				src: 'assets/ember/app/models/**/*.js',
				dest: 'assets/ember/dist/models.js'
			},
			routes: {
				src: 'assets/ember/app/routes/**/*.js',
				dest: 'assets/ember/dist/routes.js'
			},
			views: {
				src: 'assets/ember/app/views/**/*.js',
				dest: 'assets/ember/dist/views.js'
			},
			ember: {
				src: [
					'assets/ember/dist/app.js',
					'assets/ember/dist/initializers.js',
					'assets/ember/dist/helpers.js',
					'assets/ember/dist/mixins.js',
					'assets/ember/dist/adapters.js',
					'assets/ember/dist/components.js',
					'assets/ember/dist/controllers.js',
					'assets/ember/dist/models.js',
					'assets/ember/dist/routes.js',
					'assets/ember/dist/views.js'
				],
				dest: 'assets/ember/dist/app.con.js'
			},
			appcontemp: {
				src: [
					'assets/ember/dist/lib.js',
					'assets/ember/dist/templates.js',
					'assets/ember/dist/app.con.js',
				],
				dest: 'assets/ember/dist/lib.app.temp.js'
			},

		},
		uglify: {
			options: {
				sourceMap: true,
				//  sourceMapIncludeSources : true,
				//   sourceMapIn : 'assets/ember/app.con.js.map'
			},
			lib: {
				src: 'assets/ember/dist/lib.js',
				dest: 'assets/ember/dist/lib.min.js'
			},
			template: {
				src: 'assets/ember/dist/templates.js',
				dest: 'assets/ember/dist/template.min.js'
			},
			app: {
				src: 'assets/ember/dist/app.con.js',
				dest: 'assets/ember/dist/app.min.js'
			},
			ember: {
				src: 'assets/ember/dist/lib.app.temp.js',
				dest: 'assets/ember/dist/lib.app.temp.min.js'
			}
		},
		clean: {
			js: ["assets/ember/dist/*.js", "!assets/ember/dist/*.min.js"] //, "!assets/ember/dist/templates.js"
		},
		watch: {
			emberTemplates: {
				files: 'assets/ember/app/templates/*.hbs',
				tasks: ['emberTemplates']
			},
			concat: {
				files: ['!assets/ember/dist/lib.js', '!assets/ember/dist/app.js', '!assets/ember/dist/initializers.js', , '!assets/ember/dist/helpers.js', '!assets/ember/dist/templates.js', '!assets/ember/dist/mixins.js', '!assets/ember/dist/adapters.js', '!assets/ember/dist/components.js', '!assets/ember/dist/controllers.js', '!assets/ember/dist/models.js', '!assets/ember/dist/routes.js', '!assets/ember/dist/views.js', '!assets/ember/dist/app.con.js', '!assets/ember/dist/lib.app.temp.js'], //'assets/js/**/*.js',, '!assets/ember/libs.js'
				tasks: ['concat']
			},
			uglify: {
				files: ['!assets/ember/dist/app.con.min.js', '!assets/ember/dist/lib.min.js', '!assets/ember/dist/template.min.js', '!assets/ember/dist/lib.app.temp.min.js'], //'assets/js/**/*.js',
				tasks: ['uglify']
			},
			clean: {
				files: ['assets/ember/dist/*.js'], //'assets/js/**/*.js',, '!assets/ember/libs.js'
				tasks: ['clean']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-ember-templates');


	// Default task(s).
	grunt.registerTask('default', ['emberTemplates', 'concat', 'uglify']); //, 'clean'
};
