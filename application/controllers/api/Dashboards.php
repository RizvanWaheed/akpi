<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Example
 *
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array.
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Phil Sturgeon
 * @link		http://philsturgeon.co.uk/code/
 */

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Dashboards extends REST_Controller {
	function __construct() {
		// Construct our parent class
		date_default_timezone_set("Asia/Karachi"); 
		parent::__construct();
		ini_set('MAX_EXECUTION_TIME', 0);
		//error_reporting(E_ALL);  // turn on all errors, warnings and notices for easier debugging
		//ini_set('max_execution_time', 123456);
		ini_set('max_input_time', -1);
		ini_set('memory_limit', '512M');
		set_time_limit(0);

		if (!$this->session->userdata('is_logged_in')) {
			// header('Location');	// echo base_url(); // header('Location:'.base_url());
			$this->load->view('login');
			return 'sessionEnd';
		}

		$this->load->model('Users_model');
		$this->load->model('Products_model');
		$this->load->model('Problems_model');
		$this->load->model('Modals_model');
		$this->load->model('Spareparts_model');
		$this->load->model('Complaints_model');
		$this->load->model('ComplaintLog_model');
		$this->load->model('Customers_model');
		$this->load->model('ComplaintSpareparts_model');
		$this->load->model('Monitorings_model');
		$this->load->model('monitoringScores_model');
		$this->load->model('MonitoringCategories_model');
		$this->load->model('MonitoringEmailDrivers_model');
		$this->load->model('UserStateLogs_model');
		$this->load->model('Activities_model');
		$this->load->model('Options_model');
		$this->load->model('Questions_model');
		$this->load->model('MonitoringFors_model');
		$this->load->model('Departments_model');
		$this->load->model('Dispositions_model');
		$this->load->model('Callers_model');
		$this->load->model('ComplaintStates_model');
		$this->load->model('Accalations_model');
		$this->load->model('AccalationLogs_model');
		$this->load->model('ActivitiesAdjustments_model');
		$this->load->model('ActivitiesEscalations_model');
		$this->load->model('AccessCampiagns_model');
		$this->load->model('SurveyQuestions_model');
		$this->load->model('SurveyResults_model');
		$this->load->model('Surveys_model');
		$this->load->model('SurveyUsers_model');
		// Configure limits on our controller methods. Ensure
		// you have created the 'limits' table and enabled 'limits'
		// within application/config/rest.php
		// $this->methods['user_get']['limit'] = 500; //500 requests per hour per user/key
		// $this->methods['user_post']['limit'] = 100; //100 requests per hour per user/key
		// $this->methods['user_delete']['limit'] = 50; //50 requests per hour per user/key
	}
	function activities_hourly_get(){
		//$current = $this->UserStateLogs_model->getHourlyStatesDashboard($this->get('from_date'), $this->get('from_date'));
		$current = $this->Activities_model->getHourlyActivitiesDashboard($this->get('from_date'), $this->get('from_date'));
		if ($current) {
			$this->response($current, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save servey!'), 404);
		}
	}
	function activities_get(){
		$current = $this->Activities_model->getActivitiesDashboard($this->get('from_date'), $this->get('from_date'));
		if ($current) {
			$this->response($current, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save servey!'), 404);
		}
	}
	function getSurveyResults_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$current = $this->Surveys_model->getSurveyDashboard($this->get('id'));
		// $survey_result_response = $this->SurveyResults_model->getMySurvey();
		// $response = array();
		// $response['stats'] = $current_states_log;
		// $response['survey'] = $survey_result_response; 
		//print_r($current_states_log);
		if ($current) {
			$this->response($current, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save servey!'), 404);
		}
	}

}
