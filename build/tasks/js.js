// const eslint = require('gulp-eslint');
const jshint      = require('gulp-jshint');
const babel  = require('gulp-babel');
const uglify = require('gulp-uglify');

const srcPath = 'src/js/**/*.+(js)';
const destPath = 'dist/js';

module.exports = gulp => {

  gulp.task('scripts', () => {
    return gulp.src('_scripts/*.js')
    .pipe(jshint())
    .pipe(babel({
      presets: ['es2015']
    }))
    // .pipe( eslint({
    //   useEslintrc: true
    // }))
    // .pipe( eslint.format() )
    // .pipe(uglify())
    .pipe(gulp.dest('_site/js'))
    .pipe(gulp.dest('js'));
  });
}
