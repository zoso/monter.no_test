$(document).ready(function() {
	var currentLocation = window.location;
    var searchLocation = currentLocation+"sok/?q=";
    var searchAPILocation = currentLocation+"api/searchsuggestion/?searchTerm=spiker";
	$("#typeahead").typeahead({
		source: {
			test: {
				ajax: {
					method: 'GET',
					url: searchAPILocation,
					data: {

					},
					callback: {
						done: function(data, status, jqhxr) {
							console.log(data);
							return data;
						}
					}
				} 
			}
		}
	});
});