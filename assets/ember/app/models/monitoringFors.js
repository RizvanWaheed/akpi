telenor.MonitoringFors = DS.Model.extend({
	name:DS.attr(),
	status:DS.attr(),
	category_level:DS.attr()
//	user:DS.belongsTo('users', {async: true})
	
});