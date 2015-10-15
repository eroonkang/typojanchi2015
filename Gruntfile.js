module.exports = function(grunt) {

  grunt.initConfig({
   watch: {
      scripts: {
        files: ['javascripts/src/models/*.js', 'javascripts/src/views/*.js', 'stylesheets/src/*.scss', 'stylesheets/src/fonts.css'],
        tasks: ['sass', 'concat']
      },
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'stylesheets/src/style.css': 'stylesheets/src/style.scss'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'javascripts/dist/application.js': [
            'javascripts/src/vendor/jquery.js',
            'javascripts/src/vendor/underscore-min.js',
            'javascripts/src/vendor/backbone-min.js',
            'javascripts/src/vendor/retina.min.js',
            'javascripts/src/vendor/js-yaml.min.js',
            'javascripts/src/vendor/kerning.js',
            'javascripts/src/vendor/leaflet-src.js',
            'javascripts/src/WY.js',
            'javascripts/src/utils.js',
            'javascripts/src/models/*.js',
            'javascripts/src/views/*.js'
          ],
          'stylesheets/dist/application.css': ['stylesheets/src/reset.css', 
                                               'stylesheets/src/fonts.css', 
                                               'stylesheets/src/leaflet.css',
                                               'stylesheets/src/style.css']
        }
      },
    },
    

    uglify: {
      my_target: {
        files: {
          'javascripts/dist/application.min.js': ['javascripts/dist/application.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'sass', 'uglify']);

};