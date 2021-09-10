telenor.ApplicationAdapter = DS.RESTAdapter.extend({
	headers: {
		'API_KEY': '1860-8285-8998-5828-0681',
		'ANOTHER_HEADER': 'muhammad-rizwan-waheed'
	},
	host: javaScriptApiPath,
	namespace: 'users_api',
	// host: "http://localhost:1234/",
	// pathForType: function(type) {
	//    return Ember.String.underscore(type);
	//  }
	// "http://localhost:1234/telenor/api/users_api";
});
