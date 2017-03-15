const browserSync = require('browser-sync');
const cp          = require('child_process');

const projectRoot = '_site';

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
// const templatesPaths = [ 'src/+(pages|templates)/**/*.njs' ];
const templatesPaths = ['index.html', '404.html', '_layouts/*.html', '_includes/*.html', '_data/*.yml', '_posts/*', '_drafts/*', '**/*.html'];

// const jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';


module.exports = gulp => {

  // jekyll build
  gulp.task('jekyll-build', done => {
    console.log('Running jekyll build ____________________________________');
    // browserSync.notify('Running jekyll build');
    return cp.spawn( 'jekyll' , ['build', '--incremental'], {stdio: 'inherit'})
    .on('close', done);
  });

  // Rebuild Jekyll & reload
  gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload();
    console.log('after reload ____________________________________');
  });


  gulp.task( 'serve', () => {
    browserSync.init({
      notify: false,
      server: {
        baseDir: projectRoot
      }
    });

    gulp.watch( scssPath, [ 'styles', browserSync.reload ] );
    gulp.watch( jsPath, [ 'scripts', browserSync.reload ] );
    gulp.watch( templatesPaths, ['jekyll-rebuild']);
  });

}




