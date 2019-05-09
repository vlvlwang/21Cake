<?php
    //后端解决跨域
    header("Access-Control-Allow-Origin:*"); 
    include("../config.php");  //引入php
    //获取前端传的参数值
    $username = $_POST["username"];
    $password = $_POST["password"];
    //书写sql语句  查询
    $sql = "select * from register where username='$username' and password='$password'";
    // echo $sql;
    //执行  res 是一个资源类型 返回结果一直是true ，所以我们应该判断它的行数
    $res = mysql_query($sql);

    $row = mysql_num_rows($res);
    //判断
    if($row > 0){
        echo json_encode(array(
            "res_code" => 1,
            "res_message" =>"登录成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" =>0,
            "res_message" =>"用户名或密码错误"
        ));
    }

?>