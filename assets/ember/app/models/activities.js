telenor.Activities = DS.Model.extend({
	ticket_no:DS.attr(),
//	department_id:DS.belongsTo('departments', {async: true}),
//	sub_department_id:DS.belongsTo('departments', {async: true}),
	monitoring_for_id:DS.belongsTo('monitoringFors', {async: true}),
	domain_id:DS.belongsTo('domains', {async: true}),
	email_driver_id:DS.belongsTo('monitoringCategories', {async: true}),
	email_sub_driver_id:DS.belongsTo('monitoringCategories', {async: true}),
	email_reason_id:DS.belongsTo('monitoringCategories', {async: true}),
	email_sub_reason_id:DS.belongsTo('monitoringCategories', {async: true}),
	booking_no:DS.attr(),
	ticket_process:DS.attr(),
	status:DS.attr(),
	baby_apollo:DS.attr(),
	created:DS.attr(),
	created_by:DS.belongsTo('users', {async: true}),
	activitiesAdjustments:DS.hasMany('activitiesAdjustment', {async: true}),
	activitiesEscalations:DS.hasMany('activitiesEscalation', {async: true}),
	modified:DS.attr(),
	modified_by:DS.attr()
	//hasmany
});
