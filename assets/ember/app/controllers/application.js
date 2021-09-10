telenor.ApplicationController = Ember.Controller.extend(Ember.Evented, {
	project: '',
	campaign: '',
	subcampaign: '',
	/*needs:['pubnub:main'],
    channel: 'rizwan-waheed',
    new_message: 'Welcome',
    user_id: iMyMeJS.id,
    // Ember Dynamic collection for messages list (live-updates the view)
    messages: Ember.ArrayProxy.create({ content: Ember.A(['Welcome to The Careem Call center']) }),
    // Ember Dynamic collection for user list (live-updates the view)
    users: Ember.ArrayProxy.create({ content: Ember.A([]) }),
  
    init: function() {
        var pn   = this.get('pubnub');   // PubNub service instance
        var chan = this.get('channel');  // channel name
        var self = this;                 // reference to 'this' for callbacks
        // Subscribe to the Channel
        pn.emSubscribe({ channel: chan });
        // Register for message events
        pn.on(pn.emMsgEv(chan), function(payload){
            self.get('messages').pushObject(payload.message);
        });
        // Register for presence events
        pn.on(pn.emPrsEv(chan), function(payload){
            self.get('users').set('content', pn.emListPresence(chan));
        });
         // Pre-Populate the user list (optional)
        pn.emHereNow({ channel: chan });
        // Populate message history (optional)
        pn.emHistory({ channel: chan, count: 500 });
	},*/
	//////////////////////////////////////// Start Tab UI //////////////////////////////////////////////////
	currentPathChange: function () {
		//console.log('Current Path Change Its working')
		// var currentPath = this.get("currentPath");
		// var isPrint = currentPath ? currentPath.indexOf("print") === 0 : false;
		// this.set("isPrint", isPrint);
	}.observes('currentPath').on("init"),

	appName: "AbacusKpiSystem",
	appCite: "",
	tabs: null,
	isModuleLoaded: function (moduleName) {
		var tabs = this.get("tabs");
		if (tabs !== null) {
			var target = tabs.findBy("id", moduleName);
			return target !== undefined;
		}

		return undefined;
	},
	//////////////////////////////////////// End Tab UI //////////////////////////////////////////////////
	_tick: null,

	tick: function () {
		var that = this;
		Ember.run.later(function () {
			that.set('_tick', new Date());
		}, 1000);
	}.observes('_tick').on('init'),
	lastActiveTimeFromNow: function () {
		var duration;
		if (telenor.lastActiveTime) {
			duration = moment().diff(moment(telenor.lastActiveTime));
			return moment.utc(duration).format("HH:mm:ss");
		}
		return "Just now";
	}.property('_tick'),

	applicationURL: 'careem/api/users_api/',
	iMyMe: '',
	logout: true,
	isAdmin: true,
	isAgent: false,
	//modules:Ember.A(),
	currentStatus: 'Working',
	alreadyLogin: false,
	breakTime: '00:00:00',
	loginTime: '00:00:00',
	copyRightYear: '',
	userName: '',
	notify: [],
	notifications: false,
	notificationCount: 0,

	role: 0,
	isCloseable: false,
	isManagement: false,

	conditionYesNo: [{
		id: 1,
		name: 'Yes'
	}, {
		id: 0,
		name: 'No'
	}],
	conditionYesNoSelect: [{
		id: 1,
		name: 'Yes'
	}, {
		id: 0,
		name: 'No'
	}, {
		id: '',
		name: 'Select...'
	}],
	conditionPromptedUnprompted: [{
		id: 1,
		name: 'Unprompted'
	}, {
		id: 0,
		name: 'Prompted'
	}],
	conditionCallStatus: [{
			id: 1,
			name: 'Success Full'
		}, {
			id: 2,
			name: 'Wrong Number'
		}, {
			id: 4,
			name: 'Unsuccess Full'
		}, {
			id: 3,
			name: 'Call Drop'
		},
		{
			id: 5,
			name: 'Number Busy'
		}, {
			id: 6,
			name: 'No Answar/ Switch off'
		}, {
			id: 7,
			name: 'Scheduled Call Back'
		}, {
			id: 8,
			name: 'Not Interested'
		},
		{
			id: 9,
			name: 'Dead on Arrival'
		}, {
			id: 10,
			name: 'Original Customer N/A'
		}, {
			id: 11,
			name: 'Customer Busy'
		}
	],
	conditionAidedUnaided: [{
		id: 1,
		name: 'Aided'
	}, {
		id: 0,
		name: 'Unaided'
	}],
	conditionAidedUnaidedSelect: [{
		id: 1,
		name: 'Aided'
	}, {
		id: 0,
		name: 'Unaided'
	}, {
		id: '',
		name: 'Select...'
	}],
	enabledDisabled: [{
		id: 'Enabled',
		name: 'Enabled'
	}, {
		id: 'Pending',
		name: 'Pending'
	}, {
		id: 'Suspended',
		name: 'Suspended'
	}],
	//chatNotificationNum:0,
	chatNotificationDisplay: false,
	chatNotificationBit: null,
	chatNotification: Ember.A(),

	chatNotificationNum: (function () {
		var a = this.get('chatNotification').length;

		if (a >= 1) {
			this.set('chatNotificationDisplay', true);
		} else {
			this.set('chatNotificationDisplay', false);
		} //, 'chatNotificationBit'
		return a;
	}).property('chatNotification'),
	buildTreeOldee: function (elements, parentId) {
		var _self = this;
		var branch = Ember.A();

		elements.forEach(function (item, index, enumerable) {
			if (item.get('module_id') == parentId) {
				//   setTimeout(
				children = _self.buildTree(elements, item.get('id'));
				if (!Em.isEmpty(children)) {
					branch.push({
						id: item.get('id'),
						link: item.get('link'),
						module_id: item.get('module_id'),
						name: item.get('name'),
						children: children
					});
				} else {
					branch.push({
						id: item.get('id'),
						link: item.get('link'),
						module_id: item.get('module_id'),
						name: item.get('name')
					});
				}
				//   , 4000);
			}
		})
		return branch;
	},
	stringToBoolean: function (string) {
		//console.log(string);
		if (!isNaN(string)) {
			return (string == 0) ? false : true;
		}
		//console.log(string.toLowerCase());
		switch (string.toLowerCase().trim()) {
			case "true":
			case "yes":
			case "1":
				return true;
			case "false":
			case "no":
			case "0":
			case null:
				return false;
			default:
				return Boolean(string);
		}
	},
	buildTree: function (elements, parentId) {
		var _self = this;
		var branch = Ember.A();
		var parents = elements.filter(function (element) {
			return element.get('module_id') == parentId;
		});
		if (parents.length > 0) {
			parents.forEach(function (item, index, enumerable) {
				children = _self.buildTree(elements, item.get('id'));
				if (!Em.isEmpty(children)) {
					branch.push({
						id: item.get('id'),
						link: item.get('link'),
						module_id: item.get('module_id'),
						name: item.get('name'),
						url: _self.stringToBoolean(item.get('url')),
						font: item.get('font'),
						children: children
					});
				} else {
					branch.push({
						id: item.get('id'),
						link: item.get('link'),
						module_id: item.get('module_id'),
						font: item.get('font'),
						url: _self.stringToBoolean(item.get('url')),
						name: item.get('name')
					});
				}
			});

		} else {
			branch = parents;
		}
		//console.log(branch);
		return branch;
	},
	menueDisplayData: (function () {
		var _self = this;
		var item = this.get('model.content');
		//var item = this.get('navigation-modules');

		console.log(this.get('model'));
		i = _self.buildTree(item, 1);
		console.log(i)
		return i;

	}).property('model'),

	actions: {
		onopen: function (socketEvent) {
			console.log('On open has been called!');
			if (socketEvent.origin === 'ws://localhost:8001') {
				console.log('On open for socket1 has been called');
			} else {
				console.log('On open for socket2 has been called');
			}
		},
		onmessage: function (socketEvent) {
			console.log('On message has been called!');
		},
		onclose: function (socketEvent) {
			console.log('On close has been called!');
		},
		onerror: function (socketEvent) {
			console.log('On error has been called! :-(');
		},
		setActiveTab: function (tabName) {
			// console.log("setActiveTab");
			// console.log(tabName);
			// console.log(this.tabs.get("content").length);

			if (this.tabs.get("content").length > 0) {
				for (i = 0; i < this.tabs.get("content").length; i++) {
					var item = this.tabs.objectAt(i);
					item.set("isActive", false);
				}
				//	console.log(tabName);
				var target = this.tabs.findBy("id", tabName);
				// console.log($(".tab-content div#" + tabName));
				if (target !== undefined) {
					target.set("isActive", true);
					$('#dashboard-tabs > li.active').removeClass("active");
					$('#dashboard-tabs > li#' + tabName).addClass("active");
					$(".tab-content div.active").removeClass("in active");
					$(".tab-content > [id*='" + tabName + "'] ").addClass(" in active ");
					//$(".tab-content div#" + tabName.decamelize()).addClass("in active");
				}
			}
		},
		activateTab: function (name) {
			// console.log("I m in show tab");
			// console.log(name);
			if (name == 9) {
				// $(".tab-content div.active").removeClass("in active");
				// $(".tab-content > [id*='" + name + "'] ").addClass(" in active ");
				$(".tab-content div.active").removeClass("in active");
				$('#dashboard-tabs > li.active').removeClass("active");
				$('#dashboard-tabs > li#' + name).addClass("active");
				$(".tab-content > [id*='" + name + "'] ").addClass(" in active ");
				this.get('common').consoleClear();
			}

		},
		closeTab: function (tabItem) {
			var self = this;
			var target = this.tabs.findBy("name", tabItem.name);
			if (target !== undefined) {
				this.tabs.removeObject(target);
				self.transitionToRoute('/');
				//this.send("setActiveTab", "Index");

			} else {
				//  console.log("tab item not defined!");
			}
		},
		setActiveMenu: function (target) {
			//$(".nav.navbar-nav li").each(function() {
			//    $(this).removeClass("active");
			//});

			//var $target = $(".nav.navbar-nav li#" + target);
			//$target.addClass("active");
		},


		// set up an Ember Action to publish a message
		publish: function () {
			this.get('pubnub').emPublish({
				channel: this.get('channel'),
				message: "[" + this.get('user_id') + "] " + this.get('new_message')
			});
			this.set('new_message', '');
		}
	}

	/*  {{view Ember.Select
	       contentBinding="controllers.application.users"
	       optionValuePath="content.id"
	       optionLabelPath="content.fullName"
	       selectionBinding="controllers.application.selectedUser"}}

	selected user: {{controllers.application.selectedUser.fullName}}*/
});
