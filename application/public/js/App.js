var J = J || {};

J.App = function () {
	var that = this;

	this.twitter = new J.Twitter();
	this.instagram = new J.Instagram();

	this.twitterTrends;
}

J.App.prototype.init = function () { 
	this.twitter.getTrends();
	this.registerClickEvents();
}

J.App.prototype.registerClickEvents = function () { 
	var that = this;

	$("#searchBTN").click( function() {
		//TODO: Möjlig felhantering här, eller sköta det vid succsses ajax.
		var searchField = $("#searchField");
		var tag = searchField.val();
		if (tag === "") {
			searchField.addClass('formError');
			searchField.attr({placeholder: 'Can not be emtpy'});			
		} else {
			searchField.val("");
			searchField.removeClass('formError');
			searchField.attr({placeholder: 'Search tag'});
			that.instagram.getMedia(tag);
		}
	});

	
}


window.onload = function() {
	var app = new J.App();
	app.init();

	console.log(app);
}