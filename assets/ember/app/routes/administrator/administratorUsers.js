telenor.AdministratorUsersRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'administratorUsers',

	pageSize: 20,
	pageNumber: 1,
	totalU: 0,
	// renderTemplate:function(){ this.render('users'); },
	// renderTemplate: function() { this.render({ outlet: 'user'}); },
	// moduleLoaded: false,
	// beforeModel: function() {
	//     var self = this;
	//     var appCtrl = this.controllerFor("application");

	//     if (appCtrl.isModuleLoaded("Users")) {
	//         console.log("module 'Users' already loaded, skipping model hook");
	//         self.set("moduleLoaded", true);
	//     } else {
	//         console.log("loading module 'Users'...");
	// 	}
	// 	//if(Em.isEmpty(this.get('module').findBy("link", "administrator.users"))){
	//     //    this.transitionTo('/');
	//     //}
	// 	//this.transitionToAnimated('users/usersinfo', {usersinfodata: 'slideLeft'});
	// },
	model: function () {
		var _self = this;
		var isLoaded = _self.get("moduleLoaded");
		if (!isLoaded) {
			return _self.store.find('users', {
				limit: 1,
				page: 1,
				from: 'main'
			});
		}
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		// if (model !== undefined) {
		//     controller.set("user", model);
		//     console.log(model);
		// }

		//var appCtrl = this.controllerFor("application");
		// var tabs = appCtrl.get("tabs");

		// var result = tabs.findBy("name", "Users");
		// if (result === undefined) {
		//     var profileTab = telenor.Tab.create({
		//         name: "Users",
		//         target: "administrator.users"
		//     });
		// 	tabs.addObject(profileTab);
		// 	appCtrl.send("setActiveTab", "Users");
		// } else {
		//    // appCtrl.send("setActiveMenu", "users");
		//     appCtrl.send("setActiveTab", "Users");
		// }

		var isLoaded = this.get("moduleLoaded");
		if (!isLoaded) {
			controller.set('roles', this.store.find('roles'));
			controller.set('reportings', this.store.find('reportings'));
			//console.log(model.get("length"));
			controller.set('userCount', model.get("length"));
			this.store.find('domains', {
				parent_id: 1,
				//include: 'parent'
			}).then(function (area) {
				controller.set('cities', area);
			});
			this.store.find('departments').then(function (rec) {
				controller.set('allDepartments', rec);
				controller.get('departments').clear();
				rec.forEach(function (item, index, enumerable) {
					// console.log(item);
					if (parseInt(item.get('parent_id')) == 0) {
						controller.get('departments').pushObject(item);
					}
				});
			});
		}
		//console.log("al");
	},
	totalUsers: function () {
		return this.get("model.length");
	}.property('@each'),
	actions: {
		selectPage: function (number) {
			this.controllerFor("administratorUsers").set('page', number);
			//this.set('page', number);
		},
		searchUsers: function (search) {
			var _self = this;
			var _store = this.store;
			_store.find('users', {
				limit: 1,
				page: 1,
				from: 'main',
				search: search
			}).then(function (ba) {
				_self.set('model', ba);
				_self.controllerFor('administratorUsers').set('model', ba);
			});
		},
		findDuplicate: function () {
			var _self = this;
			var _controller = _self.controllerFor("administratorUsers");
			var _login = _controller.get('user.login');
			console.log(_controller.get('user.login'));
			if (typeof _controller.get('user.login') === 'undefined' || _controller.get('user.login') == '') {
				_self.get('common').showNotification('error', '<b>Enter Login ID !</b>');
				return;
			}
			Em.$.ajax({
				url: 'api/users_api/verifyLogin?format=json',
				type: 'GET',
				data: {
					login_id: _controller.get('user.login')
				},
				success: function (data, textStatus, xhr) {
					if (data.users == null) {
						_controller.set('editMode', false);
						_controller.set('user', {
							id: 0,
							role_id: '',
							name: '',
							login: _login,
							password: '',
							reporting_id: '',
							area_id: '',
							territory_id: ''
						}); // alert('Null Data');

					} else {
						_controller.set('editMode', true);
						_controller.set('user', data.users);
						_self.get('common').showNotification('warning', '<b>User already exist!</b>');
						return;
						//alert('not null Null Data');	
					}
					//_controller.set('agentsData', data);
					//console.log(data);

				}
			});
		},
		save: function (user) {
			var _self = this;
			console.log(user);
			/*user:{
		  		id:0,
		  		role_id:'',
		  		name:'',
		  		login:'',
		  		password:'',
		  		reporting_id:'',
		  		area_id:'',
		  		territory_id:''

		  	},*/
			if (typeof user.login === 'undefined' || user.login == '') {
				_self.get('common').showNotification('error', '<b>Enter Login username !</b>');
				return;
			} else if (typeof user.name === 'undefined' || user.name == '') {
				_self.get('common').showNotification('error', '<b>Enter user name !</b>');
				return;
			} else if (typeof user.password === 'undefined' || user.password == '') {
				_self.get('common').showNotification('error', '<b>Enter user password !</b>');
				return;
			} else if (typeof user.role_id === 'undefined' || user.role_id == '') {
				_self.get('common').showNotification('error', '<b>Select a role !</b>');
				return;
			}
			if (typeof user.reporting_id === 'undefined' || user.reporting_id == '') {
				_self.get('common').showNotification('error', '<b>Select a Reporting !</b>');
				return;
			}
			console.log(user.reporting_id);
			/*return ;
		   user = {
	        	id:Ember.$('#idUsers').val(),
	        	name:Ember.$('#nameUsers').val(),
	        	login:Ember.$('#loginUsers').val(),
	        	password:Ember.$('#passwordUsers').val(),
	        	role_id:Ember.$('#roleUsers').val(),
	        	reporting_id:Ember.$('#userUsers').val()
	        };*/
			console.log(user);
			//return;
			this.store.unloadAll('user');
			var newUser = this.store.createRecord('user', user);
			newUser.save().then(function () {
				Ember.$("#showUserAddEditModel").modal("hide");
				_self.get('common').showNotification('success', '<b>user saved successfully !</b>');
				_self.refresh();
			});
			//this.transitionToRoute('users');
		},

		delete: function (uid) {
			user = {
				id: uid.get('id'),
				active: 'N',
				deleted: '1'
			};
			//return;
			var _self = this;
			this.store.unloadAll('user');
			var newUser = this.store.createRecord('user', user);
			newUser.save().then(function () {
				_self.refresh();
				_self.get('common').showNotification('error', '<b>user deleted successfully !</b>');
			});
			//  var controller = this.get('controller');
			//  this.get('controller').send('userEdit', id);
		},
		edit: function (uid) {

			//this.get('controller').send('editUser', uid);
			//this.controllerFor('user').set('model', uid);
			//var user = this.store.createRecord('user', {
			//	id: uid.get('id'),
			//	name: uid.get('name'),
			//	login:uid.get('login')
			// });
			//Ember.$('#nameUsers').val(uid.get('name'));
			//Ember.$('#loginUsers').val(uid.get('login'));
			//Ember.$('#passwordUsers').val(uid.get('password'));
			//Ember.$('#roleUsers').val(uid.get('role_id'));

			console.log(uid);
			console.log(uid.get('id'));
			console.log(uid.get('name'));
			console.log(uid.get('user_name'));
			//    telenor.user.create(uid);
			return;

			val = this.store.getById('users', uid);
			console.log(val.get('id'));
			console.log(val.get('name'));
			console.log(val.get('user_name'));


			/* var singleUser = this.store.filter(function(user) {
		    	return user.get('id') = uid;
		    });
            console.log(singleUser);

            this.store.forEach(function(item) {
			    //var name = item.name; // <--returns "undefined"
			    console.log(item.get('id'));
			   // name += "!";
			   // formattedNames.push(name);
			 });
			//console.log(this.getUser(uid));
           // var us = this.get('controller').send('getUser', uid);
           // console.log(us);
			
            var mod  = this.users.find(uid);
            console.log(mod);
            var store = this.store;
            var usrStr = store.filter('user',uid);*/
			/*.then(function(user){
             
            	console.log(user.get('user_name'));
                console.log(user.get('role_id'));
            }.bind(this), function(error){
		        console.log('error', error);
		    });

            console.log(usrStr);
            console.log(usrStr.get('content'));
            console.log(usrStr.get('role_id'));*/

			//   var userModel = this.get('model');
			//  console.log(userModel);
			/*userData = this.store.find('user',uid);
			console.log(userData.get('id'));
			console.log(userData.get('role_id'));
			console.log(userData);*/
			// 
			return false;
		}
	},


});
