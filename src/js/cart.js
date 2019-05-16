require(["config"], () => {
    require(["template","header","footer"], (template,header) =>{
  
        class Cart{
            constructor(){
                this.init();
                this.Card();
                this.numChange();
                this.removeTr();
                this.allDel();
                this.calcAllMoney();
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
                    $("#tbody").remove();
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

            // 数量加减(变化)
            numChange(){
                //减
                // 拿到点击 "-" 后获取的 num值
                let cart = localStorage.getItem("cart");
                cart = JSON.parse(cart);
                $("#tbody").on("click", "#cut", e =>{
                    let target = e.target;
                    let num = $(target).next().val();
                    num--;
                    if(num < 1){
                        num = 1;
                    } 
                    $(target).next().val(num);  // 把num值赋给 input
                    //计算 num值改变时的单个商品和
                    let cutMoney = Number($(target).parent().parent().prev().children("#price").html()) * Number(num);
                    let allMoney = Number($(target).parent().parent().next().children("#all").html(cutMoney));
                    //找当前 id 
                    let id = Number($(target).parent().parent().parent().attr("data-id"));
                    let index = -1;
                    // 判断当前点击的tr的 id = cart的id ，则cart的num值 = 改变的num值(input的value值)
                    if( cart.some((shop,i) =>{
                        index = i;
                        return shop.id === id;
                    })){
                        cart[index].num = num;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        header.calcCartNum();
                    }
                    this.calcAllMoney();
                    //调用合计
                })
                // 加
                $("#tbody").on("click", "#add", e =>{
                    let target = e.target;
                    let num = $(target).prev().val();
                    num++;
                    $(target).prev().val(num);
                    let addMoney = Number($(target).parent().parent().prev().children("#price").html()) * Number(num);
                    let allMoney = Number($(target).parent().parent().next().children("#all").html(addMoney));
                    
                    //找到当前id
                    let id = Number($(target).parent().parent().parent().attr("data-id"));
                    let index = -1;
                    if(cart.some((shop,i) =>{
                        index = i;
                        return shop.id === id;
                    })){
                        cart[index].num = num;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        header.calcCartNum();
                    }
                    this.calcAllMoney();
                    //调用合计
                    
                })
            }

            // 删除单条
            removeTr(){
                let cart = localStorage.getItem("cart");
                cart = JSON.parse(cart);
                $("#tbody").on("click","#remove", e =>{
                    e = e || event;
                    let target = e.target || e.srcElement;
                    let tr = $(target).parent().parent().parent();
                    let id = Number($(tr).attr("data-id"));
                    if(confirm("确定删除商品信息吗？")){
                        tr.remove();
                        cart.filter(function(shop){
                            return shop.id != id;
                        });

                        // 重新存进localStorage
                        localStorage.setItem("cart", JSON.stringify(cart));
                        header.calcCartNum();  //调用一次计算数量的方法
                        let num = Number($("#cart-num").html());  //取到刷新后的num值
                        if(num === 0){
                            $("#list-empty").show();
                            $("#pro-cart-head").hide()
                            $("#tbody").remove();
                        }
                        this.calcAllMoney();
                    }
                    // let removeIndex = -1;
                    // if(confirm("确定删除吗？")){
                    //     if(cart.some( (shop,i) =>{
                    //         removeIndex = i;
                    //         return shop.id = id;
                    //     })){
                    //     //id相等，就删除该条tr
                    //     tr.remove();
                    //     const newCart = [];
                    //      cart.map((item,index) =>{
                    //         if(removeIndex === index){
                    //             //当前相等，当前该条cart数据则为空
                    //             console.log('删除的是',item)
                    //         }else{
                    //             newCart.push(item);
                    //         }
                    //     })
                    //     // console.log(newCart) // 存进localStorage
                    //     localStorage.setItem("cart", JSON.stringify(newCart));
                    //     }
                    //     //判断商品数量是否为空，为空 显示空页面，不为空就重新渲染tr
                    //     header.calcCartNum();  //调用一次计算数量的方法
                    //     let num = Number($("#cart-num").html());
                    //     if(num === 0){
                    //         $("#list-empty").show();
                    //         $("#pro-cart-head").hide()
                    //         $("#tbody").remove();
                    //     }
                    // }
                })
            }
            
            // 全部清空
            allDel(){
                let cart = localStorage.getItem("cart");
                // cart = JSON.parse(cart);
                $("#detail").on("click", () =>{
                    if(confirm("确定清空购物车吗？")){
                        // localStorage.removeItem(cart);
                        localStorage.clear();
                        this.init();
                        header.calcCartNum();  //调用一次计算数量的方法
                        this.calcAllMoney();
                    }
                })
            }

            // 计算总价
            calcAllMoney(){
                let allTr = Array.from($("#tbody").children("tr"));
                // console.log(allTr);
                let trMoney = 0;
                allTr.forEach( tr => {
                    // console.log(tr);
                    trMoney += Number(tr.querySelector("#allMoney").querySelector("#all").innerHTML);
                    // trMoney += Number($("tr").children("#allMoney").children("all").html());
                })
                // console.log(trMoney);
                $("#moneyContainer").html(trMoney);
                $("#calcAllMoney").html(trMoney);
                
            }
          
        }
        new Cart();
    })

})