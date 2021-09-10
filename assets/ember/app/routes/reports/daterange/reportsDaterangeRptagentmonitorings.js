telenor.ReportsDaterangeRptagentmonitoringsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'reportsDaterangeRptagentmonitorings',
	model:function(){
		
	},
	setupController: function (controller, model) {
		this._super(controller, model);
        controller.set('model', model);        
	},	
	actions: {
		saveAgentAttendenceReportDaily:function(report){
			var ftD 	= Ember.$('#dateAgentAttendenceReportDaily').val();
			ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						];

			this.get('common').hiddenForm('agentAttendenceMonitoringReport', inputs);
			
		},
		saveAgentAttendenceReportHourly:function(report){
			var ftD 	= Ember.$('#dateAgentAttendenceReportDaily').val();
			ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						];

			//console.log(inputs);	
			this.get('common').hiddenForm('agentAttendenceMonitoringReport2', inputs);

		},
		saveAgentAttendenceReportLoginLogout:function(report){
			var ftD 	= Ember.$('#dateAgentAttendenceReportDaily').val();
			ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						];
			//console.log(inputs);	
			this.get('common').hiddenForm('agentAttendenceMonitoringReport3', inputs);
		}        
	}
});