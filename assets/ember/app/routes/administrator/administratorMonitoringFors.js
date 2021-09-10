telenor.AdministratorMonitoringForsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'administratorMonitoringFors',

	renderTemplate: function () {
		this.render('administrator.monitoringFors');
	},
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "administrator.monitoringFors"))){
            this.transitionTo('/');
        }
    },*/
	model: function () {
		var storing = this.store.find('monitoringFors');
		//	console.log(storing);
		return storing;
	},
	actions: {
		save: function (monitoringFor) {
			var _self = this;
			console.log(monitoringFor);
			if (typeof monitoringFor.name === 'undefined' || monitoringFor.name.trim() == '') {
				_self.get('common').showNotification('error', '<b>Enter MonitoringFor Name !</b>');
				return false;
			}


			_self.get('common').showLoader();
			this.store.unloadAll('monitoringFor');
			var monitoringForing = _self.store.createRecord('monitoringFor', monitoringFor);
			monitoringForing.save().then(function () {
				_self.get('common').hideLoader();
			});
			return;

		},
		edit: function (monitoringFor) {
			var _controller = this.controllerFor("administratorMonitoringFors");
			_controller.set('monitoringFor', {
				id: monitoringFor.get('id'),
				name: monitoringFor.get('name'),
				category_level: monitoringFor.get('category_level')
			});
		},
		reset: function () {
			var _controller = this.controllerFor("administratorMonitoringFors");
			_controller.set('monitoringFor', {
				id: 0,
				name: '',
				category_level: ''
			});
		}
	}
});
