telenor.ReportsDailyRptagentmonitoringsRoute = Ember.Route.extend(telenor.SecureRoute, Ember.PromiseProxyMixin, {
	controllerName: 'reportsDailyRptagentmonitorings',
	model: function () {
		var _store = this.store;
		//console.log('Entered IN');
		//return this.store.find('visitors',{search_by:'my_tickets'});
		return Ember.RSVP.hash({
			campaigns: _store.find('setups', {
				search_by: 'my',
				base_id: 1000,
				group: 'sub_campaign'
			}),
			shiftTimings: _store.find('shiftTimings')
		});
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('model', model);
	},
	actions: {
		downloadAgentAttendenceReport: function (report, type) {
			var inputs = [{
				'name': 'from_date',
				'value': report.date
			}, {
				'name': 'to_date',
				'value': report.date
			}, {
				'name': 'campaign_id',
				'value': report.campaign_id
			}, {
				'name': 'shift_timings',
				'value': report.shift_timings
			}];

			//console.log(inputs);
			//if()	
			this.get('common').hiddenForm(type, inputs);

		},
		saveAgentAttendenceReportDaily: function (report) {
			var inputs = [{
				'name': 'from_date',
				'value': report.date
			}, {
				'name': 'to_date',
				'value': report.date
			}, {
				'name': 'campaign_id',
				'value': report.campaign_id
			}, {
				'name': 'shift_timings',
				'value': report.shift_timings
			}];

			//console.log(inputs);	
			this.get('common').hiddenForm('agentAttendenceMonitoringReport', inputs);

			/*var ft = ['',''], ct = ['',''] ;
			var enter = '', close = '' ;
			var ftD 	= Ember.$('#dateAgentAttendenceReportDaily').val();
			($('<form/>', {
		        'id':       'tmpCsvForm',
		        'action':   "api/users_api/agentAttendenceMonitoringReport/",
		        'method':   'get',
		        'target': '_blank'
		    }).append($('<input />', { 'type': 'hidden', 'name': 'from_date',  'value': ftD })
		    ).append($('<input />', {  'type': 'hidden', 'name': 'to_date',    'value': ftD })		   
		    )).appendTo('body');
		    $('form#tmpCsvForm').submit().remove();
			return ;*/


		},
		saveAgentAttendenceReportHourly: function (report) {
			var inputs = [{
				'name': 'from_date',
				'value': report.date
			}, {
				'name': 'to_date',
				'value': report.date
			}, {
				'name': 'campaign_id',
				'value': report.campaign_id
			}, {
				'name': 'shift_timings',
				'value': report.shift_timings
			}];

			//console.log(inputs);	
			this.get('common').hiddenForm('agentAttendenceMonitoringReport2', inputs);

			/*var ft = ['',''], ct = ['',''] ;
			var enter = '', close = '' ;
			var ftD 	= Ember.$('#dateAgentAttendenceReportHourly').val();
			
			($('<form/>', {
		        'id':       'tmpCsvForm',
		        'action':   "api/users_api/agentAttendenceMonitoringReport2/",
		        'method':   'get',
		        'target': '_blank'
		    }).append($('<input />', { 'type': 'hidden', 'name': 'from_date',  'value': ftD })
		    ).append($('<input />', {  'type': 'hidden', 'name': 'to_date',    'value': ftD })		   
		    )).appendTo('body');
		    $('form#tmpCsvForm').submit().remove();
			return ;*/


		},
		saveAgentAttendenceReportLoginLogout: function (report) {
			var inputs = [{
				'name': 'from_date',
				'value': report.date
			}, {
				'name': 'to_date',
				'value': report.date
			}, {
				'name': 'campaign_id',
				'value': report.campaign_id
			}, {
				'name': 'shift_timings',
				'value': report.shift_timings
			}];

			//console.log(inputs);	
			this.get('common').hiddenForm('agentAttendenceMonitoringReport3', inputs);


			/*var ft = ['',''], ct = ['',''] ;
			var enter = '', close = '' ;
			var ftD 	= Ember.$('#dateAgentAttendenceReportLoginLogout').val();
			//var ctD 	= Ember.$('#tatRptTableCalC').val();
			//var region 	= Ember.$('#regionsRptVoqConsumer').val();
			//var area 	= Ember.$('#areasRptVoqConsumer').val();
			//var territory= Ember.$('#territoriesRptVoqConsumer').val();
			//ft  = ftD.split('-');
			
			($('<form/>', {
		        'id':       'tmpCsvForm',
		        'action':   "api/users_api/agentAttendenceMonitoringReport3/",
		        'method':   'get',
		        'target': '_blank'
		    }).append($('<input />', { 'type': 'hidden', 'name': 'from_date',  'value': ftD })
		    ).append($('<input />', {  'type': 'hidden', 'name': 'to_date',    'value': ftD })		   
		    )).appendTo('body');
		    $('form#tmpCsvForm').submit().remove();
			return ;*/


		}

	}

});
