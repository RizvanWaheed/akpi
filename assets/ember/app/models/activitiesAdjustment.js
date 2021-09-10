telenor.ActivitiesAdjustment = DS.Model.extend({
	activity_id:DS.attr(),
	amount:DS.attr(), //DS.belongsTo('headlines', {async: true}),
	customer_adjustment: DS.attr(),
	comment:DS.attr(),
	captain_adjustment:DS.attr(),
	created:DS.attr(),
	created_by:DS.attr()
});