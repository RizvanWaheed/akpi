telenor.AdministratorUserRoute = Ember.Route.extend(telenor.SecureRoute, {
	model:function(params){
		//return users.findBy('id', params.post_id);
		return this.store.find('user',params.user_id);
	}

});