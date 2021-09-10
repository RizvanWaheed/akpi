telenor.MainView = Ember.View.extend({
    layoutName: 'layout',
    
    willAnimateIn : function () {//willAnimateOut
        this.$().css("opacity", 0);
    },
    animateIn : function (done) {
      this.$().fadeTo(500, 1, done);
         /* this.$().show("slide", { direction: "left" }, 1000);
          this.$().slideDown(1600);*/
    },
    animateOut : function (done) {
      this.$().fadeTo(800, 0, done);
       // this.$().slideUp(800, 0, done);
    },
		didInsertElement: function() {
			var controller = this.get("controller");

			$("#dashboard-tabs").on("show.bs.tab", function(e) {
					var moduleName = $(e.target).attr("data-module");
					var routeName = moduleName.decamelize();

					controller.transitionToRoute(routeName);

					// console.log(e.target);  // newly activated tab
					// console.log(e.relatedTarget);   // previous active tab
			});
		},
   /* willDestroyElement: function() {
      //var clone = this.$().clone();
     // this.$().parent().append(clone);
      //clone.fadeOut();
    },*/
    actions: {
        edit: function(id){
           // console.log('in edit');
           // this.get('controller').send('userEdit', id);
           
        },

        delete: function(){
          //  console.log('in delete');
          //  var controller = this.get('controller');

          //  this.get('controller').send('userEdit', id);
        }
    }
    
});
