var J = J || {};

J.Ajax = function (instagram, instaHTML) {
	var that = this;
	
	this.instagram = instagram;
	this.instaHTML = instaHTML;
	this.requestPath = "backend/functions.php";
}

/**
 * @param  string action
 * @param  string type
 */
J.Ajax.prototype.request = function(action, type) {
	var that = this;

	$.ajax({
		type: "GET",
		  url: that.requestPath,
		  data: {action: action, data: type},
		  success: function(data){

		  		//tag
		  		if (action === "tag") {
		  			if (data == "ERROR") {
						that.instagram.noMediaFound();
					} else {
						$('#loadingDiv').hide();
						var media = JSON.parse(data);

						if (media.instagram == null) {
						  	that.instagram.noMediaFound();
						} else {
						  	that.instagram.renderMedia(media);
						}
					}
		  		}

		  		//loadMore
		  		if (action === "loadMore") {
		  			if (data == "ERROR") {
			  			that.instagram.noMediaFound();
			  		} else {
			  			$('#loadingDiv').hide();
			  			$('#buttonLoader').hide();

			  			var media = JSON.parse(data);
			  			that.instagram.renderMedia(media);
			  		}
		  		}

		  		//like
		  		if (action === "like") {
		  			var parsed = JSON.parse(data);

		  			if (parsed.meta.code == 200) {
			  			$("#"+type+"like").html(that.instaHTML.updateLike(true));
		  			} else {$("#"+type+"like").html(that.instaHTML.likeError());}
		  		}

		  		//unlike
		  		if (action === "unlike") {
		  			var parsed = JSON.parse(data);

			  		if (parsed.meta.code == 200) {
			  			$("#"+type+"like").html(that.instaHTML.updateLike(false));
			  		} else {$("#"+type+"like").html(that.instaHTML.likeError());}
		  		}
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
	});

}


