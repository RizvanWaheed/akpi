telenor.MgmtaccalationsView = Ember.View.extend(telenor.AnimateView, { //telenor.MainView.extend({ 
	templateName: 'mgmtaccalations',

	/*willAnimateIn : function () {
	    this.$().css("opacity", 0);
	},
	animateIn : function (done) {
	   this.$().fadeTo(500, 1, done);
	    // this.$().show("slide", { direction: "left" }, 1000);
	    // this.$().slideDown(1600);
	},
	animateOut : function (done) {
	    this.$().slideUp(800, 0, done);
	},*/
	didInsertElement: function () {
		Ember.$('#commentArea').hide();

		var date = new Date();
		var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		Ember.$('#purchaseDate').datepicker({
			autoclose: true,
			format: 'yyyy-mm-dd',
			maxDate: new Date()
		});
		Ember.$(":file").filestyle({
			buttonName: "btn-default btn-flat",
			buttonText: "",
			icon: true,
			placeholder: "Attach Image or File",
			iconName: "fa fa-paperclip"
		});
		Ember.$('#seachTicketDate').datepicker({
			autoclose: true,
			format: 'yyyy-mm-dd',
			maxDate: new Date(),
			endDate: today,
			todayHighlight: true,
			autoclose: true
		});
		$('#seachTicketDate').datepicker('setDate', today);
		/* $('#technologistdate').datepicker({
		       format: "yyyy-mm-dd",
		       daysOfWeekDisabled: [0,6],
		       startDate: today,
		       todayHighlight: true,
		       autoclose: true
		  });
		  $('#technologistdate').datepicker('setDate', today);
		  $(".select2").select2();
		   //Timepicker
		  $(".timepicker").timepicker({
		    showInputs: false
		  });
		  Ember.$('.nav-tabs a:last').tab('show');*/
		//Ember.$.datepicker.formatDate('yyyy-mm-dd', dateTypeVar);
		/* Ember.$('textarea#descMgmtaccalation').ckeditor({
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
              //  ['Copy', 'Paste', 'PasteFromWord', '-', 'Undo', 'Redo'], // Defines toolbar group without name.
                
            ]
        });*/
		Ember.$('#phoneMgmtaccalation').keypress(function (e) {
			var charCode = (e.which) ? e.which : e.keyCode;
			// Allow: backspace, delete, tab, escape, enter and .

			if ($.inArray(charCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				// Allow: Ctrl+A, Command+A
				(charCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: home, end, left, right, down, up
				(charCode >= 35 && charCode <= 40)) {
				// let it happen, don't do anything
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (charCode < 48 || charCode > 57))) {
				e.preventDefault();
			}
			var a = Ember.$('#phoneMgmtaccalation').val().trim().toString().length
			if (a > 10) return false;
			// console.log( Ember.$('#phoneMgmtaccalation').val().trim().toString().length);
			// if(e.which == 13) {
			//if(Ember.$('#phoneMgmtaccalation').val().trim() != ''){
			//         Ember.$('#phoneMgmtaccalation').val().trim().toString().length;
			//  self.triggerAction({ action:'searchInfo', target:self});
			// }
			// }
		});
		Ember.$(function () {
			Ember.$(".select2").select2();
			console.log('Loaded');
			exportTableToCSV = function ($table, filename) {

				var $rows = $table.find('tr:has(td,th)'),


					tmpColDelim = String.fromCharCode(11),
					tmpRowDelim = String.fromCharCode(0),
					colDelim = '","',
					rowDelim = '"\r\n"',

					csv = '"' + $rows.map(function (i, row) {
						var $row = $(row),
							$cols = $row.find('td');

						return $cols.map(function (j, col) {
							var $col = $(col),
								text = $col.text();

							return text.replace('"', '""');
						}).get().join(tmpColDelim);

					}).get().join(tmpRowDelim)
					.split(tmpRowDelim).join(rowDelim)
					.split(tmpColDelim).join(colDelim) + '"',

					// Data URI
					csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
				//console.log(csv);
				Ember.$(this)
					.attr({
						'download': filename,
						'href': csvData,
						'target': '_blank'
					});
			}
		});
		Ember.$('#CategoryMgmtaccalations').click(function (e) {
			var self = this;
			console.log("I have clicked");
			// console.log(Ember.$('#catMgmtaccalation').val());
			// console.log(Ember.$('#catMgmtaccalation :selected').text());
			self.get('common').showLoader();

			Ember.$.ajax({
				url: 'api/users_api/printExcelSheet/count/?format=json',
				type: 'POST',
				data: {
					id: Ember.$('#catMgmtaccalation').val(),
					name: Ember.$('#catMgmtaccalation :selected').text()
				},
				success: function (data, textStatus, xhr) {
					//	console.log(data);
					window.open('data:application/vnd.ms-excel,' + encodeURIComponent(data));
					e.preventDefault();

					//var filename = Ember.$('#catMgmtaccalation :selected').text();
					//exportTableToCSV.apply(this, [$(data), filename+'.csv']);



					self.get('common').hideLoader();
				},
				error: function (xhr, textStatus, errorThrown) {
					alert('not found');
					self.get('common').hideLoader();
				}
			});
		});
	},
	keyDown: function (e) {},
	actions: {
		getUser: function (uid) {
			var singleUser = this.filter(function (user) {
				return user.get('id') = uid;
			});
			return singleUser;
		}.property('@each.id'),

		reset: function () {
			Ember.$('#idUsers').val(0);
			Ember.$('#nameUsers').val('');
			Ember.$('#loginUsers').val('');
			Ember.$('#passwordUsers').val('');
			Ember.$('#roleUsers').val(0);
		},
		save: function () {

		}
	}

});
