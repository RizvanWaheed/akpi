telenor.AdministratorEmployeesController = Ember.ArrayController.extend(Ember.PaginationMixin,{
	needs: ["application"],
	pageName:'administratorEmployees',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
	doJob:'',
	page: 1,
	perPage: 40,
	seperator: '…',
	countOut:1,
	countIn:1,
  
  	employee:{
  		id:0,
  		role_id:'',
  		name:'',
  		/*login:'',
  		password:'',*/
  		reporting_id:'',
  		area_id:'',
  		territory_id:''

  	},
  	cities:Ember.A(),
	departments:Ember.A(),
    selectPage: function(number) {
    	this.set('page', number);
  	},
    toggleOrder: function() {
    	this.toggleProperty('sortAscending');
    },
	
    totalEmployees:function(){
		return this.get("model.length")
	}.property('@each'),
	getEmployee:function(uid){
		var singleEmployee = this.filter(function(employee) {
	    	return employee.get('id') = uid;
	    })	;
	    return singleEmployee;
	}.property('@each.id')	

});
telenor.PageController = Ember.ObjectController.extend({
  currentPage: Ember.computed.alias('parentController.page'),
  
  active: (function() {
    return this.get('number') === this.get('currentPage');
  }).property('number', 'currentPage')
});
telenor.AdministratorEmployeeController = Ember.ObjectController.extend({
	need:['employees','roles'],
    current_id:'',
	action:{
		showData : function(){
			console.log("we have done");
		},
		saveEmployee: function(){
		
			var newEmployee = this.store.createRecord('employee',{
				name: this.get('name'),
				login: this.get('login'),
				password: this.get('password'),
				role_id: this.get('role_id'),
			});
			newEmployee.save();	
		//	this.transitionToRoute('posts');
		},
		editEmployee:function(employee){
			console.log("I am in controller"); return;
			this.set('current_id',id);
			var employeeModel = this.get('model');
			this.store.find('employees',id);
			console.log("I am in edit");
			return false;
	
		},
		deleteEmployee:function(){
			// this tells Ember-Data to delete the current employee
		    this.get('model').deleteRecord();
		    this.get('model').save();
		    // then transition to the employees route
		    this.transitionToRoute('employees');
		    return false;
		}
	}/**/
	

});
