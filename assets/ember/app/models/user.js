telenor.User = DS.Model.extend({
	name: DS.attr(),
	user_name: DS.attr(),
	password: DS.attr(),
	login: DS.attr(),
	active: DS.attr(),
	role_id: DS.attr(),
	area_id: DS.attr(),
	employee_id: DS.attr(),
	territory_id: DS.attr(),
	reporting_id: DS.attr(),
});
