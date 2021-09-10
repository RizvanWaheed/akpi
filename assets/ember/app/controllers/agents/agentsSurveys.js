telenor.AgentsSurveysController = Ember.Controller.extend({
	pageName:'agentsSurveys',
	//itemController: 'agentsurvey',
	// sortProperties: ['name'],
	// sortAscending: true,	 // false = descending
		
	selectedCampiagn:Ember.computed('model.campaign.@each.state', function() {
		return this.get('model.campaign').filterBy('state', true)
	}),
	selectedQuestions:Ember.computed('model.surveyQuestions.@each.state', function() {
		return this.get('model.surveyQuestions').filterBy('state', true)
	}),
	surveys:{
		name:'',
		from_date:'',
		to_date:'',
		monitoringFors:Em.A(),
		surveyQuestions:Em.A()
	},
	actions:{
		reset:function(){
			var _controller = this;//.controllerFor('agentsSurveys');//monitoring_for_id:'',
			_controller.set('surveys',{
				name:'',
				from_date:'',
				to_date:'',
				monitoringFors:Em.A(),
				surveyQuestions:Em.A()
			    	
			});
			_controller.get('model.campaign').forEach(function(item, index, enumerable) {
				// if(obj.id == item.id && status == 'inactive'){
				// 	Em.set(item, "status", "checked"); 
  				//     Em.set(item, "state", true); 
				// }else if(obj.id == item.id && status == 'active'){
					Em.set(item, "status", ""); 
  				    Em.set(item, "state", false); 
				// }
			});
			_controller.get('model.surveyQuestions').forEach(function(item, index, enumerable) {
				// if(obj.id == item.id && status == 'inactive'){
				// 	Em.set(item, "status", "checked"); 
  				//     Em.set(item, "state", true); 
				// }else if(obj.id == item.id && status == 'active'){
					Em.set(item, "status", ""); 
  				    Em.set(item, "state", false); 
				// }
			});
		},
		save: function(){
			var _self = this;
		  //  var _self = _self.controllerFor('accalations');
			var model = _self.get('model');
			//console.log(model);
			var surveys = _self.get('surveys');
			var selectedCampiagn = _self.get('selectedCampiagn').mapBy('id');
			var selectedQuestions = _self.get('selectedQuestions').mapBy('id');
			if(Em.isEmpty(surveys.name)){
				_self.get('common').showNotification('error', '<b>Enter survey name!</b>');
				return false;
			}
			if(Em.isEmpty(surveys.from_date)){
				_self.get('common').showNotification('error', '<b>Enter survey from date!</b>');
				return false;
			}
			if(Em.isEmpty(surveys.to_date)){
				_self.get('common').showNotification('error', '<b>Enter survey to date!</b>');
				return false;
			}
			if(selectedCampiagn.length <= 0){
				_self.get('common').showNotification('error', '<b>Select campaign for survey!</b>');
				return false;
			}
			if(selectedQuestions.length <= 0){
				_self.get('common').showNotification('error', '<b>Select Questions for survey!</b>');
				return false;
			}
			surveys.monitoringFors = selectedCampiagn;
			surveys.surveyQuestions = selectedQuestions;
			console.log(surveys);
			
			_self.get('common').consoleClear();
			_self.store.unloadAll('survey');
			var createSurvey = _self.store.createRecord('survey',surveys);
			createSurvey.save().then(function(){
				//Ember.$('#idAccalation').val(0), //Ember.$('#catAccalation').val(''); //Ember.$('#descAccalation').val('');
				//controller.set('accalationTypeStatus',''); //self.send('clog');//();
				_self.get('common').showNotification('success', '<b>Survay saved successfully!</b>');
				// Ember.$('#btnAccalationEditSave').prop("disabled", false);
				// self.send('reloadAll');
				_self.send('reset');
				//Ember.$.isLoading("hide");
			});
			// this.get('common').showOverlay('surveys-survey');
            // this.store.find('activities', {'monitoring_for_id': activities, 'survey_process': 'survey'}).then(function(activeity){
			// 	_controller.set('teekits',activeity);
			// 	//_controller.set('surveyTotals',_self.store.metadataFor("activities"));
			// 	_controller.set('surveyTotals',activeity.get("length"));
			// 	//var meta = this.store.metadataFor("post");
			// 	//Ember.$('#surveys-survey').isLoading("hide");
			// 	_self.get('common').hideOverlay('surveys-survey');
			// });
			
			//console.log(selectedCampiagn);
			// _self.get('common').ajaxppRequest('POST', 'api/users_api/setSurvey?format=json', surveys, 'Yes').then(function (response) {   //newRequest is method of our adapter
			//    	//_self.transitionTo('/');
			// }, function(error){
			//     //handle error  
			// });
			//return false;
           // console.log(activities);
          //  console.log(_accalation); 
           // return false;
           // var _caller = _self.get('caller');
             //$('#catAccalation').val();
           // var a = _accalation.msisdn.trim().toString().length;
/*
            if (a != 12 || _accalation.msisdn <= 920000000000) {
                _self.get('common').showNotification('error', '<b>Enter 12 Digit Phone Number starts with 92XXXXXXXXXX !</b>');
                return false;
            } else if (_accalation.msisdn == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }*/
           	// return false;
         //   Ember.$('#btnAccalationEditSave').prop("disabled", true);

	        //    var id = Ember.$('#idAccalation').val();
	        //    var self = this;
	        //    var controller = self.controllerFor('accalations');
        

           // }

		},
		reload:function(){
			//console.log("I m in controller");
			//this.get('common').consoleClear();

			var _self = this;
			_self.get('common').consoleClear();
			var _controller = this;//.controllerFor('agentsSurveys');
			var activities = _controller.get('activities.monitoring_for_id');
			if(typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			/*Ember.$('#surveys-survey').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
            //console.log('before common');
            //console.log(this.get('common'));
           // console.log('after common');
           // return;
            this.get('common').showOverlay('surveys-survey');
            this.store.find('activities', {'monitoring_for_id': activities, 'survey_process': 'survey'}).then(function(activeity){
				_controller.set('teekits',activeity);
				//_controller.set('surveyTotals',_self.store.metadataFor("activities"));
				_controller.set('surveyTotals',activeity.get("length"));
				//var meta = this.store.metadataFor("post");
				//Ember.$('#surveys-survey').isLoading("hide");
				_self.get('common').hideOverlay('surveys-survey');
			});
			console.log(_self.store.metadataFor("activities"));
			/*Ember.$.ajax({
			    url: 'api/users_api/getMySurveys?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'survey_process':'survey'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	_controller.set('teekits',data.table);
			    	_controller.set('surveyTotals',data.total);
			    	Ember.$('#surveys-survey').isLoading("hide");
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		reloadAdjustment:function(){
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this;//.controllerFor('agentsSurveys');
			var activities = _controller.get('activities.monitoring_for_id');
			if(typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			/*Ember.$('#surveys-adjustment').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
            this.get('common').showOverlay('surveys-adjustment');
			this.store.find('activities', {'monitoring_for_id': activities, 'survey_process': 'adjustment'}).then(function(activeity){
				_controller.set('teekits2',activeity);
				//_controller.set('surveyTotals',_self.store.metadataFor("activities"));
				_controller.set('surveyTotals2',activeity.get("length"));
				//Ember.$('#surveys-adjustment').isLoading("hide");
				_self.get('common').hideOverlay('surveys-adjustment');
			});
			console.log(_self.store.metadataFor("activities"));
			//return;
			
			/*Ember.$.ajax({
			    url: 'api/users_api/getMySurveys?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'survey_process': 'adjustment'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	//_controller.set('teekits2',data.table);
			    	//_controller.set('surveyTotals2',data.total);
			    	
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		editAdjustment:function(activities){
			 console.log('edit');
			
			//return;
			var _controller = this;//.controllerFor('agentsSurveys');//monitoring_for_id:'',
			_controller.set('activities.survey_process','adjustment');
			_controller.set('activities.id',activities.id);
			_controller.set('activities.monitoring_for_id',activities.get('monitoring_for_id.id'));
			_controller.set('activities.email_driver_id',activities.get('email_driver_id.id'));
			_controller.set('activities.email_sub_driver_id',activities.get('email_sub_driver_id.id'));
			_controller.set('activities.email_reason_id',activities.get('email_reason_id.id'));
			_controller.set('activities.email_sub_reason_id',activities.get('email_sub_reason_id.id'));
			_controller.set('activities.survey_no',activities.get('survey_no'));
			_controller.set('activities.domain_id',activities.get('domain_id.id'));
			_controller.set('activities.status',activities.get('status'));
			_controller.set('activities.booking_no',activities.get('booking_no'));

			this.store.find('activitiesAdjustment', {'activity_id': activities.id}).then(function(activeity){
				//console.log(activeity.get(0));
				//_controller.set('teekits',activeity);
				//_controller.set('surveyTotals',activeity.get("length"));
				activeity.forEach(function(asd){//console.log(asd.get('parent_id'));
			    	_controller.set('activities.activitiesAdjustments',{
			    		id:asd.get('id'),
			    		activity_id:asd.get('activity_id'),
			    		amount:asd.get('amount'),
			    		customer_adjustment:asd.get('customer_adjustment'),
			    		captain_adjustment:asd.get('captain_adjustment'),
			    		comment:asd.get('comment')
			    		

			    	});
			    });
				/*_controller.set('activities.activitiesAdjustments',{
			    		id:activeity[0].get('id'),
			    		activity_id:activeity[0].get('activity_id'),
			    		amount:activeity[0].get('amount'),
			    		customer_adjustment:activeity[0].get('customer_adjustment'),
			    		captain_adjustment:activeity[0].get('captain_adjustment'),
			    		comment:activeity[0].get('comment')
			    		

			    });*/
				//Ember.$('#surveys-survey').isLoading("hide");
			});
			return;
			//_controller.set('activities', activities);
			// copy complaint process

			
		}
	}
	
});
// telenor.AgentsSurveyController = Ember.ObjectController.extend({
// 	need:['agentSurveys'],

// });
