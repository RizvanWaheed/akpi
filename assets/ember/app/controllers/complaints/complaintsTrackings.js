telenor.ComplaintsTrackingsController = Ember.ArrayController.extend(Ember.PaginationMixin, {
	pageName: 'complaintsTrackings',
	sortProperties: ['name'],
	sortAscending: true,
	reports: {
		date: ''
	},
	page: 1,
	perPage: 20,
	seperator: '…',
	countOut: 1,
	countIn: 1,
	editMode2: true,
	campaignLevel: 0,
	pendingComplaintCount: 0,
	viewComplaintCount: 0,
	complaintStates: Ember.A(),
	reloadTrakingComplaint: '',
	monitoredBy: Ember.A(),
	subReportDepartments: Ember.A(),
	selectPage: function (number) {
		this.set('page', number);
	},
	toggleOrder: function () {
		this.toggleProperty('sortAscending');
	},
	drivers: Ember.A(),
	complaintLogs: Ember.A(),
	allDepartments: Ember.A(),
	departments: Ember.A(),
	subDepartments: Ember.A(),
	dispositions: Ember.A(),
	reasons: Ember.A(),
	sub_reasons: Ember.A(),
	categories: Ember.A(),
	sub_categories: Ember.A(),
	cities: Ember.A(),
	//subDepartments:Ember.A(),
	// false = descending
	isCloseable: false,
	editMode: false,
	complaint: {
		id: 0,
		msisdn: '',
		department_id: '',
		sub_department_id: '',
		monitoring_for_id: '',
		domain_id: '',
		category_id: '',
		sub_category_id: '',
		reason_id: '',
		sub_reason_id: '',
		booking_id: '',
		ticket_id: '',
		remarks: '',
		from_form: 'tracking'
		// caller_id:{
		// 	name:'',
		// 	mobile:'',
		// 	email:''
		// },
		// complaintLog:{
		// 	id:0,
		// 	complaint_id:0,
		// 	caller_id:0,
		// 	state_id:1,
		// 	remarks:''
		// },
	},
	caller: {
		name: '',
		mobile: '',
		email: ''
	},
	complaintLog: {
		id: 0,
		complaint_id: 0,
		caller_id: 0,
		state_id: 1,
		remarks: '',
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
	funcByQualityMonitor: function () {
		var self = this;
		var value = this.get('complaint.monitoring_for_id');
		self.set('drivers', Ember.A());
		self.get('categories').clear();
		self.get('sub_categories').clear();
		self.get('reasons').clear();
		self.get('sub_reasons').clear();

		self.store.unloadAll('monitoringCategories');
		if (typeof value === 'undefined' || value == '' || value <= 0) return false;
		var valing = this.get('campaign').filter(function (driver) {
			return driver.id == value;
		});
		console.log(valing.get('firstObject').category_level);
		//if(value == 1){
		var level = valing.get('firstObject').category_level;
		self.set('campaignLevel', level);
		//self.set('customerShow', true);
		this.store.find('monitoringCategories', {
			'monitoring_for_id': value
		}).then(function (drivers) {
			if (level == 4) {
				var category = drivers.filter(function (driver) {
					return driver.get('level') == 1;
				});
				var sub_category = drivers.filter(function (driver) {
					return driver.get('level') == 2;
				});
				var reason = drivers.filter(function (driver) {
					return driver.get('level') == 3;
				});
				var sub_reason = drivers.filter(function (driver) {
					return driver.get('level') == 4;
				});
			} else {
				//var category = drivers.filter(function(driver) {	return driver.get('level') == 1; });
				//var sub_category = drivers.filter(function(driver) {	return driver.get('level') == 1; });
				var reason = drivers.filter(function (driver) {
					return driver.get('level') == 1;
				});
				var sub_reason = drivers.filter(function (driver) {
					return driver.get('level') == 2;
				});
				var category = reason;
				var sub_category = reason;
			}
			self.set('categories', category);
			self.set('sub_categories', sub_category);
			self.set('reasons', reason);
			self.set('sub_reasons', sub_reason);

			self.set('drivers', drivers);

			// console.log('88888888888888888888888888888888888');
			// var srid = self.get('complaint.sub_reason_id');
			// console.log(self.get('complaint.sub_reason_id'));
			// self.set('complaint.sub_reason_id', 0);
			// self.get('common').consoleClear();
			// self.set('complaint.sub_reason_id', srid);
			// console.log('99999999999999999999999999999999999');

			//  visibility: hidden
			//Em.$("#complaints_tracks_enter").addClass('in active');
			//   Em.$(".select2").select2({width:'100%'});
			//	Ember.$(".select2").select2({width:'100%'});
			//	Ember.$(".tab-content #callactivity-upselling").addClass('in active');
		});
		// console.log('no error found');

	}.observes('complaint.monitoring_for_id'),
	funcAllDepartments: function () {
		//	console.log(this.get('allDepartments'));
		observerValue = this.get('complaint.department_id');
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

	}.observes('complaint.department_id'),
	funcSetCategory: function () {
		var _self = this;
		// var value = this.get('complaint.sub_category_id');
		// if(typeof value === 'undefined' || value == '' || value < 0){
		//     return false;
		// }
		value = _self.get('complaint.sub_reason_id')
		if (_self.get('campaignLevel') == 2) {
			// console.log('i m in 3');
			_self.set('complaint.category_id', value);
		} else {
			_self.funcFindCategory('complaint.sub_category_id', 'complaint.category_id')
			//_self.set('complaint.category_id', _self.findCategory(value));

		}
	}.observes('complaint.sub_category_id'),
	funcSetSubCategory: function () {
		var _self = this;
		// var value = this.get('complaint.reason_id');
		// if(typeof value === 'undefined' || value == '' || value < 0){
		//     return false;
		// }
		value = _self.get('complaint.sub_reason_id');
		if (_self.get('campaignLevel') == 2) {
			console.log('i m in 2');
			_self.set('complaint.sub_category_id', value);
		} else {
			_self.funcFindCategory('complaint.reason_id', 'complaint.sub_category_id')
			//_self.set('complaint.sub_category_id', _self.findCategory(value));
		}
	}.observes('complaint.reason_id'),
	funcSetReason: function () {
		var _self = this;
		// var value = this.get('complaint.sub_reason_id');
		// if(typeof value === 'undefined' || value == '' || value < 0){
		//     return false;
		// }
		// _self.set('complaint.reason_id', _self.findCategory(value));
		_self.funcFindCategory('complaint.sub_reason_id', 'complaint.reason_id')
	}.observes('complaint.sub_reason_id'),
	funcFindCategory: function (getField, setField) {
		var _self = this;
		var value = this.get(getField);
		// console.log(value+'...1');
		if (Em.isEmpty(value) || Em.isBlank(value) || value == 0) { //typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		// console.log(value+'...2');
		// console.log(this.get('drivers'));
		var valing = this.get('drivers').filter(function (driver) {
			//return driver.get('id') == value;
			// console.log(driver.get('id'));
			// console.log(driver.id);
			return driver.id == value;
		});
		// console.log(valing+'...3');
		// console.log(valing.get('firstObject'));
		if (typeof valing.get('firstObject') !== 'undefined' || valing.get('length') > 0) {
			_self.set(setField, valing.get('firstObject').get('parent_id.id'));
		}
		return true;
	},
	// findCategory: function(value){
	// 	var valing = this.get('drivers').filter(function(driver) {
	// 		//return driver.get('id') == value;
	//         return driver.id == value;
	// 	});
	// 	//return valing.get('firstObject').get('parent_id').get('id');
	// 	return valing.get('firstObject').get('parent_id.id');
	// },
	actions: {
		searchKeyUp: function (val, e) {
			//alert(val); alert(e.which); alert(e.key); 			/*e.which == 13 || */
			//    if((val != '' && val > 1000785) && (e.key == 'Enter')){
			// 	   this.send('findNumber');
			//    }
			//    else if(e.which == 13 || e.key == 'Enter'){
			// 	   this.send('findNumber');
			// 	   //this.set('receptionClient',val);
			//    }
		},
		searchFocusOut: function () {
			var _complaint = this.get('complaint');
			temp_id = _complaint.id;
			// var a = _complaint.id.trim().toString().length;
			// if (a < 1) {
			this.send('reset');
			this.set('complaint.id', temp_id);
			// if(this.get('appointmentClient') != '' && this.get('appointmentClient') > 1000785){

			// }
			// else{
			// 	this.send('resetAppointment');
			// }
		},
		save: function () {
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
			if (_complaint.id == '' || _complaint.id.trim().toString().length < 1) {
				_complaint.id = 0;
			}
			// return false;
			Ember.$('#btnComplaintEditSave').prop("disabled", true);

			//    var id = Ember.$('#idComplaint').val();
			//    var self = this;
			//    var controller = self.controllerFor('complaints');

			if (_complaint.id == 0) { //|| _complaint.id == '' || _complaint.id.trim().toString().length < 1

				if (_caller.name == 0 || _complaint.name == '') {
					_self.get('common').showNotification('error', '<b>Enter caller name !</b>');
					return false;
				} else if (_complaint.email == 0 || _complaint.email == '') {
					_self.get('common').showNotification('error', '<b>Enter caller email !</b>');
					return false;
				} else if (_complaint.mobile == 0 || _complaint.mobile == '') {
					_self.get('common').showNotification('error', '<b>Select caller mobile !</b>');
					return false;
				} else if (_complaint.department_id == 0 || _complaint.department_id == '') {
					_self.get('common').showNotification('error', '<b>Select a department !</b>');
					return false;
				} else if (_complaint.sub_department_id == 0 || _complaint.sub_department_id == '') {
					_self.get('common').showNotification('error', '<b>Select a sub department !</b>');
					return false;
				} else if (_complaint.domain_id == 0 || _complaint.domain_id == '') {
					_self.get('common').showNotification('error', '<b>Select a city !</b>');
					return false;
				} else if (_complaint.disposition_id == 0 || _complaint.disposition_id == '') {
					_self.get('common').showNotification('error', '<b>Select a category !</b>');
					return false;
				} else if (_complaint.sub_disposition_id == 0 || _complaint.sub_disposition_id == '') {
					_self.get('common').showNotification('error', '<b>Select a reason !</b>');
					return false;
				} else if (_complaint.remarks == 0 || _complaint.remarks == '') {
					_self.get('common').showNotification('error', '<b>Enter remarks!</b>');
					return false;
				}
				/*
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
				var _complaintLog = {
					state_id: 1,
					remarks: _complaint.remarks
				};
				var formData = new FormData(); //{complaint:_complaint, caller:_caller, complaintLog:_complaintLog});
				//formData.set("complaint", JSON.stringify(_complaint))
				formData.set("careemFile", document.getElementById("careemFile").files[0]); //JSON.stringify()
				//formData.append('complaint',_complaint);
				_complaint.from_form = 'tracking';
				formData.set("complaint", JSON.stringify(_complaint));
				formData.set("caller", JSON.stringify(_caller));
				formData.set("complaintLog", JSON.stringify(_complaintLog));
				_self.get('common').ajaxppRequest('POST', 'api/users_api/sagComplaints?format=json', formData, 'Yes', 'form').then(function (response) { //newRequest is method of our adapter
					Ember.$('#btnComplaintEditSave').prop("disabled", false);
					_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
					_self.send('reset');
					Em.$(":file").filestyle('clear');
				}, function (error) { //handle error  
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
				if (_complaintLog.remarks == '' || _complaintLog.remarks == null) {
					_self.get('common').showNotification('error', '<b>Enter Comments !</b>');
					return false;
				}
				var formData = new FormData();
				formData.set("careemFile", document.getElementById("careemFile").files[0]); //JSON.stringify()
				formData.set("complaintLog", JSON.stringify(_complaintLog));
				_self.get('common').ajaxppRequest('POST', 'api/users_api/complaintLogs?format=json', formData, 'Yes', 'form').then(function (response) { //newRequest is method of our adapter
					_self.store.find('complaintLogs', {
						cid: _complaintLog.complaint_id
					}).then(function (logComplaint) {
						_self.set('complaintLogs', logComplaint);
					});
					_self.get('common').showNotification('success', '<b>Comment saved successfully!</b>');
					_self.send('reset');
					_self.store.unloadAll('mycomplaints');
					Em.$('#btnComplaintEditSave').prop("disabled", false);
					Em.$(":file").filestyle('clear');
				}, function (error) { //handle error  
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

	active: (function () {
		return this.get('number') === this.get('currentPage');
	}).property('number', 'currentPage')
});



telenor.ComplaintTrackingController = Ember.ObjectController.extend({
	need: ['complaintsTrackings'],
	current_id: '',
});
