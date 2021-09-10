telenor.ReportsDailyRptqltymonitoringsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'reportsDailyRptqltymonitorings',
	model:function(){
		return this.store.find('monitoringFors');
	},
	setupController: function (controller, model) {
		this._super(controller, model);
        controller.set('model', model);        
	},	
	actions: {
		funcMonitoringReport:function(report){
			/*var ftD 		= Ember.$('#rptVoqDateAgent').val();
			var for_id 	  	= Ember.$('#monitoring_for_id').val();
			var belongs_to 	= Ember.$('#monitoring_belongs').val();*/

			var inputs =[ {'name':'from_date', 'value': report.date}
						, {'name':'to_date', 'value': report.date}
						, {'name':'for_id', 'value': report.monitoring_for_id } 
						, {'name':'belongs_to', 'value': report.monitoring_belong_id }
						];

			//console.log(inputs);			

			this.get('common').hiddenForm('qualityMonitoringReport', inputs);
			
			/*($('<form/>', {
		        'id':       'tmpCsvForm',
		        'action':   "api/users_api/qualityMonitoringReport/",
		        'method':   'get',
		        'target': '_blank'
		    }).append($('<input />', { 'type': 'hidden', 'name': 'from_date',  'value': ftD })
		    ).append($('<input />', {  'type': 'hidden', 'name': 'to_date',    'value': ftD })	
		    ).append($('<input />', {  'type': 'hidden', 'name': 'for_id',     'value': for_id })
		    ).append($('<input />', {  'type': 'hidden', 'name': 'belongs_to', 'value': belongs_to })		   
		    )).appendTo('body');
		    $('form#tmpCsvForm').submit().remove();
			return ;*/


		}        
	 }
	

});