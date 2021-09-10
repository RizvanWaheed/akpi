<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
class Departments extends REST_Controller {

	function __construct() {
		parent::__construct();
		//	date_default_timezone_set("Asia/Karachi"); 
		$this->load->model('Departments_model');
	}
	function index_get($id=null){			
		
		$roles = $this->Departments_model->getAllDepartments($id, $this->get('parent_id'), $this->get('include'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any location!'), 404);
		}
	}
	function index_post($id = null) {

		$this->load->model('Departments_model');

		//print_r($this->get('type'));exit();
		$roles = $this->Departments_model->setAllDepartments($this->post('role'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}
	}
	
}
