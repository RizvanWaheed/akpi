telenor.Accalation = DS.Model.extend({
	booking_id:DS.attr(),
    ticket_id:DS.attr(),
    name:DS.attr(),
    mobile:DS.attr(),
    email:DS.attr(),
    department_id:DS.attr(),
    sub_department_id:DS.attr(),
	domain_id:DS.attr(),
    statement:DS.attr(),
    cname:DS.attr(),
    cmobile:DS.attr(),
    cstatement:DS.attr(),
    created:DS.attr(),
	created_by:DS.attr(),
	remarks:DS.attr(),
	state_id:DS.attr(),
	status:DS.attr(),
    accalationLog:DS.attr()//.hasMany('accalationLog')

	
});
