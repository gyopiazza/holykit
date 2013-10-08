module.exports = function(grunt){

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less:{
			compile:{
				files:{
					'demo/css/demo.css' : 'less/demo.less'
				}
		    }
	    },

	    watch:{
	    	less:{
	    		files: ['less/**/*.less'],
	    		tasks: ['less']
	    	}
	    }
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-reload');

	// Register tasks
	grunt.registerTask('default', ['less']);
	// grunt.registerTask('server', ['express', 'watch', 'express-keepalive']);
}