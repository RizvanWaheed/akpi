// telenor.FileUploadComponent = EmberUploader.FileField.extend({
//   	url: '',
//   	filesDidChange: (function() {

// 	    var uploadUrl = this.get('url');
// 	    var files = this.get('files');
// 	 //   console.log(files[0]);
// 	 	var file = files[0];
// 			//var ext =  file.name.split('.').pop();// /[^.]+$/.exec(file.name);//(/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
// 		if (file.size <= 0){
// 			 alert('Please select a file');
// 			 return;
// 		}
// 		else if(file.size > 30000000){
// 			 alert('File size cannot exceed 30 MB');
// 			 return;
// 		} 
// 		else if(file.error > 0){
// 			alert(file.error);
// 			return;
// 		}
// 		else if(file.name.split('.').pop()!="csv"){ //file.type.indexOf('csv') == -1) {
// 			 alert('Only CSV(.csv) extension is allowed, please choose a CSV file.');    
// 			 return;       
// 		}
// 		else{
// 			Ember.$.isLoading({
//                 text:       '',
//                 tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
//               //  position:   "overlay"
//             });
// 		    var uploader = EmberUploader.Uploader.create({
// 		      url: uploadUrl,
// 		     // paramNamespace: 'post'
// 		     // isUploading:true
// 		   //   files:files
// 		    });
// 		    if (!Ember.isEmpty(files)) {
// 		    // 	console.log('Not empty');
// 		    // 	console.log(uploader);
// 		   	//	uploader.upload(files[0]);
		      	
// 		      	var promise = uploader.upload(files[0]);

// 				promise.then(function(data) {
// 				  // Handle success
// 				  Ember.$.isLoading('hide');
// 				  noty({
// 				  		type:'success', 
				  		
// 				  		text: '<b>Uploaded Sucessfully!</b>',
// 				  		theme       : 'relax',
// 				  		/*dismissQueue: true,
// 		                animation   : {
// 		                    open  : 'animated bounceInLeft',
// 		                    close : 'animated bounceOutLeft',
// 		                    easing: 'swing',
// 		                    speed : 500
// 		                }*/
// 		          });
// 				  if(data.error != ''){
// 				  	noty({type:'error', text: data.error, theme: 'relax'});
// 				  }
// 				 // console.log(data);
				  
// 				}, function(error) {
// 				  // Handle failure
// 				  noty({type:'error', text: '<b>Uploading Failed!</b>'});
// 				  Ember.$.isLoading('hide');
// 				});
// 		    }
// 		}
//  	}).observes('files')
// });
/*telenor.FileUploadComponent = EmberUploader.FileField.extend({
  	url: '',
  	filesDidChange: (function() {

	    var uploadUrl = this.get('url');
	    var myParams  = this.get('params'); 
	    console.log(myParams);
	    var files = this.get('files');
	 //   console.log(files[0]);
	 	var file = files[0];
			//var ext =  file.name.split('.').pop();// /[^.]+$/.exec(file.name);//(/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
		if (file.size <= 0){
			 alert('Please select a file');
			 return;
		}
		else if(file.size > 30000000){
			 alert('File size cannot exceed 30 MB');
			 return;
		} 
		else if(file.error > 0){
			alert(file.error);
			return;
		}
		else if(file.name.split('.').pop()!="csv"){ //file.type.indexOf('csv') == -1) {
			 alert('Only CSV(.csv) extension is allowed, please choose a CSV file.');    
			 return;       
		}
		else{
			Ember.$.isLoading({
                text:       '',
                tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
              //  position:   "overlay"
            });
		    var uploader = EmberUploader.Uploader.create({
		      url: uploadUrl,
		     // paramNamespace: 'post'
		     // isUploading:true
		   //   files:files
		    });

		    if (!Ember.isEmpty(files)) {
		   // 	console.log('Not empty');
		   // 	console.log(uploader);
		      	//uploader.upload(files[0]);
		      	var promise = uploader.upload(files[0]);

				promise.then(function(data) {
				  // Handle success
				  console.log(data);
				  Ember.$.isLoading('hide');
				}, function(error) {
				  // Handle failure
				  Ember.$.isLoading('hide');
				});
		    }
		}

 	}).observes('files')
});*/
