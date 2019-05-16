require(["config"], () => {
    require(["url", "template","header","footer"], (url, template) =>{
        console.log(header);

        class ProClass{
            constructor(){
                this.init();
            }

            //rap2渲染
            init(){
                //请求数据
                $.get(url.rapBaseUrl + "list/get", data =>{
                    // console.log(data);
                    if(data.res_code === 1){
                        this.renderRap(data.res_body.list);
                        
                    }
                })
            }
            // 接收list
            renderRap(list){
                console.log(list);
                $("#pro-list-box").html(template("list-template" , {list}));
            }
        }
        new ProClass();
    })
})