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
                this.backTop();
                
            }
            //回到顶部
            backTop(){
                if ($('#back-top').length) {
                    var scrollTrigger = 600;  //预设高度 
        
                    // $(window).scrollTop()与 $(document).scrollTop()产生结果一样
                    // 一般使用document注册事件，window使用情况如 scroll, scrollTop, resize
                    // 根据预设高度，显示 "回到顶部"
                    $(window).on('scroll', function () {
                        if ($(document).scrollTop() > scrollTrigger) {
                            $('#back-top').addClass('show');
                        } else {
                            $('#back-top').removeClass('show');
                        }
                    });
                }
                    $('#back-top').on('click', function (e) {
                        // html,body 都写是为了兼容浏览器
                        $('html,body').animate({
                            scrollTop: 0
                        }, 700);
        
                        return false;
                    });
            }
            //轮播图
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    // direction: '', // 默认水平切换
                    loop: true,  // 循环模式选项
                    speed:2000,  // 切换每页的速率；
                    centeredSlides: true,
                    effect : 'fade', // 淡入
                    fadeEffect: {
                      crossFade: true,  //淡出
                    },

                    autoplay:true,//等同于以下设置,自动轮播
                    autoplay: {
                        delay: 1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                        },

                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable :true,  // 点击分页，图片切换
                      bulletElement : 'customs',
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                      
                    },
                  });
                  mySwiper.el.onmouseover = function(){ 
                      //鼠标放上暂停轮播
                    mySwiper.autoplay.stop();
                  }
                  mySwiper.el.onmouseleave = function(){
                      //鼠标移出开始轮播
                    mySwiper.autoplay.start();
                  }  

            }

            // 接收json数据，渲染
            render(){
                let html = "";
		        this.json.forEach((item, index) => {
                html += `
                        <li>
                            <a href="/html/detail.html?id=${item.id}"><img src="${item.img}" alt=""></a>
                            <a href="/html/detail.html?id=${item.id}">
                            <h6>${item.name}</h6>
                            </a>
                            <a href="/html/detail.html?id=${item.id}">
                            <p>${item.text}</p>
                        </a>
                        <div class="tag-list">
                            <span></span>
                            <a href="javascript:;">情侣 ></a>
                            <a href="javascript:;">人气 ></a>
                            <a href="javascript:;">生日 ></a>
                            <a href="javascript:;">结婚 ></a>
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