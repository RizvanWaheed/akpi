telenor.Vocs = DS.Model.extend({
	trials: DS.attr(),
	connectivity_status: DS.belongsTo('vocSetup', {
		async: true
	}),
	satisfaction_status: DS.belongsTo('vocSetup', {
		async: true
	}),
	campaign: DS.belongsTo('vocSetup', {
		async: true
	}),
	segment: DS.belongsTo('vocSetup', {
		async: true
	}),
	dsat_reason: DS.belongsTo('vocSetup', {
		async: true
	}),
	category: DS.belongsTo('vocSetup', {
		async: true
	}),
	created_by: DS.belongsTo('user', {
		async: true
	}),
	created: DS.attr('date')

});
