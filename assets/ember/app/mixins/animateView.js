telenor.AnimateView = Ember.Mixin.create({
	willAnimateIn: function () { //
		this.$().css("opacity", 0);
		//console.log('will animate in');
	},
	animateIn: function (done) {
		this.$().fadeTo(1000, 1, done);
		//this.$().show("slide", { direction: "left" }, 1000, done);
		//$('.content-wrapper').isLoading("hide");
		//this.$().slideDown(1800,1,done);
		//console.log('animate in');
	},
	didAnimateIn: function () {
		var _self = this; //
		// this.$().css("opacity", 1);			//
		//console.log('did animate in');
		if (this.get('media.isMobile')) {
			Ember.run.later(function () {
				_self.get('common').hideLoader();
				//$('.content-wrapper').isLoading("hide");
			}, 500);
		}
	},
	animateOut: function (done) {
		// 	this.$().slideUp(800, 0, done);
		this.$().fadeTo(1000, 0, done);
		//this.$().hide("slide", { direction: "left" }, 1000, done);
		// console.log('animate out');
	},
	willAnimateOut: function () { //
		//console.log('i am in will animate out');
		//console.log(this.get('media.isMobile'));
		_self = this;
		if (this.get('media.isMobile')) {
			_self.get('common').showLoader();
			// $('.content-wrapper').isLoading({
			// 	text: '',
			// 	tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="google-spin-wrapper"><div class="google-spin"></div></div></div></span>',
			// 	position: "overlay"
			// });
		}

		///console.log('will animate out');
	},
	didInsertElement: function () {
		//var controller = this.get("controller");
		// var controller = this.get("controller.controllers.application");
		// $("#dashboard-tabs").on("show.bs.tab", function(e) {
		// 		var moduleName = $(e.target).attr("data-module");
		// 		var routeName = moduleName.decamelize();

		// 		controller.transitionToRoute(routeName);

		// 		// console.log(e.target);  // newly activated tab
		// 		// console.log(e.relatedTarget);   // previous active tab
		// });

		//var controller = this.get("controller.controllers.application");

		//controller.send("setActiveTab", "Users");
		//controller.send("setActiveMenu", "administrators.users");

	}
	// ,
	// willInsertElement: function() {
	// 	console.log(this.$().css('width'));
	// },
	// didInsertElement: function() {
	// 	console.log(this.$().css('width'));
	// }
});
