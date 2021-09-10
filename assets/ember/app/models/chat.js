telenor.Chat = DS.Model.extend({
	sent:DS.attr(),
	message:DS.attr(),
	from_id:DS.attr(),
	to_id: DS.attr(),
	recd:DS.attr(),
	stat:DS.attr(),
});