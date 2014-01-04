<?php
require_once("backend/TwitterTrends.php");

$twitter = new TwitterTrends();

echo $twitter->getRequest();



/*$location = '23424954';

		$trends;
		$cacheFile = "cache/trends/".$location.".json";

		if (file_exists($cacheFile) && filemtime($cacheFile) > time()-60) {


			$data = file_get_contents($cacheFile);
			$trends = $this->getTrends(json_decode($data));
		} else {
			

			require_once("tmhOAuth.php");

			$twitter = new tmhOAuth(array(
			  'consumer_key' => 'MrXSfKfVNvFwNJH1O0oVw',
			  'consumer_secret' => '2PDKu6BGhgUNAbpXno30391IOlm3pMnUn43tnBwh8',
			  'user_token' => '44170433-rchAfQQc02XZ6hDdkIBdex99bxSV3X8a2laQ8bAqE',
			  'user_secret' => 'hCrvZW3h74OSHrngNOtneeuVYQIB45isUkA9rm853vITE',
			));

			//$location = '23424954';

			$code = $twitter->request('GET', $twitter->url('1.1/trends/place.json'), array('id' => $location));

			if ($code == 200) {


			    $resp = json_decode($twitter->response['response']);
			    
			    //file_put_contents($cacheFile, $resp);

		   	 	$trends = $this->getTrends($resp);
		   	 	
			    
			} else {
			   echo "fel";
			}

		}

		return $trends;*/