telenor.ReportsDaterangeSarptcomplaintsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'reportsDaterangeSarptcomplaints',
	model:function(){
		return this.store.find('domains',{parent_id:1});
	},
	setupController: function (controller, model) {
		this._super(controller, model);
        controller.set('model', model);        
	},	
	actions: {
		complaintDateWiseDownload:function(reports){
			console.log(reports.date);
			var ft  = reports.date.split('-');
			var ftD = Ember.$('#rptVoqDateAgent').val();
			var ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						, {'name':'domain_id', 'value': reports.domain_id}
						];
			//console.log(inputs);	
			this.get('common').hiddenForm('consumerAgentDateImport', inputs);
		},
		complaintDateWiseSearch:function(reports){
			console.log(reports.date);
			var ft  = reports.date.split('-');
			var ftD = Ember.$('#rptVoqDateAgent').val();
			var ft  = ftD.split('-');
			var inputs =[ {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						, {'name':'domain_id', 'value': reports.domain_id}
						, {'name':'report', 'value': 'agent'}
						];

			this.get('common').dataTableLoading('tatRptTableComplainsList', 'complaintSaActivityReport', inputs);		
		}
        
	}

});
