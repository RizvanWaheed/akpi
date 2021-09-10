telenor.ComplaintLogs = DS.Model.extend({
	date:DS.attr(),
	remarks:DS.attr(),
	state_id:DS.attr(),
	complaint_id:DS.belongsTo('complaint', {async: true}),
	state:DS.attr(),
	user_id:DS.belongsTo('users', {async: true}),
	assigned_to:DS.belongsTo('users', {async: true}),
	assigned_by:DS.belongsTo('users', {async: true}),
	priority:DS.attr(),
	path:DS.attr(),
	image:DS.attr(),
	photo: function() {
	    return this.get('path')+this.get('image');
    }.property('path')
});
