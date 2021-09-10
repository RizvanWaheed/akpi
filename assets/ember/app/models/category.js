telenor.Category = DS.Model.extend({
	name:DS.attr(),
	status:DS.attr(),
	type:DS.attr(),
	parent_id:DS.attr()
	//user:DS.belongsTo('complains', {async: true})
	
});