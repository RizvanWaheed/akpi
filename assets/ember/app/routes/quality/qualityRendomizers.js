telenor.QualityRendomizersRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'qualityRendomizers',

	renderTemplate:function(){
		this.render('quality/rendomizers');
	},
	/*beforeModel: function() {
		// var status = false;
		// console.log(this.controllerFor("application").get('modules').findBy("link", "aaa"));
		// console.log(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "aaa")));
		
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "quality.rendomizers"))){
			this.transitionTo('/');
		}
    },*/
	model:function(){
	//	var storing = this.store.find('rendomizers');
	//	console.log(storing);
		return ;
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		applicationController = this.controllerFor("application");
		this.set('baseUrl',applicationController.get("applicationURL"));
		controller.set('myName',applicationController.get("userName"));
		
		//controller.get('monitoredBy').clear();
		
		this.store.find('monitoringFors').then(function(mf){
			controller.set('monitoredBy', mf);
		});
		this.store.find('users',{role_id:5}).then(function(user){
			controller.set('officer', user);
		});
		this.store.find('users',{role_id:4}).then(function(user){
			controller.set('teamleads', user);
		})
		/*controller.get('monitoredBy').pushObject({id:1, name:'Customer'});
		controller.get('monitoredBy').pushObject({id:2, name:'captain'});*/
		/*this.store.find('domains',{parent_id:1, include:'parent'}).then(function(area) {
            controller.set('cities', area);
        });*/
      //  controller.get('country').clear();
		//controller.get('cities').clear();
        this.store.find('domains').then(function(domains){//,{parent_id:0}
			console.log(domains);

			domains.forEach(function(domain) {
				//console.log(domain);
				if(domain.get('parent_id') == 0){
					//controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
				}else{
					controller.get('cities').pushObject({id:domain.get('id'), name:domain.get('name')});
				}
			});
		//	controller.set('domains',domains);
		});

		/*controller.get('agentStatus').clear();
		controller.get('agentStatus').pushObject({id:1, name:'Open'});
		controller.get('agentStatus').pushObject({id:2, name:'Hold'});
		controller.get('agentStatus').pushObject({id:3, name:'Pending'});
		controller.get('agentStatus').pushObject({id:4, name:'New'});
		controller.get('agentStatus').pushObject({id:5, name:'You'});*/
	
        controller.set('model', model);
  	},
  	actions:{
		run : function(){
			var _self = this;
			var _controller = this.controllerFor('qualityRendomizers');
			var dateIs = _controller.get('communicationDate');
			console.log(dateIs);
			if(Em.isEmpty(dateIs)){
				_self.get('common').showNotification('error', '<b>Date is not selected!</b>');
				return false;
			}
			var state = {'dateIs': dateIs};

			_self.get('common').ajaxppRequest('GET', 'api/users_api/runRendomizers?format=json', state, 'Yes').then(function (response) {   //newRequest is method of our adapter
			    if(typeof response.error !== 'undefined'){
			    	_self.get('common').showNotification('error', '<b>'+response.error+'</b>');
			    	return;
			    }
			    _controller.set('teekits',response.table);
			    _controller.set('ticketTotals',response.total);
			}, function(error){
			    //handle error  
			});
			/*Ember.$.ajax({
			    url: 'api/users_api/runRendomizers?format=json',
			    type: 'GET',
			    data:{'dateIs': dateIs},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'</b>');
			    		return;
			    	}
			    	_controller.set('teekits',data.table);
			    	_controller.set('ticketTotals',data.total);
			    	/*if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);*
			    }
		    });*/
		},
		delete : function(activities){
			var _self = this;
			_self.get('common').ajaxppRequest('POST', 'api/users_api/rendomizerd?format=json', activities, 'Yes').then(function (response) {   //newRequest is method of our adapter
			     _self.get('common').showNotification('success', '<b>Deleted successfully!</b>');
					//_self.send('reset');
				_self.send('reload');
			}, function(error){
			    //handle error  
			});
			/*Ember.$.ajax({
			    url:'api/users_api/rendomizerd?format=json',
			    type:'POST',
			    data:activities,
			    success: function(data, textStatus, xhr) {
			    	//console.log(data);
				    _self.get('common').showNotification('success', '<b>Deleted successfully!</b>');
					//_self.send('reset');
					_self.send('reload');
			    }
		    });*/
			/*var _self = this;
			var _controller = this.controllerFor('qualityRendomizers');
			_self.store.unloadAll('rendomizer');
			var newEmailDriver = this.store.createRecord('rendomizer',{
				id: dt.get('id'),
				status: 0,
			});
			newEmailDriver.save().then(function(ans){
				
			});*/
		},
		save:function(activities){
			var _self = this;
			var _controller = this.controllerFor('qualityRendomizers');
			/*activities:{
		    	monitoring_for_id:'',
		    	email_driver_id:'',
		    	email_reason_id:'',
		    	ticket_no:'',
		    	status:'',
		    },*/
		    console.log(activities);
			if(typeof activities.monitoring_for_id === 'undefined' || activities.monitoring_for_id == '' || activities.monitoring_for_id == 0 || activities.monitoring_for_id == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			if(typeof activities.belong_id === 'undefined' || activities.belong_id == '' || activities.belong_id == 0 || activities.belong_id == null){
				_self.get('common').showNotification('error', '<b>Type not selected!</b>');
				return false;
			}
			if(typeof activities.user_id === 'undefined' || activities.user_id == '' || activities.user_id == 0 || activities.user_id == null){
				_self.get('common').showNotification('error', '<b>QA Officer not selected!</b>');
				return false;
			}
			if(activities.percentage == '' || activities.percentage == null){
				_self.get('common').showNotification('error', '<b>Percentage is missing!</b>');
				return false;
			}

			//data = {'activities':activities};
			_self.get('common').ajaxppRequest('POST', 'api/users_api/rendomizers?format=json', activities, 'Yes').then(function (response) {   //newRequest is method of our adapter
			    if(response.find){
					_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
				}else{
					_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				}				
			//	_self.send('reset');
				_self.send('reload');
			}, function(error){
			    //handle error  
			});
			/*Ember.$.ajax({
			    url: 'api/users_api/rendomizers?format=json',
			    type: 'POST',
			    data:activities,
			    success: function(data, textStatus, xhr) {
			    	//console.log(data);
				    if(data.find){
						_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
					}else{
						_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
					}				
				//	_self.send('reset');
					_self.send('reload');
			    }
		    });*/

			/*_self.store.unloadAll('rendomizer');
			var newEmailDriver = this.store.createRecord('rendomizer',activities);
			newEmailDriver.save(function(aaa){
				console.log(aaa);
			}).then(function(ans){
				console.log(ans);
				
			});	*/
		},
		reset:function(){
			var _controller = this.controllerFor('qualityRendomizers');//monitoring_for_id:'',
			_controller.set('activities',{		    	
		    	email_driver_id:'',
		    	email_reason_id:'',
		    	ticket_no:'',
		    	status:''
		    });
		},
		reload:function(){
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this.controllerFor('qualityRendomizers');
			var activities = _controller.get('rendomizer.monitoring_for_id');
			/*if(typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}*/
			var data = {'monitoring_for_id': activities};
			_self.get('common').ajaxppRequest('GET', 'api/users_api/getMyRendomizers?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
			    if(typeof response.error !== 'undefined'){
			    	_self.get('common').showNotification('error', '<b>'+response.error+'</b>');
			    	return;
			    }
			    _controller.set('teekits',response.table);
			    _controller.set('ticketTotals',response.total);
			}, function(error){
			    //handle error  
			});
			/*Ember.$.ajax({
			    url: 'api/users_api/getMyRendomizers?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'</b>');
			    		return;
			    	}
			    	_controller.set('teekits',data.table);
			    	_controller.set('ticketTotals',data.total);
			    	/*if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);*
			    }
		    });*/
		}
	}
});