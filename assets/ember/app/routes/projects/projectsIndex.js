telenor.ProjectsIndexRoute = Ember.Route.extend({
	controllerName: 'projectsIndex',
	renderTemplate: function () {
		this.render('projects/index');
	},
	//beforeModel: function() {
	/*var status = false;
	this.controllerFor("application").get('model.modules').forEach(function(item, index, enumerable){
	    if(typeof item.children !== 'undefined'){
	    	item.children.forEach(function(itemc, indexc, enumerablec){
	    		if(itemc.link == 'accesses'){
	    			status = true;
	    		}
	    	});
	    }
	});
	if(!status){
		this.transitionTo('dashboard');
	}*/
	//},
	model: function (params, queryParams, transition) {
		/*var storing = this.store.find('roles');
	//	console.log(storing);
		return storing;*/
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		/*var self = this;

		 Ember.$.ajax({
		    url: 'api/users_api/loginAccess?format=json',
		    type: 'GET',
		    success: function(data, textStatus, xhr) {
		    	controller.set('accessList', data) ;
		    },
		    error: function(xhr, textStatus, errorThrown) {
		        alert('not found');
		    }
	    });*/
		var appCtrl = this.controllerFor("application");
		appCtrl.send("setActiveMenu", "index");
		appCtrl.send("setActiveTab", "Index");

		controller.set('model', model);

	},
	actions: {
		allowAccesses: function (id) {
			/*if(Ember.$('#cmbUsersAccess').val() == 0 || Ember.$('#cmbUsersAccess').val() == ''){

			}
			controller = this.controllerFor('accesses');
			console.log(id);
			Ember.$.ajax({
			    url: 'api/users_api/usersAccess?format=json',
			    type: 'GET',
			    data:{module_id: id, user_id:Ember.$('#cmbUsersAccess').val()},
			    success: function(data, textStatus, xhr) {
			    	controller.set('accessList', data) ;
			    },
			    error: function(xhr, textStatus, errorThrown) {
			        alert('not found');
			    }
		    });*/
		}
	}

});
