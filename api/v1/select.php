
<?php
// 查询数据库 操作
// 引入另外一个PHP文件
    include("./config.php");
// 接收前端传的参数值
    $pageIndex = $_GET["pageIndex"];
    $count = $_GET["count"];
//查询所有    
    $sqlAll = "select * from shop";
    $resAll = mysql_query($sqlAll);
    $countAll = mysql_num_rows($resAll); // 就是在$resAll中去数据条数的
    $pageCount = ceil($countAll / $count);    // 向上取整 得到总的页数，总数量 / 单页数量 = 总页数


// 跳过查页数  
    // limit 0,4   index = 1
    // limit 4,4   index = 2
    // limit 8,4   index = 3
// 得出公式
    // limit ($pageIndex-1)*$count,$count

//查询
// $sql = "select * from shop";  //查询sql 中 shop 所有的数据

$start = ($pageIndex-1)*$count;
// 修改查询语句
$sql = "select * from shop limit $start,$count";

$res = mysql_query($sql);  // 因为查询结果是一个资源类型，所以需要用一个变量来接收
$shop = array();
while($row = mysql_fetch_assoc($res)){
    array_push($shop,$row);      // 可得到查询结果
 }

// 查询失败的情况，说明$shop中没有数据，此时可以判断一下$shop的长度。
// $shop的长度为0，返回失败。

// 构造一个json
    $json = array(
        "res_code" => 1,
        "res_message" => "查询成功",
        "res_body" =>array(
            "data" => $shop,
            "pageCount" => $pageCount

        ) 
        );
    echo json_encode($json);  // 通过encode的方式发送给前端，可以得到一个json格式的数据
    mysql_close();   //关闭数据库

?>