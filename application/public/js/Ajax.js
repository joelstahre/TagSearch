var J = J || {};

J.Ajax = function (instagram, instaHTML) {
	var that = this;
	
	this.instagram = instagram;
	this.instaHTML = instaHTML;
}

J.Ajax.prototype.getMedia = function(requestPath, tag) {
	var that = this;

	$.ajax({
		type: "GET",
		  url: requestPath,
		  data: {tag: tag},
		  success: function(data){
		  		//console.log("Instagram data (instagram.js): "+data);
		  		
		  		if (data == "ERROR") {
					that.instagram.noMediaFound();
				} else {
					$('#loadingDiv').hide();
					var media = JSON.parse(data);

					if (media.instagram == null) {
					  	that.instagram.noMediaFound();
					} else {
					  	//console.log(data);
					  	that.instagram.renderMedia(media);
					}
				}
		  		
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
	});

}

J.Ajax.prototype.Like = function(requestPath, id) {
	var that = this;

	$.ajax({
		type: "GET",
		  url: requestPath,
		  data: {like: id},
		  success: function(data){
		  		
		  		var parsed = JSON.parse(data);

		  		if (parsed.meta.code == 200) {


		  			$("#"+id+"like").html(that.instaHTML.updateLike(true));
		  			console.log("japp");
		  		}

		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
	});
}

J.Ajax.prototype.UnLike = function(requestPath, id) {
	var that = this;

	$.ajax({
		type: "GET",
		  url: requestPath,
		  data: {unlike: id},
		  success: function(data){

		  		var parsed = JSON.parse(data);

		  		if (parsed.meta.code == 200) {
		  			$("#"+id+"like").html(that.instaHTML.updateLike(false));
		  		}
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
	});
	

}


J.Ajax.prototype.loadMoreMedia = function(requestPath, nextMediaSet) {
	var that = this;

	$.ajax({
		type: "GET",
		  url: requestPath,
		  data: {url: nextMediaSet},
		  success: function(data){
		  		//console.log("Instagram data (instagram.js): "+data);
		  		if (data == "ERROR") {
		  			that.instagram.noMediaFound();
		  		} else {
		  			$('#loadingDiv').hide();
		  			$('#buttonLoader').hide();
		  			//console.log(data);
		  			that.instagram.renderMedia(JSON.parse(data));
		  		}
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
		});

}