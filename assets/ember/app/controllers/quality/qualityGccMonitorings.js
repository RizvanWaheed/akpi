telenor.QualityGccMonitoringsController = Ember.ArrayController.extend({
	pageName:'qualityGccMonitorings',
	drivers:Ember.A(),
	domains:Ember.A(),
	teekits:Ember.A(),
	questions:Ember.A(),
	monitoring:{
		ticket_no:'',
		booking_no:'',
		date:'',
		time:'',
		agent_id:'',
		tl_id:'',
		customer:'',
		email_driver_id:'',
		email_reason_id:'',
		email_language_id:'',
		email_type_id:'',
		dispute_type_id:'',
		country_id:'',
		city_id:'',
		customer_satisfaction_id:'',
		monitor_process_type_id:'',
		general_comment:'',
		result:'Pass',
		customer_satisfaction_reason_id:'',
		score:'100',
		monitoring_for_id:'2',
		bouns:'0',
	},

	monoBy:'Captain',
	/*agents:Ember.A(),
	teamleads:Ember.A(),*/
	country:Ember.A(),
	city:Ember.A(),
	emailLanguage:Ember.A(),
	emailType:Ember.A(),
	disputeType:Ember.A(),
	emailDriver:Ember.A(),
	emailDriverSub:Ember.A(),
	satisfaction:Ember.A(),
	satisfactionReason:Ember.A(),
	monitoringProcess:Ember.A(),
	monitoringBouns:Ember.A(),
	/*(function(){
		var value = this.get('monitoring.email_driver_id');
		console.log(value);
		return this.get('drivers').filter(function(driver) {
			console.log(driver);
	    	return driver.get('parent_id') == value;
	    });
	}).property('monitoring.email_driver_id'),
*/
	/*funcCity:function(){
		var value = this.get('monitoring.country_id');
		var valing = this.get('domains').filter(function(domain) {
			return domain.get('parent_id') == value;
	    });
	    this.set('city', valing);
	}.observes('monitoring.country_id'),*/
	/*funcEmailDriverSub:function(){
		var value = this.get('monitoring.email_driver_id');
		//console.log(value);
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('parent_id') == value;
	    });
	    //console.log(valing);
	    this.set('emailDriverSub', valing);
	}.observes('monitoring.email_driver_id'),*/
	agents: (function() {
		console.log(this.get('arrangedContent'));
        return this.get('arrangedContent').filter(function(agent) {
        	return agent.get('data').role_id == 11;
	    });
  	}).property('arrangedContent.[]'),
	teamleads: (function() {
		console.log(this.get('arrangedContent'));
        return this.get('arrangedContent').filter(function(teamlead) {
			return teamlead.get('data').role_id == 4;
	    });
  	}).property('arrangedContent.[]'),
	funcUsersTLSub:function(){
		var _self = this;
		var value = this.get('monitoring.agent_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		//console.log(value);
		var valing = this.get('model').filter(function(user) {
			console.log(user)
			return user.get('data').id == value;
	    });
	    //console.log(valing.objectAt(0));
	    valing.forEach(function(asd){//console.log(asd.get('parent_id'));
	    	_self.set('monitoring.tl_id', asd.get('reporting_id'));
	    });
	    
	    //console.log(valing);
	    //this.set('emailDriverSub', valing);
	}.observes('monitoring.agent_id'),
	funcEmailDriverSub:function(){
		var _self = this;
		var value = this.get('monitoring.email_reason_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		//console.log(value);
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('id') == value;
	    });
	    //console.log(valing.objectAt(0));
	    valing.forEach(function(asd){//console.log(asd.get('parent_id'));
	    	_self.set('monitoring.email_driver_id', asd.get('parent_id.id'));
	    });
	    
	    //console.log(valing);
	    //this.set('emailDriverSub', valing);
	}.observes('monitoring.email_reason_id'),
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



telenor.QualityGccMonitoringController = Ember.ObjectController.extend({
	need:['qualityGccMonitorings'],
    current_id:'',
	
	

});