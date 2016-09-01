$(document).ready(function() {
	//https://localhost:44341/api/searchsuggestion/?searchTerm=spiker
	var engine = new Bloodhound({
		remote: {
			url: 'https://localhost:44341/api/searchsuggestion/?searchTerm=q',
			wildcard: 'q'
		},
		datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
		queryTokenizer: Bloodhound.tokenizers.whitespace
	});

	$('#multiple-datasets .typeahead').typeahead({
		highlight: true,
		minLength: 1,
		hint: true
	}, {
		source: engine.ttAdapter(),
		name: "products",
		templates: {
			empty: [
				'<div>Empty</div>'
			],
			header: [
				'<div>header</div>'
			],
			suggestion: function(data) {
				return '<a href="'+data.name+'">sadad</a>'
			}
		}
	}
	)
});