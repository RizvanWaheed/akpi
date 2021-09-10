telenor.AccalationsRegistrationsRoute = Ember.Route.extend(telenor.SecureRoute, {
    controllerName: 'accalationsRegistrations',
    cmbEmptyCondition: 0,
    model: function() {
        //var chatUserJson = this.store.find('chatUsers');
        return Ember.A();
    },
    setupController: function(controller, model) {
        var self = this;
       
        this._super(controller, model);

        self.store.unloadAll('departments');
        self.store.find('departments').then(function(rec) {
            controller.set('allDepartments', rec);
            controller.get('departments').clear();
            rec.forEach(function(item, index, enumerable) {
               // console.log(item);
                if(parseInt(item.get('parent_id')) == 0){
                    controller.get('departments').pushObject(item);
                }
                else{
                    controller.get('subDepartments2').pushObject(item);
                }
            });
        });
        self.store.unloadAll('domains');
        self.store.find('domains',{parent_id:1}).then(function(area) {
            controller.set('cities', area);
        });
         /*var baseUrl = this.controllerFor("application").get("applicationURL");
        this.set('baseUrl', baseUrl);*/
        /*var iC = localStorage.getItem('iC');
        if(iC == '1891608228061981'){
            controller.set('isCloseable', true);
        }*/
        //controller.set('products', self.store.find('products'));
       /* self.store.find('departments', { fetch:'with_parent', parent_id:me.territory_id }).then(function(rec) {
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
        });*/
        /*
         */
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
       
        /*self.store.unloadAll('monitoringCategories');
        controller.get('drivers').clear();
        self.store.find('monitoringCategories',{belongs_to:'voice'}).then(function(drivers){
           /* controller.set('drivers',drivers);
            drivers.forEach(function(driver) {
                //console.log(driver.get('parent_id.id'));
                if(parseInt(driver.get('parent_id.id')) == 0){
                    controller.get('categories').pushObject({id:driver.get('id'), name:driver.get('name')});
                }
            });* /
            var category = drivers.filter(function(driver) {
                return driver.get('level') == 1;
            });
            var sub_category = drivers.filter(function(driver) {
                return driver.get('level') == 2;
            });
            var reason = drivers.filter(function(driver) {
                return driver.get('level') == 3;
            });
            var sub_reason = drivers.filter(function(driver) {
                return driver.get('level') == 4;
            });
            controller.set('categories', category);
            controller.set('sub_categories', sub_category);
            controller.set('reasons', reason);
            controller.set('sub_reasons', sub_reason);
            //self.set('drivers',drivers);
            

            //self.set('emailDriverStyle', "display:block");
            //self.set('emailDriverSubStyle', "display:none");
            //self.set('emailDriverReasonStyle', "display:block");
            //self.set('emailDriverReasonSubStyle', "visibility:visible");

           //  visibility: hidden

            Ember.$(".select2").select2();
            
        });*/
        /* self.store.find('openedAccalations',{rtrn:'all', start:1, end:20}).then(function(rec){
        	controller.set('openedAccalations', rec);
        	self.get('visitedPageNew').push(1);
        	self.set('numberNew',1);
        	Ember.$.ajax({
			    url: 'api/users_api/openedAccalations/count/?format=json',
			    type: 'GET',
			    success: function(data, textStatus, xhr) {
			   // 	console.log(data);
			      	controller.set('accalationCountNew', data.accalationsCountNew);
			      	self.set('accalationCountNew', data.accalationsCountNew);
			    },
			    error: function(xhr, textStatus, errorThrown) {
			        alert('not found');
			    }
		    });
		});
		*/
		$(".tab-content #accalation-enter").addClass('in active');
		Em.$(".select2").select2({width:'100%'});
		
        controller.set('model', model);
        controller.set('EscalatonComplaintControllerModel', 'go');
        this.reloadEscalatonComplaintControllerModel(controller);
    },
    reloadEscalatonComplaintControllerModel:function(controller){
        //console.log("I m in application funcation")
        var self = this;
        if(Ember.isBlank(controller.get('EscalatonComplaintControllerModel'))) {
            Ember.run.cancel();
        }else{
            Em.run.later(function(){
                 self.get('common').ajaxppRequest('GET', 'api/users_api/myMgmtComplaint/count?format=json', '', '').then(function (response) {   //newRequest is method of our adapter
                    controller.set('mgmtNewComplaint', response.open);
                    controller.set('mgmtPendingComplaint', response.pending);
                    controller.set('mgmtHoldComplaint', response.hold);    
                }, function(error){ //handle error
                    //_self.get('common').showNotification('error', '<b>Questions not found reload the page!</b>');
                });
                self.reloadEscalatonComplaintControllerModel(controller);
            }, 10000);
        }
    },
    actions: {
        downoadIn:function(findByMyFilter){
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            //console.log(findByMyFilter);
            var inputs =[ {'name': 'rtrn',  'value': 'download' }
                        , {'name': 'accalation_date',    'value': findByMyFilter.accalation_date }
                        , {'name': 'accalation_status',    'value': findByMyFilter.accalation_status }
                        , {'name': 'accalation_sub_department',    'value': findByMyFilter.accalation_sub_department }
                        ];

            //console.log(inputs);  
            this.get('common').hiddenForm('accalations', inputs);
           /*  ($('<form/>', {
                    'id':       'tmpCsvForm',
                    'action':   "api/users_api/accalations/",
                    'method':   'get',
                    'target': '_blank'
                }).append($('<input />', { 'type': 'hidden', 'name': 'rtrn',  'value': 'download' })
                ).append($('<input />', {  'type': 'hidden', 'name': 'accalation_date',    'value': findByMyFilter.accalation_date })    
                ).append($('<input />', {  'type': 'hidden', 'name': 'accalation_status',    'value': findByMyFilter.accalation_status })    
                ).append($('<input />', {  'type': 'hidden', 'name': 'accalation_sub_department',    'value': findByMyFilter.accalation_sub_department })       
                )).appendTo('body');
                $('form#tmpCsvForm').submit().remove();
            return ;*/
        },
        findIn:function(findByMyFilter){
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            console.log(findByMyFilter);
            _self.store.unloadAll('accalations');
            _self.store.find('accalations', findByMyFilter).then(function(accalationJson){
                _controller.set('model', accalationJson);
            });
            // return this.store.find('myaccalations', { rtrn:'all', start: 1, end: 20 })
        },
        editview: function(uid) {
            console.log(uid);
			var _self = this;
			_self.get('common').showLoader();
            // Em.$.isLoading({
            //     text: '',
            //     tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            //     //  position:   "overlay"
            // });
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.set('accalation', {id:uid.id,
                                        booking_id:uid.get('booking_id'),
                                        ticket_id:uid.get('ticket_id'),
                                        name:uid.get('name'),
                                        domain_id:uid.get('domain_id.id'),
                                        department_id:uid.get('department_id.id'),
                                        sub_department_id:uid.get('sub_department_id.id'),
                                        mobile:uid.get('mobile'),
                                        email:uid.get('email'),
                                        statement:uid.get('statement'),
                                        cname:uid.get('cname'),
                                        cmobile:uid.get('cmobile'),
                                        cstatement:uid.get('cstatement'),
                                        remarks:uid.get('remarks')});

          /*  Em.$('#dispositionIdAccalation').val(uid.get('sub_disposition_id.id')).trigger('change');
            var _caller = _controller.set('caller',{name:uid.get('caller_id.name'),
                                                    mobile:uid.get('caller_id.mobile'),
                                                    email:uid.get('caller_id.email')});*/

            var _accalationLog = _controller.set('accalationLog',{
                   accalation_id:uid.id,
                    id:0,
                    state_id:6,
                    remarks:''
                });

            _controller.set('editMode', true);
            
            var _store = _self.store;

            _store.find('accalationLogs', { cid: uid.get('id') }).then(function(logAccalation) {
                _controller.set('accalationLogs', logAccalation);
			});
			_self.get('common').hideLoader();
            // Ember.$.isLoading("hide");
        //    return false;
            
        },
        edit: function(uid) {

            this.send('editview', uid);
          //  Ember.$('#commentArea').show();
            Ember.$('#btnAccalationEditSave').prop("disabled", false);
            return;
        },
        view: function(uid) {
            //console.log(uid.get('type')); //return;
            this.send('editview', uid);
          //  Ember.$('#commentArea').hide();
            Ember.$('#btnAccalationEditSave').prop("disabled", true);
            //Ember.$('#btnAccalationEditReset').prop("disabled", true);
            return;
        },
        editview2: function(uid) {
            console.log(uid);

            var _self = this;
            var _store = _self.store;
            // Em.$.isLoading({
            //     text: '',
            //     tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            //     //  position:   "overlay"
			// });
			_self.get('common').showLoader();
            var _controller = _self.controllerFor('accalationsRegistrations');
            _controller.set('accalation', {id:uid.id,
                                        booking_id:uid.get('booking_id'),
                                        ticket_id:uid.get('ticket_id'),
                                        name:uid.get('name'),
                                        domain_id:uid.get('domain_id.id'),
                                        department_id:uid.get('department_id.id'),
                                        sub_department_id:uid.get('sub_department_id.id'),
                                        mobile:uid.get('mobile'),
                                        email:uid.get('email'),
                                        statement:uid.get('statement'),
                                        cname:uid.get('cname'),
                                        cmobile:uid.get('cmobile'),
                                        cstatement:uid.get('cstatement'),
                                        remarks:uid.get('remarks')});

           // Em.$('#dispositionIdAccalation').val(uid.get('sub_disposition_id.id')).trigger('change');
             
                       
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
        /*   console.log(uid.get('caller_id.content.data[0]'));
           console.log(uid.get('caller_id').get('content.data').name);
           console.log(uid.get('caller_id.content.data.name'));
           console.log(uid.get('caller_id.content.data')[0]);*/
          //  var _caller = _controller.set('caller', uid.get('caller_id.content.data'));

            /* uid.get('caller_id.content.data').forEach(function(item, index, enumerable) {
                           var _caller = _controller.set('caller',{name:item.get('name'),
                                                    mobile:item.get('mobile'),
                                                    email:item.get('email')});
                    
            });
            var _caller = _controller.set('caller',{name:uid.get('caller_id.name'),
                                                    mobile:uid.get('caller_id.mobile'),
                                                    email:uid.get('caller_id.email')});*/

            var _accalationLog = _controller.set('accalationLog',{
                    accalation_id:uid.id,
                    id:0,
                    state_id:6,
                    remarks:''
                });

            _controller.set('editMode', true);
            
            

            _store.find('accalationLogs', { cid: uid.get('id') }).then(function(logAccalation) {
                _controller.set('accalationLogs', logAccalation);
			});
			_self.get('common').hideLoader();
            // Ember.$.isLoading("hide");
        //    return false;
            
        },
        edit2: function(uid) {

            this.send('editview2', uid);
          //  Ember.$('#commentArea').show();
            Ember.$('#btnAccalationEditSave').prop("disabled", false);
            return;
        },
        view2: function(uid) {
            //console.log(uid.get('type')); //return;
            this.send('editview2', uid);
          //  Ember.$('#commentArea').hide();
            Ember.$('#btnAccalationEditSave').prop("disabled", true);
            //Ember.$('#btnAccalationEditReset').prop("disabled", true);
            return;
        },
        findType:function(complt){
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
			//var _caller = _controller.get('caller');
			_self.get('common').showLoader();
            // Ember.$.isLoading({
            //     text: '',
            //     tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            //     //  position:   "overlay"
            // });
            var store = _self.store;
            store.find('accalations', complt).then(function(accalationJson){
                _controller.set('model', accalationJson);
                _controller.set('accalationCount', store.metadataFor("accalations").total);
                _self.get('common').hideLoader();
            },function(err){
                 _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
                _self.get('common').hideLoader();
            });
            
            //console.log(userJson);
           /* var baseUrl = _self.get('baseUrl');
           // _self.get('visitedPage').push(1);

            Ember.$.ajax({
                url: 'api/users_api/accalations/count?format=json',
                type: 'GET',
                data:complt,
                success: function(data, textStatus, xhr) {
                    _controller.set('accalationCount', data.accalationsCount);
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
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
            var _caller = _controller.get('caller');
             //$('#catAccalation').val();
            var a = _accalation.id.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Accalation Number !</b>');
                return false;
            } else if (_accalation.id == '') {
                _self.get('common').showNotification('error', '<b>Enter Accalation Number !</b>');
                return false;
            }
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _accalation.id, field:'id', start: 1, end: 20 };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        findTicket: function() {
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
            var _caller = _controller.get('caller');
             //$('#catAccalation').val();
            var a = _accalation.ticket_id.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Ticket Id !</b>');
                return false;
            } else if (_accalation.ticket_id == '') {
                _self.get('common').showNotification('error', '<b>Enter Ticket Id !</b>');
                return false;
            }
            /*Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _accalation.ticket_id, field:'ticket_id', start: 1, end: 20 };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        findBooking: function() {
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
            var _caller = _controller.get('caller');
             //$('#catAccalation').val();
            var a = _accalation.booking_id.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Accalation Number !</b>');
                return false;
            } else if (_accalation.booking_id == '') {
                _self.get('common').showNotification('error', '<b>Enter Accalation Number !</b>');
                return false;
            }
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _accalation.booking_id, field:'booking_id', start: 1, end: 20 };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        findMsisdn: function() {
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
            //var _caller = _controller.get('caller');
             //$('#catAccalation').val();
            var a = _accalation.mobile.trim().toString().length;
            if (a < 11) {
                _self.get('common').showNotification('error', '<b>Enter 10 Digit Phone Number !</b>');
                return false;
            } else if (_accalation.mobile == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }
            complt =  { rtrn: 'single', phone: _accalation.mobile, field:'mobile', start: 1, end: 20 };
            this.send('findType', complt);
           // Ember.$('#mobileAccalation').val(Ember.$('#msisdnAccalation').val().trim());
            //return false;
            /*if(self.get('cmbEmptyCondition') == 0){
                Ember.$('#catAccalation').val('');
            }
            self.set('cmbEmptyCondition', 0);*/
           
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });
            var store = _self.store;
            store.find('accalations', { rtrn: 'all', phone: _accalation.msisdn, start: 1, end: 20 }).then(function(accalationJson){
                _controller.set('model', accalationJson);
            });
            
            //console.log(userJson);
            var baseUrl = _self.get('baseUrl');
           // _self.get('visitedPage').push(1);

            Ember.$.ajax({
                url: 'api/users_api/accalations/count/' + _accalation.msisdn + '?format=json',
                type: 'GET',
                success: function(data, textStatus, xhr) {
                    _controller.set('accalationCount', data.accalationsCount);
                    Ember.$.isLoading("hide");
                },
                error: function(xhr, textStatus, errorThrown) {
                    _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
                    Ember.$.isLoading("hide");
                }
            });*/

            /*var npsUploadJson = store.find('npsUploads',{rtrn:'all', phone:phoneNo, start:1, end:6});
            self.controllerFor("Accalations").set('npsUploads', npsUploadJson);*/
            return;
        },
        findEmail: function() {
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
           // var _caller = _controller.get('caller');
             //$('#catAccalation').val();
            var a = _accalation.email.trim().toString().length;
            if (a < 1) {
                _self.get('common').showNotification('error', '<b>Enter Accalation Number !</b>');
                return false;
            } else if (_accalation.email == '') {
                _self.get('common').showNotification('error', '<b>Enter Accalation Number !</b>');
                return false;
            }
           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            complt =  { rtrn: 'single', phone: _accalation.email, field:'email', start: 1, end: 20 };
            this.send('findType', complt);
           // var store = _self.store;
           
        },
        myViewAccalation:function(){
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            _self.get('common').ajaxppRequest('GET', 'api/users_api/myaccalation/count?format=json', '', 'Yes').then(function (response) {   //newRequest is method of our adapter
                _controller.set('pendingAccalationCount', response.pending);
                _controller.set('viewAccalationCount', response.viewed);
            }, function(error){
                 _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
            });

           /* Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });
            Ember.$.ajax({
                url: 'api/users_api/myaccalation/count/?format=json',
                type: 'GET',
                success: function(data, textStatus, xhr) {
                    console.log(data);
                    _controller.set('pendingAccalationCount', data.pending);
                    _controller.set('viewAccalationCount', data.viewed);
                  //  _controller.set('accalationCount', data.accalationsCount);
                    Ember.$.isLoading("hide");
                },
                error: function(xhr, textStatus, errorThrown) {
                    _self.get('common').showNotification('error', '<b>Phone Number Not Found!</b>');
                    Ember.$.isLoading("hide");
                }
            });*/
        },
        myPengingAccalation:function(){

        },
        myReloadAccalation:function(){

        },
        reset: function() {
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.set('accalation', {
                        id:0,
                        booking_id:'',
                        ticket_id:'',
                        name:'',
                        mobile:'',
                        email:'',
                        domain_id:'',
                        statement:'',
                        cname:'',
                        cmobile:'', 
                        cstatement:'',
                        remarks:'',
                        department_id:'',
                        sub_department_id:'',   
                        accalationLog:{
                            id:0,
                            accalation_id:0,
                            state_id:6,
                            remarks:'',
                        }
                    });

          
            var accalationLog = _controller.set('accalationLog', {
                                            id:0,
                                            accalation_id:0,
                                            state_id:6,
                                            remarks:'',
                                        });
            _controller.set('editMode', false);

            var _store = _self.store;
            //var logAccalation = store.find('accalationLogs',{cid:0});
            //this.controllerFor("accalationsRegistrations").set('accalationLogs', logAccalation);
            _store.unloadAll('accalationLogs');

            //store.get('accalations').unloadRecord();
            _store.unloadAll('accalations');
            // var userJson = store.find('accalations',{rtrn:'all', phone:32100000000, start:1, end:20});
            // Ember.$('#commentArea').hide();
            Ember.$('#btnAccalationEditSave').prop("disabled", false);
            //Ember.$('#btnAccalationEditReset').prop("disabled", false);
            //this.controllerFor("Accalations").set('model', emp);

        },
        save: function() {
            var _self = this;
            var _controller = _self.controllerFor('accalationsRegistrations');
            var _accalation = _controller.get('accalation');
            console.log(_accalation); 
            return false;
           // var _caller = _controller.get('caller');
             //$('#catAccalation').val();
            
            /* booking_id:'',
        ticket_id:'',
        name:'',
        mobile:'',
        email:'',
        domain_id:'',
        statement:'',
        cname:'',
        cmobile:'', 
        cstatement:'',
        remarks:''*/
            /*var a = _accalation.msisdn.trim().toString().length;
            if (a < 11) {
                _self.get('common').showNotification('error', '<b>Enter 10 Digit Phone Number !</b>');
                return false;
            } else if (_accalation.msisdn == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }*/
           // return false;
            /*Ember.$.isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                //  position:   "overlay"
            });*/
            
            Ember.$('#btnAccalationEditSave').prop("disabled", true);

           

         //   var id = Ember.$('#idAccalation').val();
        //    var self = this;
        //    var controller = self.controllerFor('accalationsRegistrations');
            if (_accalation.id == 0) {

                /*if (_caller.name == 0 || _accalation.name == '') {
                    _self.get('common').showNotification('error', '<b>Enter caller name !</b>');
                    return false;
                } else if (_accalation.email == 0 || _accalation.email == '') {
                    _self.get('common').showNotification('error', '<b>Enter caller email !</b>');
                    return false;
                } else if (_accalation.mobile == 0 || _accalation.mobile == '') {
                    _self.get('common').showNotification('error', '<b>Select caller mobile !</b>');
                    return false;
                }

                if (_accalation.booking_id == 0 || _accalation.booking_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter a booking id !</b>');
                    return false;
                } else if (_accalation.ticket_id == 0 || _accalation.ticket_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter a ticket id !</b>');
                    return false;
                } else if (_accalation.department_id == 0 || _accalation.department_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a department !</b>');
                    return false;
                } else if (_accalation.sub_department_id == 0 || _accalation.sub_department_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a sub department !</b>');
                    return false;
                }else if (_accalation.domain_id == 0 || _accalation.domain_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a city !</b>');
                    return false;
                }else if (_accalation.disposition_id == 0 || _accalation.category_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a category !</b>');
                    return false;
                }else if (_accalation.sub_disposition_id == 0 || _accalation.sub_category_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a Sub Category !</b>');
                    return false;
                }else if (_accalation.reason_id == 0 || _accalation.reason_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a category !</b>');
                    return false;
                }else if (_accalation.sub_reason_id == 0 || _accalation.sub_reason_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a Sub Category !</b>');
                    return false;
                }else if (_accalation.remarks == 0 || _accalation.remarks == '') {
                    _self.get('common').showNotification('error', '<b>Select a department !</b>');
                    return false;
                }*/
                if (_accalation.booking_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter Booking ID !</b>');
                    return false;
                }
                if (_accalation.ticket_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter Ticket ID !</b>');
                    return false;
                }
                var _accalationLog={
                    state_id:6,
                    remarks:_accalation.remarks
                };
                var data = {
                        accalation:_accalation
                        , accalationLog:_accalationLog
                };
                
                _self.get('common').ajaxppRequest('POST', 'api/users_api/sagAccalations?format=json', data, 'Yes').then(function (response) {   //newRequest is method of our adapter
                    Ember.$('#btnAccalationEditSave').prop("disabled", false);
                     _self.get('common').showNotification('success', '<b>Saved successfully !</b>');
                     _self.send('reset');
                }, function(error){
                    Ember.$('#btnAccalationEditSave').prop("disabled", false);
                });
                /*Ember.$.ajax({
                    url: 'api/users_api/sagAccalations/?format=json',
                    type: 'POST',
                    data: {accalation:_accalation, accalationLog:_accalationLog},
                    success: function(data, textStatus, xhr) {
                        console.log(data);
                        //Ember.$.isLoading("hide");
                        //();
                     //   self.send('sendSms', data);
                        Ember.$('#btnAccalationEditSave').prop("disabled", false);
                         _self.get('common').showNotification('success', '<b>Saved successfully !</b>');
                         _self.send('reset');
                        //self.send('clog');
                        Ember.$.isLoading("hide");
                        //controller.set('accalationCountNew', data.accalationsCountNew);
                        //self.set('accalationCountNew', data.accalationsCountNew);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //alert('not found');
                        Ember.$.isLoading("hide");
                        Ember.$('#btnAccalationEditSave').prop("disabled", false);
                    }
                });*/
               /* _self.store.unloadAll('accalation');
                var newAccalation = self.store.createRecord('accalation',_accalation);
                newAccalation.save().then(function(){
                    Ember.$('#idAccalation').val(0),
                    //Ember.$('#catAccalation').val('');
                    Ember.$('#descAccalation').val('');
                    controller.set('accalationTypeStatus','');
                    self.send('clog');//();
                    Ember.$('#btnAccalationEditSave').prop("disabled", false);
                    //self.send('reloadAll');
                    Ember.$.isLoading("hide");
                });*/

            } else {
                var _accalationLog = _controller.get('accalationLog');
                console.log(_accalationLog);
               // return false;
                
                var newAccalation = _self.store.createRecord('accalationLog', _accalationLog);
                newAccalation.save().then(function() {
                    
                    var logAccalation = _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id });
                    _controller.set('accalationLogs', logAccalation);
                    //Ember.$('#idAccalation').val(0);
                   // Ember.$('#commAccalation').val('');
                  //  Ember.$('#btnAccalationEditSave').prop("disabled", false);
					_self.send('reset');
					_self.get('common').hideLoader();
                });

            }

            //this.transitionToRoute('Accalations');
        },
        selectPage: function(number) {

            var start = (number - 1) * 20;
            var end = start + 20;
            this.set('pageNumber', start);
            this.set('pageSize', end);
            if (!this.get('visitedPage').contains(number)) {
                this.get('visitedPage').push(number);
                var mod = this.store.find('accalations', { rtrn: 'all', start: this.get('pageNumber'), end: this.get('pageSize') });
                //this.controllerFor("Accalations").set('model', mod);
                //	this.controllerFor("Accalations").get('arrangedContent').push(mod);
            } else {

                //this.controllerFor("Accalations").set('model',this.get('model').slice(start, end));
                //this.controllerFor("Accalations").get('arrangedContent').slice(start, end);;
            }
            console.log(this.store.all('accalations').get('content'));
            this.controllerFor("Accalations").set('page', number);
            //this.set('page', number);
        },
        loadMoreNew: function() {
            if (this.get('numberNew') == this.get('accalationCountNew')) {
                return
            }
            var self = this;
            var controller = this.controllerFor("accalationsRegistrations");
            var numb = this.get('numberNew');
            var number = numb + 1;
            this.set('numberNew', number);
            var start = (number - 1) * 20;
            var end = start + 20;
            this.set('pageNumberNew', start);
            this.set('pageSizeNew', end);

            self.store.find('openedAccalations', { rtrn: 'all', start: this.get('pageNumberNew'), end: this.get('pageSizeNew') }).then(function(rec) {
                controller.set('openedAccalations', self.store.all('openedAccalations').get('content'));
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
                var mod = this.store.find('openedAccalations', { rtrn: 'all', start: this.get('pageNumberNew'), end: this.get('pageSizeNew') });
                //this.controllerFor("accalationsRegistrations").set('model', mod);
                //	this.controllerFor("Accalations").get('arrangedContent').push(mod);
            } else {

                //this.controllerFor("accalationsRegistrations").set('model',this.get('model').slice(start, end));
                //this.controllerFor("accalationsRegistrations").get('arrangedContent').slice(start, end);;
            }
            //  console.log(this.store.all('accalations').get('content'));
            this.controllerFor("accalationsRegistrations").set('pageNew', number);
            //this.set('page', number);
        },
        setPhone: function(com, to) {

            this.get('common').consoleClear();
            var store = this.store;
            Ember.$('#msisdnAccalation').val(com.phone);
            //console.log(com.phone);
            $('a[href=#accalation-Accalation]').tab('show');

            store.unloadAll('accalationLogs');
            store.unloadAll('accalations');
            this.set('cmbEmptyCondition', 1);
            //	Ember.$('#msisdnAccalation').prop("disabled", false);
            //	Ember.$('#catAccalation').prop("disabled", false);
            //	Ember.$('#descAccalation').prop("disabled", false);
            //	Ember.$('#catAccalation').val('');
            //	this.controllerFor("Accalations").set('selectedAccalationType', '');
            console.log(to);
            this.send(to, com);
            this.send('clog');


        },
        setClosePhone: function(com) {
            this.get('common').consoleClear();
            var store = this.store;
            Ember.$('#msisdnAccalation').val(com.phone);
            //console.log(com.phone);
            $('a[href=#accalation-Accalation]').tab('show');

            store.unloadAll('accalationLogs');
            store.unloadAll('accalations');
            this.set('cmbEmptyCondition', 1);
            //	Ember.$('#msisdnAccalation').prop("disabled", false);
            //	Ember.$('#catAccalation').prop("disabled", false);
            //	Ember.$('#descAccalation').prop("disabled", false);
            //	Ember.$('#catAccalation').val('');
            //	this.controllerFor("Accalations").set('selectedAccalationType', '');

            this.send('edit', com);
            this.send('clog');


        },
        viewNpsScore: function() {
            var a = Ember.$('#msisdnAccalation').val().trim().toString().length;
            var phoneNo = Ember.$('#msisdnAccalation').val().trim();
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

            var msg_customer = 'Dear Customer, thank you for calling Super Asia Service Center. Your accalation no. ' + comnum + ' has been registered on (' + date + '). Concern person will contact you soon';

            var msg_mgr = 'Dear Service Manager: accalation no. ' + comnum + ' has been register on (' + date + '). Please contact the customer ASAP';

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
            accalation = {
                id: uid.get('id'),
                status: 0,
            };
            //return;
            var newAccalation = this.store.createRecord('accalation', accalation);
            newAccalation.save().then(function() {
                var store = self.store;
                //store.unloadAll('accalations');
                var userJson = store.find('accalations', { rtrn: 'all', phone: phoneNo, start: 1, end: 20 });
                self.controllerFor("accalationsRegistrations").set('model', userJson);
				self.send('reloadAll');
				self.get('common').hideLoader();
                // Ember.$.isLoading("hide");
            });
            //  var controller = this.get('controller');
            //  this.get('controller').send('userEdit', id);
        },
        
        reloadAll: function() {
            var self = this;
            var controller = this.controllerFor("accalationsRegistrations");
            var baseUrl = this.controllerFor("application").get("applicationURL");
            this.set('baseUrl', baseUrl);
            //this._super(controller, model);
            var iC = localStorage.getItem('iC');
            if (iC == '1891608228061981') {
                controller.set('isCloseable', true);
            }
            /* self.store.find('openedAccalations',{rtrn:'all', start:1, end:20}).then(function(rec){
	        	controller.set('openedAccalations', rec);
	        	self.get('visitedPageNew').push(1);
	        	self.set('numberNew',1);
	        	Ember.$.ajax({
				    url: baseUrl+'openedAccalations/count/?format=json',
				    type: 'GET',
				    success: function(data, textStatus, xhr) {
				   // 	console.log(data);
				      	controller.set('accalationCountNew', data.accalationsCountNew);
				      	self.set('accalationCountNew', data.accalationsCountNew);
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
