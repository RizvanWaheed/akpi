telenor.ComplaintLog = DS.Model.extend({
	date:DS.attr(),
	remarks:DS.attr(),
	state_id:DS.attr(),
	complaint_id:DS.attr(),
	user_id:DS.attr(),
	assigned_to:DS.attr(),
	assigned_by:DS.attr(),
	state:DS.attr(),
	priority:DS.attr(),
	path:DS.attr(),
	image:DS.attr(),
});