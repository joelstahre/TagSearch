var J = J || {};

J.LocalStorage = function () {
	var that = this;

	this.storage = "tagsearch_tags";

}

/**
 * @return Boolean
 */
J.LocalStorage.prototype.isAvailable = function() {

	if(window.localStorage !== undefined){
    	return true;
	}else{
	    return false;
	}
}

/**
 * @return void
 */
J.LocalStorage.prototype.get = function() {
	
	if (this.isAvailable && localStorage.tagsearch_tags) {

		var tags = JSON.parse(localStorage[this.storage]),
			string = "Search history: ";

		tags.reverse();
		for (var i = 0; i < tags.length; i++) { 
			if (i > 4) {
				break;
			}
			else {
				if (i === 0) {
					string += tags[i];
				} else {
					string += " ," +tags[i];
				}
			}
		}

		$("#recent").html(string);
	}
}

/**
 * @return void
 */
J.LocalStorage.prototype.set = function(tag) {

	if (this.isAvailable) {

		if (localStorage.tagsearch_tags) {
			var tags = JSON.parse(localStorage[this.storage]);

			for (var i in tags) {
            	if (tags[i] == tag) {
                	return false;
            	}
        	}
		} else {
			var tags = Array();

		}
		tags.push(tag)
		localStorage[this.storage] = JSON.stringify(tags);
	}
}

