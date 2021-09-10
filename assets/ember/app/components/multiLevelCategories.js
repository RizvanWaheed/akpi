telenor.MultiLevelCategoriesComponent = Ember.Component.extend({
	saveURL:'',
	editURL:'',
	level:'',
	categories:Em.A(),

	// maxStars: 0,
	// starRating: 0,
	// starId:0,
    // stars: [],
    actions: {
        save: function(cat){
            //this.set('starRating', star.index);
            this.sendAction('action', cat);
		},
		delete: function(star){
            this.set('starRating', star.index);
            this.sendAction('action', cat);
		},
		view: function(star){
            this.set('starRating', star.index);
            this.sendAction('action', cat);
        }
    },
    // setRating: function() {
	// 	var _self = this;
    //     var stars = [];
    //     var starRating = this.get('starRating');
    //     for(var i = 0; i < this.get('maxStars'); i++){
    //         stars.pushObject(Em.Object.create({empty:i >= starRating, index:i+1, id:_self.get('starId')}));
    //     }
    //     this.set('stars', stars);
    // }.observes('starRating').on('didInsertElement')
});
