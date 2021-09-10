telenor.AdministratorRolesController = Ember.ArrayController.extend({
	needs: ["application"],
	pageName:'administratorRoles',
	columns:[
		{ "sClass": "item", "sTitle" : "ID",  "mData": "id" },//
		{ "sClass": "item", "sTitle" : "Name", "mData": "name" }, //
		{ "sClass": "item", "sTitle" : "Action", "mData": null, "bSearchable": false, "bSortable": false, "mRender": function ( data, type, full ) {
			return '<a href="#/user/' + full.id + '/">View Details</a>';
		  }
		}
	],
	link:'api/Datatables/roles',
	data:'',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    current_id:'',
    role:{
    	id:0,
    	name:''
    },
	totalRoles:function(){
		return this.get("model.length")
	}.property('@each'),
	getRole:function(uid){
		var singleRole = this.filter(function(role) {
	    	return role.get('id') = uid;
	    });
	    return singleRole;
	}.property('@each.id'),
	

});
telenor.AdministratorRoleController = Ember.ObjectController.extend({
	need:['administratorRoles']
});
