telenor.AdministratorUsersController = Ember.ArrayController.extend(Ember.PaginationMixin, {
	needs: ["application"],
	pageName: 'administratorUsers',
	sortProperties: ['name'],
	sortAscending: true, // false = descending
	doJob: '',
	page: 1,
	perPage: 40,
	seperator: '…',
	countOut: 1,
	countIn: 1,
	editMode: true,
	user: {
		id: 0,
		role_id: '',
		name: '',
		login: '',
		password: '',
		reporting_id: '',
		area_id: '',
		territory_id: ''

	},
	search: {
		name: '',
		login: '',
		role_id: '',
		reporting_id: '',
		area_id: ''
	},
	selectPage: function (number) {
		this.set('page', number);
	},
	toggleOrder: function () {
		this.toggleProperty('sortAscending');
	},

	totalUsers: function () {
		return this.get("model.length")
	}.property('@each'),
	getUser: function (uid) {
		var singleUser = this.filter(function (user) {
			return user.get('id') = uid;
		});
		return singleUser;
	}.property('@each.id'),
	cities: Ember.A(),
	departments: Ember.A(),
	actions: {
		searchKeyUp: function (val, e) {
			//alert(val); alert(e.which); alert(e.key); 			/*e.which == 13 || */
			if ((e.key == 'Enter')) { //(val != '' && val > 9999) && 
				this.send('findDuplicate');
			}
			//else if(e.which == 13 || e.key == 'Enter'){
			//this.send('resetConsultation');
			//this.set('receptionClient',val);
			//}
		},
		searchFocusOut: function () {
			//if(this.get('user.login') != '' && parseInt(this.get('user.login')) > 1785){
			this.send('findDuplicate');
			//}
			//else{
			//this.send('resetConsultation');
			//}
		}
	} /**/

});
telenor.AdministratorUserController = Ember.ObjectController.extend({
	need: ['users', 'roles'],
	current_id: '',
	/*action:{
		showData : function(){
			console.log("we have done");
		},
		saveUser: function(){
		
			var newUser = this.store.createRecord('user',{
				name: this.get('name'),
				login: this.get('login'),
				password: this.get('password'),
				role_id: this.get('role_id'),
			});
			newUser.save();	
		//	this.transitionToRoute('posts');
		},
		editUser:function(user){
			console.log("I am in controller"); return;
			this.set('current_id',id);
			var userModel = this.get('model');
			this.store.find('users',id);
			console.log("I am in edit");
			return false;
	
		},
		deleteUser:function(){
			// this tells Ember-Data to delete the current user
		    this.get('model').deleteRecord();
		    this.get('model').save();
		    // then transition to the users route
		    this.transitionToRoute('users');
		    return false;
		}
	}*/


});
