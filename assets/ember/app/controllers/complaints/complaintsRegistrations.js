telenor.ComplaintsRegistrationsController = Ember.ArrayController.extend(Ember.PaginationMixin,{
	pageName:'complaintsRegistrations',
	sortProperties: ['name'],
	sortAscending: true,
	page: 1,
	perPage: 20,
	seperator: '…',
	countOut:1,
	countIn:1,
    editMode2: true, 
    pendingComplaintCount:0,
    viewComplaintCount:0,
    selectPage: function(number) {
    	this.set('page', number);
  	},
    toggleOrder: function() {
    	this.toggleProperty('sortAscending');
    },
    drivers:Ember.A(),
	complaintLogs:Ember.A(),
	allDepartments:Ember.A(),
	departments:Ember.A(),
	subDepartments:Ember.A(),
	dispositions:Ember.A(),
	reasons:Ember.A(),
    sub_reasons:Ember.A(),
    categories:Ember.A(),
	sub_categories:Ember.A(),
	cities:Ember.A(),
	//subDepartments:Ember.A(),
		 // false = descending
	isCloseable:false,
	editMode:false,
	complaint:{
		id:0,
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
		remarks:'',
	},
	caller:{
		name:'',
		mobile:'',
		email:''
	},
	complaintLog:{
		id:0,
		complaint_id:0,
		caller_id:0,
		state_id:1,
		remarks:'',
	},
	/*funcAllDepartments:function(){
		var self = this;
		console.log(this.get('allDepartments'));
		observerValue = this.get('allDepartments');
		if(typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0){
			//console.log('empty');
			return false;	
		} 
		
    	/*this.set('modls', self.store.find('modals',{id:0,product_id:observerValue}));
    	this.set('problems', self.store.find('problems',{id:0,product_id:observerValue}));* /
    	

	}.observes('allDepartments'),*/
	funcAllDepartments:function(){
		//	console.log(this.get('allDepartments'));
		observerValue = this.get('complaint.department_id');
		if(typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0){
			return false;	
		} 
		var self = this;
		self.get('subDepartments').clear();
    	this.get('allDepartments').forEach(function(item, index, enumerable) {
    		//console.log(item);
   			if(item.get('parent_id') == observerValue){
   				self.get('subDepartments').pushObject(item);
    		}
		});

	}.observes('complaint.department_id'),
    /*funcEmailDriverSub:function(){
        var value = this.get('complaint.category_id');
        //console.log(value);
        var valing = this.get('drivers').filter(function(driver) {
            return driver.get('parent_id.id') == value;
        });
        //console.log(valing);
        this.set('sub_categories', valing);
    }.observes('complaint.category_id'),
    funcReasonEmailDriver:function(){
        var value = this.get('complaint.sub_category_id');
        //console.log(value);
        var valing = this.get('drivers').filter(function(driver) {
            return driver.get('parent_id.id') == value;
        });
        //console.log(valing);
        this.set('reasons', valing);
    }.observes('complaint.sub_category_id'),
    funcReasonEmailDriverSub:function(){
        var value = this.get('complaint.reason_id');
        //console.log(value);
        var valing = this.get('drivers').filter(function(driver) {
            return driver.get('parent_id.id') == value;
        });
        //console.log(valing);
        this.set('sub_reasons', valing);
    }.observes('complaint.reason_id'),
*/

    funcEmailDriverSub0:function(){
        var _self = this;
        var value = this.get('complaint.sub_category_id');
        if(typeof value === 'undefined' || value == '' || value < 0){
            return false;
        }
        //console.log(value);
        var valing = this.get('sub_categories').filter(function(driver) {
            return driver.get('id') == value;
        });
        //console.log(valing.objectAt(0));
        valing.forEach(function(asd){//console.log(asd.get('parent_id'));
            _self.set('complaint.category_id', asd.get('parent_id.id'));
        });
        
        //console.log(valing);
        //this.set('emailDriverSub', valing);
    }.observes('complaint.sub_category_id'),
    funcEmailDriverSub:function(){
        var _self = this;
        var value = this.get('complaint.reason_id');
        if(typeof value === 'undefined' || value == '' || value < 0){
            return false;
        }
        var monitoring_for_id = this.get('complaint.monitoring_for_id');
       /* if(monitoring_for_id != 1){
            _self.set('complaint.sub_category_id', value);
        }else{*/
        var valing = this.get('reasons').filter(function(driver) {
            return driver.get('id') == value;
        });
        valing.forEach(function(asd){
            _self.set('complaint.sub_category_id', asd.get('parent_id.id'));
        });

        //}
        
        
    }.observes('complaint.reason_id'),
    funcEmailDriverSub2:function(){
        var _self = this;
        var value = this.get('complaint.sub_reason_id');
        if(typeof value === 'undefined' || value == '' || value < 0){
            return false;
        }
        

        var valing = this.get('sub_reasons').filter(function(driver) {
            return driver.get('id') == value;
        });
        valing.forEach(function(asd){
        _self.set('complaint.reason_id', asd.get('parent_id.id'));
        });
        
        
    }.observes('complaint.sub_reason_id'),




	/*funcDispositions:function(){
		//	console.log(this.get('allDepartments'));
		observerValue = this.get('complaint.sub_disposition_id');
		if(typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0){
			return false;	
		} 
		var self = this;
		//self.get('reasons').clear();
    	this.get('dispositions').forEach(function(item, index, enumerable) {
    		//console.log(item);
   			if(item.get('id') == observerValue){
   				self.set('complaint.disposition_id', item.get('parent_id'));
    		}
		});

	}.observes('complaint.sub_disposition_id'),*/
	/*funcDispositions:function(){
	//	console.log(this.get('allDepartments'));
		observerValue = this.get('complaint.disposition_id');
		if(typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0){
			//console.log('empty');
			return false;	
		} 
		var self = this;
		self.get('reasons').clear();
    	this.get('dispositions').forEach(function(item, index, enumerable) {
    		//console.log(item);
   			if(item.get('parent_id') == observerValue){
   				self.get('reasons').pushObject(item);
    		}
		});

	}.observes('complaint.disposition_id'),*/

	/*funcDispositions:function(){
	//	console.log(this.get('allDepartments'));
		observerValue = this.get('dispositions');
		if(typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0){
			//console.log('empty');
			return false;	
		} 
		var self = this;
    	this.get('dispositions').forEach(function(item, index, enumerable) {
    		if(item.get('parent_id') == 0){
   				self.get('categories').pushObject(item);
    		}
		});

	}.observes('dispositions'),*/
	actions:{
		save: function(){
			var _self = this;
          //  var _self = _self.controllerFor('complaints');
            var _complaint = _self.get('complaint');
            var _caller = _self.get('caller');
             //$('#catComplaint').val();
            var a = _complaint.msisdn.trim().toString().length;

            if (a != 12 || _complaint.msisdn <= 920000000000) {
                _self.get('common').showNotification('error', '<b>Enter 12 Digit Phone Number starts with 92XXXXXXXXXX !</b>');
                return false;
            } else if (_complaint.msisdn == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }
           	// return false;
            Ember.$('#btnComplaintEditSave').prop("disabled", true);

	        //    var id = Ember.$('#idComplaint').val();
	        //    var self = this;
	        //    var controller = self.controllerFor('complaints');
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
                }else if (_complaint.department_id == 0 || _complaint.department_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a department !</b>');
                    return false;
                } else if (_complaint.sub_department_id == 0 || _complaint.sub_department_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a sub department !</b>');
                    return false;
                }else if (_complaint.domain_id == 0 || _complaint.domain_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a city !</b>');
                    return false;
                }else if (_complaint.disposition_id == 0 || _complaint.disposition_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a category !</b>');
                    return false;
                }else if (_complaint.sub_disposition_id == 0 || _complaint.sub_disposition_id == '') {
                    _self.get('common').showNotification('error', '<b>Select a reason !</b>');
                    return false;
                }else if (_complaint.remarks == 0 || _complaint.remarks == '') {
                    _self.get('common').showNotification('error', '<b>Select a department !</b>');
                    return false;
                }/*
                if (_complaint.booking_id == 0 || _complaint.booking_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter a booking id !</b>');
                    return false;
                } else if (_complaint.ticket_id == 0 || _complaint.ticket_id == '') {
                    _self.get('common').showNotification('error', '<b>Enter a ticket id !</b>');
                    return false;
                } */
               /* Ember.$.isLoading({
                    text: '',
                    tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                    //  position:   "overlay"
                });*/
                var _complaintLog={
                    state_id:1,
                    remarks:_complaint.remarks
                };
                var formData = new FormData();//{complaint:_complaint, caller:_caller, complaintLog:_complaintLog});
                //formData.set("complaint", JSON.stringify(_complaint))
                formData.set("careemFile" , document.getElementById("careemFile").files[0]);//JSON.stringify()
				//formData.append('complaint',_complaint);
				formData.set("complaint", JSON.stringify(_complaint));
				formData.set("caller", JSON.stringify(_caller));
				formData.set("complaintLog", JSON.stringify(_complaintLog));
                _self.get('common').ajaxppRequest('POST', 'api/users_api/sagComplaints?format=json', formData, 'Yes', 'form').then(function (response) {   //newRequest is method of our adapter
                    Ember.$('#btnComplaintEditSave').prop("disabled", false);
                     _self.get('common').showNotification('success', '<b>Saved successfully!</b>');
                     _self.send('reset');
                     Em.$(":file").filestyle('clear');
                }, function(error){ //handle error  
                    Ember.$('#btnComplaintEditSave').prop("disabled", false);
                });
				/*var request = Ember.$.ajax({
		            url: "api/users_api/setMeasurments",
		            type: 'POST',
		            data:  formData,
		          //  async: false,
		            mimeType:"multipart/form-data",
		            contentType: false,
		            cache: false,
		            processData:false
		        });
	        	request.then(this.success.bind(this), this.failure.bind(this));*/

                /*Ember.$.ajax({
                    url: 'api/users_api/sagComplaints/?format=json',
                    type: 'POST',
                    data: formData, //{ complaint:_complaint, caller:_caller, complaintLog:_complaintLog, imageForm:formData },
                    mimeType:"multipart/form-data",
		            contentType: false,//'json',
                    cache : false,
    				processData: false,
                    success: function(data, textStatus, xhr) {
                        // console.log(data);
                        // Ember.$.isLoading("hide");
                        // self.send('sendSms', data);
                        Ember.$('#btnComplaintEditSave').prop("disabled", false);
                         _self.get('common').showNotification('success', '<b>Saved successfully!</b>');
                         _self.send('reset');
                        //self.send('clog');
                        Ember.$.isLoading("hide");
                        Em.$(":file").filestyle('clear');
                        //controller.set('complaintCountNew', data.complaintsCountNew);
                        //self.set('complaintCountNew', data.complaintsCountNew);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //alert('not found');
                        Ember.$.isLoading("hide");
                        Ember.$('#btnComplaintEditSave').prop("disabled", false);
                    }
                });*/
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
                //echo "development is passion about work.";

            } else {
            	//formData.append('complaint',_complaint);
				
                var _complaintLog = _self.get('complaintLog');
                if(_complaintLog.remarks == '' || _complaintLog.remarks == null){
                	  _self.get('common').showNotification('error', '<b>Enter Comments !</b>');
                	return false;
                }
                var formData = new FormData();
                formData.set("careemFile" , document.getElementById("careemFile").files[0]);//JSON.stringify()
				formData.set("complaintLog", JSON.stringify(_complaintLog));
                _self.get('common').ajaxppRequest('POST', 'api/users_api/complaintLogs?format=json', formData, 'Yes', 'form').then(function (response) {   //newRequest is method of our adapter
                    _self.store.find('complaintLogs', { cid: _complaintLog.complaint_id }).then(function(logComplaint){
                         _self.set('complaintLogs', logComplaint);
                    });
                    _self.get('common').showNotification('success', '<b>Comment saved successfully!</b>');
                    _self.send('reset');
                    _self.store.unloadAll('mycomplaints');
                    Em.$('#btnComplaintEditSave').prop("disabled", false);
                    Em.$(":file").filestyle('clear');
                }, function(error){ //handle error  
                    Em.$('#btnComplaintEditSave').prop("disabled", false);
                });

                /*Ember.$.ajax({
                    url: 'api/users_api/complaintLogs/?format=json',
                    type: 'POST',
                    data: formData, //{ complaint:_complaint, caller:_caller, complaintLog:_complaintLog, imageForm:formData },
                    mimeType:"multipart/form-data",
		            contentType: false,//'json',
                    cache : false,
    				processData: false,
                    success: function(data, textStatus, xhr) {
                        _self.store.find('complaintLogs', { cid: _complaintLog.complaint_id }).then(function(logComplaint){
                        	_self.set('complaintLogs', logComplaint);
                        });
                    	_self.get('common').showNotification('success', '<b>Comment saved successfully!</b>');
                        _self.send('reset');
                        Ember.$.isLoading("hide");
                        _self.store.unloadAll('mycomplaints');
                        Ember.$('#btnComplaintEditSave').prop("disabled", false);
                        Em.$(":file").filestyle('clear');
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //alert('not found');
                        Ember.$.isLoading("hide");
                        Ember.$('#btnComplaintEditSave').prop("disabled", false);
                    }
                });*/


                // console.log(_complaintLog);
                // return false;
                
                /*var newComplaint = _self.store.createRecord('complaintLog', _complaintLog);
                newComplaint.save().then(function() {
                    //Ember.$('#idComplaint').val(0);
                    //Ember.$('#commComplaint').val('');
                    //Ember.$('#btnComplaintEditSave').prop("disabled", false);
                     _self.send('reset');
                     Ember.$.isLoading("hide");
                });*/

            }

		}
	},

});
telenor.PageController = Ember.ObjectController.extend({
  currentPage: Ember.computed.alias('parentController.page'),
  
  active: (function() {
    return this.get('number') === this.get('currentPage');
  }).property('number', 'currentPage')
});



telenor.ComplaintRegistrationController = Ember.ObjectController.extend({
	need:['complaintsRegistrations'],
    current_id:'',
});
