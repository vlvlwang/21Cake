require(["config"], () => {
    require(["url" , "header" , "footer"], (url) =>{
        // console.log(header);
        // console.log(footer);
        console.log(url);

        class Register{
            constructor(){
                this.loginName = $("#loginName");
                this.password = $("#password");
                this.loginBtn = $("#login-btn");
                this.bindEvents();

            }
            bindEvents(){
                //利用 jquery 绑事件
                this.loginBtn.on("click" , () =>{
                    let username = this.loginName.val(),
                        password = this.password.val();
                    //商量接口
                    $.ajax({
                        url : url.phpBaseUrl + "user/register.php",
                        type : "post",
                        data : {username,password},
                        success : data => {
                            console.log(data);
                        },
                        dataType : "json"
                    })
                })
            }
        }
        new Register();
    })

})