telenor.ConnectionsChatroomsController = Ember.ArrayController.extend({
	needs: ["application"],
	messageText: null,
    messages: [],

	// chatRoomInputText: null,
	// chatRoomUserName: 'Testing',
	someFunction: function() {
		// this.send('closeSocket');
        // This will only close the socket1 connections
        // this.send('closeSocket', 'socket1');
    },
    actions: {
		buttonClicked: function() {
			// This would "emit" the chatRoomInputText to the server.
			// this.send('emit', this.get('chatRoomInputText'));
			
			//-------------------Start-----------------	
			//-------------------Way 2-----------------	
			// var inputText = this.get('chatRoomInputText'),
			// userName = this.get('chatRoomUserName');
  
			// This would "emit" a custom object through the websocket.
			// Note the argument true. It must be passed if you
			// want to send a custom object like this example.
			// this.send('emit', {text: inputText, user: userName}, true);

			//-----------------------------Start--------------------------	
			//-----------------------------Way 3--------------------------	
			// Note that socket1 is the key used in the socketConfigurations
            // property on the route.
            // this.send('emit', this.get('chatRoomInputText'), 'socket1');
		},
        onopen: function() {},
		// onopen: function(socketEvent) {
        //     if(socketEvent.origin === 'ws://localhost:8001') {
        //         console.log('On open for socket1 has been called');
        //     }
        //     else {
        //         console.log('On open for socket2 has been called');
        //     }
        // },
        onmessage: function(messageFromSocket) {
            this.get('messages').pushObject({text: messageFromSocket.data});
        },

        submitText: function() {
            this.send('emit', this.get('messageText'), true);
            this.set('messageText', null);
        }
	}
	
	//, messageText: null,
	// messages: [],

	// actions: {
	// 	onopen: function() {},

	// 	onmessage: function(messageFromSocket) {
	// 		this.get('messages').pushObject({text: messageFromSocket.data});
	// 	},

	// 	submitText: function(serverName) {
	// 		if(serverName) {
	// 			this.send('emit', this.get('messageText'), serverName, true);
	// 		}
	// 		else {
	// 			this.send('emit', this.get('messageText'), true);
	// 		}

	// 		this.set('messageText', null);
	// 	}
	// }


});
