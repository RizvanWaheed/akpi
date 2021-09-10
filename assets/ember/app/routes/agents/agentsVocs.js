telenor.AgentsVocsRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName: 'agentsVocs',

	model: function () {
		return this.store.find('vocSetup', {
			status: 1
		});
	},
	setupController: function (controller, model) {
		this._super(controller, model);


		controller.get('connectivity_status').clear();
		controller.get('satisfaction_status').clear();
		controller.get('monitoring').clear();

		model.forEach(function (domain) {
			if (domain.get('parent_id') == 5001) {
				controller.get('connectivity_status').pushObject({
					id: domain.get('id'),
					name: domain.get('name'),
					parent_id: domain.get('parent_id')
				});
			} else if (domain.get('parent_id') == 5006) {
				controller.get('satisfaction_status').pushObject({
					id: domain.get('id'),
					name: domain.get('name'),
					parent_id: domain.get('parent_id')
				});
			} else if (domain.get('parent_id') == 5010) {
				controller.get('monitoring').pushObject({
					id: domain.get('id'),
					name: domain.get('name'),
					parent_id: domain.get('parent_id')
				});
				// } else {
				// 	controller.get('v').pushObject({
				// 		id: domain.get('id'),
				// 		name: domain.get('name')
				// 	});
			}
		});
		// controller.set('departments', model.departments.filter(function (dept) {
		// 	return dept.get('parent_id') == 0;
		// }));
		// rec.forEach(function(item, index, enumerable) {
		// 	 console.log(item);
		// 	 if(parseInt(item.get('parent_id')) == 0){
		// 		 controller.get('departments').pushObject(item);
		// 	 }
		//  });
		//  Em.$('#agentsVocs > .nav-tabs a:first').tab('show');
		// Em.$(".tab-content #vocs-voc").addClass('in active');

		controller.set('model', model);
	},
	actions: {

		// 	save:function(activities){
		// 		var _self = this;
		// 		var _controller = this.controllerFor('agentsVocs');
		// 		/*activities:{
		// 	    	monitoring_for_id:'',
		// 	    	email_driver_id:'',
		// 	    	email_reason_id:'',
		// 	    	voc_no:'',
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
		// 		if(activities.voc_no == '' || activities.voc_no == null){
		// 			_self.get('common').showNotification('error', '<b>Voc ID is missing!</b>');
		// 			return false;
		// 		}

		// 		//data = {'activities':activities};
		// 		Ember.$.ajax({
		// 		    url: 'api/users_api/agentvocs?format=json',
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

		// 		/*_self.store.unloadAll('agentvoc');
		// 		var newEmailDriver = this.store.createRecord('agentvoc',activities);
		// 		newEmailDriver.save(function(aaa){
		// 			console.log(aaa);
		// 		}).then(function(ans){
		// 			console.log(ans);

		// 		});	*/
		// 	},


	}
});
