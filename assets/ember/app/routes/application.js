telenor.ApplicationRoute = Ember.Route.extend(window.EmberWebsocket, {
	controllerName: 'application',
	//socketURL: 'ws://localhost:8080',
	//keepSocketAlive: false,

	// socketConfigurations: [{
	//     key: 'socket1',
	//     socketURL: 'ws://localhost:8001',
	// },{
	//     key: 'socket2',
	//     socketURL: 'ws://localhost:8002',
	//     keepSocketAlive: false,
	//     socketBinaryType: 'blob'
	// }],

	//renderTemplate:function(){
	//	this.render('users');
	//},
	beforeModel: function () {
		var self = this;
		var controller = self.controllerFor("application");
		// console.log(projectJS);
		// console.log(projectJS.mapBy('name'));
		//var pjname = projectJS.mapBy('name');
		// console.log(pjname[0]);
		// controller.set("project", iMyMeJS.project);
		// controller.set("campaign", iMyMeJS.campaign);
		// controller.set("subcampaign", iMyMeJS.subcampaign);
		// console.log(controller.get("project"));
		controller.set("tabs", Ember.ArrayProxy.create());
		controller.tabs.set("content", []);

		var indexTab = telenor.Tab.create({
			id: 9,
			name: this.get("iMyMe").name, // + '&nbsp; <a href="/akpi/Abacus/logout" class="text-abacus"><i class="fa fa-power-off pull-right"></i></a>',
			target: "index",
			//targeted: '/akpi/Abacus/bpo/index',
			isActive: true,
			isRoot: true,
			font: 'fa fa-user'
		});

		var tabs = controller.get("tabs");
		tabs.addObject(indexTab);
		// Em.run.later(function () {
		// 	controller.activateTab(9);
		// }, 2000);

		//controller.set('modules', accessesJS);
		controller.set('iMyMe', iMyMeJS);
		/*console.log('stateJS starts');
	 	console.log(stateJS);
	 	console.log('stateJS ends');
	 	console.log('Imyme starts');
	 	console.log(iMyMeJS);
		 console.log('Imyme ends');*/

		// console.log('campiagn starts');
		// console.log(campaignsJS.mapBy('id'));
		// console.log(campaignsJS.get('firstObject')); 
		// console.log(campaignsJS.get('length')); 
		// console.log(campaignsJS);
		// console.log('campiagn ends');

		if (parseInt(iMyMeJS.role_id) <= 305) {
			controller.set('isAdmin', true);
		} else {
			controller.set('isAdmin', false);
		}
		// console.log(iMyMeJS.role_id);
		if (parseInt(iMyMeJS.role_id) == 305 || parseInt(iMyMeJS.role_id) == 317) {
			controller.set('isAgent', true);
			/*console.log('stateJS.user_state_id');
			console.log(stateJS);
			console.log('stateJS.user_state_id');*/
			if (stateJS.user_state_id != 4) {
				controller.set('alreadyLogin', false);
			} else {
				controller.set('alreadyLogin', true);
			}
		}
		controller.set('userName', iMyMeJS.name);
		controller.set('role', iMyMeJS.role_id);
	},
	model: function () {
		//return accessesJS; 
		return this.store.find('modules', {
			for: 'me',
			limit: 1,
			page: 1
		});
		// return this.store.find('accesses', {
		// 	limit: 1,
		// 	page: 1
		// });
	},
	afterModel: function (model, transition) {
		// var controller  = this.controllerFor("application");
		// controller.set("tabs", Ember.ArrayProxy.create());
		// controller.tabs.set("content", []);

		// var indexTab = telenor.Tab.create({
		//     name: "Index",
		//     target: "index",
		//     isActive: true,
		//     isRoot: true
		// });

		// var tabs = controller.get("tabs");
		// tabs.addObject(indexTab);
	},
	resetController: function (controller, isExiting, transition) {
		if (isExiting) {
			console.log('reset controller');
			// isExiting would be false if only the route's model was changing
			//controller.set('page', 1);
		}
	},
	setupController: function (controller, model, queryParams) {
		this._super(controller, model);
		//////////////////////////////// Start Tab /////////////////////////////////////
		// controller.set("tabs", Ember.ArrayProxy.create());
		// controller.tabs.set("content", []);
		// var indexTab = telenor.Tab.create({
		//     name: "Index",
		//     target: "index",
		//     isActive: true,
		//     isRoot: true
		// });
		// var tabs = controller.get("tabs");
		// tabs.addObject(indexTab);
		////////////////////////////// End Tab ///////////////////////////////////////

		var d = new Date();
		controller.set('copyRightYear', d.getFullYear());
		var baseUrl = controller.get('applicationURL');
		if (controller.get('isAgent')) {
			controller.set('chatNotificationBit', 'go');
			this.reloadApplicationControllerModel(controller);
		}
		controller.set('model', model);
	},
	reloadApplicationControllerModel: function (_controller) {
		//console.log("I m in application funcation")
		var _self = this;
		if (Ember.isBlank(_controller.get('chatNotificationBit'))) {
			Em.run.cancel();
		} else {
			Em.run.later(function () {
				_self.get('common').ajaxppRequest('GET', 'api/users_api/getMyStateLog?format=json', '', '').then(function (response) { //newRequest is method of our adapter
					if (Em.isEmpty(response.stats) || response.stats[0].current == 'Logout') {
						window.location.assign(javaScriptApplicationRoot + 'Abacus/logout');
						return false;
					}
					_controller.get('notify').removeObjects(_controller.get('notify'));
					_controller.set('breakTime', response.stats[0].Break);
					_controller.set('loginTime', response.stats[0].total);
					_controller.set('currentStatus', response.stats[0].current);

					//console.log(Em.isEmpty(response.survey));
					//console.log(response.survey.get('count'));
					//console.log(response.survey[0]);

					if (!Em.isEmpty(response.survey) && response.survey[0].count > 0 && Em.isEmpty(response.survey[0].saved)) {
						_controller.set('notifications', true);
						_controller.set('notificationCount', response.survey.length);
						response.survey.forEach(function (item, index, enumerable) {
							_controller.get('notify').pushObject({
								link: 'agents.mySurvey',
								survey_id: item.survey_id,
								name: 'Survey ' + (index + 1)
							});
						});
					}
					//console.log(_controller.get('notify'));

				}, function (error) {
					//handle error  
				});

				_self.reloadApplicationControllerModel(_controller);
			}, 5000);
		}
	},
	stopCollecting: function () {
		self = this;
		self.controllerFor("application").set('chatNotificationBit', null);
		// Ember.run.end();
	}.on('deactivate'),
	startCollecting: function () {
		//var self = this;
		//self.store.find('chatNotes').then(function(rec){
		// 	self.controllerFor("application").set('chatNotification', self.store.all('chatNotes').get('content'));
		//	});
		//	Ember.run.schedule();
		/*Ember.run.schedule('funcReload', this, function() {
      		console.log('loop is on run');
	    // 2. schedule notices that there is no currently available runloop so it
	    //    creates one. It schedules it to close and flush queues on the next
	    //    turn of the JS event loop.
		    if (! Ember.run.hasOpenRunloop()) {
		      Ember.run.start();
		      nextTick(function() {
		          Ember.run.end()
		      }, 0);
		    }
		});*/

	}.on('activate'),
	actions: {
		error: function (error, transition) {

			console.log('error');
			console.log(error);
			console.log('error');
			//if (error && error.status === 400) {
			// error substate and parent routes do not handle this error
			//  return this.transitionTo('modelNotFound');
			//}
			//Ember.onerror(error);
			// Return true to bubble this event to any parent route.
			//return true;
		},
		loading: function (transition, originRoute) {
			/*console.log('transition');
			console.log(transition);
			console.log('transition');
			console.log('originRoute');
			console.log(originRoute);
			console.log('originRoute');*/

			var view = this.container.lookup('view:global-loading').append();
			this.router.one('didTransition', view, 'destroy');
		},
		toggleButton: function () {
			//	$(toggleBtn).click(function (e) {
			// e.preventDefault();
			Ember.$("body").toggleClass('sidebar-collapse');
			Ember.$("body").toggleClass('sidebar-open');
			//  });
			/* $(".content-wrapper").click(function () {
			    //Enable hide menu when clicking on the content-wrapper on small screens    
			    if ($(window).width() <= 767 && $("body").hasClass("sidebar-open")) {
			      $("body").removeClass('sidebar-open');
			    }
			  });*/
		},
		controlButton: function () {
			//	$(toggleBtn).click(function (e) {
			// e.preventDefault();
			Ember.$("#control-sidebar").toggleClass('control-sidebar-open');
			//Ember.$("body").toggleClass('sidebar-open');
			//  });
			/* $(".content-wrapper").click(function () {
			//Enable hide menu when clicking on the content-wrapper on small screens    
			if ($(window).width() <= 767 && $("body").hasClass("sidebar-open")) {
				$("body").removeClass('sidebar-open');
			}
			});*/
		},
		startMessanger: function () {

		},
		stopMessanger: function () {

		},
		appLoader: function () {
			console.log(uid.get('type')); //return;        	
			return;
		},
		setMenu: function (id) {
			//var p = $('#'+id).parent('ul');
			//$(p+' > li').removeClass('active');
			$('.sidebar-menu > li').removeClass('active');
			$('#' + id).addClass('active');
		},
		funcCallBreak: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = _self.controllerFor("application");
			var state = {
				id: '3',
				ip: clientMachineIp
			};
			if (_controller.get('currentStatus') == 'Break') return;
			_self.get('common').ajaxppRequest('POST', 'api/users_api/loginStatus?format=json', state, 'Yes').then(function (response) { //newRequest is method of our adapter
				_controller.set('currentStatus', 'Break');
				_controller.set('logout', false);
				Em.$("body").removeClass('sidebar-open');
				Em.$("body").addClass('sidebar-collapse');
				//    Em.$("body").toggleClass('sidebar-open');
				Em.$('#toggleButtonContainer').prop('disabled', true);
				Em.$('#funcCallBreak').prop('disabled', true);
				Em.$('#funcCallResume').prop('disabled', false);
				_self.transitionTo('/');
			}, function (error) {
				//handle error  
			});

		},
		funcCallResume: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = _self.controllerFor("application");
			var state = {
				id: '4',
				ip: clientMachineIp
			};
			if (_controller.get('currentStatus') != 'Break') {
				return;
			}
			_self.get('common').ajaxppRequest('POST', 'api/users_api/loginStatus?format=json', state, 'Yes').then(function (response) { //newRequest is method of our adapter
				_controller.set('currentStatus', 'Working');
				_controller.set('logout', true);
				Em.$('#funcCallResume').prop('disabled', true);
				Em.$('#funcCallBreak').prop('disabled', false);
				Em.$('#toggleButtonContainer').prop('disabled', false);
				Em.$("body").removeClass('sidebar-collapse');
				Em.$("body").addClass('sidebar-open');
				//Em.$("body").toggleClass('sidebar-collapse');
				//Em.$("body").toggleClass('sidebar-open');
				//_self.transitionTo('/');
				_self.refresh();
			}, function (error) {
				//handle error  
			});
		},
		funcCallReload: function () {
			this.get('common').consoleClear();
			var _self = this;
			var _controller = _self.controllerFor("application");
			_self.get('common').ajaxppRequest('GET', 'api/users_api/getMyStateLog?format=json', '', 'Yes').then(function (response) { //newRequest is method of our adapter
				if (Em.isEmpty(response.stats) || response.stats[0].current == 'Logout') {
					window.location.assign(javaScriptApplicationRoot + '/Abacus/logout');
					return false;
				}
				_controller.set('breakTime', response.stats[0].Break);
				_controller.set('loginTime', response.stats[0].total);
				_controller.set('currentStatus', response.stats[0].current);
				//console.log(Em.isEmpty(response.survey));
				//console.log(response.survey.count);
				//console.log(response.survey[0]);
				if (!Em.isEmpty(response.survey) && response.survey[0].count > 0) {
					_controller.set('notifications', true);
					_controller.set('notificationCount', response.survey.length);
					response.survey.forEach(function (item, index, enumerable) {
						_controller.get('notify').pushObject({
							link: 'agents.mySurvey',
							survey_id: item.survey_id,
							name: 'Survey ' + (index + 1)
						});
					});
				}
			}, function (error) {
				//handle error  
			});
		},

	},


});
