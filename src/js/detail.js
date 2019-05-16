require(["config"], () => {
    require(["url", "template", "header","footer","zoom","fly"], (url,template,header) =>{

        class Detail{
            constructor(){
                this.seeCart = $("#see-cart");
                this.init();
                this.addCart();
            }
            //写方法
            //详情页的初始化
            init(){
                // 在url中获取id值，携带id请求详情数据，再渲染详情页
                let id = Number(location.search.slice(4));
                $.get(url.rapBaseUrl + "detail/get", {id}, res =>{
                    if(res.res_code === 1){
                        //解构赋值，把res_body里的data解构出来 
                        let {data} = res.res_body;
                        //解构赋值，在data中新增一个id
                        // 当借口变成真实接口时，这句代码不需要
                        // 把当前数据存下来，存在this上
                        data = {...data, id};
                        this.data = data;
                        this.render(data);
                    }
                })
                
            }
            // 渲染图片
            render(data){
               $("#detail").html(template("detail-template",{data}));
               this.zoom();
            }
           
            //加购物车 事件委托
            addCart(){
                // 立即购买 + 直接跳转购物车页面
                $("#detail").on("click","#buy",() =>{
                    let cart = localStorage.getItem("cart");
                    console.log(cart);
                    if(cart){
                        cart = JSON.parse(cart);
                        let index = -1;  //-1无意义，index是来接收值的
                        if(cart.some((shop,i) =>{
                            index = i;
                            return shop.id === this.data.id;
                        })){
                            cart[index].num ++;
                        }else{
                            cart.push({...this.data,num: 1});
                        }

                    }else{
                        cart = [{...this.data,num:1}];
                    }
                    // 重新存cart
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.href="/../html/cart.html";
                })

                // 加入购物车，点击“查看购物车”跳转页面
                $("#detail").on("click","#cart", e  =>{
                        // 完成抛物线加购物车动画
                    $(`<img src='${this.data.imgs[0]}' style='width:15px;height:15px;z-index:1000000000'>`).fly({
                        //起始位置
                        start: {
                            left:e.clientX,
                            top: e.clientY
                        },
                        //终止位置
                        end: {
                            left:$("#cart-num").offset().left,
                            top :$("#cart-num").position().top
                        },
                        //清除抛物体
                        onEnd: function(){
                            this.destroy();
                            header.calcCartNum(); //调用一次计算数量的方法
                        }
                    });

                    //查看购物车
                    this.seeCart.fadeIn();
                    setTimeout(() => {
                    this.seeCart.fadeOut(); 
                    },1500);
                    
                    //在加购按钮上，给当前的商品一个自定义属性，可以在按钮上取到id值
                    //列表页用自定义属性，详情页可以不用
                    //根据id，取到id对应的商品数据，并把当前这条商品数据存到 localstorage(本地存储)
                    // this.data 存到 本地，存数组类型，方便存取东西
                    //1.先取cart数据
                    let cart = localStorage.getItem("cart");
                    if(cart){
                        // cart有值，表示已经存过购物车了
                        //判断有没有当前商品
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

            zoom(){
                //放大镜
                $(".mid-img").elevateZoom({
                    gallery : 'right-list',
                    cursor : 'pointer',
                    galleryActiveClass : 'active',
                    borderSize : '1',
                    borderColor : '#888'
                });
            }
        }
        new  Detail();
    })

})