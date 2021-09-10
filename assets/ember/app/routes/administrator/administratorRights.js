telenor.AdministratorRightsRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName: 'administratorRights',
	/*renderTemplate:function(){
		this.render('rights');
	},*/
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "administrator.rights"))){
			this.transitionTo('/');
		}
    },*/
	model: function () {
		return Ember.RSVP.hash({
			roles: this.store.find('setups', {
				'base_id': 9
			}),
			domains: this.store.find('setups', {
				'base_id': 11
			}),
			campaigns: this.store.find('setups', {
				'base_id': 1000
			}),
			// categories:  this.store.find('monitoringCategories', {'monitoring_for_id':this.get('campaign').mapBy('id')}),//,{'monitoring_for_id':this.get('campaign').get('firstObject').id}
		});
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('model', model);
	},
	actions: {
		allowRights: function (id) {
			var _self = this;
			var _controller = _self.controllerFor('administratorRights');
			if (Em.isEmpty(_controller.get('rights.roles')) || Em.isEmpty(_controller.get('rights.users'))) {}
			var user = _controller.get('rights.users');
			_controller.set('rights.users', 0);

			var data = {
				module_id: id,
				user_id: user
			};

			_self.get('common').ajaxppRequest('POST', 'api/users_api/usersRights?format=json', data, 'Yes').then(function (response) { //newRequest is method of our adapter
				_controller.set('rights.users', user);
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
