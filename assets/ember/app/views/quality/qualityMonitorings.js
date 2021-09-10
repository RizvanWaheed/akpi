telenor.QualityMonitoringsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'quality/monitorings',
	didInsertElement: function () {

		var _self = this;
		_self.get('common').showOverlay('dashboard-tabs');
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
			showMeridian: false,
		});
		$(function () { //Em.$(".tab-content #tickets-ticket").addClass('in active');
			Em.run.later(function () {
				//console.log("upall HTML 3");
				$('#voiceMonoiId a:eq(0)').tab('show');
				$(".tab-content #callactivity-upselling").addClass('in active');
				$(".select2").select2({
					width: '100%'
				});
				_self.get('common').hideOverlay('dashboard-tabs');
			}, 2000);
			console.log("upall HTML");


		});
		//Em.$('a[href="callactivity-upselling"]').tab('show');

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
