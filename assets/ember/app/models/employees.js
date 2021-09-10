telenor.Employees = DS.Model.extend({
	name:DS.attr(),
	employee_name:DS.attr(),
	//password:DS.attr(),
	//login:DS.attr(),
	active:DS.attr(),
	role_id: DS.belongsTo('roles', {async: true}),
	area_id: DS.belongsTo('domains', {async: true}),
	territory_id: DS.belongsTo('departments', {async: true}),
	reporting_id: DS.belongsTo('employee', {async: true}),
	//reporting_id: DS.attr()//belongsTo('employees', {async: true})
	//hasmany
});