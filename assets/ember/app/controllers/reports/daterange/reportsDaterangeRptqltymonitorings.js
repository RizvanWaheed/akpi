telenor.ReportsDaterangeRptqltymonitoringsController = Ember.ArrayController.extend({
	chatNotificationDisplay:false,
	chatNotificationBit:null,
    chatNotification:Ember.A(),
    monitoredBy:Ember.A(),
	monitorBelons:[{'id':1, 'name':'Email'}, {'id':2, 'name':'Voice'}],
	report:{
		monitoring_for_id:'',
		monitoring_belong_id:'',
		date:''
	}
});