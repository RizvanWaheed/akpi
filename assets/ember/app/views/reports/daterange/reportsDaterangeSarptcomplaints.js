telenor.ReportsDaterangeSarptcomplaintsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'reports/daterange/sarptcomplaints',
	didInsertElement: function(){
		var start = moment().subtract(29, 'days');
    	var end = moment();
    	 function updateLabel(start, end, label) {
    	 	//$("#rptVoqDateAgent span").html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    	 	$("#rptVoqDateAgent").value(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    	}
		Ember.$('#rptVoqDateAgent').daterangepicker({
			format: 'MM/DD/YYYY',
			//format: 'YYYY_MM_DD',
			startDate: start,
            endDate: end,
            autoApply: true,
          //  "opens": "center",
        }, updateLabel);

		/*Em.$('#rptVoqDateAgent').daterangepicker({
            format: 'MM/DD/YYYY',
            minDate: '02/10/2017',
            maxDate: new Date()
        });*/
		/*Ember.$.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) { 
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
		} */
		//Ember.$.fn.dataTable.TableTools.defaults.aButtons = [];	
		/*Ember.$(function(){
			var chartData = [];
		 
		    loadDataTable = function(fDate){
				if(typeof Tabling !== 'undefined' && Tabling != null){	Tabling.fnClearTable(); Tabling.fnDestroy();  $(".DTTT_collection").remove(); }

				Tabling = Ember.$('#tatRptTableComplainsList').dataTable({ 
							"iDisplayLength": 20,
							"scrollY": 500,
							"scrollX": true,
							'bProcessing':true, 
							'bServerSide':true, 
							'sAjaxSource':'api/users_api/complaintSaActivityReport?format=json',
							"fnServerParams": function ( aoData ) {
								aoData.push( {"name": "report", "value": 'agent'},
											 {"name": "from_date", "value": fDate[0]},
											 {"name": "to_date", "value": fDate[1]}
											 );//agentActivityReport
					 		}
				  		}).fnSetFilteringDelay();
				    var tt = new Ember.$.fn.dataTable.TableTools( Tabling,  {
						"aButtons": [ "copy", "csv", "print" ],
						"sSwfPath": "../assets/plugins/datatables/DataTables/extensions/TableTools/swf/copy_csv_xls.swf",
						//sRowSelect: 'single'
					} );
	 
	    		Ember.$( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
				//$( tt.fnContainer() ).insertAfter('div.info');
			}
		
		
			loadDataTable('');
		   
        });
		*/
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
