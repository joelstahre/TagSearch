var J = J || {};

J.Twitter = function () {
	var that = this;
	this.trends;
	this.requestPath = "backend/TwitterTrends.php";
	this.instagram = new J.Instagram();

}


J.Twitter.prototype.getTrends = function() {
	var that = this;

	$.ajax({
		type: "GET",
		  url: that.requestPath,

		  success: function(data){
		  		console.log("Twitter Trends (twitter.js): "+data);
	        	that.renderTrends(JSON.parse(data)); 
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
	});
}


J.Twitter.prototype.renderTrends = function(trends) {
	var that = this;
	this.trends = trends;
	trends.forEach(function(entry) {
		var trend = "<li><a href='#' class='tag'>"+entry+"</a></li>";
		$( "#trendsList" ).append(trend);
	});

	$(".tag").click( function() {
		that.instagram.getMedia($( this ).html());
	});
}

