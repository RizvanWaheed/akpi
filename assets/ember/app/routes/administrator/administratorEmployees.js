telenor.AdministratorEmployeesRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'administratorEmployees',
	
	pageSize: 20,
    pageNumber: 1,
    totalU:0,    
	//renderTemplate:function(){
	//	this.render('employees');
	//},
	//renderTemplate: function() {
  	//  this.render({ outlet: 'employee'}); 
 	//},
 	/*beforeModel: function() {
		if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "administrator.employees"))){
            this.transitionTo('/');
        }
		//this.transitionToAnimated('employees/employeesinfo', {employeesinfodata: 'slideLeft'});
    },*/
	model:function(){
		return this.store.find('employees',{limit:1,page:1});
		//var employeeJson2 = store.filter('employees').get('length');//store.all('employees').get('length');
       // var jsonCount    = employeeJson.get('length');
	},
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('roles', this.store.find('roles'));
		controller.set('reportings', this.store.find('reportings'));
		//console.log(model.get("length"));
		controller.set('employeeCount',model.get("length"));
		this.store.find('domains',{parent_id:1, include:'parent'}).then(function(area) {
            controller.set('cities', area);
        });
        this.store.find('departments').then(function(rec) {
            controller.set('allDepartments', rec);
            controller.get('departments').clear();
            rec.forEach(function(item, index, enumerable) {
               // console.log(item);
                if(parseInt(item.get('parent_id')) == 0){
                    controller.get('departments').pushObject(item);
                }
            });
        });
		//console.log("al");
	},
	totalEmployees:function(){
		return this.get("model.length");
	}.property('@each'),
	actions: {
		selectPage: function(number) {
			this.controllerFor('administratorEmployees').set('page', number);
		    //this.set('page', number);
		},
		save: function(employee){
			var _self = this;
			console.log(employee);
			/*employee:{
		  		id:0,
		  		role_id:'',
		  		name:'',
		  		login:'',
		  		password:'',
		  		reporting_id:'',
		  		area_id:'',
		  		territory_id:''

		  	},*/
			if(typeof employee.role_id === 'undefined' || employee.role_id == ''){
				_self.get('common').showNotification('error', '<b>Select a role !</b>'); return;
			}
			else if(typeof employee.name === 'undefined' || employee.name == ''){
				_self.get('common').showNotification('error', '<b>Enter employee name !</b>'); return;
			}
			/*else if(typeof employee.login === 'undefined' || employee.login == ''){
				_self.get('common').showNotification('error', '<b>Enter Login employeename !</b>'); return;	
			}
			else if(typeof employee.password === 'undefined' || employee.password == ''){
				_self.get('common').showNotification('error', '<b>Enter employee password !</b>'); return;	
			}*/
			if(typeof employee.reporting_id === 'undefined' || employee.reporting_id == ''){
				_self.get('common').showNotification('error', '<b>Select a Reporting !</b>'); return;
			}
			/*return ;
		   employee = {
	        	id:Ember.$('#idEmployees').val(),
	        	name:Ember.$('#nameEmployees').val(),
	        	login:Ember.$('#loginEmployees').val(),
	        	password:Ember.$('#passwordEmployees').val(),
	        	role_id:Ember.$('#roleEmployees').val(),
	        	reporting_id:Ember.$('#employeeEmployees').val()
	        };*/
	        //console.log(employee);
	        //return;
	        this.store.unloadAll('employee');
			var newEmployee = this.store.createRecord('employee',employee);
			newEmployee.save().then(function(){
				Ember.$("#showEmployeeAddEditModel").modal("hide");
				_self.get('common').showNotification('success', '<b>employee saved successfully !</b>');
				_self.refresh();
			});	
			//this.transitionToRoute('employees');
		},

        delete: function(uid){
        	employee = {
	        	id: uid.get('id'),
	        	active:'N',
	        	deleted:'1'
	        };
	        //return;
	        var _self = this;
	        this.store.unloadAll('employee');
			var newEmployee = this.store.createRecord('employee',employee);
			newEmployee.save().then(function(){
				_self.refresh();
				_self.get('common').showNotification('error', '<b>employee deleted successfully !</b>');
			});		
          //  var controller = this.get('controller');
          //  this.get('controller').send('employeeEdit', id);
        },
        edit: function(uid){

           	//this.get('controller').send('editEmployee', uid);
        	//this.controllerFor('employee').set('model', uid);
        	//var employee = this.store.createRecord('employee', {
	        //	id: uid.get('id'),
	       	//	name: uid.get('name'),
	       	//	login:uid.get('login')
	     	// });
        	//Ember.$('#nameEmployees').val(uid.get('name'));
        	//Ember.$('#loginEmployees').val(uid.get('login'));
        	//Ember.$('#passwordEmployees').val(uid.get('password'));
        	//Ember.$('#roleEmployees').val(uid.get('role_id'));

            console.log(uid);
            console.log(uid.get('id'));
            console.log(uid.get('name'));
            console.log(uid.get('employee_name'));
        //    telenor.employee.create(uid);
            return;

            val = this.store.getById('employees',uid);
            console.log(val.get('id'));
            console.log(val.get('name'));
            console.log(val.get('employee_name'));


           /* var singleEmployee = this.store.filter(function(employee) {
		    	return employee.get('id') = uid;
		    });
            console.log(singleEmployee);

            this.store.forEach(function(item) {
			    //var name = item.name; // <--returns "undefined"
			    console.log(item.get('id'));
			   // name += "!";
			   // formattedNames.push(name);
			 });
			//console.log(this.getEmployee(uid));
           // var us = this.get('controller').send('getEmployee', uid);
           // console.log(us);
			
            var mod  = this.employees.find(uid);
            console.log(mod);
            var store = this.store;
            var usrStr = store.filter('employee',uid);*/ /*.then(function(employee){
             
            	console.log(employee.get('employee_name'));
                console.log(employee.get('role_id'));
            }.bind(this), function(error){
		        console.log('error', error);
		    });

            console.log(usrStr);
            console.log(usrStr.get('content'));
            console.log(usrStr.get('role_id'));*/

         //   var employeeModel = this.get('model');
          //  console.log(employeeModel);
            /*employeeData = this.store.find('employee',uid);
            console.log(employeeData.get('id'));
            console.log(employeeData.get('role_id'));
            console.log(employeeData);*/
           // 
           return false;
        }
    },
	

});