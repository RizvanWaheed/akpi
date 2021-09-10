telenor.deferReadiness();
telenor.Router.map(function () {
	var router = this;
	//router.resource("/");
	router.resource('index', {
		path: "/"
	});
	// router.resource('index', {
	// 	path: "/"
	// });
	// this.resource("index", {
	// 	path: "/:page"
	// });
	// this.resource("dashboard", {path: "/"}, function () {
	this.route('catchall', {
		path: '/index' //'*wildcard'
	});
	// 

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
	this.resource(
		"projects",
		// {
		// 	path: '/projects'
		// },
		function () {
			this.route("webpage", {
				path: "/:page",
			});
		}
	);

	this.resource("connections", function () {
		this.resource("chats", function () {
			this.resource("chat", {
				path: "/:uid",
			});
		});
		this.route("chatrooms"); //, function(){
		//	this.resource('connections.chat.rooms',{path: "/rooms"});
		//});
	});

	//Ember.Object.create(accessesJS)
	// console.log(accessesJS);
	accessesJS.forEach(function (item) {
		var child = accessesJS.filter(function (object) {
			return object["module_id"] === item.id;
		});
		//var child = accessesJS.findBy("module_id", item.id);
		if (child.length > 0) {
			router.resource(item.route, function () {
				var croute = this;
				child.forEach(function (citem) {
					var gchild = accessesJS.filter(function (object) {
						return object["module_id"] === citem.id;
					});
					if (gchild.length <= 0) {
						//croute.route(citem.route)
						croute.resource(citem.link, {
							path: "/" + citem.route,
						});
					} else {
						croute.resource(citem.route, function () {
							var groute = this;
							gchild.forEach(function (gitem) {
								// groute.route(gitem.route)
								groute.resource(gitem.link, {
									path: "/" + gitem.route,
								});
							});
						});
					}
				});
			});
			// } else {
			// 	router.resource(item.link, {
			// 		path: "/" + item.route,
			// 	});
		}
		//console.log(router);
	});
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
	location: "history",
	//rootURL: '/abacus/index.php',
	doSomethingOnUrlChange: function () {
		// console.log("this.get('url')");
	}.on("didTransition"),
});
Ember.LinkView.reopen({
	//Ember.LinkComponent.reopen({
	attributeBindings: ["data-toggle", "role", "data-module"],
});
