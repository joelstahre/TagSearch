var J = J || {};

J.Instagram = function () {
	var that = this;
	this.requestPath = "backend/functions.php";

	this.oldTag = "";
	this.currentTag = "";
	this.newTag = false;

	this.nextMediaSet = "";


}


J.Instagram.prototype.getMedia = function(tag) {
	var that = this;

	this.currentTag = tag;

	//Cleara sidan ifall man klickar på samma tag igen, så det inte blir dubbelt.
	if (this.currentTag == this.oldTag) {
		that.clearMedia();
	}
	$('#loadingDiv').show();

	$.ajax({
		type: "GET",
		  url: that.requestPath,
		  data: {tag: tag},
		  success: function(data){
		  		//console.log("Instagram data (instagram.js): "+data);
		  		if (data == "ERROR") {
		  			that.noMediaFound();
		  		} else {
		  			$('#loadingDiv').hide();
		  			var media = JSON.parse(data);

		  			if (media.instagram == null) {
		  				that.noMediaFound();
		  			} else {
		  				//console.log(data);
		  				that.renderMediaTest(media);
		  			}
		  		}
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
		});

}

J.Instagram.prototype.loadMoreMedia = function() {
	var that = this;

	$('#loadingDiv').show();
	$('#buttonLoader').show();

	$.ajax({
		type: "GET",
		  url: that.requestPath,
		  data: {url: that.nextMediaSet},
		  success: function(data){
		  		//console.log("Instagram data (instagram.js): "+data);
		  		if (data == "ERROR") {
		  			that.noMediaFound();
		  		} else {
		  			$('#loadingDiv').hide();
		  			$('#buttonLoader').hide();
		  			//console.log(data);
		  			that.renderMedia(JSON.parse(data));
		  		}
		  },
		 
		  error: function(jqXHR, textStatus, errorThrown){
		    console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);    
		  },
		});

}

J.Instagram.prototype.renderMediaTest = function(media) {
	var that = this;
	//console.log(media);

	if (this.currentTag != this.oldTag) {
		that.clearMedia();
	}

	media["instagram"].forEach(function(entry) {


		var instaMedia = new J.InstaMedia(entry);

		var box = instaMedia.createMediaBox();


		$( "#media" ).append(box);

		var mediaModal = that.createModal(entry);

		//TODO: koppla click eventet på nått bättre sett?
		$("#"+entry.id+"").click( function() {
			$(mediaModal).modal('show');
			return false;
		});
	});

	this.nextMediaSet = media["pagination"].next_url;
	console.log(this.nextMediaSet);
	
	$("#tagLabel").removeClass('hidden');
	$("#tagLabel").html(this.currentTag);

	if (this.nextMediaSet != null) {
		$("#loadMore").removeClass('hidden');
	} else {
		$("#loadMore").addClass('hidden');
	}

	this.oldTag = this.currentTag;
}




































J.Instagram.prototype.renderMedia = function(media) {
	var that = this;
	//console.log(media);

	if (this.currentTag != this.oldTag) {
		that.clearMedia();
	}

	media["instagram"].forEach(function(entry) {

		var type = "";
		if (entry.type == "video") {
			type = '<video width="223" height="223" controls>'+
						  '<source src="'+entry.video+'" type="video/mp4">'+
						  'Your browser does not support the video tag.'+
						'</video>';
		} else {
			type = '<img src="'+entry.low_resolution+'" />';						
		}

		var box = '<div class="col-md-3">'+
						'<div id="'+entry.id+'" class="box">'+
							'<div class="image-box">'+
								'<a class="group" rel="group1" href="#">'+
						 			type + 
								'</a>'+
							'</div>'+
							'<div class="stats-box">'+
								'<div class="stats-inner">'+
									'<ul>'+
										'<li><i class="fa fa-heart"></i> '+entry.likes+'</li>'+
										'<li><i class="fa fa-comments"></i> '+entry.comments+'</li>'+
									'</ul>'+
								'</div>'+
							'</div>'+
						'<div class="tags-box">'+
							'<i class="fa fa-tags"></i> '+
						'</div>'+
					'</div>'+
					'</div>';

		$( "#media" ).append(box);

		var mediaModal = that.createModal(entry);

		//TODO: koppla click eventet på nått bättre sett?
		$("#"+entry.id+"").click( function() {
			$(mediaModal).modal('show');
			return false;
		});
	});

	this.nextMediaSet = media["pagination"].next_url;
	console.log(this.nextMediaSet);
	
	$("#tagLabel").removeClass('hidden');
	$("#tagLabel").html(this.currentTag);

	if (this.nextMediaSet != null) {
		$("#loadMore").removeClass('hidden');
	} else {
		$("#loadMore").addClass('hidden');
	}

	this.oldTag = this.currentTag;
}

J.Instagram.prototype.createModal = function(media) {

	var type = "";
		if (media.type == "video") {
			type = '<video class="modal-img" width="440" height="440" controls>'+
						  '<source src="'+media.video+'" type="video/mp4">'+
						  'Your browser does not support the video tag.'+
						'</video>';
		} else {
			type = '<img class="modal-img" src="'+media.low_resolution+'" />';						
		}

	var modal = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				  '<div class="modal-dialog">'+
				    '<div class="modal-content">'+
				      '<div class="modal-header">'+
				        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
				        '<h4 class="modal-title" id="myModalLabel">'+media.username+'</h4>'+
				      '</div>'+
				      '<div class="modal-body">'+
				      	'<div class="modal-inner">'+
					        type+

					        '<div class="media modal-aside">'+
					        	'<img class="pull-left modal-aside-pic" src="'+media.caption_profile_pic+'" />'+
					        	'<div class="media-body">'+
					        		'<h4 class="media-heading">'+media.username+'</h4>'+
					        		media.text+
					        	'</div>'
					        '</div>'+

				      	'</div>'+
				      '</div>'+
				      '<div class="modal-footer">'+
				        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
				      '</div>'+
				    '</div>'+
				  '</div>'+
				'</div>';

	return modal;

}

J.Instagram.prototype.noMediaFound = function() {
	var that = this;
	this.clearMedia();
	$("#tagLabel").addClass('hidden');
	var box = '<div class="col-md-6">'+
					'<div class="no-media well well-sm">'+
						'<i class="fa fa-frown-o fa-4x"></i> Awww, no Instamedia found, try another tag!'+
			  		'</div>'+
			  '</div>';
	
	$( "#media" ).append(box);
	$("#loadMore").addClass('hidden');
}

J.Instagram.prototype.clearMedia = function() {
	var that = this;
	$("#media").empty();
	$(".modal").remove();
	
}