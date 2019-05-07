<?php
    include("./config.php"); // 引入PHP文件
    // 接收前端传递的参数,接收参数值  $_GET 接收
    $name = $_GET["name"];
    $price = $_GET["price"];
    $num = $_GET["num"];

    // 把接收到的前端参数值，插入到数据库中 insert 新增
    $sql = "insert into shop (name,price,num) values ('$name',$price,$num)";
    // 新增完成，执行
    $res = mysql_query($sql);
    // 判断是否新增成功
    if($res){
        echo json_encode(array(
            "res_code" => 1,
            "res_message" =>"添加成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" =>0,
            "res_message" => "添加失败"
        ));
    };
?>