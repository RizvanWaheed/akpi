telenor.AgentsVocsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'agents/vocs',
	didInsertElement: function () {
		var _self = this;
		//Ember.$(".select2").select2();
		_self.get('common').showOverlay('dashboard-tabs');
		// Em.$('#dashboard-tabs').isLoading({
		// 	text: '',
		// 	tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="google-spin-wrapper"><div class="google-spin"></div></div></div></span>',
		// 	position: "overlay"
		// });
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
			// Em.$('#agentsVocs > .nav-tabs a:last').tab('show');
			// Em.$('#agentsVocs > a[href="#vocs-voc"]').tab('show');
			//$($(this).attr("href")).show();

			Em.run.later(function () {
				//console.log("upall HTML 3");
				$('#agentsVocs a:eq(0)').tab('show');
				$(".tab-content #vocs-voc").addClass('in active');
				$(".select2").select2({
					width: '100%'
				});
				_self.get('common').hideOverlay('dashboard-tabs');
				//Em.$('#dashboard-tabs').isLoading("hide");
			}, 2000);
			console.log("upall HTML");

		});
		// $(function() {
		// 	$("#vocs-voc").addClass('in active');
		// 	$('a[href="vocs-voc"]').tab('show');
		//    //$("a[data-toggle=tab][href=#daily]").tab("show");
		// 	 //				 $(".tab-content #map").removeClass('active');
		//  // $(".tab-content #vocs-voc").addClass('in active');
		// });

	},
	actions: {
		edit: function (uid) {
			var _controller = self.get('controller');
			_controller.set('agentvocname', uid.get('name'));
			_controller.set('EmailDriveId', uid.get('id'));
			_controller.set('typeEmailDriver', uid.get('monitoring_for_id'));
		}
	}
});
