<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
class Domains extends REST_Controller {

	function __construct() {
		parent::__construct();
		//	date_default_timezone_set("Asia/Karachi"); 
		$this->load->model('Domains_model');
	}
	function index_get($id=null){			
		
		$roles = $this->Domains_model->getAllDomains($id, $this->get('parent_id'), $this->get('include'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any location!'), 404);
		}
	}
	function index_post($id = null) {

		$this->load->model('Domains_model');

		//print_r($this->get('type'));exit();
		$roles = $this->Domains_model->setAllDomains($this->post('role'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}
	}
	
}
