// 定义一个模块的时候，需要其他模块，可以直接传进来
// define([], function(require, factory) {
//     'use strict';
// });

// 定义header模块的时候 要依赖tools模块，可以直接传进来 []时传进来，()是接收
// 1. 加载html,把header加载到index.html中
define(["jquery", "cookie"], $ => {
   function Header (){
        //规定，头部容器都是<header></header>标签
        this.container = $("#header");
        this.load().then(() =>{
            this.isLogin();
            this.calcCartNum();
        });
    }
    //对象合并
    $.extend(Header.prototype, {
        load () {
          // 加载 header.html到页面中
          // 把header.html 加载到 container里
        return new Promise(resolve => {
            this.container.load("/html/module/header.html", () => {
                //header 加载结束以后才能运行交互
                //load异步执行结束
                resolve();
            });
          })
        },
        //搜索

        // 登录成功后，页面欢迎 换 登录注册 
        isLogin () {
            //取cookie
            this.loginBtn = $("#login-btn");
            this.afterLogin = $("#after-login");
            this.name = $("#name");
            this.logout = $("#next");
            let username = $.cookie("username");
            //判断是否取到登录名
            if(username) {
                //取到登录名，表示已登录，隐藏登录注册，显示欢迎
                this.loginBtn.hide(); 
                this.afterLogin.show();
                this.name.html(username);
            }
            this.logout.on("click", () =>{
                //退出登录
                if(confirm("确定退出吗？")){
                    $.removeCookie("username", {path : "/"});
                    this.loginBtn.show(); 
                    this.afterLogin.hide();
                    
                }
            })

        },

        calcCartNum(){
            let cart = localStorage.getItem("cart");
            // console.log(cart);
            let num = 0;
            //判断是否存在加购商品数量
            if(cart){
                //存在，就计算总数
                // $("#cart-num").show();
                cart = JSON.parse(cart);
                //计算总数量
                num = cart.reduce((n,shop) =>{
                    n += shop.num;
                    return n;
                }, 0);

            }
            //不存在就隐藏
            $("#cart-num").html(num);
            // if(num === 0){
            //     $("#cart-num").hide();
            // }
        }
    })
        // 头部的js交互在这里书写
        return new Header();
});
      
  
    
