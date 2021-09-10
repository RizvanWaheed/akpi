telenor.Complain = DS.Model.extend({
	phone:DS.attr(),
	type:DS.attr(),
	description:DS.attr(),
	date:DS.attr(),
	status:DS.attr(),
	close_date:DS.attr(),
	//isMailed:DS.attr(),
	siebel_code:DS.attr(),
	cstate_id:DS.attr(),
	//user_id:DS.belongsTo('users', {async: true}),
	//type: DS.belongsTo('categories', {async: true})
	
});