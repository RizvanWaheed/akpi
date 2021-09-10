telenor.AgentsSurveysRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName: 'agentsSurveys',
	model: function () {
		//var storing = this.store.find('agentsurveys');
		//console.log('total campaign');
		//console.log(this.get('campaign'));
		///return this.get('campaign');
		return Ember.RSVP.hash({
			campaign: this.get('campaign'),
			surveys: this.store.find('surveys'),
			surveyQuestions: this.store.find('surveyQuestions', {
				status: 1
			})
		});
		/*return Ember.RSVP.all({
		    campaign:  this.get('campaign');,
		    surveyQuestions: _store.find('surveyQuestions',{ status:1}),
		});	*/
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		// applicationController = this.controllerFor("application");

		// this.set('baseUrl',applicationController.get("applicationURL"));
		// controller.set('myName',applicationController.get("userName"));

		// this.store.find('surveyQuestions').then(function(mf){
		//  	controller.set('surveyQuestions', mf);
		// })
		/*controller.get('monitoredBy').pushObject({id:1, name:'Customer'});
		controller.get('monitoredBy').pushObject({id:2, name:'captain'});*/
		/*this.store.find('domains',{parent_id:1, include:'parent'}).then(function(area) {
            controller.set('cities', area);
        });*/
		//  controller.get('country').clear();
		// controller.get('cities').clear();
		// this.store.find('domains').then(function(domains){//,{parent_id:0}
		// 	//console.log(domains);
		// 	domains.forEach(function(domain) {
		// 		//console.log(domain);
		// 		if(domain.get('parent_id') == 0){
		// 			//controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
		// 		}else{
		// 			controller.get('cities').pushObject({id:domain.get('id'), name:domain.get('name')});
		// 		}
		// 	});
		// //	controller.set('domains',domains);
		// });

		/*controller.get('agentStatus').clear();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();
		controller.get('agentStatus').pushObject();*/

		controller.set('model', model);
	},
	actions: {
		createNodeCampaign: function (obj, status) {
			var _self = this;
			var _controller = this.controllerFor("agentsSurveys");
			//_self.send('consoleClear');	
			//var surgeries = _controller.get('model.surgeries');
			//console.log(obj);
			//console.log(status);
			//console.log(_controller.get('model'));
			/*;*/
			_controller.get('model.campaign').forEach(function (item, index, enumerable) {
				//console.log(item);
				if (obj.id == item.id && status == 'inactive') {
					Em.set(item, "status", "checked");
					Em.set(item, "state", false);
				} else if (obj.id == item.id && status == 'active') {
					Em.set(item, "status", "");
					Em.set(item, "state", true);
				}
			});
			//console.log(_controller.get('model'));
		},
		createNodeSurveyQuestions: function (obj, status) {
			var _self = this;
			var _controller = this.controllerFor("agentsSurveys");
			//_self.send('consoleClear');	
			//var surgeries = _controller.get('model.surgeries');
			//console.log(obj);
			//console.log(status);
			//console.log(_controller.get('model'));
			/*;*/
			_controller.get('model.surveyQuestions').forEach(function (item, index, enumerable) {
				//console.log(item);
				if (obj.id == item.id && status == 'inactive') {
					Em.set(item, "status", "checked");
					Em.set(item, "state", false);
				} else if (obj.id == item.id && status == 'active') {
					Em.set(item, "status", "");
					Em.set(item, "state", true);
				}
			});
			//console.log(_controller.get('model'));
		},
		// 	save:function(activities){
		// 		var _self = this;
		// 		var _controller = this.controllerFor('agentsSurveys');
		// 		/*activities:{
		// 	    	monitoring_for_id:'',
		// 	    	email_driver_id:'',
		// 	    	email_reason_id:'',
		// 	    	survey_no:'',
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
		// 		if(activities.survey_no == '' || activities.survey_no == null){
		// 			_self.get('common').showNotification('error', '<b>Survey ID is missing!</b>');
		// 			return false;
		// 		}

		// 		//data = {'activities':activities};
		// 		Ember.$.ajax({
		// 		    url: 'api/users_api/agentsurveys?format=json',
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

		// 		/*_self.store.unloadAll('agentsurvey');
		// 		var newEmailDriver = this.store.createRecord('agentsurvey',activities);
		// 		newEmailDriver.save(function(aaa){
		// 			console.log(aaa);
		// 		}).then(function(ans){
		// 			console.log(ans);

		// 		});	*/
		// 	},


	}
});
