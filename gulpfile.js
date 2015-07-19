'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var babel = require('babel/register');

gulp.task('test', function (callback) {
  gulp.src(['lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('finish', function () {
      gulp.src(['__tests__/unit/**/*.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(mocha({
          compilers: {
            js: babel
          },
          reporter: 'spec'
        }))
        .on('end', callback);
    });
});

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js', '__tests__/**/*.js', '__tests__/**/*.json'], ['test']);
});

gulp.task('default', ['test', 'watch']);
