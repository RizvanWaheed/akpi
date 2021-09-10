telenor.Mycomplaints = DS.Model.extend({
	msisdn:DS.attr(),
	department_id:DS.belongsTo('departments', {async: true}),
	sub_department_id:DS.belongsTo('departments', {async: true}),
	domain_id:DS.belongsTo('domains', {async: true}),
	category_id:DS.belongsTo('monitoringCategories', {async: true}),
	sub_category_id:DS.belongsTo('monitoringCategories', {async: true}),
	reason_id:DS.belongsTo('monitoringCategories', {async: true}),
	sub_reason_id:DS.belongsTo('monitoringCategories', {async: true}),
	caller_id:DS.belongsTo('callers', {async: true}),
	booking_id:DS.attr(),
	ticket_id:DS.attr(),
	remarks:DS.attr(),
	status:DS.attr(),
	state_id:DS.attr(),
	created:DS.attr(),
	created_by:DS.belongsTo('users', {async: true}),
	//hasmany
});