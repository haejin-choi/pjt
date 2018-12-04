'use strict';

// node modules
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const lazypipe = require('lazypipe');
const runSequence = require('run-sequence');

// gulp modules
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const spritesmith = require('gulp.spritesmith');
const plumber = require('gulp-plumber');
const gulpSort = require('gulp-sort');

// notification
const notify = require("gulp-notify");

var paths = {
	root: './',
	html_src: 'src/',
	sprite_src: 'src/sprite/',
	sprite_dest: 'src/img/sprite/',
	css_src: 'src/scss/',
	css_dest: 'src/css/',
	img_dest: 'src/img/',
	build_img: 'dest/img/',
	build_css: 'dest/css/'
};
var config = {
	notify: true,
    sprite_ratio: {
		png: 2,
		svg: 2,
	},
}

function getFolders(dir) {
	return fs.readdirSync(dir)
		.filter(function (file) {
			if(file === 'scss'){
				return;
			}
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
};
var globalOptions = {
	notify: !config.notify ? {} : {
		errorHandler: notify.onError({
			title: '<%= error.relativePath %>',
			message: '<%= error.line %> line - <%= error.messageOriginal %>',
			sound: "Pop",
		})
	}
};

// task.sass
gulp.task('default', ['watch']);
gulp.task('sass', function() {
	return gulp.src(path.posix.join(paths.css_src, '**/*.scss'))
		.pipe(plumber(globalOptions.notify))
		.pipe(sourcemaps.init())
		.pipe(sassPipe())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.css_dest))
});
gulp.task('dev', function(cb) {
	runSequence('sprite', 'sass', cb);
});
gulp.task('watch', ['dev'], function () {
	var options = {};
	gulp.watch([path.posix.join(paths.css_src, '/**/*')], ['sass']);
	gulp.watch([path.posix.join(paths.sprite_src, '/**/*')], ['sprite']);
});

gulp.task('sprite',['makeSpriteMap']);
gulp.task('makeSprite', function () {
	var stream_arr = [];
	var folders = getFolders(paths.sprite_src);
	var options = {
		spritesmith: function(folder) {
			return {
				imgPath: path.posix.relative(paths.css_dest, path.posix.join(paths.sprite_dest, 'sp_' + folder + '.png')),
				imgName: 'sp_' + folder + '.png',
				cssName: '_sp_' + folder + '.scss',
				cssFormat: 'scss',
				padding: 4,
				cssTemplate: './gulpconf/sprite_template.hbs',
				cssSpritesheetName: 'sp_' + folder,
				cssHandlebarsHelpers: {
					sprite_ratio: config.sprite_ratio.png
				}
			}
		},
	};



	if (folders) {
		folders.map(function(folder) {
			var spriteData = gulp.src(path.join(paths.sprite_src, folder, '*.png'))
				.pipe(plumber(globalOptions.notify))
				.pipe(gulpSort())
				.pipe(spritesmith(options.spritesmith(folder)));
			stream_arr.push(new Promise(function(resolve) {
				spriteData.img
					.pipe(gulp.dest(paths.sprite_dest))
					.on('end',resolve);
			}));
			stream_arr.push(new Promise(function(resolve) {
				spriteData.css
					.pipe(gulp.dest(path.join(paths.css_src, 'sprite')))
					.on('end', resolve);
			}));
		});
	}
	return Promise.all(stream_arr);
});

gulp.task('makeSpriteMap', ['makeSprite'], function() {
	var folders = getFolders(paths.sprite_src);
	if (!folders) return;

	var options = {
		maps: {
			handlebars: {
				prefix: 'sp_',
				exe: 'scss',
				path: path.posix.join(paths.css_src, 'sprite'),
				import: folders,
			}
		},
	};

	return gulp.src('gulpconf/sprite_maps_template.hbs')
		.pipe(plumber(globalOptions.notify))
		.pipe(handlebars(options.maps.handlebars))
		.pipe(rename('_sprite_maps.scss'))
		.pipe(gulp.dest(path.posix.join(paths.css_src, 'common')));
});

function sassPipe(build) {
	var options = {
		postcss: [
			autoprefixer({
				browsers: config.pc ?
    				['last 2 versions', "Edge > 0", "ie >= 8"] : //PC옵션
    				["Android > 0","iOS > 0","FirefoxAndroid > 0"] //모바일옵션
			}),
		]
	};

	return lazypipe()
		.pipe(sass, {
				outputStyle: 'expanded',
				indentType: 'tab',
				indentWidth: 1
			})
		.pipe(postcss,options.postcss)();
}
