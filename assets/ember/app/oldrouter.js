telenor.deferReadiness();
telenor.Router.map(function () {
	var router = this;
	this.resource('/');
	this.resource('index');
	// this.resource("dashboard", {path: "/"}, function () {
	// this.route('catchall', {
	// 	path: '/' //'*wildcard'
	// })

	// this.resource('myLink.index', {
	// 	path: "/"
	// });

	// function () {
	// 	this.route('myLink.webpage', {
	// 		path: "/:page"
	// 	});
	//  this.resource('colorWrap', {
	//  	path: '/:pk1'
	//  }, function () {
	//  	this.resource('color', {
	//  		path: '/:pk2'
	//  	});
	//  });
	// this.route('webpage', {
	// 	path: "/:page"
	// });
	this.resource('projects',
		// {
		// 	path: '/projects'
		// },
		function () {
			this.route('webpage', {
				path: "/:page"
			})
		});
	this.resource('dashboard', function () {
		this.resource('dashboard.activities', {
			path: "/activities"
		});
		this.resource('dashboard.surveys', {
			path: "/surveys"
		});
		this.resource('dashboard.monitorings', {
			path: "/monitorings"
		});
		this.resource('dashboard.quizes', {
			path: "/quizes"
		});
	});
	// this.resource('password');
	this.resource('connections', function () {
		this.resource('chats', function () {
			this.resource('chat', {
				path: '/:uid'
			});
		});
		this.route('chatrooms'); //, function(){
		//	this.resource('connections.chat.rooms',{path: "/rooms"});
		//});
	});
	this.resource('administrator', function () {
		this.route('users');
		this.route('employees');
		this.route('accesses');
		this.route('rights');
		this.route('roles');
		this.route('categories');
		this.route('monitoringFors');
		this.route('emaildrivers');
		this.route('monitoringEmailDrivers');
	});
	this.resource('reports', function () {
		this.route('surveys');
		/*this.resource('reports.sarptcomplaints', {path: "/sarptcomplaints"});
		this.resource('reports.rptqltymonitorings', {path: "/rptqltymonitorings"});       
		this.resource('reports.rptagentmonitorings', {path: "/rptagentmonitorings"});
		this.resource('reports.rptagententerings', {path: "/rptagententerings"});*/
		this.resource('daterange', function () {
			this.route('sarptcomplaints');
			this.route('rptqltymonitorings');
			this.route('rptagentmonitorings');
			this.route('rptagententerings');

			// this.resource('reports.daterange.sarptcomplaints', {
			// 	path: "/sarptcomplaints"
			// });
			// this.resource('reports.daterange.rptqltymonitorings', {
			// 	path: "/rptqltymonitorings"
			// });
			// this.resource('reports.daterange.rptagentmonitorings', {
			// 	path: "/rptagentmonitorings"
			// });
			// this.resource('reports.daterange.rptagententerings', {
			// 	path: "/rptagententerings"
			// });
		});
		this.resource('daily', function () {
			this.route('rptqltymonitorings');
			this.route('rptagentmonitorings');
			this.route('rptagententerings');
			this.route('tasks');
			this.route('voc');
			// this.resource('reports.daily.rptqltymonitorings', {
			// 	path: "/rptqltymonitorings"
			// });
			// this.resource('reports.daily.rptagentmonitorings', {
			// 	path: "/rptagentmonitorings"
			// });
			// this.resource('reports.daily.rptagententerings', {
			// 	path: "/rptagententerings"
			// });
			this.resource('reports.daily.tasks', {
				path: "/tasks"
			});
			// this.resource('reports.daily.voc', {
			// 	path: "/voc"
			// });
		});
	});
	this.resource('agents', function () {
		this.route('tasks');
		this.route('tickets');
		this.route('vocs');
		this.route('surveys');
		this.route('mySurvey', {
			path: "/mySurvey/:id"
		}); //, queryParams: ['surveyId']
		//this.route('mySurvey/:params');
	});
	this.resource('teamlead', function () {
		this.route('statusViews');
		this.route('agents');
	});
	this.resource('traffic', function () {
		this.route('statusViews'); //this.route('agents');
	});
	this.resource('uploaders', function () {
		this.route('inOutTimes');
		this.route('monitoringSheets'); /// remain to build
		this.route('agentDataSheets'); // upload campaign wise
		// this.route('surveys');
		// this.route('mySurvey',{path: "/mySurvey/:id"});//, queryParams: ['surveyId']
		// this.route('mySurvey/:params');
	});
	this.resource('quality', function () {
		this.resource('quality.monitorings', {
			path: "/monitorings"
		});
		this.resource('quality.voiceMonitorings', {
			path: "/voiceMonitorings"
		});
		this.resource('quality.scMonitorings', {
			path: "/scMonitorings"
		});
		this.resource('quality.rendomizings', {
			path: "/rendomizings"
		});
		this.resource('quality.rendomizers', {
			path: "/rendomizers"
		});
		this.resource('quality.gccMonitorings', {
			path: "/gccMonitorings"
		});
		this.resource('quality.qltymonitorings', {
			path: "/qltymonitorings"
		});
		this.resource('quality.qltyobserves', {
			path: "/qltyobserves"
		});
		this.resource('quality.sheetUploads', {
			path: "/sheetUploads"
		});
	});

	this.resource('complaints', function () {
		/*this.resource('management', function(){
		    this.route('entry');
		}*/
		this.route('managements');
		this.route('registrations');
		this.route('trackings');
	});
	this.resource('accalations', function () {
		/*this.resource('management', function(){
		    this.route('entry');
		}*/
		this.route('managements');
		this.route('registrations');
	});

	/*this.resource('dashboards', function() {
		this.resource('admin', {path: '/:admin_id'}, function() {
	    });
	    this.resource('regions', {path: '/:region_id'}, function() {
	        this.route('areas');
	        this.route('territories');
	    });
	    this.resource('areas', {path: '/:area_id'}, function() {
	        this.route('territories');
	    });
	    this.resource('territories', {path: '/:territory_id'}, function() {
	    });
	});*/
	/*, function(){
	       this.route('usersinfo', { path:'/:user_id' });
	       this.resource('user', { path:'/:user_id' });
	    }*/
	this.resource('rendomizings');
	this.resource('rendomizers');
	this.resource('agents');
	this.resource('voiceMonitorings');
	this.resource('agentinbounds');


	this.resource('forceLogouts');
	this.resource('tlStatusViews');
	this.resource('scMonitorings');
	this.resource('gccMonitorings');
	this.resource('qltyobserves');
	this.resource('rptagentmonitorings');
	this.resource('rptagententerings');
	this.resource('agenttickets');

	this.resource('setups');

	// this.resource('roles');//roles
	// this.resource('employees');
	// this.resource('users');
	// this.route('usersinfo');
	//Ember.Object.create(accessesJS) 

	// accessesJS.forEach(function (item) {
	// 	var child = accessesJS.filter(function (object) {
	// 		return object["module_id"] === item.id;
	// 	});
	// 	//var child = accessesJS.findBy("module_id", item.id);
	// 	if (child.length > 0) {
	// 		router.resource(item.route, function () {
	// 			var croute = this;
	// 			child.forEach(function (citem) {
	// 				var gchild = accessesJS.filter(function (object) {
	// 					return object["module_id"] === citem.id;
	// 				});
	// 				if (gchild.length <= 0) {
	// 					croute.route(citem.route)
	// 				} else {
	// 					croute.resource(citem.route, function () {
	// 						var groute = this;
	// 						gchild.forEach(function (gitem) {
	// 							groute.route(gitem.route)
	// 							// groute.resource(gitem.link, {
	// 							// 	path: "/" + gitem.route
	// 							// });
	// 						});
	// 					});
	// 				}
	// 			});
	// 		});
	// 	}
	// 	// console.log(router);

	// });
	telenor.advanceReadiness();

});
// console.log();
// console.log('App.riteAccessModule');
// console.log(accessModules);
// telenor.deferReadiness();

// simulateAjax(function (data) {
// 	//App.MenuController.set("content", data);
// 	telenor.Router.map(function () {
// 		var router = this;
// 		data.forEach(function (item) {
// 			router.route(item.route);
// 		});
// 	});
// 	telenor.advanceReadiness();
// });
// function simulateAjax(func) {
// 	setTimeout(function () {
// 		func(data);
// 	}, 300);
// }
telenor.Router.reopen({
	location: 'history',
	//rootURL: '/abacus/index.php',
	doSomethingOnUrlChange: function () {
		//  console.log("this.get('url')");
	}.on('didTransition')
});
Ember.LinkView.reopen({
	//Ember.LinkComponent.reopen({
	attributeBindings: ['data-toggle', 'role', 'data-module']
});
