var gulp               = require('gulp');
var uglify             = require('gulp-uglify');
var gulpCompass        = require('gulp-compass');
var gulpImagemin       = require('gulp-imagemin');
var gulpRev            = require('gulp-revm');
var gulpRevCollector   = require('gulp-revm-collector');
var gulpPlumber        = require('gulp-plumber');
// var gulpConcat         = require('gulp-concat');

gulp.task('sassCompile', function () {
  gulp.src('src/assets/sass/**/*.sass')     // sass 來源路徑
    .pipe(gulpPlumber())
    .pipe(gulpCompass({
      css: 'src/assets/css',                // compass 輸出位置
      sass: 'src/assets/sass',              // sass 來源路徑
      image: 'src/assets/img',              // 圖片來源路徑
      style: 'compressed',                  // 預設 nested（expanded, nested, compact, compressed）
      comments: false,
    }));
});

var PATH_SRC_HTML = 'src/**/*.html';
var PATH_DES_HTML = 'public/';
var PATH_REV_JSON = 'rev/**/*.json';

/*----------js MD5 process----------*/
gulp.task('jsMin', function() {
   return gulp.src('src/assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulpRev())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(gulpRev.manifest())
    .pipe(gulp.dest('rev/js'));
});

/*----------css MD5 process----------*/
gulp.task('cssMin',function() {
  return gulp.src('src/assets/css/**/*.css')
    .pipe(gulpRev())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(gulpRev.manifest())
    .pipe(gulp.dest('rev/css'));
});

/*----------img MD5 process----------*/
gulp.task('imgCheck',function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(gulpImagemin())
    .pipe(gulpRev())
    .pipe(gulp.dest('public/assets/img'))
    .pipe(gulpRev.manifest())
    .pipe(gulp.dest('rev/img'));
});

/*----------reversion js deps on task [jsMin]----------*/
gulp.task('revJs',['jsMin'],function(cb){
  gulp.src([ PATH_REV_JSON, PATH_SRC_HTML ])
    .pipe(gulpRevCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest( PATH_DES_HTML ));
    cb();
});


/*----------reversion css deps on task [cssMin]----------*/
gulp.task('revCss',['cssMin'],function(cb){
  gulp.src([ PATH_REV_JSON, PATH_SRC_HTML ])
    .pipe(gulpRevCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest( PATH_DES_HTML ));
    cb();
});

/*----------reversion img deps on task [imgCheck]----------*/
gulp.task('revImg',['imgCheck'],function(cb){
  gulp.src([ PATH_REV_JSON, PATH_SRC_HTML ])
    .pipe(gulpRevCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest( PATH_DES_HTML ));
    cb();
});

/*----------reversion html pages----------*/
gulp.task('revHtml',function(cb){
  gulp.src([ PATH_REV_JSON, PATH_SRC_HTML ])
    .pipe(gulpRevCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest( PATH_DES_HTML ));
    cb();
});

/*----------watch----------*/
gulp.task('watch',function() {
  console.log("watcher has started");
  gulp.watch('src/assets/sass/**/*.sass', ['sassCompile']);
  gulp.watch('src/assets/js/**/*.js', ['revJs']);
  gulp.watch('src/assets/css/**/*.css', ['revCss']);
  gulp.watch('src/assets/img/**/*', ['revImg']);
  gulp.watch('src/**/*.html',['revHtml']);
});
