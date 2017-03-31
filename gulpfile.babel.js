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

gulp.task("clean1", () => {
  return gulp.src(["./dist/authorize/*", '!./dist/authorize/node_modules']).pipe(clean({ force: true }));
});

gulp.task("clean2", () => {
  return gulp.src(["./dist/token/*", '!./dist/token/node_modules']).pipe(clean({ force: true }));
});

gulp.task("clean", ['clean1', 'clean2']);




gulp.task("a", ['a_copy1', 'a_copy2', 'a_copy3'], () => {
  return gulp.src(["src/authorize/**/*.js", '!./src/authorize/node_modules/**'])
             .pipe(babel())
             .pipe(uglify({ mangle: { toplevel: true } }))
             .pipe(gulp.dest("dist/authorize"));
});

gulp.task("a_copy1", () => {
  return gulp.src("src/authorize/package.json")
             .pipe(gulp.dest("dist/authorize"));
});

gulp.task("a_copy2", () => {
  return gulp.src("src/authorize/LICENSE")
             .pipe(gulp.dest("dist/authorize"));
});

gulp.task("a_copy3", () => {
  return gulp.src("src/authorize/README.md")
             .pipe(gulp.dest("dist/authorize"));
});




gulp.task("b", ['b_copy1', 'b_copy2', 'b_copy3'], () => {
  return gulp.src(["src/token/**/*.js", '!./src/token/node_modules/**'])
             .pipe(babel())
             .pipe(uglify({ mangle: { toplevel: true } }))
             .pipe(gulp.dest("dist/token"));
});

gulp.task("b_copy1", () => {
  return gulp.src("src/token/package.json")
             .pipe(gulp.dest("dist/token"));
});

gulp.task("b_copy2", () => {
  return gulp.src("src/token/LICENSE")
             .pipe(gulp.dest("dist/token"));
});

gulp.task("b_copy3", () => {
  return gulp.src("src/token/README.md")
             .pipe(gulp.dest("dist/token"));
});


gulp.task("default", ['a', 'b']);