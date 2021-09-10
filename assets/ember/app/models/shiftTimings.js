telenor.ShiftTimings = DS.Model.extend({
	name:DS.attr(),
	from:DS.attr(),
	to:DS.attr(),
	hours:DS.attr(),//DS.belongsTo('users', {async: true}),
});
