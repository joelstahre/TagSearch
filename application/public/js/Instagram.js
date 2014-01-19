var J = J || {};

J.Instagram = function () {
	var that = this;

	this.oldTag = "";
	this.currentTag = "";
	this.newTag = false;

	this.nextMediaSet = "";

	this.InstaHTML = new J.InstaHTML();
	this.ajax = new J.Ajax(this, this.InstaHTML);
}

/**
 * @param  string tag
 * @return void
 */
J.Instagram.prototype.getMedia = function(tag) {
	var that = this;

	this.currentTag = tag;

	// Clear media if user clicks on the same tag again.
	if (this.currentTag == this.oldTag) {
		that.clearMedia();
	}
	$('#loadingDiv').show();

	// Ajax Request.
	this.ajax.request("tag", tag);
}


/**
 * @return void
 */
J.Instagram.prototype.loadMoreMedia = function() {
	var that = this;

	$('#loadingDiv').show();
	$('#buttonLoader').show();

	// Ajax Request.
	this.ajax.request("loadMore", this.nextMediaSet);

}

/**
 * @param  array media
 * @return void
 */
J.Instagram.prototype.renderMedia = function(media) {
	var that = this;
	//console.log(media);

	// If user has searched on a new tag, clear old media.
	if (this.currentTag != this.oldTag) {
		that.clearMedia();
	}


	media["instagram"].forEach(function(entry) {

		var instaMedia = new J.InstaMedia(entry)

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
				that.ajax.request("unlike", instaID);
				instaMedia.user_has_liked = false;
				return false;
			} else {

				// Ajax Request.
				that.ajax.request("like", instaID);
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


	this.nextMediaSet = media["pagination"].next_url;
	
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
	$("#loadMore").click( function() {
		that.loadMoreMedia();
	});	

}

/**
 * @return void
 */
J.Instagram.prototype.noMediaFound = function() {
	var that = this;
	this.clearMedia();
	$("#tagLabel").addClass('hidden');
	var box = that.InstaHTML.noMediaFound();
	
	$( "#media" ).append(box);
	$("#loadMore").addClass('hidden');
	$('#loadingDiv').hide();
}

/**
 * @return void
 */
J.Instagram.prototype.clearMedia = function() {
	var that = this;
	$("#media").empty();
	$(".modal").remove();
	
}