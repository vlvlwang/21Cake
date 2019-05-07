<?php
    include("./config.php"); // 引入php
    // 接收前端传的参数
    $name = $_POST["name"];
    $password = $_POST["password"];
    // 添加 书写sql语句
    $sql = "insert into register (name,password) values ('$name','$password')";
    //执行
    $res = mysql_query($sql);
    //判断
    if($res){
        echo json_encode(array(
            "res_code" => 1,
            "res_message" => "注册成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" => 0,
            "rse_message" => "网络错误，注册失败"
        ));
    }

?>