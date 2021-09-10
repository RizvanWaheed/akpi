telenor.TeamleadStatusViewsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'teamleadStatusViews',

	renderTemplate: function () {
		this.render('teamlead/statusViews');
	},
	model: function () {
		// return [];
		var search = {
			'role_id': 314,
			'project_id': this.get('iMyMe.project_id')
		};
		return this.store.find('users', {
			'search': search
		});
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		/*
		applicationController = this.controllerFor("application");
		this.set('baseUrl',applicationController.get("applicationURL"));
		controller.set('myName',applicationController.get("userName"));
		this.store.find('users',{role_id:4}).then(function(user){
			controller.set('teamleads', user);
		})
		*/
		controller.set('model', model);
		controller.set('teamleadNotificationBit', 'go');
		this.reloadApplicationControllerModel(controller);
	},
	reloadApplicationControllerModel: function (controller) {
		//console.log("I m in tl funcation")
		var self = this;
		if (Ember.isBlank(controller.get('teamleadNotificationBit'))) {
			Ember.run.cancel();
		} else {
			var value = controller.get('teamlead');
			var data = {
				id: value,
				agent: 'my',
				form: 'tlsv'
			};
			Em.run.later(function () {

				self.get('common').ajaxppRequest('GET', 'api/userStateLogs/' + value + '?format=json', data, 'No').then(function (response) { //newRequest is method of our adapter
					controller.set('agentsData', response);
				}, function (error) {
					//handle error  
				});

				self.reloadApplicationControllerModel(controller);
			}, 300000);
		}
	},
	stopCollecting: function () {
		self = this;
		self.controllerFor("teamleadStatusViews").set('teamleadNotificationBit', null);
	}.on('deactivate'),
	startCollecting: function () {
		var self = this;
		self.controllerFor("teamleadStatusViews").set('teamleadNotificationBit', 'go');
		//self.store.find('teamleadNotes').then(function(rec){
		//	self.controllerFor("application").set('teamleadNotification', self.store.all('teamleadNotes').get('content'));
		//});
	}.on('activate'),
	actions: {
		reload: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this.controllerFor('teamleadStatusViews');
			var value = _controller.get('teamlead');
			_self.get('common').showOverlay('Agents-Time-and-Ticket-Stats');
			// Em.$('#Agents-Time-and-Ticket-Stats').isLoading({
			// 	text: '',
			// 	tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
			// 	position: "overlay"
			// });
			var data = {
				id: value,
				agent: 'my',
				form: 'tlsv'
			};
			_self.get('common').ajaxppRequest('GET', 'api/users_api/getMyAgentStateLog/' + value + '?format=json', data, 'No').then(function (response) { //newRequest is method of our adapter
				_controller.set('agentsData', response);
				_self.get('common').hideOverlay('Agents-Time-and-Ticket-Stats');
				// Em.$('#Agents-Time-and-Ticket-Stats').isLoading("hide");
			}, function (error) {
				_self.get('common').hideOverlay('Agents-Time-and-Ticket-Stats');
				// Em.$('#Agents-Time-and-Ticket-Stats').isLoading("hide");
			});

			/*Em.$.ajax({
			    url:  'api/users_api/getMyAgentStateLog/'+value+'?format=json',
			    type: 'GET',
			    data: {id: value},
			    /*timeout: 10000,
				async: false,* /
				beforeSend: function( xhr ) {
			    	
			  	},
			    success: function(data, textStatus, xhr) {
			    	_controller.set('agentsData', data);
			    	Em.$('#Agents-Time-and-Ticket-Stats').isLoading("hide");
			    	
			    },
			    error:function(){
			    	Em.$('#Agents-Time-and-Ticket-Stats').isLoading("hide");
			    }
		    });*/
		},
		logout: function (value) {
			this.get('common').consoleClear();
			console.log(value);
			var _self = this;
			var _controller = this.controllerFor('teamleadStatusViews');
			//var value  = _controller.get('teamlead');
			_self.get('common').ajaxppRequest('POST', 'api/users_api/agentLogoutForcefully?format=json', {
				id: value.sid
			}, 'No').then(function (response) { //newRequest is method of our adapter
				_self.send('reload');
			}, function (error) {

			});
			/*Em.$.ajax({
			    url:  'api/users_api/agentLogoutForcefully?format=json',
			    type: 'POST',
			    data: {id: value.sid},
			    timeout: 10000,
				async: false,
			    success: function(data, textStatus, xhr) {
			    	//	_controller.set('agentsData', data);
			    	_self.send('reload');
			    }
		    });*/
		},
		delete: function (dt) {
			var _self = this;
			var _controller = this.controllerFor('teamleadStatusViews');
			_self.store.unloadAll('tlStatusView');
			var newEmailDriver = this.store.createRecord('tlStatusView', {
				id: dt.get('id'),
				status: 0,
			});
			newEmailDriver.save().then(function (ans) {

			});
		},
		save: function (activities) {
			var _self = this;
			var _controller = this.controllerFor('teamleadStatusViews');
			/*activities:{
		    	monitoring_for_id:'',
		    	email_driver_id:'',
		    	email_reason_id:'',
		    	ticket_no:'',
		    	status:'',
		    },*/
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
			if (typeof activities.status === 'undefined' || activities.status == '' || activities.status == 0 || activities.status == null) {
				_self.get('common').showNotification('error', '<b>Status not selected!</b>');
				return false;
			}
			if (activities.ticket_no == '' || activities.ticket_no == null) {
				_self.get('common').showNotification('error', '<b>Ticket ID is missing!</b>');
				return false;
			}


			_self.store.unloadAll('tlStatusView');
			var newEmailDriver = this.store.createRecord('tlStatusView', activities);
			newEmailDriver.save().then(function (ans) {
				_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
				//	_self.send('reset');
				_self.send('reload');
			});
		},
		reset: function () {
			var _controller = this.controllerFor('teamleadStatusViews'); //monitoring_for_id:'',
			_controller.set('activities', {
				email_driver_id: '',
				email_reason_id: '',
				ticket_no: '',
				status: ''
			});
		}
	}
});
