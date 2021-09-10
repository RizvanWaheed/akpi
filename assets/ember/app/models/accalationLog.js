telenor.AccalationLog = DS.Model.extend({
	state_id:DS.attr(),
    remarks:DS.attr(),
    accalation_id:DS.attr(),
    created_by:DS.attr(),
    created:DS.attr(),
    state:DS.attr()
});