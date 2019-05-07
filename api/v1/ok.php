<?php
    include("./config.php"); // 引入php文件
// 获取前端参数值
    $id = $_GET["id"];
    $price = $_GET["price"];
    $num = $_GET["num"];
// 更新数据
    $sql = "update shop set price=$price,num=$num where id=$id";
//执行
    $res = mysql_query($sql);
//判断
    if($res){
        echo json_encode(array(
            "res_code" =>1,
            "res_message" =>"更新成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" =>0,
            "res_message" =>"网络错误，更新失败"
        ));
    }



?>