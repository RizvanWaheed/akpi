telenor.DepartmentAdapter = DS.RESTAdapter.extend({
	namespace: javaScriptApiPath,
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
	},
	// createRecord: function(store, type, record) {
	// 	var data = {};
	// 	var serializer = store.serializerFor(type.typeKey);

	// 	serializer.serializeIntoHash(data, type, record, { includeId: true });

	// 	//return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
	// 	return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
	// },	
	// updateRecord: function(store, type, record) {
	// 	var data = {};
	// 	var serializer = store.serializerFor(type.typeKey);

	// 	serializer.serializeIntoHash(data, type, record);

	// 	var id = get(record, 'id');
	// 	// you could do the same here, but it's even more incorrect
	// 	return this.ajax(this.buildURL(type.typeKey, id), "PUT", { data: data });
	// }
});
