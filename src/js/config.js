require.config({
    baseUrl : "/",
    paths : {
        "jquery" : "libs/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "template" : "libs/art-template/template-web",
        "url" : "js/module/url",
        "cookie" : "libs/jquery-plugins/jquery.cookie",
        "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "fly" : "libs/jquery-plugins/jquery.fly.min"
    },
    //垫片，给不满足AMD规范的插件，又要依赖于别的模块 
    shim:{
        "cookie" : {
            deps:["jquery"]
        },
        "zoom" : {
            deps:["jquery"]
        },
        "fly" : {
            deps:["jquery"]
        }
    }

})