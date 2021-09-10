telenor.TeamleadAgentsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'teamleadAgents',
	pageSize: 20,
	pageNumber: 1,
	totalU: 0,
	//renderTemplate:function(){
	//	this.render('agents');
	//},
	//renderTemplate: function() {
	//  this.render({ outlet: 'agent'}); 
	//},
	/*beforeModel: function() {
 		this._super("teamlead.agents");
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "teamlead.agents"))){
            this.transitionTo('/');
        }
		//this.transitionToAnimated('agents/agentsinfo', {agentsinfodata: 'slideLeft'});
    },*/
	model: function () {
		return this.store.find('users', {
			limit: 1,
			page: 1,
			search: {
				type: 'me'
			}
		});
		//var agentJson2 = store.filter('agents').get('length');//store.all('agents').get('length');
		// var jsonCount    = agentJson.get('length');
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		//controller.set('roles', this.store.find('roles'));
		//controller.set('reportings', this.store.find('reportings'));
		//console.log(model.get("length"));
		controller.set('agentCount', model.get("length"));
		/*this.store.find('domains',{parent_id:1, include:'parent'}).then(function(area) {
            controller.set('cities', area);
        });
        this.store.find('departments').then(function(rec) {
            controller.set('allDepartments', rec);
            controller.get('departments').clear();
            rec.forEach(function(item, index, enumerable) {
               // console.log(item);
                if(parseInt(item.get('parent_id')) == 0){
                    controller.get('departments').pushObject(item);
                }
            });
        });*/
		//console.log("al");
	},
	totalAgents: function () {
		return this.get("model.length");
	}.property('@each'),
	actions: {
		selectPage: function (number) {
			this.controllerFor("teamleadAgents").set('page', number);
			//this.set('page', number);
		},
		addAgent: function () {
			var _self = this;
			var _controller = _self.controllerFor("teamleadAgents");

			var agentLogin = _controller.get('agent.login');
			var agentId = _controller.get('agent.id');

			if (typeof agentLogin === 'undefined' || agentLogin == '' || agentLogin == 0) {
				_self.get('common').showNotification('error', '<b> Enter agent login id! </b>');
				return;
			}
			if (typeof agentId === 'undefined' || agentId == '' || agentId == 0) {
				_self.get('common').showNotification('error', '<b> Enter valid agent login id! </b>');
				return;
			}
			var state = {
				id: agentId
			};
			_self.get('common').ajaxppRequest('POST', 'api/users_api/setAgent?format=json', state, 'Yes').then(function (response) { //newRequest is method of our adapter
				_self.get('common').showNotification('success', '<b>Agent added in reporting successfully !</b>');
				_self.refresh();
			}, function (error) {
				_self.get('common').showNotification('warning', '<b>Agent not added in reporting!</b>');
			});

			/*Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            });
            Ember.$.ajax({
			    url: 'api/users_api/setAgent/?format=json',
			    type: 'POST',
			    data:{id:agentId},
			    success: function(data, textStatus, xhr) {
			   		_self.get('common').showNotification('success', '<b>Agent added in reporting successfully !</b>');	      	
			   		_self.refresh();
			   		Ember.$.isLoading("hide");
			    },
			    error: function(xhr, textStatus, errorThrown) {
			        _self.get('common').showNotification('warning', '<b>Agent not added in reporting!</b>');
			        Ember.$.isLoading("hide");
			    }
		    });
*/

			/*this.store.unloadAll('agent');
			var newAgent = this.store.createRecord('agent',agent);
			newAgent.save().then(function(){
				Ember.$("#showAgentAddEditModel").modal("hide");
				
				
			});*/
			//this.transitionToRoute('agents');
		},
		searchAgent: function () {
			var _self = this;
			var _controller = _self.controllerFor("teamleadAgents");

			var agent = _controller.get('agent.login');
			if (typeof agent === 'undefined' || agent == '' || agent == 0) {
				_self.get('common').showNotification('error', '<b>Enter agent id !</b>');
				return;
			}
			var state = {
				login: agent
			};
			_self.get('common').ajaxppRequest('GET', 'api/users_api/getAgent?format=json', state, 'Yes').then(function (response) { //newRequest is method of our adapter
				_controller.set('agent', response);
				_controller.set('addButton', false);
			}, function (error) {
				_self.get('common').showNotification('warning', '<b>ID not found!</b>');
			});


			/*    Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            });
            Ember.$.ajax({
			    url: 'api/users_api/getAgent/?format=json',
			    type: 'GET',
			    data:{login:agent},
			    success: function(data, textStatus, xhr) {
			   		_controller.set('agent', data);	
			   		_controller.set('addButton', false);		      	
			   		Ember.$.isLoading("hide");
			    },
			    error: function(xhr, textStatus, errorThrown) {
			        _self.get('common').showNotification('warning', '<b>ID not found!</b>');
			        Ember.$.isLoading("hide");
			    }
		    });*/
		},
		resetAgent: function (uid) {
			var _self = this;
			var _controller = _self.controllerFor("teamleadAgents");
			_controller.set('addButton', true);
			_controller.set('agent', {
				id: 0,
				role: '',
				name: '',
				login: '',
				reporting: ''
			});
		}
	},


});
