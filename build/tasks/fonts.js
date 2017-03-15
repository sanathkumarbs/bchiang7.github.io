const fontsPath = 'fonts/**/*';
const distPath = '_site/fonts';

module.exports = gulp => {

  gulp.task('fonts', () => {
    return gulp.src( fontsPath )
    .pipe (gulp.dest( distPath ) );
  });

}