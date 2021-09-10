telenor.ReportsDailyRptagententeringsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'reports/daily/rptagententerings',
	didInsertElement: function(){
		/*Ember.$('#rptVoqDateAgent').daterangepicker({
            format: 'MM/DD/YYYY',
            minDate: '04/03/2017',
            maxDate: new Date()
         });*/

		var date = new Date();
	    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        Ember.$('#rptVoqDateAgent').datepicker({
          format: "mm/dd/yyyy",//MM/DD/YYYY
           endDate: today,
          // startDate: today,
           todayHighlight: true,
           autoclose: true
        });
        Ember.$('#rptVoqDateAgent').datepicker('setDate', today);
		Ember.$.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) { 
			iDelay  = (iDelay && (/^[0-9]+$/.test(iDelay))) ? iDelay : 250; 
		  	var $this = this, oTimerId; 
		  	var anControl = $( 'div.dataTables_filter input:text' ); 
		  	anControl.unbind( 'keyup' ).bind( 'keyup', function() { 
				var $$this = $this; 
				window.clearTimeout(oTimerId); 
				oTimerId = window.setTimeout(function() { 
			  		$$this.fnFilter( anControl.val() ); 
				}, iDelay); 
		  	}); 
		  	return this; 
		} 
		//Ember.$.fn.dataTable.TableTools.defaults.aButtons = [];	
		
    },
    actions: {
		searchDataDateWiseTableAgent:function(){
			var self = this;
			var ft = ['',''], ct = ['',''] ;
			var enter = '', close = '' ;
			var ftD 	= Ember.$('#rptVoqDateAgent').val();

			//var enter 	= Ember.$('#rptComplainEnterAgentID').val();
			//var close 	= Ember.$('#rptComplainEnterTeamleadID').val();
			//var category= Ember.$('#rptComplainCategory').val();
			ft  = ftD.split('-');
			loadDataTable(ft);
			

		
        }
    }

});
