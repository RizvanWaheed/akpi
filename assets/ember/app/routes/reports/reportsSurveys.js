telenor.ReportsSurveysRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'reportsSurveys',
	model:function(){
		return this.store.find('surveys',{parent_id:1});
	},
	setupController: function (controller, model) {
		this._super(controller, model);
        controller.set('model', model);        
	},	
	actions: {
		surveyDateWiseDownload:function(reports){
			console.log(reports.date);
			var ft  = reports.date.split('-');
			var ftD = Ember.$('#rptVoqDateAgent').val();
			var ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						, {'name':'survey_id', 'value': reports.survey_id}
						];
			//console.log(inputs);	
			this.get('common').hiddenForm('surveyResultDateImport', inputs);
		},
		surveyDateWiseSearch:function(reports){
			console.log(reports.date);
			var ft  = reports.date.split('-');
			var ftD = Ember.$('#rptVoqDateAgent').val();
			var ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						, {'name':'survey_id', 'value': reports.survey_id}
						, {'name':'report', 'value': 'agent'}
						];

			this.get('common').dataTableLoading('tatRptTableComplainsList', 'complaintSaActivityReport', inputs);		
		}
        
	}

});
