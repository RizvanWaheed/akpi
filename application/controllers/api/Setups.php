<?php defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Setups extends REST_Controller {

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

		$this->load->model('Setups_model');
		// $this->load->model('CustomerMeasurements_model');
		// Configure limits on our controller methods. Ensure
		// you have created the 'limits' table and enabled 'limits'
		// within application/config/rest.php
		// $this->methods['setup_get']['limit'] = 500; //500 requests per hour per setup/key
		// $this->methods['setup_post']['limit'] = 100; //100 requests per hour per setup/key
		// $this->methods['setup_delete']['limit'] = 50; //50 requests per hour per setup/key
	}
	function index_get($id=null) {
		//$setup = $this->get('service_center_id');
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];

		//print_r($this->get('base_id'));
		//exit();
		// $role_id = $sess_data['data_logged_in']['role_id'];
		// $region_id = $sess_data['data_logged_in']['region_id'];
		// $area_id = $sess_data['data_logged_in']['area_id'];
		// $territory_id = $sess_data['data_logged_in']['territory_id'];
		//$company_id = $sess_data['data_logged_in']['company_id'];

		
		$stup = $this->Setups_model->get($this->get('base_id'), $this->get('group'));
		if ($stup) {
			$this->response($stup, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Setup could not be found'), 404);
		}
	}
	function index_post() {
		//$this->load->model('Setups_model');
		//$this->some_model->updateSetup( $this->get('id') );
		//$Setup = $this->post('user');
		$user = $this->post('user');
		if($user['id'] == 0){
			$message = $this->Setups_model->save($this->post('user'));
		}
		else{
			$message = $this->Setups_model->update_user($this->post('user'));
		}
		
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function index_put() {
		//print_r( $this->put('user')); exit();
		//$this->load->model('Setups_model');
		//$this->some_model->updateSetup( $this->get('id') );
		//$Setup = $this->put('Setup');
		$message = $this->Setups_model->update_user($this->put('user'));
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function index_delete($id){
		//print_r($id);
		//$this->Setups_model->Setup_id = $id;
		$Setups = array('id'=> $id,'active' => 'N', 'deleted' => 1);
		//$this->Setups_model->Setups = $Setups;
		$result = $this->Setups_model->update_user($Setups);
		
		if ($result) {
			$this->response($result, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Not Saved!'), 404 );
		}
		//print_r($this->delete('visitor')); exit();
	}
}
