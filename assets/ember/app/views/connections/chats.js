telenor.ChatsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'chats',
	didInsertElement: function(){
      //	Ember.$('#commentArea').hide();
    },
	actions: {
		getUser:function(uid){
			var singleUser = this.filter(function(user) {
		    	return user.get('id') = uid;
		    });
		    return singleUser;
		}.property('@each.id'),
       
        reset:function(){
        	Ember.$('#idUsers').val(0);
        	Ember.$('#nameUsers').val('');
        	Ember.$('#loginUsers').val('');
        	Ember.$('#passwordUsers').val('');
        	Ember.$('#roleUsers').val(0);
        },
        save:function(){

        }
    }

});
