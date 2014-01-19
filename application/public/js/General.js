var J = J || {};

J.General = function (instagram) {
	var that = this;

	this.instagram = instagram;
	this.ls = new J.LocalStorage();
}

/**
 * @return void
 */
J.General.prototype.coreFunctions = function() {
	var that = this;

	that.ls.get();

	// Search button functionality
	$("#searchBTN").click( function() {
		that.searchForm();
	});
	$('input').keypress(function(e) {
        if(e.which == 13) {
        	e.preventDefault();
           	that.searchForm();
        }
    });


	// Back to Top functionality
	$("#back-top").hide();
	
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	
}

/**
 * @return void
 */
J.General.prototype.searchForm = function() { 
	var that = this;

	var searchField = $("#searchField");
	var tag = this.htmlEntities(searchField.val());

	if (tag === "") {
		searchField.addClass('formError');
		searchField.attr({placeholder: 'Can not be emtpy'});			
	} else {
		searchField.val("");
		searchField.removeClass('formError');
		searchField.attr({placeholder: 'Search tag'});
		that.instagram.getMedia(tag);
		that.ls.set(tag);
		that.ls.get();
	} 

}

/**
 * @param  string str
 * @return string
 */
J.General.prototype.htmlEntities = function(str) { 
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}