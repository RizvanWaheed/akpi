telenor.SecureRoute = Ember.Mixin.create({
	moduleLoaded: false,
	beforeModel: function (transition) {
		var route = this.get('navigation-modules').findBy("link", transition.targetName);
		var name = route.name.replace(new RegExp(" ", 'g'), "_");
		var route_id = route.id;
		// console.log('tttttttttttttttttttttttttttttransitionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
		// console.log(transition);
		// console.log(this.get('navigation-modules').findBy("link", transition.targetName));
		// console.log(route.name);
		// console.log(transition.targetName);
		// console.log('tttttttttttttttttttttttttttttransitionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

		var appCtrl = this.controllerFor("application");

		if (appCtrl.isModuleLoaded(route_id)) {
			//	console.log("module "+name+" already loaded, skipping model hook");
			this.set("moduleLoaded", true);
		} else {
			//	console.log("loading module "+name+"...");
		}

		if (transition.targetName == 'agents.mySurvey') {} else if (Em.isEmpty(this.get('navigation-modules').findBy("link", transition.targetName))) {
			this.transitionTo('/');
		}
		//console.log("beforeModel in the Mixin");
	},
	afterModel: function (model, transition) {
		var _self = this;
		var appCtrl = this.controllerFor("application");
		var tabs = appCtrl.get("tabs");
		var route = this.get('navigation-modules').findBy("link", transition.targetName);
		var name = route.name.replace(new RegExp(" ", 'g'), "_");
		var route_id = route.id;
		// console.log(route);
		// //	console.log(tabs);
		// console.log(name);
		var result = tabs.findBy("id", route_id);
		// console.log(result);
		if (result === undefined) {
			//		console.log('in modelIF');
			var profileTab = telenor.Tab.create({
				id: route.id,
				url: _self.stringToBoolean(route.url),
				name: route.name,
				target: transition.targetName, //.decamelize().replace('.', "/") //(parseInt(route.url) == 0) ? transition.targetName : transition.targetName + '/' + route.id
				//targeted: '/akpi/Abacus/bpo/' + transition.targetName.decamelize().replace('.', "/"),
			});
			tabs.addObject(profileTab);
			Ember.run.later(function () {
				appCtrl.send("setActiveTab", route_id);
			}, 100);

		} else {
			//	console.log('in modelElse');
			// appCtrl.send("setActiveMenu", "users");
			appCtrl.send("setActiveTab", route_id);
		}
		this.get('common').consoleClear();
		// console.log("afterModel in the Mixin");
	},
	stringToBoolean: function (string) {
		// console.log(string);

		if (!isNaN(string)) {
			return (string == 0) ? false : true;
		}
		// console.log(string.toLowerCase());
		switch (string.toLowerCase().trim()) {
			case "true":
			case "yes":
			case "1":
				return true;
			case "false":
			case "no":
			case "0":
			case null:
				return false;
			default:
				return Boolean(string);
		}
	},
});
