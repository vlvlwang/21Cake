接口文档

1.首页类型请求


2.列表页接口


3.注册接口

url : http://localhost:1021/api/v1/user/regsiter.php

method : post

query : {username,password}

data : {
	res_code : 1, // 1代表注册成功，0代表失败

  ​	 res_message:   "注册成功"  ||  "网络错误，注册失败，请重试"。
}
