/*!
 * oauth2
 * Copyright(c) 2017 zhennanzhuce
 * MIT Licensed
 */
'use strict';

var gulp = require("gulp");
var babel = require("gulp-babel");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

gulp.task("clean", () => {
  return gulp.src(["./dist/authorize/*", '!./dist/authorize/node_modules']).pipe(clean({ force: true }));
});

gulp.task("default", ['copy1', 'copy2', 'copy3'], () => {
  return gulp.src(["src/authorize/**/*.js", '!./src/authorize/node_modules'])
             .pipe(babel())
             .pipe(uglify({ mangle: { toplevel: true } }))
             .pipe(gulp.dest("dist/authorize"));
});

gulp.task("copy1", () => {
  return gulp.src("src/authorize/package.json")
             .pipe(gulp.dest("dist/authorize"));
});

gulp.task("copy2", () => {
  return gulp.src("src/authorize/LICENSE")
             .pipe(gulp.dest("dist/authorize"));
});

gulp.task("copy3", () => {
  return gulp.src("src/authorize/README.md")
             .pipe(gulp.dest("dist/authorize"));
});