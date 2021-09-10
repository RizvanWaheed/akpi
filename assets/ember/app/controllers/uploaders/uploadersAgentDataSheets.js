telenor.UploadersAgentDataSheetsController = Ember.ArrayController.extend({
	pageName: 'uploadersAgentDataSheets',
	//itemController: 'rendomizing',
	fromDate: '',

	sortProperties: ['name'],
	sortAscending: true, // false = descending

	/*funcEmailDriverSub:function(){
		var value = this.get('activities.email_driver_id');
		//console.log(value);
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('parent_id') == value;
	    });
	    //console.log(valing);
	    this.set('emailDriverSub', valing);
	}.observes('activities.email_driver_id'),*/
	/*funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('monitoredBy');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		this.store.find('emaildrivers',{'for_id':value,'type_id':0}).then(function(driver){
			self.set('rendomizinga',driver);
		});
		return;
	}.observes('monitoredBy'),*/

});
telenor.UploadersAgentDataSheetController = Ember.ObjectController.extend({
	need: ['uploadersAgentDataSheets'],

});
