telenor.initializer({
  name: "navigation-module",

  initialize: function(container, application) {
    container.optionsForType('menu', {instantiate: false, singleton: true});
    container.register('menu:navigation-module', accessesJS);
    //var store = container.lookup('store:main');
    //var obj = store.load(CrashLog.User, currentUser);
    //container.optionsForType('user', { instantiate: false, singleton: true });
    //container.register('user', 'current', CrashLog.User.find(obj.id));MAIN NAVIGATION
  }
});

telenor.initializer({
  name: "injectNavigationModules",
  after: 'navigation-module',

  initialize: function(container, application) {
    container.typeInjection('controller', 'navigation-modules', 'menu:navigation-module');
    container.typeInjection('route', 'navigation-modules', 'menu:navigation-module');
    container.typeInjection('view', 'navigation-modules', 'menu:navigation-module');
    //container.injection('controller:application', 'currentUser', 'user:current');
    //container.typeInjection('route', 'currentUser', 'user:current');
    /*Em.A(['route', 'controller', 'view']).forEach(function(place) {
      app.inject(place, 'someFunction', 'function:main');
    });*/
  }
});
