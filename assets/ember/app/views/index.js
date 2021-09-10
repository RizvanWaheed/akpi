telenor.IndexView = Ember.View.extend(telenor.AnimateView, { //{
	// touch gestures properties
	didInsertElement: function () {
		//console.log("Im in function ");
	},
	actions: {
		edit: function (id) {
			// console.log('in edit');
			// this.get('controller').send('userEdit', id);     
		},
		delete: function () {
			//  console.log('in delete');
			//  var controller = this.get('controller');
			//  this.get('controller').send('userEdit', id);
		}
	}
});
