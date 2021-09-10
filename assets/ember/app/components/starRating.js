telenor.StarRatingComponent = Ember.Component.extend({
    maxStars: 0,
	starRating: 0,
	starId:0,
    stars: [],
    actions: {
        click: function(star){
            this.set('starRating', star.index);
            this.sendAction('action', star.index, star.id);
        }
    },
    setRating: function() {
		var _self = this;
        var stars = [];
        var starRating = this.get('starRating');
        for(var i = 0; i < this.get('maxStars'); i++){
            stars.pushObject(Em.Object.create({empty:i >= starRating, index:i+1, id:_self.get('starId')}));
        }
        this.set('stars', stars);
    }.observes('starRating').on('didInsertElement')
});
