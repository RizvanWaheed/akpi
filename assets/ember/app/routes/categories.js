telenor.CategoriesRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'categories',

	renderTemplate:function(){
		this.render('categories');
	},
	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "categories"))){
			this.transitionTo('/');
		}
		
    },*/
	model:function(){
		var storing = this.store.find('categories');
		return storing;
	},
	actions:{
		save: function(){
			// var category = this.get('model');
            //category.save();
            var self = this;
            if(Ember.$('#nameCategories').val().trim() == ''){
            	alert("Please enter Category");
            	return false;
            }
            self.store.unloadAll('category');
			var newCategory = this.store.createRecord('category',{
				name:Ember.$('#nameCategories').val(),
        	    id :Ember.$('#idCategories').val(),
        	    tat :Ember.$('#tatCategories').val(),
        	    template:AppCore.phpjs.base64_encode(Ember.$('#templateCategories').val()),
			});
			newCategory.save().then(function(){
					Ember.$('#nameCategories').val('');
					Ember.$('#tatCategories').val('');
        	        Ember.$('#idCategories').val(0);
        	        Ember.$('#templateCategories').val('');
					self.store.find('categories');
			});
			
		},
		delete:function(uid){
			// this tells Ember-Data to delete the current ategory
			var self = this.store;
		    self.unloadAll('category');
			var newCategory = self.createRecord('category',{
				status:0,
        	    id :uid.get('id')
			});
			newCategory.save().then(function(){
				self.find('categories');
			});
		}
	}/**/
});