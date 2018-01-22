var gulp               = require('gulp'),
    clean              = require('gulp-clean'),
    sass               = require('gulp-sass'),
    autoprefixer       = require('gulp-autoprefixer'),
    concat             = require('gulp-concat'),
    uglify             = require('gulp-uglify'),
    rename             = require('gulp-rename'),
    plumber            = require('gulp-plumber'),
    fileinclude        = require('gulp-file-include'),
    rev                = require('gulp-revm'),
    revCollector       = require('gulp-revm-collector'),
    browserSync        = require('browser-sync'),
    reload             = browserSync.reload;

// rev: json 版號
// revCollector: 資源路徑更改

var PATH_SRC_STYLE = 'src/assets/sass/**/*.sass';
var PATH_SRC_JS    = 'src/assets/js/*.js';
var PATH_SRC_HTML  = 'src/**/*.html';
var PATH_DES_STYLE = 'public/assets/css/';
var PATH_DES_JS    = 'public/assets/js/';
var PATH_DES_HTML  = 'public/';
var PATH_REV_JSON  = 'rev/**/*.json';

gulp.task('clean-css', function() {
  return gulp.src(PATH_DES_STYLE, {read: false})
    .pipe(clean());
});

// compile sass
gulp.task('sass', ['clean-css'], function() {
  return gulp.src(PATH_SRC_STYLE)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rev())
    .pipe(gulp.dest(PATH_DES_STYLE))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
    // .pipe(reload({stream: true}));
});

var vendorcss = [
  'node_modules/aos/dist/aos.css',
  'node_modules/flatpickr/dist/flatpickr.min.css'
]

gulp.task('vendor-css', function() {
  return gulp.src(vendorcss)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(PATH_DES_STYLE));
});

gulp.task('clean-scripts', function() {
  return gulp.src(PATH_DES_JS, {read: false})
    .pipe(clean());
});

// concatenate & minify JS (MD5 process)
gulp.task('scripts', ['clean-scripts'], function() {
  return gulp.src(PATH_SRC_JS)
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest(PATH_DES_JS))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(PATH_DES_JS))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
    // .pipe(reload({stream: true}));
});

var vendorjs = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery.easing/jquery.easing.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/aos/dist/aos.js',
  'node_modules/scrolltofixed/jquery-scrolltofixed-min.js'
]

gulp.task('vendor-js', function() {
  return gulp.src(vendorjs)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(PATH_DES_JS));
});

// reversion css/js deps on task [sass, scripts]
gulp.task('rev-collector', ['sass', 'scripts'] ,function(cb) {
  gulp.src([PATH_REV_JSON, PATH_SRC_HTML])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(PATH_DES_HTML))
    .pipe(reload({stream: true}));
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
  gulp.watch([PATH_SRC_STYLE, PATH_SRC_JS, PATH_SRC_HTML], ['rev-collector']);
});

gulp.task('default', ['rev-collector', 'vendor-css', 'vendor-js', 'browser-sync', 'watch']);
