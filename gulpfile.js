var gulp = require('gulp');
gulp.task('default', function(){
    console.log('테스트지롱');
});
var sass = require('gulp-sass');

// var browserSync = require('browser-sync').create();
// const vfb = require('vinyl-ftp-branch');
// const ftp = require('vinyl-ftp');
// const plumber = require('gulp-plumber');
// const notify = require("gulp-notify");
//
// var fs = require('fs');
// var path = require('path');
// var del = require('del');
// var spritesmith = require('gulp.spritesmith');
// var md5 = require('gulp-md5-plus');
// var csssort = require('gulp-nts-css-formatter');
var postcss = require('gulp-postcss');
var sourcemap = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
// var replace = require('gulp-replace');
// var buffer = require('vinyl-buffer');
// var localImgPath = '../im/';
// var staticImgPath = 'https://ssl.pstatic.net/static/weather/m/';
// var staticImgPath_icon= 'https://ssl.pstatic.net/static/weather/m/icon/';
// var staticImgPath_animation = 'https://ssl.pstatic.net/static/weather/m/animation/';
//
// var getFolders = function(dir){
// 	return fs.readdirSync(dir).filter(function(file){
// 		return fs.statSync(path.join(dir, file)).isDirectory();
// 	});
// };
//
// var config = {
// 	notify: true
// }
//
var paths = {
	html_path: 'src/**/',
	sprite_src: 'src/im/sprite/',
	sprite_dest: 'src/im/',
	css_src: 'src/scss/',
	css_dest: 'src/css/',
	img_dest: 'src/im/',
};
//
// var globalOptions = {
// 	notify: !config.notify ? {} : {
// 		errorHandler: notify.onError({
// 			title: '<%= error.relativePath %>',
// 			message: '<%= error.line %> line - <%= error.messageOriginal %>',
// 			sound: "Pop",
// 		})
// 	}
// }
//
//
// gulp.task('ftp', function() {
// 	var options = {
// 		ftp: {
// 			host: 'view.ui.naver.com',
// 			port: '2001',
// 			userKeyFile: '.ftppass', //[TODO].ftppass 처리 방법
// 			userKey: 'key1',
// 			parallel: 10, //병렬 전송 갯수 (기본값 3, 10이상 효과 미비)
// 			remotePath: '/weather/mobile', //[TODO]각 서비스 업로드 경로 설정 필요
// 			log: true,
// 		},
// 		targetGlob: [path.join(paths.html_path,'**/*'), '!'+paths.sprite_src, '!'+path.join(paths.sprite_src, '**/*'), '!'+paths.css_src, '!'+path.join(paths.css_src, '**/*'), '!node_modules/'], // glob 문법으로 대상 지정
// 	};
//
// 	try {
// 		var chkFtppass = fs.accessSync('.ftppass', 'r'); // .ftppass 파일 존재 여부 확인
// 	} catch(e) {
// 		console.log('Not Exist .ftppass file. Please make .ftppass'); // .ftppass 파일이 없을 경우 에러
// 		return;
// 	}
// 	if(!options.ftp.remotePath || options.ftp.remotePath === '/') {  // remotePath 설정이 비어 있거나 '/'인지 확인.
// 		console.log('remotePath not set or set root');
// 		return;
// 	}
//
// 	var conn = ftp.create(vfb(options.ftp));
//
// 	return gulp.src(options.targetGlob, {buffer: false})
// 		.pipe(plumber(globalOptions.notify))
// 		.pipe(conn.newer(conn.config.finalRemotePath))
// 		.pipe(conn.dest(conn.config.finalRemotePath));
// });
//
// gulp.task('sprite', function(){
// 	var spriteDir= 'src/im/sprites/';
// 	var folders = getFolders(spriteDir);
//
// 	folders.map(function(folder){
// 		// 이미지 스프라이트
// 		var spriteData = gulp.src(spriteDir+ folder + '/*.png').pipe(spritesmith({
// 			imgPath: localImgPath + 'sp_' + folder + '.png', //로컬
// 			imgName: 'sp_' + folder + '.png',
// 			cssName:   '_sp_' + folder + '.scss',
// 			cssFormat: 'scss',
// 			cssTemplate: 'src/scss/lib/spritesmith/sprite.mustache',
// 			cssSpritesheetName: 'sp_' + folder,
// 			padding: 10,
// 			cssVarMap: function(sprite) {
// 				sprite.name = sprite.name;
// 			}
// 		}));
// 		spriteData.img.pipe(gulp.dest('src/im/'));
// 		spriteData.css.pipe(gulp.dest('src/scss/import/sprite/'));
// 	});
// });
//
// gulp.task('sprite-build', function(){
// 	var spriteDir = 'src/im/sprites/';
// 	var folders = getFolders(spriteDir);
//
// 	var streamArr = [];
// 	folders.map(function(folder){
// 		// 이미지 스프라이트
// 		var spriteData = gulp.src(spriteDir+ folder + '/*.png')
// 			.pipe(spritesmith({
// 				imgPath: localImgPath + 'sp_' + folder + '.png', //로컬
// 				imgName: 'sp_' + folder + '.png',
// 				// imgPath: localImgPath + 'sp_' + folder + '_' + datetime + '.png', //로컬
// 				// imgName: 'sp_' + folder + '_' + datetime + '.png',
// 				cssName:   '_sp_' + folder + '.scss',
// 				cssFormat: 'scss',
// 				cssTemplate: 'src/scss/lib/spritesmith/sprite.mustache',
// 				cssSpritesheetName: 'sp_' + folder,
// 				padding: 10,
// 				cssVarMap: function(sprite) {
// 					sprite.name = sprite.name;
// 				}
// 			}));
//
// 		streamArr.push(new Promise(function(resolve){
// 			spriteData.img
// 				.pipe(gulp.dest('src/im/'))
// 				.on('end', resolve);
// 		}));
// 		streamArr.push(new Promise(function(resolve){
// 			spriteData.css
// 				.pipe(gulp.dest('src/scss/import/sprite/'))
// 				.on('end', resolve);
// 		}));
// 	});
// 	return Promise.all(streamArr);
// });
//
// gulp.task('md5-sprite', ['sprite-build'], function() {
// 	var options = {
// 		md5: {
// 			cssSrc: './src/scss/import/sprite/*.scss', //이름 변경 대상 css(scss) 파일
// 			srcDel: false // sprite 이름 변경전 파일 삭제 여부
// 		}
// 	};
// 	var spriteDir = 'src/im/sprites/';
// 	var del_sprite = [];
// 	var sprite_list = getFolders(spriteDir);
//
// 	for(var i=0,imax=sprite_list.length;i<imax;i++) {
// 		del_sprite.push(path.join('src/im/', 'sp_' + sprite_list[i] + '_????????.png'));
// 		sprite_list[i] = path.join('src/im/', 'sp_' + sprite_list[i] + '.png');
// 	}
//
// 	return del(del_sprite)
// 	  .then(function(){
// 		  return new Promise(function(resolve) {
// 			  gulp.src(sprite_list)
// 				.pipe(md5(8,options.md5.cssSrc))
// 				.pipe(gulp.dest('src/im/'))
// 				.on('end',resolve);
// 		  });
// 	  }).then(function() {
// 		  //console.log(fs.readFileSync('./src/scss/import/sprite/_sp_animation_wt1.scss', 'utf8'));
// 		  if(options.md5.srcDel) {
// 			  return del(sprite_list);
// 		  }
// 	  });
// });
//
//

// task.sass
gulp.task('sass', function() {
	return gulp.src("./src/scss/**/*.scss")
		.pipe(sourcemap.init())
		.pipe(sass.sync({outputStyle: 'compact'}).on('error', sass.logError))
		// .pipe(csssort())
		.pipe(postcss([autoprefixer({ browsers: ['iOS >= 6', 'Android >= 4'] })]))
		.pipe(sourcemap.write('./'))
		.pipe(gulp.dest('./src/css/'))
		// .pipe(browserSync.stream());
});

// task.sass
// gulp.task('sass-build', ['sprite-build', 'md5-sprite'], function() {
// 	return Promise.all([
// 		del(path.join('**/*.css.map')),
// 		new Promise(function(resolve) {
// 			gulp.src("src/scss/**/*.scss")
// 			  .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
// 			  // .pipe(csssort())
// 			  .pipe(postcss([autoprefixer({ browsers: ['iOS >= 6', 'Android >= 4'] })]))
// 			  .pipe(gulp.dest('src/css/'))
// 			  .on('end',resolve);
// 		})
// 	]);
// });
//
// gulp.task('replace-build', ['sass-build'], function() {
// 	gulp.src('./src/css/w.css')
// 		.pipe(replace( /(?:\.\.\/im\/)(.*?)(?:\.)/gm, function(str){
// 			if(str.includes('sp_animation')) {
// 				// 애니메이션 폴더
// 				str = str.replace(localImgPath, staticImgPath_animation);
// 				return str;
// 			} else if(str.includes('sp_icon')) {
// 				// 아이콘 폴더
// 				str = str.replace(localImgPath, staticImgPath_icon);
// 				return str;
// 			} else {
// 				// 기본 폴더
// 				str =  str.replace(localImgPath, staticImgPath);
// 				return str;
// 			}
// 		}))
// 		.pipe(gulp.dest('./src/css/', {overwrite:true}));
// });
//
// 로컬 확인용
gulp.task('serve', [/*'sprite',*/ 'sass'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	// gulp.watch('src/im/sprites/**/*', ['sprite']);
});
//
// // 배포용
// gulp.task('serve-build', ['sass-build', 'sprite-build', 'md5-sprite', 'replace-build']);
//
gulp.task('default', ['serve']); // 로컬확인용
// gulp.task('build', ['serve-build']); // 베포용, 사스 변경 + 이미지 버전관리
