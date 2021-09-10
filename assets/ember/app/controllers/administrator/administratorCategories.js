telenor.AdministratorCategoriesController = Ember.ArrayController.extend({
	needs: ["application"],
	pageName:'administratorCategories',
	sortProperties: ['name'],
    sortAscending: true,	 // false = descending
    current_id:'',
    Category:{
    	id:0,
    	name:'',
    	category_level:0
    },
	totalCategories:function(){
		return this.get("model.length")
	}.property('@each'),
	getCategory:function(uid){
		var singleCategory = this.filter(function(role) {
	    	return role.get('id') = uid;
	    });
	    return singleCategory;
	}.property('@each.id'),
	

});
telenor.AdministratorCategoryController = Ember.ObjectController.extend({
	need:['categories']
});
