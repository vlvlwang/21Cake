require(["config"], () => {
    require(["url", "template", "header","footer"], (url, template) =>{
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

        }
        new List();  
        
    })

})