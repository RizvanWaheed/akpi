telenor.AdministratorRolesRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'administratorRoles',

	renderTemplate: function () {
		this.render('administrator/roles');
	},
	// moduleLoaded: false,
	//   beforeModel: function() {
	//       var self = this;
	//       var appCtrl = this.controllerFor("application");

	//       if (appCtrl.isModuleLoaded("Users")) {
	//           console.log("module 'Users' already loaded, skipping model hook");
	//           self.set("moduleLoaded", true);
	//       } else {
	//           console.log("loading module 'Users'...");
	// 	}
	// 	//if(Em.isEmpty(this.get('module').findBy("link", "administrator.users"))){
	//       //    this.transitionTo('/');
	//       //}
	// 	//this.transitionToAnimated('users/usersinfo', {usersinfodata: 'slideLeft'});
	// },
	model: function () {
		var isLoaded = this.get("moduleLoaded");
		if (!isLoaded) {
			return this.store.find('roles');
		}
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		// if (model !== undefined) {
		//     controller.set("user", model);
		//     console.log(model);
		// }

		var isLoaded = this.get("moduleLoaded");
		if (!isLoaded) {}
	},
	actions: {
		save: function (role) {
			var _self = this;
			console.log(role);
			if (typeof role.name === 'undefined' || role.name.trim() == '') {
				_self.get('common').showNotification('error', '<b>Enter Role Name !</b>');
				return false;
			}
			_self.get('common').showLoader();

			this.store.unloadAll('role');
			var roleing = _self.store.createRecord('role', role);
			roleing.save().then(function () {
				_self.get('common').hideLoader();
			});
			return;

		},
		edit: function (role) {
			var _controller = this.controllerFor("administratorRoles");
			_controller.set('role', {
				id: role.get('id'),
				name: role.get('name')
			});
		},
		reset: function () {
			var _controller = this.controllerFor("administratorRoles");
			_controller.set('role', {
				id: 0,
				name: ''
			});
		}
	}
});
