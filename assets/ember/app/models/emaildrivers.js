telenor.Emaildrivers = DS.Model.extend({
	name:DS.attr(),
	monitoring_for_id:DS.belongsTo('MonitoringFors', {async: true}),
	status:DS.attr(),
	parent_id:DS.belongsTo('Emaildriver', {async: true}),
//	user:DS.belongsTo('users', {async: true})
	
});