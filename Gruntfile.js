module.exports = function (grunt) {
    var path;
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    path = require('path');

    grunt.initConfig({
        appConfig: {
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },
        bower_concat: {
            dist: {
                dest: '<%= appConfig.app %>/js/vendors.js'
            }
        },
        inline_angular_templates: {
            dist: {
                options: {
                    base: 'app',
                    prefix: './',
                    selector: 'head',
                    method: 'replaceWith'
                },
                files: {
                    'app/index.html': ['app/views/**/*.html']
                }
            }
        },
        concat: {
            dist: {
                src: ['<%= appConfig.app %>/js/scripts/**/*.js'],
                dest: '<%= appConfig.app %>/js/javascript.js',
                nocase: true
            }
        },
        clean: {
            rebuild: {
                src: 'dist'
            }
        },
        uglify: {
            dist: {
                src: [
                    '<%= appConfig.app %>/js/javascript.js',
                    '<%= appConfig.app %>/js/vendors.js'],
                dest: '<%= appConfig.app %>/js/javascript.min.js'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= appConfig.app %>',
                        dest: '<%= appConfig.dist %>',
                        src: [
                            'js/**/*.js',
                            '*.html',
                            'views/**/*.html',
                            'css/**/*.css',
                            'css/**/*.otf']
                    }
                ]
            }
        },
        watch: {
            js: {
                files: ['app/js/scripts/**/*.js'],
                tasks: ['concat:dist'],
                options: {
                    spawn: false
                }
            }
        }
    });
    return grunt.registerTask('default',
        [
            'clean:rebuild',
            'concat:dist',
            'bower_concat:dist',
            'inline_angular_templates',
            'uglify:dist',
            'copy:dist',
        ]);
};