telenor.VocSetups = DS.Model.extend({
	//id: DS.attr(),
	name: DS.attr(),
	slug: DS.attr(),
	parent_id: DS.attr(),
	base_id: DS.attr(),
	created: DS.attr(),
	created_by: DS.attr(),
	status: DS.attr(),
	modified_by: DS.attr(),
	modified: DS.attr(),
	level: DS.attr(),
	type: DS.attr()

	//	user:DS.belongsTo('users', {async: true})

});
