const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style(){
    return gulp.src('./src/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest('./src/css'))
            .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    })
    gulp.watch('./src/scss/**/*.scss', style);
}

exports.style = style;
exports.watch = watch;
