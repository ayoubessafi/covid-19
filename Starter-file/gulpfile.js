const gulp = require ('gulp');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
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


gulp.task('build', gulp.series('sass', 'style','coppyHtml'));


