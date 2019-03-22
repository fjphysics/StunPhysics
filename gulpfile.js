var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var watchify = require("watchify");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');   //js压缩
//var rename = require('gulp-rename');   //文件重命名
var buffer = require('vinyl-buffer')
/*var paths = {
    pages: ['src/*.html']
};*/

/*gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("temp"));
});*/
gulp.task("stun", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/StunPhysics.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('StunPhysics.js'))
    .pipe(gulp.dest("build"));
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['test/app.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('app.js'))        
        .pipe(buffer())
        .pipe(uglify())                    //压缩
        //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(gulp.dest("build"))
        //.pipe(rename({suffix:'.min'}))     //重命名        
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('test'))            //输出 ;

}

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

gulp.task("watch", bundle);

gulp.task("default" ,function () {
  return browserify({
        basedir: '.',
        debug: true,
        entries: ['test/app.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest("test"));
});



