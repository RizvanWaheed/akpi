telenor.AccalationsRegistrationsController = Ember.ArrayController.extend(Ember.PaginationMixin, {
	pageName: 'accalationsRegistrations',
	sortProperties: ['name'],
	sortAscending: true,
	page: 1,
	perPage: 20,
	seperator: '…',
	countOut: 1,
	countIn: 1,
	editMode2: true,
	EscalatonComplaintControllerModel: '',
	pendingAccalationCount: 0,
	viewAccalationCount: 0,
	selectPage: function (number) {
		this.set('page', number);
	},
	toggleOrder: function () {
		this.toggleProperty('sortAscending');
	},
	drivers: Ember.A(),
	accalationLogs: Ember.A(),
	allDepartments: Ember.A(),
	departments: Ember.A(),
	subDepartments: Ember.A(),
	subDepartments2: Ember.A(),
	dispositions: Ember.A(),
	reasons: Ember.A(),
	sub_reasons: Ember.A(),
	categories: Ember.A(),
	sub_categories: Ember.A(),
	cities: Ember.A(),
	//subDepartments:Ember.A(),
	// false = descending
	accalationStates: [{
		id: '6',
		name: 'Pending'
	}, {
		id: '5',
		name: 'Closed'
	}],

	isCloseable: false,
	editMode: false,
	accalation: {
		id: 0,
		booking_id: '',
		ticket_id: '',
		name: '',
		mobile: '',
		email: '',
		domain_id: '',
		statement: '',
		cname: '',
		cmobile: '',
		cstatement: '',
		remarks: '',
		department_id: '',
		sub_department_id: '',
		accalationLog: {
			id: 0,
			accalation_id: 0,
			state_id: 6,
			remarks: '',
		}
	},
	accalationLog: {
		id: 0,
		accalation_id: 0,
		state_id: 6,
		remarks: '',
	},
	findByMyFilter: {
		rtrn: 'all',
		start: 1,
		end: 20,
		accalation_date: '',
		accalation_sub_department: '',
		accalation_status: ''

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
	funcAllDepartments: function () {
		//	console.log(this.get('allDepartments'));
		observerValue = this.get('accalation.department_id');
		if (typeof observerValue === 'undefined' || observerValue == '' || observerValue <= 0) {
			return false;
		}
		var self = this;
		self.get('subDepartments').clear();
		this.get('allDepartments').forEach(function (item, index, enumerable) {
			//console.log(item);
			if (item.get('parent_id') == observerValue) {
				self.get('subDepartments').pushObject(item);
			}
		});

	}.observes('accalation.department_id'),
	/*funcEmailDriverSub:function(){
        var value = this.get('accalation.category_id');
        //console.log(value);
        var valing = this.get('drivers').filter(function(driver) {
            return driver.get('parent_id.id') == value;
        });
        //console.log(valing);
        this.set('sub_categories', valing);
    }.observes('accalation.category_id'),
    funcReasonEmailDriver:function(){
        var value = this.get('accalation.sub_category_id');
        //console.log(value);
        var valing = this.get('drivers').filter(function(driver) {
            return driver.get('parent_id.id') == value;
        });
        //console.log(valing);
        this.set('reasons', valing);
    }.observes('accalation.sub_category_id'),
    funcReasonEmailDriverSub:function(){
        var value = this.get('accalation.reason_id');
        //console.log(value);
        var valing = this.get('drivers').filter(function(driver) {
            return driver.get('parent_id.id') == value;
        });
        //console.log(valing);
        this.set('sub_reasons', valing);
    }.observes('accalation.reason_id'),
*/

	/*    funcEmailDriverSub0:function(){
	        var _self = this;
	        var value = this.get('accalation.sub_category_id');
	        if(typeof value === 'undefined' || value == '' || value < 0){
	            return false;
	        }
	        //console.log(value);
	        var valing = this.get('sub_categories').filter(function(driver) {
	            return driver.get('id') == value;
	        });
	        //console.log(valing.objectAt(0));
	        valing.forEach(function(asd){//console.log(asd.get('parent_id'));
	            _self.set('accalation.category_id', asd.get('parent_id.id'));
	        });
	        
	        //console.log(valing);
	        //this.set('emailDriverSub', valing);
	    }.observes('accalation.sub_category_id'),
	    funcEmailDriverSub:function(){
	        var _self = this;
	        var value = this.get('accalation.reason_id');
	        if(typeof value === 'undefined' || value == '' || value < 0){
	            return false;
	        }
	        var monitoring_for_id = this.get('accalation.monitoring_for_id');
	       /* if(monitoring_for_id != 1){
	            _self.set('accalation.sub_category_id', value);
	        }else{* /
	        var valing = this.get('reasons').filter(function(driver) {
	            return driver.get('id') == value;
	        });
	        valing.forEach(function(asd){
	            _self.set('accalation.sub_category_id', asd.get('parent_id.id'));
	        });

	        //}
	        
	        
	    }.observes('accalation.reason_id'),
	    funcEmailDriverSub2:function(){
	        var _self = this;
	        var value = this.get('accalation.sub_reason_id');
	        if(typeof value === 'undefined' || value == '' || value < 0){
	            return false;
	        }
	        

	        var valing = this.get('sub_reasons').filter(function(driver) {
	            return driver.get('id') == value;
	        });
	        valing.forEach(function(asd){
	        _self.set('accalation.reason_id', asd.get('parent_id.id'));
	        });
	        
	        
	    }.observes('accalation.sub_reason_id'),*/




	/*funcDispositions:function(){
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
	actions: {
		reset: function () {
			var _self = this;
			var _controller = _self; //.controllerFor('accalationsRegistrations');
			var _accalation = _controller.set('accalation', {
				id: 0,
				booking_id: '',
				ticket_id: '',
				name: '',
				mobile: '',
				email: '',
				domain_id: '',
				statement: '',
				cname: '',
				cmobile: '',
				cstatement: '',
				remarks: '',
				department_id: '',
				sub_department_id: '',
				accalationLog: {
					id: 0,
					accalation_id: 0,
					state_id: 6,
					remarks: '',
				}
			});


			var accalationLog = _controller.set('accalationLog', {
				id: 0,
				accalation_id: 0,
				state_id: 6,
				remarks: '',
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
		save: function () {
			var _self = this;
			//  var _self = _self.controllerFor('accalations');
			var _accalation = _self.get('accalation');
			//  console.log(_accalation); 
			// return false;
			// var _caller = _self.get('caller');
			//$('#catAccalation').val();
			// var a = _accalation.msisdn.trim().toString().length;
			/*
			            if (a != 12 || _accalation.msisdn <= 920000000000) {
			                _self.get('common').showNotification('error', '<b>Enter 12 Digit Phone Number starts with 92XXXXXXXXXX !</b>');
			                return false;
			            } else if (_accalation.msisdn == '') {
			                _self.get('common').showNotification('error', '<b>Enter Phone Number !</b>');
			                return false;
			            }*/
			// return false;
			Ember.$('#btnAccalationEditSave').prop("disabled", true);

			//    var id = Ember.$('#idAccalation').val();
			//    var self = this;
			//    var controller = self.controllerFor('accalations');
			if (_accalation.id == 0) {

				if (_accalation.booking_id == '') {
					_self.get('common').showNotification('error', '<b>Enter Booking ID !</b>');
					return false;
				}
				if (_accalation.ticket_id == '') {
					_self.get('common').showNotification('error', '<b>Enter Ticket ID !</b>');
					return false;
				}
				_self.get('common').showLoader();
				// Ember.$.isLoading({
				// 	text: '',
				// 	tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
				// 	//  position:   "overlay"
				// });
				//	console.log('console.log');
				_self.store.unloadAll('accalation');
				//	console.log('console.log');
				var newAccalation = _self.store.createRecord('accalation', _accalation);
				//	console.log('console.log');
				newAccalation.save().then(function (resp) {
					console.log('console.log');
					//Ember.$('#idAccalation').val(0),
					//Ember.$('#catAccalation').val('');
					//Ember.$('#descAccalation').val('');
					//controller.set('accalationTypeStatus','');
					//self.send('clog');//();
					_self.get('common').showNotification('success', '<b>Escalation saved successfully!</b>');
					Ember.$('#btnAccalationEditSave').prop("disabled", false);
					_self.send('reset');
					_self.get('common').hideLoader();
				}, function () {
					_self.get('common').showNotification('success', '<b>Escalation saved successfully!</b>');
					Ember.$('#btnAccalationEditSave').prop("disabled", false);
					_self.send('reset');
					_self.get('common').hideLoader();
				}).catch(function () {
					Ember.$('#btnAccalationEditSave').prop("disabled", false);
					_self.get('common').hideLoader();
				});
				//echo "development is passion about work.";

			} else {
				//formData.append('accalation',_accalation);

				var _accalationLog = _self.get('accalationLog');
				_accalationLog.accalation_id = _accalation.id;
				if (_accalationLog.remarks == '' || _accalationLog.remarks == null) {
					_self.get('common').showNotification('error', '<b>Enter Comments !</b>');
					return false;
				}
				_self.store.unloadAll('accalationLog');
				var newAccalation = _self.store.createRecord('accalationLog', _accalationLog);
				newAccalation.save().then(function () {
					//Ember.$('#idAccalation').val(0),
					//Ember.$('#catAccalation').val('');
					//Ember.$('#descAccalation').val('');
					//controller.set('accalationTypeStatus','');
					//self.send('clog');//();
					_self.get('common').showNotification('success', '<b>Comment saved successfully!</b>');
					_self.store.find('accalationLogs', {
						cid: _accalationLog.accalation_id
					}).then(function (logAccalation) {
						_self.set('accalationLogs', logAccalation);
					});

					Ember.$('#btnAccalationEditSave').prop("disabled", false);
					/* _self.set('accalation', {
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
					     accalationLog:{
					         id:0,
					         accalation_id:0,
					         state_id:6,
					         remarks:'',
					     }
					 });*/
					//self.send('reloadAll');
					_self.send('reset');
					_self.get('common').hideLoader();
				});

				// var formData = new FormData();
				// formData.set("careemFile" , document.getElementById("careemFile").files[0]);//JSON.stringify()
				//formData.set("accalationLog", JSON.stringify(_accalationLog));

				/*Ember.$.ajax({
                    url: 'api/users_api/accalationLogs/?format=json',
                    type: 'POST',
                    data: formData, //{ accalation:_accalation, caller:_caller, accalationLog:_accalationLog, imageForm:formData },
                    mimeType:"multipart/form-data",
		            contentType: false,//'json',
                    cache : false,
    				processData: false,
                    success: function(data, textStatus, xhr) {
                        _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id }).then(function(logAccalation){
                        	_self.set('accalationLogs', logAccalation);
                        });
                    	_self.get('common').showNotification('success', '<b>Comment saved successfully!</b>');
                        _self.send('reset');
                        Ember.$.isLoading("hide");
                        _self.store.unloadAll('myaccalations');
                        Ember.$('#btnAccalationEditSave').prop("disabled", false);
                        Em.$(":file").filestyle('clear');
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //alert('not found');
                        Ember.$.isLoading("hide");
                        Ember.$('#btnAccalationEditSave').prop("disabled", false);
                    }
                });*/


				// console.log(_accalationLog);
				// return false;

				/*var newAccalation = _self.store.createRecord('accalationLog', _accalationLog);
				newAccalation.save().then(function() {
				    //Ember.$('#idAccalation').val(0);
				    //Ember.$('#commAccalation').val('');
				    //Ember.$('#btnAccalationEditSave').prop("disabled", false);
				     _self.send('reset');
				     Ember.$.isLoading("hide");
				});*/

			}

		}
	},

});
telenor.PageController = Ember.ObjectController.extend({
	currentPage: Ember.computed.alias('parentController.page'),

	active: (function () {
		return this.get('number') === this.get('currentPage');
	}).property('number', 'currentPage')
});



telenor.AccalationRegistrationController = Ember.ObjectController.extend({
	need: ['accalationsRegistrations'],
	current_id: '',
});
