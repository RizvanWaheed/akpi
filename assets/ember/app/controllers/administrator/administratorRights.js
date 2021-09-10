telenor.AdministratorRightsController = Ember.Controller.extend({
	needs: ["application"],
	//	pageName:'Rights',
	//	sortPropert: ['name'],
	//  sortAscending: true,	 // false = descending
	// users:Ember.A(),
	/*selectedRolesAccess:'',
	selectedUsersAccess:'',*/
	rights: {
		role_id: '',
		center_id: '',
		users: ''
	},
	accessList: '',
	useraccess: Ember.A(),
	users: (function () {
		if (Em.isEmpty(this.get('rights.role_id')) && Em.isEmpty(this.get('rights.center_id'))) return false; //
		return this.store.find('users', {
			search: this.get('rights')
		});
	}).property('rights.role_id', 'rights.center_id'),
	accessListFunc: function () {
		if (Em.isEmpty(this.get('rights.users'))) return false;
		var self = this;
		//return self.buildTree(self.store.find('rights',{user_id:this.get('selectedUsersAccess')}),1);
		self.get('common').showLoader();
		/*Em.$.isLoading({
            text: '',
            tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
            //  position:   "overlay"
        });*/
		//self.store.unloadAll('rights')
		self.store.find('rights', {
			user_id: this.get('rights.users')
		}).then(function (elements) {
			//aa = self.buildTree(elements, 1);		
			//console.log(elements);
			//console.log(self.buildTree(elements, 1));
			self.set('accessList', self.buildTree(elements, 0));
			self.get('common').hideLoader();
			//Ember.$.isLoading("hide");
		});


	}.observes('rights.users'),
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
			//	console.log(element.get('data').campiagn_id);
			return element.get('campiagn_id') == parentId;
		});
		console.log(parents);
		if (parents.length > 0) {
			parents.forEach(function (item, index, enumerable) {
				console.log(item.get('data'));
				children = _self.buildTree(elements, item.get('id'));
				if (!Em.isEmpty(children)) {
					branch.push({
						id: item.get('id'),
						campiagn_id: item.get('campiagn_id'),
						name: item.get('name'),
						status: parseInt(item.get('status')),
						isChecked: item.get('isChecked'),
						children: children
					});
				} else {
					branch.push({
						id: item.get('id'),
						campiagn_id: item.get('campiagn_id'),
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
			return element.campiagn_id == parentId;
		});
		if (parents.length > 0) {
			parents.forEach(function (item, index, enumerable) {
				children = _self.buildTree2(elements, item.id);
				if (!Em.isEmpty(children)) {
					branch.push({
						id: item.id,
						campiagn_id: item.campiagn_id,
						name: item.name,
						status: parseInt(item.status),
						isChecked: (parseInt(item.status) == 1) ? true : false,
						children: children
					});
				} else {
					branch.push({
						id: item.id,
						campiagn_id: item.campiagn_id,
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
telenor.AdministratorAccessController = Ember.ObjectController.extend({
	//	need:['rights'],

	action: {

	}

});
