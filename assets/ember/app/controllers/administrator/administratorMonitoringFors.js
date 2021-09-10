telenor.AdministratorMonitoringForsController = Ember.ArrayController.extend({
	needs: ["application"],
	pageName:'administratorMonitoringFors',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    current_id:'',
    monitoringFor:{
    	id:0,
    	name:'',
    	category_level:0
    },
	totalMonitoringFors:function(){
		return this.get("model.length")
	}.property('@each'),
	getMonitoringFor:function(uid){
		var singleMonitoringFor = this.filter(function(role) {
	    	return role.get('id') = uid;
	    });
	    return singleMonitoringFor;
	}.property('@each.id'),
	

});
telenor.AdministratorMonitoringForController = Ember.ObjectController.extend({
	need:['roles']
});
