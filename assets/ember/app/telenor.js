window.EmberENV = {};
EmberENV.ENABLE_ALL_FEATURES;
//HELPER_PARAM_LOOKUPS: true
//EmberENV.MODEL_FACTORY_INJECTIONS = true;
//window.telenor = Ember.Application.extend();
//EmberENV = {	FEATURES: {		'link-to': true	}};
//Ember.ENV = {	HELPER_PARAM_LOOKUPS: true};

App = Ember.Application.extend();
App.responsive({
	media: {
		mobile: '(max-width: 768px)',
		tablet: '(min-width: 769px) and (max-width: 992px)',
		desktop: '(min-width: 993px) and (max-width: 1200px)',
		jumbo: '(min-width: 1201px)',
	}
});
//App.riteAccessModule = {};
window.telenor = Ember.Application.create({
	lastActiveTime: null,
	user: null,
	ready: function () {
		telenor.lastActiveTime = new Date();
		telenor.appuser = iMyMeJS;
		// App.riteAccessModule = accessModules = this.buildTree(accessesJS, 1);
		// console.log('accessModules');
		// console.log(accessModules);
		// console.log('accessModules');
		// this.register('rits:accessModules', accessModules, {
		// 	singleton: true,
		// 	instantiate: false
		// });
		// this.inject('controller', 'riteAccessModules', 'rits:accessModules');
	},
	// stringToBoolean: function (string) {
	// 	//console.log(string);
	// 	if (!isNaN(string)) {
	// 		return (string == 0) ? false : true;
	// 	}
	// 	//console.log(string.toLowerCase());
	// 	switch (string.toLowerCase().trim()) {
	// 		case "true":
	// 		case "yes":
	// 		case "1":
	// 			return true;
	// 		case "false":
	// 		case "no":
	// 		case "0":
	// 		case null:
	// 			return false;
	// 		default:
	// 			return Boolean(string);
	// 	}
	// 	//this.buildTree();
	// },
	// buildTree: function (elements, parentId) {
	// 	var _self = this;
	// 	var branch = Ember.A();
	// 	var parents = elements.filter(function (element) {
	// 		return element.module_id == parentId;
	// 	});
	// 	// console.log('-----------------------');
	// 	// console.log(parents);
	// 	// console.log('-----------------------');
	// 	if (parents.length > 0) {
	// 		parents.forEach(function (item, index, enumerable) {
	// 			children = _self.buildTree(elements, item.id);
	// 			if (!Em.isEmpty(children)) {
	// 				branch.push({
	// 					id: item.id,
	// 					link: item.link,
	// 					module_id: item.module_id,
	// 					name: item.name,
	// 					url: _self.stringToBoolean(item.url),
	// 					font: item.font,
	// 					children: children
	// 				});
	// 			} else {
	// 				branch.push({
	// 					id: item.id,
	// 					link: item.link,
	// 					module_id: item.module_id,
	// 					name: item.name,
	// 					url: _self.stringToBoolean(item.url),
	// 					font: item.font,
	// 				});
	// 			}
	// 		});

	// 	} else {
	// 		branch = parents;
	// 	}
	// 	// console.log(branch);
	// 	return branch;
	// },




	//rootElement: '#app', if not bo
	//location: 'none'
	//rootElement: '#app', if not bo
	//location: '/',
	//locationType: 'auto'

	/*LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true,
	LOG_BINDINGS: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_STACKTRACE_ON_DEPRECATION: true,
	LOG_VERSION: true,*/
	debugMode: true
});

/*telenor.PubNub = PubNubEmber.extend({
    cfg: {
       subscribe_key: 'careem-crm',
       publish_key: 'careem-crm',
       uuid: iMyMeJS.id
    }
});
*/
//////////////////////////////////////// Start Tab UI //////////////////////////////////////////////////

// telenor.RenderModuleView = Ember.View.extend({
// 	classNames: ['tab-pane', 'fade'],
// 	attributeBindings: ['id', 'role'],
// 	id: null,
// 	role: "tabpanel",
// 	template: null,
// 	initialize: function() {
// 			var module = this.get("module");
// 			console.log('---------------------------module----------------------------');
// 			console.log(module);
// 			var name = module.name.decamelize();
// 			console.log(name);
// 			console.log('---------------------------module----------------------------');
// 			this.set("id", name);
// 			if (name === "index") {
// 					this.classNames.push("in active");
// 			}
// 			if (!this.container.lookup("view:" + name)) {
// 					name = "index";
// 					this.set("id", "index");
// 			}

// 			this.set("template", Ember.Handlebars.compile('{{render "' + name + '" view.module}}'));
// 	}.on("init")
// });

telenor.Tab = Ember.Object.extend({
	name: null,
	target: null,
	isActive: false,
	isRoot: false,
	view: null,
	font: 'fa fa-circle-o'
});
//////////////////////////////////////// End Tab UI //////////////////////////////////////////////////

telenor.common = Ember.Object.extend({
	consoleClear: function () {

		with((window && window.console && window.console._commandLineAPI) || {}) {
			console.clear();
		}
		if (typeof console._commandLineAPI !== 'undefined') {
			console.API = console._commandLineAPI;
		} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
			console.API = console._inspectorCommandLineAPI;
		} else if (typeof console.clear !== 'undefined') {
			console.API = console;
		}
		console.API.clear();
	},
	showNotification: function (types, messages) {
		noty({
			type: types,
			text: messages,
			timeout: 2000,
			theme: 'relax',
			killer: true
		});
	},
	showLoader: function () {
		Em.$('<div class="dropdown-backdrop"></div><div id="initialLoader" class="loader2"></div>').insertBefore('.content-wrapper');
	},
	hideLoader: function () {
		var backdrop = Em.$('.content-wrapper').parent().find('.dropdown-backdrop');
		if (backdrop) {
			var backdrop2 = $('.content-wrapper').parent().find('#initialLoader');
			backdrop.remove();
			backdrop2.remove();
		}
	},
	showOverlay: function (id) {
		//console.log("I m in show overlay");
		Em.$('<div class="dropdown-backdrop"></div><div id="initialLoader" class="loader2"></div>').insertBefore('#' + id);
		//$('#' + id).before("<div class='dropdown-backdrop'></div>");
		// .click(function () {
		// 	//hide the popup box here
		// 	//$(".yourPopupBox").hide();
		// });
		// Em.$('#' + id).isLoading({
		// 	text: '',
		// 	tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="google-spin-wrapper"><div class="google-spin"></div></div></div></span>',
		// 	//tpl: '<span class="isloading-wrapper %wrapper%"><div>%text%</div><div id="xLoader"><div class="the-snake"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></span>',
		// 	position: "overlay"
		// });
	},
	hideOverlay: function (id) {
		//console.log("I m in hide overlay");
		var backdrop = Em.$('#' + id).parent().find('.dropdown-backdrop');
		if (backdrop) {
			var backdrop2 = $('#' + id).parent().find('#initialLoader');
			backdrop.remove();
			backdrop2.remove();
		}
		// Em.$('#' + id).isLoading("hide");
	},
	ajaxppRequest: function (type, url, data, show, content) {
		var _self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			var options = {};
			options.type = type; // method post
			options.url = javaScriptApplicationRoot + url; //target url
			options.data = data; //the JSON.stringify converts data to JSON          
			if (content == 'form') {
				options.mimeType = "multipart/form-data";
				options.contentType = false;
				options.cache = false;
				options.processData = false;
			} else if (content == 'json') {
				options.dataType = "json";
				options.contentType = "application/json; charset=utf-8";
			}
			options.beforeSend = function () {
				if (show == 'Yes') _self.showLoader();
			};
			options.success = function (response) {
				resolve(response);
			};
			options.error = function (reason) {
				reject(reason);
			};
			options.complete = function () {
				if (show == 'Yes') _self.hideLoader();
			};
			Em.$.ajax(options);
		});
	},
	hiddenForm: function (report, formData) {

		$form = Em.$("<form/>", {
			'id': 'tmpHiddenForm',
			'action': javaScriptApplicationRoot + 'Reports/' + report,
			'method': 'GET',
			'target': '_blank'
		});
		Em.$.each(formData, function (ky, vl) {
			console.log(vl);
			if (!Em.isEmpty(vl.value)) {
				$form.append(Em.$('<input />', {
					'type': 'hidden',
					'name': vl.name,
					'value': vl.value.toString().trim('')
				}));
			}
		});
		$form.appendTo('body');
		Em.$('form#tmpHiddenForm').submit().remove();
		return;

	},
	// dataTableExt:function(){
	//     Ember.$.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) { 
	//         iDelay  = (iDelay && (/^[0-9]+$/.test(iDelay))) ? iDelay : 250; 
	//         var $this = this, oTimerId; 
	//         var anControl = $( 'div.dataTables_filter input:text' ); 
	//         anControl.unbind( 'keyup' ).bind( 'keyup', function() { 
	//         var $$this = $this; 
	//         window.clearTimeout(oTimerId); 
	//         oTimerId = window.setTimeout(function() { 
	//             $$this.fnFilter( anControl.val() ); 
	//         }, iDelay); 
	//       }); 
	//       return this; 
	//     }
	// },
	// dataTableLoading:function(tableID, ajaxPath, formData){
	//     var _self = this;

	//     if(typeof Tabling !== 'undefined' && Tabling != null){  
	//       Tabling.fnClearTable(); 
	//       Tabling.fnDestroy();  
	//       $(".DTTT_collection").remove(); 
	//     }else{
	//       _self.dataTableExt();
	//     }
	//     Tabling = Em.$('#'+tableID).dataTable({ 
	//           "iDisplayLength": 20,
	//           "scrollY": 500,
	//           "scrollX": true,
	//           'bProcessing':true, 
	//           'bServerSide':true, 
	//           'sAjaxSource':javaScriptApplicationRoot+'api/users_api/'+ajaxPath+'?format=json',
	//           "fnServerParams": function ( aoData ) {
	//             aoData.push(formData);//agentActivityReport
	//           }
	//         }).fnSetFilteringDelay();
	//     var tt = new Em.$.fn.dataTable.TableTools( Tabling,  {
	//           "aButtons": [ "copy", "csv", "print" ],
	//           "sSwfPath": "../assets/plugins/datatables/DataTables/extensions/TableTools/swf/copy_csv_xls.swf",
	//         //sRowSelect: 'single'
	//     });

	//     Ember.$( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
	// }

});

/*telenor.RequestAdapter = Ember.Object.extend({
    newRequest: function (type, url, data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                type: type,  // method post
                url: url, //target url
                data: data, //the JSON.stringify converts data to JSON
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    resolve(response);
                },
                error: function (reason) {
                    reject(reason);
                }
            });
        });
    }
});

telenor.initializer({
  name: "common",

  initialize: function(container, application) {
    container.optionsForType('global', {instantiate: false, singleton: true});
    container.register('global:common', telenor.common.create());
    //var store = container.lookup('store:main');
    //var obj = store.load(CrashLog.User, currentUser);
    //container.optionsForType('user', { instantiate: false, singleton: true });
    //container.register('user', 'current', CrashLog.User.find(obj.id));
  }
});

telenor.initializer({
  name: "injectCommon",
  after: 'common',

  initialize: function(container, application) {
    container.typeInjection('controller', 'common', 'global:common');
    container.typeInjection('route', 'common', 'global:common');
    //container.injection('controller:application', 'currentUser', 'user:current');
    //container.typeInjection('route', 'currentUser', 'user:current');
  }
});*/
//telenor.create();
//telenor.initializer({
/*Ember.application.initializer({
  name: 'injectCommon',
  initialize: function(container, app) {
    

    container.typeInjection('controller', 'common', 'globals:common');
    container.typeInjection('route', 'common', 'globals:common');
  }
});*/

/*telenor.initializer({
  name: 'injectCurrent',
  initialize: function(container, app) {
    container.optionsForType('globals', {instantiate: false, singleton: true});
    container.register('globals:current', telenor.ComFunc.create());

    container.typeInjection('controller', 'current', 'globals:current');
    container.typeInjection('route', 'current', 'globals:current');
  }
});*/
//use this adapter in  your controller
//var adapter = App.RequestAdapter.create();

/*

adapter.newRequest(data).then(function (response) {   //newRequest is method of our adapter
    console.log(response.userId);  //specify response data
}, function(error){
    //handle error  
});

*/
