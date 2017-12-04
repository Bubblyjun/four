var obj=[
    {
        "img":"img/1.png",
        "name":"百度",
        "place":"北京市海淀区西北旺",
        "con":"互联网|以上市|100000人以上",
        "cons":"前端工程师",
        "num":"2382"
    },
    {
        "img":"img/2.png",
        "name":"北京来威科技",
        "place":"北京市昌平区沙河",
        "con":"IT软件|微融资|100-499人",
        "cons":"前端开发工程师",
        "num":"164"
    },
    {
        "img":"img/3.png",
        "name":"最苦教育",
        "place":"北京市海淀区五棵松",
        "con":"互联网|A轮|20-99人",
        "cons":"web前端开发工程师",
        "num":"12"
    },
    {
        "img":"img/4.png",
        "name":"京东科技",
        "place":"北京市大兴区",
        "con":"移动互联网|以上市|100000人以上",
        "cons":"webGL",
        "num":"55"
    }
]
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),//启动后端服务器
    connect = require('gulp-connect'), //启动前端服务器
    urlTool = require('url'),
    qs = require('qs'),
    htmlmin = require('gulp-htmlmin'),//压缩html
	uglify = require('gulp-uglify'),//压缩js
	yscss = require('gulp-minify-css');//压缩css
gulp.task('mockServer',function(){
    gulp.src('.')
        .pipe(webserver({
            port:3000,
            middleware:function(req,res,next){
                var method = req.method;
                var urlObj = urlTool.parse(req.url)
                var pathname = urlObj.pathname;
                res.setHeader('Access-Control-Allow-Origin','*')
                if(method == 'GET'){
                    switch (pathname) {
                        case '/goodslist':
                            res.setHeader('content-type','application/json;charset=utf-8')
                            res.write(JSON.stringify(obj));
                            res.end();
                            break;
                        default:
                            break;
                    }
                }else if(method == 'POST'){
                var postParamsStr = '';        
                req.on('data',function(chunk){
                    postParamsStr +=chunk;
                })
                req.on('end',function(){
                    var postParamsJson =                 
                    postParamsStr.indexOf('{')!=-1&&postParamsStr.indexOf('}')!=-1
                    ?
                    JSON.parse(postParamsStr) 
                    :
                    qs.parse(postParamsStr)
                    switch (pathname) {
                        case '/login':
                           if(postParamsJson.userName == '张三' && postParamsJson.password==123456) {

                           }
                            break;
                        case '/register':
                            
                            break;
                        default:
                            break;
                    }
                })
                }
            }
        }))
})
gulp.task('httpServer',function(){
    connect.server({
        port:8080,
        livereload:true
    })
})
gulp.task('default',['mockServer','httpServer'])

//压缩html
gulp.task('yshtml',function(){
	console.log(111)
	 gulp.src('./index.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace:true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes:true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('./html'))
});
//压缩js
gulp.task('ysjs',function(){
	console.log(222)
	gulp.src('./*.js').pipe(uglify()).pipe(gulp.dest('js'))
});
//压缩css
gulp.task('yscss',function(){
		console.log(333)
	gulp.src(['./*/*.css','./*.css']).pipe(yscss()).pipe(gulp.dest('css'))
})
gulp.task('total',['yshtml','ysjs','yscss']);