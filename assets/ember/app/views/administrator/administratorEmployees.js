telenor.AdministratorEmployeesView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
    templateName: 'administrator/employees',
	//name:'aa',
	//login:'1234',
	//role:'abs',

	didInsertElement: function(){
     	console.log("Im in function 2");
    },

	actions: {
		getEmployee:function(uid){
			var singleEmployee = this.filter(function(employee) {
		    	return employee.get('id') = uid;
		    });
		    return singleEmployee;
		}.property('@each.id'),
		add: function(uid){
            this.get('controller').set('employee',{
                                                id:0,
                                                role_id:'',
                                                name:'',
                                                /*login:'',
                                                password:'',*/
                                                reporting_id:'',
                                                area_id:'',
                                                territory_id:''

                                            });
            Ember.$("#showEmployeeAddEditModel").modal("show");
            return;
        },
        edit: function(uid){
            this.get('controller').set('employee',{
                                                id:uid.get('id'),
                                                role_id:uid.get('role_id.id'),
                                                name:uid.get('name'),
                                               /* login:uid.get('login'),
                                                password:uid.get('password'),*/
                                                reporting_id:uid.get('reporting_id'),
                                                area_id:uid.get('area_id.id'),
                                                territory_id:uid.get('territory_id.id')

                                            });
        	Ember.$("#showEmployeeAddEditModel").modal("show");
        	
            return;
        },
        reset:function(){
        	this.get('controller').set('employee',{
                                                id:0,
                                                role_id:'',
                                                name:'',
                                               /* login:'',
                                                password:'',*/
                                                reporting_id:'',
                                                area_id:'',
                                                territory_id:''

                                            });
        }
    }

});
