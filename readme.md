接口文档

1.首页类型请求

url : http://rap2api.taobao.org/app/mock/168141/

method : get

data : {···}


2.列表页接口

url : http://rap2api.taobao.org/app/mock/168141/

method : get

data : {···}


3.详情页接口

url : http://rap2api.taobao.org/app/mock/168141/

method : get

query : {id}

data : {···}


4.注册接口

url : http://localhost:1021/api/v1/user/regsiter.php

method : post

query : {username,password}

data : {
	res_code : 1, // 1代表注册成功，0代表失败

  ​	 res_message:   "注册成功"  ||  "网络错误，注册失败，请重试"。
}
