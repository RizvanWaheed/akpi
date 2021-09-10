telenor.DashboardView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'dashboard',
	
	didInsertElement: function(){
		/*Ember.$('#DashboardRegionDate').daterangepicker({
            format: 'YYYY-MM-DD',
            minDate: '2017-02-10',
            startDate: '2017-02-01',
            endDate: '2017-12-31'


        });*/
		Ember.$.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) { 
				iDelay  = (iDelay && (/^[0-9]+$/.test(iDelay))) ? iDelay : 250; 
			  	var $this = this, oTimerId; 
			  	var anControl = $( 'div.dataTables_filter input:text' ); 
			  	anControl.unbind( 'keyup' ).bind( 'keyup', function() { 
					var $$this = $this; 
					window.clearTimeout(oTimerId); 
					oTimerId = window.setTimeout(function() { 
				  		$$this.fnFilter( anControl.val() ); 
					}, iDelay); 
			  	}); 
			  	return this; 
		};

		/*Ember.$('#tatCategories').keypress(function(e) {
            var charCode = (e.which) ? e.which : e.keyCode;
            // Allow: backspace, delete, tab, escape, enter and .

            if ($.inArray(charCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A, Command+A
                (charCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
                 // Allow: home, end, left, right, down, up
                (charCode >= 35 && charCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            if ((e.shiftKey || (charCode < 48 || charCode > 57))) {
                e.preventDefault();
            }
            var a = Ember.$('#tatCategories').val().trim().toString().length
            if(a > 2) return false;
        });
        Ember.$('textarea#templateCategories').ckeditor({
            //config.extraPlugins = 'image';
            //fullPage: true,
            //allowedContent: true,
            height: '150px',
            toolbar: 'Full',
           // enterMode : CKEDITOR.ENTER_BR,
           // shiftEnterMode: CKEDITOR.ENTER_P
         // / *, extraPlugins :[ 'image, imagebrowser, imgupload, imagepaste' ],* /
            toolbar: [
                {name: 'document', items: ['Source']}, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                {name: 'basicstyles', items: ['Bold', 'Italic']},
                ['Copy', 'Paste', 'PasteFromWord', '-', 'Undo', 'Redo'], // Defines toolbar group without name.
                
            ]
        });*/
    },

	actions: {
		getRole:function(uid){
			var singleRole = this.filter(function(role) {
		    	return role.get('id') = uid;
		    });
		    return singleUser;
		}.property('@each.id'),
        edit: function(uid){
           	Ember.$('#nameCategories').val(uid.get('name'));
        	Ember.$('#idCategories').val(uid.get('id'));
        	Ember.$('#tatCategories').val(uid.get('tat'));
            Ember.$('#templateCategories').val(uid.get('template'));
        }
    }

});
