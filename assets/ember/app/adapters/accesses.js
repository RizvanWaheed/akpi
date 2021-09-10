telenor.AccessAdapter = DS.RESTAdapter.extend({
	host: javaScriptApiPath,
	//namespace: 'clients'
	/*pathForType: function(type) {
    	return Ember.String.underscore(type);
  	}*/
	buildURL: function (type, id) {
		var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
		//console.log(type); type is employee //console.log(id);this.singularize
		//var url = 'index.php/api/' + type + 's'; //this.pluralize(type.typeKey);
		var url = javaScriptApiPath + '/' + inflector.pluralize(type);
		if (id) {
			url += '/index/' + id;
		}
		// url += '.json';
		return url;
	}
});
