// 定义一个模块的时候，需要其他模块，可以直接传进来
// define([], function(require, factory) {
//     'use strict';
// });

// 定义header模块的时候 要依赖tools模块，可以直接传进来 []时传进来，()是接收
// 1. 加载html,把header加载到index.html中
define(["jquery"], $ => {
   class Header{
      constructor(){
        //规定，头部容器都是<header></header>标签
        this.container = document.querySelector("#header");
        this.load();
      } 
      load (){
        // 加载 header.html
        // 传输路径，写绝对路径
        tools.ajaxGetPromise("html/module/header.html",null,false).then(html => {
            this.container.innerHTML = html;
            //在这里调用。header 加载结束以后才能运行交互
        })
      }
      // 头部的js交互在这里书写
   }
    return new Header();
});