telenor.AdministratorMonitoringEmailDriversController = Ember.ArrayController.extend({
	needs: ["application"],
	pageName:'administratorMonitoringEmailDrivers',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    monitoredBy:Ember.A(),
    typeEmailDriver:1,
    EmailDriveId:0,
    emaildrivername:'',


    emailDriver:{
    	id:0,
    	monitoring_for_id:0,
    	parent_id:0,
    	name:'',
    	status:1,
    },
    monitoringEmailDrivers:Em.A(),
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
	funcByParentId:function(){
		var self  = this;
		var value = this.get('emailDriver.monitoring_for_id');
		var value2 = this.get('emailDriver.parent_id');

		if(typeof value2 === 'undefined' || value2 == '' || value2 <= 0){
			return false;
		}
		this.store.find('emaildrivers',{'for_id':value,parent_id:value2}).then(function(driver){
			self.set('monitoringEmailDrivers',driver);
		});
		return;
	}.observes('emailDriver.parent_id'),
	

});
telenor.AdministratorMonitoringEmailDriverController = Ember.ObjectController.extend({
	need:['roles']
});
