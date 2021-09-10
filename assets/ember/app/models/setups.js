telenor.Setup = DS.Model.extend({
	name: DS.attr(),
	group: DS.attr(),
	slug: DS.attr(),
	parent_id: DS.attr(),
	base_id: DS.attr(),
	status: DS.attr(),
	type: DS.attr()
});
telenor.Setups = DS.Model.extend({
	name: DS.attr(),
	group: DS.attr(),
	slug: DS.attr(),
	status: DS.attr(),
	type: DS.attr(),

	parent_id: DS.belongsTo('setup', {
		async: true
	}),
	base_id: DS.belongsTo('setup', {
		async: true
	})
	// territory_id: DS.belongsTo('departments', {
	// 	async: true
	// }),
	// reporting_id: DS.belongsTo('user', {
	// 	async: true
	// }), //belongsTo('users', {async: true})
	// hasmany
});
