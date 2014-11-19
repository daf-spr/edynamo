'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'lib/',
                    outdir: 'dist/docs'
                }
            }
        },
        build: {

        },
        jsonlint: {
            pkg: {
                src: ['package.json']
            }
        },
        jshint: {
            all: {
                src: [
                    'lib/**/*.js', 'Gruntfile.js', 'test/**/*.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        jscs: {
            src: 'lib/**/*.js',
            gruntfile: 'Gruntfile.js',
            test: 'test/**/*.js'
        },
        watch: {
            default:{
                files: ['<%= jshint.all.src %>'],
                tasks: ['lint', 'yuidoc'],
                options: {
                    debounceDelay: 5000
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', ['jshint', 'jscs']);

    // Short list as a high frequency watch task
    grunt.registerTask('dev', ['lint']);

    grunt.registerTask('doc', ['yuidoc:compile']);

    // Default grunt
    grunt.registerTask('default', ['jsonlint', 'dev']);
};
