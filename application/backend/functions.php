<?php
session_start();
require_once("Instagram.php");


$instagram = new Instagram();

if (isset($_GET["tag"]) || isset($_GET["url"])) {
	$tag = $_GET["tag"];

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
}

if(isset($_GET["like"])) {

	$id = $_GET["like"];

	$data = $instagram->doLike($id, $_SESSION["accessToken"]);

	echo(json_encode($data));
}

if(isset($_GET["unlike"])) {

	$id = $_GET["unlike"];

	$data = $instagram->unLike($id, $_SESSION["accessToken"]);

	echo(json_encode($data));
}





    






