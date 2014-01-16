<?php

class Instagram {

	private $clientID = "648d5bb844884b7ab01141109a108660";
	private $clientSecret = "f1ac1d0d3ac647d5a02e2889673878b3";
	private $redirectURI = "http://www.tagsearch.se";

	private $accessTokenURL = "https://api.instagram.com/oauth/access_token";

	private $tagSearchURL = "https://api.instagram.com/v1/tags/";
	private $tagSearchURLClient = "/media/recent?client_id=";
	private $tagSearchURLAccessToken = "/media/recent?access_token=";
	private $code;


	public function authorize($code) {
		$this->code = $code;

		$params = array(
                        "client_id" => $this->clientID,
                        "client_secret" => $this->clientSecret,
                        "grant_type" => "authorization_code",
                        "redirect_uri" => $this->redirectURI,
                        "code" => $this->code
                		);

        $params_string = http_build_query($params);

        $curl_opts = array(
                CURLOPT_HEADER          =>  FALSE,
                CURLOPT_RETURNTRANSFER  =>  TRUE,
                CURLOPT_FAILONERROR     =>  TRUE,
                CURLOPT_CONNECTTIMEOUT  =>  30,
                CURLOPT_TIMEOUT         =>  30,
                CURLOPT_HTTPGET			=> FALSE,
                CURLOPT_POSTFIELDS 		=> TRUE,
                CURLOPT_POSTFIELDS		=> $params_string,
                CURLOPT_HTTPHEADER 		=> array("Content-Type:application/x-www-form-urlencoded"),
                CURLOPT_URL				=> $this->accessTokenURL
                );


        $ch = curl_init();
        curl_setopt_array($ch, $curl_opts);
        $response = curl_exec($ch);
        $result = json_decode($response, TRUE);
        $http_code = intval(curl_getinfo($ch, CURLINFO_HTTP_CODE));

        if ($http_code !== 200) {
        	throw new Exception("Error. Unable to obtain access token. (HTTP: " . $this->http_code . ")");
        }

        return $result;
	}




	public function getRequest($tag, $nextURL) {

		$url;
		$cacheFile;
		if ($nextURL) {
			$url = $nextURL;
		} else {
			$formatedTag = $this->formatTag($tag);
			$url = $this->tagSearchURL . $formatedTag . $this->tagSearchURLClient . $this->clientID;
			$cacheFile = "cache/tags/".$tag.".json";
		}

		
		$instaMedia;

		if (file_exists($cacheFile) && filemtime($cacheFile) > time()-60 && $tag != false) {


			$data = file_get_contents($cacheFile);
			$instaMedia = $this->getStructuredArray(json_decode($data));
		} else {
			$ch = curl_init();

			$options = array(CURLOPT_URL => $url,
	                 		 CURLOPT_RETURNTRANSFER => true,
	                 		 CURLOPT_SSL_VERIFYPEER => 0,
	                 		 CURLOPT_SSL_VERIFYHOST => 0);

			curl_setopt_array($ch, $options);
		    $data = curl_exec($ch);
		    $http_code = intval(curl_getinfo($ch, CURLINFO_HTTP_CODE));

	        /*if ($http_code !== 200) {
	        	throw new Exception("Error. Unable to obtain access token. (HTTP: " . $this->http_code . ")");
	        }*/
		    curl_close($ch);

		    if (!$nextURL) {
		    	file_put_contents($cacheFile, $data);
		    }
		    

		    $instaMedia = $this->getStructuredArray(json_decode($data));
		}

	    return $instaMedia;
	}


	public function getRequestWithAccessToken($tag, $accessToken) {

		$formatedTag = $this->formatTag($tag);

		$url = $this->tagSearchURL . $formatedTag . $this->tagSearchURLAccessToken . $accessToken;


		$ch = curl_init();

		$options = array(CURLOPT_URL => $url,
                 		 CURLOPT_RETURNTRANSFER => true,
                 		 CURLOPT_SSL_VERIFYPEER => 0,
                 		 CURLOPT_SSL_VERIFYHOST => 0);

		curl_setopt_array($ch, $options);
	    $data = curl_exec($ch);
	    $http_code = intval(curl_getinfo($ch, CURLINFO_HTTP_CODE));
	    curl_close($ch);

	    $instaMedia;

        if ($http_code !== 200) {
        	$instaMedia = "";
        } else {
        	$instaMedia = $this->getStructuredArray(json_decode($data));
        }
	    

	    //$instaMedia = $this->getStructuredArray(json_decode($data));
	  
	    return $instaMedia;

	}


	public function doLike($id, $accessToken) {

		$url = "https://api.instagram.com/v1/media/".$id."/likes";
	    $fields = array(
	        'access_token'       =>      $accessToken
	    );
	 
	    $ch = curl_init();

	    $options = array(CURLOPT_URL => $url,
	    				 CURLOPT_POST => true,
	    				 CURLOPT_POSTFIELDS => http_build_query($fields),
	    				 CURLOPT_RETURNTRANSFER => true);
	    curl_setopt_array($ch, $options);
		$result = curl_exec($ch);
		curl_close($ch);

        return json_decode($result);
	}

	public function unLike($id, $accessToken) {

		$url = "https://api.instagram.com/v1/media/".$id."/likes?access_token=".$accessToken."";

		$ch = curl_init();

		$options = array(CURLOPT_URL => $url,
	    				 CURLOPT_CUSTOMREQUEST => "DELETE",
	    				 CURLOPT_RETURNTRANSFER => true);

	    curl_setopt_array($ch, $options);
	    $result = curl_exec($ch);
	    $result = json_decode($result);
	    curl_close($ch);

        return $result;
	}



	public function getStructuredArray($data) {

		$returnArray = array();
		$instaObj = $data->data;

		foreach ($instaObj as $obj) {
			$object = array();

			$object["type"] = $obj->type;
			$object["video"] = $obj->videos->low_resolution;
			$object["id"] = $obj->id;
			$object["username"] = $obj->user->username;
			$object["low_resolution"] = $obj->images->low_resolution->url;
			$object["standard_resolution"] = $obj->images->standard_resolution->url;
			$object["text"] = $obj->caption->text;
			$object["caption_profile_pic"] = $obj->caption->from->profile_picture;
			$object["likes"] = $obj->likes->count;
			$object["comments"] = $obj->comments->count;
			$object["tags"] = $obj->tags;
			$object["user_has_liked"] = $obj->user_has_liked;

			$returnArray["instagram"][] = $object;	
		}
 
		$pagination = array();
		
		if (!isset($_SESSION["signedIN"])) {
			$pagination["next_url"] = false;
		} else {
			$pagination["next_url"] = $data->pagination->next_url;
		}
		
		$returnArray["pagination"] = $pagination;

		return $returnArray;

	}


	/**
	 * @todo  Förbättra detta.
	 * @param  [type] $tag [description]
	 * @return [type]      [description]
	 */
	public function formatTag($tag) {

		$tag = str_replace(' ', '', $tag);
		$formated = trim($tag, '#');

		return $formated;
	}
}
