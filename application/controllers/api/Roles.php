<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
class Roles extends REST_Controller {

	function __construct() {
		parent::__construct();
		//	date_default_timezone_set("Asia/Karachi"); 
		$this->load->model('Roles_model');
	}
	function index_get($id=null){			
		
		$roles = $this->Roles_model->getAllRoles($id);

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function index_post($id = null) {

		$this->load->model('Roles_model');

		//print_r($this->get('type'));exit();
		$roles = $this->Roles_model->setAllRoles($this->post('role'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	
}
