<?php
require 'config.php';
//������֮ǰ��Ҫ�ж��û����Ƿ��ظ�
$query = mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}'") or die('SQL ����');
if (mysql_fetch_array($query,MYSQL_ASSOC)) {
     echo 1;
}
mysql_close();
?>