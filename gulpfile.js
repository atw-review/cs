var gulp               = require('gulp'),
    print              = require('gulp-print'),
    clean              = require('gulp-clean'),
    imagemin           = require('gulp-imagemin'),
    compass            = require('gulp-compass'),
    autoprefixer       = require('gulp-autoprefixer'),
    concat             = require('gulp-concat'),
    uglify             = require('gulp-uglify'),
    rename             = require('gulp-rename'),
    plumber            = require('gulp-plumber'),
    fileInclude        = require('gulp-file-include'),
    rev                = require('gulp-revm'),            // rev: json 版號
    revCollector       = require('gulp-revm-collector'),  // revCollector: 資源路徑更改
    browserSync        = require('browser-sync'),
    reload             = browserSync.reload;


// path
var PATH_SRC_SASS  = 'src/assets/sass/*.sass';
var PATH_SRC_CSS   = 'src/assets/css/**';
var PATH_SRC_JS    = 'src/assets/js/*.js';
var PATH_SRC_IMG   = 'src/assets/img/**';
var PATH_SRC_HTML  = 'src/**/*.html';
var PATH_DES_STYLE = 'public/assets/css/';
var PATH_DES_JS    = 'public/assets/js/';
var PATH_DES_IMG   = 'public/assets/img/';
var PATH_DES_HTML  = 'public/';
var PATH_REV_JSON  = 'rev/**/*.json';


// gulp.task('print', function() {
//   gulp.src(PATH_SRC_SASS)
//     .pipe(print())
// });


// optimize images
gulp.task('img', function () {
  gulp.src(PATH_SRC_IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(PATH_DES_IMG));
});


gulp.task('clean-css', function() {
  return gulp.src(PATH_DES_STYLE, {read: false})
    .pipe(clean());
});


var vendorcss = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/aos/dist/aos.css',
  'node_modules/lity/dist/lity.min.css',
  'node_modules/flatpickr/dist/flatpickr.min.css',
  'node_modules/photoswipe/dist/photoswipe.css'
]


gulp.task('vendor-css', function() {
  return gulp.src(vendorcss)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(PATH_DES_STYLE));
});


gulp.task('vendor-css-img', function() {
  gulp.src(PATH_SRC_CSS)
    .pipe(imagemin())
    .pipe(gulp.dest(PATH_DES_STYLE));
});


// compile sass
// gulp.task('compass', ['clean-css'], function() {
gulp.task('compass', function() {
  gulp.src(PATH_SRC_SASS)
    .pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      css: 'public/assets/css',  // 輸出位置
      sass: 'src/assets/sass'    // 來源路徑
    }))
    .pipe(rev())
    .pipe(gulp.dest(PATH_DES_STYLE))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});


gulp.task('clean-scripts', function() {
  return gulp.src(PATH_DES_JS, {read: false})
    .pipe(clean());
});


// concatenate & minify JS (MD5 process)
// gulp.task('scripts', ['clean-scripts'], function() {
gulp.task('scripts', function() {
  return gulp.src(PATH_SRC_JS)
    .pipe(plumber())
    // .pipe(concat('all.js'))
    // .pipe(gulp.dest(PATH_DES_JS))
    // .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(PATH_DES_JS))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'))
    .pipe(reload({stream: true}));
});


// reversion css/js deps on task [sass, scripts]
gulp.task('rev-collector', ['compass', 'scripts'] ,function(cb) {
  gulp.src([PATH_REV_JSON, PATH_SRC_HTML])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(PATH_DES_HTML))
    .pipe(reload({stream: true}))
    cb();
});

// browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
})

// watch
gulp.task('watch',function() {
  gulp.watch([PATH_SRC_SASS, PATH_SRC_JS, PATH_SRC_HTML], ['rev-collector']);
  // gulp.watch([PATH_SRC_IMG], ['img']);
});

// gulp.task('default', ['rev-collector', 'vendor-css', 'vendor-js', 'browser-sync', 'img', 'watch']);
gulp.task('default', ['img', 'clean-css', 'vendor-css', 'vendor-css-img', 'clean-scripts', 'rev-collector', 'browser-sync', 'watch']);
