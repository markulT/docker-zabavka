<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
    // whitelist of safe domains
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}

//$flussonic = $_GET['host']; // This script gets Flussonic address from a query. String 'http://flussonic-ip'
$flussonic = '193.176.179.12'; // This script gets Flussonic address from a query. String 'http://flussonic-ip'
$key = '1212a88787b87878c0707d07ef'; // The key from flussonic.conf file. KEEP IT IN SECRET.
$lifetime = 3600 * 3; // The$uid link will become invalid in 3 hours.
$uid = 5000;

$stream = $_GET['streamname']; // This script gets the stream name from a query. string (script.php?stream=bbc)

$ipaddr = $_SERVER['REMOTE_ADDR']; // (v20.07) Set $ipaddr = 'no_check_ip' if you want to exclude IP address of client devices from checking.
$desync = 300; // Allowed time desync between Flussonic and hosting servers in seconds.
$starttime = time() - $desync;
$endtime = $starttime + $lifetime;
$salt = bin2hex(openssl_random_pseudo_bytes(16));

$hashsrt = $stream.$ipaddr.$starttime.$endtime.$key.$salt;
$hash = sha1($hashsrt);

$token = $hash.'-'.$salt.'-'.$endtime.'-'.$starttime;
$link = 'http://'.$flussonic.':8880/'.$stream.'/embed.html?token='.$token.'&remote='.$ipaddr;
$embed = '<iframe allowfullscreen style="width:640px; height:480px;" src="'.$link.'"></iframe>';

echo $ipaddr;
echo "link: ".$link,PHP_EOL;
//echo $embed;
//header("X-UserId: "."2000".$uid);
//header("Location: $link");
?>