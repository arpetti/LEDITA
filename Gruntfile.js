module.exports = function(grunt) {

	var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
                    	'<%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    	' *  License: <%= pkg.license %> */\n';
    var name = '<%= pkg.name %>-v<%= pkg.version%>';

	grunt.initConfig({
	    
	    jshint: {
	      options: {
	      	ignores: ['client/js/lib/**/*.js', 'server/tests/**/*.js'],
	      	smarttabs: true
	      },
	      target: {
	        src : ['server/**/*.js', 'client/**/*.js']
	      }
	    },

	    clean: ['dist'],

	    pkg : grunt.file.readJSON('package.json'),
	    
	    concat: {
	      options: {
	        banner: bannerContent
	      },
	      target : {
	        src : [
	        	'client/js/auth/AuthRoutingConfig.js', 
	        	'client/js/app.js',
	        	'client/js/auth/AuthService.js', 
	        	'client/js/auth/AuthController.js', 
	        	'client/js/auth/AuthFilter.js', 
	        	'client/js/auth/AuthDirective.js', 
	        	'client/js/ld/**/*.js',
	        	'client/js/user/**/*.js',
	        	],
	        dest : 'dist/' + name + '.js'
	      }
	    }
  	});

  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-concat');
  	
  	grunt.registerTask('default', []);
  	grunt.registerTask('dev', ['jshint']);
  	grunt.registerTask('build', ['clean', 'concat']);

};