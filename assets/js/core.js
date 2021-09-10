var AppCore = {
	paging: {
		totalPages: 0,
		currPage: 0,
		maxNavLinks: 0,
		setDefaultSettings: function() {
			var me = this;
			me.totalPages = 1;
			me.currPage = 1;
			me.maxNavLinks = 5;
		},
		init: function() {
			this.setDefaultSettings();
		},
		getStartEndLoop : function() {
			var me = this;
			var max_nav_links = me.maxNavLinks;
			if (me.totalPages < max_nav_links) {
				max_nav_links = me.totalPages;
			}
			var tmpPageNo = parseInt(me.currPage);
			var mod = max_nav_links % 2;
			var mid = ( max_nav_links - mod )/ 2;
			var LinksStart = tmpPageNo - mid;
			var LinksEnd = tmpPageNo + mid;
			if ( mod == 0) {
				LinksStart = LinksStart + 1;
				if ( LinksEnd - LinksStart < max_nav_links - 1 ) {
					LinksEnd = LinksEnd + ( max_nav_links - ( LinksEnd - LinksStart ) );
				}
			}
			if ( LinksStart < 1) {LinksStart = 1;LinksEnd = max_nav_links;}
			if ( LinksEnd > me.totalPages ) {LinksEnd = me.totalPages;LinksStart = LinksEnd - max_nav_links + 1;}
			if ( tmpPageNo == 1 ) {LinksStart = 1;LinksEnd = max_nav_links;}
			if ( tmpPageNo == me.totalPages ) {LinksEnd = me.totalPages;LinksStart = LinksEnd - max_nav_links + 1;}
			return {"LinksStart":LinksStart, "LinksEnd":LinksEnd};
		}
	},
	webService: {
		response: false,
		isResponseSuccess: function() {
			var me = this;
			if (me.response === false) {
				return false;
			}
			if (typeof me.response.data === 'undefined') {
				return false;
			}
			if (typeof me.response.data.success_status !== 'undefined' && me.response.data.success_status == 1) {
				return true;
			} else {
				return false;
			}
		},
		getResponseRoot: function() {
			var me = this;
			if (me.response === false) {
				return false;
			}
			if (typeof me.response.data === 'undefined') {
				return me.response;
			}
			return me.response.data;
		},
		getResponseData: function() {
			return this.getResponseRoot().data;
		},
		getResponseCode: function() {
			return this.getResponseRoot().code;
		},
		getResponseDesc: function() {
			return this.getResponseRoot().description;
		},
		request: {
			post: {
				setDefaultHeaders: function(http) {
					if (!http || typeof http.defaults === 'undefined' || typeof http.defaults.headers === 'undefined') {
						return false;
					}
					var defaultHeaders = http.defaults.headers;
					defaultHeaders.post = defaultHeaders.post || {};
					//defaultHeaders.post['Content-Type']='application/json;charset=UTF-8';
					defaultHeaders.post['Content-Type']='application/x-www-form-urlencoded;charset=utf-8';
					return true;
				}
			}
		}
	},
	rest: {
		response: {
			responseText: false,
			isSuccess: function() {
				var meta = this.getMeta();
				if (meta === false) {
					return false;
				}
				if (typeof meta.status === 'undefined') {
					return false;
				}
				var status = meta.status.toLowerCase();
				if (status == 'ok') {
					return true;
				} else {
					return false;
				}
			},
			getRoot: function() {
				var me = this;
				if (me.responseText === false) {
					return false;
				}
				return me.responseText;
			},
			getData: function() {
				return this.getRoot().data.response;
			},
			getMeta: function() {
				if (typeof this.getRoot().meta !== 'undefined') {
					return this.getRoot().meta;
				}
				return false;
			},
			getMessage: function() {
				var meta = this.getMeta();
				if (meta === false) {
					return "Unknown Error";
				}
				if (typeof meta.feedback[0] !== 'undefined') {
					return meta.feedback[0].message;
				} 
				else if (typeof meta.feedback[1] !== 'undefined') {
					return meta.feedback[1].message;
				} else {
					return "";
				}
			}
		}
	},
	makeProperArray: function(arr) {
		if (typeof arr !== 'object' || arr == '' || arr == null || arr == 'null' || !arr) {
			arr = [];
		}
		return arr;
	},
	redirect: function(url) {
		window.location = url;
	},
	loader: {
		loaderId: 'geoLoaderID',
		loaderTextId: 'geoLoaderTextID',
		defaults: {
			text: 'Loading',
			vPos: 'top', // [bottom, top]
			hPos: 'center' // [left, center, right]
		},
		successAlert:function(type, message){
			$("#successMsg").append($("<div class='showmsg " + type + " fadein'><button data-dismiss='alert' class='close' type='button'>×</button><p><strong align='center'>" + message + " !!!</strong> </p></div>"));
		    $(".showmsg").delay(2000).fadeOut("slow", function () { $(this).remove(); });

		},
		buildHtml: function(opts) {
			var me = this;
			var extraCSS = '';
			if (opts.vPos != 'top') {
				extraCSS += ' '+opts.vPos;
			}
			if (opts.hPos != 'center') {
				extraCSS += ' '+opts.hPos;
			}
			if ($('#'+me.loaderId).length > 0) {
				$('#'+me.loaderId).removeClass('bottom top left center right');
				$('#'+me.loaderId).addClass(extraCSS);
				return;
			}
			$('#'+me.loaderId).remove();
			var html = '\
				<div class="GOYAEMCLGC'+extraCSS+'" aria-hidden="true" id="'+me.loaderId+'">\
					<div class="GOYAEMCN3">\
						<span class="GOYAEMCA5 GOYAEMCMGC"></span>\
						<span id="'+me.loaderTextId+'">'+opts.text+'</span>\
					</div>\
				</div>\
			';
			$('body').append(html);
		},
		show: function(opts) {
			var me = this;
			opts = $.extend({}, me.defaults, opts);
			this.buildHtml(opts);
			$('#'+me.loaderTextId).html(opts.text);
			$('#'+me.loaderId).attr('aria-hidden', 'false');
		},
		hide: function() {
			var me = this;
			$('#'+me.loaderId).attr('aria-hidden', 'true');
		}
	},
	bodyScroll: {
		/*selector: false,
		speed: 450,
		top: false,
		setDefaultSettings: function() {
			var me = this;
			me.selector = false;
			me.speed = 450;
			me.top = false;
		},
		init: function() {
			this.setDefaultSettings();
		},*/
		defaults: {
			selector: false,
			speed: 450,
			top: false,
			callback: null
		},
		scroll: function(opts) {
			var me = this;
			opts = $.extend({}, me.defaults, opts);
			var scrollTop = 0;
			if (opts.top === false) {
				if (opts.selector === false) {
					return;
				}
				var $selector = $(opts.selector);
				if ($selector.length == 0) {
					return;
				}
				scrollTop = $selector.offset().top;
			} else {
				scrollTop = opts.top;
			}
			var $ctrl = $('html,body');
			$ctrl.animate({
				scrollTop: scrollTop
			},
			opts.speed, function() {
				if (typeof opts.callback === 'function') {
					opts.callback();
				}
			});
		}
	},
	menuScroll: {
		defaults: {
			selector: false,
			topPadding: 15,
			speed: 'normal',
			initScroll: true
			//maxTop: false
		},
		scroll: function(opts) {
			var me = this;
			opts = $.extend({}, me.defaults, opts);
			if (opts.selector === false) {
				return;
			}
			var $selector = $(opts.selector);
			if ($selector.length == 0) {
				return;
			}
			var $window = $(window);
			var offset = $selector.offset();
			$window.scroll(function() {
				if ($window.scrollTop() > offset.top) {
					var marginTop = $window.scrollTop() - offset.top + opts.topPadding;
					/*if (opts.maxTop !== false && marginTop > opts.maxTop) {
						marginTop = opts.maxTop;
					}*/
					/*var viewport = AppCore.viewport();
					var vpHeight = viewport.cy;
					var slHeight = $selector.height();
					var maxTop = vpHeight - slHeight;
					if (maxTop > 0 && marginTop > maxTop) {
						marginTop = maxTop;
					}*/
					$selector.stop().animate({
						marginTop: marginTop
					}, opts.speed);
				} else {
					$selector.stop().animate({
						marginTop: 0
					}, opts.speed);
				};
			});
			if (opts.initScroll) {
				$window.scroll();
			}
		}
	},
	viewport : function() {
        /*return {
            x : window.pageXOffset,
            y : window.pageYOffset,
            cx: window.innerWidth,
            cy: window.innerHeight
        };*/
        return {
            x : $(window).scrollLeft(),
            y : $(window).scrollTop(),
            cx: $(window).width(),
            cy: $(window).height()
        };
    },
	noty: {
		defaults: {
			hideTimeout: null,
			hideDelay: 2500,
			text: '',
			sticky: false,
			/*btnOk: {
				text: 'Ok',
				callback: null
			},
			btnCancel: {
				text: 'Cancel',
				callback: null
			},*/
			buttons: [],
			callback: null
		},
		globalOpts: null,
		show: function(opts) {
			var me = this;
			opts = $.extend({}, me.defaults, opts);
			me.globalOpts = $.extend({}, me.defaults, opts);
			if (opts.hideTimeout) {
				clearTimeout(opts.hideTimeout);
			}
			if (!opts.text) {
				return false;
			}
			if ($('.noty_msg').length > 0) {
				$('.noty_msg, .noty_overlay').stop(true, true).remove();
			}
			//var $appendTo = $('div:first');
			var $appendTo = $('body');
			var buttons = '';
			if (opts.buttons.length > 0) {
				buttons = '<div class="noty_btn_wrap">';
				for (var i = 0; i < opts.buttons.length; i++) {
					buttons += '<button type="button" onclick="AppCore.noty.btnClk('+i+');" class="'+opts.buttons[i].className+'" style="'+opts.buttons[i].style+'">'+opts.buttons[i].text+'</button>';
				}
				buttons += '</div>';
			}
			var overlayExtraClass = '';
			var msgExtraClass = '';
			if (opts.sticky) {
				overlayExtraClass += ' sticky';
				msgExtraClass += ' sticky';
			}
			$appendTo.append('<div class="noty_overlay'+overlayExtraClass+'"></div><div class="noty_msg'+overlayExtraClass+'"><p>'+opts.text+buttons+'</p></div>');
			$appendTo.off('click', '.noty_overlay, .noty_msg', AppCore.noty.hide);
			if (!opts.sticky) {
				$appendTo.on('click', '.noty_overlay, .noty_msg', {opts: opts}, AppCore.noty.hide);
			}
			var w = $('.noty_msg').outerWidth();
			var h = $('.noty_msg').outerHeight();
			
			$('.noty_msg').css({'margin-left': '-'+(w/2)+'px', 'margin-top': '-'+(h/2)+'px'});
			if (!opts.sticky) {
				opts.hideTimeout = setTimeout(function() {
					AppCore.noty.hide(null, opts);
				},
				opts.hideDelay);
			}
			return true;
		},
		hide: function(e, opts) {
			if (e) {
				opts = e.data.opts;
			}
			if (opts.hideTimeout) {
				clearTimeout(opts.hideTimeout);
			}
			$('.noty_msg').animate({top: 0, opacity: 0}, 450, function() {
			});
			$('.noty_overlay').fadeOut(800, function() {
				$('.noty_msg, .noty_overlay').remove();
				if (typeof opts.callback === 'function') {
					opts.callback();
				}
			});
		},
		btnClk: function(idx) {
			var me = this;
			var button = me.globalOpts.buttons[idx];
			if (typeof button.callback === 'function') {
				button.callback();
			}
			if (typeof button.hideNoty !== 'undefined' && button.hideNoty) {
				AppCore.noty.hide(null, me.globalOpts);
			}
		}
	},
	jNotify: {
		jSuccessId: 'jSuccessID',
		jSuccessTO: null,
		defaults: {
			notify: {
			},
			success: {
				text: 'Information saved successfully!',
				autoHide : true, // added in v2.0
				clickOverlay : true, // added in v2.0
				MinWidth : 300,
				TimeShown : 3000,
				ShowTimeEffect : 400,
				HideTimeEffect : 400,
				LongTrip :20,
				HorizontalPosition : 'center',
				VerticalPosition : 'top',
				ShowOverlay : false,
				clickClose: true,
				onClosed : null,
				onCompleted : null
			},
			error: {
			}
		},
		success: function(opts) {
			var me = this;
			opts = $.extend({}, me.defaults.success, opts);
			var text = opts.text;
			opts.text = null;
			//jSuccess(text, opts);
			
			if ($('#'+me.jSuccessId).length == 0) {
				$('body').append('<div id="'+me.jSuccessId+'" class="jNotify" aria-hidden="true"><div class="alert alert-success"></div></div>');
			}
			var $alert = $('#'+me.jSuccessId).find('.alert').eq(0);
			$alert.html(text);
			$alert.css('min-width', opts.MinWidth);
			$('#'+me.jSuccessId).attr('aria-hidden', 'false');
			clearTimeout(me.jSuccessTO);
			$('#'+me.jSuccessId).unbind('click');
			if (opts.clickClose) {
				$('#'+me.jSuccessId).bind('click', function() {
					me.successHide();
				});
			}
			if (opts.autoHide) {
				me.jSuccessTO = setTimeout(function() {
					me.successHide();
				}, opts.TimeShown);
			}
		},
		successHide: function() {
			var me = this;
			clearTimeout(me.jSuccessTO);
			$('#'+me.jSuccessId).attr('aria-hidden', 'true');
		}
	},
	browser: {
		isIE: function() {
			return (navigator.userAgent.indexOf('MSIE') >= 0);
		},
		isIE8: function() {
			if (AppCore.browser.isIE()) {
				if (navigator.userAgent.indexOf('MSIE 8') >= 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		isFirefox: function() {
			return (navigator.userAgent.indexOf('Firefox') >= 0);
		},
		isChrome: function() {
			return (navigator.userAgent.indexOf('Chrome') >= 0);
		},
		isSafari: function() {
			return (navigator.userAgent.indexOf('Safari') >= 0 && navigator.userAgent.indexOf('Chrome') == -1);
		},
		isOpera: function() {
			return (navigator.userAgent.indexOf('Presto') >= 0);
		}
	},
	parseNGTpl: function(url) {
		var me = this;
		var ret = me.parseUrlParam(url);
		return ret;
	},
	parseNGAjaxReq: function(url_obj) {
		var me = this;
		return me.parseUrlParam(url_obj);
	},
	parseUrlParam: function(urlObj) {
		var d = new Date();
		if (!urlObj || typeof urlObj === 'undefined') {
			urlObj = {};
		}
		if (typeof urlObj === 'string') {
			if (urlObj.indexOf('?') == -1) {
				urlObj += '?';
			} else {
				urlObj += '&';
			}
			return urlObj += '_='+d.getTime();
		} else if (typeof urlObj === 'object') {
			return $.extend(urlObj, {'_': d.getTime()});
		} else {
			return urlObj;
		}
	},
	serializeReqData: function(data) {
		if (typeof data === 'object') {
			data = jQuery.param(data);
		}
		return data;
	},
	browserHacks: function() {
	},
	dateFormat: function(date, format) {
		format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); // Pad with '0' if needed
		format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)); // Months are zero-based
		format = format.replace("YYYY", date.getFullYear());
		return format;
	},
	isNumber: function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	numericFormat: function(fld, e, extraStrCheck) {
		var key = '';
		var strCheck = '0123456789';
		if (extraStrCheck) strCheck += extraStrCheck;
		if (AppCore.browser.isFirefox()) {
			var whichCode = (window.Event) ? e.which : e.keyCode;
		} else {
			var whichCode = e.keyCode;
		}
	
		if (whichCode == 13) return true;  // Enter
		if (whichCode == 8) return true;  // Backspace
		if (whichCode == 0) return true;  // Null
		if (whichCode == 9) return true;  // Tab
	
		key = String.fromCharCode(whichCode);  // Get key value from key code
		if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
		if (key == '.') {
			var exp = /\./;
			var x = new String(fld.value);
			var a = x.search(exp);
			if (a != -1) return false;
		}
		return true;
	},
	floatFormat: function(fld, e) {
		return this.numericFormat(fld, e, '.');
	},
	custChkbox: {
		applyChkClass: function(elem) {
			var $elem = $(elem);
			if ($elem.is(':checked')) {
				$elem.addClass("checked");
			} else {
				$elem.removeClass("checked");
			}
		},
		findApplyChkClass: function() {
			var me = this;
			$('input[type="checkbox"], input[type="radio"]').each(function() {
				me.applyChkClass(this);
			});
		}
	},
	makeUniqId: function(idsArr) {
		var idsStr = '';
		angular.forEach(idsArr, function(v, k) {
			idsStr += (k == 0 ? '' : '_')+v;
		});
		var ret = AppCore.phpjs.base64_encode(idsStr);
		ret = ret.replace(/=/g, '_');
		return ret;
	},
	reverseUniqId: function(id) {
		var ret = id.replace(/_/g, '=');
		ret = AppCore.phpjs.base64_decode(ret);
		return ret.split('_');
	},
	roundNutrition: function(input, nutrition_type) {
		if (nutrition_type == 'cal') {
            var precision = 0;
        } else {
            var precision = 1;
        }
		var val = parseFloat(input);
        if (isNaN(val)) {
            val = 0;
        }
        return AppCore.phpjs.round(val, precision);
	},
	topMenu: {
		selectMenu: function(menuId) {
			$('#primary-navigation.navbar-static > ul > li .dropdown-menu > li').removeClass('child-select-menu');
			if (menuId && $('#'+menuId).length > 0) {
				$('#'+menuId).addClass('child-select-menu');
			}
		}
	},
	dates: {
		isMySqlDateFormat: function(d) {
			if (d.constructor !== String) {
				return false;
			}
			var dtParts = d.split(' ');
			var date = dtParts[0];
			var dateParts = date.split('-');
			if (dateParts.length < 3 || dateParts.length > 3) {
				return false;
			}
			var year = dateParts[0];
			var mon = dateParts[1];
			var day = dateParts[2];
			if (year.length === 4) {
				return true;
			}
			return false;
		},
		convert2ProperDateString:function(d) {
			if (d.constructor === String && this.isMySqlDateFormat(d)) {
				return d.replace(/\-/g, '/');
			}
			return d;
		},
		convert:function(d) {
			// Converts the date in d to a date-object. The input can be:
			//   a date object: returned without modification
			//  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
			//   a number     : Interpreted as number of milliseconds
			//                  since 1 Jan 1970 (a timestamp) 
			//   a string     : Any format supported by the javascript engine, like
			//                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
			//  an object     : Interpreted as an object with year, month and date
			//                  attributes.  **NOTE** month is 0-11.
			d = this.convert2ProperDateString(d);
			return (
				d.constructor === Date ? d :
				d.constructor === Array ? new Date(d[0],d[1],d[2]) :
				d.constructor === Number ? new Date(d) :
				d.constructor === String ? new Date(d) :
				typeof d === "object" ? new Date(d.year,d.month,d.date) :
				NaN
			);
		},
		compare:function(a,b) {
			// Compare two dates (could be of any type supported by the convert
			// function above) and returns:
			//  -1 : if a < b
			//   0 : if a = b
			//   1 : if a > b
			// NaN : if a or b is an illegal date
			// NOTE: The code inside isFinite does an assignment (=).
			return (
				isFinite(a=this.convert(a).valueOf()) &&
				isFinite(b=this.convert(b).valueOf()) ?
				(a>b)-(a<b) :
				NaN
			);
		},
		inRange:function(d,start,end) {
			// Checks if date in d is between dates in start and end.
			// Returns a boolean or NaN:
			//    true  : if d is between start and end (inclusive)
			//    false : if d is before start or after end
			//    NaN   : if one or more of the dates is illegal.
			// NOTE: The code inside isFinite does an assignment (=).
		   return (
				isFinite(d=this.convert(d).valueOf()) &&
				isFinite(start=this.convert(start).valueOf()) &&
				isFinite(end=this.convert(end).valueOf()) ?
				start <= d && d <= end :
				NaN
			);
		},
		/**
		 * @Author : Jamshed Iqbal
		 * @Note   : It will/should be more enhanced in future
		 */
		convert2DateTime:function(d) {
			if (typeof d === 'string') {
				var dParts = d.split(' ');
				if (typeof dParts[1] === 'undefined') {
					var obj = new Date();
					var H = obj.getHours();
					var i = obj.getMinutes();
					var s = obj.getSeconds();
					d = d+' '+H+':'+i+':'+s;
				}
			}
			return d;
		},
		isFutureDate: function(d) {
			var today = new Date();
			if (typeof $.datepicker !== 'undefined') {
				today = $.datepicker.formatDate("yy-mm-dd", today);
			}
			if (AppCore.dates.compare(d, today) === 1) {
				return true;
			} else {
				return false;
			}
		}
	},
	phpjs: {
		basename: function(path, suffix) {
		  // http://kevin.vanzonneveld.net
		  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // +   improved by: Ash Searle (http://hexmen.com/blog/)
		  // +   improved by: Lincoln Ramsay
		  // +   improved by: djmix
		  // *     example 1: basename('/www/site/home.htm', '.htm');
		  // *     returns 1: 'home'
		  // *     example 2: basename('ecra.php?p=1');
		  // *     returns 2: 'ecra.php?p=1'
		  var b = path.replace(/^.*[\/\\]/g, '');
		
		  if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
			b = b.substr(0, b.length - suffix.length);

		  }
		
		  return b;
		},
		urlencode: function(str) {
		  // http://kevin.vanzonneveld.net
		  // +   original by: Philip Peterson
		  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // +      input by: AJ
		  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // +   improved by: Brett Zamir (http://brett-zamir.me)
		  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // +      input by: travc
		  // +      input by: Brett Zamir (http://brett-zamir.me)
		  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // +   improved by: Lars Fischer
		  // +      input by: Ratheous
		  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
		  // +   bugfixed by: Joris
		  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
		  // %          note 1: This reflects PHP 5.3/6.0+ behavior
		  // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
		  // %        note 2: pages served as UTF-8
		  // *     example 1: urlencode('Kevin van Zonneveld!');
		  // *     returns 1: 'Kevin+van+Zonneveld%21'
		  // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
		  // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
		  // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
		  // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
		  str = (str + '').toString();
		
		  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
		  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
		  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
		},
		urldecode: function(str) {
			// http://kevin.vanzonneveld.net
			// +   original by: Philip Peterson
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +      input by: AJ
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   improved by: Brett Zamir (http://brett-zamir.me)
			// +      input by: travc
			// +      input by: Brett Zamir (http://brett-zamir.me)
			// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   improved by: Lars Fischer
			// +      input by: Ratheous
			// +   improved by: Orlando
			// +   reimplemented by: Brett Zamir (http://brett-zamir.me)
			// +      bugfixed by: Rob
			// +      input by: e-mike
			// +   improved by: Brett Zamir (http://brett-zamir.me)
			// +      input by: lovio
			// +   improved by: Brett Zamir (http://brett-zamir.me)
			// %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
			// %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
			// %        note 2: pages served as UTF-8
			// *     example 1: urldecode('Kevin+van+Zonneveld%21');
			// *     returns 1: 'Kevin van Zonneveld!'
			// *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
			// *     returns 2: 'http://kevin.vanzonneveld.net/'
			// *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
			// *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
			// *     example 4: urldecode('%E5%A5%BD%3_4');
			// *     returns 4: '\u597d%3_4'
			return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function () {
				// PHP tolerates poorly formed escape sequences
				return '%25';
			}).replace(/\+/g, '%20'));
		},
		get_html_translation_table: function(table, quote_style) {
			
			// http://kevin.vanzonneveld.net
			// +   original by: Philip Peterson
			// +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: noname
			// +   bugfixed by: Alex
			// +   bugfixed by: Marco
			// +   bugfixed by: madipta
			// +   improved by: KELAN
			// +   improved by: Brett Zamir (http://brett-zamir.me)
			// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
			// +      input by: Frank Forte
			// +   bugfixed by: T.Wild
			// +      input by: Ratheous
			// %          note: It has been decided that we're not going to add global
			// %          note: dependencies to php.js, meaning the constants are not
			// %          note: real constants, but strings instead. Integers are also supported if someone
			// %          note: chooses to create the constants themselves.
			// *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
			// *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
			var entities = {},
				hash_map = {},
				decimal;
			var constMappingTable = {},
				constMappingQuoteStyle = {};
			var useTable = {},
				useQuoteStyle = {};

			// Translate arguments
			constMappingTable[0] = 'HTML_SPECIALCHARS';
			constMappingTable[1] = 'HTML_ENTITIES';
			constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
			constMappingQuoteStyle[2] = 'ENT_COMPAT';
			constMappingQuoteStyle[3] = 'ENT_QUOTES';

			useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
			useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

			if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
				throw new Error("Table: " + useTable + ' not supported');
				// return false;
			}

			entities['38'] = '&amp;';
			if (useTable === 'HTML_ENTITIES') {
				entities['160'] = '&nbsp;';
				entities['161'] = '&iexcl;';
				entities['162'] = '&cent;';
				entities['163'] = '&pound;';
				entities['164'] = '&curren;';
				entities['165'] = '&yen;';
				entities['166'] = '&brvbar;';
				entities['167'] = '&sect;';
				entities['168'] = '&uml;';
				entities['169'] = '&copy;';
				entities['170'] = '&ordf;';
				entities['171'] = '&laquo;';
				entities['172'] = '&not;';
				entities['173'] = '&shy;';
				entities['174'] = '&reg;';
				entities['175'] = '&macr;';
				entities['176'] = '&deg;';
				entities['177'] = '&plusmn;';
				entities['178'] = '&sup2;';
				entities['179'] = '&sup3;';
				entities['180'] = '&acute;';
				entities['181'] = '&micro;';
				entities['182'] = '&para;';
				entities['183'] = '&middot;';
				entities['184'] = '&cedil;';
				entities['185'] = '&sup1;';
				entities['186'] = '&ordm;';
				entities['187'] = '&raquo;';
				entities['188'] = '&frac14;';
				entities['189'] = '&frac12;';
				entities['190'] = '&frac34;';
				entities['191'] = '&iquest;';
				entities['192'] = '&Agrave;';
				entities['193'] = '&Aacute;';
				entities['194'] = '&Acirc;';
				entities['195'] = '&Atilde;';
				entities['196'] = '&Auml;';
				entities['197'] = '&Aring;';
				entities['198'] = '&AElig;';
				entities['199'] = '&Ccedil;';
				entities['200'] = '&Egrave;';
				entities['201'] = '&Eacute;';
				entities['202'] = '&Ecirc;';
				entities['203'] = '&Euml;';
				entities['204'] = '&Igrave;';
				entities['205'] = '&Iacute;';
				entities['206'] = '&Icirc;';
				entities['207'] = '&Iuml;';
				entities['208'] = '&ETH;';
				entities['209'] = '&Ntilde;';
				entities['210'] = '&Ograve;';
				entities['211'] = '&Oacute;';
				entities['212'] = '&Ocirc;';
				entities['213'] = '&Otilde;';
				entities['214'] = '&Ouml;';
				entities['215'] = '&times;';
				entities['216'] = '&Oslash;';
				entities['217'] = '&Ugrave;';
				entities['218'] = '&Uacute;';
				entities['219'] = '&Ucirc;';
				entities['220'] = '&Uuml;';
				entities['221'] = '&Yacute;';
				entities['222'] = '&THORN;';
				entities['223'] = '&szlig;';
				entities['224'] = '&agrave;';
				entities['225'] = '&aacute;';
				entities['226'] = '&acirc;';
				entities['227'] = '&atilde;';
				entities['228'] = '&auml;';
				entities['229'] = '&aring;';
				entities['230'] = '&aelig;';
				entities['231'] = '&ccedil;';
				entities['232'] = '&egrave;';
				entities['233'] = '&eacute;';
				entities['234'] = '&ecirc;';
				entities['235'] = '&euml;';
				entities['236'] = '&igrave;';
				entities['237'] = '&iacute;';
				entities['238'] = '&icirc;';
				entities['239'] = '&iuml;';
				entities['240'] = '&eth;';
				entities['241'] = '&ntilde;';
				entities['242'] = '&ograve;';
				entities['243'] = '&oacute;';
				entities['244'] = '&ocirc;';
				entities['245'] = '&otilde;';
				entities['246'] = '&ouml;';
				entities['247'] = '&divide;';
				entities['248'] = '&oslash;';
				entities['249'] = '&ugrave;';
				entities['250'] = '&uacute;';
				entities['251'] = '&ucirc;';
				entities['252'] = '&uuml;';
				entities['253'] = '&yacute;';
				entities['254'] = '&thorn;';
				entities['255'] = '&yuml;';
			}

			if (useQuoteStyle !== 'ENT_NOQUOTES') {
				entities['34'] = '&quot;';
			}
			if (useQuoteStyle === 'ENT_QUOTES') {
				entities['39'] = '&#39;';
			}
			entities['60'] = '&lt;';
			entities['62'] = '&gt;';

			// ascii decimals to real symbols
			for (decimal in entities) {
				if (entities.hasOwnProperty(decimal)) {
					hash_map[String.fromCharCode(decimal)] = entities[decimal];
				}
			}

			return hash_map;
		},
		html_entity_decode: function(string, quote_style) {
			// http://kevin.vanzonneveld.net
			// +   original by: john (http://www.jd-tech.net)
			// +      input by: ger
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: Onno Marsman
			// +   improved by: marc andreu
			// +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +      input by: Ratheous
			// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
			// +      input by: Nick Kolosov (http://sammy.ru)
			// +   bugfixed by: Fox
			// -    depends on: get_html_translation_table
			// *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
			// *     returns 1: 'Kevin & van Zonneveld'
			// *     example 2: html_entity_decode('&amp;lt;');
			// *     returns 2: '&lt;'
			if (!string) {
				return '';
			}
			var hash_map = {},
				symbol = '',
				tmp_str = '',
				entity = '';
			tmp_str = string.toString();

			if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
				return false;
			}

			// fix &amp; problem
			// http://phpjs.org/functions/get_html_translation_table:416#comment_97660
			delete(hash_map['&']);
			hash_map['&'] = '&amp;';			

			for (symbol in hash_map) {
				entity = hash_map[symbol];
				tmp_str = tmp_str.split(entity).join(symbol);
			}
			//tmp_str = tmp_str.split('&#039;').join("'");
			//tmp_str = tmp_str.replace('&REG;','®');
			//tmp_str = tmp_str.replace('&REG;','®');
			tmp_str = $('<textarea/>').html(tmp_str).val();

			return tmp_str;
		},
		utf8_encode: function(argString) {
			// http://kevin.vanzonneveld.net
			// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   improved by: sowberry
			// +    tweaked by: Jack
			// +   bugfixed by: Onno Marsman
			// +   improved by: Yves Sucaet
			// +   bugfixed by: Onno Marsman
			// +   bugfixed by: Ulrich
			// +   bugfixed by: Rafal Kukawski
			// +   improved by: kirilloid
			// +   bugfixed by: kirilloid
			// *     example 1: utf8_encode('Kevin van Zonneveld');
			// *     returns 1: 'Kevin van Zonneveld'
			
			if (argString === null || typeof argString === "undefined") {
			return "";
			}
			
			var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
			var utftext = '',
			start, end, stringl = 0;
			
			start = end = 0;
			stringl = string.length;
			for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;
			
			if (c1 < 128) {
			  end++;
			} else if (c1 > 127 && c1 < 2048) {
			  enc = String.fromCharCode(
				 (c1 >> 6)        | 192,
				( c1        & 63) | 128
			  );
			} else if (c1 & 0xF800 != 0xD800) {
			  enc = String.fromCharCode(
				 (c1 >> 12)       | 224,
				((c1 >> 6)  & 63) | 128,
				( c1        & 63) | 128
			  );
			} else { // surrogate pairs
			  if (c1 & 0xFC00 != 0xD800) { throw new RangeError("Unmatched trail surrogate at " + n); }
			  var c2 = string.charCodeAt(++n);
			  if (c2 & 0xFC00 != 0xDC00) { throw new RangeError("Unmatched lead surrogate at " + (n-1)); }
			  c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
			  enc = String.fromCharCode(
				 (c1 >> 18)       | 240,
				((c1 >> 12) & 63) | 128,
				((c1 >> 6)  & 63) | 128,
				( c1        & 63) | 128
			  );
			}
			if (enc !== null) {
			  if (end > start) {
				utftext += string.slice(start, end);
			  }
			  utftext += enc;
			  start = end = n + 1;
			}
			}
			
			if (end > start) {
			utftext += string.slice(start, stringl);
			}
			
			return utftext;
		},
		md5: function(str) {
			// http://kevin.vanzonneveld.net
			// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
			// + namespaced by: Michael White (http://getsprink.com)
			// +    tweaked by: Jack
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +      input by: Brett Zamir (http://brett-zamir.me)
			// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// -    depends on: utf8_encode
			// *     example 1: md5('Kevin van Zonneveld');
			// *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
			var xl;
			
			var rotateLeft = function (lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			};
			
			var addUnsigned = function (lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
			  return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
			  if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			  } else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			  }
			} else {
			  return (lResult ^ lX8 ^ lY8);
			}
			};
			
			var _F = function (x, y, z) {
			return (x & y) | ((~x) & z);
			};
			var _G = function (x, y, z) {
			return (x & z) | (y & (~z));
			};
			var _H = function (x, y, z) {
			return (x ^ y ^ z);
			};
			var _I = function (x, y, z) {
			return (y ^ (x | (~z)));
			};
			
			var _FF = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
			};
			
			var _GG = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
			};
			
			var _HH = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
			};
			
			var _II = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
			};
			
			var convertToWordArray = function (str) {
			var lWordCount;
			var lMessageLength = str.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = new Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
			  lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			  lBytePosition = (lByteCount % 4) * 8;
			  lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
			  lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
			};
			
			var wordToHex = function (lValue) {
			var wordToHexValue = "",
			  wordToHexValue_temp = "",
			  lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
			  lByte = (lValue >>> (lCount * 8)) & 255;
			  wordToHexValue_temp = "0" + lByte.toString(16);
			  wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
			}
			return wordToHexValue;
			};
			
			var x = [],
			k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
			S12 = 12,
			S13 = 17,
			S14 = 22,
			S21 = 5,
			S22 = 9,
			S23 = 14,
			S24 = 20,
			S31 = 4,
			S32 = 11,
			S33 = 16,
			S34 = 23,
			S41 = 6,
			S42 = 10,
			S43 = 15,
			S44 = 21;
			
			str = this.utf8_encode(str);
			x = convertToWordArray(str);
			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;
			
			xl = x.length;
			for (k = 0; k < xl; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = addUnsigned(a, AA);
			b = addUnsigned(b, BB);
			c = addUnsigned(c, CC);
			d = addUnsigned(d, DD);
			}
			
			var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
			
			return temp.toLowerCase();
		},
		base64_encode: function(data) {
			// http://kevin.vanzonneveld.net
			// +   original by: Tyler Akins (http://rumkin.com)
			// +   improved by: Bayron Guevara
			// +   improved by: Thunder.m
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: Pellentesque Malesuada
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   improved by: Rafał Kukawski (http://kukawski.pl)
			// *     example 1: base64_encode('Kevin van Zonneveld');
			// *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
			// mozilla has this native
			// - but breaks in 2.0.0.12!
			//if (typeof this.window['btoa'] === 'function') {
			//    return btoa(data);
			//}
			var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = "",
			tmp_arr = [];
			
			if (!data) {
			return data;
			}
			
			do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);
			
			bits = o1 << 16 | o2 << 8 | o3;
			
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			
			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
			} while (i < data.length);
			
			enc = tmp_arr.join('');
			
			var r = data.length % 3;
			
			return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
		},
		base64_decode: function(data) {
			// http://kevin.vanzonneveld.net
			// +   original by: Tyler Akins (http://rumkin.com)
			// +   improved by: Thunder.m
			// +      input by: Aman Gupta
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: Onno Marsman
			// +   bugfixed by: Pellentesque Malesuada
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +      input by: Brett Zamir (http://brett-zamir.me)
			// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
			// *     returns 1: 'Kevin van Zonneveld'
			// mozilla has this native
			// - but breaks in 2.0.0.12!
			//if (typeof this.window['atob'] === 'function') {
			//    return atob(data);
			//}
			var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];
			
			if (!data) {
			return data;
			}
			
			data += '';
			
			do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));
			
			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
			
			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;
			
			if (h3 == 64) {
			  tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
			  tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
			  tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
			} while (i < data.length);
			
			dec = tmp_arr.join('');
			
			return dec;
		},
		round: function(value, precision, mode) {
			// http://kevin.vanzonneveld.net
			// +   original by: Philip Peterson
			// +    revised by: Onno Marsman
			// +      input by: Greenseed
			// +    revised by: T.Wild
			// +      input by: meo
			// +      input by: William
			// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
			// +      input by: Josep Sanz (http://www.ws3.es/)
			// +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
			// %        note 1: Great work. Ideas for improvement:
			// %        note 1:  - code more compliant with developer guidelines
			// %        note 1:  - for implementing PHP constant arguments look at
			// %        note 1:  the pathinfo() function, it offers the greatest
			// %        note 1:  flexibility & compatibility possible
			// *     example 1: round(1241757, -3);
			// *     returns 1: 1242000
			// *     example 2: round(3.6);
			// *     returns 2: 4
			// *     example 3: round(2.835, 2);
			// *     returns 3: 2.84
			// *     example 4: round(1.1749999999999, 2);
			// *     returns 4: 1.17
			// *     example 5: round(58551.799999999996, 2);
			// *     returns 5: 58551.8
			var m, f, isHalf, sgn; // helper variables
			precision |= 0; // making sure precision is integer
			m = Math.pow(10, precision);
			value *= m;
			sgn = (value > 0) | -(value < 0); // sign of the number
			isHalf = value % 1 === 0.5 * sgn;
			f = Math.floor(value);
			
			if (isHalf) {
				switch (mode) {
					case 'PHP_ROUND_HALF_DOWN':
					  value = f + (sgn < 0); // rounds .5 toward zero
					  break;
					case 'PHP_ROUND_HALF_EVEN':
					  value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
					  break;
					case 'PHP_ROUND_HALF_ODD':
					  value = f + !(f % 2); // rounds .5 towards the next odd integer
					  break;
					default:
					  value = f + (sgn > 0); // rounds .5 away from zero
				}
			}
			
			return (isHalf ? value : Math.round(value)) / m;
		}
	},
	highGraph: {
		createGraph: function(location, chartOpts) {
			if($(location).highcharts()) $('#highchartDiv').highcharts().destroy();
			$('#highchartDiv').highcharts(optionsWChart);
		
		},
		distroyGraph:function(location){
			$(location).highcharts().destroy();
		},
		getOptions: function(){
			
		},
		setOptions: function(){	
		
		}
		
	},
	validations: {
		isEmailValid: function(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}
};