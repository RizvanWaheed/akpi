telenor.Reportings = DS.Model.extend({
	name:DS.attr(),
	role_id: DS.belongsTo('roles', {async: true})
});