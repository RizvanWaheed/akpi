telenor.TeamleadStatusViewsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'teamlead/statusViews',
	  didInsertElement: function(){
    },
	  actions: {
        edit: function(uid){
        	/*var _controller = self.get('controller');
          _controller.set('tlStatusViewname',uid.get('name'));
          _controller.set('EmailDriveId',uid.get('id'));
          _controller.set('typeEmailDriver',uid.get('monitoring_for_id'));*/
        }
    }
});
