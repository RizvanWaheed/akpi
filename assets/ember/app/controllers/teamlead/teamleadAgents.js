telenor.TeamleadAgentsController = Ember.ArrayController.extend(Ember.PaginationMixin, {
	pageName: 'TeamleadAgents',
	sortProperties: ['name'],
	sortAscending: true, // false = descending
	doJob: '',
	page: 1,
	perPage: 40,
	seperator: '…',
	countOut: 1,
	countIn: 1,
	addButton: true,
	agent: {
		form: 'tlStatusView',
		id: 0,
		role: '',
		name: '',
		login: '',
		reporting: ''
	},
	selectPage: function (number) {
		this.set('page', number);
	},
	toggleOrder: function () {
		this.toggleProperty('sortAscending');
	},

	totalAgents: function () {
		return this.get("model.length")
	}.property('@each'),
	getAgent: function (uid) {
		var singleAgent = this.filter(function (agent) {
			return agent.get('id') = uid;
		});
		return singleAgent;
	}.property('@each.id'),
	cities: Ember.A(),
	departments: Ember.A(),
	actions: {
		searchKeyUp: function (val, e) {
			//alert(val); //alert(e.which); alert(e.key); 			/*e.which == 13 || */
			if ((val != '') && (e.key == 'Enter')) {
				this.send('searchAgent');
			} else if (e.which == 13 || e.key == 'Enter') {
				this.send('resetAgent');
				//this.set('receptionClient',val);
			}
		}
	}

});

telenor.TeamleadAgentController = Ember.ObjectController.extend({
	need: ['teamleadAgents', 'roles'],
	current_id: '',
	action: {
		showData: function () {
			console.log("we have done");
		},
		saveAgent: function () {

			var newAgent = this.store.createRecord('agent', {
				name: this.get('name'),
				login: this.get('login'),
				password: this.get('password'),
				role_id: this.get('role_id'),
			});
			newAgent.save();
			//	this.transitionToRoute('posts');
		},
		editAgent: function (agent) {
			console.log("I am in controller");
			return;
			this.set('current_id', id);
			var agentModel = this.get('model');
			this.store.find('agents', id);
			console.log("I am in edit");
			return false;

		},
		deleteAgent: function () {
			// this tells Ember-Data to delete the current agent
			this.get('model').deleteRecord();
			this.get('model').save();
			// then transition to the agents route
			this.transitionToRoute('agents');
			return false;
		}
	} /**/


});
