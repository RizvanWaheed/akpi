telenor.ActivitiesEscalations = DS.Model.extend({
	activity_id:DS.belongsTo('activities'),
	name:DS.attr(), //DS.belongsTo('headlines', {async: true}),
	contact: DS.attr(),
	email:DS.attr(),
	department_id:DS.belongsTo('departments'),
	sub_department_id:DS.belongsTo('departments'),
	comment:DS.attr(),
	attach:DS.attr(),
	created:DS.attr(),
	created_by:DS.attr()

});
