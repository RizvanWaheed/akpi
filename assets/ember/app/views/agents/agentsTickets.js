telenor.AgentsTicketsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'agents/tickets',
	didInsertElement: function () {
		var _self = this;
		//Ember.$(".select2").select2();
		_self.get('common').showOverlay('dashboard-tabs');
		Em.$(function () {
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
			Ember.$(".select2").select2({
				width: '100%'
			});
			Ember.$(":file").filestyle({
				buttonName: "btn-default btn-flat",
				buttonText: "",
				icon: true,
				placeholder: "Attach Image or File",
				iconName: "fa fa-paperclip"
			});

			//Timepicker
			/*$(".timepicker").timepicker({
			  showInputs: false
			});*/
			// Em.$('#agentsTickets > .nav-tabs a:last').tab('show');
			// Em.$('#agentsTickets > a[href="#tickets-ticket"]').tab('show');
			//$($(this).attr("href")).show();

			Em.run.later(function () {
				//console.log("upall HTML 3");
				$('#agentsTickets a:eq(0)').tab('show');
				$(".tab-content #tickets-ticket").addClass('in active');
				$(".select2").select2({
					width: '100%'
				});
				_self.get('common').hideOverlay('dashboard-tabs');
			}, 2000);
			// console.log("upall HTML");

		});
		// $(function() {
		// 	$("#tickets-ticket").addClass('in active');
		// 	$('a[href="tickets-ticket"]').tab('show');
		//    //$("a[data-toggle=tab][href=#daily]").tab("show");
		// 	 //				 $(".tab-content #map").removeClass('active');
		//  // $(".tab-content #tickets-ticket").addClass('in active');
		// });

	},
	actions: {
		edit: function (uid) {
			var _controller = self.get('controller');
			_controller.set('agentticketname', uid.get('name'));
			_controller.set('EmailDriveId', uid.get('id'));
			_controller.set('typeEmailDriver', uid.get('monitoring_for_id'));
		}
	}
});
