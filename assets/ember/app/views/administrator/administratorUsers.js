telenor.AdministratorUsersView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
    templateName: 'administrator/users',
	//name:'aa',
	//login:'1234',
	//role:'abs',

	didInsertElement: function(){
		 console.log("Im in function 2");
	//	 var controller = this.get("controller.controllers.application");

	//	 controller.send("setActiveTab", "Users");
	//	 controller.send("setActiveMenu", "administrators.users");
 
    },

	actions: {
		getUser:function(uid){
			var singleUser = this.filter(function(user) {
		    	return user.get('id') = uid;
		    });
		    return singleUser;
		}.property('@each.id'),
		add: function(uid){
            this.get('controller').set('editMode',true);
            this.get('controller').set('addEditUser', ' Add ');
            this.get('controller').set('user',{
                                                id:0,
                                                role_id:'',
                                                name:'',
                                                login:'',
                                                password:'',
                                                reporting_id:'',
                                                area_id:'',
                                                territory_id:''

                                            });
            Ember.$("#showUserAddEditModel").modal("show");
            return;
        },
        edit: function(uid){
            this.get('controller').set('editMode',false);
            this.get('controller').set('addEditUser', ' Edit ');
            this.get('controller').set('user',{
                                                id:uid.get('id'),
                                                role_id:uid.get('role_id.id'),
                                                name:uid.get('name'),
                                                login:uid.get('login'),
                                                password:uid.get('password'),
                                                reporting_id:uid.get('reporting_id.id'),
                                                area_id:uid.get('area_id.id'),
                                                territory_id:uid.get('territory_id.id')

                                            });
        	Ember.$("#showUserAddEditModel").modal("show");
        	
            return;
        },
        reset:function(){
            this.get('controller').set('editMode',true);
        	this.get('controller').set('user',{
                                                id:0,
                                                role_id:'',
                                                name:'',
                                                login:'',
                                                password:'',
                                                reporting_id:'',
                                                area_id:'',
                                                territory_id:''

                                            });
        }
    }

});
