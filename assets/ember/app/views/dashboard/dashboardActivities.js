telenor.DashboardActivitiesView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'dashboard/activities',
	
	didInsertElement: function(){
		Em.$(function(){
			
			Em.$('#dateWiseChartCalendar').daterangepicker();
			
		//Ember.$('#categoryChartCalendar').daterangepicker();		
		//Ember.$('#teamleadChartCalendar').daterangepicker();


      
           /* var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            
            $('#appointmentDate').datepicker({
                 format: "yyyy-mm-dd",
                 daysOfWeekDisabled: [0,6],
                 startDate: today,
                 todayHighlight: true,
                 autoclose: true
            });
            $('#appointmentDate').datepicker('setDate', today);*/
            Ember.$(".select2").select2();
             //Timepicker
            /*$(".timepicker").timepicker({
              showInputs: false
            });*/
        //Ember.$('.nav-tabs a:last').tab('show');
      });
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
