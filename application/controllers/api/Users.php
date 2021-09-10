<?php defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Users extends REST_Controller {

	private $telSmsSession;
	private $telSmsSending;
	private $telSmsMsisdn;
	private $telSmsPassword;

	function __construct() {
		parent::__construct();
		ini_set('MAX_EXECUTION_TIME', 0);
		//error_reporting(E_ALL);  // turn on all errors, warnings and notices for easier debugging
		//ini_set('max_execution_time', 123456);
		ini_set('max_input_time', -1);
		ini_set('memory_limit', '512M');
		set_time_limit(0);

		$this->load->model('Users_model');
		// $this->load->model('CustomerMeasurements_model');
		// Configure limits on our controller methods. Ensure
		// you have created the 'limits' table and enabled 'limits'
		// within application/config/rest.php
		// $this->methods['user_get']['limit'] = 500; //500 requests per hour per user/key
		// $this->methods['user_post']['limit'] = 100; //100 requests per hour per user/key
		// $this->methods['user_delete']['limit'] = 50; //50 requests per hour per user/key
	}
	function index_get($id=null) {
		//$user = $this->get('service_center_id');
		$sess_data = $this->session->userdata;
		
		// print_r($sess_data);
		// print_r($this->get('search'));
		// exit();

		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$project_id = $sess_data['data_logged_in']['project_id'];
		$center_id = $sess_data['data_logged_in']['center_id'];
		$reportee = $sess_data['data_logged_in']['reportee'];

		$this->Users_model->reportee = $reportee; 

		$search = $this->get('search');
		$form = $this->get('form');
		if(!empty($search)){
			
			if($role_id == 314 || $role_id == 313 || $role_id == 312){
				$this->Users_model->center_id = isset($search['center_id'])?$search['center_id']:$center_id;
				$this->Users_model->project_id = isset($search['project_id'])?$search['project_id']:$project_id;
			}
			else if($form != 'access_form'){
				$this->Users_model->center_id = isset($search['center_id'])?$search['center_id']:null;
				$this->Users_model->project_id = isset($search['project_id'])?$search['project_id']:null;
			}
			$this->Users_model->role_id = isset($search['role_id'])?$search['role_id']:$role_id; 
			$this->Users_model->reporting = isset($search['reporting'])?$search['reporting']:null; 
			
		}
		$users = $this->Users_model->get();
		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'User could not be found'), 404);
		}
		// $role_id = $sess_data['data_logged_in']['role_id'];
		// $region_id = $sess_data['data_logged_in']['region_id'];
		// $area_id = $sess_data['data_logged_in']['ar;ea_id'];
		// $territory_id = $sess_data['data_logged_in']['territory_id'];
		// $company_id = $sess_data['data_logged_in']['company_id'];
		// print_r($this->get('search')); exit();
		// if (!empty($this->get('employee_id'))) {
		// 	$users = $this->Users_model->get_user_by_employee_id($this->get('employee_id'));
		// } 
		// else if ($this->get('from') == 'main') {
		// 	//print_r($this->get('search'));
		// 	$users = $this->Users_model->get_users($this->get('search'),$this->get('order'),$this->get('direction'),$this->get('page'),$this->get('limit'));
		// }
		// else if (empty($this->get('role_id'))) {
		// 	if ($id == null) {
		// 		$users = $this->Users_model->get_users($this->get('search'),$this->get('order'),$this->get('direction'),$this->get('page'),$this->get('limit'));
		// 		//$users = $this->Users_model->get_users($id);
		// 	} else {
		// 		$users = $this->Users_model->get_user_by_id($id);
		// 	}
		// } else {
		// 	if (empty($this->get('condition'))) {
		// 		$users = $this->Users_model->get_user_by_role_id($this->get('role_id'), $role_id);
		// 	} else {
		// 		$users = $this->Users_model->get_user_greater_or_equal_role_id($this->get('role_id'), $role_id);
		// 	}

		// }
		

		
	}
	function index_post() {
		//$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		//$User = $this->post('user');
		$user = $this->post('user');
		if($user['id'] == 0){
			$message = $this->Users_model->save($this->post('user'));
		}
		else{
			$message = $this->Users_model->update_user($this->post('user'));
		}
		
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function index_put() {
		//print_r( $this->put('user')); exit();
		//$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		//$User = $this->put('User');
		$message = $this->Users_model->update_user($this->put('user'));
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function index_delete($id){
		//print_r($id);
		//$this->Users_model->User_id = $id;
		$Users = array('id'=> $id,'active' => 'N', 'deleted' => 1);
		//$this->Users_model->Users = $Users;
		$result = $this->Users_model->update_user($Users);
		
		if ($result) {
			$this->response($result, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Not Saved!'), 404 );
		}
		//print_r($this->delete('visitor')); exit();
	}
}
