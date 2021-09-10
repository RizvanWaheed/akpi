telenor.MonitoringFor = DS.Model.extend({
	name:DS.attr(),
	status:DS.attr(),
	category_level:DS.attr()
//	user:DS.belongsTo('user', {async: true})
	
});