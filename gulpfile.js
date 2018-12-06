
let gulp = require("gulp");
let uglify = require("gulp-uglify"); //压缩模块
let babel = require("gulp-babel"); //ES6的编译模块
let cleancss = require("gulp-clean-css");
let webserver = require("gulp-webserver");
let sass = require("gulp-sass"); //编译SCSS到CSS


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
	
	gulp.src("./src/**/*.scss")
		// .pipe(cleancss())
		.pipe(sass())
		.pipe( gulp.dest("./dist") )
	
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/**/*.html").pipe( gulp.dest("./dist") );
})

gulp.task("buildStaticResource", ()=>{
	gulp.src("./src/static/**/*.*").pipe( gulp.dest("./dist") );
})

gulp.task("watching", ()=>{
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.html", ["buildHTML"]);
});



//yintao01分支下的修改
gulp.task('webserver', ["watching"], function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true, //是否支持热部署
			https: true,      //
			proxies : [
				{	
					source: '/abcdefg', 
					target: 'https://m.lagou.com/listmore.json?pageNo=2&pageSize=15',
				},
				{
					source: '/userinfo',
					target: 'https://nbrecsys.4paradigm.com/api/v0/recom/recall?requestID=pmKC7kYD&userID=u3FFkObPEe&sceneID=34'
					
				}
			]
		}));
});

gulp.task("build", ["buildJS","buildHTML", "buildCSS", "buildStaticResource"])