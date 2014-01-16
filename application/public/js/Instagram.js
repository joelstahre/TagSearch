var J = J || {};

J.Instagram = function () {
	var that = this;
	this.requestPath = "backend/functions.php";

	this.oldTag = "";
	this.currentTag = "";
	this.newTag = false;

	this.nextMediaSet = "";

	this.InstaHTML = new J.InstaHTML();
	this.ajax = new J.Ajax(this, this.InstaHTML);
}


J.Instagram.prototype.getMedia = function(tag) {
	var that = this;

	this.currentTag = tag;

	// Clear media if user clicks on the same tag again.
	if (this.currentTag == this.oldTag) {
		that.clearMedia();
	}
	$('#loadingDiv').show();

	// Ajax Request.
	this.ajax.getMedia(this.requestPath, tag);
}



J.Instagram.prototype.loadMoreMedia = function() {
	var that = this;

	$('#loadingDiv').show();
	$('#buttonLoader').show();

	// Ajax Request.
	this.ajax.loadMoreMedia(this.requestPath, this.nextMediaSet);

}

J.Instagram.prototype.renderMedia = function(media) {
	var that = this;
	//console.log(media);

	// If user has searched on a new tag, clear old media.
	if (this.currentTag != this.oldTag) {
		that.clearMedia();
	}

	var mediaArray = new Array();

	media["instagram"].forEach(function(entry) {

		var instaMedia = new J.InstaMedia(entry)

		mediaArray.push(instaMedia);


		that.InstaHTML.createMediaBox(instaMedia);
		var modal = that.InstaHTML.createModal(instaMedia),
			instaID = instaMedia.id,
			modalID = instaMedia.id+"modal",
			likeID = instaMedia.id+"like";



		//Modal functionality.
		$("#media").append(modal);
		$("#"+instaID+"").click( function() {
			$("#"+modalID+"").modal('show');
			return false;
		});
		
		
		// Like and Unlike functionality.
		$(document).on("click", "#"+likeID+"", function(event){
			if (instaMedia.user_has_liked) {

				// Ajax Request.
				that.ajax.UnLike(that.requestPath, instaID);
				instaMedia.user_has_liked = false;
				return false;
			} else {

				// Ajax Request.
				that.ajax.Like(that.requestPath, instaID);
				instaMedia.user_has_liked = true;
				return false;
			}
		});


		// When modal hide, pause video.
		var video = ""; 
		$("video").click(function(e) {
			video = this;	
		});

		$("#"+modalID+"").on('hidden.bs.modal', function (e) {
			if (video && !video.paused) {
	           	video.pause();
           	}
		});

	});

	console.log(mediaArray);


	this.nextMediaSet = media["pagination"].next_url;
	console.log(this.nextMediaSet);
	
	$("#tagLabel").removeClass('hidden');
	$("#tagLabel").html(this.currentTag);


	// Prevent not logged in users to load more results.
	// Or if there is no more results.
	if (this.nextMediaSet == null || this.nextMediaSet == false) {
		$("#loadMore").addClass('hidden');
	} else {
		$("#loadMore").removeClass('hidden');
	}

	this.oldTag = this.currentTag;

	
	$('#loadMore').off('click');
	// Flytta denna skiten
	$("#loadMore").click( function() {
		that.loadMoreMedia();

	});	


}



J.Instagram.prototype.noMediaFound = function() {
	var that = this;
	this.clearMedia();
	$("#tagLabel").addClass('hidden');
	var box = that.InstaHTML.noMediaFound();
	
	$( "#media" ).append(box);
	$("#loadMore").addClass('hidden');
}

J.Instagram.prototype.clearMedia = function() {
	var that = this;
	$("#media").empty();
	$(".modal").remove();
	
}