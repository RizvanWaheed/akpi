telenor.AccalationsRegistrationsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'accalations/registrations',
	didInsertElement: function () {
		var _self = this;
		_self.get('common').showOverlay('dashboard-tabs');
		$(function () {
			Em.run.later(function () {
				//console.log("upall HTML 3");
				$('#tabAccalationManagement a:eq(0)').tab('show');
				$("#mgmtaccalation-Area").addClass('in active');
				$(".select2").select2({
					width: '100%'
				});
				_self.get('common').hideOverlay('dashboard-tabs');
				//Em.$('#dashboard-tabs').isLoading("hide");
			}, 2000);
			// 	$("a[data-toggle=tab][href=#daily]").tab("show");
			//  $(".tab-content #map").removeClass('active');
			//	$(".tab-content #complaint-enter").addClass('in active');
			//	Em.$(".select2").select2({width:'100%'});
		});
		var date = new Date();
		var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		Ember.$('#seachTicketDate').datepicker({
			autoclose: true,
			format: 'yyyy-mm-dd',
			maxDate: new Date(),
			endDate: today,
			todayHighlight: true,
			autoclose: true
		});
		Ember.$('#seachTicketDate').datepicker('setDate', today);

		Ember.$.fn.dataTableExt.oApi.fnSetFilteringDelay = function (oSettings, iDelay) {
			iDelay = (iDelay && (/^[0-9]+$/.test(iDelay))) ? iDelay : 250;
			var $this = this,
				oTimerId;
			var anControl = $('div.dataTables_filter input:text');
			anControl.unbind('keyup').bind('keyup', function () {
				var $$this = $this;
				window.clearTimeout(oTimerId);
				oTimerId = window.setTimeout(function () {
					$$this.fnFilter(anControl.val());
				}, iDelay);
			});
			return this;
		}
		$(window).load(function () {
			// $("a[data-toggle=tab][href=#daily]").tab("show");
			//   $(".tab-content #map").removeClass('active');
			$(".tab-content #accalation-enter").addClass('in active');
			Em.$(".select2").select2({
				width: '100%'
			});
		});
		//Ember.$('#commentArea').hide();
		/* Ember.$('#purchaseDate').datepicker({
		  autoclose: true,
		  format: 'yyyy-mm-dd',
		  maxDate: new Date()
		});*/
		Ember.$(":file").filestyle({
			buttonName: "btn-default btn-flat",
			buttonText: "",
			icon: true,
			placeholder: "Attach Image or File",
			iconName: "fa fa-paperclip"
		});
		setRange = function (start, end) {
			$('#myaccalationDateRange span').html(start + ' - ' + end);
		}

		Ember.$('#myaccalationDateRange').daterangepicker({ //locale: { 
				// "format": 'YYYY-MM-DD', //},
				"startDate": today,
				"endDate": today,
				"maxDate": end,
			}
			/*,function(start, end) {
			                                                            $('#myaccalationDateRange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
			                                                        }*/
		);

		// $('#myaccalationDateRange').data('daterangepicker').setStartDate(today);
		//$('#myaccalationDateRange').data('daterangepicker').setEndDate(today);

		setRange(today, today);


		loadDataTable = function (fDate) {
			if (typeof Tabling !== 'undefined' && Tabling != null) {
				Tabling.fnClearTable();
				Tabling.fnDestroy();
				$(".DTTT_collection").remove();
			}

			Tabling = Ember.$('#myAccalationTable').dataTable({
				"iDisplayLength": 20,
				"scrollY": 500,
				"scrollX": true,
				'bProcessing': true,
				'bServerSide': true,
				'sAjaxSource': 'api/users_api/myaccalation?format=json',
				"fnServerParams": function (aoData) {
					aoData.push({
						"name": "report",
						"value": 'agent'
					}, {
						"name": "from_date",
						"value": fDate[0]
					}, {
						"name": "to_date",
						"value": fDate[1]
					});
				}
			}).fnSetFilteringDelay();
			//   var tt = new Ember.$.fn.dataTable.TableTools( Tabling,  {
			//   "aButtons": [ "copy", "csv", "print" ],
			//   "sSwfPath": "assets/plugins/datatables/DataTables/extensions/TableTools/swf/copy_csv_xls.swf",
			//   //sRowSelect: 'single'
			// } );

			// Ember.$( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
			//$( tt.fnContainer() ).insertAfter('div.info');
		}
		//  loadDataTable(Ember.$('#myaccalationDateRange').val());
		setRangePending = function (start, end) {
			$('#myaccalationDateRangePending span').html(start + ' - ' + end);
		}

		Ember.$('#myaccalationDateRangePending').daterangepicker({ //locale: { 
				// "format": 'YYYY-MM-DD', //},
				"startDate": today,
				"endDate": today,
				"maxDate": end,
			}
			/*,function(start, end) {
			                                                              $('#myaccalationDateRange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
			                                                          }*/
		);

		// $('#myaccalationDateRange').data('daterangepicker').setStartDate(today);
		//$('#myaccalationDateRange').data('daterangepicker').setEndDate(today);

		setRangePending(today, today);
		loadDataTablePending = function (fDate) {
			if (typeof TablingPending !== 'undefined' && TablingPending != null) {
				TablingPending.fnClearTable();
				TablingPending.fnDestroy();
				$(".DTTT_collection").remove();
			}

			TablingPending = Ember.$('#myAccalationTablePending').dataTable({
				"iDisplayLength": 20,
				"scrollY": 500,
				"scrollX": true,
				'bProcessing': true,
				'bServerSide': true,
				'sAjaxSource': 'api/users_api/myaccalation?format=json',
				"fnServerParams": function (aoData) {
					aoData.push({
						"name": "report",
						"value": 'Pending-CS'
					}, {
						"name": "from_date",
						"value": fDate[0]
					}, {
						"name": "to_date",
						"value": fDate[1]
					});
				}
			}).fnSetFilteringDelay();
			//   var tt = new Ember.$.fn.dataTable.TableTools( Tabling,  {
			//   "aButtons": [ "copy", "csv", "print" ],
			//   "sSwfPath": "assets/plugins/datatables/DataTables/extensions/TableTools/swf/copy_csv_xls.swf",
			//   //sRowSelect: 'single'
			// } );

			// Ember.$( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
			//$( tt.fnContainer() ).insertAfter('div.info');
		}
		//   loadDataTablePending(Ember.$('#myaccalationDateRangePending').val());

		setRangeClosed = function (start, end) {
			$('#myaccalationDateRangeClosed span').html(start + ' - ' + end);
		}

		Ember.$('#myaccalationDateRangeClosed').daterangepicker({ //locale: { 
				// "format": 'YYYY-MM-DD', //},
				"startDate": today,
				"endDate": today,
				"maxDate": end,
			}
			/*,function(start, end) {
			                                                              $('#myaccalationDateRange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
			                                                          }*/
		);

		// $('#myaccalationDateRange').data('daterangepicker').setStartDate(today);
		//$('#myaccalationDateRange').data('daterangepicker').setEndDate(today);

		setRangeClosed(today, today);
		loadDataTableClosed = function (fDate) {
			if (typeof TablingClosed !== 'undefined' && TablingClosed != null) {
				TablingClosed.fnClearTable();
				TablingClosed.fnDestroy();
				$(".DTTT_collection").remove();
			}

			TablingClosed = Ember.$('#myAccalationTableClosed').dataTable({
				"iDisplayLength": 20,
				"scrollY": 500,
				"scrollX": true,
				'bProcessing': true,
				'bServerSide': true,
				'sAjaxSource': 'api/users_api/myaccalation?format=json',
				"fnServerParams": function (aoData) {
					aoData.push({
						"name": "report",
						"value": 'Closed'
					}, {
						"name": "from_date",
						"value": fDate[0]
					}, {
						"name": "to_date",
						"value": fDate[1]
					});
				}
			}).fnSetFilteringDelay();
			//   var tt = new Ember.$.fn.dataTable.TableTools( Tabling,  {
			//   "aButtons": [ "copy", "csv", "print" ],
			//   "sSwfPath": "assets/plugins/datatables/DataTables/extensions/TableTools/swf/copy_csv_xls.swf",
			//   //sRowSelect: 'single'
			// } );

			// Ember.$( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
			//$( tt.fnContainer() ).insertAfter('div.info');
		}
		//    loadDataTableClosed(Ember.$('#myaccalationDateRangeClosed').val());
		/* $('#technologistdate').datepicker({
		       format: "yyyy-mm-dd",
		       daysOfWeekDisabled: [0,6],
		       startDate: today,
		       todayHighlight: true,
		       autoclose: true
		  });
		  $('#technologistdate').datepicker('setDate', today);
		  $(".select2").select2();
		   //Timepicker
		  $(".timepicker").timepicker({
		    showInputs: false
		  });
		  Ember.$('.nav-tabs a:last').tab('show');*/
		//Ember.$.datepicker.formatDate('yyyy-mm-dd', dateTypeVar);
		/* Ember.$('textarea#descAccalation').ckeditor({
            //config.extraPlugins = 'image';
            //fullPage: true,
            //allowedContent: true,
            height: '150px',
            toolbar: 'Full',
           // enterMode : CKEDITOR.ENTER_BR,
           // shiftEnterMode: CKEDITOR.ENTER_P
         // / *, extraPlugins :[ 'image, imagebrowser, imgupload, imagepaste' ],* /
            toolbar: [
                {name: 'document', items: ['Source']}, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                {name: 'basicstyles', items: ['Bold', 'Italic']},
              //  ['Copy', 'Paste', 'PasteFromWord', '-', 'Undo', 'Redo'], // Defines toolbar group without name.
                
            ]
        });*/
		/* Ember.$('#phoneAccalation').keypress(function(e) {
		     var charCode = (e.which) ? e.which : e.keyCode;
		     // Allow: backspace, delete, tab, escape, enter and .

		     if ($.inArray(charCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		          // Allow: Ctrl+A, Command+A
		         (charCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
		          // Allow: home, end, left, right, down, up
		         (charCode >= 35 && charCode <= 40)) {
		              // let it happen, don't do anything
		              return;
		     }
		     // Ensure that it is a number and stop the keypress
		     if ((e.shiftKey || (charCode < 48 || charCode > 57))) {
		         e.preventDefault();
		     }
		     var a = Ember.$('#phoneAccalation').val().trim().toString().length
		     if(a > 10) return false;
		    // console.log( Ember.$('#phoneAccalation').val().trim().toString().length);
		    // if(e.which == 13) {
		         //if(Ember.$('#phoneAccalation').val().trim() != ''){
		    //         Ember.$('#phoneAccalation').val().trim().toString().length;
		           //  self.triggerAction({ action:'searchInfo', target:self});
		        // }
		    // }
		 });*/
		Ember.$(function () {
			Ember.$(".select2").select2();
			console.log('Loaded');
			exportTableToCSV = function ($table, filename) {

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
					csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
				//console.log(csv);
				Ember.$(this)
					.attr({
						'download': filename,
						'href': csvData,
						'target': '_blank'
					});
			}
		});
		Ember.$('#CategoryAccalations').click(function (e) {
			var self = this;
			console.log("I have clicked");
			// console.log(Ember.$('#catAccalation').val());
			// console.log(Ember.$('#catAccalation :selected').text());
			self.get('common').showLoader();

			Ember.$.ajax({
				url: 'api/users_api/printExcelSheet/count/?format=json',
				type: 'POST',
				data: {
					id: Ember.$('#catAccalation').val(),
					name: Ember.$('#catAccalation :selected').text()
				},
				success: function (data, textStatus, xhr) {
					//	console.log(data);
					window.open('data:application/vnd.ms-excel,' + encodeURIComponent(data));
					e.preventDefault();

					//var filename = Ember.$('#catAccalation :selected').text();
					//exportTableToCSV.apply(this, [$(data), filename+'.csv']);



					self.get('common').hideLoader();
				},
				error: function (xhr, textStatus, errorThrown) {
					alert('not found');
					self.get('common').hideLoader();
				}
			});
		});
	},
	keyDown: function (e) {},
	actions: {
		searchDataDateWiseTableViewAgentAccalation: function () {
			var self = this;
			var ft = ['', ''],
				ct = ['', ''];
			var enter = '',
				close = '';
			var ftD = Ember.$('#myaccalationDateRange').val();

			//var enter   = Ember.$('#rptComplainEnterAgentID').val();
			//var close   = Ember.$('#rptComplainEnterTeamleadID').val();
			//var category= Ember.$('#rptComplainCategory').val();
			ft = ftD.split('-');
			loadDataTable(ft);
		},
		searchDataDateWiseTablePendingAgentAccalation: function () {
			var self = this;
			var ft = ['', ''],
				ct = ['', ''];
			var enter = '',
				close = '';
			var ftD = Ember.$('#myaccalationDateRangePending').val();

			//var enter   = Ember.$('#rptComplainEnterAgentID').val();
			//var close   = Ember.$('#rptComplainEnterTeamleadID').val();
			//var category= Ember.$('#rptComplainCategory').val();
			ft = ftD.split('-');
			loadDataTablePending(ft);
		},
		searchDataDateWiseTableClosedAgentAccalation: function () {
			var self = this;
			var ft = ['', ''],
				ct = ['', ''];
			var enter = '',
				close = '';
			var ftD = Ember.$('#myaccalationDateRangeClosed').val();

			//var enter   = Ember.$('#rptComplainEnterAgentID').val();
			//var close   = Ember.$('#rptComplainEnterTeamleadID').val();
			//var category= Ember.$('#rptComplainCategory').val();
			ft = ftD.split('-');
			loadDataTableClosed(ft);
		},
		saveRptVoqDataDateWiseTableAgent: function () {
			var ft = ['', ''],
				ct = ['', ''];
			var enter = '',
				close = '';
			var ftD = Ember.$('#rptVoqDateAgent').val();
			//var ctD   = Ember.$('#tatRptTableCalC').val();
			//var region  = Ember.$('#regionsRptVoqConsumer').val();
			//var area  = Ember.$('#areasRptVoqConsumer').val();
			//var territory= Ember.$('#territoriesRptVoqConsumer').val();
			ft = ftD.split('-');
			//ct  = ctD.split('-');     
			/* console.log(enter); console.log(close); console.log(ft); console.log(ct); 
			 ).append($('<input />', {  'type': 'hidden', 'name': 'region',    'value': region })
			  ).append($('<input />', {  'type': 'hidden', 'name': 'area',    'value': area })
			  ).append($('<input />', {  'type': 'hidden', 'name': 'territory',    'value': territory })*/

			//loadDataTable(ft, ct, enter, close);
			//var vlu = this.controllerFor('dashboardcfl').get('modelDataTableLoadingValue');
			($('<form/>', {
				'id': 'tmpCsvForm',
				'action': "api/users_api/consumerAgentDateImport/",
				'method': 'get',
				'target': '_blank'
			}).append($('<input />', {
				'type': 'hidden',
				'name': 'from_date',
				'value': ft[0]
			})).append($('<input />', {
				'type': 'hidden',
				'name': 'to_date',
				'value': ft[1]
			}))).appendTo('body');
			$('form#tmpCsvForm').submit().remove();
			return;


		},
	}

});
