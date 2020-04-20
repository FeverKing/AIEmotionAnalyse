
<!--
使用时请删除
AI情感分析插件
    Copyright (C) 2020  FeverKing

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<?php

//接受跨域请求
header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE');

//请填写你的数据库用户名,密码,数据库
$user = '';
$passwd = '';
$dbname = '';
//请填写你的数据库用户名,密码,数据库

$content = $_GET['content'];
$tag = $_GET['tag'];
if($content && $tag){
    createTable($tag);
    insert($content,$tag);
    echo ('{"data":[{"status":"200"}]}');
}


function insert($content,$tag){
	$con = mysqli_connect("localhost",$user,$passwd,$dbname);
  	$table = $content;
  	$ip=$_SERVER["REMOTE_ADDR"];
  	$sql="SELECT * FROM `".$tag."` WHERE content = '".$content."'";
  	if(mysqli_num_rows(mysqli_query($con,$sql))==1){
		
    }
  	else{
     	$insert = "INSERT INTO ".$tag." VALUE ('', '".$ip."','".$content."',CURRENT_TIMESTAMP)";
      	mysqli_query($con,$insert);
    }
}

function createTable($tag){
	$con = mysqli_connect("localhost",$user,$passwd,$dbname);
	$table = $tag;
	if(mysqli_num_rows(mysqli_query($con,"SHOW TABLES LIKE '". $table."'"))==1) {
	}
	else {
  		$sql = "CREATE TABLE ".$tag." (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
		IP VARCHAR(30) NOT NULL,
		content TEXT,
		queryTime TIMESTAMP
		)";
      	mysqli_query($con,$sql);
	}
 	
}

?>
