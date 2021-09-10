telenor.ReportsDailyRptagententeringsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'reportsDailyRptagententerings',
	renderTemplate:function(){
		this.render('reports/daily/rptagententerings');
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
			var inputs =[ {'name':'from_date', 'value': report.date}
						, {'name':'to_date', 'value': report.date}
						, {'name':'monitoring_for_id', 'value': report.monitoring_for_id}
						, {'name':'ticket_process', 'value': report.ticket_process}
						];

			//console.log(inputs);	
			this.get('common').hiddenForm('agentDataMonitoringReport', inputs);

		}  
	 }
	

});