require(["config"], () => {
    require(["url", "template", "header","footer"], (url, template,header) =>{
        // console.log(header);
        // console.log(footer);

        class List{
            constructor(){
                this.getRap();
            }
            //写方法，请求列表数据
            getRap (){
                //发送ajax请求数据
                $.ajax({
                    url : url.rapBaseUrl + "list/get",
                    type : "get",
                    dataType : "json",         
                    success : data => {      
                        if(data.res_code === 1){
                            let {list} = data.res_body;
                            //把当前数据存下来
                            this.list = list;
                            this.render(list);
                            this.addCart(this.list);
                        }
                    } 
                })
            }
            // 接收list
            render(list){
                
                $("#pro-list-box").html(template("list-template" , {list}));
            }

            // 加购物车
            addCart(list){
                //console.log(this.list);
                $("#pro-list-box").on("click","#list-addCart", (e) => {
                    //找到查看购物车
                    let target = e.target;
                    let seeCart = $(target).next();
                    //显示查看购物车
                    $(seeCart).fadeIn();
                    setTimeout(() => {
                        $(seeCart).fadeOut(); 
                    },1500);

                    //给按钮自定义一个属性id  取到id
                    let id = Number($(target).attr("data-id"));
                    //取到当前条数据
                    let newList = list.filter((shop,a) => {
                        return shop.id === id;
                    })
                    //list 是个数组
                    List = newList[0];

                    //先取到cart的数据
                    let cart = localStorage.getItem("cart");
                    //判断cart有没有值
                    if(cart){
                        //有值，已经存过
                        //判断有无当前商品
                        console.log(cart)
                        cart = JSON.parse(cart);
                        let index = -1;
                        if(cart.some((shop,i) =>{
                            index = i ;
                            return shop.id === id;
                        })){
                            //有该条数据，就num++
                            cart[index].num++;
                        }else{
                            //没有该条数据，就push进去
                            cart.push({...List,num:1});
                        }
                    }else{
                        //购物车为空
                        //第一次点击加购物车，当前商品加一条
                        cart = [{...List,num:1}];
                    }
                    // 判断结束重新存
                    localStorage.setItem("cart",JSON.stringify(cart));
                    header.calcCartNum();
                })
            }

        }
        new List();  
        
    })

})