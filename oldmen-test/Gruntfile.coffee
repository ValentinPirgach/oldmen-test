module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  path = require('path')

  # Project configuration.
  grunt.initConfig

    appConfig:
      app: require('./bower.json').appPath || 'app'
      dist: 'dist'

    bower_concat:
      dist:
        dest: '<%= appConfig.app %>/js/vendor.js'

    clean:
      rebuild:
        src: 'dist'

    copy:
      dist:
        files: [
          {
            expand: true
            dot: true
            cwd: '<%= appConfig.app %>'
            dest: '<%= appConfig.dist %>'
            src: [
              'js/**/*.js',
              '*.html',
              'views/**/*.html',
              'css/**/*.css'
              'css/**/*.otf'
            ]
          }
        ]

  grunt.registerTask 'default', ['clean:rebuild', 'bower_concat:dist', 'copy:dist']