telenor.initializer({
	name: "iMyMe",

	initialize: function (container, application) {
		container.optionsForType('core', {
			instantiate: false,
			singleton: true
		});
		container.register('core:iMyMe', iMyMeJS);
		//var store = container.lookup('store:main');
		//var obj = store.load(CrashLog.User, currentUser);
		//container.optionsForType('user', { instantiate: false, singleton: true });
		//container.register('user', 'current', CrashLog.User.find(obj.id));MAIN NAVIGATION
	}
});

telenor.initializer({
	name: "injectIMyMe",
	after: 'iMyMe',

	initialize: function (container, application) {
		container.typeInjection('controller', 'iMyMe', 'core:iMyMe');
		container.typeInjection('route', 'iMyMe', 'core:iMyMe');
		container.typeInjection('view', 'iMyMe', 'core:iMyMe');
		//container.injection('controller:application', 'currentUser', 'user:current');
		//container.typeInjection('route', 'currentUser', 'user:current');
		/*Em.A(['route', 'controller', 'view']).forEach(function(place) {
		  app.inject(place, 'someFunction', 'function:main');
		});*/
	}
});
