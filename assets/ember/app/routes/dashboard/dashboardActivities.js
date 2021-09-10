telenor.DashboardActivitiesRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName:'dashboardActivities',
	model:function(){ return;
		//var _store = this.store;
		//console.log('Entered IN');
	   //return this.store.find('visitors',{search_by:'my_tickets'});
	//    return Ember.RSVP.hash({
	// 	   activities: _store.find('activities',{search_by:'my_tickets', state:1}),
	// 	   accalations: _store.find('accalations',{ options_id:10}),
	// 	   complaints: _store.find('complaints',{ options_id:11}),
	// 	//    surgeries: _store.find('optionCategories',{ options_id:12}),
	// 	//    medicines: _store.find('optionCategories',{ options_id:13}),
	// 	//    medical: _store.find('optionCategories',{ options_id:15})
	//    });
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		var data = {};
		this.get('common').ajaxppRequest('GET', 'api/dashboards/activities?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
			console.log(response);
			controller.set('activities',response);
		}, function(error){ 
			//handle error  
			console.log(error);
		});	
		this.get('common').ajaxppRequest('GET', 'api/dashboards/activities_hourly?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
			console.log(response);
			controller.set('activities_hourly',response);
		}, function(error){ 
			//handle error  
			console.log(error);
		});	
		// applicationController = this.controllerFor("application");
		// this.set('baseUrl',applicationController.get("applicationURL"));
		// controller.set('myName',applicationController.get("userName"));
		
		// this.store.find('monitoringFors').then(function(mf){
		// 	controller.set('monitoredBy', mf);
		// })
		/*controller.get('monitoredBy').pushObject({id:1, name:'Customer'});
		controller.get('monitoredBy').pushObject({id:2, name:'captain'});*/
		/*this.store.find('domains',{parent_id:1, include:'parent'}).then(function(area) {
            controller.set('cities', area);
        });*/
      	//  controller.get('country').clear();
		/*
		controller.get('agentStatus').clear();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		*/
	
        controller.set('model', model);
  	},
  	actions:{
 
	// 	save:function(activities){
	// 		var _self = this;
	// 		var _controller = this.controllerFor('dashboardActivities');
	// 		/*activities:{
	// 	    	monitoring_for_id:'',
	// 	    	email_driver_id:'',
	// 	    	email_reason_id:'',
	// 	    	ticket_no:'',
	// 	    	status:'',
	// 	    },*/
	// 	    console.log(activities);
	// 		if(typeof activities.monitoring_for_id === 'undefined' || activities.monitoring_for_id == '' || activities.monitoring_for_id == 0 || activities.monitoring_for_id == null){
	// 			_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
	// 			return false;
	// 		}
	// 		if(typeof activities.email_driver_id === 'undefined' || activities.email_driver_id == '' || activities.email_driver_id == 0 || activities.email_driver_id == null){
	// 			_self.get('common').showNotification('error', '<b>Category not selected!</b>');
	// 			return false;
	// 		}
	// 		if(typeof activities.email_reason_id === 'undefined' || activities.email_reason_id == '' || activities.email_reason_id == 0 || activities.email_reason_id == null){
	// 			_self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
	// 			return false;
	// 		}
	// 		if(typeof activities.domain_id === 'undefined' || activities.domain_id == '' || activities.domain_id == 0 || activities.domain_id == null){
	// 			_self.get('common').showNotification('error', '<b>City not selected!</b>');
	// 			return false;
	// 		}
	// 		if(typeof activities.status === 'undefined' || activities.status == '' || activities.status == 0 || activities.status == null){
	// 			_self.get('common').showNotification('error', '<b>Status not selected!</b>');
	// 			return false;
	// 		}
	// 		if(activities.ticket_no == '' || activities.ticket_no == null){
	// 			_self.get('common').showNotification('error', '<b>Ticket ID is missing!</b>');
	// 			return false;
	// 		}

	// 		//data = {'activities':activities};
	// 		Ember.$.ajax({
	// 		    url: 'api/users_api/agenttickets?format=json',
	// 		    type: 'POST',
	// 		    data:activities,
	// 		    success: function(data, textStatus, xhr) {
	// 		    	//console.log(data);
	// 			    if(data.find){
	// 					_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
	// 				}else{
	// 					_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
	// 				}				
	// 			//	_self.send('reset');
	// 				_self.send('reload');
	// 		    }
	// 	    });

	// 		/*_self.store.unloadAll('agentticket');
	// 		var newEmailDriver = this.store.createRecord('agentticket',activities);
	// 		newEmailDriver.save(function(aaa){
	// 			console.log(aaa);
	// 		}).then(function(ans){
	// 			console.log(ans);
				
	// 		});	*/
	// 	},
		
		
	}
});
