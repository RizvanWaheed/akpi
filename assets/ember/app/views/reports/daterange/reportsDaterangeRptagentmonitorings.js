telenor.ReportsDaterangeRptagentmonitoringsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'reports/daterange/rptagentmonitorings',
	didInsertElement: function () {
		var _self = this;
		$(function () {
			Em.run.later(function () {
				//console.log("upall HTML 3");
				// 
				Ember.$('#dateAgentAttendenceReportDaily').daterangepicker({
					format: 'MM/DD/YYYY',
					minDate: '04/03/2017',
					maxDate: new Date()
				});
				_self.get('common').hideOverlay('dashboard-tabs');
			}, 2000);
			// 	$("a[data-toggle=tab][href=#daily]").tab("show");
			//  $(".tab-content #map").removeClass('active');
			//	$(".tab-content #complaint-enter").addClass('in active');
			//	Em.$(".select2").select2({width:'100%'});
		});

		/*Ember.$('#dateAgentAttendenceReportHourly').daterangepicker({
            format: 'MM/DD/YYYY',
            minDate: '04/03/2017',
            maxDate: new Date()
        });
        Ember.$('#dateAgentAttendenceReportLoginLogout').daterangepicker({
            format: 'MM/DD/YYYY',
            minDate: '04/03/2017',
            maxDate: new Date()
        });
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
			
        	exportTableToCSV = function($table, filename) {

		        var $rows = $table.find('tr:has(td,th)'),


		            tmpColDelim = String.fromCharCode(11),
		            tmpRowDelim = String.fromCharCode(0),
		            colDelim = '","',
		            rowDelim = '"\r\n"',

		            csv = '"' + $rows.map(function (i, row) {
		                var $row = $(row),
		                    $cols = $row.find('td');

		                return $cols.map(function (j, col) {
		                    var $col = $(col),
		                        text = $col.text();

		                    return text.replace('"', '""');
		                }).get().join(tmpColDelim);

		            }).get().join(tmpRowDelim)
		                .split(tmpRowDelim).join(rowDelim)
		                .split(tmpColDelim).join(colDelim) + '"',

		            // Data URI
		            csvData = 'data:application/csv,' + encodeURIComponent(csv);
		            //console.log(csv);
		            window.open(csvData);
				    e.preventDefault();

		        /*Ember.$(this)
		            .attr({  
		            'download': filename,
		                'href': csvData,
		                'target': '_blank'
		        });* /
		    }
        });*/
		/*Ember.$('#CategoryComplains').click(function(e) {
			var self = this;
           // console.log("I have clicked");
           // console.log(Ember.$('#catComplain').val());
           // console.log(Ember.$('#catComplain :selected').text());
            Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });
          
            Ember.$.ajax({
			    url: 'api/users_api/printExcelSheet/count/?format=json',
			    type: 'POST',
			    data:{id:Ember.$('#catComplain').val(), name:Ember.$('#catComplain :selected').text()},
			    success: function(data, textStatus, xhr) {
			    //	console.log(data);
			        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(data));
    				e.preventDefault();

			    	//var filename = Ember.$('#catComplain :selected').text();
			    	//exportTableToCSV.apply(this, [$(data), filename+'.csv']);
			    	


			      	Ember.$.isLoading("hide");
			    },
			    error: function(xhr, textStatus, errorThrown) {
			        alert('not found');
			        Ember.$.isLoading("hide");
			    }
		    });
        });*/
	},
	actions: {
		searchDataDateWiseTableAgent: function () {
			var self = this;
			var ft = ['', ''],
				ct = ['', ''];
			var enter = '',
				close = '';
			var ftD = Ember.$('#rptVoqDateAgent').val();

			//var enter 	= Ember.$('#rptComplainEnterAgentID').val();
			//var close 	= Ember.$('#rptComplainEnterTeamleadID').val();
			//var category= Ember.$('#rptComplainCategory').val();
			ft = ftD.split('-');
			loadDataTable(ft);



		}
	}

});
