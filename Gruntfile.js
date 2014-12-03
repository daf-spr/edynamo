'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochacov: {
            options: {
                require: ['chai']
            },
            cov: {
                options:{
                    reporter: 'html-cov',
                    output: 'dist/reports/cov.html',
                    files: ['test/spec/**/*.js']
                }
            },
            test: {
                options:{
                    reporter: 'spec',
                    output: 'dist/reports/test.html',
                    files: ['test/spec/**/*.js']
                }
            }
        },
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
                tasks: ['lint', 'test'],
                options: {
                    debounceDelay: 5000
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', ['jshint', 'jscs']);

    grunt.registerTask('test', ['mochacov:cov', 'mochacov:test']);

    // Short list as a high frequency watch task
    grunt.registerTask('dev', ['lint', 'test']);

    grunt.registerTask('doc', ['yuidoc:compile']);

    // Default grunt
    grunt.registerTask('default', ['jsonlint', 'dev']);
};
