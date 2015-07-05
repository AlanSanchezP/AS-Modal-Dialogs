/*jslint node: true, indent: 2, nomen:true */

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      options: {
        use : [
          function () {
            return require('autoprefixer-stylus')('last 2 versions', 'ie 8');
          }
        ]
      },
      compile: {
        files: {
          'css/as_modal_dialogs.min.css': 'styl/as-modal-dialogs_main.styl',
          'css/page.min.css': 'styl/page.styl'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.registerTask('default', ['stylus']);
};