<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
class Users extends REST_Controller {

	//public $layout_view = "empty";
	public function __construct() {
		parent::__construct();
		//	date_default_timezone_set("Asia/Karachi"); 
		$this->load->model('Users_model');
		$this->load->model('UserStateLogs_model');
	}
	function logout_post(){
		if($this->session->userdata('is_logged_in')){
			$this->UserStateLogs_model->setUserStatsLogs(5, $_SERVER['REMOTE_ADDR']);
			if(isset($this->session->userdata['data_logged_in']['id'])){
				$is_valid = $this->Users_model->logout();
				if($is_valid){
					$this->session->sess_destroy();
					unset($this->userLogin);
				}
			} 
		}
	}
	function users_get($id=null){
		
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		
		if($id == 'employee_id'){
			$id = $this->get('employee_id');
		}
		if (empty($this->get('role_id'))) {
			if ($id == null) {
				$users = $this->Users_model->get_users();
			} else {
				$users = $this->Users_model->get_user_by_id($id);
			}
		} else {
			if (empty($this->get('condition'))) {
				$users = $this->Users_model->get_user_by_role_id($this->get('role_id'), $role_id);
			} else {
				$users = $this->Users_model->get_user_greater_or_equal_role_id($this->get('role_id'), $role_id);
			}

		}

		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function users_post() {
		$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		$user = $this->post('user');
		$message = $this->Users_model->update_user($user);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	
}
