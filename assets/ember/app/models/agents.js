telenor.Agents = DS.Model.extend({
	name:DS.attr(),
	user_name:DS.attr(),
	password:DS.attr(),
	login:DS.attr(),
	active:DS.attr(),
	role_id: DS.belongsTo('roles', {async: true}),
	area_id: DS.belongsTo('domains', {async: true}),
	territory_id: DS.belongsTo('departments', {async: true}),
	reporting_id: DS.belongsTo('user', {async: true}),//belongsTo('users', {async: true})
	//hasmany
});
