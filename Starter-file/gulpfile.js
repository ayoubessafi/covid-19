const gulp = require ('gulp');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

gulp.task("sass", function(){
   return gulp.src ("sass/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('style', function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/style/'))
});

gulp.task('watch', function(){
    gulp.watch('sass/**/*scss',gulp.series(['sass','style']))
    

});

gulp.task('coppyHtml',async function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
    return gulp.src('src/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

//script paths

var jsFiles = 'src/scripts/*.js',
jsDest = 'dist/scripts';
  
gulp.task('scripts', function() {
  return gulp.src(jsFiles)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(jsDest))
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
});

  


gulp.task('build', gulp.series('sass', 'style','coppyHtml', 'images', 'scripts'));


