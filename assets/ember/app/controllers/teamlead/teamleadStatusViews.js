telenor.TeamleadStatusViewsController = Ember.ArrayController.extend({
	pageName:'teamleadStatusViews',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    teamleadDisplay:false,
	teamleadNotificationBit:null,
    teamleadNotification:Ember.A(),
    agentsData:Ember.A(),
    teamleads:Ember.A(),
    teamlead:0,
	
});
telenor.TeamleadStatusViewController = Ember.ObjectController.extend({
	need:['teamleadStatusViews'],

});