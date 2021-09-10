telenor.QualityRendomizersView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'quality/rendomizers',
  didInsertElement: function(){

      Ember.$(function(){
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
            var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            
            $('#communicationDate').datepicker({
                 format: "yyyy-mm-dd",
                 //daysOfWeekDisabled: [0],
                 //startDate: today,
                 endDate:today,
                 todayHighlight: true,
                 autoclose: true
            });
            $('#communicationDate').datepicker('setDate', today);
           // $(".select2").select2();
            
             //Timepicker
            /*$(".timepicker").timepicker({
              showInputs: false
            });*/
       // Ember.$('.nav-tabs a:last').tab('show');
      });
    }

});
