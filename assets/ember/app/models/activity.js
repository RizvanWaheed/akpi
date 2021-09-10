telenor.Activity = DS.Model.extend({
	ticket_no:DS.attr(),
//	department_id:DS.attr(),
//	sub_department_id:DS.attr(),
	monitoring_for_id:DS.attr(),
	domain_id:DS.attr(),
	email_driver_id:DS.attr(),
	email_sub_driver_id:DS.attr(),
	email_reason_id:DS.attr(),
	email_sub_reason_id:DS.attr(),
	booking_no:DS.attr(),
	ticket_process:DS.attr(),	
	status:DS.attr(),
	baby_apollo:DS.attr(),
	activitiesAdjustments:DS.attr(),
	activitiesEscalations:DS.attr(),
	created:DS.attr(),
	created_by:DS.attr(),
	modified:DS.attr(),
	modified_by:DS.attr()

	
});
