telenor.AgentsTasksController = Ember.Controller.extend({
	pageName: 'agentsTasks',
	sortProperties: ['name'],
	sortAscending: true, // false = descending
	totalClosedTasks: 0,
	totalOpenTask: 0,

	campaignLevel: 4,
	//itemController: 'agenttask',
	monitoredBy: Ember.A(),
	typeEmailDriver: 1,
	EmailDriveId: 0,
	agenttaskname: '',
	agenttaska: Ember.A(),
	babyApolloForm: [{
		id: 'yes',
		name: 'Yes'
	}, {
		id: 'no',
		name: 'No'
	}],
	agentStatus: [{
		id: 1,
		name: 'Open'
	}, {
		id: 2,
		name: 'Hold'
	}, {
		id: 3,
		name: 'Pending'
	}, {
		id: 4,
		name: 'New'
	}, {
		id: 5,
		name: 'You'
	}],
	teekits: Ember.A(),
	taskTotals: 0,
	teekits2: Ember.A(),
	taskTotals2: 0,
	teekits3: Ember.A(),
	taskTotals3: 0,
	cities: Ember.A(),
	departments: Ember.A(),
	adjustmentShow: false,
	escalationShow: false,
	// adjustmentShow:(function() {
	//     return (this.get('activities.task_process') == 'adjustment')?true:false;
	// }).property('activities.task_process'),
	// escalationShow:(function() {
	//     return (this.get('activities.task_process') == 'escalation')?true:false;
	// }).property('activities.task_process'),
	showHide: function () {
		var task_process = this.get('activities.task_process');

		if (task_process == 'adjustment') {
			this.set('adjustmentShow', true);
			this.set('escalationShow', false);
		} else if (task_process == 'escalation') {
			this.set('adjustmentShow', false);
			this.set('escalationShow', true);
		} else {
			this.set('adjustmentShow', false);
			this.set('escalationShow', false);
		}

	}.observes('activities.task_process'),
	taskProcess: [{
		id: 'escalation',
		name: 'Escalation'
	}], //{id:'task_adjustment', name:'Task & Adjustment'}, 
	adjustment: [{
		id: 'not_require',
		name: 'Not Require'
	}, {
		id: 'require',
		name: 'Require'
	}, {
		id: 'pending',
		name: 'Pending'
	}, {
		id: 'done',
		name: 'Done'
	}],
	//captainAdjustment:[{id:'task', name:'Task'}, {id:'adjustment', name:'adjustment'}],

	activities: {
		id: 0,
		monitoring_for_id: '',
		email_driver_id: '',
		email_sub_driver_id: '',
		email_reason_id: '',
		email_sub_reason_id: '',
		task_no: '',
		domain_id: '',
		baby_apollo: 'no',
		status: '',
		task_process: 'task',
		booking_no: '',
		activitiesAdjustments: {
			id: 0,
			activity_id: 0,
			amount: 0,
			customer_adjustment: 'not_require',
			captain_adjustment: 'not_require',
			comment: ''
		},
		activitiesEscalations: {
			id: 0,
			activity_id: 0,
			department_id: 2,
			sub_department_id: 11,
			name: '',
			email: '',
			contact: '',
			attachment: '',
			comment: ''
		}
	},
	activityIdsync: function () {
		this.set('activities.activitiesAdjustments.activity_id', this.get('activities.id'));
	}.observes('activities.id'),
	subDepartments: (function () {
		console.log(this.get('activities.activitiesEscalations.department_id'));
		observerValue = this.get('activities.activitiesEscalations.department_id');
		if (Em.isEmpty(observerValue) || observerValue <= 0) {
			return Em.A();
		}
		var self = this;
		return this.get('model.departments').filter(function (dept) {
			return dept.get('parent_id') == observerValue;
		});

	}).property('activities.activitiesEscalations.department_id'),
	drivers: Ember.A(),
	customerShow: true,
	emailDriver: Ember.A(),
	emailDriverSub: Ember.A(),
	emailDriverReason: Ember.A(),
	emailDriverReasonSub: Ember.A(),

	emailDriverStyle: "display:block",
	emailDriverSubStyle: "display:block",
	emailDriverReasonStyle: "display:block",
	emailDriverReasonSubStyle: "display:block",


	funcEmailDriverSub0: function () {
		var _self = this;
		var value = this.get('activities.email_sub_driver_id');
		// if(typeof value === 'undefined' || value == '' || value < 0){
		// 	return false;
		// }
		// console.log('function funcEmailDriverSub0');
		//console.log(value);
		//var monitoring_for_id = this.get('activities.monitoring_for_id');

		if (_self.get('campaignLevel') == 2) {
			_self.set('activities.email_driver_id', value);
		} else {
			_self.findCategory('activities.email_sub_driver_id', 'activities.email_driver_id')

			//_self.set('activities.email_driver_id', _self.findCategory(value));
			// var valing = this.get('drivers').filter(function(driver) {
			// 	return driver.get('id') == value;
			// });
			// //console.log(valing.objectAt(0));
			// valing.forEach(function(asd){//console.log(asd.get('parent_id'));
			// 	_self.set('activities.email_driver_id', asd.get('parent_id.id'));
			// });
		}
		//console.log('function funcEmailDriverSub0 end');
		//console.log(valing);
		//this.set('emailDriverSub', valing);
	}.observes('activities.email_sub_driver_id'),
	funcEmailDriverSub: function () {
		var _self = this;
		var value = this.get('activities.email_reason_id');
		// if(typeof value === 'undefined' || value == '' || value < 0){
		// 	return false;
		// }
		//var monitoring_for_id = this.get('activities.monitoring_for_id');
		if (_self.get('campaignLevel') == 2) {
			_self.set('activities.email_sub_driver_id', value);
		} else {
			_self.findCategory('activities.email_reason_id', 'activities.email_sub_driver_id')
			// _self.set('activities.email_sub_driver_id', _self.findCategory(value));
			// var valing = this.get('emailDriverReason').filter(function(driver) {
			// 	return driver.get('id') == value;
			// });
			// valing.forEach(function(asd){
			// 	_self.set('activities.email_sub_driver_id', asd.get('parent_id.id'));
			// });
		}
	}.observes('activities.email_reason_id'),
	funcEmailDriverSub2: function () {
		var _self = this;
		_self.findCategory('activities.email_sub_reason_id', 'activities.email_reason_id')
		//var value = this.get('activities.email_sub_reason_id');

		// console.log(value);
		// console.log(value);
		// console.log(value);
		//console.log('function funcEmailDriverSub2');
		//_self.set('activities.email_reason_id', _self.findCategory(value));
		// var valing = this.get('emailDriverReasonSub').filter(function(driver) {
		// 	return driver.get('id') == value;
		// });
		// // console.log(valing.get('firstObject').parent_id);
		// // _self.set('activities.email_reason_id', valing.get('firstObject').get('data').parent_id);
		// // console.log(valing.get('firstObject').get('data').parent_id);
		// valing.forEach(function(asd){
		// 	//console.log(asd.get('parent_id.id'));
		// 	_self.set('activities.email_reason_id', asd.get('parent_id.id'));
		// });


	}.observes('activities.email_sub_reason_id'),

	findCategory: function (getField, setField) {
		var _self = this;
		var value = this.get(getField);

		if (Em.isEmpty(value) || Em.isBlank(value)) { //typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		console.log(value);
		//this.get('drivers').find()
		var valing = this.get('drivers').filter(function (driver) {
			//console.log(driver.get('id'));
			return driver.get('id') == value;
			//return driver.id == value;
		});
		//console.log(valing.get('firstObject'));
		_self.set(setField, valing.get('firstObject').get('parent_id.id')); //return valing.get('firstObject').get('parent_id').get('id');
		//return valing.get('firstObject').get('parent_id.id');
	},
	jsonToFormData: function (inJSON, inTestJSON, inFormData, parentKey) {
		var _self = this;
		// http://stackoverflow.com/a/22783314/260665
		// Raj: Converts any nested JSON to formData.
		var form_data = inFormData || new FormData();
		var testJSON = inTestJSON || {};
		for (var key in inJSON) {
			// 1. If it is a recursion, then key has to be constructed like "parent.child" where parent JSON contains a child JSON
			// 2. Perform append data only if the value for key is not a JSON, recurse otherwise!
			var constructedKey = key;
			if (parentKey) {
				constructedKey = parentKey + "." + key;
			}

			var value = inJSON[key];
			if (value && value.constructor === {}.constructor) {
				// This is a JSON, we now need to recurse!
				_self.jsonToFormData(value, testJSON, form_data, constructedKey);
			} else {
				form_data.append(constructedKey, inJSON[key]);
				testJSON[constructedKey] = inJSON[key];
			}
		}
		return form_data;
	},
	actions: {
		funcCloseTask: function (agntsk) {
			var controller = this;
			controller.get('common').consoleClear();
			console.log(agntsk);
			var data = {
				status: 0,
				id: agntsk.id
			};
			this.get('common').ajaxppRequest('POST', 'api/users_api/setUserTasks?format=json', data, 'Yes').then(function (response) {
					// console.log(response);
					// controller.set('openTask', response);
					// controller.set('totalOpenTask', response.get("length"));
					controller.get('common').showNotification('success', '<b>Saved successfully!</b>');
				},
				function (response) {
					console.log(response);
					controller.get('common').showNotification('warning', '<b>Error Please try again!</b>');
				});
		},
		reloadOpen: function () {
			//console.log("I m in controller");
			//this.get('common').consoleClear();

			var controller = this;
			controller.get('common').consoleClear();
			var data = {
				status: 1,
				user: 'me'
			};
			this.get('common').ajaxppRequest('GET', 'api/users_api/getUserTasks?format=json', data, 'Yes').then(function (response) {
					// console.log(response);
					controller.set('openTask', response);
					controller.set('totalOpenTask', response.get("length"));
					//_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
				},
				function (response) {
					console.log(response);
					//_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				});
			// this.store.find('agentTasks', {
			// 	'status': 1
			// }).then(function (data) {
			// 	controller.set('model.taskOpen', data);
			// 	controller.set('totalOpenTask', data.get("length"));
			// });
			// controller.set('model', Ember.RSVP.hash({
			// 	taskOpen: this.store.find('agentTasks', {
			// 		'status': 1
			// 	}),
			// 	taskClose: this.store.find('agentTasks', {
			// 		'status': 0
			// 	})
			// }));

			// controller.set('totalClosedTasks', controller.get('model.taskClose').get("length"));
			//this.send("reload");
			//this.get('model').reload();
			return;
		},
		reloadClosed: function () {
			//console.log("I m in controller");
			//this.get('common').consoleClear();

			var controller = this;

			controller.get('common').consoleClear();

			var data = {
				status: 0,
				user: 'me'
			};
			this.get('common').ajaxppRequest('GET', 'api/users_api/getUserTasks?format=json', data, 'Yes').then(function (response) {
					console.log(response);
					controller.set('closeTask', response);
					controller.set('totalClosedTasks', response.get("length"));
					//_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
				},
				function (response) {
					console.log(response);
					//_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				});


			// this.store.find('agentTasks', {
			// 	'status': 0
			// }).then(function (data) {
			// 	controller.set('model.taskClose', data);
			// 	controller.set('', data.get("length"));
			// });
			// controller.set('model', Ember.RSVP.hash({
			// 	taskOpen: this.store.find('agentTasks', {
			// 		'status': 1
			// 	}),
			// 	taskClose: this.store.find('agentTasks', {
			// 		'status': 0
			// 	})
			// }));

			// controller.set('', controller.get('model.taskClose').get("length"));
			//this.send("reload");
			//this.get('model').reload();
			return;
		},
		reset: function () {
			var _controller = this; //.controllerFor('agentsTasks');//monitoring_for_id:'',
			_controller.set('activities', {
				id: 0,
				monitoring_for_id: '',
				email_driver_id: '',
				email_sub_driver_id: '',
				email_reason_id: '',
				email_sub_reason_id: '',
				task_no: '',
				domain_id: '',
				status: '',
				task_process: 'task',
				booking_no: '',
				baby_apollo: 'no',
				activitiesAdjustments: {
					id: 0,
					activity_id: 0,
					amount: 0,
					customer_adjustment: 'not_require',
					captain_adjustment: 'not_require',
					comment: ''
				},
				activitiesEscalations: {
					id: 0,
					activity_id: 0,
					department_id: 0,
					sub_department_id: 0,
					name: '',
					email: '',
					contact: '',
					attachment: '',
					comment: ''
				}

			});
			_controller.set('activities.monitoring_for_id', _controller.get('model.campaign').get('firstObject').id);
		},
		save: function () {
			var _self = this;
			//  var _self = _self.controllerFor('accalations');
			var activities = _self.get('activities');



			// formData.set("aaa", 1000);
			// formData.set("bbbb", 1000);
			// var formData = new FormData();
			// for( var key in activities ) {
			// 	console.log(key);
			// 	console.log(activities[key]);
			// 	formData.set("'"+key+"'", activities[key]);
			// }

			// activities.forEach(function(activity, key) {
			// 	console.log(activity );
			// 	console.log(key);
			// });

			//console.log(form_data);
			// console.log(activities);
			//  console.log(_accalation); 
			// return false;
			// var _caller = _self.get('caller');
			//$('#catAccalation').val();
			// var a = _accalation.msisdn.trim().toString().length;
			/*
			            if (a != 12 || _accalation.msisdn <= 920000000000) {
			                _self.get('common').showNotification('error', '<b>Enter 12 Digit Phone Number starts with 92XXXXXXXXXX !</b>');
			                return false;
			            } else if (_accalation.msisdn == '') {
			                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
			                return false;
			            }*/
			// return false;
			//   Ember.$('#btnAccalationEditSave').prop("disabled", true);

			//    var id = Ember.$('#idAccalation').val();
			//    var self = this;
			//    var controller = self.controllerFor('accalations');
			if (activities.id == 0) {

				if (typeof activities.monitoring_for_id === 'undefined' || activities.monitoring_for_id == '' || activities.monitoring_for_id == 0 || activities.monitoring_for_id == null) {
					_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
					return false;
				}
				if (typeof activities.email_driver_id === 'undefined' || activities.email_driver_id == '' || activities.email_driver_id == 0 || activities.email_driver_id == null) {
					_self.get('common').showNotification('error', '<b>Category not selected!</b>');
					return false;
				}
				if (typeof activities.email_reason_id === 'undefined' || activities.email_reason_id == '' || activities.email_reason_id == 0 || activities.email_reason_id == null) {
					_self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
					return false;
				}
				if (typeof activities.domain_id === 'undefined' || activities.domain_id == '' || activities.domain_id == 0 || activities.domain_id == null) {
					_self.get('common').showNotification('error', '<b>City not selected!</b>');
					return false;
				}
				if (typeof activities.status === 'undefined' || activities.status == '' || activities.status == 0 || activities.status == null) {
					_self.get('common').showNotification('error', '<b>Status not selected!</b>');
					return false;
				}
				if (activities.task_no == '' || activities.task_no == null) {
					_self.get('common').showNotification('error', '<b>Task ID is missing!</b>');
					return false;
				}
				/* Ember.$('#formActivities').isLoading({
                    text: '',
                    tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                    position: "overlay"
				});*/
				if (activities.task_process == 'escalation') {
					//	delete activities.activitiesAdjustments;
					var testJSON = {};
					var formData = new FormData();
					formData.set('activity', JSON.stringify(activities));
					formData.append('file', document.getElementById("careemFile").files[0]);
					//var form_data = _self.jsonToFormData (activities, testJSON);
					//form_data.append('file', document.getElementById("careemFile").files[0]);
					console.log(formData);
					_self.get('common').showOverlay('formActivities');
					_self.get('common').ajaxppRequest('POST', 'api/users_api/setActivities?format=json', formData, 'Yes', 'form').then(function (response) { //newRequest is method of our adapter
						// Ember.$('#btnComplaintEditSave').prop("disabled", false);
						_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
						_self.get('common').hideOverlay('formActivities');
						_self.send('reload');
						//  Em.$(":file").filestyle('clear');
					}, function (error) { //handle error  
						//Ember.$('#btnComplaintEditSave').prop("disabled", false);
					});
				} else {
					//	delete activities.activitiesEscalations;
					_self.get('common').showOverlay('formActivities');
					_self.store.unloadAll('activity');
					var activity = _self.store.createRecord('activity', activities);
					activity.save().then(function (act) {
						/*console.log(act);
						console.log(act.meta);
						console.log(act.get("content.meta"));
						console.log();
						console.log(act.get("meta"));*/
						// _self.get('common').showNotification('success', '<b>Task saved successfully!</b>');
						ac = _self.store.metadataFor("activity")
						if (ac.find) {
							_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
						} else {
							_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
						}
						_self.get('common').hideOverlay('formActivities');
						//Ember.$('#formActivities').isLoading("hide");
						_self.send('reload');
						// _self.send('reset');
						//    _self.send('reload');

					});
				}

				//echo "development is passion about work.";

			} else {
				if (activities.task_process == 'escalation') {
					var _activitiesEscalations = _self.get('activities.activitiesEscalations');
					_self.store.unloadAll('ActivitiesEscalation');
					var newAccalation = _self.store.createRecord('ActivitiesEscalation', _activitiesEscalations);
					newAccalation.save().then(function () {
						_self.get('common').showNotification('success', '<b>Escalation saved successfully!</b>');
					});
				} else {
					var _activitiesAdjustments = _self.get('activities.activitiesAdjustments');
					_self.store.unloadAll('ActivitiesAdjustment');
					var newAccalation = _self.store.createRecord('ActivitiesAdjustment', _activitiesAdjustments);
					newAccalation.save().then(function () {
						_self.get('common').showNotification('success', '<b>Adjustment saved successfully!</b>');
					});

				}
				//formData.append('accalation',_accalation);

				//     var _activitiesAdjustments = _self.get('activities.activitiesAdjustments');
				//    // _activitiesAdjustments.accalation_id = _accalation.id;
				// //   console.log(_activitiesAdjustments)
				//     _self.store.unloadAll('ActivitiesAdjustment');
				//     var newAccalation = _self.store.createRecord('ActivitiesAdjustment',_activitiesAdjustments);
				//     newAccalation.save().then(function(){
				//         //Ember.$('#idAccalation').val(0),
				//         //Ember.$('#catAccalation').val('');
				//         //Ember.$('#descAccalation').val('');
				//         //controller.set('accalationTypeStatus','');
				//         //self.send('clog');//();
				//         _self.get('common').showNotification('success', '<b>Adjustment saved successfully!</b>');
				//       /*  _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id }).then(function(logAccalation){
				//             _self.set('accalationLogs', logAccalation);
				//         });*/

				//        // Ember.$('#btnAccalationEditSave').prop("disabled", false);
				//        /* _self.set('accalation', {
				//             id:0,
				//             booking_id:'',
				//             task_id:'',
				//             name:'',
				//             mobile:'',
				//             email:'',
				//             domain_id:'',
				//             statement:'',
				//             cname:'',
				//             cmobile:'', 
				//             cstatement:'',
				//             remarks:'',
				//             accalationLog:{
				//                 id:0,
				//                 accalation_id:0,
				//                 state_id:6,
				//                 remarks:'',
				//             }
				//         });*/
				//         //self.send('reloadAll');
				//         // _self.send('reset');
				//        // _self.send('reload');
				//      //   Ember.$.isLoading("hide");
				//     });

				// var formData = new FormData();
				// formData.set("careemFile" , document.getElementById("careemFile").files[0]);//JSON.stringify()
				//formData.set("accalationLog", JSON.stringify(_accalationLog));

				/*Ember.$.ajax({
                    url: 'api/users_api/accalationLogs/?format=json',
                    type: 'POST',
                    data: formData, //{ accalation:_accalation, caller:_caller, accalationLog:_accalationLog, imageForm:formData },
                    mimeType:"multipart/form-data",
		            contentType: false,//'json',
                    cache : false,
    				processData: false,
                    success: function(data, textStatus, xhr) {
                        _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id }).then(function(logAccalation){
                        	_self.set('accalationLogs', logAccalation);
                        });
                    	_self.get('common').showNotification('success', '<b>Comment saved successfully!</b>');
                        _self.send('reset');
                        Ember.$.isLoading("hide");
                        _self.store.unloadAll('myaccalations');
                        Ember.$('#btnAccalationEditSave').prop("disabled", false);
                        Em.$(":file").filestyle('clear');
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //alert('not found');
                        Ember.$.isLoading("hide");
                        Ember.$('#btnAccalationEditSave').prop("disabled", false);
                    }
                });*/


				// console.log(_accalationLog);
				// return false;

				/*var newAccalation = _self.store.createRecord('accalationLog', _accalationLog);
				newAccalation.save().then(function() {
				    //Ember.$('#idAccalation').val(0);
				    //Ember.$('#commAccalation').val('');
				    //Ember.$('#btnAccalationEditSave').prop("disabled", false);
				     _self.send('reset');
				     Ember.$.isLoading("hide");
				});*/

			}

		},
		reload: function () {
			//console.log("I m in controller");
			//this.get('common').consoleClear();

			var controller = this;
			controller.get('common').consoleClear();
			controller.set('model', Ember.RSVP.hash({
				taskOpen: this.store.find('agentTasks', {
					'status': 1
				}),
				taskClose: this.store.find('agentTasks', {
					'status': 0
				})
			}));
			controller.set('totalOpenTask', controller.get('model.taskOpen').get("length"));
			controller.set('totalClosedTasks', controller.get('model.taskClose').get("length"));
			//this.send("reload");
			//this.get('model').reload();
			return;
			var _controller = this; //.controllerFor('agentsTasks');
			// var activities = _controller.get('activities.monitoring_for_id');
			// if (typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null) {
			// 	_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
			// 	return false;
			// }
			/*Ember.$('#tasks-task').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
			//console.log('before common');
			//console.log(this.get('common'));
			// console.log('after common');
			// return;
			this.get('common').showOverlay('tasks-task');

			this.store.unloadAll('activities');
			this.store.find('activities', {
				'monitoring_for_id': activities,
				'task_process': 'task'
			}).then(function (activeity) {
				_controller.set('teekits', activeity);
				//_controller.set('taskTotals',_self.store.metadataFor("activities"));
				_controller.set('taskTotals', activeity.get("length"));
				//var meta = this.store.metadataFor("post");
				//Ember.$('#tasks-task').isLoading("hide");
				_self.get('common').hideOverlay('tasks-task');
			}).catch(function (error) {
				_self.get('common').hideOverlay('tasks-task');
				console.log(error);
			});
			//console.log(_self.store.metadataFor("activities"));
			/*Ember.$.ajax({
			    url: 'api/users_api/getMyTasks?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'task_process':'task'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	_controller.set('teekits',data.table);
			    	_controller.set('taskTotals',data.total);
			    	Ember.$('#tasks-task').isLoading("hide");
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		reloadAdjustment: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this; //.controllerFor('agentsTasks');
			var activities = _controller.get('activities.monitoring_for_id');
			if (typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null) {
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			/*Ember.$('#tasks-adjustment').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
			this.get('common').showOverlay('tasks-adjustment');
			this.store.unloadAll('activities');
			this.store.find('activities', {
				'monitoring_for_id': activities,
				'task_process': 'adjustment'
			}).then(function (activeity) {
				_controller.set('teekits2', activeity);
				//_controller.set('taskTotals',_self.store.metadataFor("activities"));
				_controller.set('taskTotals2', activeity.get("length"));
				//Ember.$('#tasks-adjustment').isLoading("hide");
				_self.get('common').hideOverlay('tasks-adjustment');
			}).catch(function (error) {
				_self.get('common').hideOverlay('tasks-adjustment');
				console.log(error);
			});
			//console.log(_self.store.metadataFor("activities"));
			//return;

			/*Ember.$.ajax({
			    url: 'api/users_api/getMyTasks?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'task_process': 'adjustment'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	//_controller.set('teekits2',data.table);
			    	//_controller.set('taskTotals2',data.total);
			    	
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		reloadEscalation: function () {
			this.get('common').consoleClear();
			this.refresh();
			return;
			var _self = this;
			var _controller = this; //.controllerFor('agentsTasks');
			var activities = _controller.get('activities.monitoring_for_id');
			if (typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null) {
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			/*Ember.$('#tasks-adjustment').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
			this.get('common').showOverlay('tasks-escalation');
			this.store.unloadAll('activities');
			this.store.find('activities', {
				'monitoring_for_id': activities,
				'task_process': 'escalation'
			}).then(function (activeity) {
				_controller.set('teekits3', activeity);
				//_controller.set('taskTotals',_self.store.metadataFor("activities"));
				_controller.set('taskTotals3', activeity.get("length"));
				//Ember.$('#tasks-adjustment').isLoading("hide");
				_self.get('common').hideOverlay('tasks-escalation');
			}).catch(function (error) {
				_self.get('common').hideOverlay('tasks-escalation');
				console.log(error);
			});
			//console.log(_self.store.metadataFor("activities"));
			//return;

			/*Ember.$.ajax({
			    url: 'api/users_api/getMyTasks?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'task_process': 'adjustment'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	//_controller.set('teekits2',data.table);
			    	//_controller.set('taskTotals2',data.total);
			    	
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		editAdjustment: function (activities) {
			console.log('edit');

			//return;
			var _controller = this; //.controllerFor('agentsTasks');//monitoring_for_id:'',
			_controller.set('activities.task_process', 'adjustment');
			_controller.set('activities.id', activities.id);
			_controller.set('activities.monitoring_for_id', activities.get('monitoring_for_id.id'));
			_controller.set('activities.email_driver_id', activities.get('email_driver_id.id'));
			_controller.set('activities.email_sub_driver_id', activities.get('email_sub_driver_id.id'));
			_controller.set('activities.email_reason_id', activities.get('email_reason_id.id'));
			_controller.set('activities.email_sub_reason_id', activities.get('email_sub_reason_id.id'));
			_controller.set('activities.task_no', activities.get('task_no'));
			_controller.set('activities.domain_id', activities.get('domain_id.id'));
			_controller.set('activities.status', activities.get('status'));
			_controller.set('activities.booking_no', activities.get('booking_no'));

			this.store.find('activitiesAdjustment', {
				'activity_id': activities.id
			}).then(function (activeity) {
				//console.log(activeity.get(0));
				//_controller.set('teekits',activeity);
				//_controller.set('taskTotals',activeity.get("length"));
				activeity.forEach(function (asd) { //console.log(asd.get('parent_id'));
					_controller.set('activities.activitiesAdjustments', {
						id: asd.get('id'),
						activity_id: asd.get('activity_id'),
						amount: asd.get('amount'),
						customer_adjustment: asd.get('customer_adjustment'),
						captain_adjustment: asd.get('captain_adjustment'),
						comment: asd.get('comment')


					});
				});
				/*_controller.set('activities.activitiesAdjustments',{
			    		id:activeity[0].get('id'),
			    		activity_id:activeity[0].get('activity_id'),
			    		amount:activeity[0].get('amount'),
			    		customer_adjustment:activeity[0].get('customer_adjustment'),
			    		captain_adjustment:activeity[0].get('captain_adjustment'),
			    		comment:activeity[0].get('comment')
			    		

			    });*/
				//Ember.$('#tasks-task').isLoading("hide");
			});
			return;
			//_controller.set('activities', activities);
			// copy complaint process


		},
		editEscalation: function (activities) {
			console.log('edit');

			//return;
			var _controller = this; //.controllerFor('agentsTasks');//monitoring_for_id:'',
			_controller.set('activities.task_process', 'escalation');
			_controller.set('activities.id', activities.id);
			_controller.set('activities.monitoring_for_id', activities.get('monitoring_for_id.id'));
			_controller.set('activities.email_driver_id', activities.get('email_driver_id.id'));
			_controller.set('activities.email_sub_driver_id', activities.get('email_sub_driver_id.id'));
			_controller.set('activities.email_reason_id', activities.get('email_reason_id.id'));
			_controller.set('activities.email_sub_reason_id', activities.get('email_sub_reason_id.id'));
			_controller.set('activities.task_no', activities.get('task_no'));
			_controller.set('activities.domain_id', activities.get('domain_id.id'));
			_controller.set('activities.status', activities.get('status'));
			_controller.set('activities.booking_no', activities.get('booking_no'));

			this.store.find('activitiesEscalations', {
				'activity_id': activities.id
			}).then(function (activeity) {
				var asd = activeity.get('firstObject');
				console.log('asd str');
				console.log(asd);
				console.log('asd end');
				_controller.set('activities.activitiesEscalations.department_id', asd.get('department_id.id'));
				_controller.set('activities.activitiesEscalations', {
					id: asd.get('id'),
					activity_id: asd.get('activity_id'),
					department_id: asd.get('department_id.id'),
					sub_department_id: asd.get('sub_department_id.id'),
					name: asd.get('name'),
					email: asd.get('email'),
					contact: asd.get('contact'),
					attachment: asd.get('attachment'),
					comment: asd.get('comment')
				});
				_controller.set('activities.activitiesEscalations.sub_department_id', asd.get('sub_department_id.id'));
				//console.log(activeity.get(0));
				//_controller.set('teekits',activeity);
				//_controller.set('taskTotals',activeity.get("length"));
				// activeity.forEach(function(asd){//console.log(asd.get('parent_id'));
				// 	_controller.set('activities.activitiesEscalation',{
				// 		id:asd.get('id'),
				// 		activity_id:asd.get('activity_id'),
				// 		department_id:asd.get('department_id.id'),
				// 		sub_department_id:asd.get('department_id.id'),
				// 		name:asd.get('name'),
				// 		email:asd.get('email'),
				// 		contact:asd.get('contact'),
				// 		attachment:asd.get('attachment'),
				// 		comment:asd.get('comment')
				// 	});
				// });

				//Ember.$('#tasks-task').isLoading("hide");
			});
			return;
			//_controller.set('activities', activities);
			// copy complaint process


		}
	}

});
// telenor.AgenttaskController = Ember.ObjectController.extend({
// 	need:['agenttasks'],

// });
