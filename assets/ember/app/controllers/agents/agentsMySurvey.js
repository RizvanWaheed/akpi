telenor.AgentsMySurveyController = Ember.Controller.extend({
	pageName:'agentsMySurvey',
	surveys:{
		id:0,
		name:'',
		from_date:'',
		to_date:'',
		feedback:''
	},
	actions:{		
		save: function(){
			var _self = this;
			//var _controller = _self.controllerFor('mySurvey');
			var surveyResult = _self.get('model.surveys');
			console.log(surveyResult.get('lastObject').id);
			data = {id:surveyResult.get('lastObject').id, feedback:_self.get('surveys.feedback')};
			_self.get('common').ajaxppRequest('GET', 'api/users_api/surveyComplete?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
				
				_self.get('common').showNotification('success', '<b>Survey saved successfully!</b>');
				// if(Em.isEmpty(response.stats) || response.stats[0].current == 'Logout'){
				// 	window.location.assign(javaScriptApplicationRoot+'Careem/logout');
				// 	return false;
				// }
				//console.log(_controller.get('notify'));
				_self.transitionTo('/');
			}, function(error){ 
				
			});
			return;
		
		}
	}
	
});
