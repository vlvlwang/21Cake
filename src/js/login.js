require(["config"], () => {
    //                       cookie没有返回值，所以不用接收
    require([ "url", "header","footer", "cookie"], (url) =>{
        // console.log(header);
        // console.log(footer);
        console.log(url);
        
        class Login{
            constructor(){
                this.loginName = $("#loginName");
                this.password = $("#password");
                this.btn = $("#login-btn");
                this.remember = $("#remember");
                this.bindEvents();
            }
            bindEvents(){
                this.btn.on("click" , () =>{
                    //获取到登录数据
                    let username = this.loginName.val(),
                        password = this.password.val();
                        //数据发送后台
                        $.ajax({
                            url : url.phpBaseUrl + "user/login.php",
                            type : "post",
                            data : {username,password},
                            success : data => {
                                console.log(data);
                                if(data.res_code === 1){
                                   this.loginSucc(username);
                                }else{
                                    alert(data.res_message);
                                }
                            },
                            dataType : "json"
                        })
                })
            }
            //登录成功后的方法
            loginSucc(username){
                //存cookie 存在 '/' 下
                //判断记住密码选项是否被选中，及后续执行代码
                let expires = this.remember.prop('checked') ? {expires:7} : {};
                console.log(expires);
                expires = Object.assign({path: "/"}, expires);
                
                $.cookie('username',username,expires);
                alert("登录成功，即将跳转首页");
                location.href = "/";
            }
        }
        new Login();
    })
})