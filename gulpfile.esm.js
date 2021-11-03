import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import beautify from 'gulp-beautify';
import { resolve } from 'path';

gulp.task('scss', () =>
  gulp
    .src(resolve(__dirname, 'assets', 'scss', '**', '*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))
    .pipe(beautify.css({ indent_size: 2 }))
    .pipe(gulp.dest(resolve(__dirname, 'assets', 'css')))
);

export default () => {
  const browser = browserSync.create();
  browser.init({
    server: {
      baseDir: './',
    },
    startPath: 'pages/auth/login.html',
  });

  gulp.watch(
    resolve(__dirname, 'assets', 'scss', '**', '*.scss'),
    { ignoreInitial: false },
    gulp.parallel(['scss'])
  );

  gulp
    .watch([resolve(__dirname, 'pages', '**', '*.html')])
    .on('change', browser.reload);
};
