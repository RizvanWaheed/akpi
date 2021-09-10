telenor.TrafficStatusViewsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'trafficStatusViews',
	renderTemplate: function () {
		this.render('traffic/statusViews');
	},
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "traffic.statusViews"))){
            this.transitionTo('/');
        }
    },*/
	model: function () {
		return Em.A();
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('model', model);
		//controller.set('trafficNotificationBit', 'go');
		// this.reloadApplicationControllerModel(controller);
	},
	/*reloadApplicationControllerModel:function(controller){
		//console.log("I m in tl funcation")
  		var self = this;
 		if(Ember.isBlank(controller.get('trafficNotificationBit'))) {
  			Ember.run.cancel();
      	}else{
      		var value  = controller.get('traffic');
     		Em.run.later(function(){
     			Ember.$.ajax({
				    url: 'api/users_api/getAllAgentStateLog/'+value+'?format=json',
				    type: 'GET',
				    data: {id: value},
				    success: function(data, textStatus, xhr) {
				    	controller.set('agentsData', data);
				    },
				    error:function(ex){

				    },
				   /* timeout: 10000,
    				async: false * /
			    });
     			self.reloadApplicationControllerModel(controller);
	    	}, 300000);
  		}
  	},*/
	stopCollecting: function () {
		self = this;
		//	self.controllerFor("trafficStatusViews").set('trafficNotificationBit', null);
	}.on('deactivate'),
	startCollecting: function () {
		var self = this;
		//	self.controllerFor("trafficStatusViews").set('trafficNotificationBit', 'go');
		//self.store.find('trafficNotes').then(function(rec){
		//	self.controllerFor("application").set('trafficNotification', self.store.all('trafficNotes').get('content'));
		//});
	}.on('activate'),
	actions: {
		reload: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this.controllerFor('trafficStatusViews');
			var value = _controller.get('traffic');
			var data = {
				id: value,
				agent: 'my'
			};
			_self.get('common').ajaxppRequest('GET', 'api/userStateLogs/', data, 'Yes').then(function (response) { //newRequest is method of our adapter
				_controller.set('agentsData', response);
			}, function (error) {
				//handle error  
			});
			/*Em.$.ajax({
			    url:  'api/users_api/getAllAgentStateLog/'+value+'?format=json',
			    type: 'GET',
			    data: {id: value},
			    /*timeout: 10000,
				async: false,* /
				beforeSend: function() {
	              	Em.$.isLoading({
		                text: '',
		                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
		                //  position:   "overlay"
		            });
	            },
	            complete:  function() {
		            Ember.$.isLoading("hide");
		     	},
			    success: function(data, textStatus, xhr) {
			    	_controller.set('agentsData', data);
			    	
			    	
			    },
			    error: function(){
			        console.log('error');
			    }
		    });*/
		}

	}
});
