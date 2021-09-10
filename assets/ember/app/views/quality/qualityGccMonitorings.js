telenor.QualityGccMonitoringsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'quality/gccMonitorings',
    /*willAnimateIn : function () {
        this.$().css("opacity", 0);
    },
    animateIn : function (done) {
        this.$().fadeTo(500, 1, done);
          this.$().show("slide", { direction: "left" }, 1000);
          this.$().slideDown(1600);
    },
    animateOut : function (done) {
        this.$().slideUp(800, 0, done);
    },*/
	didInsertElement: function(){
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        Ember.$('#dateQualityMonitor').datepicker({
          format: "yyyy-mm-dd",
           endDate: today,
           todayHighlight: true,
           autoclose: true
        });
        Ember.$('#dateQualityMonitor').datepicker('setDate', today);
        $(".timepicker").timepicker({
          showInputs: false,
          showMeridian:false,
        });
        $(".timepicker").timepicker({
          showInputs: false,
          showMeridian:false,
        });
        /*Ember.$('#phoneCallActivity').keypress(function(e) {
            var charCode = (e.which) ? e.which : e.keyCode;
            if ($.inArray(charCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (charCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || (charCode >= 35 && charCode <= 40)) {
                return;
            }
            if ((e.shiftKey || (charCode < 48 || charCode > 57))) {
                e.preventDefault();
            }
            var a = Ember.$('#phoneCallActivity').val().trim().toString().length
            if(a > 10) return false;
        });*/
    }
});
