telenor.AccalationLogs = DS.Model.extend({
	accalation_id:DS.belongsTo('accalations'),
    state_id:DS.attr(),
    remarks:DS.attr(),
    created_by:DS.belongsTo('users', {async: true}),
    created:DS.attr(),
    state:DS.attr(),
	photo: function() {
	    return this.get('path')+this.get('image');
    }.property('path')
});