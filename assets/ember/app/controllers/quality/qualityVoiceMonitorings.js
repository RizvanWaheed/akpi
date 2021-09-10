telenor.QualityVoiceMonitoringsController = Ember.Controller.extend({
	pageName:'qualityVoiceMonitorings',
	campaignLevel:4,
	teekits:Ember.A(),
	drivers:Ember.A(),
	domains:Ember.A(),
	questions:Ember.A(),
	monitoredBy:Ember.A(),
	monitorBelons:[{'id':1, 'name':'Email'}, {'id':2, 'name':'Voice'}],
	
	monitoringBouns:[{id:1, name:'0%'},{id:5, name:'5%'},{id:10, name:'10%'},{id:15, name:'15%'},{id:20, name:'20%'}],
	monitoringInteractions:[{id:1, name:'1'},{id:2, name:'2'},{id:3, name:'3'},{id:4, name:'4'},{id:5, name:'More'}],
	monitoringProblem:[{id:'Yes', name:'Yes'}, {id:'No', name:'No'}],

	monitoring:{
		ticket_no:'',
		booking_no:'',
		date:'',
		time:'',
		agent_id:'',
		tl_id:'',
		customer:'',
		email_driver_id:'',
		email_sub_driver_id:'',
		email_reason_id:'',
		email_sub_reason_id:'',
		email_language_id:'',
		email_type_id:'',
		email_about_id:'',//new
		dispute_type_id:0,
		country_id:'',
		city_id:'',
		customer_satisfaction_id:'',
		customer_dissatisfaction_id:'',//new
		customer_subdissatisfaction_id:'',//new
		monitor_process_type_id:'',
		general_comment:'',
		result:'Pass',
		customer_satisfaction_reason_id:0,
		score:'100',
		monitoring_for_id:'',
		monitoring_belongs:'',
		bouns:'0',
		interactions:'',//new
		problem_solved:''//new
	},

	monoBy:'',
	customerShow:true,
	/*agents:Ember.A(),
	teamleads:Ember.A(),*/
	country:Ember.A(),
	city:Ember.A(),
	options:Ember.A(),
	emailLanguage:Ember.A(),
	emailType:Ember.A(),
	emailAbout:Ember.A(),
	disputeType:Ember.A(),
	emailDriver:Ember.A(),
	emailDriverSub:Ember.A(),
	emailDriverReason:Ember.A(),
	emailDriverReasonSub:Ember.A(),
	satisfaction:Ember.A(),
	dissatisfaction:Ember.A(),
	satisfactionReason:Ember.A(),
	monitoringProcess:Ember.A(),
	agents:Ember.A(),
	teamleads:Ember.A(),
	// agents: Ember.computed('model.users.@each.role_id', function() {
	// 	console.log(this.get('model.users.content'));
	// 	console.log(this.get('model.users').get('content'));
	// 	return this.get('model.users').get('content').get('data').role_id == 11;
	// }),
	// teamleads: Ember.computed('model.users.@each.role_id', function() {
	// 	console.log(this.get('model.users').get('content'));
	// 	return this.get('model.users').get('content').get('data').filterBy('role_id', 11)
	// }),
	// agents:(function() {
	// console.log(this.get('arrangedContent'));
	// 		return this.get('arrangedContent.users').filter(function(agent) {
	// 			return agent.get('data').role_id == 11;
	// 	});
	// }).property('arrangedContent.users'),
	// teamleads: (function() {
	// 	console.log('Its arranged content');
	// 	console.log(this.get('arrangedContent'));
  //   return this.get('arrangedContent.users').filter(function(teamlead) {
	// 		return teamlead.get('data').role_id == 4;
	//   });
	// }).property('arrangedContent.users'),
	subdissatisfaction: (function() {
  		var me = this;
			console.log(this.get('monitoring.customer_dissatisfaction_id'));
      return this.get('options').filter(function(teamlead) {
				return teamlead.get('data').parent_id == me.get('monitoring.customer_dissatisfaction_id');
	    });
	}).property('options.[]', 'monitoring.customer_dissatisfaction_id'),
	funcUsersTLSub:function(){
		var _self = this;
		var value = this.get('monitoring.agent_id');
		if(typeof value === 'undefined' || value == '' || value == null || value < 0 || Em.isEmpty(this.get('agents'))){
			return false;
		}
		var agent = this.get('agents').filter(function(user) {
			return user.get('data').id == value; //)?user.get('data').reporting_id:0;
	    });
	    _self.set('monitoring.tl_id', agent.objectAt(0).get('data').reporting_id);
	}.observes('monitoring.agent_id'),
	funcEmailDomainSub:function(){
		var _self = this;
		var value = this.get('monitoring.city_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		//console.log(value);
		var valing = this.get('domains').filter(function(domain) {
			return domain.get('id') == value;
	    });
	    //console.log(valing.objectAt(0));
	    valing.forEach(function(asd){//console.log(asd.get('parent_id'));
	    	_self.set('monitoring.country_id', asd.get('parent_id'));
	    });
	    
	    //console.log(valing);
	    //this.set('emailDriverSub', valing);
	}.observes('monitoring.city_id'),
	funcSetCampaign:function(){
		var self  = this;
		var value = this.get('monitoring.monitoring_for_id');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		var valing = this.get('campaign').filter(function(driver) {
            return driver.id == value;
		});
		console.log(valing.get('firstObject').category_level);
		//if(value == 1){
		var level =	valing.get('firstObject').category_level;
		self.set('campaignLevel',level);
		self.set('drivers', Ember.A());
		self.get('emailDriver').clear();
		self.get('emailDriverSub').clear();
		//if(value == 1){
		self.store.unloadAll('monitoringCategories');
		//self.set('customerShow', true);
		this.store.find('monitoringCategories',{'monitoring_for_id':value}).then(function(drivers){
			if(level == 4){
				category = drivers.filter(function(driver) {
					return driver.get('level') == 1;
				});
				sub_category = drivers.filter(function(driver) {
					return driver.get('level') == 2;
				});
				reason = drivers.filter(function(driver) {
					return driver.get('level') == 3;
				});
				sub_reason = drivers.filter(function(driver) {
					return driver.get('level') == 4;
				});
			}
			else{
				//var category = drivers.filter(function(driver) {
				//	return driver.get('level') == 1;
				//});
				//var sub_category = drivers.filter(function(driver) {
				//	return driver.get('level') == 1;
				//});
				reason = drivers.filter(function(driver) {
					return driver.get('level') == 1;
				});
				sub_reason = drivers.filter(function(driver) {
					return driver.get('level') == 2;
				});
				category = reason;
				sub_category = reason;
			}
			self.set('emailDriver', category);
			self.set('emailDriverSub', sub_category);
			self.set('emailDriverReason', reason);
			self.set('emailDriverReasonSub', sub_reason);
			self.set('drivers',drivers);
				

				//self.set('emailDriverStyle', "display:block");
			    //self.set('emailDriverSubStyle', "display:none");
			    //self.set('emailDriverReasonStyle', "display:block");
			    //self.set('emailDriverReasonSubStyle', "visibility:visible");

			   //  visibility: hidden

			Ember.$(".select2").select2({width:'100%'});
			Ember.$(".tab-content #callactivity-upselling").addClass('in active');
		});
	}.observes('monitoring.monitoring_for_id'),
	funcForQualityMonitor:function(){
		var _self  = this;
		var valueF = this.get('monitoring.monitoring_for_id');
		var valueB = this.get('monitoring.monitoring_belongs');

		if(typeof valueF === 'undefined' || valueF == '' || valueF <= 0 || typeof valueB === 'undefined' || valueB == '' || valueB <= 0){
			return false;
		}
		var formdata = { monitoring_for_id:valueF, monitoring_belongs:valueB, status:1 };
		_self.get('common').ajaxppRequest('GET', 'api/users_api/questions?format=json', formdata, 'Yes').then(function (response) {   //newRequest is method of our adapter
		   	_self.set('questions', response);
		}, function(error){ //handle error
			_self.get('common').showNotification('error', '<b>Questions not found reload the page!</b>');
		});
		/*Ember.$.isLoading({
            text: '',
            tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
          	//position:   "overlay"
        });
		

		Ember.$.ajax({
		    url: 'api/users_api/questions?format=json',
		    type: 'GET',
		    data:check,
		    success: function(data, textStatus, xhr) {
		    	self.set('questions', data);
		    	Ember.$.isLoading("hide");
		    },
		    error: function(xhr, textStatus, errorThrown) {
		      	self.get('common').showNotification('error', '<b>Questions not found reload the page!</b>');
		      	Ember.$.isLoading("hide");
		    }
	    });*/
		//return;
	}.observes('monitoring.monitoring_belongs', 'monitoring.monitoring_for_id'),
	
	funcSetCategory:function(){
		this.get('monitoring.email_sub_driver_id');
		var _self = this;
		value = this.get('monitoring.email_sub_driver_id');
		if(_self.get('campaignLevel') == 2){
			_self.set('monitoring.email_driver_id', value);
		}else{
			_self.findCategory('monitoring.email_sub_driver_id', 'monitoring.email_driver_id')
		}
	}.observes('monitoring.email_sub_driver_id'),
	funcSetSubCategory:function(){
		var _self = this;
		value = this.get('monitoring.email_reason_id');
		if(_self.get('campaignLevel') == 2){
			_self.set('monitoring.email_sub_driver_id', value);
		}else{
			_self.findCategory('monitoring.email_reason_id', 'monitoring.email_sub_driver_id')
		}
	}.observes('monitoring.email_reason_id'),
	funcSetReason:function(){
		var _self = this;
		this.get('monitoring.email_sub_reason_id');
		//console.log('monitoring.email_sub_reason_id');
		_self.findCategory('monitoring.email_sub_reason_id', 'monitoring.email_reason_id')
	}.observes('monitoring.email_sub_reason_id'),
	findCategory: function(getField,setField){
		var _self = this;
		var value = this.get(getField);
		console.log(value+'...1');
		if(Em.isEmpty(value) || Em.isBlank(value)){//typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		console.log(value+'...2');
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('id') == value;
            //return driver.id == value;
		});
		console.log(valing+'...3');
		//console.log(valing.get('firstObject'));
		_self.set(setField, valing.get('firstObject').get('parent_id.id'));//return valing.get('firstObject').get('parent_id').get('id');
		//return valing.get('firstObject').get('parent_id.id');
		return true;
	},
	// findCategory: function(value){
	// 	var valing = this.get('drivers').filter(function(driver) {
	// 		//return driver.get('id') == value;
    //         return driver.get('id') == value;
	// 	});
	// 	//return valing.get('firstObject').get('parent_id').get('id');
	// 	return valing.get('firstObject').get('parent_id.id');
	// },
  	gainedColor: (function() {
    	//return parseFloat(this.get('gainedTotal'));
    	if(this.get('monitoring.result') == 'Fail') return 'text-red';
    	else if(this.get('monitoring.result') == 'Pass' ) return 'text-yellow';
    	/*else if(this.get('gainedMadel') == 'Silver Call' ) return 'text-muted';
    	else if(this.get('gainedMadel') == 'Golden Call')	return 'text-yellow'; */

  	}).property('monitoring.result'),
  	

	roundNumber:function (num, scale) {
	  if(!("" + num).includes("e")) {
	    return +(Math.round(num + "e+" + scale)  + "e-" + scale);  
	  } else {
	    var arr = ("" + num).split("e");
	    var sig = ""
	    if(+arr[1] + scale > 0) {
	      sig = "+";
	    }
	    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
	  }
	},
	
	
});
telenor.PageController = Ember.ObjectController.extend({
  currentPage: Ember.computed.alias('parentController.page'),
  
  active: (function() {
    return this.get('number') === this.get('currentPage');
  }).property('number', 'currentPage')
});



telenor.VoiceMonitoringController = Ember.ObjectController.extend({
	need:['voiceMonitorings'],
    current_id:'',
	
	

});
