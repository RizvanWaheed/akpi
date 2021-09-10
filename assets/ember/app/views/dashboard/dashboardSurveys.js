telenor.DashboardSurveysView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'dashboard/surveys',
	
	didInsertElement: function(){
		
    },
	actions: {
		searchDataDateWise:function(report){
			//var ft = ['',''], ct = ['',''] ;
			//var enter = '', close = '' ;
			var ftD 	= Ember.$('#dateWiseChartCalendar').val();
			//var enter 	= Ember.$('#rptComplainEnterAgentID').val();
			console.log(report);
			//ft  = report.date.split('-');
			ft  = ftD.split('-');
			console.log(ft);
			/* console.log(enter); console.log(close); console.log(ft); console.log(ct); */

			// loadDateWiseGraphData(ft);
			// loadCategoryGraphData(ft);
			loadTeamLeadGraphData(ft);
        },  
        edit: function(uid){
        	var _controller = self.get('controller');
          _controller.set('agentticketname',uid.get('name'));
          _controller.set('EmailDriveId',uid.get('id'));
          _controller.set('typeEmailDriver',uid.get('monitoring_for_id'));
        }
    }
});
