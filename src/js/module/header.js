// 定义一个模块的时候，需要其他模块，可以直接传进来
// define([], function(require, factory) {
//     'use strict';
// });

// 定义header模块的时候 要依赖tools模块，可以直接传进来 []时传进来，()是接收
// 1. 加载html,把header加载到index.html中
define(["jquery"], $ => {
   function Header (){
        //规定，头部容器都是<header></header>标签
        this.container = $("#header");
        this.load();
    }
    //对象合并
    $.extend(Header.prototype, {
        load () {
          // 加载 header.html到页面中
          // 把header.html 加载到 container里
          this.container.load("/html/module/header.html");
              //在这里调用。header 加载结束以后才能运行交互
          }
      })
        // 头部的js交互在这里书写
        return new Header();
});
      
  
    
