require(["config"], () => {
    require(["header","footer"], () =>{
        console.log(header);
        console.log(footer);

        class entCoop{
            constructor(){
                this.choose();
                
            }

            choose(){
                $("#cityChoose").on("click", ()=>{
                    $("#city-list").show();
                })
                $("#city-list").on("click", "li", e =>{
                    //找的当前点击的事件源
                    let target = e.target;
                    //把点击的li的值给 input 的val()
                    $("#input").val($(target).html());
                    //判断取值完成后，ul隐藏
                    if($("#input").val($(target).html())){
                        $("#city-list").hide();
                    }
                })
            }
        }
        new entCoop();
    })

})