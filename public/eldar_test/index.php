<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$ip = $_SERVER['REMOTE_ADDR']; //получаем IP адрес клиента
$client = $_SERVER['HTTP_USER_AGENT']; //получаем идентификатор HTTP клиента
$today = date("Y.m.d H:i:s"); //получаем текущие дату и время
$f = fopen("log.txt","a"); //открываем файл для добавления данных
fwrite($f,"$today; $ip; $client; sensor=".print_r($_REQUEST, true)."\r\n<br>-----------------\r\n<br>"); //запись данных в файл
fclose($f); //закрываем файл
?>

Если над этой надписью нет ошибок, то все ок.
