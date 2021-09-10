telenor.ComplaintsManagementsRoute = Ember.Route.extend(telenor.SecureRoute, {
    controllerName: 'complaintsManagements',
   
    cmbEmptyCondition: 0,
    model: function() {
        //var chatUserJson = this.store.find('chatUsers');
        return this.store.find('mycomplaints', { rtrn:'all', start: 1, end: 20 })
        //return Ember.A();
    },

    setupController: function(controller, model) {
        var self = this;
        //var baseUrl = this.controllerFor("application").get("applicationURL");
        var me = this.controllerFor("application").get("iMyMe");
        //controller.set('products', self.store.find('products'));
        self.store.find('departments', { fetch:'with_parent', parent_id:me.territory_id }).then(function(rec) {
            controller.set('allDepartments', rec);
            controller.get('departments').clear();
            rec.forEach(function(item, index, enumerable) {
               // console.log(item);
                if(parseInt(item.get('parent_id')) == 0){
                    controller.get('departments').pushObject(item);
                }else{
                    controller.get('subDepartments').pushObject(item);
                }
            });
        });
        /*self.store.find('dispositions').then(function(disposition) {
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
        self.store.unloadAll('monitoringCategories');
       // controller.get('drivers').clear();
        self.store.find('monitoringCategories',{belongs_to:'voice'}).then(function(drivers){
           // controller.set('drivers',drivers);
            drivers.forEach(function(driver) {
                //console.log(driver.get('parent_id.id'));
                if(parseInt(driver.get('parent_id.id')) == 0){
                     controller.get('categories').pushObject({id:driver.get('id'), name:driver.get('name')});
                }
                else{
                    controller.get('reasons').pushObject({id:driver.get('id'), name:driver.get('name')});
                }
            });
            
        });
        self.store.find('domains',{parent_id:1}).then(function(area) {
            controller.set('cities', area);
        });
        self.store.find('complaintStates',{parent_id:1}).then(function(area) {
            controller.set('complaintStates', area);
        });
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
		$(".tab-content #mgmtcomplaint-Area").addClass('in active');
		Em.$(".select2").select2({width:'100%'});
		
        controller.set('model', model);
        controller.set('MgmtComplaintControllerModel', 'go');
        this.reloadMgmtComplaintControllerModel(controller);
    },
    reloadMgmtComplaintControllerModel:function(controller){
        //console.log("I m in application funcation")
        var self = this;
        if(Ember.isBlank(controller.get('MgmtComplaintControllerModel'))) {
            Ember.run.cancel();
        }else{
            Em.run.later(function(){
                self.get('common').ajaxppRequest('GET', 'api/users_api/myMgmtComplaint?format=json', '', '').then(function (response) {   //newRequest is method of our adapter
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
                
                self.reloadMgmtComplaintControllerModel(controller);
            }, 10000);
        }
    },
    stopCollecting: function(){
        self = this;
        self.controllerFor("complaintsManagements").set('MgmtComplaintControllerModel', null);
    }.on('deactivate'),
    startCollecting:function(){
        //var self = this;
        //self.store.find('chatNotes').then(function(rec){
        //  self.controllerFor("application").set('chatNotification', self.store.all('chatNotes').get('content'));
      //    });
    }.on('activate'),
    actions: {
        editview: function(uid) {
            console.log(uid);
			var _self = this;
			_self.get('common').showLoader();
           
            var _controller = _self.controllerFor('complaintsManagements');
            var _complaint = _controller.set('complaint', {id:uid.id,
                                        msisdn:uid.get('msisdn'),
                                        department_id:uid.get('department_id.id'),
                                        sub_department_id:uid.get('sub_department_id.id'),
                                        domain_id:uid.get('domain_id.id'),
                                        category_id:uid.get('category_id.id'),
                                        sub_category_id:uid.get('sub_category_id.id'),
                                        reason_id:uid.get('reason_id.id'),
                                        sub_reason_id:uid.get('sub_reason_id.id'),
                                        booking_id:uid.get('booking_id'),
                                        ticket_id:uid.get('ticket_id'),
                                        remarks:uid.get('remarks'),
                                        state_id:uid.get('state_id')});

            //Em.$('#dispositionIdComplaint').val(uid.get('sub_disposition_id.id')).trigger('change');
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
            _self.get('common').hideLoader();
        //    return false;
            
        },
        edit: function(uid) {
            this.send('editview', uid);
            //  Ember.$('#commentArea').show();
            // console.log(com.phone);
            $('a[href=#mgmtcomplaint-Complain]').tab('show');
            Ember.$('#btnComplaintEditSave').prop("disabled", false);
            return;
        },
        view: function(uid) {
            //console.log(uid.get('type')); //return;
            this.send('editview', uid);
          //  Ember.$('#commentArea').hide();
          //console.log(com.phone);
            $('a[href=#mgmtcomplaint-Complain]').tab('show');
            Ember.$('#btnComplaintEditSave').prop("disabled", true);
            //Ember.$('#btnComplaintEditReset').prop("disabled", true);
            return;
        },
        clog: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsManagements');
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
           // Ember.$('#mobileComplaint').val(Ember.$('#msisdnComplaint').val().trim());
            //return false;
            /*if(self.get('cmbEmptyCondition') == 0){
                Ember.$('#catComplaint').val('');
            }
            self.set('cmbEmptyCondition', 0);*/

            _self.get('common').showLoader();
            var store = _self.store;
            /*store.find('complaints', { rtrn: 'all', phone: _complaint.msisdn, start: 1, end: 20 }).then(function(complaintJson){
                _controller.set('model', complaintJson);
            });*/
            var store = _self.store;
            store.find('complaints', { rtrn: 'all', phone: _complaint.msisdn, start: 1, end: 20 }).then(function(complaintJson){
                _controller.set('foundComplaints', complaintJson);
                // console.log( store.metadataFor("complaints").total);
                //_controller.set('complaintCount', complaintJson.get("content.meta"));
                _controller.set('complaintCount', store.metadataFor("complaints").total);
                _self.get('common').hideLoader();
            });
            
            //console.log(userJson);
            /*var baseUrl = _self.get('baseUrl');
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
        findIn:function(findByMyFilter){
            var _self = this;
            var _controller = _self.controllerFor('complaintsManagements');
            console.log(findByMyFilter);
            _self.store.unloadAll('mycomplaints');
            _self.store.find('mycomplaints', findByMyFilter).then(function(complaintJson){
                _controller.set('model', complaintJson);
            });
            // return this.store.find('mycomplaints', { rtrn:'all', start: 1, end: 20 })
        },
        reset: function() {
            var _self = this;
            var _controller = _self.controllerFor('complaintsManagements');
            var _complaint = _controller.set('complaint', {id:0,
                                        msisdn:'',
                                        department_id:'',
                                        sub_department_id:'',
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
                                            state_id:'',
                                            remarks:'',
                                        });
            //  _controller.set('editMode', false);
            var _store = _self.store;
            // var logComplaint = store.find('complaintLogs',{cid:0});
            // this.controllerFor("Complaints").set('complaintLogs', logComplaint);
            _store.unloadAll('complaintLogs');
            // store.get('complaints').unloadRecord();
            _store.unloadAll('complaints');
            // var userJson = store.find('complaints',{rtrn:'all', phone:32100000000, start:1, end:20});
            // Ember.$('#commentArea').hide();
            // Ember.$('#btnComplaintEditSave').prop("disabled", false);
            // Ember.$('#btnComplaintEditReset').prop("disabled", false);
            // this.controllerFor("Complaints").set('model', emp);

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
            var controller = this.controllerFor("Complaints");
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
                //this.controllerFor("Complaints").set('model', mod);
                //	this.controllerFor("Complaints").get('arrangedContent').push(mod);
            } else {

                //this.controllerFor("Complaints").set('model',this.get('model').slice(start, end));
                //this.controllerFor("Complaints").get('arrangedContent').slice(start, end);;
            }
            //  console.log(this.store.all('complaints').get('content'));
            this.controllerFor("Complaints").set('pageNew', number);
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
                var userJson = store.find('complaints', { rtrn: 'all', phone: phoneNo, start:1, end:20 });
                self.controllerFor("Complaints").set('model', userJson);
                self.send('reloadAll');
                self.get('common').hideLoader();
            });
            //  var controller = this.get('controller');
            //  this.get('controller').send('userEdit', id);
        },
        reloadAll: function() {
            var self = this;
            var controller = this.controllerFor("Complaints");
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

    },


});
