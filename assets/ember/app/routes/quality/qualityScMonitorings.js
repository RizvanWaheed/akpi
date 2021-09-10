telenor.QualityScMonitoringsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'qualityScMonitorings',
	baseUrl: '',
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "quality.scMonitorings"))){
	        this.transitionTo('/');
	    }
	},*/
	model: function () {
		return this.store.find('users', {
			role_id: 4,
			condition: 'greaterOrEqual'
		});
	},

	setupController: function (controller, model) {
		this._super(controller, model);

		applicationController = this.controllerFor("application");
		this.set('baseUrl', applicationController.get("applicationURL"));
		controller.set('myName', applicationController.get("userName"));
		//controller.set('conditionYesNo',applicationController.get("conditionYesNo"));//.pushObject({id:1, name:'Yes'});

		//controller.set('conditionCallStatus',applicationController.get("conditionCallStatus"));//.pushObject({id:0, name:'No'});		
		/*//controller.set('conditionAidedUnaided',applicationController.get("conditionAidedUnaided"));
		this.store.find('users',{role_id:4}).then(function(teamleads){
			controller.set('teamleads',teamleads);
		});
		this.store.find('users',{role_id:11}).then(function(agents){
			controller.set('agents',agents);
		});*/
		/*this.store.find('users',{role_id:12}).then(function(monitoredBy){
			controller.set('monitoredBy',monitoredBy);
		});*/
		var check = {
			monitoring_for_id: 1,
			status: 1
		};
		Ember.$.ajax({
			url: 'api/users_api/questions?format=json',
			type: 'GET',
			data: check,
			success: function (data, textStatus, xhr) {
				controller.set('questions', data);
			},
			error: function (xhr, textStatus, errorThrown) {
				self.get('common').showNotification('error', '<b>Questions not found reload the page!</b>');
			}
		});
		/*this.store.find('domains').then(function(domains){//,{parent_id:0}
			console.log(domains);
			controller.get('country').clear();
			domains.forEach(function(domain) {
				//console.log(domain);
				if(domain.get('parent_id') == 0){
					controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
				}
			});
			controller.set('domains',domains);
		});
		this.store.find('emaildrivers',{'for_id':1}).then(function(drivers){
			controller.get('emailDriver').clear();
			drivers.forEach(function(driver) {
				if(driver.get('parent_id') == 0){
					controller.get('emailDriver').pushObject({id:driver.get('id'), name:driver.get('name')});
				}
			});
			controller.set('drivers',drivers);
		});*/

		this.store.find('domains').then(function (domains) { //,{parent_id:0}
			console.log(domains);
			controller.get('country').clear();
			domains.forEach(function (domain) {
				//console.log(domain);
				if (domain.get('parent_id') == 0) {
					controller.get('country').pushObject({
						id: domain.get('id'),
						name: domain.get('name')
					});
				} else {
					controller.get('city').pushObject({
						id: domain.get('id'),
						name: domain.get('name')
					});
				}
			});
			controller.set('domains', domains);
		});
		this.store.find('emaildrivers', {
			'for_id': 1
		}).then(function (drivers) {
			controller.get('emailDriver').clear();
			drivers.forEach(function (driver) {
				if (driver.get('parent_id.id') == 0) {
					controller.get('emailDriver').pushObject({
						id: driver.get('id'),
						name: driver.get('name')
					});
				} else {
					controller.get('emailDriverSub').pushObject({
						id: driver.get('id'),
						name: driver.get('name')
					});
				}
			});
			controller.set('drivers', drivers);
		});

		this.store.find('options').then(function (options) {
			/*console.log(options);*/
			controller.get('emailLanguage').clear();
			controller.get('emailType').clear();
			controller.get('satisfactionReason').clear();
			controller.get('satisfaction').clear();
			controller.get('monitoringProcess').clear();
			controller.get('disputeType').clear();
			options.forEach(function (option) {
				if (option.get('category') == 'email_language') {
					controller.get('emailLanguage').pushObject({
						id: option.get('id'),
						name: option.get('name')
					});
				}
				if (option.get('category') == 'email_type') {
					controller.get('emailType').pushObject({
						id: option.get('id'),
						name: option.get('name')
					});
				}
				if (option.get('category') == 'satisfaction_reason') {
					controller.get('satisfactionReason').pushObject({
						id: option.get('id'),
						name: option.get('name')
					});
				}
				if (option.get('category') == 'satisfaction') {
					controller.get('satisfaction').pushObject({
						id: option.get('id'),
						name: option.get('name')
					});
				}
				if (option.get('category') == 'monitoring_process') {
					controller.get('monitoringProcess').pushObject({
						id: option.get('id'),
						name: option.get('name')
					});
				}
				if (option.get('category') == 'dispute_type') {
					controller.get('disputeType').clear();
					controller.get('disputeType').pushObject({
						id: 0,
						name: 'None'
					});
				}
			});
			//controller.set('emailType',email_type);//,{category:'email_type'}
		});
		/*this.store.find('options',{category:'email_language'}).then(function(email_language){
			controller.set('emailLanguage',email_language);
		});
		this.store.find('options',{category:'satisfaction_reason'}).then(function(satisfaction_reason){
			controller.set('satisfactionReason',satisfaction_reason);
		});*/
		controller.get('monitoringBouns').pushObject({
			id: 0,
			name: '0%'
		});
		controller.get('monitoringBouns').pushObject({
			id: 5,
			name: '5%'
		});
		controller.get('monitoringBouns').pushObject({
			id: 10,
			name: '10%'
		});
		controller.get('monitoringBouns').pushObject({
			id: 15,
			name: '15%'
		});
		controller.get('monitoringBouns').pushObject({
			id: 20,
			name: '20%'
		});


		controller.set('model', model);
	},
	actions: {
		createNewNode: function (obj, status, parent) {
			var _self = this;
			var _controller = _self.controllerFor('qualityScMonitorings');
			var _questions = _controller.get('questions');
			_questions.forEach(function (item, index, enumerable) { //create recursive function
				//	console.log(item.name);
				active3Count = 0;
				child3Count = 0;
				var valu = 0;
				item.children.forEach(function (item2, index2, enumerable2) {
					if (item2.fatal == 1) {
						child3Count += item2.children.get('length');
					}
					item2.children.forEach(function (item3, index3, enumerable3) {
						childCount = item3.children.get('length');
						activeCount = 0;

						item3.children.forEach(function (item4, index4, enumerable4) {
							if (obj.id == item4.id && status == 'inactive') {
								Ember.set(item4, "state", 1);
								/* if(item3.fatal==0 && item3.score==0){
			  				    	_controller.set('monitoring.score', score+valu);
			  				    }*/
							} else if (obj.id == item4.id && status == 'active') {
								Ember.set(item4, "state", 0);
								activeCount--;
								/* if(item3.fatal==0 && item3.score > 0){
								 	
								 }*/
							}
							if (item4.state) {
								activeCount++;
							}
						});
						if (item3.fatal == 0) {
							//var score = parseFloat(_controller.get( 'monitoring.score'));
							if (childCount == activeCount) {
								Ember.set(item3, "score", item3.value);
							} else {
								Ember.set(item3, "score", 0);
							}
							valu += parseFloat(item3.score)
							_controller.set('monitoring.score', valu.toFixed(5));
						} else {
							if (childCount == activeCount) {
								Ember.set(item3, "score", 0);
							} else {
								Ember.set(item3, "score", item3.value);
							}
							if (item3.state && item3.score == 0) {
								active3Count++;
							}
						}

						/*  
							console.log(activeCount);
							console.log(item3.children.get('length'));
						*/
					});

				});
				if (child3Count == active3Count) {
					_controller.set('monitoring.result', 'Pass');
				} else {
					_controller.set('monitoring.result', 'Fail');
				}
				/*console.log('---------');
					console.log(active3Count);
					console.log('---------'+child3Count+'---------');*/
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
		save: function (monitoring) {

			var self = this;
			var controller = self.controllerFor('qualityScMonitorings');
			var _questions = controller.get('questions');


			if (monitoring.ticket_no == '' || monitoring.ticket_no == null) {
				self.get('common').showNotification('error', '<b>Ticket number missing!</b>');
				return false;
			}
			if (monitoring.booking_no == '' || monitoring.booking_no == null) {
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
			if (typeof monitoring.agent_id === 'undefined' || monitoring.agent_id == '' || monitoring.agent_id == 0 || monitoring.agent_id == null) {
				self.get('common').showNotification('error', '<b>Agent not selected!</b>');
				return false;
			}
			if (typeof monitoring.tl_id === 'undefined' || monitoring.tl_id == '' || monitoring.tl_id == 0 || monitoring.tl_id == null) {
				self.get('common').showNotification('error', '<b>Teamlead not selected!</b>');
				return false;
			}
			if (monitoring.customer == '' || monitoring.customer == null) {
				self.get('common').showNotification('error', '<b>Customer name missing.!</b>');
				return false;
			}
			if (typeof monitoring.email_language_id === 'undefined' || monitoring.email_language_id == '' || monitoring.email_language_id == 0 || monitoring.email_language_id == null) {
				self.get('common').showNotification('error', '<b>Email language not selected!</b>');
				return false;
			}
			if (typeof monitoring.country_id === 'undefined' || monitoring.country_id == '' || monitoring.country_id == 0 || monitoring.country_id == null) {
				self.get('common').showNotification('error', '<b>Country not selected!</b>');
				return false;
			}
			if (typeof monitoring.city_id === 'undefined' || monitoring.city_id == '' || monitoring.city_id == 0 || monitoring.city_id == null) {
				self.get('common').showNotification('error', '<b>City not selected!</b>');
				return false;
			}
			if (typeof monitoring.email_driver_id === 'undefined' || monitoring.email_driver_id == '' || monitoring.email_driver_id == 0 || monitoring.email_driver_id == null) {
				self.get('common').showNotification('error', '<b>Email Ccategory not selected!</b>');
				return false;
			}
			if (typeof monitoring.email_reason_id === 'undefined' || monitoring.email_reason_id == '' || monitoring.email_reason_id == 0 || monitoring.email_reason_id == null) {
				self.get('common').showNotification('error', '<b>Email reason not selected!</b>');
				return false;
			}
			if (typeof monitoring.email_type_id === 'undefined' || monitoring.email_type_id == '' || monitoring.email_type_id == 0 || monitoring.email_type_id == null) {
				self.get('common').showNotification('error', '<b>Email type not selected!</b>');
				return false;
			}
			/*if(typeof monitoring.dispute_type_id === 'undefined' || monitoring.dispute_type_id == '' || monitoring.dispute_type_id == 0 || monitoring.dispute_type_id == null){
				self.get('common').showNotification('error', '<b>Dispute type not selected!</b>');
				return false;
			}*/
			if (typeof monitoring.customer_satisfaction_id === 'undefined' || monitoring.customer_satisfaction_id == '' || monitoring.customer_satisfaction_id == 0 || monitoring.customer_satisfaction_id == null) {
				self.get('common').showNotification('error', '<b>Customer satisfaction not selected!</b>');
				return false;
			}
			if (typeof monitoring.monitor_process_type_id === 'undefined' || monitoring.monitor_process_type_id == '' || monitoring.monitor_process_type_id == 0 || monitoring.monitor_process_type_id == null) {
				self.get('common').showNotification('error', '<b>Monitor process not selected!</b>');
				return false;
			}
			var saveScore = Ember.A();
			_questions.forEach(function (item, index, enumerable) { //create recursive function
				item.children.forEach(function (item2, index2, enumerable2) {
					item2.children.forEach(function (item3, index3, enumerable3) {
						saveScore.push({
							question_id: item3.id,
							score: item3.score,
							comment: item3.comment
						});
						item3.children.forEach(function (item4, index4, enumerable4) {
							saveScore.push({
								question_id: item4.id,
								score: item4.state,
								comment: item4.comment
							});
						});
					});
				});
			});
			self.get('common').showLoader();
			Ember.$.ajax({
				url: 'api/users_api/monitoring?format=json',
				type: 'POST',
				data: {
					monitoring: JSON.stringify(monitoring),
					monitoring_score: JSON.stringify(saveScore)
				},
				success: function (data, textStatus, xhr) {
					self.refresh();
					window.location.reload(true);
					self.get('common').hideLoader();
					self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				},
				error: function (xhr, textStatus, errorThrown) {
					self.get('common').showNotification('error', '<b>Error! not saved!</b>');
					self.get('common').hideLoader();
				}
			});

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
			//var controller = self.controllerFor('qualityScMonitorings');
			/*self.store.unloadAll('scMonitorings');
	    	var newScMonitorings = self.store.createRecord('scMonitorings',callactivity);
			newScMonitorings.save().then(function(){
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
		reset: function () {
			var self = this;
			var controller = self.controllerFor('qualityScMonitorings');
			var _questions = controller.get('questions');
			self.refresh();
			window.location.reload(true);

		},


	},


});
