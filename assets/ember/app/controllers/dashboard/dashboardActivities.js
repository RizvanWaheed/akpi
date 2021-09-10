telenor.DashboardActivitiesController = Ember.ArrayController.extend({
	pageName:'dashboardActivities',
	//itemController: 'agentticket',
	activities:Ember.A(),
	activities_hourly:Ember.A(),
	overalldatewise:Em.A(),
	overallcampaignwise:Em.A(),
	report:{
		date:''
	},
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    monitoredBy:Ember.A(),
    typeEmailDriver:1,
    EmailDriveId:0,
    agentticketname:'',
    agentticketa:Ember.A(),
    agentStatus:[{id:1, name:'Open'},{id:2, name:'Hold'},{id:3, name:'Pending'},{id:4, name:'New'},{id:5, name:'You'}],
    teekits:Ember.A(),
  	ticketTotals:0,
  	teekits2:Ember.A(),
  	ticketTotals2:0,
  	cities:Ember.A(),
  	
  	adjustmentShow:(function() {
	    return this.get('activities.ticket_process') == 'adjustment';
	}).property('activities.ticket_process'),
  	
  	ticketProcess:[{id:'ticket', name:'Ticket'}, {id:'adjustment', name:'Adjustment'}],
  	adjustment:[{id:'not_require', name:'Not Require'},{id:'require', name:'Require'}, {id:'pending', name:'Pending'}, {id:'done', name:'Done'}],
  	//captainAdjustment:[{id:'ticket', name:'Ticket'}, {id:'adjustment', name:'adjustment'}],

    activitiess:{
    	id:0,
    	monitoring_for_id:'',
    	email_driver_id:'',
    	email_sub_driver_id:'',
    	email_reason_id:'',
    	email_sub_reason_id:'',
    	ticket_no:'',
    	domain_id:'',
    	status:'',
    	ticket_process:'ticket',
    	booking_no:'',
    	activitiesAdjustments:{
    		id:0,
    		activity_id:0,
    		amount:0,
    		customer_adjustment:'not_require',
    		captain_adjustment:'not_require',
    		comment:''
    	}
    	

    },
    activityIdsync:function(){
		var _controller  = this;
		var value = this.get('activities');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}

		//console.log(value.get('datewise'));
		console.log(value.datewise);
		var categories = [];
		var act = [];
		var adj = [];
		var esc = [];
		//var data = [];
		var drilldown = Em.A();
		var title = '';
		value.datewise.forEach(function(item, index, enumerable){
			console.log(item);
			//	console.log(item.name);
			//	console.log(item.get('name'));
			title = 'Date Wise';//item.title;

			
			esc.pushObject({name:item.name, y:item.escalations, drilldown:item.name+"-esc" });
			adj.pushObject({name:item.name, y:item.adjustments, drilldown:item.name+"-adj" });
			act.pushObject({name:item.name, y:item.activities,  drilldown:item.name+"-act" });
			
			var act2 = [];
			var adj2 = [];
			var esc2 = [];

			item.childen.forEach(function(item2, index2, enumerable2){

				esc2.pushObject({name:item2.name, y:item2.escalations, drilldown:item2.name+"-esc"});
				adj2.pushObject({name:item2.name, y:item2.adjustments, drilldown:item2.name+"-adj"});
				act2.pushObject({name:item2.name, y:item2.activities, drilldown:item2.name+"-act"});

				var act3 = [];
				var adj3 = [];
				var esc3 = [];
				
				item2.childen.forEach(function(item3, index3, enumerable3){
					//uidCst = item2.uid+"-csat";
					//uidNut = item2.uid+"-nut";
					//uidDst = item2.uid+"-dsat";
					// name = item2.name;
					// dataCst[index2][0] = item2.title;
					// dataCst[index2][1] = item2.title;
					esc3.push([item3.name, item3.escalations]);	
					adj3.push([item3.name, item3.adjustments]);
					act3.push([item3.name, item3.activities]);
				});
				drilldown.pushObject({id:item2.name+"-esc", name:item.name+' '+ item2.name+' Escalation', data: esc3});
				drilldown.pushObject({id:item2.name+"-adj", name:item.name+' '+ item2.name+' Adjustment', data: adj3});
				drilldown.pushObject({id:item2.name+"-act", name:item.name+' '+ item2.name+' Tickets', data: act3});

			});
			drilldown.pushObject({id:item.name+"-esc", name:item.name+' Escalation', data: esc2});
			drilldown.pushObject({id:item.name+"-adj", name:item.name+' Adjustment', data: adj2});
			drilldown.pushObject({id:item.name+"-act", name:item.name+' Tickets', data: act2});
			

		
			//_controller.get('overalltl').pushObject({link:'agents.mySurvey', survey_id:item.survey_id, name:'Survey '+(index+1) });
		});

			
		var chartData = Em.A();
			chartData.pushObject({name: 'Escalation', data: esc});
			chartData.pushObject({name: 'Adjustment', data: adj});
			chartData.pushObject({name: 'Tickets', data: act});
			
			
			//return ;

			var options = {
				chart: { type: 'column', backgroundColor: 'transparent' , options3d: {
					enabled: true,
					alpha: 6,
					beta: 6,
					viewDistance: 0,
					depth: 50
				}	},
				title: { text: title	},
				xAxis: {  type: 'category',
						min: 0,
						max: 6,
						scrollbar: {
							enabled: true
						},
						tickLength: 0
					// labels: {
					// 	style: {
					// 		color: 'Black',
					// 		font: '11px Arial, sans-serif'
					// 	}
					// }
				}, //categories: categories	},
				yAxis: { min: 0, title: { text: 'Tickets counts' }, gridLineWidth: 0,
				minorGridLineWidth: 0	},
				tooltip: {
					pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
					shared: true
				},
				scrollbar: {
					enabled: true
				},
				plotOptions: {	column: { 
					pointPadding: 0.2,
					borderWidth: 0,
					groupPadding: 0,
					shadow: false,
				//	stacking: 'percent', 
					dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
					}
				} }
			};
			_controller.get('overalldatewise').pushObject({options:options, chartData:chartData, drilldown:drilldown});
			
			act = [];
			adj = [];
			esc = [];
			drilldown = Em.A();
			value.campaignwise.forEach(function(item, index, enumerable){
				console.log(item);
				//	console.log(item.name);
				//	console.log(item.get('name'));
				title = 'Campaign Wise';//item.title;
	
				act.pushObject({name:item.name, y:item.activities,  drilldown:item.name+"-act" });
				adj.pushObject({name:item.name, y:item.adjustments, drilldown:item.name+"-adj" });
				esc.pushObject({name:item.name, y:item.escalations, drilldown:item.name+"-esc" });
	
				var act2 = [];
				var adj2 = [];
				var esc2 = [];
	
				item.childen.forEach(function(item2, index2, enumerable2){
	
					esc2.pushObject({name:item2.name, y:item2.escalations, drilldown:item2.name+"-esc"});
					adj2.pushObject({name:item2.name, y:item2.adjustments, drilldown:item2.name+"-adj"});
					act2.pushObject({name:item2.name, y:item2.activities, drilldown:item2.name+"-act"});
	
					var act3 = [];
					var adj3 = [];
					var esc3 = [];
					
					item2.childen.forEach(function(item3, index3, enumerable3){
						//uidCst = item2.uid+"-csat";
						//uidNut = item2.uid+"-nut";
						//uidDst = item2.uid+"-dsat";
						// name = item2.name;
						// dataCst[index2][0] = item2.title;
						// dataCst[index2][1] = item2.title;
						esc3.push([item3.name, item3.escalations]);	
						adj3.push([item3.name, item3.adjustments]);
						act3.push([item3.name, item3.activities]);
					});
					drilldown.pushObject({id:item2.name+"-esc", name:item.name+' '+ item2.name+' Escalation', data: esc3});
					drilldown.pushObject({id:item2.name+"-adj", name:item.name+' '+ item2.name+' Adjustment', data: adj3});
					drilldown.pushObject({id:item2.name+"-act", name:item.name+' '+ item2.name+' Tickets', data: act3});
	
				});
				drilldown.pushObject({id:item.name+"-esc", name:item.name+' Escalation', data: esc2});
				drilldown.pushObject({id:item.name+"-adj", name:item.name+' Adjustment', data: adj2});
				drilldown.pushObject({id:item.name+"-act", name:item.name+' Tickets', data: act2});
				
	
			
				//_controller.get('overalltl').pushObject({link:'agents.mySurvey', survey_id:item.survey_id, name:'Survey '+(index+1) });
			});
			chartData = Em.A();
			chartData.pushObject({name: 'Escalation', data: esc});
			chartData.pushObject({name: 'Adjustment', data: adj});
			chartData.pushObject({name: 'Tickets', data: act});
			options = {
				chart: { type: 'bar', backgroundColor: 'transparent', options3d: {
					enabled: true,
					alpha: 6,
					beta: 6,
					viewDistance: 0,
					depth: 50
				}	},
				title: { text: title	},
				xAxis: {  type: 'category',
						min: 0,
						max: 3,						
						tickLength: 0,
						scrollbar: {
							enabled: true
						}

					// labels: {
					// 	style: {
					// 		color: 'Black',
					// 		font: '11px Arial, sans-serif'
					// 	}
					// }
				}, //categories: categories	},
				yAxis: { min: 0, gridLineWidth: 0,
					minorGridLineWidth: 0, title: { text: 'Tickets counts' }	},
				tooltip: {
					pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
					shared: true
				},
				scrollbar: {
					enabled: true
				},
				plotOptions: {	bar: { 
					pointPadding: 0.2,
					borderWidth: 0,
					groupPadding: 0,
					shadow: false,
					stacking: 'percent', 
					dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
					}
				} }
			};
			_controller.get('overallcampaignwise').pushObject({options:options, chartData:chartData, drilldown:drilldown});
			//var drilldown = Em.A();// new Object();
			// response.users.forEach(function(item, index, enumerable){
			// 	//	console.log(item);
			// 		//var data = [];
			// 		var uidCst = '';
			// 		var uidNut = '';
			// 		var uidDst = '';
			// 		var dataCst = [];
			// 		var dataNut = [];
			// 		var dataDst = [];
			// 		var name  = '';
			// 		item.forEach(function(item2, index2, enumerable2){
			// 			uidCst = item2.uid+"-csat";
			// 			uidNut = item2.uid+"-nut";
			// 			uidDst = item2.uid+"-dsat";
			// 			name = item2.name;
			// 			//dataCst[index2][0] = item2.title;
			// 			//dataCst[index2][1] = item2.title;

			// 			dataCst.push([item2.title, parseFloat(((item2.csat/item2.total)*100).toFixed(2))]);
			// 			dataNut.push([item2.title, parseFloat(((item2.nut/item2.total)*100).toFixed(2))]);
			// 			dataDst.push([item2.title, parseFloat(((item2.dsat/item2.total)*100).toFixed(2))]);
			// 			//dataNut.push(item2.title);							//dataDst.push(item2.title);
						
						
			// 		});
			// 		drilldown.pushObject({id:uidCst, name:name, data: dataCst});
			// 		drilldown.pushObject({id:uidNut, name:name, data: dataNut});
			// 		drilldown.pushObject({id:uidDst, name:name, data: dataDst});
					
			// 		//title = item.title;
			// 		// categories.push(item.name);
			// 		// csat.push(parseFloat(((item.csat/item.total)*100).toFixed(2)));
			// 		// nut.push(parseFloat(((item.nut/item.total)*100).toFixed(2)));
			// 		// dsat.push(parseFloat(((item.dsat/item.total)*100).toFixed(2)));

			// 		//csat.pushObject({name:item.name, y:parseFloat(((item.csat/item.total)*100).toFixed(2)),drilldown:item.uid+"-csat"});
			// 		//nut.pushObject({name:item.name, y:parseFloat(((item.nut/item.total)*100).toFixed(2)),drilldown:item.uid+"-nut"});
			// 		//dsat.pushObject({name:item.name, y:parseFloat(((item.dsat/item.total)*100).toFixed(2)),drilldown:item.uid+"-dsat"});
					
			// });
			console.log(drilldown);
			//_controller.get('overalltl').pushObject({options:options, chartData:chartData, drilldown:drilldown});
		


    	//this.set('activities.activitiesAdjustments.activity_id', this.get('activities.id'));
    }.observes('activities'),
    drivers:Ember.A(),
    customerShow:true,
    emailDriver:Ember.A(),
  	emailDriverSub:Ember.A(),
  	emailDriverReason:Ember.A(),
  	emailDriverReasonSub:Ember.A(),

    emailDriverStyle:"display:block",
  	emailDriverSubStyle:"display:block",
  	emailDriverReasonStyle:"display:block",
  	emailDriverReasonSubStyle:"display:block",

    funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('activities.monitoring_for_id');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		
		self.set('drivers', Ember.A());
		self.get('emailDriver').clear();
		self.get('emailDriverSub').clear();
		//if(value == 1){
			self.store.unloadAll('monitoringCategories');
		//			self.set('customerShow', true);
			this.store.find('monitoringCategories',{'monitoring_for_id':value}).then(function(drivers){
				if(value == 1){
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
				}
				else{
					//var category = drivers.filter(function(driver) {
					//	return driver.get('level') == 1;
				    //});
				    //var sub_category = drivers.filter(function(driver) {
					//	return driver.get('level') == 1;
				    //});
					var reason = drivers.filter(function(driver) {
						return driver.get('level') == 1;
				    });
				    var sub_reason = drivers.filter(function(driver) {
						return driver.get('level') == 2;
				    });
				    var category = reason;
				    var sub_category = reason;
				}
				/*var category = drivers.filter(function(driver) {
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
*/			    self.set('emailDriver', category);
			    self.set('emailDriverSub', sub_category);
			    self.set('emailDriverReason', reason);
			    self.set('emailDriverReasonSub', sub_reason);
			    self.set('drivers',drivers);
				

				//self.set('emailDriverStyle', "display:block");
			    //self.set('emailDriverSubStyle', "display:none");
			    //self.set('emailDriverReasonStyle', "display:block");
			    //self.set('emailDriverReasonSubStyle', "visibility:visible");

			   //  visibility: hidden

			    Ember.$(".select2").select2();
			});

			

		/*}else{
			self.set('customerShow', false);
			self.store.unloadAll('emaildrivers');
			this.store.find('emaildrivers',{'for_id':value}).then(function(drivers){
				self.set('emailDriver', Ember.A());
				self.set('emailDriverSub', Ember.A());

				drivers.forEach(function(driver) {
					if(driver.get('parent_id.id') == 0){
						if(driver.get('id') > 0){
							self.get('emailDriver').pushObject({id:driver.get('id'), name:driver.get('name')});
						}
					}
					else{
						if(driver.get('id') > 0){
							self.get('emailDriverSub').pushObject({id:driver.get('id'), name:driver.get('name')});
						}
					}
				});
				self.set('drivers',drivers);	
			    Ember.$(".select2").select2();
			});

			
		}*/
		
		
	}.observes('activitiess.monitoring_for_id'),
	funcEmailDriverSub0:function(){
		var _self = this;
		var value = this.get('activities.email_sub_driver_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		//console.log(value);
		var monitoring_for_id = this.get('activities.monitoring_for_id');

		if(monitoring_for_id != 1){
			_self.set('activities.email_driver_id', value);
		}else{
			var valing = this.get('drivers').filter(function(driver) {
				return driver.get('id') == value;
		    });
		    //console.log(valing.objectAt(0));
		    valing.forEach(function(asd){//console.log(asd.get('parent_id'));
		    	_self.set('activities.email_driver_id', asd.get('parent_id.id'));
		    });
	    }
	    //console.log(valing);
	    //this.set('emailDriverSub', valing);
	}.observes('activitiess.email_sub_driver_id'),
	funcEmailDriverSub:function(){
		var _self = this;
		var value = this.get('activities.email_reason_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		var monitoring_for_id = this.get('activities.monitoring_for_id');
		if(monitoring_for_id != 1){
			_self.set('activities.email_sub_driver_id', value);
		}else{
			var valing = this.get('emailDriverReason').filter(function(driver) {
				return driver.get('id') == value;
		    });
		    valing.forEach(function(asd){
		    	_self.set('activities.email_sub_driver_id', asd.get('parent_id.id'));
		    });

		}
		
	    
	}.observes('activitiess.email_reason_id'),
	funcEmailDriverSub2:function(){
		var _self = this;
		var value = this.get('activities.email_sub_reason_id');
		if(typeof value === 'undefined' || value == '' || value < 0){
			return false;
		}
		

		var valing = this.get('emailDriverReasonSub').filter(function(driver) {
			return driver.get('id') == value;
	    });
	    valing.forEach(function(asd){
	   	_self.set('activities.email_reason_id', asd.get('parent_id.id'));
	    });
	    
	    
	}.observes('activitiess.email_sub_reason_id'),
	/*funcEmailDriverSub:function(){
		var value = this.get('activities.email_driver_id');
		//console.log(value);
		var valing = this.get('drivers').filter(function(driver) {
			return driver.get('parent_id') == value;
	    });
	    //console.log(valing);
	    this.set('emailDriverSub', valing);
	}.observes('activities.email_driver_id'),*/
	/*funcByQualityMonitor:function(){
		var self  = this;
		var value = this.get('monitoredBy');

		if(typeof value === 'undefined' || value == '' || value <= 0){
			return false;
		}
		this.store.find('emaildrivers',{'for_id':value,'type_id':0}).then(function(driver){
			self.set('agentticketa',driver);
		});
		return;
	}.observes('monitoredBy'),*/
	actions:{
		reset:function(){
			var _controller = this;//.controllerFor('dashboardActivities');//monitoring_for_id:'',
			_controller.set('activities',{
			    	id:0,
			    	monitoring_for_id:'',
			    	email_driver_id:'',
			    	email_sub_driver_id:'',
			    	email_reason_id:'',
			    	email_sub_reason_id:'',
			    	ticket_no:'',
			    	domain_id:'',
			    	status:'',
			    	ticket_process:'ticket',
			    	booking_no:'',
			    	activitiesAdjustments:{
			    		id:0,
			    		activity_id:0,
			    		amount:0,
			    		customer_adjustment:'not_require',
			    		captain_adjustment:'not_require',
			    		comment:''
			    	}
			    	
		    });
		},
		save: function(){
			var _self = this;
          //  var _self = _self.controllerFor('accalations');
            var activities = _self.get('activities');
           // console.log(activities);
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
         //   Ember.$('#btnAccalationEditSave').prop("disabled", true);

	        //    var id = Ember.$('#idAccalation').val();
	        //    var self = this;
	        //    var controller = self.controllerFor('accalations');
            if (activities.id == 0) {

                if(typeof activities.monitoring_for_id === 'undefined' || activities.monitoring_for_id == '' || activities.monitoring_for_id == 0 || activities.monitoring_for_id == null){
					_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
					return false;
				}
				if(typeof activities.email_driver_id === 'undefined' || activities.email_driver_id == '' || activities.email_driver_id == 0 || activities.email_driver_id == null){
					_self.get('common').showNotification('error', '<b>Category not selected!</b>');
					return false;
				}
				if(typeof activities.email_reason_id === 'undefined' || activities.email_reason_id == '' || activities.email_reason_id == 0 || activities.email_reason_id == null){
					_self.get('common').showNotification('error', '<b>Email Driver not selected!</b>');
					return false;
				}
				if(typeof activities.domain_id === 'undefined' || activities.domain_id == '' || activities.domain_id == 0 || activities.domain_id == null){
					_self.get('common').showNotification('error', '<b>City not selected!</b>');
					return false;
				}
				if(typeof activities.status === 'undefined' || activities.status == '' || activities.status == 0 || activities.status == null){
					_self.get('common').showNotification('error', '<b>Status not selected!</b>');
					return false;
				}
				if(activities.ticket_no == '' || activities.ticket_no == null){
					_self.get('common').showNotification('error', '<b>Ticket ID is missing!</b>');
					return false;
				}
              /* Ember.$('#formActivities').isLoading({
                    text: '',
                    tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                    position: "overlay"
                });*/
        		_self.get('common').showOverlay('formActivities');
                _self.store.unloadAll('activity');
                var activity = _self.store.createRecord('activity',activities);
                activity.save().then(function(act){
                    /*console.log(act);
                    console.log(act.meta);
                    console.log(act.get("content.meta"));
                    console.log();
                    console.log(act.get("meta"));*/
                   // _self.get('common').showNotification('success', '<b>Ticket saved successfully!</b>');
                    ac = _self.store.metadataFor("activity")
                   	if(ac.find){
						_self.get('common').showNotification('warning', '<b>Already Saved!</b>');
					}else{
						_self.get('common').showNotification('success', '<b>Saved successfully!</b>');
					}
					_self.get('common').hideOverlay('formActivities');
                    //Ember.$('#formActivities').isLoading("hide");
                    _self.send('reload');
                    // _self.send('reset');
                //    _self.send('reload');
                    
                });
                //echo "development is passion about work.";

            } else {
            	//formData.append('accalation',_accalation);
				
                var _activitiesAdjustments = _self.get('activities.activitiesAdjustments');
               // _activitiesAdjustments.accalation_id = _accalation.id;
            //   console.log(_activitiesAdjustments)
                _self.store.unloadAll('ActivitiesAdjustment');
                var newAccalation = _self.store.createRecord('ActivitiesAdjustment',_activitiesAdjustments);
                newAccalation.save().then(function(){
                    //Ember.$('#idAccalation').val(0),
                    //Ember.$('#catAccalation').val('');
                    //Ember.$('#descAccalation').val('');
                    //controller.set('accalationTypeStatus','');
                    //self.send('clog');//();
                    _self.get('common').showNotification('success', '<b>Adjustment saved successfully!</b>');
                  /*  _self.store.find('accalationLogs', { cid: _accalationLog.accalation_id }).then(function(logAccalation){
                        _self.set('accalationLogs', logAccalation);
                    });*/
                   
                   // Ember.$('#btnAccalationEditSave').prop("disabled", false);
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
                    // _self.send('reset');
                   // _self.send('reload');
                 //   Ember.$.isLoading("hide");
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

		},
		reload:function(){
			//console.log("I m in controller");
			//this.get('common').consoleClear();

			var _self = this;
			_self.get('common').consoleClear();
			var _controller = this;//.controllerFor('dashboardActivities');
			var activities = _controller.get('activities.monitoring_for_id');
			if(typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			/*Ember.$('#tickets-ticket').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
            //console.log('before common');
            //console.log(this.get('common'));
           // console.log('after common');
           // return;
            this.get('common').showOverlay('tickets-ticket');
            this.store.find('activities', {'monitoring_for_id': activities, 'ticket_process': 'ticket'}).then(function(activeity){
				_controller.set('teekits',activeity);
				//_controller.set('ticketTotals',_self.store.metadataFor("activities"));
				_controller.set('ticketTotals',activeity.get("length"));
				//var meta = this.store.metadataFor("post");
				//Ember.$('#tickets-ticket').isLoading("hide");
				_self.get('common').hideOverlay('tickets-ticket');
			});
			console.log(_self.store.metadataFor("activities"));
			/*Ember.$.ajax({
			    url: 'api/users_api/getMyTickets?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'ticket_process':'ticket'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	_controller.set('teekits',data.table);
			    	_controller.set('ticketTotals',data.total);
			    	Ember.$('#tickets-ticket').isLoading("hide");
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		reloadAdjustment:function(){
			this.get('common').consoleClear();
			var _self = this;
			var _controller = this;//.controllerFor('dashboardActivities');
			var activities = _controller.get('activities.monitoring_for_id');
			if(typeof activities === 'undefined' || activities == '' || activities == 0 || activities == null){
				_self.get('common').showNotification('error', '<b>Campaign not selected!</b>');
				return false;
			}
			/*Ember.$('#tickets-adjustment').isLoading({
                text: '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
                position: "overlay"
            });*/
            this.get('common').showOverlay('tickets-adjustment');
			this.store.find('activities', {'monitoring_for_id': activities, 'ticket_process': 'adjustment'}).then(function(activeity){
				_controller.set('teekits2',activeity);
				//_controller.set('ticketTotals',_self.store.metadataFor("activities"));
				_controller.set('ticketTotals2',activeity.get("length"));
				//Ember.$('#tickets-adjustment').isLoading("hide");
				_self.get('common').hideOverlay('tickets-adjustment');
			});
			console.log(_self.store.metadataFor("activities"));
			//return;
			
			/*Ember.$.ajax({
			    url: 'api/users_api/getMyTickets?format=json',
			    type: 'GET',
			    data:{'monitoring_for_id': activities, 'ticket_process': 'adjustment'},
			    success: function(data, textStatus, xhr) {
			    	if(typeof data.error !== 'undefined'){
			    		_self.get('common').showNotification('error', '<b>'+data.error+'');
			    		return;
			    	}
			    	//_controller.set('teekits2',data.table);
			    	//_controller.set('ticketTotals2',data.total);
			    	
			    	if(data.UserStateLogs.user_state_id != 4){
			    		controller.set('alreadyLogin', false);
			    	}
			    	else{
			    		controller.set('alreadyLogin', true);
			    	}
			    	console.log(controller.get('alreadyLogin'));
			    	console.log(data.UserStateLogs.user_state_id);
			    }
		    });*/
		},
		editAdjustment:function(activities){
			console.log('edit');
			
			//return;
			var _controller = this;//.controllerFor('dashboardActivities');//monitoring_for_id:'',
			_controller.set('activities.ticket_process','adjustment');
			_controller.set('activities.id',activities.id);
			_controller.set('activities.monitoring_for_id',activities.get('monitoring_for_id.id'));
			_controller.set('activities.email_driver_id',activities.get('email_driver_id.id'));
			_controller.set('activities.email_sub_driver_id',activities.get('email_sub_driver_id.id'));
			_controller.set('activities.email_reason_id',activities.get('email_reason_id.id'));
			_controller.set('activities.email_sub_reason_id',activities.get('email_sub_reason_id.id'));
			_controller.set('activities.ticket_no',activities.get('ticket_no'));
			_controller.set('activities.domain_id',activities.get('domain_id.id'));
			_controller.set('activities.status',activities.get('status'));
			_controller.set('activities.booking_no',activities.get('booking_no'));

			this.store.find('activitiesAdjustment', {'activity_id': activities.id}).then(function(activeity){
				//console.log(activeity.get(0));
				//_controller.set('teekits',activeity);
				//_controller.set('ticketTotals',activeity.get("length"));
				activeity.forEach(function(asd){//console.log(asd.get('parent_id'));
			    	_controller.set('activities.activitiesAdjustments',{
			    		id:asd.get('id'),
			    		activity_id:asd.get('activity_id'),
			    		amount:asd.get('amount'),
			    		customer_adjustment:asd.get('customer_adjustment'),
			    		captain_adjustment:asd.get('captain_adjustment'),
			    		comment:asd.get('comment')
			    		

			    	});
			    });
				/*_controller.set('activities.activitiesAdjustments',{
			    		id:activeity[0].get('id'),
			    		activity_id:activeity[0].get('activity_id'),
			    		amount:activeity[0].get('amount'),
			    		customer_adjustment:activeity[0].get('customer_adjustment'),
			    		captain_adjustment:activeity[0].get('captain_adjustment'),
			    		comment:activeity[0].get('comment')
			    		

			    });*/
				//Ember.$('#tickets-ticket').isLoading("hide");
			});
			return;
			//_controller.set('activities', activities);
			// copy complaint process

			
		}
	}
	
});
// telenor.AgentticketController = Ember.ObjectController.extend({
// 	need:['agenttickets'],

// });
