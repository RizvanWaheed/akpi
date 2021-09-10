telenor.Tasks = DS.Model.extend({
	// ticket_no: DS.attr(),
	//	department_id:DS.belongsTo('departments', {async: true}),
	//	sub_department_id:DS.belongsTo('departments', {async: true}),
	// monitoring_for_id: DS.belongsTo('monitoringFors', {
	// 	async: true
	// }),
	// domain_id: DS.belongsTo('domains', {
	// 	async: true
	// }),
	// email_driver_id: DS.belongsTo('monitoringCategories', {
	// 	async: true
	// }),
	// email_sub_driver_id: DS.belongsTo('monitoringCategories', {
	// 	async: true
	// }),
	// email_reason_id: DS.belongsTo('monitoringCategories', {
	// 	async: true
	// }),
	// email_sub_reason_id: DS.belongsTo('monitoringCategories', {
	// 	async: true
	// }),
	// task_id: DS.attr(),
	// user_id: DS.belongsTo('users', {
	// 	async: true
	// }),
	name: DS.attr(),
	parent_id: DS.belongsTo('task', {
		async: true
	}),
	category: DS.attr(),
	tat: DS.attr(),
	active: DS.attr(),
	children: DS.attr()
	//  DS.hasMany('tasks', {
	// 	async: true
	// }) //,
	// uploaded_by: DS.belongsTo('users', {
	// 	async: true
	// }),
	// uploaded: DS.attr()

	// hasmany
	// baby_apollo: DS.attr(),
	// created: DS.attr(),
	// created_by: DS.belongsTo('users', {
	// 	async: true
	// }),
	// activitiesAdjustments: DS.hasMany('activitiesAdjustment', {
	// 	async: true
	// }),
	// activitiesEscalations: DS.hasMany('activitiesEscalation', {
	// 	async: true
	// }),
});
telenor.Task = DS.Model.extend({
	name: DS.attr(),
	parent_id: DS.attr(),
	category: DS.attr(),
	tat: DS.attr(),
	active: DS.attr() //,
	// uploaded: DS.attr(),
	// uploaded_by: DS.attr()
});
