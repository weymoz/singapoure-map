const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require("gulp-sass");
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
sass.compiler = require("node-sass");


function js() {
  return src('./src/js/*.js', {base: "src/js"})
    .pipe(babel())
  //.pipe(uglify())
  // .pipe(rename({extname: ".min.js"}))
  // .pipe(dest('./peopletalk'))
  // .pipe(dest("dist"))
    .pipe(dest('./docs'));
}

function watchJs(cb) {
  watch("./src/js/*.js", js);
  cb();
}


function serve() {
  browserSync.init({
    server: {
      baseDir: "docs"
    },
    browser: "/usr/bin/google-chrome-stable"
  });

  browserSync.watch("docs/**/*.*").on("change", browserSync.reload);
}

function html() {
  return src([
        './src/page/top.html', 
    //'./src/page/index.html', 
    './src/map.html', 
    //'./src/index.html', 
     './src/page/bottom.html'
  ])
    .pipe(concat('index.html'))
    .pipe(dest('docs'))
}

function copyPageFiles() {
  return src(['./src/page/index_files/**/*'], {base: 'src/page'})
    .pipe(dest('docs'));
}

function watchHtml(cb) {
  watch('src/**/*.html', html);
  cb();
}


function styles() {
  return src("src/scss/**/*.*")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
    ]))
  //    .pipe(dest('dist'))
  //  .pipe(postcss([
  //    cssnano()
  //  ]))
    .pipe(sourcemaps.write())
  //  .pipe(rename({extname: ".min.css"}))
    .pipe(dest("docs"))
    .pipe(browserSync.stream());
}

function watchStyles(cb) {
  watch("src/scss/**/*.*", styles);
  cb();
}

function optimizeImages() {
  return src("src/img/**/*.*", {base: "src"})
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      }),
    ], {verbose: true}))
    .pipe(imagemin(imageminMozjpeg({quality: 50})))
    .pipe(dest("docs"))
    .pipe(dest("dist"))
    .pipe(dest("peopletalk"));
}



function images() {
  return src("src/img/*.*", {base: "src"})
    .pipe(dest("docs"));
}


function watchImages(cb) {
  watch("src/img", images);
  cb();
}


function clean(cb) {
  del(['docs']);
  return cb();
}


exports.dev = 
  series(clean, styles, js, copyPageFiles, images, html,   
    parallel(watchStyles, watchHtml, watchJs, watchImages, serve)
  );

