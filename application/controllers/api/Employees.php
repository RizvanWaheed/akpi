<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
class Employees extends REST_Controller {

	//public $layout_view = "empty";
	public function __construct() {
		parent::__construct();
		//	date_default_timezone_set("Asia/Karachi"); 
		$this->load->model('Employees_model');
		//	$this->load->model('UserStateLogs_model');
	}
	public function index_get($id=null){
		
		$employees = $this->Employees_model->get_employees($id, $this->get('user'), $this->get('role_id'));

		if ($employees) {
			$this->response($employees, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'User could not be found'), 404);
		}
	}
	function employees_get($id=null){
		//$this->load->model('Accesses_model');
		
		$employees = $this->Employees_model->get_employees($id, $this->get('user'), $this->get('role_id'));

		if ($employees) {
			$this->response($employees, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'User could not be found'), 404);
		}
	}
	function employees_post() {
		//$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		$employee = $this->post('employee');
		$message = $this->Employees_model->update_employee($employee);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	
}