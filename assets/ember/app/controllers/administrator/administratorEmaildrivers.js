telenor.AdministratorEmaildriversController = Ember.ArrayController.extend({
	needs: ["application"],
	pageName:'administratorEmaildrivers',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    monitoredBy:Ember.A(),
    typeEmailDriver:1,
    EmailDriveId:0,
    emaildrivername:'',


    emailDriver:{
    	id:0,
    	monitoring_for_id:0,
    	name:'',
    	status:1,
    },
	funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('emailDriver.monitoring_for_id');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		this.store.find('emaildrivers',{'for_id':value,parent_id:0}).then(function(driver){
			self.set('model',driver);
		});
		return;
	}.observes('emailDriver.monitoring_for_id'),
});
telenor.AdministratorEmaildriverController = Ember.ObjectController.extend({
	need:['emaildrivers'],

});
