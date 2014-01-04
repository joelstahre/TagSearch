<?php
session_start();
require_once("Instagram.php");


$tag = $_GET["tag"];


$instagram = new Instagram();

$data;

if (isset($_SESSION["accessToken"]) && !isset($_GET["url"])) {
	$data = $instagram->getRequestWithAccessToken($tag, $_SESSION["accessToken"]);
} else {
	if (isset($_GET["url"])) {
		$data = $instagram->getRequest(false, $_GET["url"]);
	} else {
		$data = $instagram->getRequest($tag, false);
	}
}


if ($data == false) {
    echo "ERROR";
} else {
    echo(json_encode($data));

}


    






