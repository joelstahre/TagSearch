<?php

class TwitterTrends {

	private $consumerKey = "MrXSfKfVNvFwNJH1O0oVw";
	private $consumerSecret = "2PDKu6BGhgUNAbpXno30391IOlm3pMnUn43tnBwh8";
	private $userToken = "44170433-rchAfQQc02XZ6hDdkIBdex99bxSV3X8a2laQ8bAqE";
	private $userSecret = "hCrvZW3h74OSHrngNOtneeuVYQIB45isUkA9rm853vITE";

	private $trendsURL = "1.1/trends/place.json";

	public function getRequest() {

		$location = '23424954';

		$trends;
		$cacheFile = "cache/trends/".$location.".json";

		if (file_exists($cacheFile) && filemtime($cacheFile) > time()-60*10) {


			$data = file_get_contents($cacheFile);
			$trends = $this->getTrends(json_decode($data));
		} else {
			

			require_once("tmhOAuth.php");

			$twitter = new tmhOAuth(array(
			  'consumer_key' => $this->consumerKey,
			  'consumer_secret' => $this->consumerSecret,
			  'user_token' => $this->userToken,
			  'user_secret' => $this->userSecret,
			));

			//$location = '23424954';

			$code = $twitter->request('GET', $twitter->url($this->trendsURL), array('id' => $location));

			if ($code == 200) {


			    $resp = json_decode($twitter->response['response']);
			    
			    file_put_contents($cacheFile, $twitter->response['response']);

		   	 	$trends = $this->getTrends($resp);
		   	 	
			    
			} else {
			   echo "fel";
			}

		}

		return $trends;

	}

	public function getTrends($data) {

		$trendsArray = array();
		
		$trends = $data[0]->trends;


		foreach ($trends as $trend) {
			$trendsArray[] = $trend->name;		
		}

		return $trendsArray;

	}
}

$twitter = new TwitterTrends();

$data = $twitter->getRequest();

if ($data == false) {
    echo "ERROR";
} else {
    echo(json_encode($data));
}
