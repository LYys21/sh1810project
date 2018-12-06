
let gulp = require("gulp");
let uglify = require("gulp-uglify"); //压缩模块
let babel = require("gulp-babel"); //ES6的编译模块
let cleancss = require("gulp-clean-css");
let webserver = require("gulp-webserver");

gulp.task("copy", ()=>{
	//读取所有文件 ,//写入到dist目录
	gulp.src("./src/**/*.*").pipe( gulp.dest("./dist") )
	
})


gulp.task("buildJS", ()=>{
	//只复制
	gulp.src("./src/scripts/libs/*.js")
		.pipe( gulp.dest("./dist/scripts/libs") )
	
	//编译压缩复制
	gulp.src("./src/scripts/*.js")
		.pipe(babel({
            presets: ['env']
        }))
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/scripts") );
})

gulp.task("buildCSS", ()=>{
	
	gulp.src("./src/**/*.css")
		.pipe(cleancss())
		.pipe( gulp.dest("./dist") )
	
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/**/*.html").pipe( gulp.dest("./dist") );
})


gulp.task('webserver', function() {
	gulp.src('src')
		.pipe(webserver({
			livereload: true, //是否支持热部署
			https: true,      //
			proxies : [
				{	
					source: '/listmore', 
					target: 'https://m.lagou.com/listmore.json',
				}
			]
		}));
});

gulp.task("build", ["buildJS","buildHTML", "buildCSS"])