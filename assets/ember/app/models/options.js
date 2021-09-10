telenor.Options = DS.Model.extend({
	name:DS.attr(),
	status:DS.attr(),
	category:DS.attr(),
	slug:DS.attr(),
	parent_id:DS.attr()
});