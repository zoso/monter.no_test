'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var browserSync = require('browser-sync');

var CONFIG = {
	"paths": {
		"base": "./Styles/global/scaffold.scss"
	},
	"watchers": {
		"global": "./Styles/global/**/**/*.scss"
	},
	"build": {
		"dev": "./Styles/dist/base.css",
		"prod": ""  
	}
}

gulp.task('start', ['watch:scss'], function() {
	gutil.log(gutil.colors.yellow("== Gulp is running =="));
	browserSync({
		/*proxy: 'https://localhost:44301/',
		port: 44301,*/
		server: {
			baseDir: './'
		},
        logPrefix: "optimera"
	});
});

gulp.task('start-simple', ['watch:scss'], function() {
    gutil.log(gutil.colors.blue(" --- Gulp running without browser sync ---"));
});

gulp.task('watch:scss', function() {
	gutil.log(gutil.colors.yellow("Watchers running"));
	gulp.watch(CONFIG.watchers.global, ['Style:sass>css']);
	gulp.watch(CONFIG.paths.base, ['Style:sass>css']);
});

gulp.task('Style:sass>css', ['browser.reload'], function() {
	return gulp.src(CONFIG.paths.base)
        .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browser: ['last 2 versions'],
            cascade: false
        }))
        /*.pipe(stripCssComments())
        .pipe(base64({
        	extensions: ['png', /\.jpg#datauri$/i]
        }))*/
        .pipe(sourcemaps.write())
        .pipe(rename(CONFIG.build.dev))
		.pipe(gulp.dest('./'));
});

gulp.task('browser.reload', function() {
   browserSync.reload(); 
});