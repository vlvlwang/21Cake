require(["config"], () => {
    require(["url", "template","swiper","header","footer"], (url, template,Swiper) =>{
        class Index{
            constructor(){
                this.ul = document.querySelector("#pro-ul");
                this.json = [
                    {"img" : "../img/xinpin-01.png", "name" : "浅草", "price" : 298.00, "text" : "浅草才能没马蹄"},
                    {"img" : "../img/xinpin-02.png", "name" : "黑森林", "price" : 398.00, "text" : "樱桃酒味从巧克力卷的缝隙飘出"},
                    {"img" : "../img/xinpin-03.png", "name" : "榴莲飘飘", "price" : 298.00, "text" : "时候到了，榴莲飘飘"},
                    {"img" : "../img/xinpin-04.png", "name" : "可可岛", "price" : 458.00, "text" : "可可 是一种甜蜜的红色果浆"}
                ];
                this.banner();
                this.render();
                this.init();
                
            }
            //轮播图
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    // direction: '', // 默认水平切换
                    loop: true, // 循环模式选项
                    
                    effect : 'fade',
                    fadeEffect: {
                      crossFade: true,
                    },

                    autoplay:true,//等同于以下设置,自动轮播
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                        },

                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable :true,
                      bulletElement : 'customs',
                    },
                    // 如果需要前进后退按钮
                    // navigation: {
                    //   nextEl: '.swiper-button-next',
                    //   prevEl: '.swiper-button-prev',
                      
                    // },
                    
                  })  
            }

            // 接收json数据，渲染
            render(){
                let html = "";
		        this.json.forEach((item, index) => {
                html += `
                        <li>
                            <a href="/html/detail.html"><img src="${item.img}" alt=""></a>
                            <a href="/html/detail.html">
                            <h6>${item.name}</h6>
                            </a>
                            <a href="/html/detail.html">
                            <p>${item.text}</p>
                        </a>
                        <div class="tag-list">
                            <span></span>
                            <a href="">情侣 ></a>
                            <a href="">人气 ></a>
                            <a href="">生日 ></a>
                            <a href="">结婚 ></a>
                        </div>
                        <div class="cart-info">
                            <span>￥${item.price}/2.0磅</span>
                            <a class="add-cart" href="javascript:;">加入购物车</a>
                        </div>
                        <div></div>
                        <div></div>
                    </li>
                    `;
                });
                this.ul.innerHTML = html;
            }

            //rap2渲染
            init(){
                //请求数据
                $.get(url.rapBaseUrl + "index/get", data =>{
                    // console.log(data);
                    if(data.res_code === 1){
                        this.renderRap(data.res_body.list);
                        
                    }
                })
            }
            // 接收list
            renderRap(list){
                console.log(list);
                $("#list-box").html(template("list-template" , {list}));
            }

        }
        new Index();


    })

})