<?php defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Rights extends REST_Controller {

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

		$this->load->model('AccessCampiagns_model');
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
		
		if($this->get('user_id')){
			echo 'in user id';
			$accesses = $this->AccessCampiagns_model->getMyUserAccessCampiagn($this->get('user_id')); //$this->userRight($this->get('user_id'));
		}
		else{
			echo 'not in';
			$accesses = $this->AccessCampiagns_model->getMyAccessCampiagn();
		}
		
		if (!empty($accesses)) {
			$this->response( array('rights' => $accesses), 200);
		} else {
			$this->response(array('error' => 'Please ask your administrator for rights.'), 404);
		}
	}
	function index_post() {
		//$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		$employee = $this->post('access');
		$message = $this->AccessCampiagns_model->set_accesses($this->post('access'));
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
}
