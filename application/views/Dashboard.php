<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set("Asia/Karachi"); 
?>
<?PHP //echo '<pre>'; print_r($_SERVER); exit(); ?>

<!DOCTYPE html>
<html>
<head>
<title>Abacus CRM</title>
<base href="/careem/Abacus/welcome/">
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>

<link href="<?php echo base_url(); ?>assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="<?php echo base_url(); ?>assets/plugins/ionicons/css/ionicons.min.css" rel="stylesheet" type="text/css" />
<link href="<?php echo base_url(); ?>assets/plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/datepicker/bootstrap-datepicker.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/timepicker/bootstrap-timepicker.min.css" rel="stylesheet" >
<!-- <link href="<?php echo base_url(); ?>assets/plugins/jquery-bootstrap-scrolling-tabs/dist/jquery.scrolling-tabs.min.css" rel="stylesheet" > -->
<link href="<?php echo base_url(); ?>assets/css/AdminLTE.min.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/autocomplete/style.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/treeview/css/easyTree.css" rel="stylesheet" type="text/css">
<!-- <link href="< ? php echo base_url(); ?>assets/plugins/datatables/DataTables/extensions/TableTools/css/dataTables.tableTools.css" rel="stylesheet" type="text/css"> -->
<link href="<?php echo base_url(); ?>assets/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/isloading/xloader/css/xloader.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/isloading/css/style.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/plugins/iCheck/flat/blue.css" rel="stylesheet" type="text/css" />

<!--link href="< ? ph p ec ho base_url(); ?>assets/ember/animated/dist/ember-animated-outlet.css" rel="stylesheet" type="text/css" / -->
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="<?php echo base_url(); ?>assets/js/html5shiv.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/respond.min.js"></script>
<![endif]-->

<link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/select2/select2.min.css">
<link href="<?php echo base_url(); ?>assets/css/AdminLTE2.min.css" rel="stylesheet" type="text/css">
<link href="<?php echo base_url(); ?>assets/css/AdminLTE.css" rel="stylesheet" type="text/css">
<style>
	div.DTTT { margin-bottom: 0.5em; float: right; }
	div.dataTables_wrapper { clear: both; }
	#showUserAddEditModel .modal-dialog .modal-content {
	    max-width: 1024px; /* your width */
	    min-width: 1024px;
	    outline: none;
	    top:5%;
	    left:-20%;
	}
	#showBrandAmbassadorAddEditModel .modal-dialog .modal-content {
	    max-width: 1024px; /* your width */
	    min-width: 1024px;
	    outline: none;
	    top:5%;
	    left:-20%;
	}
	#aaa .modal-dialog {
	    width: 1000px; /* your width */
	    top:5%;
	    left:15%;
	    outline: none;
	}
	.nav>li #drla {
	    position: relative;
	    display: block;
	    padding: 8px 15px;
	}
	tr.group, tr.group:hover {
	    background-color: #ddd !important;
	}
	.widthMyControl {
	 	width:300px;
	 }
	.btn-xl {
	    padding: 18px 28px;
	    font-size: 22px;
	    border-radius: 8px;
	}
	a.logo img{
		height: 43px;
    	margin-top: -5px;
	}
	.daterangepicker td.active, .daterangepicker td.active:hover {
	    background-color: #28bb4e;
	    border-color: #28bb4e;
	    color: #fff;
	}
	.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
	    z-index: 2;
	    color: #fff;
	    cursor: default;
	    background-color: #28bb4e;
    	border-color: #28bb4e;
	}
	#tatRptTableComplainsList th,td{
	    /*use this property to disbale soft wrap*/
	    white-space: nowrap;
	    /*To make extra certain,add this css property*/
	    word-break: keep-all;

	}
	#loadings {
		background-color: #FFF;
  		overflow: hidden;
	  	width: 100%;
	  	height: 100%;
	  
	}
	.globaloading svg {
	  	width: 50%;
	  	height: 50%;
	  	margin-left: 30%;
	  	margin-top: 5%;
	  	visibility: hidden;
	}
	.info-box-custom {
		display: block;
		min-height: 50px;
		background: #fff;
		width: 100%;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		border-radius: 2px;
		/* margin-bottom: 10px; */
	}
	.info-box-icon-custom {
		border-top-left-radius: 2px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 2px;
		display: block;
		float: left;
		height: 50px;
		width: 50px;
		text-align: center;
		font-size: 25px;
		line-height: 50px;
		background: rgba(0, 0, 0, 0.2);
	}
	.info-box-content-custom {
		padding: 2px 12px;
		margin-left: 50px;
	}
	.info-box-number-custom {
		display: block;
		font-weight: bold;
		font-size: 16px;
	}
	.btn-app-custom {
		/* border-radius: 3px;
		position: relative;
		padding: 15px 5px; */
		margin: 0 0 0 0;
		min-width: 62px;
		height: 50px;
		text-align: center;
		/* color: #666;
		border: 1px solid #ddd;
		background-color: #f4f4f4; 
		font-size: 12px;*/
	}
	/*.btn-danger {
        background-color: #28bb4e;
        border-color: #28bb4e;
    }*/
		.main-header .sidebar-toggle-pause:before {
				content: "\f04c";
		}
		.main-header .sidebar-toggle-play:before {
				content: "\f144";
		}
		.main-header .sidebar-toggle-time:before {
				content: "\f017";
		}
		#dashboard-tabs > .nav-tabs > li > a {
			color:white;
		}
		#dashboard-tabs > .nav-tabs > li.active > a{
			color:black;
		}
		@media (max-width: 767px){
			.skin-careem .main-header > .logo {
					background-color: #ffffff;
					color: #ffffff;
					border-bottom: 0px solid transparent;
					border-right: none;
			}
			.skin-careem .main-header > .logo:hover {
					background: #ffffff;
			}
		}
		
</style>
<script>
	var javaScriptApiPath = '/careem/index.php/api';
	var javaScriptApplicationRoot = '<?php echo base_url();?>';
	/*if (window.location.hash == ''){
		window.location.hash ='/';
	}*/
    var clientMachineIp = "<?php echo $_SERVER['REMOTE_ADDR']; ?>";
    var clientMachineIpA = '<!--#echo var="REMOTE_ADDR"-->';
	var accessesJS = <?php echo  json_encode($accesses); ?>;
	var campaignsJS = <?php echo  json_encode($campiagns); ?>;  
	var iMyMeJS = <?php echo  json_encode($iMyMe); ?>; 
	var stateJS = <?php echo  json_encode($state); ?>; 
</script>

<script src="<?php echo base_url(); ?>assets/plugins/jQuery/jQuery-2.1.3.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/moment.2.6.0.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/TweenMax.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/MorphSVGPlugin.min.js"></script>
<!--script src="< ?php echo base_url();?>assets/ember/dist/lib.app.temp.min.js">
<script src="< ?p hp e cho ba se_ url(); ?>assets/ember/uploader/dist/ember uploaderminjs"> </script></script-->
<script src="<?php echo base_url(); ?>assets/ember/dist/lib.min.js"></script>
<script src="<?php echo base_url(); ?>assets/ember/dist/templates.js"></script>
<script src="<?php echo base_url(); ?>assets/ember/dist/app.con.js"></script>
<!--script src="< ? php echo base_url(); ?>assets/ember/animated/dist/ember-animated-outlet.min.js"> </script-->

</head>
<body class="skin-careem sidebar-open fixed"></body>
<!-- Bootstrap 3.3.2 JS -->
<script src="<?php echo base_url(); ?>assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<!-- Select2 -->
<script src="<?php echo base_url(); ?>assets/plugins/select2/select2.full.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/bootstrap-filestyle/src/bootstrap-filestyle.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/noty/packaged/jquery.noty.packaged.js" ></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/autocomplete/js/jquery.autocomplete.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/ckeditor/adapters/jquery.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/treeview/src/easyTree.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/isloading/jquery.isloading.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/highlight/jquery.highlight-5.closure.js"></script>
<!-- FastClick -->
<script src="<?php echo base_url(); ?>assets/plugins/fastclick/fastclick.min.js"></script>
<!-- <script src="< ?ph p echo base_url(); ?>assets/plugins/jquery-bootstrap-scrolling-tabs/dist/jquery.scrolling-tabs.min.js"></script> -->
<!-- AdminLTE App -->
<script src="<?php echo base_url(); ?>assets/js/app.js" type="text/javascript"></script>
<!-- Sparkline -->
<script src="<?php echo base_url(); ?>assets/plugins/sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
<!-- daterangepicker -->
<script src="<?php echo base_url(); ?>assets/plugins/daterangepicker/daterangepicker.js" type="text/javascript"></script>
<!-- datepicker -->
<script src="<?php echo base_url(); ?>assets/plugins/datepicker/bootstrap-datepicker.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/timepicker/bootstrap-timepicker.min.js"></script>
<!-- iCheck -->
<script src="<?php echo base_url(); ?>assets/plugins/iCheck/icheck.min.js" type="text/javascript"></script>
<!-- SlimScroll 1.3.0 -->
<script src="<?php echo base_url(); ?>assets/plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<!--script src="< ?php echo base_url();?>assets/plugins/Highcharts/js/highcharts.js" type="text/javascript"></script -->
<script src="<?php echo base_url(); ?>assets/plugins/Highstock/js/highstock.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/Highstock/js/highcharts-3d.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/Highstock/js/modules/exporting.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/Highstock/js/modules/drilldown.js" type="text/javascript"></script>

<!-- <script src="< ? php echo base_url(); ?>assets/plugins/datatables/DataTables/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="< ? php echo base_url(); ?>assets/plugins/datatables/export-csv.js" type="text/javascript"></script> 

<script src="< ? php echo base_url(); ?>assets/plugins/datatables/DataTables/extensions/TableTools/js/dataTables.tableTools.min.js" type="text/javascript"></script> -->
<script src="<?php echo base_url(); ?>assets/plugins/datatables/datatables.min.js" type="text/javascript"></script>
<!-- <script src="< ? php echo base_url(); ?>assets/plugins/datatables/jquery.dataTables.rowGrouping.js" type="text/javascript"></script> -->
<!--script src="< ? p h p e c h o  b a s e _ur l ( ) ; ?> a s se t s / js / r o wG r o u p. js" type="text/javascript"></script-->
<!--script src="< ? p h p e c h o bas e _url(); ? >assets/js/demo.js" type="text/javascript"></script-->
<script src="<?php echo base_url(); ?>assets/js/core.js" type="text/javascript"></script>
<script>
	$(function(){
		$("ul.nav-tabs a").click(function (e) {
			e.preventDefault();
			Em.$(this).tab('show');
		});
	});
	var unloaded = false;
	$(window).on('beforeunload', unload);
	$(window).on('unload', unload);	 
	function unload(){		
		if(!unloaded){
			$('body').css('cursor','wait');
			$.ajax({
				type: "post",
				async: false,
				url: window.location.origin+'/Abacus/login/true',
				success:function(){ 
					unloaded = true; 
					$('body').css('cursor','default');
				},
				timeout: 5000
			});
		}
	}
		//onunload & onbeforeunload
	// window.onbeforeunload = function() {

	// 	$.ajax({
	// 		type: "POST",
	// 		url: 'http://localhost:8642/Abacus/login/true',
	// 		async: false           
	// 	});
		//alert('unload all');
				// 
				//if (!validNavigation){
          //callServerForBrowserCloseEvent();
         //}
	// }
	
	
</script>

</html>
