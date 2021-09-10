telenor.Emaildriver = DS.Model.extend({
	name:DS.attr(),
	monitoring_for_id:DS.attr(),
	status:DS.attr(),
	parent_id:DS.attr(),

//	user:DS.belongsTo('user', {async: true})
	
});