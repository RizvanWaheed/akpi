telenor.UploadersInOutTimesRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'uploadersInOutTimes',

	renderTemplate: function () {
		this.render('uploaders/inOutTimes');
	},
	/*beforeModel: function() {
		// var status = false;
		// console.log(this.controllerFor("application").get('modules').findBy("link", "aaa"));
		// console.log(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "aaa")));
		
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "quality.inOutTimes"))){
			this.transitionTo('/');
		}
    },*/
	model: function () {
		return this.store.find('monitoringFors');
		//	console.log(storing);
		//	return ;
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		//applicationController = this.controllerFor("application");
		//this.set('baseUrl',applicationController.get("applicationURL"));
		//controller.set('myName',applicationController.get("userName"));

		//controller.get('monitoredBy').clear();
		/*this.store.find('monitoringFors').then(function(mf){
			controller.set('monitoredBy', mf);
		});*/

		/*this.store.find('users',{role_id:5}).then(function(user){
			controller.set('officer', user);
		})*/
		/*controller.get('monitoredBy').pushObject({id:1, name:'Customer'});
		controller.get('monitoredBy').pushObject({id:2, name:'captain'});*/
		/*this.store.find('domains',{parent_id:1, include:'parent'}).then(function(area) {
            controller.set('cities', area);
        });*/
		//  controller.get('country').clear();
		/*controller.get('cities').clear();
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
		});*/

		/*controller.get('agentStatus').clear();
		controller.get('agentStatus').pushObject({id:1, name:'Open'});
		controller.get('agentStatus').pushObject({id:2, name:'Hold'});
		controller.get('agentStatus').pushObject({id:3, name:'Pending'});
		controller.get('agentStatus').pushObject({id:4, name:'New'});
		controller.get('agentStatus').pushObject({id:5, name:'You'});*/

		controller.set('model', model);
	},
	success: function (self) {
		self.get('common').hideLoader();
		this.get('common').showNotification('success', 'File saved successfully !');
		//noty({ type:'success', theme:'relax', text:'File saved successfully !'});
		this.clearing();
	},
	failure: function (self) {
		self.get('common').hideLoader();
		this.get('common').showNotification('error', 'Failed to save file!');
		//noty({ type:'error', theme:'relax', text:'Failed to save file!'});
		this.clearing();
	},
	clearing: function () {
		var _self = this;
		var _controller = this.controllerFor('uploadersInOutTimes');
		_controller.set('monitoring_for_id', 0);
		_self.set("aqmsuploadFile", '');
		//	 this.set("generateleadFile2", '');
		//	 this.set("generateleadFile3", '');
	},
	actions: {
		uploadCallDataFile: function (Id) {
			var _self = this;
			var _controller = this.controllerFor('uploadersInOutTimes');
			console.log(_controller.get('monitoring_for_id'));
			// return false;

			var file = document.getElementById(Id).files[0];
			if (typeof file === 'undefined') {
				noty({
					type: 'error',
					text: 'Please select a file',
					theme: 'relax'
				});
				return false;
			} else if (file.size <= 0) {
				noty({
					type: 'error',
					text: 'File size is less then 0',
					theme: 'relax'
				});
				return false;
			} else if (file.size > 10000000) {
				noty({
					type: 'error',
					text: 'File size cannot exceed 10 MB',
					theme: 'relax'
				});
				return false;
			} else if (file.error > 0) {
				noty({
					type: 'error',
					text: 'File error No. ' + file.error,
					theme: 'relax'
				});
				return false;
			} else if (file.name.split('.').pop() != "csv" && file.name.split('.').pop() != "CSV") { //file.type.indexOf('csv') == -1) {
				noty({
					type: 'error',
					text: 'Only CSV(.csv) extension is allowed, please choose a CSV file.',
					theme: 'relax'
				});
				return false;
			}

			// console.log(file);
			// file['size'] > 0)
			//  _self.get('common').showLoader();

			var formData = new FormData();
			formData.set("file", file);
			formData.set("type", Id);
			formData.set("fromDate", _controller.get('fromDate'));

			// formData.append(file, frm);



			_self.get('common').ajaxppRequest('POST', 'api/Uploaders/uploadInOutTimesFile?format=json', formData, 'Yes', 'form').then(this.success.bind(this), this.failure.bind(this));

			// var request = Ember.$.ajax({
			//     url: "api/users_api/uploadInOutTimesFile",
			//     type: 'POST',
			//     data:  formData,
			//   	//async: false,
			//     mimeType:"multipart/form-data",
			//     contentType: false,
			//     cache: false,
			//     processData:false
			// });
			// request.then(this.success.bind(this), this.failure.bind(this));

			/* var request = Ember.$.post("api/users_api/saveFsTaskDetail", frm);
    		request.then(this.success.bind(this), this.failure.bind(this));*/

			//return ;
		},
		delete: function (dt) {
			var _self = this;
			var _controller = this.controllerFor('qualityRendomizings');
			_self.store.unloadAll('rendomizing');
			var newEmailDriver = this.store.createRecord('rendomizing', {
				id: dt.get('id'),
				status: 0,
			});
			newEmailDriver.save().then(function (ans) {

			});
		},
		save: function (activities) {
			var _self = this;
			var _controller = this.controllerFor('qualityRendomizings');
			/*activities:{
		    	monitoring_for_id:'',
		    	email_driver_id:'',
		    	email_reason_id:'',
		    	ticket_no:'',
		    	status:'',
		    },*/
			console.log(activities);
			if (typeof activities.monitoring_for_id === 'undefined' || activities.monitoring_for_id == '' || activities.monitoring_for_id == 0 || activities.monitoring_for_id == null) {
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			if (typeof activities.belong_id === 'undefined' || activities.belong_id == '' || activities.belong_id == 0 || activities.belong_id == null) {
				_self.get('common').showNotification('error', '<b>Type not selected!</b>');
				return false;
			}
			if (typeof activities.user_id === 'undefined' || activities.user_id == '' || activities.user_id == 0 || activities.user_id == null) {
				_self.get('common').showNotification('error', '<b>QA Officer not selected!</b>');
				return false;
			}
			if (activities.percentage == '' || activities.percentage == null) {
				_self.get('common').showNotification('error', '<b>Percentage is missing!</b>');
				return false;
			}

			//data = {'activities':activities};
			Ember.$.ajax({
				url: 'api/users_api/rendomizings?format=json',
				type: 'POST',
				data: activities,
				success: function (data, textStatus, xhr) {
					//console.log(data);
					if (data.find) {
						_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
					} else {
						_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
					}
					//	_self.send('reset');
					_self.send('reload');
				}
			});

			/*_self.store.unloadAll('rendomizing');
			var newEmailDriver = this.store.createRecord('rendomizing',activities);
			newEmailDriver.save(function(aaa){
				console.log(aaa);
			}).then(function(ans){
				console.log(ans);
				
			});	*/
		},
		reset: function () {
			var _controller = this.controllerFor('qualityRendomizings'); //monitoring_for_id:'',
			_controller.set('activities', {
				email_driver_id: '',
				email_reason_id: '',
				ticket_no: '',
				status: ''
			});
		},
		reload: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this.controllerFor('qualityRendomizings');
			var activities = _controller.get('rendomizing.monitoring_for_id');
			/*if(typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}*/
			Ember.$.ajax({
				url: 'api/users_api/getMyRendomizings?format=json',
				type: 'GET',
				data: {
					'monitoring_for_id': activities
				},
				success: function (data, textStatus, xhr) {
					if (typeof data.error !== 'undefined') {
						_self.get('common').showNotification('error', '<b>' + data.error + '');
						return;
					}
					_controller.set('teekits', data.table);
					_controller.set('ticketTotals', data.total);
					/*if(data.UserStateLogs.user_state_id != 4){
						controller.set('alreadyLogin', false);
					}
					else{
						controller.set('alreadyLogin', true);
					}
					console.log(controller.get('alreadyLogin'));
					console.log(data.UserStateLogs.user_state_id);*/
				}
			});
		}
	}
});
