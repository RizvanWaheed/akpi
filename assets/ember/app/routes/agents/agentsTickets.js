telenor.AgentsTicketsRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName: 'agentsTickets',
	/*renderTemplate:function(){
		this.render('agents/tickets');
	},
	beforeModel: function() {
		this._super("agents.tickets");
		// var status = false;
		// console.log(this.controllerFor("application").get('modules').findBy("link", "aaa"));
		// console.log(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "aaa")));		
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "agents.tickets"))){
			this.transitionTo('/');
		}
		this._super(transition)
    },*/
	model: function () {
		// console.log(this.get('iMyMe'));
		// console.log(this.get('iMyMe').project);
		// console.log(this.get('iMyMe.project'));
		return Ember.RSVP.hash({
			campaign: this.get('iMyMe.sub_campaign_id'),
			categories: this.store.find('monitoringCategories', {
				'monitoring_for_id': this.get('iMyMe.sub_campaign_id')
			}), //,{'monitoring_for_id':this.get('campaign').get('firstObject').id}
			domains: this.store.find('domains'),
			departments: this.store.find('departments')
		});
		//return this.get('campaign');
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		controller.get('cities').clear();
		model.domains.forEach(function (domain) {
			if (domain.get('parent_id') == 0) {
				//controller.get('country').pushObject({id:domain.get('id'), name:domain.get('name')});
			} else {
				controller.get('cities').pushObject({
					id: domain.get('id'),
					name: domain.get('name')
				});
			}
		});
		var drivers = model.categories;
		// controller.set('activities.monitoring_for_id', model.campaign.split(',').get('firstObject').id);

		// controller.set('campaignLevel', model.campaign.split(',').get('firstObject').category_level);
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
		controller.set('drivers', Ember.A());
		controller.set('drivers', drivers);
		//self.get('emailDriver').clear();
		//self.get('emailDriverSub').clear();

		// controller.set('emailDriver', category);
		// controller.set('emailDriverSub', sub_category);
		// controller.set('emailDriverReason', reason);
		// controller.set('emailDriverReasonSub', sub_reason);


		controller.set('departments', model.departments.filter(function (dept) {
			return dept.get('parent_id') == 0;
		}));
		// rec.forEach(function(item, index, enumerable) {
		// 	 console.log(item);
		// 	 if(parseInt(item.get('parent_id')) == 0){
		// 		 controller.get('departments').pushObject(item);
		// 	 }
		//  });
		//  Em.$('#agentsTickets > .nav-tabs a:first').tab('show');
		Em.$(".tab-content #tickets-ticket").addClass('in active');

		controller.set('model', model);
	},
	actions: {

		// 	save:function(activities){
		// 		var _self = this;
		// 		var _controller = this.controllerFor('agentsTickets');
		// 		/*activities:{
		// 	    	monitoring_for_id:'',
		// 	    	email_driver_id:'',
		// 	    	email_reason_id:'',
		// 	    	ticket_no:'',
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
		// 		if(activities.ticket_no == '' || activities.ticket_no == null){
		// 			_self.get('common').showNotification('error', '<b>Ticket ID is missing!</b>');
		// 			return false;
		// 		}

		// 		//data = {'activities':activities};
		// 		Ember.$.ajax({
		// 		    url: 'api/users_api/agenttickets?format=json',
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

		// 		/*_self.store.unloadAll('agentticket');
		// 		var newEmailDriver = this.store.createRecord('agentticket',activities);
		// 		newEmailDriver.save(function(aaa){
		// 			console.log(aaa);
		// 		}).then(function(ans){
		// 			console.log(ans);

		// 		});	*/
		// 	},


	}
});
