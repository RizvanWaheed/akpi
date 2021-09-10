telenor.ConnectionsChatroomsRoute = Ember.Route.extend(telenor.SecureRoute, window.EmberWebsocket, {
	controllerName: 'connectionsChatrooms',
	socketURL: 'ws://localhost:80', ///foo/bar',
	keepSocketAlive: false,

	// socketConfigurations: [{
	// 	key: 'socket1', // 'a unique string that will identify the socket'
	// 	socketURL: 'ws://localhost:8101/',
	// 	keepSocketAlive: false,
	//  socketBinaryType: 'blob'
	// },{
	// 	key: 'socket2',
	// 	socketURL: 'ws://localhost:8102',
	// 	keepSocketAlive: false
	//  socketBinaryType: 'arraybuffer'
	// }]


	/*renderTemplate:function(){
		this.render('accesses');
	},*/
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "administrator.accesses"))){
			this.transitionTo('/');
		}
    },*/
	model: function () {
		return this.store.find('user', {
			login: true
		}); //	console.log(storing);
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('model', model);
	},
	actions: {
		allowAccesses: function (id) {
			var _self = this;
			var _controller = _self.controllerFor('administratorAccesses');
			if (Em.isEmpty(_controller.get('accesses.roles')) || Em.isEmpty(_controller.get('accesses.users'))) {}
			var user = _controller.get('accesses.users');
			_controller.set('accesses.users', 0);

			var data = {
				module_id: id,
				user_id: user
			};

			_self.get('common').ajaxppRequest('POST', 'api/users_api/usersAccess?format=json', data, 'Yes').then(function (response) { //newRequest is method of our adapter
				_controller.set('accesses.users', user);
			}, function (error) {
				//handle error  
			});

			/*
						Em.$.isLoading({
				            text: '',
				            tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
				            //  position:   "overlay"
				        });
				        var user = controller.get('selectedUsersAccess');
				        controller.set('selectedUsersAccess',0);
						Ember.$.ajax({
						    url: 'api/users_api/usersAccess?format=json',
						    type: 'POST',
						    data:{module_id:id, user_id:Ember.$('#cmbUsersAccess').val()},
						    success: function(data, textStatus, xhr) {
						    	controller.set('selectedUsersAccess',user);
						    	Ember.$.isLoading("hide");
						    	//controller.set('useraccess', data) ;
						    	
						    },
						    error: function(xhr, textStatus, errorThrown) {
						        //alert('not found');
						        Ember.$.isLoading("hide");
						    }
					    });*/


		}

	}

});
