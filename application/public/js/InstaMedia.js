var J = J || {};

J.InstaMedia = function (media) {
	var that = this;
	this.media = media;
}

J.InstaMedia.prototype.createMediaBox = function() {

	var media = this.media;

	var type = "";
		if (media.type == "video") {
			type = '<video width="223" height="223" controls>'+
						  '<source src="'+media.video+'" type="video/mp4">'+
						  'Your browser does not support the video tag.'+
						'</video>';
		} else {
			type = '<img src="'+media.low_resolution+'" />';						
		}

		var box = '<div class="col-md-3">'+
						'<div id="'+media.id+'" class="box">'+
							'<div class="image-box">'+
								'<a class="group" rel="group1" href="#">'+
						 			type + 
								'</a>'+
							'</div>'+
							'<div class="stats-box">'+
								'<div class="stats-inner">'+
									'<ul>'+
										'<li><i class="fa fa-heart"></i> '+media.likes+'</li>'+
										'<li><i class="fa fa-comments"></i> '+media.comments+'</li>'+
									'</ul>'+
								'</div>'+
							'</div>'+
						'<div class="tags-box">'+
							'<i class="fa fa-tags"></i> '+
						'</div>'+
					'</div>'+
					'</div>';


	return box;


}
