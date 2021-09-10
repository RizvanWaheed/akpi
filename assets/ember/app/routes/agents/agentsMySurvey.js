telenor.AgentsMySurveyRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName:'agentsMySurvey',
	model:function(params){
		console.log(params);
		return Ember.RSVP.hash({
			surveys: this.store.find('surveys',{id:params.id, status:1}),
            surveyResults: this.store.find('surveyResults',{survey_id:params.id, type:'my'})
        });
        /*return Ember.RSVP.all({
            campaign:  this.get('campaign');,
            surveyQuestions: _store.find('surveyQuestions',{ status:1}),
        });	*/	
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('surveys', model.surveys.get('firstObject'));
		console.log(controller.get('surveys'));
        controller.set('model', model);
  	},
  	actions:{
		rateLead:function(a,b){
			var _self = this;
			console.log(a);
			console.log(b);
			_self.get('common').consoleClear();
			_self.store.unloadAll('surveyResult');
			var createSurveyResult = _self.store.createRecord('surveyResult',{id:b, result:a});
			createSurveyResult.save().then(function(){
				//Ember.$('#idAccalation').val(0), //Ember.$('#catAccalation').val(''); //Ember.$('#descAccalation').val('');
				//controller.set('accalationTypeStatus',''); //self.send('clog');//();
				//_self.get('common').showNotification('success', '<b>Star successfully!</b>');
				// Ember.$('#btnAccalationEditSave').prop("disabled", false);
				// self.send('reloadAll');
				//_self.send('reset');
				//Ember.$.isLoading("hide");
			});
		}
	}
});
