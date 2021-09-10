telenor.ChatNotes = DS.Model.extend({
	sent:DS.attr(),
	message:DS.attr(),
	stat:DS.attr(),
	from_id:DS.belongsTo('users', {async: true}),
	to_id: DS.belongsTo('users', {async: true}),
	recd:DS.attr()
});