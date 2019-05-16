require(["config"], () => {
    require(["url", "template", "header","footer"], (url, template) =>{
        // console.log(header);
        // console.log(footer);

        class List{
            constructor(){
                this.getRap();
                this.addCart();
            }
            //写方法，请求列表数据
            getRap (){
                //发送ajax请求数据
                $.ajax({
                    url : url.rapBaseUrl + "list/get",
                    type : "get",
                    dataType : "json",         
                    success : data => {      
                        if(data.res_code === 1)
                        this.render(data.res_body.list);
                    }                           
                })

            }
            // 接收list
            render(list){
                // console.log(list);
                $("#pro-list-box").html(template("list-template" , {list}));
            }
            // 加购物车
            addCart(){
                $("#pro-list-box").on("click","#list-addCart", e =>{
                    
                //查看购物车
                $("#see-cart").fadeIn();
                setTimeout(() => {
                $("#see-cart").fadeOut(); 
                },1500);
                //1.先取cart数据
                let cart = localStorage.getItem("cart");
                if(cart){
                    // cart有值，表示已经存过购物车了
                    //把字符串格式的cart转成json
                    //遍历cart ，查询有无相同的商品, some-只要有一个满足就行，every-每一个
                    cart = JSON.parse(cart);
                    let index = -1;  //-1无意义，index是来接收值的
                    if(cart.some((shop,i) =>{
                        //some 只要找到满足条件的，就不会继续找下去了；所以index的值就等于满足条件的索引
                        //判断取到的id 是否 = 当前商品id
                        index = i;
                        return shop.id === this.data.id;
                    })){
                        //有该条数据，数量num++
                        cart[index].num ++;
                    }else{
                        //没有该条数据，就push进去
                        cart.push({...this.data,num: 1});
                    }

                }else{
                        // cart为空，直接存,存数量
                        // 第一次加购物车，数量初始值为1
                        cart = [{...this.data,num:1}];
                }
                    // 重新存cart
                    localStorage.setItem("cart", JSON.stringify(cart));
                })
            }

        }
        new List();  
        
    })

})