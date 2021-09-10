telenor.ProjectsWebpageRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName: 'projectsWebpage',
	queryParams: 'page',
	model: function (params) {
		// return this.store.find('employees', {
		// 	limit: 1,
		// 	page: 1
		// });
		//var employeeJson2 = store.filter('employees').get('length');//store.all('employees').get('length');
		// var jsonCount    = employeeJson.get('length');
	},
	setupController: function (controller, model) {
		this._super(controller, model);




		// controller.set('roles', this.store.find('roles'));
		// controller.set('reportings', this.store.find('reportings'));
		// //console.log(model.get("length"));
		// controller.set('employeeCount', model.get("length"));
		// this.store.find('domains', {
		// 	parent_id: 1,
		// 	include: 'parent'
		// }).then(function (area) {
		// 	controller.set('cities', area);
		// });
		// this.store.find('departments').then(function (rec) {
		// 	controller.set('allDepartments', rec);
		// 	controller.get('departments').clear();
		// 	rec.forEach(function (item, index, enumerable) {
		// 		// console.log(item);
		// 		if (parseInt(item.get('parent_id')) == 0) {
		// 			controller.get('departments').pushObject(item);
		// 		}
		// 	});
		// });
		//console.log("al");
	},
	totalEmployees: function () {
		//return this.get("model.length");
	}.property('@each'),
	actions: {
		selectPage: function (number) {
			this.controllerFor('administratorEmployees').set('page', number);
		}
	}
});
