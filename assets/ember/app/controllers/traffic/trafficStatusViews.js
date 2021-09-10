telenor.TrafficStatusViewsController = Ember.ArrayController.extend({
	pageName:'trafficStatusViews',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    trafficDisplay:false,
	trafficNotificationBit:null,
    trafficNotification:Ember.A(),
    agentsData:Ember.A(),
    traffics:Ember.A(),
    traffic:0,
	
});
telenor.TrafficStatusViewController = Ember.ObjectController.extend({
	need:['trafficStatusViews'],

});