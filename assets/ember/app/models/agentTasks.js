telenor.AgentTasks = DS.Model.extend({
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
	//id: this.get('id'),polymorphic: true,
	task_id: DS.belongsTo('tasks', {
		async: true
	}),
	user_id: DS.belongsTo('users', {
		async: true
	}),
	sr_no: DS.attr(),
	sr_time: DS.attr(),
	other: DS.attr(),
	status: DS.attr(),
	uploaded: DS.attr(),
	uploaded_by: DS.belongsTo('users', {
		async: true
	})

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
telenor.AgentTask = DS.Model.extend({
	task_id: DS.attr(),
	user_id: DS.attr(),
	sr_no: DS.attr(),
	sr_time: DS.attr(),
	other: DS.attr(),
	status: DS.attr(),
	uploaded: DS.attr(),
	uploaded_by: DS.attr()
});
