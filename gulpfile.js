var gulp       = require('gulp'),
  sass         = require('gulp-sass'),
  pug          = require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync  = require('browser-sync'),
  watch        = require('gulp-watch');

gulp.task('js', function() {
  return gulp.src([
    'src/js/scripts.js', // Всегда в конце
    ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
  function run() {
    return gulp.src('src/sass/*.sass')
    .pipe(sass())
  	.pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
  }
  watch('src/sass/*.sass', run);
  return run();
});
gulp.task('pug', function() {
  function run() {
    return gulp.src('src/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('src/'))
      .pipe(browserSync.reload({stream: true}));
  }
  watch('src/*.pug', run);
  return run();
});
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('default', ['sass', 'pug', 'js', 'browser-sync']);