telenor.QualityVoiceMonitoringsRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName:'qualityVoiceMonitorings',
	model:function(){
		//return this.store.find('users',{role_id:4, condition:'greaterOrEqual'});
		/*return Ember.RSVP.hash({
            users: this.store.find('users',{role_id:4, condition:'greaterOrEqual'}),
            monitoredBy: this.store.find('monitoringFors'),
            country: this.store.find('domains')
		});*/
		//console.log('model before');
		return Ember.RSVP.hash({
			campaign:  this.get('campaign'),
			users: this.store.find('users',{role_id:4, condition:'greaterOrEqual', active:'Y'}),
			domains: this.store.find('domains'),
			options: this.store.find('options'),
			// categories:  this.store.find('monitoringCategories', {'monitoring_for_id':this.get('campaign').mapBy('id')}),//,{'monitoring_for_id':this.get('campaign').get('firstObject').id}
		});
		//console.log('model After');
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('monitoredBy', model.campaign);
		controller.set('domains',model.domains);
		controller.set('options',model.options);
		controller.set('users',model.users)

		controller.get('country').clear();
		controller.get('city').clear();
		model.domains.forEach(function(domain) {
			//console.log(domain);
			if(domain.get('parent_id') == 0){
				controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
			}else{
				controller.get('city').pushObject({id:domain.get('id'), name:domain.get('name')});
			}
		});
		controller.get('agents').clear();
		controller.get('teamleads').clear();
		model.users.forEach(function(user) {
			if(user.get('data').role_id == 11){
				controller.get('agents').pushObject(user);
			}else{
				controller.get('teamleads').pushObject(user);
			}
		});
			
		controller.get('emailLanguage').clear();
		controller.get('emailType').clear();
		controller.get('satisfactionReason').clear();
		controller.get('satisfaction').clear();
		controller.get('dissatisfaction').clear();
		controller.get('monitoringProcess').clear();
		controller.get('disputeType').clear();
		controller.get('emailAbout').clear();
		model.options.forEach(function(option) {
			if(option.get('category') == 'email_language'){
				controller.get('emailLanguage').pushObject({id:option.get('id'), name:option.get('name')});
			}
			if(option.get('category') == 'email_type'){
				controller.get('emailType').pushObject({id:option.get('id'), name:option.get('name')});
			}
			if(option.get('category') == 'satisfaction_reason'){
				controller.get('satisfactionReason').pushObject({id:option.get('id'), name:option.get('name')});
			}				
			if(option.get('category') == 'satisfaction'){
				controller.get('satisfaction').pushObject({id:option.get('id'), name:option.get('name'), slug:option.get('slug')});
			}
			if(option.get('category') == 'dissatisfy'){
				controller.get('dissatisfaction').pushObject({id:option.get('id'), name:option.get('name'), slug:option.get('slug')});
			}
			if(option.get('category') == 'monitoring_process'){
				controller.get('monitoringProcess').pushObject({id:option.get('id'), name:option.get('name')});
			}
			if(option.get('category') == 'dispute_type'){
				controller.get('disputeType').pushObject({id:option.get('id'), name:option.get('name')});
			}
			if(option.get('category') == 'email_about'){
				controller.get('emailAbout').pushObject({id:option.get('id'), name:option.get('name')});
			}
		});

		//applicationController = this.controllerFor("application");
		//this.set('baseUrl',applicationController.get("applicationURL"));
		//controller.set('myName',applicationController.get("userName"));
		
		// this.store.find('monitoringFors').then(function(mf){
		// 	controller.set('monitoredBy', mf);
		// });

		//controller.set('conditionYesNo',applicationController.get("conditionYesNo"));//.pushObject({id:1, name:'Yes'});
		//controller.set('conditionCallStatus',applicationController.get("conditionCallStatus"));//.pushObject({id:0, name:'No'});		
		//controller.set('conditionAidedUnaided',applicationController.get("conditionAidedUnaided"));
		
		/*this.store.find('users',{role_id:4}).then(function(teamleads){
			controller.set('teamleads',teamleads);
		});
		this.store.find('users',{role_id:11}).then(function(agents){
			controller.set('agents',agents);
		});*/
		/*this.store.find('users',{role_id:12}).then(function(monitoredBy){
			controller.set('monitoredBy',monitoredBy);
		});*/
		
		// this.store.find('domains').then(function(domains){//,{parent_id:0}
		// 	//console.log(domains);
		// 	controller.get('country').clear();
		// 	domains.forEach(function(domain) {
		// 		//console.log(domain);
		// 		if(domain.get('parent_id') == 0){
		// 			controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
		// 		}else{
		// 			controller.get('city').pushObject({id:domain.get('id'), name:domain.get('name')});
		// 		}
		// 	});
		// 	controller.set('domains',domains);
		// });
		
		

		// this.store.find('options').then(function(options){
		// 	/*console.log(options);*/
		// 	controller.get('emailLanguage').clear();
		// 	controller.get('emailType').clear();
		// 	controller.get('satisfactionReason').clear();
		// 	controller.get('satisfaction').clear();
		// 	controller.get('dissatisfaction').clear();
		// 	controller.get('monitoringProcess').clear();
		// 	controller.get('disputeType').clear();
		// 	controller.get('emailAbout').clear();
		// 	options.forEach(function(option) {
		// 		if(option.get('category') == 'email_language'){
		// 			controller.get('emailLanguage').pushObject({id:option.get('id'), name:option.get('name')});
		// 		}
		// 		if(option.get('category') == 'email_type'){
		// 			controller.get('emailType').pushObject({id:option.get('id'), name:option.get('name')});
		// 		}
		// 		if(option.get('category') == 'satisfaction_reason'){
		// 			controller.get('satisfactionReason').pushObject({id:option.get('id'), name:option.get('name')});
		// 		}				
		// 		if(option.get('category') == 'satisfaction'){
		// 			controller.get('satisfaction').pushObject({id:option.get('id'), name:option.get('name'), slug:option.get('slug')});
		// 		}
		// 		if(option.get('category') == 'dissatisfy'){
		// 			controller.get('dissatisfaction').pushObject({id:option.get('id'), name:option.get('name'), slug:option.get('slug')});
		// 		}
		// 		if(option.get('category') == 'monitoring_process'){
		// 			controller.get('monitoringProcess').pushObject({id:option.get('id'), name:option.get('name')});
		// 		}
		// 		if(option.get('category') == 'dispute_type'){
		// 			controller.get('disputeType').pushObject({id:option.get('id'), name:option.get('name')});
		// 		}
		// 		if(option.get('category') == 'email_about'){
		// 			controller.get('emailAbout').pushObject({id:option.get('id'), name:option.get('name')});
		// 		}
		// 	});
			
		// 	//controller.set('emailType',email_type);//,{category:'email_type'}
		// });
		Em.$(".tab-content #callactivity-upselling").addClass('in active');
		Em.$(".select2").select2({width:'100%'});
		/*this.store.find('options',{category:'email_language'}).then(function(email_language){
			controller.set('emailLanguage',email_language);
		});
		this.store.find('options',{category:'satisfaction_reason'}).then(function(satisfaction_reason){
			controller.set('satisfactionReason',satisfaction_reason);
		});*/
		this.get('common').ajaxppRequest('GET', 'api/users_api/myRendomizers?format=json', '', '').then(function (response) {   //newRequest is method of our adapter
			    controller.set('teekits', response);
		}, function(error){
		    //handle error  
		}).catch(function(ex){
			console.log(ex);
		});

		/*Ember.$.ajax({
		    url: 'api/users_api/myRendomizers?format=json',
		    type: 'GET',
		    success: function(data, textStatus, xhr) {
		    	console.log();
		    	controller.set('teekits',data);
		    	data.rptComplainUsers.forEach(function(item, index, enumerable) {
		    		//console.log(item);
		    		var role = item.role_id;
		    		//console.log(role);
		    		if(role == 5){
		    			controller.complaintAgents.pushObject(item);
		    		}
		    		if(role == 4){
		    			controller.complaintTeamleads.pushObject(item);
		    		}
				    //Ember.set(item, "id", 11); 
				    //Ember.get(item, "id");
				});
			},

		});*/
        controller.set('model', model);
  	},
	actions: {
		createNewNode:function(obj, status, parent){
			var _self = this;
			var _controller = _self.controllerFor('qualityVoiceMonitorings');
			var _questions = _controller.get('questions');
			_questions.forEach(function(item, index, enumerable) {//create recursive function
			//	console.log(item.name);
				active3Count = 0;
				child3Count  = 0;
				var valu = 0;
				item.children.forEach(function(item2, index2, enumerable2) {	
					if(item2.fatal==1){
						child3Count  += item2.children.get('length');
					}
					item2.children.forEach(function(item3, index3, enumerable3) {
						childCount  = item3.children.get('length');
						activeCount = 0;
						activeScore = parseFloat(item3.score);
						item3.children.forEach(function(item4, index4, enumerable4) {

							if(item4.fatal==0 && obj.id == item4.id && status == 'inactive'){
							    Ember.set(item4, "state", 1);							    
							    activeScore += parseFloat(item4.value);
							    Ember.set(item4, "score", item4.value);
							   /* if(item3.fatal==0 && item3.score==0){	_controller.set('monitoring.score', score+valu); } */
							}else if(item4.fatal==0 && obj.id == item4.id && status == 'active'){
							    Ember.set(item4, "state", 0);
							    activeScore -= parseFloat(item4.value);
			  				    Ember.set(item4, "score", 0);
			  				   	activeCount--;
			  				   /* if(item3.fatal==0 && item3.score > 0){ } */

			  				}else if(item4.fatal==1 && obj.id == item4.id && status == 'inactive'){
							    
							    Ember.set(item4, "state", 1);
							    Ember.set(item4, "score", 0);
							   
							}else if(item4.fatal==1 && obj.id == item4.id && status == 'active'){
							    Ember.set(item4, "state", 0);
							    Ember.set(item4, "score", item4.value);
							    activeCount--;
			  				}
							if(item4.state){
								activeCount++;
							}
						});
						if(item3.fatal==0){
							console.log(Ember.get(item3, "score")+'-----');
							Ember.set(item3, "score", activeScore);
							valu += parseFloat(activeScore)
							_controller.set('monitoring.score', valu.toFixed(5));
						}else{
							//console.log(Ember.get(item3, "score"));
							if(childCount == activeCount){
								Ember.set(item3, "score", 0);
							}else{
								Ember.set(item3, "score", -100);
							}
							Ember.set(item3, "score", item3.score);
							if(item3.state && item3.score == 0){
								active3Count++;
							}
						}
						
						/*  
							console.log(activeCount);
							console.log(item3.children.get('length'));
						*/
					});
					
				});
				if(child3Count == active3Count){
					_controller.set( 'monitoring.result','Fail');
				}else{
					_controller.set( 'monitoring.result','Pass');
				}
				console.log('---------');
				console.log(active3Count);
				console.log('---------'+child3Count+'---------');
				/*activeCount = item3.children.filter(function(child) {
					return child.state == 1;
			    }); get('length')*/
				/*if(obj.id == item.id){
					var item2 = item;
					totalAmount+= parseInt(item.rate);
					consultationTest.removeObject(item);
					consultationTestRecommandation.pushObject(item2);
				}*/
			});
			return;
			/*if(status == 'active'){
				consultationTest.forEach(function(item, index, enumerable) {
					if(obj.id == item.id){
						var item2 = item;
						totalAmount+= parseInt(item.rate);
						consultationTest.removeObject(item);
						consultationTestRecommandation.pushObject(item2);

					}
				});
			}
			else{
				consultationTestRecommandation.forEach(function(item, index, enumerable) {
					if(obj.id == item.id){
						var item2 = item;
						totalAmount-= parseInt(item.rate);
						consultationTestRecommandation.removeObject(item);
						consultationTest.pushObject(item2);
					}
				});
			}*/
		},
		save: function(monitoring){
			
			var self = this;
			var controller = self.controllerFor('qualityVoiceMonitorings');
			var _questions = controller.get('questions');
			
		
			if(monitoring.ticket_no == '' || monitoring.ticket_no == null){
				self.get('common').showNotification('error', '<b>Ticket number missing!</b>');
				return false;
			}
			if(monitoring.booking_no == '' || monitoring.booking_no == null){
				self.get('common').showNotification('error', '<b>Booking number missing!</b>');
				return false;
			}
			/*if(monitoring.date == '' || monitoring.date == null){
				self.get('common').showNotification('error', '<b>Date is missing.!</b>');
				return false;
			}
			if(monitoring.time == '' || monitoring.time == null){
				self.get('common').showNotification('error', '<b>Time is missing!</b>');
				return false;
			}*/
			if(typeof monitoring.agent_id === 'undefined' || monitoring.agent_id == '' || monitoring.agent_id == 0 || monitoring.agent_id == null){
				self.get('common').showNotification('error', '<b>Agent not selected!</b>');
				return false;
			}
			if(typeof monitoring.tl_id === 'undefined' || monitoring.tl_id == '' || monitoring.tl_id == 0 || monitoring.tl_id == null){
				self.get('common').showNotification('error', '<b>Teamlead not selected!</b>');
				return false;
			}			
			if(monitoring.customer == '' || monitoring.customer == null){
				self.get('common').showNotification('error', '<b>Customer name missing.!</b>');
				return false;
			}
			if(typeof monitoring.email_language_id === 'undefined' || monitoring.email_language_id == '' || monitoring.email_language_id == 0 || monitoring.email_language_id == null){
				self.get('common').showNotification('error', '<b>Monitoring language not selected!</b>');
				return false;
			}
			if(typeof monitoring.country_id === 'undefined' || monitoring.country_id == '' || monitoring.country_id == 0 || monitoring.country_id == null){
				self.get('common').showNotification('error', '<b>Country not selected!</b>');
				return false;
			}
			if(typeof monitoring.city_id === 'undefined' || monitoring.city_id == '' || monitoring.city_id == 0 || monitoring.city_id == null){
				self.get('common').showNotification('error', '<b>City not selected!</b>');
				return false;
			}
			if(typeof monitoring.email_driver_id === 'undefined' || monitoring.email_driver_id == '' || monitoring.email_driver_id == 0 || monitoring.email_driver_id == null){
				self.get('common').showNotification('error', '<b>Select Category not selected!</b>');
				return false;
			}
			if(typeof monitoring.email_sub_driver_id === 'undefined' || monitoring.email_sub_driver_id == '' || monitoring.email_sub_driver_id == 0 || monitoring.email_sub_driver_id == null){
				self.get('common').showNotification('error', '<b>Select Sub Category not selected!</b>');
				return false;
			}
			/*if(typeof monitoring.email_reason_id === 'undefined' || monitoring.email_reason_id == '' || monitoring.email_reason_id == 0 || monitoring.email_reason_id == null){
				self.get('common').showNotification('error', '<b>Select Reason not selected!</b>');
				return false;
			}*/
			/*if(typeof monitoring.email_type_id === 'undefined' || monitoring.email_type_id == '' || monitoring.email_type_id == 0 || monitoring.email_type_id == null){
				self.get('common').showNotification('error', '<b>Monitoring type not selected!</b>');
				return false;
			}
			if(typeof monitoring.dispute_type_id === 'undefined' || monitoring.dispute_type_id == '' || monitoring.dispute_type_id == 0 || monitoring.dispute_type_id == null){
				self.get('common').showNotification('error', '<b>Dispute type not selected!</b>');
				return false;
			}*/
			if(typeof monitoring.customer_satisfaction_id === 'undefined' || monitoring.customer_satisfaction_id == '' || monitoring.customer_satisfaction_id == 0 || monitoring.customer_satisfaction_id == null){
				self.get('common').showNotification('error', '<b>Customer satisfaction not selected!</b>');
				return false;
			}
			if(typeof monitoring.monitor_process_type_id === 'undefined' || monitoring.monitor_process_type_id == '' || monitoring.monitor_process_type_id == 0 || monitoring.monitor_process_type_id == null){
				self.get('common').showNotification('error', '<b>Monitor process not selected!</b>');
				return false;
			}
			var saveScore = Ember.A();
			_questions.forEach(function(item, index, enumerable) {//create recursive function
				item.children.forEach(function(item2, index2, enumerable2) {	
					item2.children.forEach(function(item3, index3, enumerable3) {	
						saveScore.push({question_id:item3.id, score:item3.score, comment: item3.comment});
						item3.children.forEach(function(item4, index4, enumerable4) {	
							saveScore.push({question_id:item4.id, score:item4.score, comment: item4.comment});
							//saveScore.push({question_id:item4.id, score:item4.state, comment: item4.comment});
						});
					});
				});		
			});
			/*console.log(saveScore);
			return;*/
			var data = {monitoring:JSON.stringify(monitoring), monitoring_score:JSON.stringify(saveScore)};
			self.get('common').ajaxppRequest('POST', 'api/users_api/monitoring?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
			    self.refresh();
				window.location.reload(true);
			    self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			}, function(error){
			    self.get('common').showNotification('error', '<b>Error! not saved!</b>');
			});

			/*Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });
			Ember.$.ajax({
			    url: 'api/users_api/monitoring?format=json',
			    type: 'POST',
			    data:{monitoring:JSON.stringify(monitoring), monitoring_score:JSON.stringify(saveScore)},
			    success: function(data, textStatus, xhr) {
					self.refresh();
					window.location.reload(true);
			        Ember.$.isLoading("hide");
			        self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			    },
			    error: function(xhr, textStatus, errorThrown) {
			    	self.get('common').showNotification('error', '<b>Error! not saved!</b>');
			        Ember.$.isLoading("hide");
			    }
		    });
*/
			//return;
			/*if(this.get('consumerID') == '' || this.get('consumerID') == null){
				alert('Search consumer by phone number');
				return false;
			}
			if(controller.get('callStatus') == '' || controller.get('callStatus') == null){
				alert('Select call status...');
				return false;
			}*/
			/*Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });*/

			/*callactivity = {
	        	consumerID:self.get('consumerID'),
				brandID:self.get('brandID'),
				ambassadorID:self.get('ambassadorID'),			
				isNamed: controller.get('isNamed'),
				isSmoker:controller.get('isSmoker'),
				isEighteen:controller.get('isEighteen'),
				isMet:controller.get('isMet'),
				haveTime:controller.get('haveTime'),
				isRemembered:controller.get('isRemembered'),
				isAided:controller.get('isAided'),
				callStatus:controller.get('callStatus'),
				
	        };
	        console.log(callactivity); */
	       // Ember.$.isLoading("hide");
	       // return;

	        //callComplete:DS.attr()
			//Ember.$('#btnAcceptUpsellings').prop("disabled", true);
			//Ember.$('#btnDeclineUpsellings').prop("disabled", true);
			//console.log(upselling);
			//var controller = self.controllerFor('qualityVoiceMonitorings');
	        /*self.store.unloadAll('voiceMonitorings');
	    	var newVoiceMonitorings = self.store.createRecord('voiceMonitorings',callactivity);
			newVoiceMonitorings.save().then(function(){
				controller.set('isNamedQuestion', 'Kya apka naam __________ hai?');
		        controller.set('haveTimeQuestion', '__________ sahib Mujhay apkay keemti waqt main se 4 minutes darker hongay. ');
		        controller.set('isMetQuestion', '__________ sahib Kya kal aap se hamaray kisi numainday ne baat kit hi?');
		        self.set('consumerID', ''),
				self.set('brandID', ''),
				self.set('ambassadorID', ''),
				self.set('isAided', ''),*/
			
				//Ember.$('#btnAcceptUpsellings').prop("disabled", true);
				//Ember.$('#btnDeclineUpsellings').prop("disabled", true);
			//	self.send('reloadAll');
			//	Ember.$.isLoading("hide");
			//});

			//this.transitionToRoute('Complains');
		},
		load:function(agenttickets){
			//'agenttickets'.'ticket_no'
			var self = this;
			var controller = self.controllerFor('qualityVoiceMonitorings');
			self.get('common').ajaxppRequest('GET', 'api/users_api/getMyTicketData?format=json', agenttickets, 'Yes').then(function (response) {   //newRequest is method of our adapter
			    controller.set('monitoring.monitoring_for_id', response.monitoring_for_id);
				controller.set('monitoring.monitoring_belongs', 1);
				controller.set('monitoring.ticket_no', response.ticket_no);
				controller.set('monitoring.agent_id', response.created_by);
				controller.set('monitoring.city_id', response.domain_id);
				
				controller.set('monitoring.email_driver_id', response.email_driver_id);
				controller.set('monitoring.email_reason_id', response.email_reason_id);
				//controller.set('monitoring.status', data.status);
				controller.set('monitoring.email_sub_driver_id', response.email_sub_driver_id);
				controller.set('monitoring.email_sub_reason_id', response.email_sub_reason_id);
			}, function(error){
			    //self.get('common').showNotification('error', '<b>Error! not saved!</b>');
			});
			/*Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });
			Ember.$.ajax({
			    url: 'api/users_api/getMyTicketData?format=json',
			    type: 'GET',
			    data:agenttickets,
			    success: function(data, textStatus, xhr) {
					//self.refresh();
					//window.location.reload(true);
					
					controller.set('monitoring.monitoring_for_id', data.monitoring_for_id);
					controller.set('monitoring.monitoring_belongs', 1);
					controller.set('monitoring.ticket_no', data.ticket_no);
					controller.set('monitoring.agent_id', data.created_by);
					controller.set('monitoring.city_id', data.domain_id);

					
					controller.set('monitoring.email_driver_id', data.email_driver_id);
					controller.set('monitoring.email_reason_id', data.email_reason_id);
					//controller.set('monitoring.status', data.status);
					controller.set('monitoring.email_sub_driver_id', data.email_sub_driver_id);
					controller.set('monitoring.email_sub_reason_id', data.email_sub_reason_id);

					console.log(data);
			        Ember.$.isLoading("hide");
			        //self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			    },
			    error: function(xhr, textStatus, errorThrown) {
			    	//self.get('common').showNotification('error', '<b>Error! not saved!</b>');
			        Ember.$.isLoading("hide");
			    }
		    });*/
		},
		reset:function(){
			var self = this;
			var controller = self.controllerFor('qualityVoiceMonitorings');
			var _questions = controller.get('questions');
        	self.refresh();
			window.location.reload(true);
					
        },
      
       
    },
	

});
