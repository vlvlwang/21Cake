require.config({
    baseUrl : "/",
    paths : {
        "jquery" : "libs/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "url" : "js/module/url",
        "cookie" : "libs/jquery-plugins/jquery.cookie"
    },
    //垫片，给不满足AMD规范的插件，又要依赖于别的模块 
    shim:{
        "cookie" : {
            deps:["jquery"]
        }
    }

})