const gulp = require("gulp"),
      uglify = require("gulp-uglify"),
      sass = require("gulp-sass"),
      htmlmin = require("gulp-htmlmin"),
      minifyCss = require("gulp-minify-css"),
      babel = require("gulp-babel"),
      connect = require("gulp-connect");

//制定一个HTML 任务
gulp.task("html", () =>{
    //压缩HTML ， 压缩 、 存放到上线文件夹 、 自动刷新
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS 
        }))
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
})

    //制定 css 任务
    gulp.task("css", () =>{
        //编译scss
        //压缩css 
        //可以以数组形式传输，！表示 除了module里面的scss都要编译                 
        gulp.src("src/css/**/*.scss")
            .pipe(sass())
            .pipe(minifyCss())
            .pipe(gulp.dest("dist/css"))
            .pipe(connect.reload());
    })

    //制定js任务
    gulp.task("js", () =>{
        //ES6 转 ES5
        //压缩js
        gulp.src("src/js/**/*.js")
            .pipe(babel({
                presets:['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest("dist/js"))
            .pipe(connect.reload());
    })

    // 制定libs任务 (只需简单移动)
    gulp.task("libs", () =>{
        gulp.src("src/libs/**/*")
            .pipe(gulp.dest("dist/libs"))
            .pipe(connect.reload());
    })

    // 制定images任务
    gulp.task("img", () =>{
        gulp.src("src/img/**/*")
            .pipe(gulp.dest("dist/img"))
            .pipe(connect.reload());
    })

    //监听
    gulp.task("watch", () =>{
        gulp.watch("src/**/*.html",["html"]);
        gulp.watch("src/css/**/*.scss", ["css"]);
        gulp.watch("src/js/**/*.js", ["js"]);
    })

    //开服务器 ,配置服务器
    gulp.task("server", () =>{
        connect.server({
            root: "dist",
            port: 1021,
            livereload:true 
        });
    })

    //让任务先执行一次
    gulp.task("default", ["html", "css", "js", "libs", "img", "server", "watch"]);
