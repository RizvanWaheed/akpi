telenor.initializer({
  name: "common",

  initialize: function(container, application) {
    container.optionsForType('global', {instantiate: false, singleton: true});
    container.register('global:common', telenor.common.create());
    //var store = container.lookup('store:main');
    //var obj = store.load(CrashLog.User, currentUser);
    //container.optionsForType('user', { instantiate: false, singleton: true });
    //container.register('user', 'current', CrashLog.User.find(obj.id));
  }
});

telenor.initializer({
  name: "injectCommon",
  after: 'common',

  initialize: function(container, application) {
    container.typeInjection('controller', 'common', 'global:common');
    container.typeInjection('route', 'common', 'global:common');
    container.typeInjection('view', 'common', 'global:common');
    //container.injection('controller:application', 'currentUser', 'user:current');
    //container.typeInjection('route', 'currentUser', 'user:current');
    /*Em.A(['route', 'controller', 'view']).forEach(function(place) {
      app.inject(place, 'someFunction', 'function:main');
    });*/
  }
});
