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
telenor.initializer({
  name: "module",

  initialize: function(container, application) {
    container.optionsForType('menu', {instantiate: false, singleton: true});
    container.register('menu:module', accessesJS);
    //var store = container.lookup('store:main');
    //var obj = store.load(CrashLog.User, currentUser);
    //container.optionsForType('user', { instantiate: false, singleton: true });
    //container.register('user', 'current', CrashLog.User.find(obj.id));
  }
});

telenor.initializer({
  name: "injectModule",
  after: 'module',

  initialize: function(container, application) {
    container.typeInjection('controller', 'module', 'menu:module');
    container.typeInjection('route', 'module', 'menu:module');
    container.typeInjection('view', 'module', 'menu:module');
    //container.injection('controller:application', 'currentUser', 'user:current');
    //container.typeInjection('route', 'currentUser', 'user:current');
    /*Em.A(['route', 'controller', 'view']).forEach(function(place) {
      app.inject(place, 'someFunction', 'function:main');
    });*/
  }
});
telenor.initializer({
  name: "campaign",

  initialize: function(container, application) {
    container.optionsForType('side', {instantiate: false, singleton: true});
    container.register('side:campaign', campaignsJS);
    //var store = container.lookup('store:main');
    //var obj = store.load(CrashLog.User, currentUser);
    //container.optionsForType('user', { instantiate: false, singleton: true });
    //container.register('user', 'current', CrashLog.User.find(obj.id));
  }
});
telenor.initializer({
  name: "injectCampaign",
  after: 'campaign',

  initialize: function(container, application) {
    container.typeInjection('controller', 'campaign', 'side:campaign');
    container.typeInjection('route', 'campaign', 'side:campaign');
    container.typeInjection('view', 'campaign', 'side:campaign');
    //container.injection('controller:application', 'currentUser', 'user:current');
    //container.typeInjection('route', 'currentUser', 'user:current');
    /*Em.A(['route', 'controller', 'view']).forEach(function(place) {
      app.inject(place, 'someFunction', 'function:main');
    });*/
  }
});
//telenor.create();
//telenor.initializer({
/*Ember.application.initializer({
  name: 'injectCommon',
  initialize: function(container, app) {
    

    container.typeInjection('controller', 'common', 'globals:common');
    container.typeInjection('route', 'common', 'globals:common');
  }
});*/

/*telenor.initializer({
  name: 'injectCurrent',
  initialize: function(container, app) {
    container.optionsForType('globals', {instantiate: false, singleton: true});
    container.register('globals:current', telenor.ComFunc.create());

    container.typeInjection('controller', 'current', 'globals:current');
    container.typeInjection('route', 'current', 'globals:current');
  }
});*/
//use this adapter in  your controller
//var adapter = App.RequestAdapter.create();

/*

adapter.newRequest(data).then(function (response) {   //newRequest is method of our adapter
    console.log(response.userId);  //specify response data
}, function(error){
    //handle error  
});

*/
