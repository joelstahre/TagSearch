<?php
require_once("backend/Instagram.php");

function check() {
		//TODO: fixa något snyggare lösning?
	if (isset($_GET["code"])) {
		signIn();
		header("Location: http://www.tagsearch.se/");
	}

	if (isset($_GET["logout"])) {
		signOut();
		header("Location: http://www.tagsearch.se/");
	}

	//var_dump($_SESSION);

}


function signIn() {
	$code = $_GET["code"];

	$instagram = new Instagram();



	try {

		$result = $instagram->authorize($code);

		$_SESSION['accessToken'] = $result["access_token"];
		$_SESSION["user"] = $result["user"];
		$_SESSION["signedIN"] = true;

	} catch (Exception $e) {
		var_dump($e->message());
	}


}

function signOut() {

	unset($_SESSION['accessToken']);
	unset($_SESSION['user']);
	unset($_SESSION['signedIN']);

}



function searchBar() {
	if (isset($_SESSION["signedIN"]) && $_SESSION["signedIN"]) {
		
				    			
		echo "<form class='navbar-form navbar-left' role='search'>
				<div class='form-group'>
				    <input type='text' id='searchField' class='form-control' placeholder='Search tag'>
				</div>
				<button type='button' id='searchBTN' class='btn btn-default'>Submit</button>
			  </form>";
	}
	else {
		echo "<p class='navbar-text'>Sign in to make a tag-search!</p>";
	}
}


function signInBar() {
	if (isset($_SESSION["signedIN"]) && $_SESSION["signedIN"]) {
		
		echo "<li><p class='navbar-text'> Welcome " . $_SESSION["user"]["username"] . "</p> <img class='profilePic' src='" . $_SESSION["user"]["profile_picture"] . "' height='40' width='40''></li> <li><a href='?logout'>Sign Out </a></li>";
	} else {
		echo "<li><a href='https://api.instagram.com/oauth/authorize/?client_id=648d5bb844884b7ab01141109a108660&redirect_uri=http://www.tagsearch.se&response_type=code'><i class='fa fa-instagram fa-lg'></i> Sign in with Instagram</a></li>";
	}
}


