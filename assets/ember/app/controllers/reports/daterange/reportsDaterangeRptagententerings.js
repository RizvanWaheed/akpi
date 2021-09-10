telenor.ReportsDaterangeRptagententeringsController = Ember.ArrayController.extend({
	pageName:'reportsDaterangeRptagententerings',
	monitoringFors:Ember.A(), //[{"id":"1","name":"Customer"},{"id":"2","name":"Captain"},{"id":"3","name":"LetsClap"},{"id":"4","name":"Verification Team"}],
    ticketProcess:[{id:'ticket', name:'Ticket'}, {id:'adjustment', name:'Adjustment'}, {id:'escalation', name:'Escalation'}],
    report:{
		monitoring_for_id:'',
		ticket_process:'',
		date:''
	},
    funcEmailDriverSub:function(){
		var value = this.get('report.monitoring_for_id');
		// console.log("I m inddddddddddddddddddddddddd");
		/*//console.log(value);
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('parent_id') == value;
	    });*/
	    //console.log(valing);
	   // this.set('emailDriverSub', valing);
	}.observes('report.monitoring_for_id')
   
});
/*telenor.ReportsRptagententeringController = Ember.ObjectController.extend({
	need:['reportsDaterangeRptagententerings'],

});*/
