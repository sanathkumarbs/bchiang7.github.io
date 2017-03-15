const browserSync = require('browser-sync');
const cp          = require('child_process');

const projectRoot = '_site';

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
const templatesPaths = [ 'src/+(pages|templates)/**/*.njs' ];

const jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

module.exports = gulp => {

  // Build the Jekyll Site
  gulp.task('jekyll-dev', done => {
    browserSync.notify(messages.jekyllDev);

    return cp.spawn( jekyll , ['build', '--drafts', '--config', '_config.yml'], {stdio: 'inherit'})
    .on('close', done);

  });

  // Rebuild Jekyll & reload the page
  gulp.task('jekyll-rebuild', ['jekyll-dev'], () => {
    browserSync.reload();
  });

  // Wait for jekyll-dev task to complete, then launch the Server
  gulp.task('browser-sync', ['styles', 'scripts', 'jekyll-dev'], () => {
    browserSync({
      server: {
        baseDir: '_site'
      }
    });
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
    // gulp.watch( templatesPaths, [ 'templates', browserSync.reload ] );
    gulp.watch(['index.html', '404.html', '_layouts/*.html', '_includes/*.html', '_data/*.yml', '_posts/*', '_drafts/*', '**/*.html'], ['jekyll-rebuild']);
  });

}




