<?php
		$lnk = '../assets/imgs/abacus.png';
		$lnk2 = '../assets/imgs/favicon.ico';
		if (strpos($_SERVER['REQUEST_URI'], 'validate_credentials') !== FALSE) {
			$lnk = '../../assets/imgs/abacus.png';
			$lnk2 = '../../assets/imgs/favicon.ico';
		}
		elseif (strpos($_SERVER['REQUEST_URI'], 'index.php') !== FALSE) {
			$lnk = '../assets/imgs/abacus.png';
			$lnk2 = '../assets/imgs/favicon.ico';
		}
		elseif (strpos($_SERVER['REQUEST_URI'], 'index') !== FALSE) {
			$lnk = '../../assets/imgs/abacus.png';
			$lnk2 = '../../assets/imgs/favicon.ico';
		}
		elseif (strpos($_SERVER['REQUEST_URI'], 'login/') !== FALSE) {
			$lnk = '../../assets/imgs/abacus.png';
			$lnk2 = '../../assets/imgs/favicon.ico';
		}
	?>
<!DOCTYPE html>
<html>
  <head>
		<meta charset="UTF-8">
    
		<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
		<meta name="description" content="Designed & Developed by Muhammad Rizwan Waheed">
    <meta name="author" content="Muhammad Rizwan Waheed">
    <meta name="ROBOTS" content="NOINDEX, NOFOLLOW" />
		<meta name="GOOGLEBOT" content="NOINDEX, NOFOLLOW, NOARCHIVE" />
		
		<title>Abacus Agents | Log in</title>
		<link rel="shortcut icon" href="<?=$lnk2;?>" type="image/x-icon">
		<link rel="icon" href="<?=$lnk2;?>" type="image/x-icon">
		<!-- <link rel="icon" type="image/png" href="assets/images/favicon.png"> -->	
    
		
    <!-- Bootstrap 3.3.2 -->
    <link href="<?php echo base_url(); ?>assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="<?php echo base_url(); ?>assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <!-- <link href="< ? php echo base_url(); ?>assets/dist/css/AdminLTE.css" rel="stylesheet" type="text/css" /> -->
    <!-- iCheck -->
    <!-- <link href="< ? php echo base_url(); ?>assets/plugins/iCheck/square/red.css" rel="stylesheet" type="text/css" /> -->
    <style class="cp-pen-styles">@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body ::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #d3f6dc;
  background: -webkit-linear-gradient(top left, #26b34a 0%, #d3f6dc 100%);
  background: linear-gradient(to bottom right, #2cd057 0%, #26b34a 25%, #2cd057 50%, #26b34a 75%, #2cd057 50%);
  position: absolute;
  /* top: 50%; */
  left: 0;
	width: 100%;
	height: 100%;
  /* height: 400px; */
  /* margin-top: -200px; */
  overflow: hidden;
}
.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
          transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
          transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
          transition-timing-function: ease-in-put;
  font-weight: 200;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 300px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 333px;
  color: #53e3a6;
}
form button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 300px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
</style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body >
  <div class="wrapper">
		<div class="container">
			<p class="login-box-msg"><img src=<?=$lnk;?> alt="Abacus ITS-BPO System"></p>
			<h1>Welcome ITS-BPO KPI System</h1>
			
			<?php if(isset($message_error) && $message_error){ ?>
          <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <h4><i class="icon fa fa-ban"></i> Alert!</h4> <?php echo $message ?>
          </div>
        <?php } ?>
        <?php
          $hidden     = array('username' => 'Joe', 'member_id' => '234'); 
          $attributes = array('name' => 'new', 'id' => 'new');
          // echo form_open('Abacus/validate_credentials', $attributes); //, $hidden
        ?>
				<form action="<?php echo base_url('Abacus/validate_credentials'); ?>" method="post"> 
				<input type="hidden" name="<?php echo $this->security->get_csrf_token_name();?>" value="<?php echo $this->security->get_csrf_hash();?>">
				<input type="text" placeholder="ASM ID" name="user_name">
				<input type="password" placeholder="Password" name="password" autocomplete="off">
				<input type="hidden" value="1891826006281981" name="newKey"/>
              <input type="hidden" value=<?=$_SERVER['REMOTE_ADDR']; ?> name="system_ip"/>
				<button type="submit" id="login-button">Login</button>
			</form>
			<?php 
			// echo form_close(); 
			?>
		</div>
		
		<ul class="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>

    <script src="<?php echo base_url(); ?>assets/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="<?php echo base_url(); ?>assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- iCheck -->
    <!-- <script src="< ? p hp echo base_url(); ?>assets/plugins/iCheck/icheck.min.js" type="text/javascript"></script> -->
    <script>
      //localstorage.currentStatus = 0;
      // $(function () {
      //   $('input').iCheck({ checkboxClass: 'icheckbox_square-red', radioClass: 'iradio_square-red', increaseArea: '20%' // optional
      //   });
			// });
			$("#login-button").click(function(event){
					// event.preventDefault();
				
				 $('form').fadeOut(500);
				 $('.wrapper').addClass('form-success');
			});
    </script>
    <script>
			// window.addEventListener("beforeunload", function (e) {
			// 	var confirmationMessage = "tab close";

			// 	(e || window.event).returnValue = confirmationMessage;     //Gecko + IE
				// $.ajax({
        //   type: "POST",
        //   url: 'http://localhost:8642/Abacus/login/true',
        //   async: false           
      	// });
     // return;
		//		sendkeylog(confirmationMessage);
			// 	return confirmationMessage;                                //Webkit, Safari, Chrome etc.
			// }); 
			// window.onbeforeunload = function() {
				
				//alert('unload all');
				// 
				//if (!validNavigation){
          //callServerForBrowserCloseEvent();
         //}
      // }
		  /*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-72489728-1', 'auto');
		  ga('send', 'pageview');*/

	</script>
  </body>
</html>
