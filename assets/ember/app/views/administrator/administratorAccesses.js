telenor.AdministratorAccessesView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
  templateName: 'administrator/accesses',
	//login:'1234',
	//role:'abs',

	didInsertElement: function(){
		var controller = this.get("controller.controllers.application");

		 controller.send("setActiveTab", "Accesses");
		 controller.send("setActiveMenu", "administrators.accesses");

    $(function () {
      Ember.$('input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
      });
      Ember.$(".select2").select2();
    });
    /*$(function () {
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });
    });*/
  },

	actions: {
		getRole:function(uid){
			var singleRole = this.filter(function(role) {
		    	return role.get('id') = uid;
		    });
		    return singleUser;
		}.property('@each.id'),
        edit: function(uid){
        	
        	Ember.$('#nameRoles').val(uid.get('name'));
        
          //  this.set('name',uid.get('name'));
          //  this.set('login',uid.get('login'));
            //this.set('name',uid.get('name'));
          //  this.set('role_id',uid.get('role_id'));



         //    telenor.user.create(uid);
            return;
        }
    }

});
