telenor.NpsUploads = DS.Model.extend({
	msisdn:DS.attr(),
	call_date:DS.attr(),
	category_id:DS.belongsTo('npsCategories', {async: true}),
	score:DS.attr(),
	nps:DS.attr(),
	user_id:DS.belongsTo('users', {async: true}),	//hasmany
});