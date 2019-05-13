require(["config"], () => {
    require(["url", "template", "header","footer","zoom"], (url,template) =>{

        class Detail{
            constructor(){
                this.init();
                // this.text();
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
                        data = {...data, id};
                        this.render(data);
                    }
                })
                
            }
            // 渲染图片
            render(data){
               $("#detail-banner").html(template("detail-template",{data}));
               this.zoom();

            }
            //渲染文本
            renderText(data){
                $("#detail-text").html(template("detail-text-template",{data}));

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