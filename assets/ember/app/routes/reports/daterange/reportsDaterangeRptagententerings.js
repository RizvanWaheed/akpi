telenor.ReportsDaterangeRptagententeringsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'reportsDaterangeRptagententerings',
	renderTemplate:function(){
		this.render('reports/daterange/rptagententerings');
	},
	model:function(){
		return this.store.find('monitoringFors');
	},
	setupController: function (controller, model) {
		this._super(controller, model);
        controller.set('model', model);        
	},
	
	actions: {
		saveRptVoqDataDateWiseTableAgent:function(report){
			var ftD 	= Ember.$('#rptVoqDateAgent').val();
			ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						, {'name':'monitoring_for_id', 'value': report.monitoring_for_id}
						, {'name':'ticket_process', 'value': report.ticket_process}
						];

			//console.log(inputs);	
			this.get('common').hiddenForm('agentDataMonitoringReport', inputs);

		} 
        
	 },
	

});