telenor.ChatsRoute = Ember.Route.extend(telenor.SecureRoute, {
	controllerName:'chats',
	pageSize: 20,
    pageNumber: 1,
    visitedPage:Ember.A(),
    complainCount:0,
    number:0,
    searchUser:null,
   /* beforeModel: function() {
    	if(Em.isEmpty(this.controllerFor("application").get('modules').findBy("link", "chats"))){
			this.transitionTo('/');
		}
		
    },*/
  	model:function(){
		var chatUserJson = this.store.find('chatUsers');
		return chatUserJson;
	},
	setupController: function (controller, model) {
		var self = this;
		this._super(controller, model);
		
		this.set('searchUser','go');
		controller.set('model', model);
		self.reloadControllerModelM(controller);
  	},
  	reloadControllerModelM:function(controller){
  		var self = this;
 		if(Ember.isBlank(this.get('searchUser'))) {
  			Ember.run.cancel();
      	}else{
     		Em.run.later(function(){
     			self.store.find('chatUsers').then(function(rec){
		        	controller.set('model', self.store.all('chatUsers').get('content'));
		    	});
     			self.reloadControllerModelM(controller);
	    	}, 5000);
  		}
  	},
  	stopCollecting: function(){
  		this.set('searchUser', null);
    }.on('deactivate'),
    deactivate: function(){
    //	Em.run.cancel(this.get('chatingUsersLoop'));
	  //  console.log("I am deactivated");
	},
	activate: function(){
		var self = this;
		this.controllerFor("chats").set('broadCastMessage', this.controllerFor("application").get("isCloseable"));
		//self.controller.get('allValuesIsOneInTheAllNodes');
		//this.set('chatingUsersLoop', Em.run.later(function(){
     //			self.store.find('chatUsers').then(function(rec){
	//	        	self.controllerFor("Chats").set('model', self.store.all('chatUsers').get('content'));
//		    	});
//		    	 console.log("I am activated");
 //    			self.reloadControllerModelM(controller);
  //  	}, 5000));
	   
	},
	looping:function(){
     			self.store.find('chatUsers').then(function(rec){
		        	self.controllerFor("Chats").set('model', self.store.all('chatUsers').get('content'));
		    	});
		    	 console.log("I am activated");
     			//self.reloadControllerModelM(controller);
    },
	actions: {
		sendMessageAgent:function(){
			console.log('I m in agent');
			if($('#chatMessageAgent').val()=='')return false;
			var self = this;
        	chat = {
	        	message:Ember.$('#chatMessageAgent').val(),
	        	recd:'agent'
	        };
	    	var newChat = self.store.createRecord('chat',chat);
			newChat.save().then(function(){
				Ember.$('#chatMessageAgent').val('');
			});
        	return;

		},
		sendMessageLead:function(){
			console.log('I m in lead');
			if($('#chatMessageLead').val()=='')return false;
			var self = this;
        	chat = {
	        	message:Ember.$('#chatMessageLead').val(),
	        	recd:'lead'
	        };
	    	var newChat = self.store.createRecord('chat',chat);
			newChat.save().then(function(){
				Ember.$('#chatMessageLead').val('');
			});
        	return;
		},
	
       
    },
	

});