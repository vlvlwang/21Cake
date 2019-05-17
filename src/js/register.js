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
                    //判断注册用户名不能为空
                    let pattern =/^[a-zA-Z\u4e00-\u9fa5]{1,19}$/g,
                        pwdPattern =/^[a-zA-Z]\w{6,15}$/g; 
                    if(username === "" || password === ""){
                        confirm("注册用户名不能为空");
                    }else if(!pattern.test(username)){
                        confirm("用户名不能数字、下划线开头,长度在2-20位之间！");
                    }else if(!pwdPattern.test(password)){
                        confirm("密码必须字母开头，长度在6-15位之间");
                    }else if(!$("#remember").prop("checked")){
                        confirm("请阅读注册相关协议及隐私政策")
                    }else{
                        //商量接口
                        $.ajax({
                            url : url.phpBaseUrl + "user/register.php",
                            type : "post",
                            data : {username,password},
                            success : data => {
                            //注册成功，跳转登录页
                                if(data.res_code === 1){
                                    alert(data.res_message + "，即将跳转登录页");
                                    $.cookie("name",username,{path:"/"}); //取到用户名，存到根目录
                                    location.href = "login.html";
                                }
                            },
                            dataType : "json"
                        })
                    }
                })
            }
        }
        new Register();
    })

})