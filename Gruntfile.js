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
          'stylesheets/src/style.css': 'stylesheets/src/style.scss',   
          'stylesheets/src/blog.css': 'stylesheets/src/blog.scss',      // 'destination': 'source'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'javascripts/dist/application.js': [
            'javascripts/src/vendor/jquery.js',
            'javascripts/src/vendor/jquery-ui.js',
            'javascripts/src/vendor/underscore-min.js',
            'javascripts/src/vendor/backbone-min.js',
            'javascripts/src/vendor/retina.min.js',
            'javascripts/src/vendor/chroma.min.js',
            'javascripts/src/vendor/paper-full.min.js',
            'javascripts/src/vendor/slick.min.js',
            'javascripts/src/vendor/papaparse.min.js',
            'javascripts/src/vendor/js.cookie.js',
            'javascripts/src/vendor/moment.js',
            'javascripts/src/vendor/bowser.min.js',
            'javascripts/src/vendor/jquery.one-click-outside.js',
            'javascripts/src/vendor/imagesloaded.pkgd.min.js',
            'javascripts/src/vendor/jquery.blink.js',
            'javascripts/src/vendor/TweenMax.min.js',
            'javascripts/src/WY.js',
            'javascripts/src/utils.js',
            'javascripts/src/models/*.js',
            'javascripts/src/views/*.js'
          ],
          'stylesheets/dist/application.css': ['stylesheets/src/reset.css', 
                                               'stylesheets/src/fonts.css', 
                                               'stylesheets/src/style.css',
                                               'stylesheets/src/blog.css']
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