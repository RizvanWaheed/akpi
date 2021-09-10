telenor.QualitySheetUploadsController = Ember.ArrayController.extend({
	pageName:'qualitySheetUploads',
	//itemController: 'rendomizing',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    monitoredBy:Ember.A(),
    monitoring_for_id:0,

    typeEmailDriver:1,
    EmailDriveId:0,
    rendomizingname:'',
    rendomizinga:Ember.A(),
    agentStatus:Ember.A(),
    teekits:Ember.A(),
  	ticketTotals:0,
  	users:Ember.A(),
  	belongs:[{id:1,name:'Email'},{id:2,name:'Voice'}],
  	officer:[{id:30003544,name:'Shamsa Arif'},{id:30008007,name:'Isma Irshad'},{id:30004217,name:'Fatima Hamid'},{id:33338007,name:'Haleema Fayyaz'}],
    rendomizing:{
    	monitoring_for_id:'',
    	belong_id:'',
    	user_id:'',
    	percentage:''
    },
    drivers:Ember.A(),
    cities:Ember.A(),

    customerShow:true,
    emailDriver:Ember.A(),
  	emailDriverSub:Ember.A(),
  	emailDriverReason:Ember.A(),
  	emailDriverReasonSub:Ember.A(),

    emailDriverStyle:"display:block",
  	emailDriverSubStyle:"display:block",
  	emailDriverReasonStyle:"display:block",
  	emailDriverReasonSubStyle:"display:block",

    funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('activities.monitoring_for_id');

		/*if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		
		self.set('drivers', Ember.A());
		self.get('emailDriver').clear();
		self.get('emailDriverSub').clear();
		if(value == 1){
			self.store.unloadAll('monitoringCategories');
			self.set('customerShow', true);
			this.store.find('monitoringCategories',{'monitoring_for_id':value}).then(function(drivers){

				var category = drivers.filter(function(driver) {
					return driver.get('level') == 1;
			    });
			    var sub_category = drivers.filter(function(driver) {
					return driver.get('level') == 2;
			    });
			    var reason = drivers.filter(function(driver) {
					return driver.get('level') == 3;
			    });
			    var sub_reason = drivers.filter(function(driver) {
					return driver.get('level') == 4;
			    });
			    self.set('emailDriver', category);
			    self.set('emailDriverSub', sub_category);
			    self.set('emailDriverReason', reason);
			    self.set('emailDriverReasonSub', sub_reason);
			    self.set('drivers',drivers);
				

				//self.set('emailDriverStyle', "display:block");
			    //self.set('emailDriverSubStyle', "display:none");
			    //self.set('emailDriverReasonStyle', "display:block");
			    //self.set('emailDriverReasonSubStyle', "visibility:visible");

			   //  visibility: hidden

			    Ember.$(".select2").select2();
			});

			

		}else{
			self.set('customerShow', false);
			self.store.unloadAll('emaildrivers');
			this.store.find('emaildrivers',{'for_id':value}).then(function(drivers){
				self.set('emailDriver', Ember.A());
				self.set('emailDriverSub', Ember.A());

				drivers.forEach(function(driver) {
					if(driver.get('parent_id.id') == 0){
						if(driver.get('id') > 0){
							self.get('emailDriver').pushObject({id:driver.get('id'), name:driver.get('name')});
						}
					}
					else{
						if(driver.get('id') > 0){
							self.get('emailDriverSub').pushObject({id:driver.get('id'), name:driver.get('name')});
						}
					}
				});
				self.set('drivers',drivers);	
			    Ember.$(".select2").select2();
			});

			
		}*/
		
		
	}.observes('activities.monitoring_for_id'),
	funcEmailDriverSub0:function(){
		var _self = this;
		var value = this.get('activities.email_sub_driver_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		//console.log(value);
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('id') == value;
	    });
	    //console.log(valing.objectAt(0));
	    valing.forEach(function(asd){//console.log(asd.get('parent_id'));
	    	_self.set('activities.email_driver_id', asd.get('parent_id.id'));
	    });
	    
	    //console.log(valing);
	    //this.set('emailDriverSub', valing);
	}.observes('activities.email_sub_driver_id'),
	funcEmailDriverSub:function(){
		var _self = this;
		var value = this.get('activities.email_reason_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		var monitoring_for_id = this.get('activities.monitoring_for_id');
		if(monitoring_for_id != 1){
			_self.set('activities.email_sub_driver_id', value);
		}else{
			var valing = this.get('emailDriverReason').filter(function(driver) {
				return driver.get('id') == value;
		    });
		    valing.forEach(function(asd){
		    	_self.set('activities.email_sub_driver_id', asd.get('parent_id.id'));
		    });

		}
		
	    
	}.observes('activities.email_reason_id'),
	funcEmailDriverSub2:function(){
		var _self = this;
		var value = this.get('activities.email_sub_reason_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		

		var valing = this.get('emailDriverReasonSub').filter(function(driver) {
			return driver.get('id') == value;
	    });
	    valing.forEach(function(asd){
	   	_self.set('activities.email_reason_id', asd.get('parent_id.id'));
	    });
	    
	    
	}.observes('activities.email_sub_reason_id'),
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
telenor.QualitySheetUploadController = Ember.ObjectController.extend({
	need:['qualitySheetUploads'],

});