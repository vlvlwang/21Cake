<?php
//连接后台数据，点击删除，进行后台数据删除

    //引入php
    include("./config.php");
    $id = $_GET["id"]; //接收id值
    $sql ="delete from shop where id=$id"; //在数据库中删除对应id

    //执行
    $res = mysql_query($sql); 
    //判断
    if($res){
        echo json_encode(array(
            "res_code" =>1,
            "res_message" =>"删除成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" =>0,
            "res_message" =>"网络错误，删除失败"
        ));
    }
?>