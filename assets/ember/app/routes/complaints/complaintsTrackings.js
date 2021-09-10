telenor.ComplaintsTrackingsRoute = Ember.Route.extend(telenor.SecureRoute, {
    controllerName: 'complaintsTrackings',
   /* baseUrl: '',
    pageSize: 20,
    pageNumber: 1,
    pageSizeNew: 20,
    pageNumberNew: 1,
    pageSizeView: 20,
    pageNumberView: 1,
    pageSizeClose: 20,
    pageNumberClose: 1,

    visitedPage: Ember.A(),
    visitedPageNew: Ember.A(),
    visitedPageClose: Ember.A(),
    visitedPageView: Ember.A(),

    complaintCountNew: 0,
    numberNew: 0,
    complaintCountClose: 0,
    numberClose: 0,
    complaintCountView: 0,
    numberView: 0,*/


    cmbEmptyCondition: 0,
    /*beforeModel: function() {
        if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "complaints.trackings"))){
            this.transitionTo('/');
        }
    },*/
    model: function() {
        //var chatUserJson = this.store.find('chatUsers');
        return Ember.A();
    },

    setupController: function(controller, model) {
        var self = this;
       /* var baseUrl = this.controllerFor("application").get("applicationURL");
        this.set('baseUrl', baseUrl);*/
        this._super(controller, model);
        /*var iC = localStorage.getItem('iC');
        if(iC == '1891608228061981'){
        	controller.set('isCloseable', true);
        }*/
        //controller.set('products', self.store.find('products'));
        self.store.unloadAll('departments');
        self.store.find('departments').then(function(rec) {
            controller.set('allDepartments', rec);
            controller.get('departments').clear();
            rec.forEach(function(item, index, enumerable) {
               // console.log(item);
                if(parseInt(item.get('parent_id')) == 0){
                    controller.get('departments').pushObject(item);
                }else{
                    controller.get('subReportDepartments').pushObject(item);
                }
            });
		});
		controller.set('monitoredBy', this.get('campaign'));
		/*self.store.unloadAll('dispositions');
        self.store.find('dispositions').then(function(disposition) {
            controller.set('dispositions', disposition);
            disposition.forEach(function(item, index, enumerable) {
               // console.log(item.get('parent_id'));
                if(parseInt(item.get('parent_id')) == 0){
                    controller.get('categories').pushObject(item);
                }else{
                    controller.get('reasons').pushObject(item);
                }
            });
        });*/
        self.store.unloadAll('domains');
        self.store.find('domains',{parent_id:1}).then(function(area) {
            controller.set('cities', area);
        });
        // self.store.unloadAll('monitoringCategories');
        // controller.get('drivers').clear();
        // self.store.find('monitoringCategories', {'monitoring_for_id':this.get('campaign').mapBy('id')}).then(function(drivers){
			
		// 	if(self.get('campaign').get('firstObject').category_level == 4){
		// 		var category = drivers.filter(function(driver) {
		// 			return driver.get('level') == 1;
		// 		});
		// 		var sub_category = drivers.filter(function(driver) {
		// 			return driver.get('level') == 2;
		// 		});
		// 		var reason = drivers.filter(function(driver) {
		// 			return driver.get('level') == 3;
		// 		});
		// 		var sub_reason = drivers.filter(function(driver) {
		// 			return driver.get('level') == 4;
		// 		});
		// 	}
		// 	else{
		// 		var reason = drivers.filter(function(driver) {
		// 			return driver.get('level') == 1;
		// 		});
		// 		var sub_reason = drivers.filter(function(driver) {
		// 			return driver.get('level') == 2;
		// 		});
		// 		var category = reason;
		// 		var sub_category = reason;
		// 	}
        //     controller.set('categories', category);
        //     controller.set('sub_categories', sub_category);
        //     controller.set('reasons', reason);
        //     controller.set('sub_reasons', sub_reason);
        //     //self.set('drivers',drivers);
		// 	// console.log(controller.get('categories'));
		// 	// console.log(controller.get('sub_categories'));
		// 	// console.log(controller.get('reasons'));
		// 	// console.log(controller.get('sub_reasons'));

        //     //self.set('emailDriverStyle', "display:block");
        //     //self.set('emailDriverSubStyle', "display:none");
        //     //self.set('emailDriverReasonStyle', "display:block");
        //     //self.set('emailDriverReasonSubStyle', "visibility:visible");

        //    //  visibility: hidden
		//    //$(window).load(function() {
		// 		// $("a[data-toggle=tab][href=#daily]").tab("show");
		//  		//   $(".tab-content #map").removeClass('active');
		//  	Em.$("#complaints_tracks_enter").addClass('in active');
		// 	Em.$(".select2").select2({width:'100%'});
		// 	//});
          
            
        // });
        /* self.store.find('openedComplaints',{rtrn:'all', start:1, end:20}).then(function(rec){
        	controller.set('openedComplaints', rec);
        	self.get('visitedPageNew').push(1);
        	self.set('numberNew',1);
        	Ember.$.ajax({
			    url: 'api/users_api/openedComplaints/count/?format=json',
			    type: 'GET',
			    success: function(data, textStatus, xhr) {
			   // 	console.log(data);
			      	controller.set('complaintCountNew', data.complaintsCountNew);
			      	self.set('complaintCountNew', data.complaintsCountNew);
			    },
			    error: function(xhr, textStatus, errorThrown) {
			        alert('not found');
			    }
		    });
		});
		*/
		self.store.find('complaintStates',{parent_id:1}).then(function(area) {
            controller.set('complaintStates', area);
		});
		Em.$("#complaint-tenter").addClass('in active');
		Em.$(".select2").select2({width:'100%'});
		controller.set('model', model);
		controller.set('reloadTrakingComplaint', 'go');
        this.reloadTrakingComplaint(controller);
	},
	reloadTrakingComplaint:function(controller){
        //console.log("I m in application funcation")
        var self = this;
        if(Ember.isBlank(controller.get('reloadTrakingComplaint'))) {
            Ember.run.cancel();
        }else{
            Em.run.later(function(){
				data = {from_form:'tracking'};
                self.get('common').ajaxppRequest('GET', 'api/users_api/myMgmtComplaint?format=json', data, '').then(function (response) {   //newRequest is method of our adapter
                    controller.set('mgmtNewComplaint', response.open);
                    controller.set('mgmtPendingComplaint', response.pending);
                    controller.set('mgmtHoldComplaint', response.hold);
                }, function(error){
                    //handle error  
                });

                /*
                Ember.$.ajax({
                    url: 'api/users_api/myMgmtComplaint/count/?format=json',
                    type: 'GET',
                    success: function(data, textStatus, xhr) {
                        controller.set('mgmtNewComplaint', data.open);
                        controller.set('mgmtPendingComplaint', data.pending);
                        controller.set('mgmtHoldComplaint', data.hold);
                    },
                    error: function(xhr, textStatus, errorThrown) {  }
                });*/
                
                self.reloadTrakingComplaint(controller);
            }, 10000);
        }
    },
    stopCollecting: function(){
        this.controllerFor("complaintsTrackings").set('reloadTrakingComplaint', null);
    }.on('deactivate'),
    startCollecting:function(){
        //var self = this;
        //self.store.find('chatNotes').then(function(rec){
        //  self.controllerFor("application").set('chatNotification', self.store.all('chatNotes').get('content'));
      	//});
    }.on('activate'),
    actions: {
		trackingComplaintDateWiseDownload:function(reports){
			console.log(reports.date);
			var ft  = reports.date.split(' - ');
			var ftD = Ember.$('#idTrackingReport').val();
			var ft  = ftD.split('-');
			var inputs =[{'name':'from_form', 'value': 'tracking'}
						, {'name':'from_date', 'value': ft[0]}
						, {'name':'to_date', 'value': ft[1]}
						];

			console.log(inputs);	//return;
			this.get('common').hiddenForm('consumerAgentDateImport', inputs);
		},
    	editview: function(uid) {
            console.log(uid);
			var _self = this;
			 _self.get('common').showLoader();
			
			var _controller = _self.controllerFor('complaintsTrackings');
			// this.store.find('monitoringCategories',{'monitoring_for_id':_self.get('campaign').mapBy('id')}).then(function(drivers){
			// 	// var valing = _self.get('campaign').filter(function(d) {
			// 	// 	return d.id == drivers.get('monitoring_for_id');
			// 	// });
			// 	console.log(_self.get('campaign').get('firstObject').category_level);
			// //if(value == 1){
			// 	var level =	_self.get('campaign').get('firstObject').category_level;
			// 	if(level == 4){
			// 		var category = drivers.filter(function(driver) {
			// 			return driver.get('level') == 1;
			// 	    });
			// 	    var sub_category = drivers.filter(function(driver) {
			// 			return driver.get('level') == 2;
			// 	    });
			// 	    var reason = drivers.filter(function(driver) {
			// 			return driver.get('level') == 3;
			// 	    });
			// 	    var sub_reason = drivers.filter(function(driver) {
			// 			return driver.get('level') == 4;
			// 	    });
			// 	}
			// 	else{
			// 		//var category = drivers.filter(function(driver) {	return driver.get('level') == 1; });
			// 	    //var sub_category = drivers.filter(function(driver) {	return driver.get('level') == 1; });
			// 		var reason = drivers.filter(function(driver) {
			// 			return driver.get('level') == 1;
			// 	    });
			// 	    var sub_reason = drivers.filter(function(driver) {
			// 			return driver.get('level') == 2;
			// 	    });
			// 	    var category = reason;
			// 	    var sub_category = reason;
			// 	}
			// 	_controller.set('categories', category);
			// 	_controller.set('sub_categories', sub_category);
			// 	_controller.set('reasons', reason);
			// 	_controller.set('sub_reasons', sub_reason);
			
			//     _controller.set('drivers',drivers);
				

			

				

			// });
			// console.log('no error found');
	
				_controller.set('complaint.id', uid.id);
				_controller.set('complaint.msisdn', uid.get('msisdn'));
				_controller.set('complaint.department_id', uid.get('department_id.id'));
				_controller.set('complaint.sub_department_id',uid.get('sub_department_id.id'));
				_controller.set('complaint.monitoring_for_id',uid.get('monitoring_for_id.id'));
				_controller.set('complaint.domain_id',uid.get('domain_id.id'));
				_controller.set('complaint.booking_id',uid.get('booking_id'));
				_controller.set('complaint.ticket_id',uid.get('ticket_id'));
				_controller.set('complaint.remarks',uid.get('remarks'));
				_controller.set('complaint.category_id', 0);
				_controller.set('complaint.sub_category_id', 0);
				_controller.set('complaint.reason_id',0);
				_controller.set('complaint.sub_reason_id',0);
			
				

				setTimeout(function(){
					// _controller.set('complaint.sub_department_id', uid.get('sub_department_id.id'));
					// _controller.set('complaint.category_id', uid.get('category_id.id'));
					// _controller.set('complaint.sub_category_id', uid.get('sub_category_id.id'));
					// _controller.set('complaint.reason_id', uid.get('reason_id.id'));
					 _controller.set('complaint.sub_reason_id', uid.get('sub_reason_id.id'));
					Em.$('#sub_reason_id').val(uid.get('sub_reason_id.id')).trigger('change');
					console.log('set time out trigered');
				}, 1000);	
			
			


			

            
            var _caller = _controller.set('caller',{name:uid.get('caller_id.name'),
                                                    mobile:uid.get('caller_id.mobile'),
                                                    email:uid.get('caller_id.email')});

            var _complaintLog = _controller.set('complaintLog',{
                    complaint_id:uid.id,
                    caller_id:uid.get('caller_id.id'),
                    id:0,
                    state_id:1,
                    remarks:''
                });

            _controller.set('editMode', true);
            
            var _store = _self.store;

            _store.find('complaintLogs', { cid: uid.get('id') }).then(function(logComplaint) {
                _controller.set('complaintLogs', logComplaint);
            });
			
			setTimeout(function(){
				
				 _self.get('common').hideLoader();
			}, 1000);	
        //    return false;
            
        },
        edit: function(uid) {

            this.send('editview', uid);
          //  Ember.$('#commentArea').show();
            Ember.$('#btnComplaintEditSave').prop("disabled", false);
            return;
        },
        view: function(uid) {
            //console.log(uid.get('type')); //return;
            this.send('editview', uid);
          //  Ember.$('#commentArea').hide();
            Ember.$('#btnComplaintEditSave').prop("disabled", true);
            //Ember.$('#btnComplaintEditReset').prop("disabled", true);
            return;
        },
        editview2: function(uid) {
            console.log(uid);

            var _self = this;
            var _store = _self.store;
            _self.get('common').showLoader();
			var _controller = _self.controllerFor('complaintsTrackings');
			
			_controller.set('complaint.id', uid.id);
			_controller.set('complaint.msisdn', uid.get('msisdn'));
			_controller.set('complaint.department_id', uid.get('department_id.id'));
			_controller.set('complaint.sub_department_id',uid.get('sub_department_id.id'));
			_controller.set('complaint.monitoring_for_id',uid.get('monitoring_for_id.id'));
			_controller.set('complaint.domain_id',uid.get('domain_id.id'));
			_controller.set('complaint.booking_id',uid.get('booking_id'));
			_controller.set('complaint.ticket_id',uid.get('ticket_id'));
			_controller.set('complaint.remarks',uid.get('remarks'));
			
			// _controller.set('complaint.id', uid.id);
			// _controller.set('complaint.id', uid.id);
			// _controller.set('complaint.id', uid.id);

            // _controller.set('complaint', {id:uid.id,
            //                             msisdn:uid.get('msisdn'),
            //                             department_id:uid.get('department_id.id'),
			// 							sub_department_id:uid.get('sub_department_id.id'),
			// 							monitoring_for_id:uid.get('monitoring_for_id.id'),
            //                             domain_id:uid.get('domain_id.id'),
            //                            // category_id:uid.get('category_id.id'),
            //                            // sub_category_id:uid.get('sub_category_id.id'),
            //                            // reason_id:uid.get('reason_id.id'),
            //                             sub_reason_id:uid.get('sub_reason_id.id'),
            //                             booking_id:uid.get('booking_id'),
            //                             ticket_id:uid.get('ticket_id'),
            //                             remarks:uid.get('remarks')});

            Em.$('#dispositionIdComplaint').val(uid.get('sub_disposition_id.id')).trigger('change');
            /*console.log(uid.get('caller_id'));
            console.log(uid.get('caller_id').get('content'));
            console.log(uid.get('caller_id').get('content')._data);
            console.log(uid.get('caller_id').get('name'));
            console.log(uid.get('caller_id.name'));
            console.log(uid.caller_id);*/
           /* _store.find('callers',{id: uid.get('caller_id')}).then(function(caller){
                caller.forEach(function(item, index, enumerable) {
                    console.log(item.get('id'));
                    console.log(item.id);
                    console.log(uid.get('caller_id'));
                    if(item.id == uid.get('caller_id')){
                           var _caller = _controller.set('caller',{name:item.get('name'),
                                                    mobile:item.get('mobile'),
                                                    email:item.get('email')});
                    }
                   
                });


            });*/
           console.log(uid.get('caller_id.content.data[0]'));
           console.log(uid.get('caller_id').get('content.data').name);
           console.log(uid.get('caller_id.content.data.name'));
           console.log(uid.get('caller_id.content.data')[0]);
          //  var _caller = _controller.set('caller', uid.get('caller_id.content.data'));

            /* uid.get('caller_id.content.data').forEach(function(item, index, enumerable) {
                           var _caller = _controller.set('caller',{name:item.get('name'),
                                                    mobile:item.get('mobile'),
                                                    email:item.get('email')});
                    
            });*/
            var _caller = _controller.set('caller',{name:uid.get('caller_id.name'),
                                                    mobile:uid.get('caller_id.mobile'),
                                                    email:uid.get('caller_id.email')});

            var _complaintLog = _controller.set('complaintLog',{
                    complaint_id:uid.id,
                    caller_id:uid.get('caller_id.id'),
                    id:0,
                    state_id:1,
                    remarks:''
                });

            _controller.set('editMode', true);
            
            

            _store.find('complaintLogs', { cid: uid.get('id') }).then(function(logComplaint) {
                _controller.set('complaintLogs', logComplaint);
            });
             _self.get('common').hideLoader();
        //    return false;
            
        },
        edit2: function(uid) {

            this.send('editview2', uid);
          //  Ember.$('#commentArea').show();
            Ember.$('#btnComplaintEditSave').prop("disabled", false);
            return;
        },
        view2: function(uid) {
            //console.log(uid.get('type')); //return;
            this.send('editview2', uid);
          //  Ember.$('#commentArea').hide();
            Ember.$('#btnComplaintEditSave').prop("disabled", true);
            //Ember.$('#btnComplaintEditReset').prop("disabled", true);
            return;
        },
        findType:function(complt){
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
            _self.get('common').showLoader();
            var store = _self.store;
            store.find('complaints', complt).then(function(complaintJson){
                _controller.set('model', complaintJson);  
                // console.log( store.metadataFor("complaints").total);
                //_controller.set('complaintCount', complaintJson.get("content.meta"));
                _controller.set('complaintCount', store.metadataFor("complaints").total);
                 _self.get('common').hideLoader();
            });
            
            //console.log(userJson);
           /* var baseUrl = _self.get('baseUrl');
           // _self.get('visitedPage').push(1);

            Ember.$.ajax({
                url: 'api/users_api/complaints/count/' + _complaint.msisdn + '?format=json',
                type: 'GET',
                data:complt,
                success: function(data, textStatus, xhr) {
                    _controller.set('complaintCount', data.complaintsCount);
                    Ember.$.isLoading("hide");
                },
                error: function(xhr, textStatus, errorThrown) {
                    _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
                    Ember.$.isLoading("hide");
                }
            });*/
        },
        findNumber: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
             //$('#catComplaint').val();
            var a = _complaint.id.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Complaint Number !</b>');
                return false;
            } else if (_complaint.id == '') {
                _self.get('common').showNotification('error', '<b>Enter Complaint Number !</b>');
                return false;
            }
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _complaint.id, field:'id', start: 1, end: 20, from_form:'tracking' };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        findTicket: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
             //$('#catComplaint').val();
            var a = _complaint.ticket_id.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Ticket Id !</b>');
                return false;
            } else if (_complaint.ticket_id == '') {
                _self.get('common').showNotification('error', '<b>Enter Ticket Id !</b>');
                return false;
            }
            /*Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _complaint.ticket_id, field:'ticket_id', start: 1, end: 20, from_form:'tracking' };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        findBooking: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
             //$('#catComplaint').val();
            var a = _complaint.booking_id.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Complaint Number !</b>');
                return false;
            } else if (_complaint.booking_id == '') {
                _self.get('common').showNotification('error', '<b>Enter Complaint Number !</b>');
                return false;
            }
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _complaint.booking_id, field:'booking_id', start: 1, end: 20, from_form:'tracking' };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        findMsisdn: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
             //$('#catComplaint').val();
            var a = _complaint.msisdn.trim().toString().length;
            if (a < 11) {
                _self.get('common').showNotification('error', '<b>Enter 10 Digit Phone Number !</b>');
                return false;
            } else if (_complaint.msisdn == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }
            complt =  { rtrn: 'all', phone: _complaint.msisdn, field:'msisdn', start: 1, end: 20, from_form:'tracking' };
            this.send('findType', complt);
           // Ember.$('#mobileComplaint').val(Ember.$('#msisdnComplaint').val().trim());
            //return false;
            /*if(self.get('cmbEmptyCondition') == 0){
                Ember.$('#catComplaint').val('');
            }
            self.set('cmbEmptyCondition', 0);*/
           
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });
            var store = _self.store;
            store.find('complaints', { rtrn: 'all', phone: _complaint.msisdn, start: 1, end: 20 }).then(function(complaintJson){
                _controller.set('model', complaintJson);
            });
            
            //console.log(userJson);
            var baseUrl = _self.get('baseUrl');
           // _self.get('visitedPage').push(1);

            Ember.$.ajax({
                url: 'api/users_api/complaints/count/' + _complaint.msisdn + '?format=json',
                type: 'GET',
                success: function(data, textStatus, xhr) {
                    _controller.set('complaintCount', data.complaintsCount);
                    Ember.$.isLoading("hide");
                },
                error: function(xhr, textStatus, errorThrown) {
                    _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
                    Ember.$.isLoading("hide");
                }
            });*/

            /*var npsUploadJson = store.find('npsUploads',{rtrn:'all', phone:phoneNo, start:1, end:6});
            self.controllerFor("Complaints").set('npsUploads', npsUploadJson);*/
            return;
        },
        findEmail: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
             //$('#catComplaint').val();
            var a = _caller.email.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Complaint Number !</b>');
                return false;
            } else if (_caller.email == '') {
                _self.get('common').showNotification('error', '<b>Enter Complaint Number !</b>');
                return false;
            }
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _caller.email, field:'email', start: 1, end: 20, from_form:'tracking' };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        myViewComplaint:function(){
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
             _self.get('common').showLoader();
            Ember.$.ajax({
                url: 'api/users_api/mycomplaint/count/?format=json',
                type: 'GET',
                success: function(data, textStatus, xhr) {
                    console.log(data);
                    _controller.set('pendingComplaintCount', data.pending);
                    _controller.set('viewComplaintCount', data.viewed);
                  //  _controller.set('complaintCount', data.complaintsCount);
                    _self.get('common').hideLoader();
                },
                error: function(xhr, textStatus, errorThrown) {
                    _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
                     _self.get('common').hideLoader();
                }
            });
        },
        myPengingComplaint:function(){

        },
        myReloadComplaint:function(){

        },
        reset: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.set('complaint', {id:0,
                                        msisdn:'',
                                        department_id:'',
										sub_department_id:'',
										monitoring_for_id:'',
                                        domain_id:'',
                                        category_id:'',
                                        sub_category_id:'',
                                        reason_id:'',
                                        sub_reason_id:'',
                                        booking_id:'',
                                        ticket_id:'',
                                        remarks:''});

            var _caller = _controller.set('caller',{name:'',
                                                    mobile:'',
                                                    email:''});

            var complaintLog = _controller.set('complaintLog', {
                                            id:0,
                                            complaint_id:0,
                                            state_id:1,
                                            remarks:'',
                                        });
            _controller.set('editMode', false);

            var _store = _self.store;
            //var logComplaint = store.find('complaintLogs',{cid:0});
            //this.controllerFor("complaintsTrackings").set('complaintLogs', logComplaint);
            _store.unloadAll('complaintLogs');

            //store.get('complaints').unloadRecord();
            _store.unloadAll('complaints');
            // var userJson = store.find('complaints',{rtrn:'all', phone:32100000000, start:1, end:20});
            // Ember.$('#commentArea').hide();
            Ember.$('#btnComplaintEditSave').prop("disabled", false);
            //Ember.$('#btnComplaintEditReset').prop("disabled", false);
            //this.controllerFor("Complaints").set('model', emp);

        },
        save: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsTrackings');
            var _complaint = _controller.get('complaint');
            var _caller = _controller.get('caller');
             //$('#catComplaint').val();
            var a = _complaint.msisdn.trim().toString().length;
            if (a < 11) {
                _self.get('common').showNotification('error', '<b>Enter 10 Digit Phone Number !</b>');
                return false;
            } else if (_complaint.msisdn == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }
           // return false;
            // Ember.$.isLoading({
            //     text: '',
            //     tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            //     //  position:   "overlay"
            // });
             _self.get('common').showLoader();
            Ember.$('#btnComplaintEditSave').prop("disabled", true);

           

         //   var id = Ember.$('#idComplaint').val();
        //    var self = this;
        //    var controller = self.controllerFor('complaintsTrackings');
            if (_complaint.id == 0) {

                if (_caller.name == 0 || _complaint.name == '') {
                    _self.get('common').showNotification('error', '<b>Enter caller name !</b>');
                    return false;
                } else if (_complaint.email == 0 || _complaint.email == '') {
                    _self.get('common').showNotification('error', '<b>Enter caller email !</b>');
                    return false;
                } else if (_complaint.mobile == 0 || _complaint.mobile == '') {
                    _self.get('common').showNotification('error', '<b>Select caller mobile !</b>');
                    return false;
                }

                if (_complaint.booking_id == 0 || _complaint.booking_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter a booking id !</b>');
                    return false;
                } else if (_complaint.ticket_id == 0 || _complaint.ticket_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter a ticket id !</b>');
                    return false;
                } else if (_complaint.department_id == 0 || _complaint.department_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a department !</b>');
                    return false;
                } else if (_complaint.sub_department_id == 0 || _complaint.sub_department_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a sub department !</b>');
                    return false;
                }else if (_complaint.domain_id == 0 || _complaint.domain_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a city !</b>');
                    return false;
                }else if (_complaint.disposition_id == 0 || _complaint.category_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a category !</b>');
                    return false;
                }else if (_complaint.sub_disposition_id == 0 || _complaint.sub_category_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a Sub Category !</b>');
                    return false;
                }else if (_complaint.reason_id == 0 || _complaint.reason_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a category !</b>');
                    return false;
                }else if (_complaint.sub_reason_id == 0 || _complaint.sub_reason_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a Sub Category !</b>');
                    return false;
                }else if (_complaint.remarks == 0 || _complaint.remarks == '') {
                    _self.get('common').showNotification('error', '<b>Select a department !</b>');
                    return false;
                }
                var _complaintLog={
                    state_id:1,
                    remarks:_complaint.remarks
                };
                Ember.$.ajax({
                    url: 'api/users_api/sagComplaints/?format=json',
                    type: 'POST',
                    data: {complaint:_complaint,caller:_caller, complaintLog:_complaintLog},
                    success: function(data, textStatus, xhr) {
                        console.log(data);
                        //Ember.$.isLoading("hide");
                        //();
                     //   self.send('sendSms', data);
                        Ember.$('#btnComplaintEditSave').prop("disabled", false);
                         _self.get('common').showNotification('success', '<b>Saved successfully !</b>');
                         _self.send('reset');
                        //self.send('clog');
                        _self.get('common').hideLoader();
                        //controller.set('complaintCountNew', data.complaintsCountNew);
                        //self.set('complaintCountNew', data.complaintsCountNew);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //alert('not found');
                         _self.get('common').hideLoader();
                        Ember.$('#btnComplaintEditSave').prop("disabled", false);
                    }
                });
               /* _self.store.unloadAll('complaint');
                var newComplaint = self.store.createRecord('complaint',_complaint);
                newComplaint.save().then(function(){
                    Ember.$('#idComplaint').val(0),
                    //Ember.$('#catComplaint').val('');
                    Ember.$('#descComplaint').val('');
                    controller.set('complaintTypeStatus','');
                    self.send('clog');//();
                    Ember.$('#btnComplaintEditSave').prop("disabled", false);
                    //self.send('reloadAll');
                    Ember.$.isLoading("hide");
                });*/

            } else {
                var _complaintLog = _controller.get('complaintLog');
                console.log(_complaintLog);
               // return false;
                
                var newComplaint = _self.store.createRecord('complaintLog', _complaintLog);
                newComplaint.save().then(function() {
                    
                    var logComplaint = _self.store.find('complaintLogs', { cid: _complaintLog.complaint_id });
                    _controller.set('complaintLogs', logComplaint);
                    //Ember.$('#idComplaint').val(0);
                   // Ember.$('#commComplaint').val('');
                  //  Ember.$('#btnComplaintEditSave').prop("disabled", false);
                    _self.send('reset');
                     _self.get('common').hideLoader();
                });

            }

            //this.transitionToRoute('Complaints');
        },
        selectPage: function(number) {

            var start = (number - 1) * 20;
            var end = start + 20;
            this.set('pageNumber', start);
            this.set('pageSize', end);
            if (!this.get('visitedPage').contains(number)) {
                this.get('visitedPage').push(number);
                var mod = this.store.find('complaints', { rtrn: 'all', start: this.get('pageNumber'), end: this.get('pageSize') });
                //this.controllerFor("Complaints").set('model', mod);
                //	this.controllerFor("Complaints").get('arrangedContent').push(mod);
            } else {

                //this.controllerFor("Complaints").set('model',this.get('model').slice(start, end));
                //this.controllerFor("Complaints").get('arrangedContent').slice(start, end);;
            }
            console.log(this.store.all('complaints').get('content'));
            this.controllerFor("Complaints").set('page', number);
            //this.set('page', number);
        },
        loadMoreNew: function() {
            if (this.get('numberNew') == this.get('complaintCountNew')) {
                return
            }
            var self = this;
            var controller = this.controllerFor("complaintsTrackings");
            var numb = this.get('numberNew');
            var number = numb + 1;
            this.set('numberNew', number);
            var start = (number - 1) * 20;
            var end = start + 20;
            this.set('pageNumberNew', start);
            this.set('pageSizeNew', end);

            self.store.find('openedComplaints', { rtrn: 'all', start: this.get('pageNumberNew'), end: this.get('pageSizeNew') }).then(function(rec) {
                controller.set('openedComplaints', self.store.all('openedComplaints').get('content'));
                self.get('visitedPageNew').push(number);

            });
        },
        selectPageNew: function(number) {

            var start = (number - 1) * 20;
            var end = start + 20;
            this.set('pageNumberNew', start);
            this.set('pageSizeNew', end);
            if (!this.get('visitedPageNew').contains(number)) {
                this.get('visitedPageNew').push(number);
                var mod = this.store.find('openedComplaints', { rtrn: 'all', start: this.get('pageNumberNew'), end: this.get('pageSizeNew') });
                //this.controllerFor("complaintsTrackings").set('model', mod);
                //	this.controllerFor("Complaints").get('arrangedContent').push(mod);
            } else {

                //this.controllerFor("complaintsTrackings").set('model',this.get('model').slice(start, end));
                //this.controllerFor("complaintsTrackings").get('arrangedContent').slice(start, end);;
            }
            //  console.log(this.store.all('complaints').get('content'));
            this.controllerFor("complaintsTrackings").set('pageNew', number);
            //this.set('page', number);
        },
        setPhone: function(com, to) {

            this.get('common').consoleClear();
            var store = this.store;
            Ember.$('#msisdnComplaint').val(com.phone);
            //console.log(com.phone);
            $('a[href=#complaint-Complaint]').tab('show');

            store.unloadAll('complaintLogs');
            store.unloadAll('complaints');
            this.set('cmbEmptyCondition', 1);
            //	Ember.$('#msisdnComplaint').prop("disabled", false);
            //	Ember.$('#catComplaint').prop("disabled", false);
            //	Ember.$('#descComplaint').prop("disabled", false);
            //	Ember.$('#catComplaint').val('');
            //	this.controllerFor("Complaints").set('selectedComplaintType', '');
            console.log(to);
            this.send(to, com);
            this.send('clog');


        },
        setClosePhone: function(com) {
            this.get('common').consoleClear();
            var store = this.store;
            Ember.$('#msisdnComplaint').val(com.phone);
            //console.log(com.phone);
            $('a[href=#complaint-Complaint]').tab('show');

            store.unloadAll('complaintLogs');
            store.unloadAll('complaints');
            this.set('cmbEmptyCondition', 1);
            //	Ember.$('#msisdnComplaint').prop("disabled", false);
            //	Ember.$('#catComplaint').prop("disabled", false);
            //	Ember.$('#descComplaint').prop("disabled", false);
            //	Ember.$('#catComplaint').val('');
            //	this.controllerFor("Complaints").set('selectedComplaintType', '');

            this.send('edit', com);
            this.send('clog');


        },
        viewNpsScore: function() {
            var a = Ember.$('#msisdnComplaint').val().trim().toString().length;
            var phoneNo = Ember.$('#msisdnComplaint').val().trim();
            if (a < 11 || phoneNo == '') {
                alert("Enter 10 Digit Phone Number");
                return false;
            }
            var self = this;

            Ember.$("#showPhoneNpsModel").modal("show");

            return;
            /*ft  = this.get('workcodeCurrentDate').split('-');
    		if(typeof Table !== 'undefined' && Table != null){	Table.fnClearTable(); Table.fnDestroy();  $(".DTTT_collection").remove(); }

			Table =	Ember.$('#tatTable').dataTable({ 
				"iDisplayLength": 20,
				"scrollY": 500,
				"scrollX": true,
				'bProcessing':true, 
				'bServerSide':true, 
				'sAjaxSource':'api/users_api/dailySiebelWorkCode?format=json',
				"fnServerParams": function ( aoData ) {
					aoData.push( {"name": "from_date", "value": ft[0]},{"name": "to_date", "value": ft[1]} );
			 	}
			}).fnSetFilteringDelay();
			var tt = new Ember.$.fn.dataTable.TableTools( Table,  {
					"aButtons": [ "copy", "csv", "print" ],
					"sSwfPath": "assets/plugins/datatables/DataTables/extensions/TableTools/swf/copy_csv_xls.swf",
					//sRowSelect: 'single'
			}); */

            //Ember.$( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');


            //return;
        },
        
        
        

        
        sendSms: function(data) {

            var username = '03028503318';
            var password = 'Pakistan@123'; //'123.123';
            var mask = 'Super Asia';

            console.log(data);
            var aumber = data.anumber;
            //var aumber = '03214823037';
            var comnum = data.compnum;
            var cumber = data.cnumber;
            var date = data.date;

            var msg_customer = 'Dear Customer, thank you for calling Super Asia Service Center. Your complaint no. ' + comnum + ' has been registered on (' + date + '). Concern person will contact you soon';

            var msg_mgr = 'Dear Service Manager: complaint no. ' + comnum + ' has been register on (' + date + '). Please contact the customer ASAP';

            var sms_cust = "http://119.160.92.2:7700/sendsms_url.html?Username=" + username + "&Password=" + password + "&From=" + mask + "&To=" + cumber + "&Message=" + msg_customer;

            var sms_mgr = "http://119.160.92.2:7700/sendsms_url.html?Username=" + username + "&Password=" + password + "&From=" + mask + "&To=" + aumber + "&Message=" + msg_mgr;

            Ember.$.ajax({
                url: sms_cust,
                type: 'GET',
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                success: function(data, textStatus, xhr) {
                    console.log(data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert('not found');
                }
            });
            Ember.$.ajax({
                url: sms_mgr,
                type: 'GET',
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                success: function(data, textStatus, xhr) {
                    console.log(data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert('not found');
                }
            });
            console.log(sms_cust);
            console.log(sms_mgr);

        },
        delete: function(uid) {
            var self = this;
            phoneNo = uid.get('phone');
            complaint = {
                id: uid.get('id'),
                status: 0,
            };
            //return;
            var newComplaint = this.store.createRecord('complaint', complaint);
            newComplaint.save().then(function() {
                var store = self.store;
                //store.unloadAll('complaints');
                var userJson = store.find('complaints', { rtrn: 'all', phone: phoneNo, start: 1, end: 20 });
                self.controllerFor("complaintsTrackings").set('model', userJson);
                self.send('reloadAll');
                self.get('common').hideLoader();
            });
            //  var controller = this.get('controller');
            //  this.get('controller').send('userEdit', id);
        },
        
        reloadAll: function() {
            var self = this;
            var controller = this.controllerFor("complaintsTrackings");
            var baseUrl = this.controllerFor("application").get("applicationURL");
            this.set('baseUrl', baseUrl);
            //this._super(controller, model);
            var iC = localStorage.getItem('iC');
            if (iC == '1891608228061981') {
                controller.set('isCloseable', true);
            }
            /* self.store.find('openedComplaints',{rtrn:'all', start:1, end:20}).then(function(rec){
	        	controller.set('openedComplaints', rec);
	        	self.get('visitedPageNew').push(1);
	        	self.set('numberNew',1);
	        	Ember.$.ajax({
				    url: baseUrl+'openedComplaints/count/?format=json',
				    type: 'GET',
				    success: function(data, textStatus, xhr) {
				   // 	console.log(data);
				      	controller.set('complaintCountNew', data.complaintsCountNew);
				      	self.set('complaintCountNew', data.complaintsCountNew);
				    },
				    error: function(xhr, textStatus, errorThrown) {
				        alert('not found');
				    }
			    });
			});*/

            /**/
        }

	}


});
