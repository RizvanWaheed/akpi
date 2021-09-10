telenor.ActivitiesAdjustments = DS.Model.extend({
	activity_id:DS.belongsTo('activities'),
	amount:DS.attr(), //DS.belongsTo('headlines', {async: true}),
	customer_adjustment: DS.attr(),
	comment:DS.attr(),
	captain_adjustment:DS.attr(),
	created:DS.attr(),
	created_by:DS.attr()

});