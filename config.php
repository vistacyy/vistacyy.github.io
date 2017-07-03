<?php
	header('Content-Type:text/html;charset=utf-8');
	//常量参数
	define('DB_HOST','localhost');
	define('DB_USER','zjwdb_6187022');
	define('DB_PWD','Zjw201707');
	define('DB_NAME','zjwdb_6187022');
	//第一步，连接 MYSQL 服务器
	$conn = mysql_connect(DB_HOST,DB_USER,DB_PWD) or die('数据库连接失败，错误信息：'.mysql_error());
	mysql_select_db(DB_NAME) or die('数据库错误，错误信息：'.mysql_error());
?>