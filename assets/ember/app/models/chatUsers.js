telenor.ChatUsers = DS.Model.extend({
	name:DS.attr(),
	user_name:DS.attr(),
	password:DS.attr(),
	login:DS.attr(),
	active:DS.attr(),
	online_status:DS.attr(),
	role_id: DS.belongsTo('roles', {async: true})
	//hasmany
});