telenor.AgentsTasksRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName: 'agentsTasks',
	/*renderTemplate:function(){
		this.render('agents/tasks');
	},
	beforeModel: function() {
		this._super("agents.tasks");
		// var status = false;
		// console.log(this.controllerFor("application").get('modules').findBy("link", "aaa"));
		// console.log(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "aaa")));		
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "agents.tasks"))){
			this.transitionTo('/');
		}
		this._super(transition)
    },*/
	model: function () {
		// return Ember.RSVP.hash({
		// 	taskOpen: this.store.find('agentTasks', {
		// 		'status': 1
		// 	}),
		// 	taskClose: this.store.find('agentTasks', {
		// 		'status': 0
		// 	})
		// });
		//return this.get('campaign');
	},
	setupController: function (controller, model) {
		//this._super.apply(this, arguments);
		this._super(controller, model);
		// controller.set('totalOpenTask', model.taskOpen.get("length"));
		// controller.set('totalClosedTasks', model.taskClose.get("length"));
		var data = {
			status: 1,
			user: 'me'
		};
		var _self = this;
		this.get('common').ajaxppRequest('GET', 'api/users_api/getUserTasks?format=json', data, 'Yes').then(function (response) {
				// console.log(response);
				controller.set('openTask', response);
				controller.set('totalOpenTask', response.get("length"));
				// _self.get('common').showNotification('warning', '<b>Already Saved!</b>');
			},
			function (response) {
				console.log(response);
				// _self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			});


		// controller.get('cities').clear();
		// model.domains.forEach(function (domain) {
		// 	if (domain.get('parent_id') == 0) {
		// 		//controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
		// 	} else {
		// 		controller.get('cities').pushObject({
		// 			id: domain.get('id'),
		// 			name: domain.get('name')
		// 		});
		// 	}
		// });
		// controller.set('activities.monitoring_for_id', model.campaign.get('firstObject').id);
		// var drivers = model.categories;
		// controller.set('campaignLevel', model.campaign.get('firstObject').category_level);
		// if (model.campaign.get('firstObject').category_level == 4) {
		// 	var category = drivers.filter(function (driver) {
		// 		return driver.get('level') == 1;
		// 	});
		// 	var sub_category = drivers.filter(function (driver) {
		// 		return driver.get('level') == 2;
		// 	});
		// 	var reason = drivers.filter(function (driver) {
		// 		return driver.get('level') == 3;
		// 	});
		// 	var sub_reason = drivers.filter(function (driver) {
		// 		return driver.get('level') == 4;
		// 	});
		// } else {
		// 	var reason = drivers.filter(function (driver) {
		// 		return driver.get('level') == 1;
		// 	});
		// 	var sub_reason = drivers.filter(function (driver) {
		// 		return driver.get('level') == 2;
		// 	});
		// 	var category = reason;
		// 	var sub_category = reason;
		// }
		// controller.set('drivers', Ember.A());
		// controller.set('drivers', drivers);
		// //self.get('emailDriver').clear();
		// //self.get('emailDriverSub').clear();

		// controller.set('emailDriver', category);
		// controller.set('emailDriverSub', sub_category);
		// controller.set('emailDriverReason', reason);
		// controller.set('emailDriverReasonSub', sub_reason);


		// controller.set('departments', model.departments.filter(function (dept) {
		// 	return dept.get('parent_id') == 0;
		// }));
		// rec.forEach(function(item, index, enumerable) {
		// 	 console.log(item);
		// 	 if(parseInt(item.get('parent_id')) == 0){
		// 		 controller.get('departments').pushObject(item);
		// 	 }
		//  });
		//  Em.$('#agentsTasks > .nav-tabs a:first').tab('show');
		Em.$(".tab-content #tasks-task").addClass('in active');

		controller.set('model', model);
	},
	actions: {
		createNodeTask: function (agentTaskID, bcID, state) {
			// console.log(agentTaskID);
			// console.log(bcID);
			// console.log(state);
			var _self = this;
			var _controller = this.controllerFor('agentsTasks');
			// _controller.get('model.taskOpen').forEach(function (item, index, enumerable) {
			// 	console.log(item.get('task_id.children'));
			// 	//Em.set(item, "status", "");
			// 	//Em.set(item, "state", false);
			// });
			data = {
				'agent_data_id': agentTaskID,
				'business_category_id': bcID,
				'checked': state
			};
			this.get('common').ajaxppRequest('POST', 'api/users_api/agenttasks?format=json', data, 'Yes').then(function () {
				_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			}, function () {
				_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
			});
			// Ember.$.ajax({
			// 	url: 'api/users_api/agenttasks?format=json',
			// 	type: 'POST',
			// 	data: data,
			// 	success: function (data, textStatus, xhr) {
			// 		//console.log(data);
			// 		if (data.find) {
			// 			_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
			// 		} else {
			// 			_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
			// 		}
			// 		//	_self.send('reset');
			// 		_self.send('reload');
			// 	}
			// });
			// _controller.get('model.taskOpen').forEach(function (item, index, enumerable) {
			// 	Em.set(item, "status", "");
			// 	Em.set(item, "state", false);
			// });

			// var a = this.store.filter('agentTasks', {
			// 	status: '1'
			// }, function (item) {
			// 	return item.get('id') == agentTaskID;
			// });
			//console.log(a);
		}

		// reload: function () {
		// 	//console.log("I m in controller");
		// 	//this.get('common').consoleClear();

		// 	//var _self = this;
		// 	this.get('common').consoleClear();
		// 	this.reload();
		// 	this.refresh();
		// 	return;
		// }
		// 	save:function(activities){
		// 		var _self = this;
		// 		var _controller = this.controllerFor('agentsTasks');
		// 		/*activities:{
		// 	    	monitoring_for_id:'',
		// 	    	email_driver_id:'',
		// 	    	email_reason_id:'',
		// 	    	task_no:'',
		// 	    	status:'',
		// 	    },*/
		// 	    console.log(activities);
		// 		if(typeof activities.monitoring_for_id === 'undefined' || activities.monitoring_for_id == '' || activities.monitoring_for_id == 0 || activities.monitoring_for_id == null){
		// 			_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
		// 			return false;
		// 		}
		// 		if(typeof activities.email_driver_id === 'undefined' || activities.email_driver_id == '' || activities.email_driver_id == 0 || activities.email_driver_id == null){
		// 			_self.get('common').showNotification('error', '<b>Category not selected!</b>');
		// 			return false;
		// 		}
		// 		if(typeof activities.email_reason_id === 'undefined' || activities.email_reason_id == '' || activities.email_reason_id == 0 || activities.email_reason_id == null){
		// 			_self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
		// 			return false;
		// 		}
		// 		if(typeof activities.domain_id === 'undefined' || activities.domain_id == '' || activities.domain_id == 0 || activities.domain_id == null){
		// 			_self.get('common').showNotification('error', '<b>City not selected!</b>');
		// 			return false;
		// 		}
		// 		if(typeof activities.status === 'undefined' || activities.status == '' || activities.status == 0 || activities.status == null){
		// 			_self.get('common').showNotification('error', '<b>Status not selected!</b>');
		// 			return false;
		// 		}
		// 		if(activities.task_no == '' || activities.task_no == null){
		// 			_self.get('common').showNotification('error', '<b>Task ID is missing!</b>');
		// 			return false;
		// 		}

		// 		//data = {'activities':activities};
		// 		Ember.$.ajax({
		// 		    url: 'api/users_api/agenttasks?format=json',
		// 		    type: 'POST',
		// 		    data:activities,
		// 		    success: function(data, textStatus, xhr) {
		// 		    	//console.log(data);
		// 			    if(data.find){
		// 					_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
		// 				}else{
		// 					_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
		// 				}				
		// 			//	_self.send('reset');
		// 				_self.send('reload');
		// 		    }
		// 	    });

		// 		/*_self.store.unloadAll('agenttask');
		// 		var newEmailDriver = this.store.createRecord('agenttask',activities);
		// 		newEmailDriver.save(function(aaa){
		// 			console.log(aaa);
		// 		}).then(function(ans){
		// 			console.log(ans);

		// 		});	*/
		// 	},


	}
});
