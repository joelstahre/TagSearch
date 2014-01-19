var J = J || {};

J.InstaMedia = function (entry) {
	var that = this;
	
	this.link = entry.link;
	this.id = entry.id;
	this.type = entry.type;
	this.video_URL = "";
	this.low_resolution = entry.low_resolution;
	this.username = entry.username;
	this.caption_profile_pic = entry.caption_profile_pic;
	this.text = entry.text;
	this.user_has_liked = entry.user_has_liked;

	this.likes = entry.likes;
	this.comments = entry.comments;


	if (this.type == "video") {
		this.video_URL = entry.video.url;
	}


}