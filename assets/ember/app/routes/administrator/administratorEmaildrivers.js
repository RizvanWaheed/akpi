telenor.AdministratorEmaildriversRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'administratorEmaildrivers',

	renderTemplate: function () {
		this.render('administrator/emaildrivers');
	},
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "administrator.emaildrivers"))){
            this.transitionTo('/');
        }
    },*/
	model: function () {
		var storing = this.store.find('emaildrivers', {
			parent_id: 0
		});
		//	console.log(storing);
		return storing;
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		applicationController = this.controllerFor("application");
		this.set('baseUrl', applicationController.get("applicationURL"));
		controller.set('myName', applicationController.get("userName"));

		this.store.find('monitoringFors').then(function (monitoredBy) {
			controller.set('monitoredBy', monitoredBy);
		});
		/*controller.get('monitoredBy').pushObject({id:1, name:'Customer'});
		controller.get('monitoredBy').pushObject({id:2, name:'captain'});*/

		controller.set('model', model);
	},
	actions: {
		delete: function (dt) {
			var _self = this;
			var _controller = this.controllerFor('administratorEmaildrivers');
			_self.store.unloadAll('emaildriver');
			var newEmailDriver = this.store.createRecord('emaildriver', {
				id: dt.get('id'),
				status: 0,
			});
			_self.get('common').showLoader();
			newEmailDriver.save().then(function (ans) {
				_self.refresh();
				_self.get('common').hideLoader();
			});
		},
		save: function (emailDriver) {
			var _self = this;
			var _controller = this.controllerFor('administratorEmaildrivers');
			if (typeof emailDriver.monitoring_for_id === 'undefined' || emailDriver.monitoring_for_id == '' || emailDriver.monitoring_for_id <= 0) {
				_self.get('common').showNotification('error', '<b>Select Campaign !</b>');
				return false;
			}
			if (typeof emailDriver.name === 'undefined' || emailDriver.name.trim() == '') {
				_self.get('common').showNotification('error', '<b>Enter MonitoringEmailDriver Name !</b>');
				return false;
			}
			_self.get('common').showLoader();

			_self.store.unloadAll('emaildriver');
			var newEmailDriver = this.store.createRecord('emaildriver', emailDriver);
			newEmailDriver.save().then(function (ans) {
				_self.refresh();
				_self.get('common').hideLoader();
			});
		},
		edit: function (uid) {
			var _self = this;
			var _controller = this.controllerFor('administratorEmaildrivers');
			/*console.log(uid.get('id'));
			console.log(uid.get('monitoring_for_id.id'));
			console.log(uid.get('name'));
			console.log(uid.get('status'));*/

			_controller.set('emailDriver', {
				id: uid.get('id'),
				monitoring_for_id: uid.get('monitoring_for_id.id'),
				name: uid.get('name'),
				status: uid.get('status'),
			});

		},
		reset: function (uid) {
			var _self = this;
			var _controller = this.controllerFor('administratorEmaildrivers');
			_controller.set('emailDriver', {
				id: 0,
				monitoring_for_id: 0,
				name: '',
				status: 1
			});

		}
	}
});
