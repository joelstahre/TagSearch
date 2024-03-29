<?php
require_once("backend/SignIn.php");
session_start();

$signIn = new SignInHandler();

if (isset($_GET["signin"])) {
	$signIn->sendToInsta();
}

$signIn->check();
?>

<!doctype html>
<html lang='en'>
	<head>
		<meta charset='utf-8' />
		<title>Projekt - Webbteknik II</title>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
		<meta name='description' content='Projekt - Webbteknik II' />
		<link rel='stylesheet' href='//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css'>
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
		<link rel='stylesheet' href='public/css/style.css'>
	</head>
	<body>

		<div id='wrap'>

		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			    	<span class="sr-only">Toggle navigation</span>
			      	<span class="icon-bar"></span>
			      	<span class="icon-bar"></span>
			      	<span class="icon-bar"></span>
			    </button>
			   	<a class="navbar-brand" href="http://www.tagsearch.se/"><i class="fa fa-tags fa-lg"></i> tagsearch</a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				
			    <?php $signIn->searchBar(); ?>

			    <ul class="nav navbar-nav navbar-right">
			    	<?php $signIn->signInBar(); ?>
			      	<!--<li class="aboutLI"><a href="#">About</a></li>-->
			      	
			    </ul>
			</div><!-- /.navbar-collapse -->
		</nav>



		
			<div class='container'>
				<div id="tagHeader">
					<span id="tagLabel" class="label label-default hidden"></span>
				</div>
				<div class="row">
					<div class="col-md-3">
						<div class="box">
							<div class="trends-header">
			                    <h4>Top trends in Sweden on Twitter</h4>
			                </div>
			                <ul id="trendsList" class="nav nav-pills nav-stacked">
								
							</ul>
						</div>
					</div>

					<div id="media">
						<div class="col-md-9">
							<div class="jumbotron">
						  		<h1>Welcome to Tagsearch!</h1>
						  		<p id="jumboFirst">Do you love instagram? Well, we do!</p>
								<p>Here you get the latest trends from twitter, presented to you in the form of pictures from instagram.</p>
						  		<p>If you sign in, you will also get the incredible ability to search on your favorite topics, and spread your love by liking all the wonderful pictures.</p>
						  		<p>Why are you still here? Select a tag from the trend list, or sign in and start searching!</p>
							</div>
						</div>
					</div>
				</div>

				<div id="loadMoreDiv">
					<button type="button" id="loadMore" class="btn btn-default btn-lg hidden">Load more pictures <img id="buttonLoader" src="public/img/loader.gif" alt="loader symbol"></button>
				</div>
			</div>
		</div>
		
		<p id="back-top">
			<a href="#top"><span><i class="fa fa-arrow-circle-o-up"></i></span></a>
		</p>
		<div id='footer'>
	      	<div class='container'>
	        	<p class='text-muted'>Copyright 
	        		<a href='http://joelstahre.com'>Joel Stahre</a>
	        		<a href='https://github.com/joelstahre'> <i class="fa fa-github fa-lg"></i></a>
	        		<a href='https://www.facebook.com/joel.stahre'> <i class="fa fa-facebook fa-lg"></i></a>
	        		<a href='https://twitter.com/joelstahre'> <i class="fa fa-twitter fa-lg"></i></a>
	        		<a href='http://instagram.com/joelstahre'> <i class="fa fa-instagram fa-lg"></i></a>

	        	</p>
	      	</div>
	    </div>

	    <div id="loadingDiv"><img src="public/img/loader.gif" alt="loader symbol"></div>

		<script src='http://code.jquery.com/jquery-1.10.1.min.js'></script>
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
		<script src='public/js/App.js'></script>
		<script src='public/js/General.js'></script>
		<script src='public/js/LocalStorage.js'></script>
		<script src='public/js/Twitter.js'></script>
		<script src='public/js/Instagram.js'></script>
		<script src='public/js/InstaHTML.js'></script>
		<script src='public/js/InstaMedia.js'></script>
		<script src='public/js/Ajax.js'></script>
	</body>
</html>
