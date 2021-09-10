telenor.InactivityWarningComponent = Ember.Component.extend({

	active: false,
	inactiveTimeout: 2700000, // 15 min 450000,// 15 min 600000, // Amount of time before we redirect to the sign in screen - the session should have expired by this point. (20 minutes)
	warningTimeout: 9000, // Amount of time the user has to perform an action before the last keep alive fires - 30 seconds
	timeout: 447000, // 597000,          // 19.5 minutes. We want to be less than the 20 minute timeout to be sure the session is renewed.

	didInsertElement: function () {
		//if($('meta[name="in-development"]').attr('content')){ return; } // Uncomment and add a meta tag to your head if you want to avoid session timeout in development
		var context = this;

		var keepActive = function () {
			//console.log('I m in did keepAlive');
			if (context.active) {
				// Keep the session alive
				//console.log('I m in did keepAllive IF');
				$.ajax({
					url: javaScriptApplicationRoot + "/api/users_api/getMyStateLog"
				}).done(function (result) {
					//console.log('output is done');
					//console.log(result);
					//console.log(result.stats);
					//console.log(result.stats.get('firstObject').current);
					// Go inactive until the user moves the mouse or presses a key
					context.active = false;
					if (result.stats.get('firstObject').current == 'Break') {
						//console.log('I m in Break');
						context.active = true;
					}
					// The user now has another 20 minutes before the session times out
					// Restart the timer to keep the user logged in
					Ember.run.later(context, keepActive, context.timeout);


					// Set a timer to show a modal indicating the user is about to be logged out.
					Ember.run.debounce(context, context.show, context.timeout - context.warningTimeout);
					// Set a timer that will send the user to the login screen
					Ember.run.debounce(context, context.forceLogin, context.inactiveTimeout);

				});
			}
		};

		$(window).mousemove(function (e) {
			context.active = true;
			// Make sure the modal is hidden. This will cause the modal to hide if the user moves the mouse or presses a key.
			// Use debounce so we don't call it over and over again since this method is called from mousemove
			Ember.run.debounce(context, context.hide, 1000);
		});

		$(window).keypress(function (e) {
			context.active = true;
			// Make sure the modal is hidden. This will cause the modal to hide if the user moves the mouse or presses a key.
			context.hide();
		});
		// console.log('I m in didinsert in activity block');
		// The user has 5 minutes before they are logged out. We need to send a keep Active before then.
		Ember.run.later(context, keepActive, context.timeout);

	},

	forceLogin: function () {
		//console.log("i m in force login");
		window.location.href = javaScriptApplicationRoot + '/Abacus/login/true';
	},

	show: function () { // Warn the user that they will be logged out if we are inactive
		// console.log("i m in Show");
		if (this.active === false) { // Start countdown timer
			this.$('#loginTimeOut').modal('show');
		}
	},
	hide: function () {
		//  console.log("i m in Hide");
		if (this.$('#loginTimeOut'))
			this.$('#loginTimeOut').modal('hide');
	}

});
