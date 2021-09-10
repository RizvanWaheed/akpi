// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var emberTemplates = require('gulp-ember-templates');
var clean = require('gulp-clean');

var pathSrc = 'assets/ember/dash/';
var pathDist = 'assets/ember/appdist/';
var pathLib = 'assets/ember/lib/';

gulp.task('clean-all-scripts', function () {
  return gulp.src(pathDist+'*.js', {read: false})
    .pipe(clean());
});
gulp.task('moveJoined',['clean-all-scripts'], function (cb) {
  gulp.src([pathSrc+'app.js'])//pathSrc+'telenor.js', pathSrc+'store.js', pathSrc+'router.js'//
    //.pipe(jshint())
   // .pipe(jshint.reporter('default'))
   // .pipe(emberTemplates())
    .pipe(concat('base.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist));
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(uglify('templates.min.js', { outSourceMap: true }))
    //.pipe(gulp.dest(pathDist));
  gulp.src(pathSrc+'templates/*.hbs')
    //.pipe(jshint())
   // .pipe(jshint.reporter('default'))
    .pipe(emberTemplates())
    .pipe(concat('templates.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist))
    //.pipe(rename({ suffix: '.min' }))
    .pipe(uglify('templates.min.js', { outSourceMap: true }))
    .pipe(gulp.dest(pathDist));

  gulp.src(pathSrc+'components/*.js')
   // .pipe(jshint())
   // .pipe(jshint.reporter('default'))
    .pipe(concat('components.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist));
    //.pipe(uglify('components.min.js', { outSourceMap: true }))
    //.pipe(gulp.dest(pathDist));

  gulp.src(pathSrc+'controllers/*.js')
   // .pipe(jshint())
   // .pipe(jshint.reporter('default'))
    .pipe(concat('controllers.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist));
    //.pipe(uglify('controllers.min.js', { outSourceMap: true }))
    //.pipe(gulp.dest(pathDist));

   gulp.src(pathSrc+'models/*.js')
   // .pipe(jshint())
   // .pipe(jshint.reporter('default'))
    .pipe(concat('models.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist));
    //.pipe(uglify('models.min.js', { outSourceMap: true }))
    //.pipe(gulp.dest(pathDist));

  gulp.src(pathSrc+'routes/*.js')
   // .pipe(jshint())
   // .pipe(jshint.reporter('default'))
    .pipe(concat('routes.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist));
    //.pipe(uglify('routes.min.js', { outSourceMap: true }))
    //.pipe(gulp.dest(pathDist));

  gulp.src([pathSrc+'views/Main.js', pathSrc+'views/*.js'])
   // .pipe(jshint())
   // .pipe(jshint.reporter('default'))
    .pipe(concat('views.js')) // make sure to only do concat after 
    .pipe(gulp.dest(pathDist));
    //.pipe(uglify('views.min.js', { outSourceMap: true }))
    //.pipe(gulp.dest(pathDist));

  cb();
});
gulp.task('lib', ['moveJoined'], function(cb) {
  setTimeout(function () {
  gulp.src([  pathLib+'handlebars-v2.0.0.js'
          , pathLib+'ember.js'
          , pathLib+'ember-data.js'
          , pathLib+'localstorage_adapter.js'])
    //.pipe(jshint())
   // .pipe(jshint.reporter('default'))
    //.pipe(emberTemplates())
   // .pipe(concat('app.js')) // make sure to only do concat after 
   // .pipe(gulp.dest(pathDist))
    //.pipe(rename({ suffix: '.min' }))
    .pipe(uglify('lib.min.js', { outSourceMap: true }))
    .pipe(gulp.dest(pathDist));
  // task 'one' is done now
  
  cb();
  }, 5000);
    //.pipe(gulp.dest(pathDist));
});
gulp.task('app', ['lib'], function(cb) {
  // task 'one' is done now
   //console.log(pathDist+'base.js');
   setTimeout(function () {
  gulp.src([pathDist+'base.js', pathDist+'components.js', pathDist+'controllers.js', pathDist+'models.js', pathDist+'routes.js', pathDist+'views.js'])
      .pipe(concat('app.js')) // make sure to only do concat after 
      .pipe(gulp.dest(pathDist))
      .pipe(uglify('app.min.js', { outSourceMap: true }))
      .pipe(gulp.dest(pathDist));
     cb();
    }, 7000);
  
});


// Default Task
gulp.task('default', ['clean-all-scripts', 'moveJoined', 'lib', 'app']);//,   'watch'