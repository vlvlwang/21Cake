require(["config"], () => {
    require(["template","header","footer"], (template) =>{
        // console.log(header);
        // console.log(footer);
        class Cart{
            constructor(){
                this.init();
            }
            init(){
                let cart = localStorage.getItem("cart");
                if(cart){
                    //有cart，就渲染商品列表
                    //接收cart的json格式，进行数据渲染
                    cart = JSON.parse(cart);
                    this.render(cart);
                }else{
                    //没有cart，就显示空页面
                    this.empty.show();
                }

            }
            //渲染数据方法
            render(cart){
                $("#list-container").html(template("cart-template",{cart}));
            }
        }
        new Cart();
    })

})