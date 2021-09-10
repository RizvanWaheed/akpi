telenor.ComplaintsManagementsController = Ember.ArrayController.extend(Ember.PaginationMixin,{
	need:['applications'],
	pageName:'accalationsManagements',
	sortProperties: ['name'],
	sortAscending: true,
	page: 1,
	perPage: 20,
	seperator: '…',
	countOut:1,
	countIn:1,
  	mgmtNewComplaint:0,
  	mgmtPendingComplaint:0,
  	mgmtHoldComplaint:0,
    selectPage: function(number) {
    	this.set('page', number);
  	},
    toggleOrder: function() {
    	this.toggleProperty('sortAscending');
    },

    foundComplaints:Ember.A(),
	accalationLogs:Ember.A(),
	allDepartments:Ember.A(),
	departments:Ember.A(),
	subDepartments:Ember.A(),
	dispositions:Ember.A(),
	reasons:Ember.A(),
	categories:Ember.A(),
	cities:Ember.A(),
	//subDepartments:Ember.A(),
		 // false = descending
	isCloseable:false,
	editMode:true,
	accalationStates:Ember.A(),
	accalation:{
		id:0,
		msisdn:'',
		department_id:'',
		sub_department_id:'',
		domain_id:'',
		disposition_id:'',
		sub_disposition_id:'',
		booking_id:'',
		ticket_id:'',
		remarks:'',
		state_id:''
	},
	caller:{
		name:'',
		mobile:'',
		email:''
	},
	accalationLog:{
		id:0,
		accalation_id:0,
		caller_id:0,
		state_id:'',
		remarks:'',
		employee_id:''
	},
	findByMyFilter:{
		rtrn: 'all', start: 1, end: 20,
		accalation_date:'',
		accalation_sub_department:'',
		accalation_status:''

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
	/*funcAllDepartments:function(){
		//	console.log(this.get('allDepartments'));
		observerValue = this.get('accalation.department_id');
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

	}.observes('accalation.department_id'),
	funcDispositions:function(){
		//	console.log(this.get('allDepartments'));
		observerValue = this.get('accalation.sub_disposition_id');
		if(typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0){
			return false;	
		} 
		var self = this;
		//self.get('reasons').clear();
    	this.get('dispositions').forEach(function(item, index, enumerable) {
    		//console.log(item);
   			if(item.get('id') == observerValue){
   				self.set('accalation.disposition_id', item.get('parent_id'));
    		}
		});

	}.observes('accalation.sub_disposition_id'),*/
	/*funcDispositions:function(){
	//	console.log(this.get('allDepartments'));
		observerValue = this.get('accalation.disposition_id');
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

	}.observes('accalation.disposition_id'),*/

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
          //  var _self = _self.controllerFor('accalations');
            var _accalation = _self.get('accalation');
            var _caller = _self.get('caller');
             //$('#catComplaint').val();
            var a = _accalation.msisdn.trim().toString().length;

            if (a < 11) {
                _self.get('common').showNotification('error', '<b>Enter 10 Digit Phone Number !</b>');
                return false;
            } else if (_accalation.msisdn == '') {
                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
                return false;
            }
           	// return false;
            Ember.$('#btnComplaintEditSave').prop("disabled", true);

	       
        	//formData.append('accalation',_accalation);
			
            var _accalationLog = _self.get('accalationLog');
            if(_accalationLog.remarks == '' || _accalationLog.remarks == null){
            	  _self.get('common').showNotification('error', '<b>Enter Comments !</b>');
            	return false;
            }
            var formData = new FormData();
            formData.set("careemFile" , document.getElementById("careemFile").files[0]);//JSON.stringify()
			formData.set("accalationLog", JSON.stringify(_accalationLog));
			_self.get('common').ajaxppRequest('POST', 'api/users_api/accalationLogs?format=json', formData, 'Yes', 'form').then(function (response) {   //newRequest is method of our adapter
			    _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id }).then(function(logComplaint){
                	_self.set('accalationLogs', logComplaint);
                });
            	_self.get('common').showNotification('success', '<b> Comment saved successfully! </b>');
                _self.send('reset');
                Ember.$('#btnComplaintEditSave').prop("disabled", false);
                Em.$(":file").filestyle('clear');
			}, function(error){ //handle error  
				Ember.$('#btnComplaintEditSave').prop("disabled", false);
			});

            /*Ember.$.ajax({
                url: 'api/users_api/accalationLogs/?format=json',
                type: 'POST',
                data: formData, //{ accalation:_accalation, caller:_caller, accalationLog:_accalationLog, imageForm:formData },
                mimeType:"multipart/form-data",
	            contentType: false,//'json',
                cache : false,
				processData: false,
                success: function(data, textStatus, xhr) {
                    _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id }).then(function(logComplaint){
                    	_self.set('accalationLogs', logComplaint);
                    });
                	_self.get('common').showNotification('success', '<b> Comment saved successfully! </b>');
                    _self.send('reset');
                    Ember.$.isLoading("hide");
                    Ember.$('#btnComplaintEditSave').prop("disabled", false);
                    Em.$(":file").filestyle('clear');
                },
                error: function(xhr, textStatus, errorThrown) {
                    //alert('not found');
                    Ember.$.isLoading("hide");
                    Ember.$('#btnComplaintEditSave').prop("disabled", false);
                }
            });*/


                // console.log(_accalationLog);
                // return false;
                
                /*var newComplaint = _self.store.createRecord('accalationLog', _accalationLog);
                newComplaint.save().then(function() {
                    //Ember.$('#idComplaint').val(0);
                    //Ember.$('#commComplaint').val('');
                    //Ember.$('#btnComplaintEditSave').prop("disabled", false);
                     _self.send('reset');
                     Ember.$.isLoading("hide");
                });*/

           

		}
	},

});
telenor.PageController = Ember.ObjectController.extend({
  currentPage: Ember.computed.alias('parentController.page'),
  
  active: (function() {
    return this.get('number') === this.get('currentPage');
  }).property('number', 'currentPage')
});



telenor.accalationsManagementController = Ember.ObjectController.extend({
	need:['accalationsManagements'],
    current_id:'',
});