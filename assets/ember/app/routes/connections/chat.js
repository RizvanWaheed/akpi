telenor.ChatRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'chat',
	destroy:true,
    uid:null,
  	model:function(params){
  		this.store.unloadAll('chats');
		var chatUserJson = this.store.find('chats', {uid:params.uid});
		this.set('uid',params.uid)
		return chatUserJson;
	},
	setupController: function (controller, model) {
		var self = this;
		this._super(controller, model);
		controller.set('chatSource', model);
		controller.set('chatUserHead',self.store.getById('chatUsers', this.get('uid')));
		self.reloadControllerModel(controller);
  	},
  	reloadControllerModel:function(controller){
  		var self = this;
 		if(Ember.isBlank(this.get('uid'))) {
  			Ember.run.cancel();
      	}else{
     		Em.run.later(function(){
     			self.store.find('chats', {uid:self.get('uid')}).then(function(rec){
		        	controller.set('chatSource', self.store.all('chats').get('content'));
		    	});
     			self.reloadControllerModel(controller);
	    	}, 5000);
  		}
  	},
  	stopCollecting: function(){
  		this.set('uid', null);
    }.on('deactivate'),
	actions: {
	    sendMessage:function(){
        	var self = this;
        	uid  = this.get('uid');
        	chat = {
	        	to_id:uid,
	        	message:Ember.$('#chatMessage').val(),
	        	recd:'single'
	        };
	    	var newChat = self.store.createRecord('chat',chat);
			newChat.save().then(function(){
				Ember.$('#chatMessage').val('');
			});
        	return;		
        }  
    },
	

});