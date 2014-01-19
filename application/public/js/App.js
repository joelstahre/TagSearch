var J = J || {};

J.App = function () {
	var that = this;


	this.twitter = new J.Twitter();
	this.instagram = new J.Instagram();
	this.general = new J.General(this.instagram);
}

J.App.prototype.init = function () { 
	this.general.coreFunctions();
	this.twitter.getTrends();
	
}


window.onload = function() {
	var app = new J.App();
	app.init();
	//console.log(app);
}