telenor.AgentsVocsController = Ember.Controller.extend({
	pageName: 'agentsVocs',
	trials: [{
		idname: 1
	}, {
		idname: 2
	}, {
		// 	idname: 3
		// }, {
		idname: 3
	}],
	connectivity_status: Em.A(),
	satisfaction_status: Em.A(),
	monitoring: Em.A(),
	//segment: Em.A(),
	//dsat_reason: Em.A(),
	category: Ember.A(),

	voc: {
		id: 0,
		trials: 1,
		connectivity_status: 0,
		satisfaction_status: 0,
		campaign: 0,
		segment: 0,
		dsat_reason: 0,
		category: 0,
		feedback: '',
		suggestion: ''
	},
	segment: (function () {
		var _self = this;
		if (this.get('voc.campaign') <= 0) return [];
		return _self.get('model').filter(function (dept) {
			return dept.get('parent_id') == _self.get('voc.campaign');
		})
	}).property('voc.campaign'),
	dsat_reason: (function () {
		var _self = this;
		if (this.get('voc.segment') <= 0) return [];
		return _self.get('model').filter(function (dept) {
			return dept.get('parent_id') == _self.get('voc.segment');
		})
	}).property('voc.segment'),
	category: (function () {
		var _self = this;
		if (this.get('voc.dsat_reason') <= 0) return [];
		return _self.get('model').filter(function (dept) {
			return dept.get('parent_id') == _self.get('voc.dsat_reason');
		})
	}).property('voc.dsat_reason'),



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
		reset: function () {
			var _controller = this; //.controllerFor('agentsVocs');//monitoring_for_id:'',
			_controller.send('reload');
			_controller.set('voc', {
				id: 0,
				trials: 1,
				connectivity_status: 0,
				satisfaction_status: 0,
				campaign: 0,
				segment: 0,
				dsat_reason: 0,
				category: 0,
				feedback: '',
				suggestion: ''
			});


		},
		save: function () {
			var _self = this;
			//  var _self = _self.controllerFor('accalations');
			var voc = _self.get('voc');
			// 	feedback: '',
			// 	suggestion: ''
			// if (voc.id == 0) {

			if (typeof voc.connectivity_status === 'undefined' || voc.connectivity_status == '' || voc.connectivity_status == 0 || voc.connectivity_status == null) {
				_self.get('common').showNotification('error', '<b>Select Connectivity Status!</b>');
				return false;
			}
			if (typeof voc.satisfaction_status === 'undefined' || voc.satisfaction_status == '' || voc.satisfaction_status == 0 || voc.satisfaction_status == null) {
				_self.get('common').showNotification('error', '<b>Select Satisfaction Status!</b>');
				return false;
			}
			if (typeof voc.campaign === 'undefined' || voc.campaign == '' || voc.campaign == 0 || voc.campaign == null) {
				_self.get('common').showNotification('error', '<b>Select Campaign!</b>');
				return false;
			}
			if (typeof voc.segment === 'undefined' || voc.segment == '' || voc.segment == 0 || voc.segment == null) {
				_self.get('common').showNotification('error', '<b>Select Segment!</b>');
				return false;
			}
			if (typeof voc.dsat_reason === 'undefined' || voc.dsat_reason == '' || voc.dsat_reason == 0 || voc.dsat_reason == null) {
				_self.get('common').showNotification('error', '<b>Select DSAT Reason!</b>');
				return false;
			}
			if (typeof voc.category === 'undefined' || voc.category == '' || voc.category == 0 || voc.category == null) {
				_self.get('common').showNotification('error', '<b>Select Category!</b>');
				return false;
			}
			_self.get('common').showOverlay('formVOC');
			_self.store.unloadAll('voc');
			var newVocRecord = _self.store.createRecord('voc', voc);
			newVocRecord.save().then(function (reVoc) {

				_self.get('common').hideOverlay('formVOC');
				_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				_self.send('reset');
			}).catch(function () {
				_self.send('reload');
				_self.get('common').hideOverlay('formVOC');
				_self.get('common').showNotification('Denger', '<b>Can not save Please, try again.!</b>');
			});
			// if (activities.voc_no == '' || activities.voc_no == null) {
			// 	_self.get('common').showNotification('error', '<b>Voc ID is missing!</b>');
			// 	return false;
			// }
			/* Ember.$('#formActivities').isLoading({
                    text: '',
                    tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                    position: "overlay"
				});*/
			// if (activities.voc_process == 'escalation') {
			// 	//	delete activities.activitiesAdjustments;
			// 	var testJSON = {};
			// 	var formData = new FormData();
			// 	formData.set('activity', JSON.stringify(activities));
			// 	formData.append('file', document.getElementById("careemFile").files[0]);
			// 	//var form_data = _self.jsonToFormData (activities, testJSON);
			// 	//form_data.append('file', document.getElementById("careemFile").files[0]);
			// 	console.log(formData);
			// 	_self.get('common').showOverlay('formActivities');
			// 	_self.get('common').ajaxppRequest('POST', 'api/users_api/setActivities?format=json', formData, 'Yes', 'form').then(function (response) { //newRequest is method of our adapter
			// 		// Ember.$('#btnComplaintEditSave').prop("disabled", false);
			// 		_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			// 		_self.get('common').hideOverlay('formActivities');
			// 		_self.send('reload');
			// 		//  Em.$(":file").filestyle('clear');
			// 	}, function (error) { //handle error  
			// 		//Ember.$('#btnComplaintEditSave').prop("disabled", false);
			// 	});
			// } else {
			// 	//	delete activities.activitiesEscalations;
			// 	_self.get('common').showOverlay('formActivities');
			// 	_self.store.unloadAll('activity');
			// 	var activity = _self.store.createRecord('activity', activities);
			// 	activity.save().then(function (act) {
			// 		/*console.log(act);
			// 		console.log(act.meta);
			// 		console.log(act.get("content.meta"));
			// 		console.log();
			// 		console.log(act.get("meta"));*/
			// 		// _self.get('common').showNotification('success', '<b>Voc saved successfully!</b>');
			// 		ac = _self.store.metadataFor("activity")
			// 		if (ac.find) {
			// 			_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
			// 		} else {
			// 			_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			// 		}
			// 		_self.get('common').hideOverlay('formActivities');
			// 		//Ember.$('#formActivities').isLoading("hide");
			// 		_self.send('reload');
			// 		// _self.send('reset');
			// 		//    _self.send('reload');

			// 	});
			// }

			//echo "development is passion about work.";

			// } else {
			// 	if (activities.voc_process == 'escalation') {
			// 		var _activitiesEscalations = _self.get('activities.activitiesEscalations');
			// 		_self.store.unloadAll('ActivitiesEscalation');
			// 		var newAccalation = _self.store.createRecord('ActivitiesEscalation', _activitiesEscalations);
			// 		newAccalation.save().then(function () {
			// 			_self.get('common').showNotification('success', '<b>Escalation saved successfully!</b>');
			// 		});
			// 	} else {
			// 		var _activitiesAdjustments = _self.get('activities.activitiesAdjustments');
			// 		_self.store.unloadAll('ActivitiesAdjustment');
			// 		var newAccalation = _self.store.createRecord('ActivitiesAdjustment', _activitiesAdjustments);
			// 		newAccalation.save().then(function () {
			// 			_self.get('common').showNotification('success', '<b>Adjustment saved successfully!</b>');
			// 		});

			// 	}
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
			//             voc_id:'',
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

			// }

		},
		reload: function () {
			//console.log("I m in controller");
			//this.get('common').consoleClear();

			var _self = this;
			_self.get('common').consoleClear();

			this.get('common').showOverlay('tblVocs');
			this.store.unloadAll('vocs');
			this.store.find('vocs', {
				'status': 'voc'
			}).then(function (vocov) {
				_self.set('voccov', vocov);
				// //_controller.set('vocTotals',_self.store.metadataFor("activities"));
				// _controller.set('vocTotals', activeity.get("length"));
				// //var meta = this.store.metadataFor("post");
				// //Ember.$('#vocs-voc').isLoading("hide");
				_self.get('common').hideOverlay('tblVocs');
			}).catch(function (error) {
				_self.get('common').hideOverlay('tblVocs');
				console.log(error);
			});
			//console.log(_self.store.metadataFor("activities"));
			/*Ember.$.ajax({
				url: 'api/users_api/getMyVocs?format=json',
				type: 'GET',
				data:{'monitoring_for_id': activities, 'voc_process':'voc'},
				success: function(data, textStatus, xhr) {
					if(typeof data.error !== 'undefined'){
						_self.get('common').showNotification('error', '<b>'+data.error+'');
						return;
					}
					_controller.set('teekits',data.table);
					_controller.set('vocTotals',data.total);
					Ember.$('#vocs-voc').isLoading("hide");
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
		}
	}

});
// telenor.AgentvocController = Ember.ObjectController.extend({
// 	need:['agentvocs'],

// });
