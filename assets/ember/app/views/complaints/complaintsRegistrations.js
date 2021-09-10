telenor.ComplaintsRegistrationsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'complaints/registrations',
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
		var _self = this;
		_self.get('common').showOverlay('dashboard-tabs');
      var date = new Date();
      var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		 
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
			$(function() {
				Em.run.later(function(){ 
					//console.log("upall HTML 3");
					$('#tabComplaintRegistration a:eq(3)').tab('show');
					$("#complaint-enter").addClass('in active');
					$(".select2").select2({width:'100%'});
					_self.get('common').hideOverlay('dashboard-tabs');
				}, 2000);
        // $("a[data-toggle=tab][href=#daily]").tab("show");
     //   $(".tab-content #map").removeClass('active');
		//		$(".tab-content #complaint-enter").addClass('in active');
			//	Em.$(".select2").select2({width:'100%'});
    	});
		// 	Ember.run.later(function(){
		// 		Ember.$('#tabComplaintRegistration > .nav-tabs a:last').tab('show');
		// //		Ember.$('#sub_reason_id').select2();
		// 	}, 200);
			
		// 	$('#tabComplaintRegistration > a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 		var target = $(e.target).attr("href") // activated tab
		// 		alert(target);
		// 	});
		//	Em.$('#tabComplaintRegistration > .nav-tabs a:last').tab('show');
			// Em.$('#agentsTickets a[href="#tickets-ticket"]').tab('show');
			//$($(this).attr("href")).show();
    	//Ember.$('#commentArea').hide();
      /* Ember.$('#purchaseDate').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date()
      });*/
        Ember.$(":file").filestyle({buttonName: "btn-default btn-flat"
              , buttonText: ""
              , icon: true
              , placeholder: "Attach Image or File"
              , iconName:"fa fa-paperclip"
        });
        setRange = function(start, end){
           $('#mycomplaintDateRange span').html(start + ' - ' + end);
        }

        Ember.$('#mycomplaintDateRange').daterangepicker({ //locale: { 
                                                           // "format": 'YYYY-MM-DD', //},
                                                           "startDate": today, 
                                                           "endDate": today,
                                                           "maxDate": end,
                                                        }/*,function(start, end) {
                                                            $('#mycomplaintDateRange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                                                        }*/);

      // $('#mycomplaintDateRange').data('daterangepicker').setStartDate(today);
       //$('#mycomplaintDateRange').data('daterangepicker').setEndDate(today);

       setRange(today, today);
       

          loadDataTable = function(fDate){
            if(typeof Tabling !== 'undefined' && Tabling != null){  Tabling.fnClearTable(); Tabling.fnDestroy();  $(".DTTT_collection").remove(); }

            Tabling = Ember.$('#myComplaintTable').dataTable({ 
                  "iDisplayLength": 20,
                  "scrollY": 500,
                  "scrollX": true,
                  'bProcessing':true, 
                  'bServerSide':true, 
                  'sAjaxSource':javaScriptApplicationRoot+'api/users_api/mycomplaint?format=json',
                  "fnServerParams": function ( aoData ) {
                    aoData.push( {"name": "report", "value": 'agent'},
                           {"name": "from_date", "value": fDate[0]},
                           {"name": "to_date", "value": fDate[1]}
                           );
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
          loadDataTable(Ember.$('#mycomplaintDateRange').val());
          setRangePending = function(start, end){
             $('#mycomplaintDateRangePending span').html(start + ' - ' + end);
          }

          Ember.$('#mycomplaintDateRangePending').daterangepicker({ //locale: { 
                                                             // "format": 'YYYY-MM-DD', //},
                                                             "startDate": today, 
                                                             "endDate": today,
                                                             "maxDate": end,
                                                          }/*,function(start, end) {
                                                              $('#mycomplaintDateRange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                                                          }*/);

        // $('#mycomplaintDateRange').data('daterangepicker').setStartDate(today);
         //$('#mycomplaintDateRange').data('daterangepicker').setEndDate(today);

          setRangePending(today, today);
          loadDataTablePending = function(fDate){
            if(typeof TablingPending !== 'undefined' && TablingPending != null){  TablingPending.fnClearTable(); TablingPending.fnDestroy();  $(".DTTT_collection").remove(); }

            TablingPending = Ember.$('#myComplaintTablePending').dataTable({ 
                  "iDisplayLength": 20,
                  "scrollY": 500,
                  "scrollX": true,
                  'bProcessing':true, 
                  'bServerSide':true, 
                  'sAjaxSource':javaScriptApplicationRoot+'api/users_api/mycomplaint?format=json',
                  "fnServerParams": function ( aoData ) {
                    aoData.push( {"name": "report", "value": 'Pending-CS'},
                           {"name": "from_date", "value": fDate[0]},
                           {"name": "to_date", "value": fDate[1]}
                           );
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
          loadDataTablePending(Ember.$('#mycomplaintDateRangePending').val());

          setRangeClosed = function(start, end){
             $('#mycomplaintDateRangeClosed span').html(start + ' - ' + end);
          }

          Ember.$('#mycomplaintDateRangeClosed').daterangepicker({ //locale: { 
                                                             // "format": 'YYYY-MM-DD', //},
                                                             "startDate": today, 
                                                             "endDate": today,
                                                             "maxDate": end,
                                                          }/*,function(start, end) {
                                                              $('#mycomplaintDateRange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                                                          }*/);

        // $('#mycomplaintDateRange').data('daterangepicker').setStartDate(today);
         //$('#mycomplaintDateRange').data('daterangepicker').setEndDate(today);

          setRangeClosed(today, today);
          loadDataTableClosed = function(fDate){
            if(typeof TablingClosed !== 'undefined' && TablingClosed != null){  TablingClosed.fnClearTable(); TablingClosed.fnDestroy();  $(".DTTT_collection").remove(); }

            TablingClosed = Ember.$('#myComplaintTableClosed').dataTable({ 
                  "iDisplayLength": 20,
                  "scrollY": 500,
                  "scrollX": true,
                  'bProcessing':true, 
                  'bServerSide':true, 
                  'sAjaxSource':javaScriptApplicationRoot+'api/users_api/mycomplaint?format=json',
                  "fnServerParams": function ( aoData ) {
                    aoData.push( {"name": "report", "value": 'Closed'},
                           {"name": "from_date", "value": fDate[0]},
                           {"name": "to_date", "value": fDate[1]}
                           );
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
          loadDataTableClosed(Ember.$('#mycomplaintDateRangeClosed').val());
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
      	/* Ember.$('textarea#descComplaint').ckeditor({
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
       /* Ember.$('#phoneComplaint').keypress(function(e) {
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
            var a = Ember.$('#phoneComplaint').val().trim().toString().length
            if(a > 10) return false;
           // console.log( Ember.$('#phoneComplaint').val().trim().toString().length);
           // if(e.which == 13) {
                //if(Ember.$('#phoneComplaint').val().trim() != ''){
           //         Ember.$('#phoneComplaint').val().trim().toString().length;
                  //  self.triggerAction({ action:'searchInfo', target:self});
               // }
           // }
        });*/
		/*Ember.$(function(){
      Ember.$(".select2").select2();
            	console.log('Loaded');
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
		Ember.$('#CategoryComplaints').click(function(e) {
			var self = this;
            console.log("I have clicked");
           // console.log(Ember.$('#catComplaint').val());
           // console.log(Ember.$('#catComplaint :selected').text());
            Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });
          
            Ember.$.ajax({
			    url: 'api/users_api/printExcelSheet/count/?format=json',
			    type: 'POST',
			    data:{id:Ember.$('#catComplaint').val(), name:Ember.$('#catComplaint :selected').text()},
			    success: function(data, textStatus, xhr) {
			    //	console.log(data);
			        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(data));
    				e.preventDefault();

			    	//var filename = Ember.$('#catComplaint :selected').text();
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
		searchDataDateWiseTableViewAgentComplaint:function(){
        var self = this;
        var ft = ['',''], ct = ['',''] ;
        var enter = '', close = '' ;
        var ftD   = Ember.$('#mycomplaintDateRange').val();

        //var enter   = Ember.$('#rptComplainEnterAgentID').val();
        //var close   = Ember.$('#rptComplainEnterTeamleadID').val();
        //var category= Ember.$('#rptComplainCategory').val();
        ft  = ftD.split('-');
        loadDataTable(ft);
    }, 
    searchDataDateWiseTablePendingAgentComplaint:function(){
        var self = this;
        var ft = ['',''], ct = ['',''] ;
        var enter = '', close = '' ;
        var ftD   = Ember.$('#mycomplaintDateRangePending').val();

        //var enter   = Ember.$('#rptComplainEnterAgentID').val();
        //var close   = Ember.$('#rptComplainEnterTeamleadID').val();
        //var category= Ember.$('#rptComplainCategory').val();
        ft  = ftD.split('-');
        loadDataTablePending(ft);
    },
    searchDataDateWiseTableClosedAgentComplaint:function(){
        var self = this;
        var ft = ['',''], ct = ['',''] ;
        var enter = '', close = '' ;
        var ftD   = Ember.$('#mycomplaintDateRangeClosed').val();

        //var enter   = Ember.$('#rptComplainEnterAgentID').val();
        //var close   = Ember.$('#rptComplainEnterTeamleadID').val();
        //var category= Ember.$('#rptComplainCategory').val();
        ft  = ftD.split('-');
        loadDataTableClosed(ft);
    },    
    saveRptVoqDataDateWiseTableAgent:function(){
      var ft = ['',''], ct = ['',''] ;
      var enter = '', close = '' ;
      var ftD   = Ember.$('#rptVoqDateAgent').val();
      //var ctD   = Ember.$('#tatRptTableCalC').val();
      //var region  = Ember.$('#regionsRptVoqConsumer').val();
      //var area  = Ember.$('#areasRptVoqConsumer').val();
      //var territory= Ember.$('#territoriesRptVoqConsumer').val();
      ft  = ftD.split('-');
      //ct  = ctD.split('-');     
      /* console.log(enter); console.log(close); console.log(ft); console.log(ct); 
       ).append($('<input />', {  'type': 'hidden', 'name': 'region',    'value': region })
        ).append($('<input />', {  'type': 'hidden', 'name': 'area',    'value': area })
        ).append($('<input />', {  'type': 'hidden', 'name': 'territory',    'value': territory })*/

      //loadDataTable(ft, ct, enter, close);
      //var vlu = this.controllerFor('dashboardcfl').get('modelDataTableLoadingValue');
      ($('<form/>', {
            'id':       'tmpCsvForm',
            'action':   "api/users_api/consumerAgentDateImport/",
            'method':   'get',
            'target': '_blank'
        }).append($('<input />', { 'type': 'hidden', 'name': 'from_date',  'value': ft[0] })
        ).append($('<input />', {  'type': 'hidden', 'name': 'to_date',    'value': ft[1] })       
        )).appendTo('body');
        $('form#tmpCsvForm').submit().remove();
      return ;


    },
  }

});
