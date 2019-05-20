const gulp = require('gulp'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  polyfiller = require('gulp-polyfiller'),
  watch = require('gulp-watch'),
  htmlmin = require('gulp-htmlmin'),
  imgmin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  uglifycss = require('gulp-uglifycss'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  jsminify = require('gulp-js-minify'),
  gpminify = require("gulp-babel-minify");
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  runSequence = require('run-sequence'),
  merge = require('merge-stream'),
  sassGlob = require('gulp-sass-glob'),
  spritesmith = require('gulp.spritesmith-multi'),
  del = require('del'),
  concatCss = require('gulp-concat-css'),
  livereload = require('gulp-livereload'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  Cache = require('gulp-file-cache'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  nodemon = require('gulp-nodemon');

let node, cache = new Cache(), restart_called = false;

const obf = require('gulp-obfuscate');
const pkg = require(`./package.json`);
const server = require('gulp-express');
const lr = require('tiny-lr');
const gls = require('gulp-live-server');
const spawn = require('child_process').spawn;



// devDependencies에 있는 모든 플러그인을 $ 변수에 로딩합니다
const $ = require(`gulp-load-plugins`)({
  pattern: [`*`],
  scope: [`devDependencies`]
});

// Path
const PUBLICPATH = {
  SRC: `./public/src`,
  DIST: `./public/dist`
};
const SRC = {
  HTML: `${PUBLICPATH.SRC}/**/*.{html,htm}`,
  SCSS: `${PUBLICPATH.SRC}/assets/scss/**/*.{scss,css}`,
  JS: `${PUBLICPATH.SRC}/**/*.js`,
  IMG: `${PUBLICPATH.SRC}/**/*.{jpg,png,gif,svg}`
};
const DIST = {
  HTML: `${PUBLICPATH.DIST}`,
  CSS: `${PUBLICPATH.DIST}/assets/css`,
  JS: `${PUBLICPATH.DIST}`,
  IMG: `${PUBLICPATH.DIST}`
};

// HTML minify
gulp.task(`htmlmin`, () => {
  return gulp.src(SRC.HTML)
    .pipe(plumber())
    .pipe(cache.filter())
    .pipe(htmlmin().on('error', handleError))
    .pipe(cache.cache())
    .pipe(gulp.dest(DIST.HTML))
});

// Scss File Compile for Css File
const scssOpt = {
  outputStyle: "compressed",
  indentType: "tab",
  indentWidth: 1,
  precision: 3,
  sourceComments: false,
  errLogToConsole: true,
}
gulp.task(`sass`, () => {
  return gulp.src([SRC.SCSS, `!${PUBLICPATH.SRC}/assets/scss/common/**/*.{scss,css}`])
    .pipe(plumber())
    .pipe(cache.filter())
    .pipe(sassGlob())
    .pipe(sass(scssOpt).on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(cleanCSS({
      compatibility: `ie10`
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest(DIST.CSS))
});

// Common Sass Concat Bundle.min.css
gulp.task(`sass-common`, () => {
  return gulp.src(`${PUBLICPATH.SRC}/assets/scss/common**/*.{scss,css}`)
    .pipe(plumber())
    .pipe(cache.filter())
    .pipe(sassGlob())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCSS({
      compatibility: `ie10`
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest(DIST.CSS + `/common`))
});

// Babel
gulp.task(`babel`, () => {
  return gulp.src([SRC.JS, `!${PUBLICPATH.SRC}/assets/js/common/**/*.js`])
    // .pipe(plumber())
    // .pipe(cache.filter())
    // .pipe(sourcemaps.init())
    .pipe(babel().on('error', handleError))
    .pipe(gpminify({
      mangle:{
        keepClassName:true,
        booleans:true,
        deadcode:true,
        simplify:true,
        removeConsole:true,
        numericLiterals:true
      }
    }))
    // .pipe(jsminify())
    // .pipe(uglify())
    // .pipe(obf({replaceMethod:obf.LOOK_OF_DISAPPROVAL}))
    .pipe(sourcemaps.write())
    .pipe(rename({
      extname: '.min.js'
    }))
    // .pipe(cache.cache())
    .pipe(gulp.dest(DIST.JS))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Common Javascript Concat Bundle.min.js
gulp.task(`babel-common`, () => {
  return gulp.src(`${PUBLICPATH.SRC}/assets/js/common/**/*.js`)
    // .pipe(cache.filter())
    .pipe(babel().on('error', handleError))
    .pipe(gpminify({
      mangle:{
        keepClassName:true,
        booleans:true,
        deadcode:true,
        simplify:true,
        removeConsole:true,
        numericLiterals:true
      }
    }))
    // .pipe(jsminify())
    // .pipe(uglify())
    // .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    // .pipe(sourcemaps.write())
    .pipe(rename({
      extname: '.min.js'
    }))
    // .pipe(cache.cache())
    .pipe(gulp.dest(DIST.JS + `/assets/js/common`))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Javascript Pollyfill
gulp.task(`pollyfill`, () => {
  polyfiller
    .bundle(['Promise', 'Fetch', 'Array.from'])
    .pipe(gpminify({
      mangle:{
        keepClassName:true,
        booleans:true,
        deadcode:true,
        simplify:true,
        removeConsole:true,
        numericLiterals:true
      }
    }))
    .pipe(gulp.dest(`${DIST.JS}/assets/js/`));
});

// Image Compress
gulp.task(`imgmin`, () => {
  return gulp.src([SRC.IMG, `!${PUBLICPATH.SRC}/assets/img/img-sprites/**/*.{jpg,png,gif,svg}`])
    .pipe(plumber())
    .pipe(cache.cache())
    .pipe(imgmin())
    .pipe(cache.cache())
    .pipe(gulp.dest(DIST.IMG))
});

// Clean Sprite
gulp.task('clean-sprite-and-image', function () {
  del(`${PUBLICPATH.DIST}/assets/img/sprite`);
  del(`${PUBLICPATH.DIST}/assets/img`);
  return
});

// Auto Sprite
gulp.task('auto-sprite', function () {
  var opts = {
    spritesmith: function (options, sprite, icons) {
      options.imgPath = `../img/sprite/${options.imgName}`;
      options.cssName = `_${sprite}-sprite.scss`;
      options.cssTemplate = null;
      options.cssSpritesheetName = sprite;
      options.padding = 10;
      options.cssVarMap = function (sp) {
        sp.name = `${sprite}-${sp.name}`;
      };
      return options;
    }
  };
  var spriteData = gulp.src(`${PUBLICPATH.SRC}/assets/img/img-sprites/**/*.{jpg,png,gif,svg}`).pipe(spritesmith(opts)).on('error', function (err) {
    console.log(err)
  });
  var imgStream = spriteData.img.pipe(gulp.dest(`${PUBLICPATH.DIST}/assets/img/sprite`));
  var cssStream = spriteData.css.pipe(gulp.dest(`${PUBLICPATH.SRC}/assets/scss/vendors`));

  return merge(imgStream, cssStream);
});

// Sprite and SASS
gulp.task('sprite-and-sass', function () {
  runSequence('clean-sprite-and-image', 'auto-sprite', 'sass');
});


// // Clean Babel
// gulp.task('clean-babel', function () {
//   del(`${PUBLICPATH.DIST}/assets/js`);
//   return 
// });

// // Babel and Babel-common
// gulp.task('babel-and-babel-common', function () {
//   runSequence('clean-babel','babel','babel-common');
// });

// Watch
gulp.task(`watch`, () => {
  gulp.watch(SRC.JS, [`babel`]);
  gulp.watch(`${PUBLICPATH.SRC}/assets/js/common/**/*.js`, [`babel-common`]);

  gulp.watch(SRC.SCSS, [`sass`]);
  gulp.watch(`${PUBLICPATH.SRC}/assets/scss/common/**/*.{scss,css}`, [`sass-common`]);

  gulp.watch(SRC.IMG, [`imgmin`]);
  gulp.watch(`${PUBLICPATH.SRC}/assets/img-sprites/**/*`, [`sprite-and-sass`]);
  
  gulp.watch([
    `views/**/*.{ejs,pug,html}`,
    `routes/**/*.js`,
  ], reload);
  // gulp.watch(`${PUBLICPATH.SRC}/assets/js/**/*.js`, [`babel-and-babel-common`]);
});

// Server Browser Sync
gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:8000",
    files: ["public/**/*.*"],
    // browser: "google chrome",
    port: 8080,
    tify: true,
  });
});

// Nodemon
gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'bin/www',
    ignore: [
      // 'gulpfile.js',
      'node_modules/'
    ]
  })
  // .on('exit', function () {
  //   if (!restart_called) {
  //     console.log("KILLING NODEMON PROCESS ID:" + process.pid);
  //     process.kill(process.pid);
  //   }
  //   restart_called = false;
  // })
  .on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  })
  
  .on('crash', function() {
    console.error('Application has crashed!\n')
     stream.emit('restart', 5)  // restart the server in 10 seconds
  })
});

// Default process
gulp.task(
  `default`, [
    `htmlmin`,
    `sprite-and-sass`,
    // `babel-and-babel-common`,
    `pollyfill`,
    `babel`,
    `babel-common`,
    `sass`,
    `sass-common`,
    `imgmin`,
    `watch`,
    `browser-sync`
  ], () => {
    console.log('Gulp is running!')
  })

// Error Handler
function handleError(err) {
  console.log(err);
  this.emit('end');
}