telenor.Domains = DS.Model.extend({
	name:DS.attr(),
	parent_id:DS.attr(),//.belongsTo('domains', {async: true}),
	status:DS.attr(),
});