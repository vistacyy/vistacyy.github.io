<?php
require 'config.php';
//$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
//新增用户
$query = "INSERT INTO blog_user (user, pass, ans, ques, email, birthday, ps)
                 VALUES  ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_POST['ans']}',
                          '{$_POST['ques']}', '{$_POST['email']}', '2013-07-24', '{$_POST['ps']}')";

mysql_query($query) or die('新增错误：'.mysql_error());
echo mysql_affected_rows();
mysql_close();
?>
