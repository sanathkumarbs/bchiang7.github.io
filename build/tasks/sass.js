const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');

const srcPath = '_scss/*.scss';
const destPath = '_site/css';

module.exports = gulp => {

  gulp.task('styles', () => {
    return gulp.src( srcPath )
    .pipe( sass( {
      includePaths: ['scss'],
      outputStyle: 'expanded',
      // outFile: 'index.css',
      sourceMap: true
    } ).on( 'error', sass.logError ) )
    .pipe( autoprefixer( {
      browsers: [ 'last 2 versions' ],
      cascade: false
    } ) )
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest( destPath ))
    .pipe(gulp.dest('css'));
  });

}