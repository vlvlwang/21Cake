require(["config"], () => {
    require(["template","header","footer"], (template) =>{
        // console.log(header);
        // console.log(footer);
        class Cart{
            constructor(){
                this.init();
                this.Card();
                // this.removeTr();
                // this.allDel();
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
                    $("#list-empty").show();
                    $("#pro-cart-head").hide()
                }

            }
            //渲染数据方法
            render(cart){
                $("#list-container").html(template("cart-template",{cart}));
            }

            //生日牌事件
            Card(){
                $("#tbody").on("click","#select-card", (e)=>{
                    let target = e.target;
                    $(target).next().show();
                    // 当前事件源为 input
                    // $(target).next() 表示 "#option"
                    $(target).next().on("click","li", e =>{
                        let target = e.target || e.srcElement;
                    // 当前事件源为 li
                        // $(target).parent().prev() 表示 "#select-card"
                        $(target).parent().prev().val($(target).html());
                        if( $(target).parent().prev().val($(target).html())){
                            // $(target).parent() 表示 "#option"
                            $(target).parent().hide();
                        }
                    })
                });
            }

            //删除单条
            // removeTr(){
            //     let cart = localStorage.getItem("cart");
            //     cart = JSON.parse(cart);
            //     console.log(cart);
            //     $("#tbody").on("click","#remove", e =>{
            //         e = e || event;
            //         let target = e.target || e.srcElement;
            //         let tr = $(target).parent().parent().parent();
            //         let id = Number($(tr).attr("data-id"));
            //         // console.log(id);
            //         let removeIndex = -1;
            //         if(confirm("确定删除吗？")){
            //             if(cart.some( (shop,i) =>{
            //                 removeIndex = i;
            //                 return shop.id = id;
            //             })){
            //             //id相等，就删除该条tr
            //             tr.remove();
            //                 // cart.filter(function(index){
            //                 //     return !index ;
            //                 // });
                        
            //             const newCart = [];
            //              cart.map((item,index) =>{
            //                 if(removeIndex === index){
            //                     //当前相等，当前该条cart则为空
            //                     console.log('删除的是',item)
            //                 }else{
            //                     newCart.push(item);
            //                 }
            //             })
            //             console.log(newCart)// 存进localStorage
            //             localStorage.setItem("cart", JSON.stringify(newCart));

            //             // localStorage.clear();

            //             }
            //         }
                    
            //     })
                
            // }
            
            //全部清空
            // allDel(){
            //     let cart = localStorage.getItem("cart");
            //     cart = JSON.parse(cart);
            //     console.log(cart);
            //     $("#detail").on("click", () =>{
            //         if(confirm("确定清空购物车吗？")){
            //             localStorage.clear();
            //         }
            //     })
            //     localStorage.setItem("cart", JSON.stringify(cart));
            // }
            //计算总价
          
        }
        new Cart();
    })

})