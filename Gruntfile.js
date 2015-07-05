/*jslint node: true, indent: 2, nomen:true */

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      styl: {
        files: ['styl/*.styl'],
        tasks: ['compileStylus']
      },
      js: {
        files: ['Gruntfile.js', 'app.js', 'js/*.js'],
        tasks: ['compileJavascript']
      }
    },
    stylus: {
      options: {
        use: [
          function () {
            return require('autoprefixer-stylus')('last 2 versions', 'ie 8');
          }
        ],
        compress: false
      },
      compile: {
        files: {
          'as-modal-dialogs.css': 'styl/main.styl'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'as-modal-dialogs.min.css': 'as-modal-dialogs.css'
        }
      }
    },
    jslint: {
      client: {
        src: ['Gruntfile.js',
          'app.js',
          'js/*.js'
          ],
        directives: {
          browser: true,
          predef: [
            'angular'
          ]
        }
      }
    },
    concat: {
      options: {
        separator: ''
      },
      basic: {
        src: ['js/*.js'],
        dest: 'as-modal-dialogs.js'
      }
    },
    uglify: {
      target: {
        files: {
          'as-modal-dialogs.min.js': ['as-modal-dialogs.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.registerTask('default', ['stylus', 'cssmin', 'jslint', 'concat', 'uglify', 'watch']);
  grunt.registerTask('compileStylus', ['stylus']);
  grunt.registerTask('compileJavascript', ['jslint', 'concat', 'uglify']);
};