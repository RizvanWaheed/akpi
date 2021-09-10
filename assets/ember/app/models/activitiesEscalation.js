telenor.ActivitiesEscalation = DS.Model.extend({
	activity_id:DS.attr(),
	name:DS.attr(), //DS.belongsTo('headlines', {async: true}),
	contact: DS.attr(),
	email:DS.attr(),
	department_id:DS.attr(),
	sub_department_id:DS.attr(),
	comment:DS.attr(),
	attach:DS.attr(),
	created:DS.attr(),
	created_by:DS.attr()
});
