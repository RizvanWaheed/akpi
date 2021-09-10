telenor.AdministratorRolesView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
  	templateName: 'administrator/roles',

	didInsertElement: function(){
		console.log("Im in function 2");
		var controller = this.get("controller.controllers.application");

		 controller.send("setActiveTab", "Roles");
		 controller.send("setActiveMenu", "administrators.roles");
	}

});
