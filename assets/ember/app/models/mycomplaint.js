telenor.Mycomplaint = DS.Model.extend({
	msisdn:DS.attr(),
	department_id:DS.attr(),
	sub_department_id:DS.attr(),
	domain_id:DS.attr(),
	category_id:DS.attr(),
	sub_category_id:DS.attr(),
	reason_id:DS.attr(),
	sub_reason_id:DS.attr(),
	booking_id:DS.attr(),
	ticket_id:DS.attr(),
	remarks:DS.attr(),
	status:DS.attr(),
	state_id:DS.attr(),
	created:DS.attr(),
	created_by:DS.attr()	
});