telenor.UploadersInOutTimesView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
  templateName: 'uploaders/inOutTimes',
  didInsertElement: function(){
     Ember.$(":file").filestyle({buttonName: "btn-info btn-flat"
        , buttonText: ""
        , icon: true
        , buttonBefore: true
        /*, placeholder: "Consumer Picture"*/
        , iconName:"fa fa-upload"
      });
      Ember.$(function(){
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
            var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            
            $('#inOutDate').datepicker({
                 format: "yyyy-mm-dd",
                // daysOfWeekDisabled: [0],
                 //startDate: today,
                 endDate:today,
                 todayHighlight: true,
                 autoclose: true
            });
            $('#inOutDate').datepicker('setDate', today);
           // $(".select2").select2();
            
             //Timepicker
            /*$(".timepicker").timepicker({
              showInputs: false
            });*/
       // Ember.$('.nav-tabs a:last').tab('show');
      });
    }

});
