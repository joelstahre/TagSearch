var J = J || {};

J.InstaHTML = function () {
	var that = this;

}

J.InstaHTML.prototype.createMediaBox = function(instaMedia) {

	var type = "";
		if (instaMedia.type == "video") {
			type = '<i class="fa fa-video-camera"></i>';
		} else {
			type = '<i class="fa fa-picture-o"></i>';						
		}

		var box = '<div class="col-md-3">'+
						'<div id="'+instaMedia.id+'" class="box">'+
							'<div class="image-box">'+
								'<a class="group" rel="group1" href="#">'+
						 			'<img src="'+instaMedia.low_resolution+'" />' + 
								'</a>'+
							'</div>'+
							'<div class="stats-box">'+
								'<div class="stats-inner">'+
									'<ul>'+
										'<li><i class="fa fa-heart"></i> '+instaMedia.likes+'</li>'+
										'<li><i class="fa fa-comments"></i> '+instaMedia.comments+'</li>'+
									'</ul>'+
								'</div>'+
							'</div>'+
						'<div class="type-box">'+
							type+
						'</div>'+
					'</div>'+
					'</div>';

	$( "#media" ).append(box);
}

J.InstaHTML.prototype.createModal = function(instaMedia) { 
	var that = this;

	var type = "";
		if (instaMedia.type == "video") {
			type = '<video class="modal-img video" width="440" height="440" controls>'+
						  '<source src="'+instaMedia.video_URL+'" type="video/mp4">'+
						  'Your browser does not support the video tag.'+
						'</video>';
		} else {
			type = '<img class="modal-img" src="'+instaMedia.low_resolution+'" />';						
		}

	var modal = '<div id="'+instaMedia.id+'modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				  '<div class="modal-dialog">'+
				    '<div class="modal-content">'+
				      '<div class="modal-header">'+
				        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
				        '<h4 class="modal-title" id="myModalLabel">'+instaMedia.username+'</h4>'+
				      '</div>'+
				      '<div class="modal-body">'+
				      	'<div class="modal-inner">'+
					        type+

					        '<div class="media modal-aside">'+
					        	'<img class="pull-left modal-aside-pic" src="'+instaMedia.caption_profile_pic+'" />'+
					        	'<div class="media-body">'+
					        		'<h4 class="media-heading">'+instaMedia.username+'</h4>'+
					        		instaMedia.text+
					        	'</div>'+
					        	
					        '</div>'+


				      	'</div>'+
				      '</div>'+
				      '<div class="modal-footer">'+

				      	'<div class="like">'+
					        	this.Like(instaMedia.user_has_liked, instaMedia.id)+
					        '</div>'+

				        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
				      '</div>'+
				    '</div>'+
				  '</div>'+
				'</div>';

	return modal;
}



J.InstaHTML.prototype.Like = function(like, id) { 

	if (like != null) {
		if (like == true) {
			return "<span id='"+id+"like'><a href'#'><i class='fa fa-heart'></i> </a></span>";
		} else {
			return "<span id='"+id+"like'><a href='#'><i class='fa fa-heart-o'></i> </a></span>";
		}
	} else {
		return "You must sign in to like";
	}
}

J.InstaHTML.prototype.updateLike = function(liked) { 

	if (liked) {
		return "<a href'#'><i class='fa fa-heart'></i> </a>";
	} else {
		return "<a href'#'><i class='fa fa-heart-o'></i> </a>";
	}
}



J.InstaHTML.prototype.noMediaFound = function() { 
	var box = '<div class="col-md-6">'+
					'<div class="no-media well well-sm">'+
						'<i class="fa fa-frown-o fa-4x"></i> Awww, no Instamedia found, try another tag!'+
			  		'</div>'+
			  '</div>';

	return box;
}



