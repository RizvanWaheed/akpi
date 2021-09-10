telenor.NpsUpload = DS.Model.extend({
	msisdn:DS.attr(),
	call_date:DS.attr(),
	category_id:DS.attr(),
	score:DS.attr(),
	nps:DS.attr(),
	user_id:DS.attr(),
});