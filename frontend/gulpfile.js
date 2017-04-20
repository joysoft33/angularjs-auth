let gulp = require('gulp'),
  del = require('del'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  vinylSource = require('vinyl-source-stream'),
  vinylBuffer = require('vinyl-buffer'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins();

// Get vendors dependencies from package.json file
let packageJson = require('./package.json');
let dependencies = Object.keys(packageJson && packageJson.dependencies || {});

// The source files paths
let src = {
  index: 'index.html',
  entry: 'js/app.js',
  js: 'js/**/*.js',
  html: 'views/**/*.html',
  images: 'images/**/*.*',
  fonts: ['fonts/*.*', 'node_modules/bootstrap/dist/fonts/*.*'],
  styles: ['css/**/*.scss', 'css/**/*.css']
};

// The destination paths
let dst = {
  path: 'dist/',
  images: 'images/',
  fonts: 'fonts/',
  vendors: 'vendors/',
  styles: 'css/',
  scripts: 'js/'
};

/**
 * MAIN TASKS
 */
gulp.task('dev', ['buildDev', 'copy-fonts', 'copy-images', 'stylesDev']);

gulp.task('watch:dev', function () {
  gulp.watch([src.js, src.index, src.html], ['buildDev']);
  gulp.watch(src.styles, ['stylesDev']);
  gulp.watch(src.fonts, ['copy-fonts']);
  gulp.watch(src.images, ['copy-images']);
});

gulp.task('prod', ['buildProd', 'copy-fonts', 'copy-images', 'stylesProd']);

gulp.task('watch:prod', function () {
  gulp.watch([src.js, src.index], ['buildProd']);
  gulp.watch(src.styles, ['stylesProd']);
  gulp.watch(src.fonts, ['copy-fonts']);
  gulp.watch(src.images, ['copy-images']);
});

/**
 * COMMON SUB TASKS
 */
// Control every js source file syntaxt
gulp.task('vet', function () {
  return gulp.src(src.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'), {
      verbose: true
    })
    .pipe(plugins.jshint.reporter('fail'));
});

// Extract main html file specific vendors includes
// Write them in specific destination directory
// and replace links in main html with their new paths
gulp.task('subst', function (cb) {
  gulp.src(src.index)
    .pipe(plugins.htmlDependencies({
      dest: dst.path,
      prefix: dst.vendors,
      flat: true
    }))
    .pipe(gulp.dest(dst.path));
  cb();
});

/**
 * DEVELOPMENT : SUB TASKS
 */
// Compile sass files
gulp.task('stylesDev', ['clean-styles'], function () {
  return gulp.src(src.styles)
    .pipe(plugins.sass())
    .pipe(gulp.dest(dst.path + dst.styles));
});

// Browserify, babelify, process ngInject annotations
// Includes view html files into internal js templates
gulp.task('buildDev', ['vet', 'clean-js', 'subst'], function () {
  return browserify({
      entries: [src.entry],
      extensions: ['.js'],
      debug: true
    })
    .external(dependencies)
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .pipe(vinylSource('app.js'))
    .pipe(vinylBuffer())
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.angularEmbedTemplates())
    .pipe(gulp.dest(dst.path + dst.scripts))
    .pipe(plugins.livereload());
});

/**
 * PRODUCTION : SUB TASKS
 */
// Compile and minify sass files
gulp.task('stylesProd', ['clean-styles'], function () {
  return gulp.src(src.styles)
    .pipe(plugins.sass())
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(dst.path + dst.styles));
});

// Browserify, babelify, process ngInject annotations
// Includes view html files into internal js templates
// Finally uglify js file
gulp.task('buildProd', ['vet', 'clean-js', 'subst'], function () {
  return browserify({
      entries: [src.entry],
      extensions: ['.js']
    })
    .external(dependencies)
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .pipe(vinylSource('app.js'))
    .pipe(vinylBuffer())
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.angularEmbedTemplates())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dst.path + dst.scripts))
    .pipe(plugins.livereload());
});

// Copy image files into dist directory
gulp.task('copy-images', ['clean-images'], function () {
  return gulp.src(src.images)
    .pipe(gulp.dest(dst.path + dst.images));
});

// Copy font files into dist directory
// Copy vendors fonts into the right destination
gulp.task('copy-fonts', ['clean-fonts'], function () {
  return gulp.src(src.fonts, {
      base: process.cwd()
    })
    .pipe(plugins.rename(function (path) {
      var parts = path.dirname.split('/');
      if (parts[0] !== "app") {
        path.dirname = dst.vendors + parts.slice(1).join('/');
      }
    }))
    .pipe(gulp.dest(dst.path));
});

/**
 * CLEANING TASKS
 */
gulp.task('clean-all', function () {
  del(dst.path);
});

gulp.task('clean-js', function () {
  del(dst.path + dst.js + '*');
});

gulp.task('clean-styles', function () {
  del(dst.path + dst.css + '*');
});

gulp.task('clean-images', function () {
  del(dst.path + dst.images + '*');
});

gulp.task('clean-fonts', function () {
  del(dst.path + dst.fonts + '*');
});