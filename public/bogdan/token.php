<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$flussonic = 'http://185.71.81.253'; 
$stream = $_GET['stream'];
$url = $flussonic . ':8080/vsaas/api/v2/auth/login';

$result = @file_get_contents($url, false, stream_context_create(array(
	    'http' => array(
					       'header'  => "Content-type: application/x-www-form-urlencoded\r\n".
						   "x-vsaas-api-key: 231bc421-cda3-43f0-b5bb-52e8aa0bb579\r\n",
					       'method'  => 'POST',
					       'content' => 'login=gcometa&password=GK0meT4'
					    ))));
$result =json_decode($result);
$url = $flussonic . ':8080/vsaas/api/v2/cameras?favorite=0';
$result = @file_get_contents($url, false, stream_context_create(array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n".
                     "x-vsaas-session: ".$result->{'session'}."\r\n".
					 "X-Page-Limit: 400\r\n",  
             'method'  => 'GET'
    ))));
$result =json_decode($result);
echo "<pre>";
print_r($result);
echo "</pre>";
$id=-1;
try {
foreach($result as $obj)
{
	list($foo, $url)= explode("@", $obj->{'stream_url'});
	if(!isset($stream)){
	// список доступных камер
	echo iconv('UTF-8', 'windows-1251', $obj->{'title'}).'|'.$obj->{'name'}.'</br>';
	}
	$id = $id+1;
	if ($obj->{'name'} == $stream)
    {
                break;
    }
}
} catch (Exception $e){}
$token = $result[$id]->{'playback_config'}->{'token'};
$link = $flussonic.'/'.$stream.'/embed.html?autoplay=true&token=' . $token;
$embed = '<iframe frameborder="0" width="100%" height="100%" allowfullscreen src="' . $link . '"></iframe>';
// echo $token;
// echo $embed;
// header("Location: ".$link);
?>