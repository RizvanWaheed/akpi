<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Abacus extends CI_Controller {

	function __construct() {
        parent::__construct();
        ini_set('MAX_EXECUTION_TIME', 0);
		ini_set('max_input_time', -1);
		ini_set('memory_limit', '2048M');
		set_time_limit(0);

		date_default_timezone_set('Asia/Karachi');

		$this->load->model('Modules_model');
        $this->load->model('Accesses_model');
		$this->load->model('UserStateLogs_model');
		$this->load->model('UserStateLogChecks_model');
		$this->load->model('AccessCampiagns_model');
	}
	function loginDecode($value){
		return base64_decode(strrev($value));
	}
	function loginEncode($value){
		return strrev(base64_encode($value));
	}
    public function index(){
    	if(!isset($this->session->userdata['is_logged_in'])){
			redirect(base_url('/Abacus/login/'), TRUE);
		}
		else{
			redirect(base_url('/Abacus/bpo/'),TRUE);
		}
	}
	private function conditional_logout($user_id=null, $last_time=null){

		// $state = $this->UserStateLogs_model->getMystate();
		// $daat = $this->UserStateLogChecks_model->getMystate($state['id']);
		
		
		if($this->UserStateLogs_model->setUserStatsLogs(5, $_SERVER['REMOTE_ADDR'], $user_id , $last_time)){
			$this->UserStateLogs_model->setUserStatsLogsChecks();
			$is_valid = $this->Users_model->logout();
			if($is_valid){
				$this->session->sess_destroy();
				unset($this->userLogin);

				$data  = "";
				redirect('Abacus/login');
			}
		}
	} 
	public function bpo($name=null)
	{
		//print_r(isset($this->session->userdata['is_logged_in']));
		
		if(!isset($this->session->userdata['is_logged_in'])){
			$data['message_error'] = TRUE;
			$data['message'] = "Your session is expire please login to start session";
			$this->load->view('Login', $data);
		}
		else{		
			// $default_access = array(array(
			// 	'id' => 4,
			// 	'name' => 'My Link',
			// 	'link' => 'myLink',
			// 	'module_id' => 1,
			// 	// 'status'=> 1,
			// 	// 'font' => ''
			// ),
			// array(
			// 	'id' => 9,
			// 	'name' => 'Index',
			// 	'link' => 'index',
			// 	'module_id' => 4,
			// 	// 'status'=> 1,
			// 	// 'font' => ''
			// ));
			// $access = $this->Accesses_model->getMyAccesses();
			// $accesses = array_merge($default_access,$access);
			
			$accesses = $this->Modules_model->get_my_modules(0)['modules'];

			// echo '<pre>'; 
			// // print_r($default_access);
			// print_r($accesses); 
			// exit();
			// $campiagns = $this->AccessCampiagns_model->getMyAccessCampiagn();
			//$projects = $this->AccessCampiagns_model->getMyAccessProject();
			//  echo '<pre>'; 
			// print_r($projects);
			// print_r($campiagns);	exit();
			$state = $this->UserStateLogs_model->getMystate();
			// print_r($state);
			if(strtolower($state['name']) == 'working'){
				$daat = $this->UserStateLogChecks_model->getMystate($state['id']);
			//	echo date('Y-m-d H:i:s');
				$from_time = strtotime($daat['latest_time']);
				$to_time = strtotime(date('Y-m-d H:i:s'));
				$seconds = ($to_time - $from_time);
				if(($seconds/60) > 5){
					// echo 'update and logout.';
					$this->conditional_logout(null, $daat['latest_time']);
				}
			}
			// exit();
			// if (empty($accesses)) {
			// 	$data['message_error'] = TRUE;
			// 	$data['message'] = "Please ask your admin for access rights";
			// 	$this->load->view('Login', $data);
			// }
			// if (empty($campiagns)) {
			// 	$data['message_error'] = TRUE;
			// 	$data['message'] = "Please ask your admin for campiagn rights";
			// 	$this->load->view('Login', $data);
			// }			
			// else 
			if (empty($state) || $state['user_state_id'] == 5) {
				$data['message_error'] = TRUE;
				$data['message'] = "Your session is ended please relogin";
				$this->load->view('Login', $data);
			}
			else{
				$sess_data = $this->session->userdata['data_logged_in'];
				//$data = array('accesses'=> $accesses);
				// echo '<pre>'; 
				// print_r($sess_data); 
				// exit();
				
				$data = array();
				$data['accesses'] = $accesses;
				//$data['campiagns'] = $campiagns;
				//$data['project'] = $this->AccessCampiagns_model->getMyAccessProject();
				$data['state'] = $state;
				// $data['iMyMe']['active'] = $sess_data['active'];
				// $data['iMyMe']['area_id'] = $sess_data['area_id'];
				// $data['iMyMe']['attendence_shift_id'] = $sess_data['attendence_shift_id'];
				// $data['iMyMe']['cell'] = $sess_data['cell'];
				$data['iMyMe']['id'] = $sess_data['id'];
				$data['iMyMe']['login'] = $sess_data['login'];
				$data['iMyMe']['name'] = $sess_data['name'];				
				$data['iMyMe']['role_id'] = $sess_data['role_id'];
				
				$data['iMyMe']['project'] = $sess_data['project'];
				$data['iMyMe']['campaign'] = $sess_data['campaign'];
				$data['iMyMe']['subcampaign'] = $sess_data['subcampaign'];
		
				$data['iMyMe']['project_id'] = $sess_data['project_id'];
				$data['iMyMe']['campaign_id'] = $sess_data['campaign_id'];
				$data['iMyMe']['sub_campaign_id'] = $sess_data['sub_campaign_id'];

				// $data['iMyMe']['territory_id'] = $sess_data['territory_id'];
				// $data['iMyMe']['name'] = $sess_data['name'];
				// $data['iMyMe']['wing_id'] = $sess_data['wing_id'];
		// 		echo '<pre>';
		// print_r($data);
		// exit();
				$this->load->view('Bpo', $data);
			}
			
		}
		
	}
	// public function password($name=null){
	// 	$this->bpo();
	// }
	public function administrator($name=null){
		$this->bpo();
	}
	public function reports($name=null){
		$this->bpo();
	}
	public function quality($name=null){
		$this->bpo();
	}
	public function teamlead($name=null){
		$this->bpo();
	}
	public function agents($name=null){
		$this->bpo();
	}
	public function complaints($name=null){
		$this->bpo();
	}
	public function accalations($name=null){
		$this->bpo();
	}
	public function roles(){
		$this->bpo();
	}
	public function employees(){
		$this->bpo();
	}
	public function accesses(){
		$this->bpo();
	}
	public function agenttickets(){
		$this->bpo();
	}
	public function login($timeout=false)
 	{
 		if($timeout==true && $this->session->userdata('is_logged_in')){
			$state = $this->UserStateLogs_model->getMystate();
			$daat = $this->UserStateLogChecks_model->getMystate($state['id']);
			$this->conditional_logout(null, $daat['latest_time']);

 			// $this->UserStateLogs_model->setUserStatsLogs(5, $_SERVER['REMOTE_ADDR']);
 			// if(isset($this->session->userdata['data_logged_in']['id'])){
			// 	$is_valid = $this->Users_model->logout();
			// 	if($is_valid){
			// 		$this->session->sess_destroy();
			// 		unset($this->userLogin);
			// 	}
			// } 			
 		}
        $this->load->view('login'); 
 	}
 	function __encrip_password($password) {
		return md5($password);
 	}
 	function validate_credentials() {
		//echo "<pre>";
		$this->load->model('Users_model');
		//print_r($this->input->post('user_name').'---');
		//print_r($this->input->post('password'));
        //print_r($this->input->post('newKey'));        
        // return;
        $newKey = $this->input->post('newKey');
        $system_ip = $this->input->post('system_ip');
        if($newKey == '1891826006281981'){


        	$already_login_person = $this->UserStateLogs_model->getLoginUserIPStatsLogs($system_ip);
			//print_r($already_login_person); 
			/////////////////////////////// Todo ////////////////////////////////
        	// check login person ID matches then let it login again
        	/////////////////////////////////////////////////////////////////////
			if(!empty($already_login_person)){
				//echo 'Im in';
				$data['message_error'] = TRUE;
				$data['message'] = 'Another user login on System  
					<form action="reset_credentials" id="old" name="old" method="post">
						<input type="hidden" name="'.$this->security->get_csrf_token_name().'" value="'.$this->security->get_csrf_hash().'">
						<div class="form-group has-feedback">
				            <input type="text" class="form-control" placeholder="User Name" name="ruser_name"/>
				            <span class="glyphicon glyphicon-user form-control-feedback"></span>
				        </div>
				        <div class="form-group has-feedback">
				            <input type="password" class="form-control" placeholder="Password" name="rpassword" autocomplete="off"/>
				            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
				        </div>
						<input type="hidden" value="1891826006281981" name="rnewKey"/>
              			<input type="hidden" value='.$_SERVER['REMOTE_ADDR'].' name="rsystem_ip"/>
              			<input type="hidden" value='.$already_login_person['id'].' name="ruser_id"/>
						<button type="submit" class="btn btn-careem btn-block btn-flat">Logout '.$already_login_person['name'].' and login </button>
					</form>';
				 $this->load->view('login', $data);
			}
			else{

				$user_name = $this->input->post('user_name');
				// $password = $this->__encrip_password($this->input->post('password'));
				$password = md5($this->input->post('password'));
				$is_valid = $this->Users_model->validate($user_name, $password, $_SERVER['REMOTE_ADDR']);
				$current = $this->UserStateLogs_model->getLoginUserStatsLogs($is_valid['id']);
		// 		echo '<pre>';
		// 		print_r($current);
		// 		print_r($is_valid);
				
		// 		print_r($this->input->post('user_name').'---');
		// print_r($this->input->post('password'));
        // print_r($this->input->post('newKey'));        
		// 		exit();
				
				
				//$campaign = $this->AccessCampiagns_model->getMyAccessCampiagn($is_valid['id']);
				if (!empty($is_valid) && (empty($current) || $current['user_state_id'] ==5) ) {
					
					$data = array('data_logged_in' => $is_valid, 'is_logged_in' => true	);//'data_campaign' => array_column($campaign, 'id'), 
					$this->userLogin = $is_valid;
					$this->session->set_userdata($data);
					if($this->UserStateLogs_model->setUserStatsLogs(1, $system_ip)){
						/*$this->UserStateLogs_model->setUserStatsLogs(4, $system_ip);
						redirect(base_url('/Abacus/bpo/'));*/
						if($this->UserStateLogs_model->setUserStatsLogs(4, $system_ip)){
							$this->UserStateLogs_model->setUserStatsLogsChecks();
							redirect(base_url('/Abacus/bpo/'));	
						}	
					}					
				} else if(empty($is_valid)){
					$data['message_error'] = TRUE;
					$data['message'] = "Invalid username or password";
					//redirect('users');  Edited by --/0321/4823037/--
					$this->load->view('login', $data);
				}else if(!empty($current) || $current['user_state_id'] !=5 ){
					$data['message_error'] = TRUE;
					$data['message'] = "You are already login on another system -> ".$current['created_ip'];
					//redirect('users');  Edited by --/0321/4823037/--
					$this->load->view('login', $data);
				}else {// incorrect username or password
					$data['message_error'] = TRUE;
					$data['message'] = "Sorry for the inconvenience try to login again!";
					//redirect('users');  Edited by --/0321/4823037/--
					$this->load->view('login', $data);
				}
			}// Ip Wise User Else
			//exit();
			
		}// CSRF Wise User Else
		//if($is_valid[0]['role_id'] == 1){
		///	redirect('/BpoPTC');
		//}
		//else{
			
		//}
		

	}
	public function verfy(){
		if($this->input->get()==TRUE){
	         $user = $this->input->get('user');
	         $pwd  = md5($this->input->get('password'));
	         $result = $this->UserModel->verfy($user,$pwd); 
	         if(!empty($result)){
                $UserNam = $result[0]->login;
                $UserID = $result[0]->id;
                $user_role = $result[0]->role_id;
                $this->session->set_userdata('user_name', $UserNam);
                $this->session->set_userdata('user_id', $UserID);  
                $this->session->set_userdata('user_role',$user_role);
               // console.log("this is user roldID"+$user_role);
                
                $this->session->set_userdata('logged_in', true); 
                
                if($user_role=='5'){                    
                    redirect(base_url('Abacus/login'));                    
                }else{
                    redirect(base_url('Abacus/login'));
                }
	                    
	         }else{
	             redirect(base_url('Abacus/login'));
	        } 
	    }
    }
 	function reset_credentials() {
		$sess_array = $this->session->all_userdata();
		//print_r($sess_array);
		/*
		$this->session->sess_destroy();
		foreach($sess_array as $key =>$val){
		   print_r($key); echo '--------------------------';
		   print_r($val);
		   //if($key!='session_id'||$key!='last_activity'||$key!='admin_id'){
		  		$this->session->unset_userdata($key);
		   // }
		}
		*/ 
		//exit();

		//print_r($this->input->post); exit();

		$newKey = $this->input->post('rnewKey');
        $system_ip = $this->input->post('rsystem_ip');
        if($newKey == '1891826006281981'){
        	$user_id = $this->input->post('ruser_id');
        	$user_name = $this->input->post('ruser_name');
			$password = md5($this->input->post('rpassword'));
        	//$this->login_with_credential($user_name, $password, $system_ip, $user_id);
        	$is_valid = $this->Users_model->validate($user_name, $password, $system_ip);
        	//print_r($is_valid);        	
        	$is_valid2 = $this->UserStateLogs_model->setUserStatsLogoutLogs(5, $system_ip, $user_id, $is_valid['id']);
        	//print_r($is_valid2); //exit();        	
        	$is_valid = $this->Users_model->otherLogout($user_id);
			if($is_valid){
				unset($this->userLogin);
				$this->session->sess_destroy();
				$sess_array = $this->session->all_userdata();
				/*foreach($sess_array as $key =>$val){
				   print_r($key);
				   print_r($val);
				   //if($key!='session_id'||$key!='last_activity'||$key!='admin_id'){
				  		// $this->session->unset_userdata($key);
				   // }
				}*/
				/*$this->session->sess_destroy();
				$data  = "";*/
				redirect('Abacus/login');
			}


        }
			
		/*$is_valid = $this->Users_model->otherLogout();
		if($is_valid){
			$this->session->sess_destroy();
			unset($this->userLogin);

			$data  = "";
			redirect('/');
		}*/
		//	$this->load->view('login', $data);
	}
	public function logout() {
		//$this->session->unset_userdata();
		//$this->load->model('Users_model');
		/*$state2 = array('user_state_id' => 5
					, 'user_id' => $this->session->userdata['data_logged_in']['id']
					, 'date' => date("Y-m-d")
					, 'time' => date("H:i:s")
					, 'start_time' => time()
					, 'system_ip' => $system_ip
					);*/
					//$_SERVER['REMOTE_ADDR'];
		if(!isset($this->session->userdata['data_logged_in']['id'])){
			redirect('Abacus/login');
		}	
		$state = $this->UserStateLogs_model->getMystate();
		$daat = $this->UserStateLogChecks_model->getMystate($state['id']);
		$this->conditional_logout(null, $daat['latest_time']);		
		// redirect('Abacus/login');
		// if($this->UserStateLogs_model->setUserStatsLogs(5, $_SERVER['REMOTE_ADDR'])){
		// 	$this->UserStateLogs_model->setUserStatsLogsChecks();
		// 	$is_valid = $this->Users_model->logout();
		// 	if($is_valid){
		// 		$this->session->sess_destroy();
		// 		unset($this->userLogin);

		// 		$data  = "";
		// 		redirect('Abacus/login');
		// 	}
		// }
	//	$this->load->view('login', $data);
	}//edit
	public function logoutmain()
	{
        $this->session->unset_userdata('user_name');
        $this->session->unset_userdata('user_id');
        $this->session->unset_userdata('logged_in');
        redirect(base_url('Abacus/login'), 'refresh');
	}
 	public function notfound()
 	{ 
    	$content['view'] = __FUNCTION__;
    	$this->load->view('page', $content);
 	}
}
