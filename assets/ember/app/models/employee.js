telenor.Employee = DS.Model.extend({
	name:DS.attr(),
	employee_name:DS.attr(),
	role_id: DS.attr(), //DS.belongsTo('roles', {async: true})
	reporting_id:DS.attr(),
	area_id:DS.attr(),
	territory_id:DS.attr(),
});
