<?php defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Accesses extends REST_Controller {

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

		$this->load->model('Accesses_model');
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
		
		/*if($this->get('type') == 'doctors'){
			$employees = $this->Accesses_model->get_specific_employees($this->get('area_id'), $this->get('territory_id'), $this->get('treatment_id'));
		}
		else{*/
			$accesses = $this->Accesses_model->get_accesses($id, $this->get('for'));
		//}
		

		if ($accesses) {
			$this->response($accesses, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Access could not be found'), 404);
		}
	}
	function index_post() {
		//$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		$employee = $this->post('access');
		$message = $this->Accesses_model->set_accesses($this->post('access'));
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
}
