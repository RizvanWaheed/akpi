telenor.AgentsSurveysView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'agents/surveys',
	  didInsertElement: function(){
			var date = new Date();
			var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        Ember.$('#fromDateSurveys').datepicker({
          format: "yyyy-mm-dd",
					 //endDate: today,
					 startDate: today,
           todayHighlight: true,
           autoclose: true
        });
				Ember.$('#fromDateSurveys').datepicker('setDate', today);
				Ember.$('#toDateSurveys').datepicker({
          format: "yyyy-mm-dd",
           //endDate: today,
					 startDate: today,
           todayHighlight: true,
           autoclose: true
        });
        Ember.$('#toDateSurveys').datepicker('setDate', today);
      Ember.$(function(){
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
        edit: function(uid){
        	var _controller = self.get('controller');
          _controller.set('agentsurveyname',uid.get('name'));
          _controller.set('EmailDriveId',uid.get('id'));
          _controller.set('typeEmailDriver',uid.get('monitoring_for_id'));
        }
    }
});
