telenor.AdministratorCategoriesRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'administratorCategories',

	/*renderTemplate:function(){
		this.render('administrator.categories');
	},
	beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "administrator.categories"))){
            this.transitionTo('/');
        }
    },*/
	model: function () {
		var storing = this.store.find('categories');
		//	console.log(storing);
		return storing;
	},
	actions: {
		save: function (categorie) {
			var _self = this;
			console.log(category);
			if (typeof category.name === 'undefined' || category.name.trim() == '') {
				_self.get('common').showNotification('error', '<b>Enter Category Name !</b>');
				return false;
			}

			_self.get('common').showLoader();

			this.store.unloadAll('Category');
			var Categorying = _self.store.createRecord('categorie', categorie);
			categorieing.save().then(function () {
				_self.get('common').hideLoader();
			});
			return;

		},
		edit: function (categorie) {
			var _controller = this.controllerFor("administratorCategories");
			_controller.set('categorie', {
				id: categorie.get('id'),
				name: categorie.get('name'),
				category_level: categorie.get('category_level')
			});
		},
		reset: function () {
			var _controller = this.controllerFor("administratorCategories");
			_controller.set('categorie', {
				id: 0,
				name: '',
				category_level: ''
			});
		}
	}
});
