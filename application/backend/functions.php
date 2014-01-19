<?php
session_start();
require_once("Instagram.php");


$instagram = new Instagram();

$data;

if (isset($_GET["action"])) {

	$action = $_GET["action"];

	switch ($action) {
		case 'tag':
			$tag = $_GET["data"];
			$data = $instagram->getRequest($tag, false);
			break;

		case 'loadMore':
			$url = $_GET["data"];
			$data = $instagram->getRequest(false, $url);
			break;

		case 'like':
			$id = $_GET["data"];
			$data = $instagram->doLike($id, $_SESSION["accessToken"]);
			break;

		case 'unlike':
			$id = $_GET["data"];
			$data = $instagram->unLike($id, $_SESSION["accessToken"]);
			break;
	}


	if ($data == false) {
		echo "ERROR";
	} else {
		echo(json_encode($data));

	}
}









    






