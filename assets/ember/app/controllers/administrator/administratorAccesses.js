telenor.AdministratorAccessesController = Ember.Controller.extend({
	needs: ["application"],
	//	pageName:'Accesses',
	//	sortPropert: ['name'],
	//  sortAscending: true,	 // false = descending
	// users:Ember.A(),
	/*selectedRolesAccess:'',
	selectedUsersAccess:'',*/
	accesses: {
		form: 'access_form',
		role_id: '',
		area_id: '',
		users: ''
	},
	accessList: '',
	useraccess: Ember.A(),
	users: (function () {
		if (Em.isEmpty(this.get('accesses.role_id'))) return false; //&& Em.isEmpty(this.get('accesses.area_id'))
		return this.store.find('users', {
			search: this.get('accesses')
		});
	}).property('accesses.role_id', 'accesses.area_id'),
	accessListFunc: function () {
		if (Em.isEmpty(this.get('accesses.users'))) return false;
		var self = this;
		//return self.buildTree(self.store.find('accesses',{user_id:this.get('selectedUsersAccess')}),1);
		self.get('common').showLoader();
		/*Em.$.isLoading({
            text: '',
            tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            //  position:   "overlay"
        });*/
		//self.store.unloadAll('accesses')
		self.store.find('modules', {
			for: 'other',
			user_id: this.get('accesses.users')
		}).then(function (elements) {
			//aa = self.buildTree(elements, 1);		
			self.set('accessList', self.buildTree(elements, 1));
			self.get('common').hideLoader();
			//Ember.$.isLoading("hide");
		});


	}.observes('accesses.users'),
	userAccessListFunc: function () {
		if (Em.isEmpty(this.get('useraccess'))) {
			return false;
		} //console.log('aa1');
		var values = this.get('useraccess'); //console.log('aa2');
		aa = this.buildTree2(values, 1);
		this.get('accessList').clear();
		this.set('accessList', aa);
		self.get('common').hideLoader();
	}.observes('useraccess.[]'),
	/*medicationSelected: Ember.computed('consultationMedication.@each.status2', function() {
	    var todos = this.get('consultationMedication');
	    return todos.filterBy('status2', true);
    }),*/
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
						status: parseInt(item.get('status')),
						isChecked: item.get('isChecked'),
						children: children
					});
				} else {
					branch.push({
						id: item.get('id'),
						link: item.get('link'),
						module_id: item.get('module_id'),
						name: item.get('name'),
						status: parseInt(item.get('status')),
						isChecked: item.get('isChecked')
					});
				}
			});

		} else {
			branch = parents;
		}
		return branch;
	},
	buildTree2: function (elements, parentId) {
		var _self = this;
		var branch = Ember.A();
		var parents = elements.filter(function (element) {
			return element.module_id == parentId;
		});
		if (parents.length > 0) {
			parents.forEach(function (item, index, enumerable) {
				children = _self.buildTree2(elements, item.id);
				if (!Em.isEmpty(children)) {
					branch.push({
						id: item.id,
						link: item.link,
						module_id: item.module_id,
						name: item.name,
						status: parseInt(item.status),
						isChecked: (parseInt(item.status) == 1) ? true : false,
						children: children
					});
				} else {
					branch.push({
						id: item.id,
						link: item.link,
						module_id: item.module_id,
						name: item.name,
						status: parseInt(item.status),
						isChecked: (parseInt(item.status) == 1) ? true : false
					});
				}
			});

		} else {
			branch = parents;
		}
		return branch;
	},


});
// telenor.AdministratorAccessController = Ember.ObjectController.extend({
// 	//	need:['accesses'],

// 	action: {

// 	}

// });
