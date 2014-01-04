<?php
require_once("signIn.php");
session_start();

check();

?>

<!doctype html>
<html lang='sv'>
	<head>
		<meta charset='utf-8' />
		<title>Projekt - Webbteknik II</title>
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
				
			    <?php searchBar(); ?>

			    <ul class="nav navbar-nav navbar-right">
			    	<?php signInBar(); ?>
			      	<li><a href="#">About</a></li>
			      	
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
			                    <h3>Top trends on Twitter right now</h3>
			                </div>
			                <ul id="trendsList" class="nav nav-pills nav-stacked">
								
							</ul>
						</div>
					</div>

					<div id="media">



					</div>
				</div>

				<div id="loadMoreDiv">
					<button type="button" id="loadMore" class="btn btn-default btn-lg hidden">Load more pictures <img id="buttonLoader" src="public/img/loader.gif" alt="loader symbol"></button>

				</div>
			</div>
		</div>
		
				
		<div id='footer'>
	      	<div class='container'>
	        	<p class='text-muted'>Copyright 
	        		<a href='http://joelstahre.com'>Joel Stahre</a>
	        		<a href='http://joelstahre.com'> <i class="fa fa-github fa-lg"></i></a>
	        		<a href='http://joelstahre.com'> <i class="fa fa-facebook fa-lg"></i></a>
	        		<a href='http://joelstahre.com'> <i class="fa fa-twitter fa-lg"></i></a>
	        		<a href='http://joelstahre.com'> <i class="fa fa-instagram fa-lg"></i></a>

	        	</p>
	      	</div>
	    </div>

	    <div id="loadingDiv"><img src="public/img/loader.gif" alt="loader symbol"></div>

		<script src='http://code.jquery.com/jquery-1.10.1.min.js'></script>
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
		<script src='public/js/App.js'></script>
		<script src='public/js/Twitter.js'></script>
		<script src='public/js/Instagram.js'></script>
		<script src='public/js/InstaMedia.js'></script>
	</body>
</html>