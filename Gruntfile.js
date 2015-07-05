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
          'as_modal_dialogs.css': 'styl/main.styl'
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
        dest: 'as_modal_dialogs.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.registerTask('default', ['stylus', 'jslint', 'concat', 'watch']);
  grunt.registerTask('compileStylus', ['stylus']);
  grunt.registerTask('compileJavascript', ['jslint', 'concat']);
};