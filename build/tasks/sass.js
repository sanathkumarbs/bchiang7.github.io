const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');

const srcPath = '_scss/*.scss';
const destPath = 'dist/css/';

module.exports = gulp => {

  // gulp.task( 'sass', () => {
  //   return gulp.src( srcPath )
  //   .pipe( sass( {
  //     outputStyle: 'expanded',
  //     outFile: 'index.css',
  //     sourceMap: true
  //   } ).on( 'error', sass.logError ) )
  //   .pipe( autoprefixer( {
  //     browsers: [ 'last 2 versions' ],
  //     cascade: false
  //   } ) )
  //   .pipe( gulp.dest( destPath ) );
  // });


  gulp.task('styles', () => {
    return gulp.src( srcPath )
    .pipe(sass({
      includePaths: ['scss']
      // onError: browserSync.notify
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('_site/css'))
    // .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('css'));
  });
}