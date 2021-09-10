telenor.Areas = DS.Model.extend({
	name:DS.attr(),
	region_id:DS.belongsTo('regions', {async: true}),
	status:DS.attr(),
});