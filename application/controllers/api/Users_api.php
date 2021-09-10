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

class Users_Api extends REST_Controller {
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
		$this->load->model('MonitoringFields_model');
		// Configure limits on our controller methods. Ensure
		// you have created the 'limits' table and enabled 'limits'
		// within application/config/rest.php
		// $this->methods['user_get']['limit'] = 500; //500 requests per hour per user/key
		// $this->methods['user_post']['limit'] = 100; //100 requests per hour per user/key
		// $this->methods['user_delete']['limit'] = 50; //50 requests per hour per user/key
	}
	function setUnload_post(){

		$this->UserStateLogs_model->setUserStatsLogsUnloads();
	
		print_r('we are in');
		exit();
		

		// print_r($this->post('agent_data_id'));
		// print_r($this->post('business_category_id'));
		// print_r($this->post('checked'));
		// print_r($this->post());
		// $this->load->model('AgentDataCategoryDetail_model');
		// $shift_timings = $this->AgentDataCategoryDetail_model->saveUpdate($this->post());
		// if ($shift_timings) {
		// 	$this->response($shift_timings, 200); // 200 being the HTTP response code
		// } else {
		// 	$this->response(array('error' => 'Couldn\'t save data!'), 404);
		// }
	}
	function agenttasks_post(){
		// print_r($this->post('agent_data_id'));
		// print_r($this->post('business_category_id'));
		// print_r($this->post('checked'));
		// print_r($this->post());
		$this->load->model('AgentDataCategoryDetail_model');
		$shift_timings = $this->AgentDataCategoryDetail_model->saveUpdate($this->post());
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save data!'), 404);
		}
	}
	function tasks_get($id = null){
		$this->load->model('BusinessCategories_model');
		$id = ($id == null)?$this->get('id'):$id;
		//$id = $id || $this->get('id');
		// $vocs = array();//$this->post('voc');
		// $vocs['date(created)'] = date('Y-m-d');
		// $vocs['created_by'] = $user_id;
		
		// unset($vocs['id']);
		// print_r($vocs);
		// echo 'we r working';
		// exit();

		$shift_timings = $this->BusinessCategories_model->findAll($id);
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save data!'), 404);
		}
	}
	function setUserTasks_post(){
		$this->load->model('AgentData_model');
		// $vocs = array();//$this->post('voc');
		// $vocs['date(created)'] = date('Y-m-d');
		// $vocs['created_by'] = $user_id;
		
		// unset($vocs['id']);
		// print_r($vocs);
		// echo 'we r working';
		// exit();

		$shift_timings = $this->AgentData_model->saveUsersTasks($this->post('id'), $this->post('status'));
		//print_r($shift_timings);
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find task in list!'), 404);
		}
	}
	function getUserTasks_get(){
		$this->load->model('AgentData_model');
		// $vocs = array();//$this->post('voc');
		// $vocs['date(created)'] = date('Y-m-d');
		// $vocs['created_by'] = $user_id;
		
		// unset($vocs['id']);
		// print_r($vocs);
		// echo 'we r working';
		// exit();

		$shift_timings = $this->AgentData_model->findAllByUsersTasks($this->get('status'), $this->get('user'));
		//print_r($shift_timings);
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find task in list!'), 404);
		}
	}
	function agentTasks_get(){
		$this->load->model('AgentData_model');
		// $vocs = array();//$this->post('voc');
		// $vocs['date(created)'] = date('Y-m-d');
		// $vocs['created_by'] = $user_id;
		
		// unset($vocs['id']);
		// print_r($vocs);
		// echo 'we r working';
		// exit();

		$shift_timings = $this->AgentData_model->findAllByUsers($this->get('status'));
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save data!'), 404);
		}
	}
	function vocs_get(){
		$this->load->model('Voc_model');
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];

		// $vocs = array();//$this->post('voc');
		// $vocs['date(created)'] = date('Y-m-d');
		// $vocs['created_by'] = $user_id;
		
		// unset($vocs['id']);
		// print_r($vocs);
		// echo 'we r working';
		// exit();

		$shift_timings = $this->Voc_model->findAll($user_id);
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save voc data!'), 404);
		}
	}
	function vocs_post(){
		$this->load->model('Voc_model');
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];

		$vocs = $this->post('voc');
		$vocs['created'] = date('Y-m-d H:i:s');
		$vocs['created_by'] = $user_id;
		// unset($vocs['id']);
		// print_r($vocs);
		// echo 'we r working';
		// exit();

		$shift_timings = $this->Voc_model->save($vocs);
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save voc data!'), 404);
		}
	}
	function vocSetups_get(){
		$this->load->model('vocSetups_model');
		$shift_timings = $this->vocSetups_model->findAll();
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save servey!'), 404);
		}
	}
	function shiftTimings_get(){
		$this->load->model('ShiftTimings_model');
		$shift_timings = $this->ShiftTimings_model->findAll();
		if ($shift_timings) {
			$this->response($shift_timings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save servey!'), 404);
		}


	}
	function uploadInOutTimesFile_post($id = null) {
		$this->load->library('csvfile');
		$this->load->model('UserShifts_model');
		$this->load->model('ShiftTimings_model');
		$this->load->model('ShiftDays_model');

		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		
		$from_date = $this->input->post('fromDate');
		$this->UserShifts_model->deleteMany($from_date);
		//$monitoring_for_id = $this->input->post('monitoring_for_id');
		//$type = $this->input->post('type');
		$path = $_FILES['file']['tmp_name'];
		$result = $this->csvfile->parse_file($path);
		foreach ($result as $key => $index) {
			if (empty($index['date'])) {
				$result[$key]['date'] = $from_date;
				$result[$key]['uploaded_by'] = $user_id;
				$result[$key]['uploaded'] = date('Y-m-d H:i:s');
				$result[$key]['user_id'] = $this->Users_model->loginidToUserid($index['user_id']);
				if(strtotime($index['to_time'])){
					// echo $index['to_time'].'---'.strtotime($index['to_time']).'\n';

					$result[$key]['shift_timing_id'] = $this->ShiftTimings_model->findKey($index['from_time'], $index['to_time']);
					$result[$key]['shift_day_id'] = 7;
					
					$result[$key]['from_time'] = strtotime('-1 hours', strtotime($from_date.' '.$result[$key]['from_time']));
					$result[$key]['to_time'] = strtotime('1 hours', strtotime($from_date.' '.$result[$key]['to_time']));
				}else{
					//$index['to_time'];
					$result[$key]['shift_timing_id'] = 1;
					$result[$key]['shift_day_id'] = $this->ShiftDays_model->findKey(str_replace(' ','_',strtolower(trim($index['from_time']))));
					$result[$key]['from_time'] = strtotime($from_date.' 00:00:00');
					$result[$key]['to_time'] = strtotime($from_date.' 00:00:00');
					//$this->Users_model->loginidToUserid($index['to_time']);
					// echo $index['to_time'].'Not a time';
				}
			//	unset($result[$key]['from_time']);
			//	unset($result[$key]['to_time']);
				//$dt1 = explode(' ', );
				//$d1 = explode('/', $index['date']);
				//$result[$key]['date'] = $d1[2] . '-' . str_pad($d1[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($d1[1], 2, 0, STR_PAD_LEFT); //.' '.$dt1[1];
			}
			if($result[$key]['user_id'] == null){
				unset($result[$key]);
			}
			//$result[$key]['monitoring_for_id'] = $monitoring_for_id;
		}
		//print_r($result);
		//exit();
		$current = $this->UserShifts_model->saveMany($result);
		if ($current) {
			$this->response($current, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save servey!'), 404);
		}
		/* $fileArray = file($path, FILE_IGNORE_NEW_LINES);
			        echo count($fileArray).'<br>';
			        $fileData = array();
			        $tab = '\t';
					foreach($fileArray as $fileRow)
					{
					   $fileData[] = explode($tab, $fileRow);//.'<br>';
					}
		*/

		/* echo '<pre>';
			print_r($result);
		*/
		//if ($this->input->post('type') == 'atmbookinguploadFile') {
		
		
		//print_r($this->input->post());
		//print_r($_FILES['file']);

		
		// $current = $this->Surveys_model->getSurveyDashboard($this->get('id'));
		// $survey_result_response = $this->SurveyResults_model->getMySurvey();
		// $response = array();
		// $response['stats'] = $current_states_log;
		// $response['survey'] = $survey_result_response; 
		//print_r($current_states_log);
		
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
	function surveyComplete_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$current = $this->SurveyUsers_model->save_survey($this->get('id'), $this->get('feedback'));
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
	function surveys_get($id=null){
		$status = $this->get('status');
		$escalations = $this->Surveys_model->find($this->get('id'),$this->get('status'));
		if ($escalations) {
			$this->response($escalations, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any survay question!'), 404);
		}
	}
	function surveys_post(){
		//print_r($this->post('survey'));
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$survey = $this->post('survey');
		$survey['campaigns'] = count($survey['monitoringFors']);
		$survey['questions'] = count($survey['surveyQuestions']);
		$campaigns = $survey['monitoringFors'];
		$qusetions = $survey['surveyQuestions'];
		unset($survey['monitoringFors']);
		unset($survey['surveyQuestions']);
		$users_ids = $this->AccessCampiagns_model->getCampaignUser($campaigns);
		$survey['users'] = count($users_ids);		
		$survey_id = $this->Surveys_model->setSurvey($survey);
		// foreach($users_ids as $key => $index){
		// 	$users_ids[$key]['survey_id'] =  $survey_id;
		// }
		$survay_result = array();
		foreach($qusetions as $key => $index){
			foreach($users_ids as $keys => $indexs){
				$survay_result[] = array('survey_id' => $survey_id
										, 'question_id' => $index
										, 'user_id' => $indexs['user_id']
										, 'created_by' => $up_user
										, 'created' => date('Y-m-d H:i:s')); 
				//$users_ids[$key]['$survey_id'] =  $survey_id;
				//$users_ids[$key]['$qusetion_id'] =  $index;
			}
		}
		//print_r($survay_result);
		$survey_result_response = $this->SurveyResults_model->insertion($survay_result);
		if ($survey_result_response) {
			$this->response($survey_result_response, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Insertion failed!'), 404);
		}
		
		//save survay and get last inserted ID
		//get campaign users 
		// create array of campaign user and
		// print_r($survey);
		// print_r($campaigns);
		// print_r($qusetions);
		exit();
	}
	function surveyResults_get($id=null) {
		//$status = $this->get('status');
		if($id==null){
			$id = $this->get('id');
		}
		//print_r($this->get('id'));
		if($this->get('type') == 'my'){
			$survey_results = $this->SurveyResults_model->findMy($this->get('survey_id'));
		}
		else{
			$survey_results = $this->SurveyResults_model->find($id, $this->get('status'), $this->get('survey_id'));
		}
		
		if ($survey_results) {
			$this->response($survey_results, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any survey!'), 404);
		}

	}
	function surveyResults_post(){
		//print_r($this->post('survey'));
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$survay_result = $this->post('surveyResult');
		
		$survey_result_response = $this->SurveyResults_model->updation($survay_result);
		if ($survey_result_response) {
			$this->response($survey_result_response, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Insertion failed!'), 404);
		}
		
		//save survay and get last inserted ID
		//get campaign users 
		// create array of campaign user and
		// print_r($survey);
		// print_r($campaigns);
		// print_r($qusetions);
		exit();
	}
	function surveyQuestions_get($id=null) {
		$status = $this->get('status');
		$escalations = $this->SurveyQuestions_model->find($id,$this->get('status'));
		if ($escalations) {
			$this->response($escalations, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any survay question!'), 404);
		}

	}
	function graphActivities_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		//$this->load->model('DailySiebels_model');
		//print_r($this->get('from_date'));
		//print_r($this->get('to_date'));
		$dailySiebels = $this->Activities_model->graphActivities($id, $this->get('from_date'), $this->get('to_date'));

		// header("Pragma: public");
		// header("Expires: 0");
		// header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		// //header("Content-Type: text/x-csv");
		// //header("Content-Disposition: attachment;filename='" . $this->get('type') . ".csv'");
		// header("Content-type: application/octet-stream");
		// header("Content-Disposition: attachment; filename=" . $this->get('type') . " Reoprt.xls");
		// echo $this->to_excel($dailySiebels, $this->get('type'));
		// exit();

	}
	function activitiesEscalations_get($return = null, $ph = null) {
		$complaint_id = $this->get('activity_id');

		$complaints = $this->ActivitiesEscalations_model->getAllComplaintLog($this->get('activity_id'));
		if ($complaints) {
			$this->response($complaints, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function activitiesAdjustments_get($return = null, $ph = null) {
		$complaint_id = $this->get('activity_id');

		$complaints = $this->ActivitiesAdjustments_model->getAllComplaintLog($this->get('activity_id'));
		if ($complaints) {
			$this->response($complaints, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function activitiesAdjustments_Post() {
		//$this->load->model('ComplainLog_model');
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$activitiesAdjustments = $this->post('activitiesAdjustment');
		//	print_r();
		$activitiesAdjustments['created_by'] 	= $up_user;
		$accalations = $this->ActivitiesAdjustments_model->save($activitiesAdjustments);
		if ($accalations) {
			$this->response($accalations, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t Save any log!'), 404);
		}

	}
	function accalationLogs_get($return = null, $ph = null) {
		//$this->load->model('ComplainLog_model');
		$cid = $this->get('cid');

		$escalations = $this->AccalationLogs_model->getAllAccalationLogs($cid);
		if ($escalations) {
			$this->response($escalations, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any escalation!'), 404);
		}

	}
	function accalationLogs_Post() {
		//$this->load->model('ComplainLog_model');
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$accalation = $this->post('accalationLog');
		//	print_r();
		$accalation['created_by'] 	= $up_user;
		$accalations = $this->AccalationLogs_model->save($accalation);
		if ($accalations) {
			$this->response($accalations, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any escalation!'), 404);
		}

	}
	function accalations_get($return = null, $ph = null) {

		if ($return != null) {
			$accalations = $this->Accalations_model->getAccalationsCount($this->get('phone'), $this->get('field'));
			$this->response($accalations, 200);
		} else {
			/*$start = $this->get('start');
			$end = $this->get('end');
			$phone = $this->get('phone');
*/
			if($this->get('rtrn') == 'single'){
				$accalations = $this->Accalations_model->getSingleAccalations($this->get('start'), $this->get('end'), $this->get('phone'), $this->get('field'));	
			}
			else{
				$accalations = $this->Accalations_model->getAllAccalations($this->get('start'), $this->get('end'), $this->get('phone'), $this->get('field'), $this->get('accalation_date'), $this->get('accalation_status'), $this->get('accalation_sub_department'));
			}
			if ($accalations) {
				$this->response($accalations, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function accalations_post() {
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];

		$accalation = $this->post('accalation');
		$accalationLog = $this->post('accalation')['accalationLog'];
		unset($accalation['accalationLog']);
		unset($accalation['id']);
		$accalation['created_by'] = $up_user;
		
		//print_r($accalationLog); 
		//print_r($accalation); 
		$id = $this->Accalations_model->save($accalation);
		if($id){
			$accalationLog['created_by'] 	= $up_user;
			$accalationLog['accalation_id'] = $id;
			

			if ($this->AccalationLogs_model->save($accalationLog)) {
				$res = array('success' => true , 'text' => 'Escalation Saved succesfully !');
				$this->response($res , 200); 
				// 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t save escalation log!'), 404);
			}
		}
		else{
			$this->response(array('error' => 'Couldn\'t save escalation!'), 404);
		}

		
		/*$complaintlog['complaint_id'] = $comp;
			$compl = $this->ComplaintLog_model->update_complaint_logs($complaintlog);
		*/
		//$this->response($message, 200); // 200 being the HTTP response code
	}
	function uploadCallsFile_post() {
		//print_r($_FILES);
		$this->load->library('csvfile');
		$this->load->model('OtherActivities_model');

		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];

		$monitoring_for_id = $this->input->post('monitoring_for_id');
		$type = $this->input->post('type');
		$path = $_FILES['file']['tmp_name'];

		/* $fileArray = file($path, FILE_IGNORE_NEW_LINES);
			        echo count($fileArray).'<br>';
			        $fileData = array();
			        $tab = '\t';
					foreach($fileArray as $fileRow)
					{
					   $fileData[] = explode($tab, $fileRow);//.'<br>';
					}
		*/

		/* echo '<pre>';
			print_r($result);
		*/
		//if ($this->input->post('type') == 'atmbookinguploadFile') {
		$result = $this->csvfile->parse_file($path, $type, $user_id, 'Y');
		foreach ($result as $key => $index) {
			if (!empty($index['date'])) {
				//$dt1 = explode(' ', );
				$d1 = explode('/', $index['date']);
				$result[$key]['date'] = $d1[2] . '-' . str_pad($d1[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($d1[1], 2, 0, STR_PAD_LEFT); //.' '.$dt1[1];
			}
			$result[$key]['monitoring_for_id'] = $monitoring_for_id;
		}
		
		//echo '<pre>'; 
		//print_r($result); 
		//exit();
		
		$this->OtherActivities_model->insertAllDataAqms($result);
		/*} else if ($this->input->post('type') == 'atmtcsconsignmentbookinguploadFile') {
			$result = $this->csvfileupload->parse_file($path, $type, $user_id);
			foreach ($result as $key => $index) {
				if (!empty($index['date'])) {
					$dt1 = explode(' ', $index['date']);
					$d1 = explode('/', $dt1[0]);
					$result[$key]['date'] = $d1[2] . '-' . str_pad($d1[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($d1[1], 2, 0, STR_PAD_LEFT) . ' ' . $dt1[1];
				}
				if (!empty($index['pkg_date'])) {
					$d2 = explode('/', $index['pkg_date']);
					$result[$key]['pkg_date'] = $d2[2] . '-' . str_pad($d2[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($d2[1], 2, 0, STR_PAD_LEFT);
				}

				//$format = '%m/%d/%Y %H:%M:%S';
					//strf = strftime($format);
				//	$a = strptime($index['date'], $format);
				

			}
			//print_r($result);
			$this->FsAtmDeliveries_model->updateAllAtmA($result);
		} else if ($this->input->post('type') == 'atmtcspdobookinguploadFile') {
			$result = $this->csvfileupload->parse_file($path, $type, $user_id);
			//print_r($result);
			foreach ($result as $key => $index) {
				if (!empty($index['delivery_date'])) {
					$d1 = explode('/', $index['delivery_date']);
					$result[$key]['delivery_date'] = $d1[2] . '-' . str_pad($d1[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($d1[1], 2, 0, STR_PAD_LEFT);

				}
				if (!empty($index['pickup'])) {
					$d2 = explode('/', $index['pickup']);
					print_r($d2);
					$result[$key]['pickup'] = $d2[2] . '-' . str_pad($d2[1], 2, 0, STR_PAD_LEFT) . '-' . str_pad($d2[0], 2, 0, STR_PAD_LEFT);
				}
			}
			//print_r($result);

			$this->FsAtmDeliveries_model->updateAllAtmB($result);

		}*/

	}
	function agentLogoutForcefully_post(){
		$user_id = $this->post('id');
		$sess_data = $this->session->userdata;
   
    	$system_ip = '101.101.101.101';
    	$this->UserStateLogs_model->setUserStatsLogoutLogs(5, $system_ip, $user_id, $sess_data['data_logged_in']['id']);

    }
	function complaintStates_get($id = null) {
		$complaint_states = $this->ComplaintStates_model->get_complaint_states($id);

		if ($complaint_states) {
			$this->response($complaint_states, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any cComplaint states!'), 404);
		}
	}
	function callers_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();

		//$this->load->model('Regions_model');
		$callers = $this->Callers_model->get_callers($id);

		if ($callers) {
			$this->response($callers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any caller!'), 404);
		}
	}
	
	function getMyStateLog_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$current_states_log = $this->UserStateLogs_model->getMyStateLog();
		// print_r($current_states_log);
		// exit();
		$survey_result_response = $this->SurveyResults_model->getMySurvey();
		$response = array();
		$response['stats'] = $current_states_log;
		$response['survey'] = $survey_result_response; 
		//print_r($current_states_log);
		if ($response) {
			$this->response($response, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any stats!'), 404);
		}
	}
	function getAllAgentStateLog_get($id = null) {
		// print_r($this->get('id'));
		// print_r($id);
		
		$questions = $this->UserStateLogs_model->getMyAgentStateLog($this->get('id'));
		// print_r(implode(',',array_column($questions, 'sid')));
		
		if ($questions) {
			/*$list_users = implode(',',array_column($questions, 'sid'));
			$activities = $this->Activities_model->getTodayTicketsOfAgent($list_users);
			//print_r($activities);
			//print_r(array_column($activities, 'tickets','created_by'));
			$activity = array_column($activities, 'tickets','created_by');
			foreach($questions as $key => $index){
				if(array_key_exists($index['sid'], $activity)){
					$questions[$key]['tickets'] = $activity[$index['sid']];
				}else{
					$questions[$key]['tickets'] = 0;
				}
				//print_r($index['sid']);
			}*/
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}
	}
	function getMyAgentStateLog_get($id = null) {
		// print_r($this->get('id'));
		// print_r($id);
		
		$questions = $this->UserStateLogs_model->getMyAgentStateLog($this->get('id'));
		// print_r(implode(',',array_column($questions, 'sid')));
		
		if ($questions) {
			$list_users = implode(',',array_column($questions, 'sid'));
			$activities = $this->Activities_model->getTodayTicketsOfAgent($list_users);
			//print_r($activities);
			//print_r(array_column($activities, 'tickets','created_by'));
			$activity = array_column($activities, 'tickets','created_by');
			foreach($questions as $key => $index){
				if(array_key_exists($index['sid'], $activity)){
					$questions[$key]['tickets'] = $activity[$index['sid']];
					$second =  floor($questions[$key]['avg']/$activity[$index['sid']]);
					$minute = 0;
					$hour 	= 0;
					if($second > 59){
						$minute = floor($second/60);
						$second%=60;
					}
					if($minute > 59){
						$hour = floor($minute/60);
						$minute%=60;
					}
					$questions[$key]['avg'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);
				}else{
					$questions[$key]['tickets'] = 0;
					$questions[$key]['avg'] = 0;
					
				}
				//print_r($index['sid']);
			}
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any agent status!'), 404);
		}
	}
	function monitoringFields_get($id = null) {
		//print_r($this->get('id'));
		//print_r("id"); exit();
		
		if($id == null)	$id = $this->get('id');
		$questions = $this->MonitoringFields_model->getMonitoringFields($id, $this->get('status'), $this->get('monitoring_for_id'), $this->get('monitoring_belongs'));
		if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}
	}
	function questions_get($id = null) {
		//print_r($this->get('id'));
	//	print_r("id"); //exit();
		if($id == null)	$id = $this->get('id');
		$questions = $this->Questions_model->getQuestionsTree($id, $this->get('status'), $this->get('monitoring_for_id'), $this->get('monitoring_belongs'));
		if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}
	}
	function options_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		if($id == null)	$id = $this->get('id');
		$modals = $this->Options_model->getAllOptions($id, $this->get('category'), $this->get('slug'));
		if ($modals) {
			$this->response($modals, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function getMyTickets_get() {
		//$this->load->model('Roles_model');
		$emaildrivers = $this->Activities_model->getMyTicket($this->get('monitoring_for_id'), $this->get('ticket_process'));

		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 404);
		}
	}
	function monitoringFors_get($id = null) {
		//$this->load->model('MonitoringRendomizers_model');
		$roles = $this->MonitoringFors_model->getAllMonitoringFors($id);

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function runRendomizers_get() {
		$this->load->model('MonitoringRendomizers_model');
		$emaildrivers = $this->MonitoringRendomizers_model->runRendomizer($this->get('dateIs'));

		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 404);
		}
	}
	function myRendomizers_get() {
		$this->load->model('MonitoringActivities_model');
		$emaildrivers = $this->MonitoringActivities_model->myRendomizers();

		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 204);
		}
	}
	function teamleadscount_post() {
		$this->load->model('Users_model');
		$emaildrivers = $this->Users_model->getMyReportings($this->post('id'));

		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 404);
		}
	}
	function getMyRendomizers_get() {
		$this->load->model('MonitoringRendomizers_model');
		$emaildrivers = $this->MonitoringRendomizers_model->getMyRendomizer($this->get('monitoring_for_id'));

		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 204);
		}
	}
	function rendomizerd_post($id = null) {
		// print_r($this->post('id'));
		 //exit();
		
		$this->load->model('MonitoringRendomizers_model');

		/*$data = array();
		$data['monitoring_for_id'] = $this->post('monitoring_for_id');
		$data['belong_id'] 	= $this->post('belong_id');
		$data['user_id'] = $this->post('user_id');
		$data['percentage'] = $this->post('percentage');
		$data['teamlead_id'] = $this->post('teamlead_id');
		*/
		$roles = $this->MonitoringRendomizers_model->deleteMonitoringRendomizers($this->post('id'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function rendomizers_post($id = null) {
		// print_r($this->get('type'));
		// exit();
		
		$this->load->model('MonitoringRendomizers_model');

		$data = array();
		$data['monitoring_for_id'] = $this->post('monitoring_for_id');
		$data['belong_id'] 	= $this->post('belong_id');
		$data['user_id'] = $this->post('user_id');
		$data['percentage'] = $this->post('percentage');
		$data['teamlead_id'] = $this->post('teamlead_id');
		
		$roles = $this->MonitoringRendomizers_model->setAllMonitoringRendomizers($data);

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function monitoringFors_post($id = null) {

		//print_r($this->get('type'));exit();
		$roles = $this->MonitoringFors_model->setAllMonitoringFors($this->post('monitoringFor'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function roles_post($id = null) {

		$this->load->model('Roles_model');

		//print_r($this->get('type'));exit();
		$roles = $this->Roles_model->setAllRoles($this->post('role'));

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function getMyTicketData_get() {
		$activities = array(); 
		//echo $this->get('ticket_no');
		//exit();
		/*$activities['monitoring_for_id']= $this->post('monitoring_for_id');
		$activities['email_driver_id']= $this->post('email_driver_id');
		$activities['email_sub_driver_id']= $this->post('email_sub_driver_id');
		$activities['email_reason_id']= $this->post('email_reason_id');
		$activities['email_sub_reason_id']= $this->post('email_sub_reason_id');

		$activities['domain_id']= $this->post('domain_id');
		$activities['ticket_no']= $this->post('ticket_no');
		$activities['status']= $this->post('status');*/
		
		$message = $this->Activities_model->findTicketsByTicketNo($this->get('activity_id'));
		
		/*if($message['find']){
			$this->response($message, 201);	
		}
		else{*/
			$this->response($message, 200); // 200 being the HTTP response code	
		//}
		
	}
	function activities_get() {
		$message = $this->Activities_model->getAgenttickets($this->get('monitoring_for_id'), $this->get('ticket_process'));
		
		if($message){
			$this->response($message, 201);	
		}
		else{
			$this->response($message, 200); // 200 being the HTTP response code	
		}
	}
	function setActivities_post() {
		$activities = array(); //$this->post('agentticket');

		/*$activities['monitoring_for_id']= $this->post('monitoring_for_id');
		$activities['email_driver_id']= $this->post('email_driver_id');
		$activities['email_sub_driver_id']= $this->post('email_sub_driver_id');
		$activities['email_reason_id']= $this->post('email_reason_id');
		$activities['email_sub_reason_id']= $this->post('email_sub_reason_id');

		$activities['domain_id']= $this->post('domain_id');
		$activities['ticket_no']= $this->post('ticket_no');
		$activities['booking_no']= $this->post('booking_no');
		$activities['ticket_process']= $this->post('ticket_process');
		$activities['status']= $this->post('status');*/
		$activity = json_decode($this->post('activity'), true);
		// print_r($activity); 
		// print_r($_FILES); 
		// exit();
		$config['upload_path']   = './uploads/activities/escalations/'; 
        $config['allowed_types'] = '*'; 
        $config['max_size']      = 500000;//204680
        $config['overwrite'] 	 = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
		if(!empty($_FILES) && file_exists($_FILES['file']['tmp_name'])) {
        	$_FILES['file']['name'] = time().'_'.$activity['ticket_no'].'_'.$activity['ticket_process'].'.'.pathinfo(basename( $_FILES["file"]["name"]),PATHINFO_EXTENSION);
			
			if ($this->upload->do_upload('file')) {
	           	$file1 =  $this->upload->data(); 
	        }
	      //  $complaintlog['image'] = $_FILES['careemFile']['name'];
			$activity['activitiesEscalations']['attachment'] = '../uploads/activities/escalations/'.$_FILES['file']['name'];
		} 
	//	$activities2 = array();
		/*$activities2['amount']= $this->post('amount');
		$activities2['customer_adjustment']= $this->post('customer_adjustment');
		$activities2['captain_adjustment']= $this->post('captain_adjustment');
		$activities2['comment']= $this->post('comment');*/
		
		
		$message = $this->Activities_model->addAgenttickets($activity);
		
		if($message['meta']['find']){
			$this->response($message, 201);	
		}
		else{
			$this->response($message, 200); // 200 being the HTTP response code	
		}
		
	}
	function activities_post() {
		$activities = array(); //$this->post('agentticket');

		/*$activities['monitoring_for_id']= $this->post('monitoring_for_id');
		$activities['email_driver_id']= $this->post('email_driver_id');
		$activities['email_sub_driver_id']= $this->post('email_sub_driver_id');
		$activities['email_reason_id']= $this->post('email_reason_id');
		$activities['email_sub_reason_id']= $this->post('email_sub_reason_id');

		$activities['domain_id']= $this->post('domain_id');
		$activities['ticket_no']= $this->post('ticket_no');
		$activities['booking_no']= $this->post('booking_no');
		$activities['ticket_process']= $this->post('ticket_process');
		$activities['status']= $this->post('status');*/

	//	print_r($this->post('activity')); 
	//	exit();

	//	$activities2 = array();
		/*$activities2['amount']= $this->post('amount');
		$activities2['customer_adjustment']= $this->post('customer_adjustment');
		$activities2['captain_adjustment']= $this->post('captain_adjustment');
		$activities2['comment']= $this->post('comment');*/
		
		
		$message = $this->Activities_model->addAgenttickets($this->post('activity'));
		
		if($message['meta']['find']){
			$this->response($message, 201);	
		}
		else{
			$this->response($message, 200); // 200 being the HTTP response code	
		}
		
	}
	function loginStatus_post($id = null) {		

		$response =	$this->UserStateLogs_model->setUserStatsLogs($this->post('id'), $this->post('ip'));

		if ($response) {
			$this->response($response, 200);
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 404);
		}
	}
	function loginStatus_get($id = null) {
		//$this->load->model('Roles_model');
		$emaildrivers = $this->UserStateLogs_model->getMystate();

		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any!'), 404);
		}
	}
	function monitoringCategories_get($id = null) {
		//$this->load->model('Roles_model');
		//print_r($this->get('monitoring_for_id'));
		//$monitoring = json_decode($this->get('monitoring_for_id'), true);
		//print_r($monitoring);
		$emaildrivers = $this->MonitoringCategories_model->getAllMonitorCategories($id, $this->get('monitoring_for_id'), $this->get('type_id'), $this->get('parent_id'));

		if($id == 0 && $id != null){
			$this->response(array('monitoringCategory' =>array(array('id' => 0, 'name'=> 'None'))), 200);
		}
		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any monitoring category!'), 404);
		}
	}
	function emaildrivers_post() {
		$user = $this->post('emaildriver');
		$message = $this->MonitoringEmailDrivers_model->addEmailDrivers($user);
		$this->response($message, 200); // 200 being the HTTP response code
	}
	function emaildrivers_get($id = null) {
		//$this->load->model('Roles_model');
		/*if($this->get('for_id') == 8){
			$emaildrivers = $this->MonitoringCategories_model->getAllMonitorCategories($id, 1, $this->get('type_id'), $this->get('parent_id'));
		}
		else{*/
			$emaildrivers = $this->MonitoringEmailDrivers_model->getAllMonitorEmailDrivers($id, $this->get('for_id'), $this->get('type_id'), $this->get('parent_id'));
		//}
		

		if($id == 0 && $id != null){
			$this->response(array('emaildrivers' =>array(array('id' => 0, 'name'=> 'None'))), 200);
		}
		if ($emaildrivers) {
			$this->response($emaildrivers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	
	function monitoring_post() {
		$sess_data = $this->session->userdata;

		$monitoring = json_decode($this->post('monitoring'), true);
		$monitoring_score = json_decode($this->post('monitoring_score'), true);
		$monitoring_id = $this->Monitorings_model->addMonitorings($monitoring);
		$array = array('monitoring_id' => $monitoring_id, 'created_by' => $sess_data['data_logged_in']['id']);

		array_walk($monitoring_score, function (&$val, $key) use ($array) {
			$val['monitoring_id'] = $array['monitoring_id'];
			$val['created_by'] = $array['created_by'];
			$val['created'] = date("Y-m-d H:i:s");
		});
		$this->monitoringScores_model->setAllMonitoringScoress($monitoring_score);
		return true;
		//print_r($monitoring_score);

	}
	function complaintSaActivityReport_get($id = null) {
		$callactivitiesAll = $this->Complaints_model->getAllComplaintCallActivities($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('region'), $this->get('area'), $this->get('territory'), $this->get('report'));
		//$this->load->model('Consumer_model');
		//$this->load->model('Brandambassador_model');
		//$this->load->model('Territories_model');

		if ($callactivitiesAll) {

			$this->response($callactivitiesAll, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}
	}
	function sagUpdateComplaints_post() {

		$id = $this->post('complaint_id');
		$complaint['state_id'] = $this->post('state_id');
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];

		if ($complaint['state_id'] == 3) {
			$complaint['assigned_to'] = $this->post('assigned_to');
			$complaint['assigned_by'] = $up_user;
			$complaint['modified_by'] = $sess_data['data_logged_in']['id'];
			$complaint['modified'] = date("Y-m-d H:i:s");
		}
		if ($complaint['state_id'] == 5) {
			$complaint['sparepart_id'] = $this->post('sparepart_id');
			$complaint['part_price'] = $this->post('part_price');
			$complaint['service_price'] = $this->post('service_price');
			$complaint['serial_no'] = $this->post('serial_no');
			$complaint['closed_by'] = $sess_data['data_logged_in']['id'];
			$complaint['closed'] = date("Y-m-d H:i:s");
			$complaint['status'] = 0;
			//$this->post('sparepart_id')
			$dothevalue = json_decode($this->post('sparepart'), true);
			foreach ($dothevalue as $key => $val) {
				$dothevalue[$key]['user_id'] = $sess_data['data_logged_in']['id'];
				$dothevalue[$key]['date'] = date("Y-m-d H:i:s");
			}
			$comp2 = $this->ComplaintSpareparts_model->save($dothevalue, $id);
		}

		/*print_r($dothevalue);
		exit();*/
		/*$complaint['purchase_date'] = $this->post('purchase_date');

			$complaintlog['desc'] = $this->post('description');
			$complaintlog['date'] = date('Y-m-d H:i:s');
			$complaintlog['state_id'] = 1;
			$complaintlog['complaint_id'] = 0;

			$customers['name'] = $this->post('name');
			$customers['mobile'] = $this->post('mobile');
			$customers['address'] = $this->post('address');

			$complaint['id'] = $this->post('id');
			$complaint['modal_id'] = $this->post('modal_id');
			$complaint['problem_id'] = $this->post('problem_id');

			$cust = $this->Customers_model->update_customers($customers);
			//print_r($cust); exit();
		*/
		$comp = $this->Complaints_model->update_complaints_data($complaint, $id);

		return $comp;
		/*$complaintlog['complaint_id'] = $comp;
			$compl = $this->ComplaintLog_model->update_complaint_logs($complaintlog);
		*/
		//$this->response($message, 200); // 200 being the HTTP response code
	}
	function complaintLogs_Post() {
		$config['upload_path']   = './uploads/complaint/'; 
        $config['allowed_types'] = '*'; 
        $config['max_size']      = 500000;//204680
        $config['overwrite'] = TRUE;

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

		$complaintlog = json_decode($this->input->post('complaintLog'),true);
		//$complaintlog['complaint_id'] = $comp;
		$complaintlog['image'] = '';
		$complaintlog['path'] = '';

		
		if(!empty($_FILES) && file_exists($_FILES['careemFile']['tmp_name'])) {
        	$_FILES['careemFile']['name'] = time().'_'.$complaintlog['caller_id'].'_'.$complaintlog['complaint_id'].'_'.str_replace(' ', '_', strtolower($_FILES['careemFile']['name']));
			
			if ($this->upload->do_upload('careemFile')) {
	           	$file1 =  $this->upload->data(); 
	        }

	        $complaintlog['image'] = $_FILES['careemFile']['name'];
			$complaintlog['path'] = '../uploads/complaint/';
		} 


		$complaint['state_id'] = $complaintlog['state_id'];
		$id = $complaintlog['complaint_id'];


		// print_r($complaintlog); 
		// print_r($complaint); 
		// exit();
		
		//	print_r();
		
		$complaints = $this->Complaints_model->update_complaints_data($complaint, $id);
		
		$complaintLogs = $this->ComplaintLog_model->update_complaintlogAgent($complaintlog);
		if ($complaintLogs) {
			$this->response($complaintLogs, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function complaintLogs_get($return = null, $ph = null) {
		$complaint_id = $this->get('cid');

		$complaints = $this->ComplaintLog_model->getAllComplaintLog($complaint_id);
		if ($complaints) {
			$this->response($complaints, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function myMgmtComplaint_get($return = null) {
		//if ($return != null) {
			$complaints = $this->Complaints_model->getMyMgmtComplaintCount($this->get('from_form'));
			$this->response($complaints, 200);
		/*} else {			
			$complaints = $this->Complaints_model->getMyComplaint($this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('from_date'), $this->get('to_date'), $this->get('report'));
			
			
			if ($complaints) {
				$this->response($complaints, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}*/
	}	
	function myComplaint_get($return = null) {
		if ($return != null) {
			$complaints = $this->Complaints_model->getMyComplaintsCount($this->get('from_form'));
			$this->response($complaints, 200);
		} else {			
			$complaints = $this->Complaints_model->getMyComplaint($this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('from_date'), $this->get('to_date'), $this->get('report'),$this->get('from_form'));
			
			
			if ($complaints) {
				$this->response($complaints, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function mycomplaints_get($return = null, $ph = null) {
		if ($return != null) {
			$complaints = $this->Complaints_model->getComplaintsCount($ph);
			$this->response($complaints, 200);
		} else {
			
			$complaints = $this->Complaints_model->getAllMyComplaints($this->get('start'), $this->get('end'), $this->get('complaint_date'), $this->get('complaint_status'), $this->get('complaint_sub_department'), $this->get('from_form'));
			
			
			if ($complaints) {
				$this->response($complaints, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function complaints_get($return = null, $ph = null) {
		if ($return != null) {
			$complaints = $this->Complaints_model->getComplaintsCount($this->get('phone'), $this->get('field'), $this->get('from_form'));
			$this->response($complaints, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');
			$phone = $this->get('phone');

			//if($this->get('rtrn') == 'single'){
			//	$complaints = $this->Complaints_model->getAComplaint($this->get('phone'));	
			//}
			//else{
			$complaints = $this->Complaints_model->getAllComplaints($this->get('start'), $this->get('end'), $this->get('phone'), $this->get('field'), $this->get('from_form'));
			//}
			if ($complaints) {
				$this->response($complaints, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function sendSms($type, $aumber, $cumber) {

		$username = '03028503318';
		$password = '123.123';
		$mask = 'Super Asia';

		$msg_customer = 'Dear Customer, thank you for calling Super Asia Service Center. Your complaint no. ' . $cumber . ' has been registered on (' . date('d/m/Y - h:i A') . '). Concern person will contact you soon';

		$msg_mgr = 'Dear Service Manager: complaint no. ' . $cumber . ' has been register on (' . date('d/m/Y - h:i A') . '). Please contact the customer ASAP';

		$sms_cust = "http://221.132.117.58:7700/sendsms_url.html?Username=" . $username . "&Password=" . $password . "&From=" . $mask . "&To=" . $cumber . "&Message=" . $msg_customer;

		$sms_mgr = "http://221.132.117.58:7700/sendsms_url.html?Username=" . $username . "&Password=" . $password . "&From=" . $mask . "&To=" . $aumber . "&Message=" . $msg_mgr;

		print_r($sms_cust);
		print_r($sms_mgr);

		$content1 = file_get_contents($sms_cust);
		$content2 = file_get_contents($sms_mgr);

		print_r($content1);
		print_r($content2);

		/*$ch = curl_init();

			// set URL and other appropriate options
			curl_setopt($ch, CURLOPT_URL, $sms_mgr);
			curl_setopt($ch, CURLOPT_HEADER, 0);
			$curl_response = curl_exec($ch);
			//$curl = curl_init($sms_mgr);
			//curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

			//$curl_response = curl_exec($curl);
			if ($curl_response === false) {
				$info = curl_getinfo($curl);
				curl_close($curl);
				die('error occured during curl exec. Additioanl info: ' . var_export($info));
			}
			curl_close($curl);
			$decoded = json_decode($curl_response);
			if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
				die('error occured: ' . $decoded->response->errormessage);
			}
			echo 'response ok!';
		*/

	}
	function sagComplaints_post() {
		$config['upload_path']   = './uploads/complaint/'; 
        $config['allowed_types'] = '*'; 
        $config['max_size']      = 500000;//204680
        $config['overwrite'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

		/*print_r();
		print_r(); 
		exit('i m in');*/

		/*$customers['msisdn'] = $complaint['msisdn'] = $this->post('msisdn');
		$complaint['product_id'] = $this->post('product_id');
		$complaint['purchase_date'] = $this->post('purchase_date');

		$complaintlog['desc'] = $this->post('description');
		$complaintlog['date'] = date('Y-m-d H:i:s');
		$complaint['state_id'] = $complaintlog['state_id'] = 1;
		$complaintlog['complaint_id'] = 0;

		$customers['name'] = $this->post('name');
		$customers['mobile'] = $this->post('mobile');
		$customers['address'] = $this->post('address');

		$complaint['id'] = $this->post('id');
		$complaint['modal_id'] = $this->post('modal_id');
		$complaint['problem_id'] = $this->post('problem_id');*/
		//print_r($this->post);
		/*print_r($_POST['complaint']);
		print_r($_POST['caller']);
		print_r($_POST['complaintLog']);
		
		print_r($this->input->post('complaint'));
		print_r($this->input->post('caller'));
		print_r($this->input->post('complaintLog'));*/
		/*print_r($_FILES['careemFile']);
		print_r(json_decode($this->input->post('complaint'),true));
		print_r(json_decode($this->input->post('caller'),true));
		print_r(json_decode($this->input->post('complaintLog'),true));
		exit();*/

		$complaintlog = json_decode($this->input->post('complaintLog'),true);
		$cust = $this->Callers_model->update_callers(json_decode($this->input->post('caller'),true));
		//print_r($cust); exit();
		
		$complaint = json_decode($this->input->post('complaint'),true);//$this->post('complaint');
		$complaint['caller_id'] = $cust;
		$comp = $this->Complaints_model->update_complaints($complaint);
		
		$complaintlog['complaint_id'] = $comp;
		$complaintlog['image'] = '';
		$complaintlog['path'] = '';


		if(!empty($_FILES) && file_exists($_FILES['careemFile']['tmp_name'])) {
        	$_FILES['careemFile']['name'] = time().'_'.$cust.'_'.$comp.'_'.str_replace(' ', '_', strtolower($_FILES['careemFile']['name']));
			
			if ($this->upload->do_upload('careemFile')) {
	           	$file1 =  $this->upload->data(); 
	        }

	        $complaintlog['image'] = $_FILES['careemFile']['name'];
			$complaintlog['path'] = '../uploads/complaint/';
		} 
    	
    	//$images[$_FILES['careemFile']['name']] = './uploads/complaint/'.$_FILES['careemFile']['name'];
		/*$complaintlog['complaint_id'] = $comp;
		
		$complaintlog['image'] = $_FILES['careemFile']['name'];
		$complaintlog['path'] = './uploads/complaint/';*/

		$compl = $this->ComplaintLog_model->update_complaint_logs($complaintlog);

		if ($compl) {

			/*$anumber = '03004168193';
			$anumber = '03214823037';
			$compnum = $comp;
			$cnumber = $customers['msisdn'];
			$smstype = 1;
			//$this->sendSms($smstype, $anumber, $cnumber);

			$return = array(
				'anumber' => '03214823037',
				'cnumber' => $customers['msisdn'],
				'compnum' => $comp,
				'smstype' => 1,
				'date' => date('d/m/Y - h:i A'),
			);*/

			$this->response($complaint, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
		/*$to_msg = '03214823037';

			$sms_url = "http://221.132.117.58:7700/sendsms_url.html?Username=" . $username . "&Password=" . $password . "&From='" . $mask . "'&To=$to_msg&Message='" . $message . "'";

			try {
				$content = file_get_contents($sms_url);
				print_r($content);
				if ($content === false) {
					// Handle the error
				}
			} catch (Exception $e) {
				// Handle exception
		*/
		return $compl;
		//$this->response($message, 200); // 200 being the HTTP response code
	}
	function spareparts_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);

		$product_id = $this->get('product_id');
		$id = $this->get('id');

		$spareparts = $this->Spareparts_model->getAllSpareparts($id, $product_id);
		if ($spareparts) {
			$this->response($spareparts, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function problems_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);

		$product_id = $this->get('product_id');
		$id = $this->get('id');

		$problems = $this->Problems_model->getAllProblems($id, $product_id);
		if ($problems) {
			$this->response($problems, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function modals_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$product_id = $this->get('product_id');
		$id = $this->get('id');
		/*
			echo  'product = '.$product_id;
		*/
		$modals = $this->Modals_model->getAllModals($id, $product_id);
		if ($modals) {
			$this->response($modals, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function products_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$products = $this->Products_model->getAllProducts($id);
		if ($products) {
			$this->response($products, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function loadVoqPieGraph_get($location = '') {
		/*$this->load->model('Regions_model');
			$this->load->model('Areas_model');
			$this->load->model('Territories_model');
			$regionsAll = $this->Regions_model->getAllRegions();
			$areasAll = $this->Areas_model->getAllAreas();
			// print_r($areasAll); //exit();
		*/

		$sess_data = $this->session->userdata;

		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$this->load->model('Callactivities_model');

		$callactivitiesAll = $this->Callactivities_model->getAllCallActivitiesPieGraph($location, $this->get('region'), $this->get('area'), $this->get('territory'));

		//$this->load->model('Consumer_moded
		//$this->load->model('Brandambassador_model');
		//$this->load->model('Territories_model');

		if ($callactivitiesAll) {
			$this->response($callactivitiesAll, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any Data!'), 404);
		}
	}
	function callCampaignActivity_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Call1campaigns_model');

		$data['phoneConsumer'] = $this->get('phoneConsumer');
		$data['nameConsumer'] = $this->get('nameConsumer');
		$data['isSmoker'] = $this->get('isSmoker');
		$data['isTopTraders'] = $this->get('isTopTraders');
		$data['isQuestion111value'] = $this->get('isQuestion111value');
		$data['isQuestion112value'] = $this->get('isQuestion112value');
		$data['isQuestion113value'] = $this->get('isQuestion113value');
		$data['isQuestion114value'] = $this->get('isQuestion114value');
		$data['isQuestion2value'] = $this->get('isQuestion2value');
		$data['isQuestion21value'] = $this->get('isQuestion21value');
		$data['isQuestion22value'] = $this->get('isQuestion22value');
		$data['isQuestion3value'] = $this->get('isQuestion3value');
		$data['isQuestion4value'] = $this->get('isQuestion4value');
		$data['isQuestion51value'] = $this->get('isQuestion51value');
		$data['isQuestion52value'] = $this->get('isQuestion52value');
		$data['isQuestion53value'] = $this->get('isQuestion53value');
		$data['isQuestion54value'] = $this->get('isQuestion54value');
		$data['isQuestion55value'] = $this->get('isQuestion55value');
		$data['isQuestion6value'] = $this->get('isQuestion6value');
		$data['isQuestion7value'] = $this->get('isQuestion7value');
		$data['callStatus'] = $this->get('callStatus');

		$call1campaigns = $this->Call1campaigns_model->setCallCampaignActivity($data); //, $this->get('region'), $this->get('area'), $this->get('territory'));

		$this->response($call1campaigns, 200);
	}
	
	function mydashboardsBrandData_get() {
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$id = $this->get('id');
		$location = $this->get('location');
		$from_date = $this->get('fdate');
		$to_date = $this->get('tdate');
		$this->load->model('Consumer_model');

		$brandConsumer = $this->Consumer_model->getAllBrandConsumer($this->get('from_date'), $this->get('to_date'));

		if ($brandConsumer) {
			$this->response($brandConsumer, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any ambassador consumer!'), 404);
		}

	}
	function getSmartConsumerData_get() {
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$id = $this->get('id');
		$location = $this->get('location');
		$from_date = $this->get('fdate');
		$to_date = $this->get('tdate');
		$this->load->model('Consumer_model');

		$ambassadorConsumer = $this->Consumer_model->getAllAmbassadorConsumer($this->get('ambassador'), $this->get('from_date'), $this->get('to_date'));

		if ($ambassadorConsumer) {
			$this->response($ambassadorConsumer, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any ambassador consumer!'), 404);
		}

	}
	function consumerRegionAreaTerritoryImport_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Callactivities_model');

		$callactivitiesAll = $this->Callactivities_model->getConsumerRegionAreaTerritoryImport($id, $this->get('from_date'), $this->get('to_date'), $this->get('region'), $this->get('area'), $this->get('territory'));
		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		//header("Content-Type: text/x-csv");
		//header("Content-Disposition: attachment;filename='" . $this->get('type') . ".csv'");
		header("Content-type: application/octet-stream");
		header("Content-Disposition: attachment; filename=Consumers Reoprt.xls");
		echo $this->to_excel($callactivitiesAll, 'Consumers Report');
		exit();
	}
	function consumerRegionAreaTerritoryImportDtoll_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Callactivities_model');

		$callactivitiesAll = $this->Callactivities_model->getConsumerRegionAreaTerritoryImportDtoll($id, $this->get('from_date'), $this->get('to_date'), 5, $this->get('area'), $this->get('territory'));

		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		//header("Content-Type: text/x-csv");
		//header("Content-Disposition: attachment;filename='" . $this->get('type') . ".csv'");
		header("Content-type: application/octet-stream");
		header("Content-Disposition: attachment; filename=Consumers Reoprt.xls");
		echo $this->to_excel($callactivitiesAll, 'Consumers Report');
		exit();
	}
	function brands_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();

		$this->load->model('Brand_model');
		$brand = $this->Brand_model->get_brands($id);

		if ($brand) {
			$this->response($brand, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any brand!'), 404);
		}
	}
	function brands_post() {
		$this->load->model('Brand_model');
		//$this->some_model->updateUser( $this->get('id') );
		$brand = $this->post('brand');
		$message = $this->Brand_model->update_brand($brand);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function regions_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();

		$this->load->model('Regions_model');
		$regions = $this->Regions_model->get_regions($id);

		if ($regions) {
			$this->response($regions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any region!'), 404);
		}
	}
	function regions_post() {
		$this->load->model('Regions_model');
		//$this->some_model->updateUser( $this->get('id') );
		$regions = $this->post('region');
		$message = $this->Regions_model->update_region($regions);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function areas_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();
		//$region_id = $this->get('region_id');

		$this->load->model('Areas_model');
		$areas = $this->Areas_model->get_areas($id, $this->get('region_id'));

		if ($areas) {
			$this->response($areas, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any area!'), 404);
		}
	}
	function areas_post() {
		$this->load->model('Areas_model');
		//$this->some_model->updateUser( $this->get('id') );
		$areas = $this->post('area');
		$message = $this->Areas_model->update_area($areas);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function territories_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();

		$this->load->model('Territories_model');
		$territories = $this->Territories_model->get_territories($id, $this->get('region_id'), $this->get('area_id'));

		if ($territories) {
			$this->response($territories, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any territory!'), 404);
		}
	}
	function territories_post() {
		$this->load->model('Territories_model');
		//$this->some_model->updateUser( $this->get('id') );
		$territories = $this->post('territory');
		$message = $this->Territories_model->update_territory($territories);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function markets_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();

		$this->load->model('Market_model');
		$markets = $this->Market_model->get_markets($id);

		if ($markets) {
			$this->response($markets, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any markets!'), 404);
		}
	}
	function markets_post() {
		$this->load->model('Market_model');
		//$this->some_model->updateUser( $this->get('id') );
		$markets = $this->post('market');
		$message = $this->Market_model->update_market($markets);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}

	function brandambassadors_post() {
		$this->load->model('Brandambassador_model');
		//$this->some_model->updateUser( $this->get('id') );
		$brandambassador = $this->post('brandambassador');
		$message = $this->Brandambassador_model->update_brandambassador($brandambassador);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}

	function brandambassadors_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();

		$this->load->model('Brandambassador_model');
		$brand_ambbassador = $this->Brandambassador_model->get_brandambassadors();

		if ($brand_ambbassador) {
			$this->response($brand_ambbassador, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}

	function callActivityReport_get($id = '') {
		/*$this->load->model('Regions_model');
			$this->load->model('Areas_model');
			$this->load->model('Territories_model');
			$regionsAll = $this->Regions_model->getAllRegions();
			$areasAll = $this->Areas_model->getAllAreas();
			// print_r($areasAll); //exit();
		*/

		$sess_data = $this->session->userdata;
		//return $sess_data;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];
		$this->load->model('Callactivities_model');

		$callactivitiesAll = $this->Callactivities_model->getAllCallActivitiesLocation($id, $this->get('from_date'), $this->get('to_date'), $this->get('type'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'));
		//$this->load->model('Consumer_model');
		//$this->load->model('Brandambassador_model');
		//$this->load->model('Territories_model');

		if ($callactivitiesAll) {
			$this->response($callactivitiesAll, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}
	}

	function agentActivityReport_get($id = '') {
		$sess_data = $this->session->userdata;
		//return $sess_data;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];
		$this->load->model('Callactivities_model');

		$callactivitiesAll = $this->Callactivities_model->getAllAgentCallActivities($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('region'), $this->get('area'), $this->get('territory'), $this->get('report'));
		//$this->load->model('Consumer_model');
		//$this->load->model('Brandambassador_model');
		//$this->load->model('Territories_model');

		if ($callactivitiesAll) {

			$this->response($callactivitiesAll, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}
	}

	function mydashboardsDataBA_get() {
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Territories_model');

		$id = $this->get('id');
		$location = $this->get('location');
		$from_date = $this->get('fdate');
		$to_date = $this->get('tdate');

		if (empty($this->get('id'))) {
			$id = $territory_id;
		}
		$territoriesAll = $this->Territories_model->getAllTerritories($region_id, $area_id, $id);
		$my_data = '';
		//echo '<pre>'; print_r($territoriesAll);
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador($region_id, $area_id, $id);

		//echo '<pre>'; print_r($brandambassadorsAll['territory']); //exit();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = $targetNAchivedNo3 = $targetNAchivedNo4 = array();
		$consumerAll = $this->Consumer_model->getAllConsumerTypesNew($region_id, $area_id, $id, $from_date, $to_date);
		//echo '<pre>'; print_r($consumerAll); exit();
		$consumerAllTerritory = array();
		$brandambassadorsAllTerritory = array();

		if (!empty($consumerAll['territory'])) {
			$consumerAllTerritory = $consumerAll['territory'];
		}
		if (!empty($brandambassadorsAll['territory'])) {
			$brandambassadorsAllTerritory = $brandambassadorsAll['territory'];
		}

		if (!empty($consumerAllTerritory)) {

			$consumer_territory = $consumerAllTerritory[$id];
			$ambassador_territory = $brandambassadorsAllTerritory[$id];
			//echo '<pre>';
			//print_r($consumer_territory);
			//print_r($ambassador_territory);
			//exit();

			foreach ($ambassador_territory as $ckey => $cindex) {
				$ba = $cindex['brandAmbassadorID'];
				$targetNAchivedNo1[$ba] = 20;
				$targetNAchivedNo4[trim($cindex['name'])] = $cindex['brandAmbassadorID'];
				$targetNAchivedNo3[$ba] = trim($cindex['name']);
				foreach ($consumer_territory as $ctkey => $ctindex) {
					if ($ctindex['brandAmbassadorID'] == $ba) {
						if (!array_key_exists($ba, $targetNAchivedNo2)) {
							$targetNAchivedNo2[$ba] = 0;
						}
						$targetNAchivedNo2[$ba] += $ctindex['consumeresin'];
					}

				}

				$targetNAchivedNo['target'] = 20;
				//$targetNAchivedNo['Verified']  = $cindex['Verified'];
				//$targetNAchivedNo['Unverified']= $cindex['Unverified'];
				$targetNAchivedNo['ba'] = trim($cindex['name']);
				$targetNAchivedNo['baid'] = $cindex['brandAmbassadorID'];

				$returnRegion[] = $targetNAchivedNo;
			}

			$return = array('data' => array(0 => array('name' => 'Target', 'data' => array_values($targetNAchivedNo1))
				, 1 => array('name' => 'Achieved', 'data' => array_values($targetNAchivedNo2)),
			),
				'category' => array_values($targetNAchivedNo3),
				'category2' => $targetNAchivedNo4,
			);

			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}

	}
	function getTerritoryDashboard($region_id = '', $area_id = '', $from_date, $to_date) {
		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Territories_model');
		$this->load->model('Areas_model');
		//echo $area_id. 'area ';
		$areasAll = $this->Areas_model->getAllAreas($region_id, $area_id);
		//print_r($areasAll); exit();
		$arrayTotals = array('id' => $areasAll[0]['amanager_id'], 'name' => $areasAll[0]['amanager'], 'location' => $areasAll[0]['name'], 'target' => 0, 'verified' => 0, 'unverified' => 0, 'achived' => 0);
		$territoriesAll = $this->Territories_model->getAllTerritories($region_id, $area_id);
		//print_r($territoriesAll); exit();
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador('');
		// print_r($brandambassadorsAll); exit();
		$consumerAll = $this->Consumer_model->getAllConsumerTypes('', '', '', $from_date, $to_date);
		//echo '<pre>'; print_r($consumerAll); exit();
		$regionBATotal = $brandambassadorsAll['tcount'];
		$regionCunTotal = $consumerAll['tconsumers'];
		//$arrayTotals = array('target' => 0, 'verified' => 0, 'unverified' => 0, 'achived' => 0);
		foreach ($territoriesAll as $tkey => $tindex) {

			$targetNAchivedNo['manager'] = $tindex['tmanager'];
			$targetNAchivedNo['managerid'] = $tindex['tmanager_id'];
			$targetNAchivedNo['territory'] = $tindex['name'];
			$targetNAchivedNo['territoryid'] = $tindex['id'];
			$targetNAchivedNo['target'] = isset($regionBATotal[$tindex['id']]) ? $regionBATotal[$tindex['id']] * 20 : 0;
			$targetNAchivedNo['verified'] = isset($regionCunTotal[$tindex['id']]['Verified']) ? $regionCunTotal[$tindex['id']]['Verified'] : 0;
			$targetNAchivedNo['unverified'] = isset($regionCunTotal[$tindex['id']]['Unverified']) ? $regionCunTotal[$tindex['id']]['Unverified'] : 0;
			$targetNAchivedNo['achived'] = $targetNAchivedNo['verified'] + $targetNAchivedNo['unverified'];
			$targetNAchivedNo['percentage'] = 0;

			if ($targetNAchivedNo['target'] > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $targetNAchivedNo['target']) * 100, 1);
			}
			$arrayTotals['target'] += $targetNAchivedNo['target'];
			$arrayTotals['verified'] += $targetNAchivedNo['verified'];
			$arrayTotals['unverified'] += $targetNAchivedNo['unverified'];
			$arrayTotals['achived'] += $targetNAchivedNo['achived'];

			$returnRegion[] = $targetNAchivedNo;
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$regionResponse = array('my' => $arrayTotals, 'locations' => $returnRegionA);
		return $regionResponse;
		/*$return = array( 'rdata' => $returnRegionA);//, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA );
			//$consumers = $this->Consumers_model->getAllConsumers($phone);
			if ($consumerAll) {
				$this->response($return, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
			}
		*/
	}
	function getAreaDashboard($region_id = '', $from_date, $to_date) {
		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Areas_model');
		$this->load->model('Regions_model');

		$regionsAll = $this->Regions_model->getAllRegions($region_id);
		//print_r($regionsAll); exit();
		$arrayTotals = array('id' => $regionsAll[0]['manager_id'], 'name' => $regionsAll[0]['manager'], 'location' => $regionsAll[0]['name'], 'target' => 0, 'verified' => 0, 'unverified' => 0, 'achived' => 0);

		//echo $region_id. 'region ';
		$areasAll = $this->Areas_model->getAllAreas($region_id);
		//print_r($areasAll); exit();
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador('');
		// print_r($brandambassadorsAll); exit();
		$consumerAll = $this->Consumer_model->getAllConsumerTypes('', '', '', $from_date, $to_date);
		//echo '<pre>'; print_r($consumerAll); exit();
		$regionBATotal = $brandambassadorsAll['acount'];
		$regionCunTotal = $consumerAll['aconsumers'];
		foreach ($areasAll as $akey => $aindex) {

			$targetNAchivedNo['manager'] = $aindex['amanager'];
			$targetNAchivedNo['managerid'] = $aindex['amanager_id'];
			$targetNAchivedNo['area'] = $aindex['name'];
			$targetNAchivedNo['areaid'] = $aindex['id'];
			$targetNAchivedNo['target'] = isset($regionBATotal[$aindex['id']]) ? $regionBATotal[$aindex['id']] * 20 : 0;
			$targetNAchivedNo['verified'] = isset($regionCunTotal[$aindex['id']]['Verified']) ? $regionCunTotal[$aindex['id']]['Verified'] : 0;
			$targetNAchivedNo['unverified'] = isset($regionCunTotal[$aindex['id']]['Unverified']) ? $regionCunTotal[$aindex['id']]['Unverified'] : 0;
			$targetNAchivedNo['achived'] = $targetNAchivedNo['verified'] + $targetNAchivedNo['unverified'];
			$targetNAchivedNo['percentage'] = 0;

			if ($targetNAchivedNo['target'] > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $targetNAchivedNo['target']) * 100, 1);
			}
			$arrayTotals['target'] += $targetNAchivedNo['target'];
			$arrayTotals['verified'] += $targetNAchivedNo['verified'];
			$arrayTotals['unverified'] += $targetNAchivedNo['unverified'];
			$arrayTotals['achived'] += $targetNAchivedNo['achived'];

			$returnRegion[] = $targetNAchivedNo;
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$regionResponse = array('my' => $arrayTotals, 'locations' => $returnRegionA);
		return $regionResponse;
		/*$return = array( 'rdata' => $returnRegionA);//, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA );
			//$consumers = $this->Consumers_model->getAllConsumers($phone);
			if ($consumerAll) {
				$this->response($return, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
			}
		*/
	}
	function getRegionalDashboard($from_date, $to_date) {
		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Regions_model');

		$regionsAll = $this->Regions_model->getAllRegions();
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador('');
		// print_r($brandambassadorsAll); exit();
		$consumerAll = $this->Consumer_model->getAllConsumerTypes('', '', '', $from_date, $to_date);
		//echo '<pre>'; print_r($consumerAll); exit();

		$regionBATotal = $brandambassadorsAll['rcount'];
		$regionCunTotal = $consumerAll['rconsumers'];
		$arrayTotals = array('name' => 'Administrator', 'location' => 'Pakistan', 'target' => 0, 'verified' => 0, 'unverified' => 0, 'achived' => 0);
		foreach ($regionsAll as $rkey => $rindex) {

			$targetNAchivedNo['manager'] = $rindex['manager'];
			$targetNAchivedNo['managerid'] = $rindex['manager_id'];
			$targetNAchivedNo['region'] = $rindex['name'];
			$targetNAchivedNo['regionid'] = $rindex['id'];
			$targetNAchivedNo['target'] = isset($regionBATotal[$rindex['id']]) ? $regionBATotal[$rindex['id']] * 20 : 0;
			$targetNAchivedNo['verified'] = isset($regionCunTotal[$rindex['id']]['Verified']) ? $regionCunTotal[$rindex['id']]['Verified'] : 0;
			$targetNAchivedNo['unverified'] = isset($regionCunTotal[$rindex['id']]['Unverified']) ? $regionCunTotal[$rindex['id']]['Unverified'] : 0;
			$targetNAchivedNo['achived'] = $targetNAchivedNo['verified'] + $targetNAchivedNo['unverified'];
			$targetNAchivedNo['percentage'] = 0;

			if ($targetNAchivedNo['target'] > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $targetNAchivedNo['target']) * 100, 1);
			}
			$arrayTotals['target'] += $targetNAchivedNo['target'];
			$arrayTotals['verified'] += $targetNAchivedNo['verified'];
			$arrayTotals['unverified'] += $targetNAchivedNo['unverified'];
			$arrayTotals['achived'] += $targetNAchivedNo['achived'];

			$returnRegion[] = $targetNAchivedNo;
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$regionResponse = array('my' => $arrayTotals, 'locations' => $returnRegionA);
		return $regionResponse;
		/*$return = array( 'rdata' => $returnRegionA);//, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA );
			//$consumers = $this->Consumers_model->getAllConsumers($phone);
			if ($consumerAll) {
				$this->response($return, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
			}
		*/
	}
	function mydashboardsData_get() {
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$id = $this->get('id');
		$location = $this->get('location');
		$from_date = $this->get('fdate');
		$to_date = $this->get('tdate');
		//echo $from_date.'A';
		//echo $to_date.'A';
		//print_r($role_id);
		//print_r($id);
		//exit();
		$my_data = '';
		if ($location == 'territory') {
			$my_data = $this->getTerritoryDashboard($region_id, $id, $from_date, $to_date);
		} else if ($location == 'area') {
			$my_data = $this->getAreaDashboard($id, $from_date, $to_date);
		} else {
			if ($role_id <= 3) {
				$my_data = $this->getRegionalDashboard($from_date, $to_date);
			} else if ($role_id == 4) {
//($role_id > 3 $role_id <= 5){
				$my_data = $this->getAreaDashboard($region_id, $from_date, $to_date);
			} else if ($role_id == 6) {
//($role_id > 5 $role_id <= 7){
				$my_data = $this->getTerritoryDashboard($region_id, $area_id, $from_date, $to_date);
			} else if ($role_id == 8) {
//($role_id > 7 $role_id <= 8){
				$my_data = $this->getBrandDashboard($from_date, $to_date);
			}
		}

		if ($my_data) {
			$this->response($my_data, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any locations!'), 404);
		}
	}
	function regionboards_get($phone = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		//	$this->load->model('Callactivities_model');
		//	$this->load->model('Consumers_model');
		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Regions_model');
		$this->load->model('Areas_model');
		$this->load->model('Territories_model');

		$regionsAll = $this->Regions_model->getAllRegions();
		$areasAll = $this->Areas_model->getAllAreas();
		// print_r($areasAll); //exit();
		$territoriesAll = $this->Territories_model->getAllTerritories();
		// print_r($territoriesAll); exit();
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador('');
		// print_r($brandambassadorsAll); exit();
		$consumerAll = $this->Consumer_model->getAllConsumerTypes();
		//echo '<pre>'; print_r($consumerAll); exit();
		$returnRegion = $returnRegion1 = $returnRegion2 = $regionName = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$regionBATotal = $brandambassadorsAll['rcount'];
		//	$regionCunTotal  = $callactivitiesAll['rconsumers'];
		$regionCunTotal = $consumerAll['rconsumers'];

		foreach ($regionsAll as $rkey => $rindex) {

			$targetNAchivedNo['manager'] = $rindex['manager'];
			$targetNAchivedNo['managerid'] = $rindex['manager_id'];
			$targetNAchivedNo['region'] = $rindex['name'];
			$targetNAchivedNo['regionid'] = $rindex['id'];
			$targetNAchivedNo['target'] = isset($regionBATotal[$rindex['id']]) ? $regionBATotal[$rindex['id']] * 20 : 0;
			$targetNAchivedNo['verified'] = isset($regionCunTotal[$rindex['id']]['Verified']) ? $regionCunTotal[$rindex['id']]['Verified'] : 0;
			$targetNAchivedNo['unverified'] = isset($regionCunTotal[$rindex['id']]['Unverified']) ? $regionCunTotal[$rindex['id']]['Unverified'] : 0;
			$targetNAchivedNo['achived'] = $targetNAchivedNo['verified'] + $targetNAchivedNo['unverified'];
			$targetNAchivedNo['percentage'] = 0;

			if ($targetNAchivedNo['target'] > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $targetNAchivedNo['target']) * 100, 1);
			}

			//	$targetNAchivedNo1['name'] = $rindex['name'];
			//	$targetNAchivedNo1    = $targetNAchivedNo['target'];
			//$targetNAchivedNo1['color']= '#013c4c';
			//	$targetNAchivedNo2['y'] = $rindex['name'];
			//	$targetNAchivedNo2    = isset($regionCunTotal[$rindex['id']])?$regionCunTotal[$rindex['id']]:0;
			//$targetNAchivedNo2['color']= '#ea1c33';
			//	$regionName[] 	 = $rindex['name'];
			$returnRegion[] = $targetNAchivedNo;

			//	$returnRegion1[] = $targetNAchivedNo1;
			//	$returnRegion2[] = $targetNAchivedNo2;

			//$targetNAchivedNo
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$return = array('rdata' => $returnRegionA); //, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA );
		//$consumers = $this->Consumers_model->getAllConsumers($phone);
		if ($consumerAll) {
			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}
		exit();
		//$returnRegion1 =  usort($returnRegion, "myFieldSort");
		//, "myFieldSort");
		$returnArea = $returnArea1 = $returnArea2 = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$areaBATotal = $brandambassadorsAll['acount'];
		$areaCunTotal = $consumerAll['aconsumers'];
		foreach ($areasAll as $akey => $aindex) {

			$targetNAchivedNo['amanager'] = $aindex['amanager'];
			$targetNAchivedNo['amanagerid'] = $aindex['amanager_id'];
			$targetNAchivedNo['area'] = $aindex['name'];
			$targetNAchivedNo['areaid'] = $aindex['id'];

			$targetNAchivedNo['target'] = isset($areaBATotal[$aindex['id']]) ? $areaBATotal[$aindex['id']] * 20 : 0;
			$targetNAchivedNo['achived'] = isset($areaCunTotal[$aindex['id']]) ? $areaCunTotal[$aindex['id']] : 0;
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['target'] > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $targetNAchivedNo['target']) * 100);
			}
			$returnArea[] = $targetNAchivedNo;
			/*$targetNAchivedNo1['name'] = $rindex['name'];
				$targetNAchivedNo1['y']    = $targetNAchivedNo['target'];
				$targetNAchivedNo1['color']= '#013c4c';

				$targetNAchivedNo2['name'] = $rindex['name'];
				$targetNAchivedNo2['y']    = $targetNAchivedNo['achived'];
				$targetNAchivedNo2['color']= '#ea1c33';

				$returnArea1[] = $targetNAchivedNo1;
				$returnArea2[] = $targetNAchivedNo2;
			*/
			//$targetNAchivedNo
		}

		$returnTerritory = $returnTerritory1 = $returnTerritory2 = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$territoryBATotal = $brandambassadorsAll['tcount'];
		$territoryCunTotal = $consumerAll['tconsumers'];
		foreach ($territoriesAll as $tkey => $tindex) {

			$targetNAchivedNo['tmanager'] = $tindex['tmanager'];
			$targetNAchivedNo['tmanagerid'] = $tindex['tmanager_id'];
			$targetNAchivedNo['territory'] = $tindex['name'];
			$targetNAchivedNo['territoryid'] = $tindex['id'];

			$targetNAchivedNo['target'] = isset($territoryBATotal[$tindex['id']]) ? $territoryBATotal[$tindex['id']] * 20 : 0;
			$targetNAchivedNo['achived'] = isset($territoryCunTotal[$tindex['id']]) ? $territoryCunTotal[$tindex['id']] : 0;
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['target'] > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $targetNAchivedNo['target']) * 100, 2);
			}
			$returnTerritory[] = $targetNAchivedNo;
			/*$targetNAchivedNo1['name'] = $rindex['name'];
				$targetNAchivedNo1['y']    = $targetNAchivedNo['target'];
				$targetNAchivedNo1['color']= '#013c4c';

				$targetNAchivedNo2['name'] = $rindex['name'];
				$targetNAchivedNo2['y']    = $targetNAchivedNo['achived'];
				$targetNAchivedNo2['color']= '#ea1c33';

				$returnArea1[] = $targetNAchivedNo1;
				$returnArea2[] = $targetNAchivedNo2;
			*/
			//$targetNAchivedNo
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$returnAreaA = $this->sortArr($returnArea);
		$returnTerritoryA = $this->sortArr($returnTerritory);

		$return = array('series' => array('data' => array(0 => array('name' => 'Target', 'data' => $returnRegion1), 1 => array('name' => 'Achieved', 'data' => $returnRegion2),
		), 'regionName' => $regionName)
			, 'rdata' => $returnRegionA, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA);
		//$consumers = $this->Consumers_model->getAllConsumers($phone);
		if ($consumerAll) {
			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}
		//}

		/*{
			            name: 'Target',
			            colorByPoint: true,
			            data: [{
			                name: 'North Region',
			                y: 5,
							color:"#013c4c",
			                drilldown: 'animals'
			            }, {
			                name: 'Sindh & Baluchistan Region',
			                y: 2,
							color:"#013c4c",
			                drilldown: 'fruits'
			            }, {
			                name: 'Southern Punjab Region',
			                y: 4,
							color:"#013c4c",
			                drilldown: 'cars'
			            }, {
			                name: 'Central Punjab Team',
			                y: 4,
							color:"#013c4c",
			                drilldown: 'sahil'
			            }
						]
			        }, {
			            name: 'Achieved',
			            colorByPoint: true,
			            data: [{
			                name: 'North Region',
			                y: 1,
							color:"#ea1c33",
			                drilldown: 'animals2'
			            }, {
			                name: 'Sindh & Baluchistan Region',
			                y: 5,
							color:"#ea1c33",
			                drilldown: 'fruits2'
			            }, {
			                name: 'Southern Punjab Region',
			                y: 2,
							color:"#ea1c33",
			                drilldown: 'cars2'
			            }, {
			                name: 'Central Punjab Team',
			                y: 6,
							color:"#ea1c33",
			                drilldown: 'sahil2'
			            }]
		*/
	}
	function myFieldSort($a, $b) {
		return $b['percentage'] - $a['percentage'];
	}
	function sortArr($locations) {
		$sortArray = array();

		foreach ($locations as $location) {
			foreach ($location as $key => $value) {
				if (!isset($sortArray[$key])) {
					$sortArray[$key] = array();
				}
				$sortArray[$key][] = $value;
			}
		}

		$orderby = "percentage"; //change this to whatever key you want from the array

		array_multisort($sortArray[$orderby], SORT_DESC, $locations);
		return $locations;
	}
	function getSmartDsDateDifference() {
		$dStart = new DateTime('2015-12-21');
		$dEnd = new DateTime(date('Y-m-d', strtotime('-1 day')));
		$dDiff = $dStart->diff($dEnd);
		//  echo $dDiff->format('%R'); +/- // use for point out relation: smaller/greater
		// echo $dDiff->days;

		return $dDiff->days;
		/*$start_date = '';
			 		$end_date 	= date('Y-m-d', strtotime('-1 day'));
			 		//echo $end_date;
			 		$diff 		= abs(strtotime($end_date.' 23:59:59') - strtotime($start_date.' 00:00:00'));
			 		//echo $diff;
			 		$days = $diff/3600*24;
			 		echo $days;
		*/
	}
	function getSmartVOQDateDifference() {
		$dStart = new DateTime('2015-12-21');
		$dEnd = new DateTime(date('Y-m-d', strtotime('-1 day')));
		$dDiff = $dStart->diff($dEnd);
		//  echo $dDiff->format('%R'); +/- // use for point out relation: smaller/greater
		// echo $dDiff->days;

		return $dDiff->days;
		/*$start_date = '';
			 		$end_date 	= date('Y-m-d', strtotime('-1 day'));
			 		//echo $end_date;
			 		$diff 		= abs(strtotime($end_date.' 23:59:59') - strtotime($start_date.' 00:00:00'));
			 		//echo $diff;
			 		$days = $diff/3600*24;
			 		echo $days;
		*/
	}
	function targetNAchivedSmart_get($phone = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Callactivities_model');
		$this->load->model('Consumers_model');
		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Regions_model');
		$this->load->model('Areas_model');
		$this->load->model('Territories_model');

		$callactivitiesAll = $this->Callactivities_model->getAllCallActivities();
		//echo '<pre>'; print_r($callactivitiesAll); exit();
		$regionsAll = $this->Regions_model->getAllRegions();
		$areasAll = $this->Areas_model->getAllAreas();
		// print_r($areasAll); //exit();
		$territoriesAll = $this->Territories_model->getAllTerritories();
		// print_r($territoriesAll); exit();
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador('');
		$difference = $this->getSmartVOQDateDifference();
		//print_r($difference);
		//echo '<pre>'; print_r($brandambassadorsAll['rcount']); exit();
		$consumerAll = $this->Consumer_model->getAllConsumer();
		//echo '<pre>'; print_r($consumerAll); exit();
		$returnRegion = $returnRegion1 = $returnRegion2 = $regionName = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$regionBATotal = $brandambassadorsAll['rcount'];
		$regionCunTotal = $callactivitiesAll['rconsumers'];
		$regionVTotal = $callactivitiesAll['vrconsumers'];
		$regionUTotal = $callactivitiesAll['urconsumers'];
		$regionAdTotal = $callactivitiesAll['adrconsumers'];
		$regionUadTotal = $callactivitiesAll['uadrconsumers'];

		$regionCunTotal2 = $consumerAll['rconsumers'];
		$regionCunTotal1 = $brandambassadorsAll['rcount'];
		/* , 'vrconsumers' => $regionCountVarified,'vaconsumers' => $areaCountVarified,'vtconsumers' => $territoryCountVarified
			    , '' => $regionCountUnverified,'uaconsumers' => $areaCountUnverified,'utconsumers' => $territoryCountUnverified
		*/
		//  print_r($regionVTotal);
		//  print_r($regionUTotal);
		//  exit();

		$regionUpdate = array();
		foreach ($regionsAll as $rkey => $rindex) {

			$targetNAchivedNo['manager'] = $rindex['manager'];
			$targetNAchivedNo['managerid'] = $rindex['manager_id'];
			$targetNAchivedNo['region'] = $rindex['name'];
			$targetNAchivedNo['regionid'] = $rindex['id'];

			if (!array_key_exists($rindex['id'], $regionUTotal)) {
				$regionUTotal[$rindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $regionVTotal)) {
				$regionVTotal[$rindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $regionAdTotal)) {
				$regionAdTotal[$rindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $regionUadTotal)) {
				$regionUadTotal[$rindex['id']] = 0;
			}

			$regionUpdate[$rindex['id']]['unaided'] = $regionUadTotal[$rindex['id']];
			$regionUpdate[$rindex['id']]['aided'] = $regionAdTotal[$rindex['id']];

			$targetNAchivedNo['target'] = isset($regionUTotal[$rindex['id']]) ? $regionUTotal[$rindex['id']] : 0;
			$targetNAchivedNo['achived'] = isset($regionVTotal[$rindex['id']]) ? $regionVTotal[$rindex['id']] : 0;

			$total = $targetNAchivedNo['achived'] + $targetNAchivedNo['target'];
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['achived'] > 0 and $targetNAchivedNo['target'] == 0) {
				$targetNAchivedNo['percentage'] = 100;
			} else if ($total > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $total) * 100, 1);
			}

			//Region

			//	$targetNAchivedNo1['name'] = $rindex['name'];
			$targetNAchivedNo1 = isset($regionCunTotal1[$rindex['id']]) ? ($regionCunTotal1[$rindex['id']] * $difference * 20) : 0;
			//$targetNAchivedNo1['color']= '#013c4c';
			//	$targetNAchivedNo2['y'] = $rindex['name'];
			$targetNAchivedNo2 = isset($regionCunTotal2[$rindex['id']]) ? $regionCunTotal2[$rindex['id']] : 0;
			//$targetNAchivedNo2['color']= '#ea1c33';

			/*if($rindex['id'] == 2){
					$targetNAchivedNo1    = 8680;
					$targetNAchivedNo2    = 6010;
				}
				else if($rindex['id'] == 1){
					$targetNAchivedNo1    = 8460;
					$targetNAchivedNo2    = 5000;
				}
				else if($rindex['id'] == 3){
					$targetNAchivedNo1    = 5280;
					$targetNAchivedNo2    = 3056;
				}
				else{
					$targetNAchivedNo1    = 9100;
					$targetNAchivedNo2    = 6800;

			*/
			$regionName[] = $rindex['name'];
			$returnRegion[] = $targetNAchivedNo;

			$returnRegion1[] = $targetNAchivedNo1;
			$returnRegion2[] = $targetNAchivedNo2;

			//$regionUpdate = array('aided'=> $regionAdTotal, 'unaided' => $regionUadTotal);
			//$targetNAchivedNo
		}

		//$returnRegion1 =  usort($returnRegion, "myFieldSort");
		//, "myFieldSort");
		$returnArea = $returnArea1 = $returnArea2 = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$areaBATotal = $brandambassadorsAll['acount'];
		$areaCunTotal = $callactivitiesAll['aconsumers'];

		$areaVTotal = $callactivitiesAll['vaconsumers'];
		$areaUTotal = $callactivitiesAll['uaconsumers'];

		foreach ($areasAll as $akey => $aindex) {

			$targetNAchivedNo['amanager'] = $aindex['amanager'];
			$targetNAchivedNo['amanagerid'] = $aindex['amanager_id'];
			$targetNAchivedNo['area'] = $aindex['name'];
			$targetNAchivedNo['areaid'] = $aindex['id'];

			if (!array_key_exists($aindex['id'], $areaUTotal)) {
				$areaUTotal[$aindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $areaVTotal)) {

				$areaVTotal[$aindex['id']] = 0;
			}
			$targetNAchivedNo['target'] = isset($areaUTotal[$aindex['id']]) ? $areaUTotal[$aindex['id']] : 0; //$total; //isset($regionBATotal[$rindex['id']])?$regionBATotal[$rindex['id']]*20:0;
			$targetNAchivedNo['achived'] = isset($areaVTotal[$aindex['id']]) ? $areaVTotal[$aindex['id']] : 0;

			$total = $targetNAchivedNo['achived'] + $targetNAchivedNo['target'];
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['achived'] > 0 and $targetNAchivedNo['target'] == 0) {
				$targetNAchivedNo['percentage'] = 100;
			} else if ($total > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $total) * 100, 1);
			}

			//$targetNAchivedNo['target']   = isset($areaBATotal[$aindex['id']])?$areaBATotal[$aindex['id']]*20:0;
			//$targetNAchivedNo['achived']  = isset($areaCunTotal[$aindex['id']])?$areaCunTotal[$aindex['id']]:0;

			$returnArea[] = $targetNAchivedNo;
			/*$targetNAchivedNo1['name'] = $rindex['name'];
				$targetNAchivedNo1['y']    = $targetNAchivedNo['target'];
				$targetNAchivedNo1['color']= '#013c4c';

				$targetNAchivedNo2['name'] = $rindex['name'];
				$targetNAchivedNo2['y']    = $targetNAchivedNo['achived'];
				$targetNAchivedNo2['color']= '#ea1c33';

				$returnArea1[] = $targetNAchivedNo1;
				$returnArea2[] = $targetNAchivedNo2;
			*/
			//$targetNAchivedNo
		}

		$returnTerritory = $returnTerritory1 = $returnTerritory2 = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$territoryBATotal = $brandambassadorsAll['tcount'];
		$territoryCunTotal = $callactivitiesAll['tconsumers'];

		$territoryVTotal = $callactivitiesAll['vtconsumers'];
		$territoryUTotal = $callactivitiesAll['utconsumers'];

		foreach ($territoriesAll as $tkey => $tindex) {

			$targetNAchivedNo['tmanager'] = $tindex['tmanager'];
			$targetNAchivedNo['tmanagerid'] = $tindex['tmanager_id'];
			$targetNAchivedNo['territory'] = $tindex['name'];
			$targetNAchivedNo['territoryid'] = $tindex['id'];

			if (!array_key_exists($tindex['id'], $territoryUTotal)) {
				$territoryUTotal[$tindex['id']] = 0;
			}

			if (!array_key_exists($tindex['id'], $territoryVTotal)) {

				$territoryVTotal[$tindex['id']] = 0;
			}
			//else{
			$targetNAchivedNo['target'] = isset($territoryUTotal[$tindex['id']]) ? $territoryUTotal[$tindex['id']] : 0; //$total; //isset($regionBATotal[$rindex['id']])?$regionBATotal[$rindex['id']]*20:0;
			//}

			//	else{
			$targetNAchivedNo['achived'] = isset($territoryVTotal[$tindex['id']]) ? $territoryVTotal[$tindex['id']] : 0;
			//	}
			$total = $targetNAchivedNo['achived'] + $targetNAchivedNo['target'];
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['achived'] > 0 and $targetNAchivedNo['target'] == 0) {
				$targetNAchivedNo['percentage'] = 100;
			} else if ($total > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $total) * 100, 1);
			}
			$returnTerritory[] = $targetNAchivedNo;
			/*$targetNAchivedNo1['name'] = $rindex['name'];
				$targetNAchivedNo1['y']    = $targetNAchivedNo['target'];
				$targetNAchivedNo1['color']= '#013c4c';

				$targetNAchivedNo2['name'] = $rindex['name'];
				$targetNAchivedNo2['y']    = $targetNAchivedNo['achived'];
				$targetNAchivedNo2['color']= '#ea1c33';

				$returnArea1[] = $targetNAchivedNo1;
				$returnArea2[] = $targetNAchivedNo2;
			*/
			//$targetNAchivedNo
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$returnAreaA = $this->sortArr($returnArea);
		$returnTerritoryA = $this->sortArr($returnTerritory);

		$return = array('series' => array('data' => array(0 => array('name' => 'Target', 'data' => $returnRegion1), 1 => array('name' => 'Achieved', 'data' => $returnRegion2),
		), 'regionName' => $regionName)
			, 'rdata' => $returnRegionA, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA, 'aided' => $regionUpdate);
		//$consumers = $this->Consumers_model->getAllConsumers($phone);
		if ($consumerAll) {
			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}
		//}

		/*{
			            name: 'Target',
			            colorByPoint: true,
			            data: [{
			                name: 'North Region',
			                y: 5,
							color:"#013c4c",
			                drilldown: 'animals'
			            }, {
			                name: 'Sindh & Baluchistan Region',
			                y: 2,
							color:"#013c4c",
			                drilldown: 'fruits'
			            }, {
			                name: 'Southern Punjab Region',
			                y: 4,
							color:"#013c4c",
			                drilldown: 'cars'
			            }, {
			                name: 'Central Punjab Team',
			                y: 4,
							color:"#013c4c",
			                drilldown: 'sahil'
			            }
						]
			        }, {
			            name: 'Achieved',
			            colorByPoint: true,
			            data: [{
			                name: 'North Region',
			                y: 1,
							color:"#ea1c33",
			                drilldown: 'animals2'
			            }, {
			                name: 'Sindh & Baluchistan Region',
			                y: 5,
							color:"#ea1c33",
			                drilldown: 'fruits2'
			            }, {
			                name: 'Southern Punjab Region',
			                y: 2,
							color:"#ea1c33",
			                drilldown: 'cars2'
			            }, {
			                name: 'Central Punjab Team',
			                y: 6,
							color:"#ea1c33",
			                drilldown: 'sahil2'
			            }]
		*/
	}
	function uploadeConsumersGTDataNew_post() {

		//
		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];

		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Brand_model');
		//$this->load->model('Brand_model');

		//$this->load->model('Market_model');
		//$this->load->model('Territories_model');
		//$this->load->model('Area_model');
		//$this->load->model('Regions_model');
		//$this->load->model('ComplainStateLog_model');
		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0; //16:57:49-17:00:03//17:06:06-17-08-24
			//   print_r($header);
			//echo '<pre>';
			//exit();
			$baNOFound = array();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				//	print_r($data);
				//	exit();
				$num = count($data);
				//print_r($num);
				//echo "Size";
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 14) {
					$file_row_error[] = $row;

				} else {
					//	print_r($data);

					$name = trim($data[0]);
					$cnic = trim($data[1]);
					$msisdn = trim($data[2]);
					$age = trim($data[3]);
					$address = trim($data[4]);
					$city = strtolower(trim($data[5]));
					$brandname = trim($data[6]);
					$featureContact = trim($data[7]);
					$code = trim($data[8]);

					$addedOn = trim($data[9]);
					$addedOn2 = explode(' ', $addedOn);
					$addedOn3 = explode('/', $addedOn2[0]); //m/d/Y
					$addedOn4 = explode(':', $addedOn2[1]);

					$creationTime = $addedOn3[2] . '-' . str_pad($addedOn3[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($addedOn3[1], 2, 0, STR_PAD_LEFT) . ' ' . str_pad($addedOn4[0], 2, 0, STR_PAD_LEFT) . ':' . str_pad($addedOn4[1], 2, 0, STR_PAD_LEFT) . ':00';
					$verificationTime = $varifyDate = trim($data[10]);
					if ($varifyDate != '') {
						$varifyDate = trim($data[10]);
						$varifyDate2 = explode(' ', $varifyDate);
						$varifyDate3 = explode('/', $varifyDate2[0]); //m/d/Y
						$varifyDate4 = explode(':', $varifyDate2[1]);

						$verificationTime = $varifyDate3[2] . '-' . str_pad($varifyDate3[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($varifyDate3[1], 2, 0, STR_PAD_LEFT) . ' ' . str_pad($varifyDate4[0], 2, 0, STR_PAD_LEFT) . ':' . str_pad($varifyDate4[1], 2, 0, STR_PAD_LEFT) . ':00';
					}
					//	$varifyDate	= trim($data[10]);
					$brandAmb = trim($data[11]);
					$baMsisdn = trim($data[12]);

					$baID = $this->Brandambassador_model->getBrandAmbassadorID($baMsisdn, $brandAmb);
					$status = trim($data[13]);
					//$input["code"] 			= trim($code);
					//if($baID){
					$bID = $this->Brand_model->getBrandID($brandname);

					$input["name"] = trim($name);
					$input["cnic"] = str_replace(" ", "", trim($cnic));
					$input["msisdn"] = trim($msisdn);
					$input["age"] = trim($age);
					$input["address"] = trim($address);
					$input["city"] = trim($city);
					$input["brandID"] = trim($bID);
					$input["isFutureContact"] = (trim($featureContact) == 'Y') ? 1 : 0;
					//	$input["address"] 		= trim($saleCode);
					$input["creationTime"] = strtotime(trim($creationTime));
					$input["verificationTime"] = strtotime(trim($verificationTime));
					$input["brandAmbassadorID"] = $baID;
					//$input["code"] 			= $code;
					//$input["code"] 			= $code;
					$input["uploaded"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;
					$input["company"] = 'mad';
					//$this->db->like('msisdn', $phone);
					//}
					//if($baID)
					// print_r($input);
					//$this->Consumer_model->findNUpdateAllConsumers($input);

					/*if (!$baID) {
						$baNOFound[] = $input;
					}*/

					$file_row[] = $input;

					//$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
					//if ($dailySiebels) {
					//	$suceessful++;
					//}
				}
				//print_r($baNOFound);
				$row++; //Next Row
			}
			$dailySiebels = $this->Consumer_model->setAllConsumerGTs($file_row);
			if ($dailySiebels) {
				$suceessful = count($dailySiebels);
			}
			fclose($handle); //closing file after reading all data
			///exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	function uploadeConsumersGTData_post() {

		//
		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];

		$this->load->model('Consumer_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Brand_model');
		//$this->load->model('Brand_model');

		//$this->load->model('Market_model');
		//$this->load->model('Territories_model');
		//$this->load->model('Area_model');
		//$this->load->model('Regions_model');
		//$this->load->model('ComplainStateLog_model');
		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0; //16:57:49-17:00:03//17:06:06-17-08-24
			//   print_r($header);
			//echo '<pre>';
			//exit();
			$baNOFound = array();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				//	print_r($data);
				//	exit();
				$num = count($data);
				//print_r($num);
				//echo "Size";
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 14) {
					$file_row_error[] = $row;

				} else {
					//	print_r($data);

					$name = trim($data[0]);
					$cnic = trim($data[1]);
					$msisdn = trim($data[2]);
					$age = trim($data[3]);
					$address = trim($data[4]);
					$city = trim($data[5]);
					$brandname = trim($data[6]);
					$featureContact = trim($data[7]);
					$code = trim($data[8]);

					$addedOn = trim($data[9]);
					$addedOn2 = explode(' ', $addedOn);
					$addedOn3 = explode('/', $addedOn2[0]); //m/d/Y
					$addedOn4 = explode(':', $addedOn2[1]);

					$creationTime = $addedOn3[2] . '-' . str_pad($addedOn3[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($addedOn3[1], 2, 0, STR_PAD_LEFT) . ' ' . str_pad($addedOn4[0], 2, 0, STR_PAD_LEFT) . ':' . str_pad($addedOn4[1], 2, 0, STR_PAD_LEFT) . ':00';
					$verificationTime = $varifyDate = trim($data[10]);
					if ($varifyDate != '') {
						$varifyDate = trim($data[10]);
						$varifyDate2 = explode(' ', $varifyDate);
						$varifyDate3 = explode('/', $varifyDate2[0]); //m/d/Y
						$varifyDate4 = explode(':', $varifyDate2[1]);

						$verificationTime = $varifyDate3[2] . '-' . str_pad($varifyDate3[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($varifyDate3[1], 2, 0, STR_PAD_LEFT) . ' ' . str_pad($varifyDate4[0], 2, 0, STR_PAD_LEFT) . ':' . str_pad($varifyDate4[1], 2, 0, STR_PAD_LEFT) . ':00';
					}
					//	$varifyDate	= trim($data[10]);
					$brandAmb = trim($data[11]);
					$baMsisdn = trim($data[12]);

					$baID = $this->Brandambassador_model->getBrandAmbassadorID($baMsisdn, $brandAmb);
					$status = trim($data[13]);
					//$input["code"] 			= trim($code);
					//if($baID){
					$bID = $this->Brand_model->getBrandID($brandname);

					$input["name"] = trim($name);
					$input["cnic"] = str_replace(" ", "", trim($cnic));
					$input["msisdn"] = trim($msisdn);
					$input["age"] = trim($age);
					$input["address"] = trim($address);
					$input["city"] = trim($city);
					$input["brandID"] = trim($bID);
					$input["isFutureContact"] = (trim($featureContact) == 'Y') ? 1 : 0;
					//	$input["address"] 		= trim($saleCode);
					$input["creationTime"] = strtotime(trim($creationTime));
					$input["verificationTime"] = strtotime(trim($verificationTime));
					$input["brandAmbassadorID"] = $baID;
					//$input["code"] 			= $code;
					//$input["code"] 			= $code;
					$input["uploaded"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;
					$input["company"] = 'mad';
					//$this->db->like('msisdn', $phone);
					//}
					//if($baID)
					// print_r($input);
					$this->Consumer_model->findNUpdateAllConsumers($input);

					if (!$baID) {
						$baNOFound[] = $input;
					}

					//	//$file_row[] = $input;

					//$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
					//if ($dailySiebels) {
					//	$suceessful++;
					//}
				}
				//print_r($baNOFound);
				$row++; //Next Row
			}
			/*$dailySiebels = $this->Brandambassador_model->updateAllBrandAmbassador($input, $code);
				if ($dailySiebels) {
					$suceessful = count($dailySiebels);
			*/
			fclose($handle); //closing file after reading all data
			///exit();
		}
		$this->response(array('error' => $file_row_error, 'nba' => $baNOFound, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	function uploadeConsumersData_post() {

		//
		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];

		$this->load->model('Consumers_model');
		$this->load->model('Brandambassador_model');
		$this->load->model('Brand_model');

		//$this->load->model('Market_model');
		//$this->load->model('Territories_model');
		//$this->load->model('Area_model');
		//$this->load->model('Regions_model');
		//$this->load->model('ComplainStateLog_model');
		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0; //16:57:49-17:00:03//17:06:06-17-08-24
			//   print_r($header);
			//echo '<pre>';
			//exit();
			$baNOFound = array();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				//	print_r($data);
				//	exit();
				$num = count($data);
				//print_r($num);
				//echo "Size";
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 14) {
					$file_row_error[] = $row;

				} else {
					//	print_r($data);
					$name = trim($data[0]);
					$cnic = trim($data[1]);
					$msisdn = trim($data[2]);
					$age = trim($data[3]);
					$address = trim($data[4]);
					$city = trim($data[5]);
					$brandname = trim($data[6]);
					$featureContact = trim($data[7]);
					$code = trim($data[8]);

					$addedOn = trim($data[9]);
					$addedOn2 = explode(' ', $addedOn);
					$addedOn3 = explode('/', $addedOn2[0]); //m/d/Y
					$addedOn4 = explode(':', $addedOn2[1]);

					$creationTime = $addedOn3[2] . '-' . str_pad($addedOn3[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($addedOn3[1], 2, 0, STR_PAD_LEFT) . ' ' . str_pad($addedOn4[0], 2, 0, STR_PAD_LEFT) . ':' . str_pad($addedOn4[1], 2, 0, STR_PAD_LEFT) . ':00';
					$verificationTime = $varifyDate = trim($data[10]);
					if ($varifyDate != '') {
						$varifyDate = trim($data[10]);
						$varifyDate2 = explode(' ', $varifyDate);
						$varifyDate3 = explode('/', $varifyDate2[0]); //m/d/Y
						$varifyDate4 = explode(':', $varifyDate2[1]);

						$verificationTime = $varifyDate3[2] . '-' . str_pad($varifyDate3[0], 2, 0, STR_PAD_LEFT) . '-' . str_pad($varifyDate3[1], 2, 0, STR_PAD_LEFT) . ' ' . str_pad($varifyDate4[0], 2, 0, STR_PAD_LEFT) . ':' . str_pad($varifyDate4[1], 2, 0, STR_PAD_LEFT) . ':00';
					}
					//	$varifyDate	= trim($data[10]);
					$brandAmb = trim($data[11]);
					$baMsisdn = trim($data[12]);

					$baID = $this->Brandambassador_model->getBrandAmbassadorID($baMsisdn, $brandAmb);
					$status = trim($data[13]);
					//$input["code"] 			= trim($code);
					//if($baID){
					$bID = $this->Brand_model->getBrandID($brandname);
					$input["name"] = trim($name);
					$input["cnic"] = str_replace(" ", "", trim($cnic));
					$input["msisdn"] = trim($msisdn);
					$input["age"] = trim($age);
					$input["address"] = trim($address);
					$input["city"] = strtolower(trim($city));
					$input["brand_id"] = trim($bID);
					$input["isFutureContact"] = (trim($featureContact) == 'Y') ? 1 : 0;
					//	$input["address"] 		= trim($saleCode);
					$input["creationTime"] = trim($creationTime);
					$input["verificationTime"] = trim($verificationTime);
					$input["ambassador_id"] = $baID;
					//$input["code"] 			= $code;
					$input["code"] = $code;
					$input["uploaded"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;
					$input["ambassador_name"] = $brandAmb;
					$input["ambassador_msisdn"] = $baMsisdn;
					//}
					//if($baID)
					//print_r($input);
					$this->Consumers_model->findNUpdateAllConsumers($input);

					if (!$baID) {
						$baNOFound[] = $input;
					}

				}
				//print_r($baNOFound);
				$row++; //Next Row
			}

			fclose($handle); //closing file after reading all data
			///exit();
		}
		$this->response(array('error' => $file_row_error, 'nba' => $baNOFound, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	function uploadeBrandAmbassadorDataEdit_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('Brandambassador_model');
		//$this->load->model('Market_model');
		//$this->load->model('Territories_model');
		//$this->load->model('Area_model');
		//$this->load->model('Regions_model');
		//$this->load->model('ComplainStateLog_model');
		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0; //16:57:49-17:00:03//17:06:06-17-08-24
			//print_r($header);
			//echo '<pre>';
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				//	print_r($data);
				//	exit();
				$num = count($data);
				//print_r($num);
				//echo "Size";
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 9) {
					$file_row_error[] = $row;
				} else {
					//print_r($data);

					$code = trim($data[0]);
					$name = trim($data[1]);
					$m1 = trim($data[2]);
					$m2 = trim($data[3]);
					$region = trim($data[4]);
					$area = trim($data[5]);
					$territory = trim($data[6]);
					$type = trim($data[7]);
					$working = trim($data[8]);

					$input["code"] = trim($code);
					$input["name"] = trim($name);
					$input["mobileNo1"] = str_replace(" ", "", trim($m1));
					$input["mobileNo2"] = trim($m2);
					$input["regionID"] = trim($region);
					$input["areaID"] = trim($area);
					$input["territoryID"] = trim($territory);
					$input["type"] = trim($type);
					$input["working"] = trim($working);
					//$input["code"] 		= $code;
					$input["uploaded"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;

					$this->Brandambassador_model->findNUpdateAllBrandAmbassador($input);

					//	//$file_row[] = $input;

					//$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
					//if ($dailySiebels) {
					//	$suceessful++;
					//}
				}

				$row++; //Next Row
			}
			/*$dailySiebels = $this->Brandambassador_model->updateAllBrandAmbassador($input, $code);
				if ($dailySiebels) {
					$suceessful = count($dailySiebels);
			*/
			print_r($file_row_error);
			fclose($handle); //closing file after reading all data
			exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}
	function uploadeBrandAmbassadorData_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		//$this->load->model('Brandambassador_model');
		//$this->load->model('Market_model');
		//$this->load->model('Territories_model');
		//$this->load->model('Area_model');
		//$this->load->model('Regions_model');
		//$this->load->model('ComplainStateLog_model');
		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0; //16:57:49-17:00:03//17:06:06-17-08-24
			//print_r($header);
			//echo '<pre>';
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				//	print_r($data);
				//	exit();
				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 11) {
					$file_row_error[] = $row;
				} else {

					$code = trim($data[0]);
					$name = trim($data[1]);
					$mobileNo1 = trim($data[2]);
					$mobileNo2 = trim($data[3]);
					$market = trim($data[4]);
					$territory = trim($data[5]);
					$area = trim($data[6]);
					$region = trim($data[7]);
					$type = trim($data[8]);
					$working = trim($data[9]);

					$market_id = $this->Market_model->getMarketID($market);
					//$bundle_pitch 		= trim($data[10]);

					$input["msisdn"] = $msisdn;
					$input["current_pp"] = $current_pp;
					$input["total_bill_amt"] = $total_bill;
					$input["current_bundle"] = $current_bundle;
					$input["bundle_pitch"] = $bundle_pitch;
					$input["total_consumption"] = $total_consumption;

					$input["uploaded"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;

					$file_row[] = $input;

					//$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
					//if ($dailySiebels) {
					//	$suceessful++;
					//}
				}

				$row++; //Next Row
			}
			$dailySiebels = $this->UpsellingUploads_model->setAllUpsellings($file_row);
			if ($dailySiebels) {
				$suceessful = count($dailySiebels);
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}

	function callactivities_Post() {
		$this->load->model('CallActivities_model');
		$callactivity = $this->post('callactivity');
		//	print_r();
		$callactivities = $this->CallActivities_model->updateCallActivity($callactivity);
		if ($callactivities) {
			$this->response($callactivities, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t save call activity!'), 404);
		}

	}
	function consumerPhone_get($phone = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Consumers_model');
		$this->load->model('Consumer_model');

		/*$complainState = $this->Consumers_model->getAllConsumers($id);
			if ($return != null) {
				$complains = $this->Complains_model->getComplainsCount($ph);
				$this->response($complains, 200);
			} else {
				$start = $this->get('start');
		*/
		//print_r($this->get('phone'));
		//echo $phone;
		/*$phone =*///echo  $this->get('phone');
		//exit();
		$consumers = $this->Consumers_model->getAllConsumerByPhoneNumber($phone);
		//$consumers = $this->Consumer_model->getAllConsumerByPhoneNumber($phone);
		if ($consumers) {
			$this->response($consumers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}
		//}
	}
	function complainStates_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('ComplainState_model');

		$complainState = $this->ComplainState_model->getAllComplainState($id);
		if ($complainState) {
			$this->response($complainState, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any Complain State!'), 404);
		}
	}
	function categoriesSelect_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Categories_model');
		//print_r('aa');
		$categories = $this->Categories_model->getAllCategories($id);
//		print_r($categories);
		//$return = array();
		$returnString = "<option value='' >Select from list</option>";
		foreach ($categories['categories'] as $key => $index) {
			//$return[] = $index;
			$returnString .= "<option value='" . $index['id'] . "_" . $index['tat'] . "' >" . $index['name'] . "</option>";
		}
		print_r($returnString);exit();

		//print_r($categories);
		if ($categories) {
			$this->response($categories, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function uploadeBADatas11_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('Complains_model');
		$this->load->model('ComplainStateLog_model');

		$error = array();
		/*$csv = str_getcsv(file_get_contents($_FILES["file"]["tmp_name"]));
			echo '<pre>';
			print_r($csv);
		*/
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$header = fgetcsv($handle);
			$suceessful = 0;
			//print_r($header);
			//echo '<pre>';
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 2) {
					$file_row_error[] = $row;
				} else {
					//14//Reolsved With in TAT
					//15//TAT over Esclated to client
					//16//TAT over- Resolved after esclation
					//17//Resolved After TAT
					//	print_r($data);

					$cstate = trim($data[1]);
					$complain_id = trim($data[0]);
					$input["cstate_id"] = $cstate;
					$input["uploaded_date"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;
					$id = $complain_id;

					if ($cstate == 14 || $cstate == 16 || $cstate == 17) {
						$input["closed_date"] = date("Y-m-d H:i:s");
						$input["closed_by"] = $up_user;
						$input["status"] = 0;
					}
					if ($cstate == 15) {
						$input["searched_date"] = date("Y-m-d H:i:s");
						$input["searched_by"] = $up_user;
						$input["searched"] = 1;
						$input["status"] = 1;
					}

					$input2 = array();
					$input2["complain_id"] = $complain_id;
					$input2["cstate_id"] = $cstate;
					$input2["added_date"] = date("Y-m-d H:i:s");
					$input2["added_by"] = $up_user;

					$dailySiebels = $this->Complains_model->updateComplain($input, $id);
					if ($dailySiebels) {
						$dailySiebels2 = $this->ComplainStateLog_model->updateSRComplainStateLog($input2);
						$suceessful++;
					}

					/*$cstate  = trim($data[1]);
						$input["cstate_id"] = trim($data[1]);
						$input["uploaded_date"] = date("Y-m-d H:i:s");
						$input["uploaded_by"] = $up_user;
						$id 				= trim($data[0]);

						if($cstate == 14 || $cstate == 16 || $cstate == 17){
							$input["closed_date"] 	= date("Y-m-d H:i:s");
							$input["closed_by"] 	= $up_user;
							$input["status"] 		= 0;
						}
						if($cstate == 15){
							$input["searched_date"] = date("Y-m-d H:i:s");
							$input["searched_by"] 	= $up_user;
							$input["searched"] 		= 1;
							$input["status"] 		= 1;
						}

						$dailySiebels = $this->Complains_model->updateComplain($input, $id);
						if ($dailySiebels) {
							$suceessful++;
						}
					*/
					//}
					//else
					//	$existing_users[]=$data[0];
					//if($row == 10) exit();
				}

				$row++; //Next Row
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	function uploadeRptComplaintCFLSiebel_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('Complains_model');
		$this->load->model('ComplainStateLog_model');

		$error = array();
		/*$csv = str_getcsv(file_get_contents($_FILES["file"]["tmp_name"]));
			echo '<pre>';
			print_r($csv);
		*/
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$header = fgetcsv($handle);
			$suceessful = 0;
			//print_r($header);
			//echo '<pre>';
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 2) {
					$file_row_error[] = $row;
				} else {
					//14//Reolsved With in TAT
					//15//TAT over Esclated to client
					//16//TAT over- Resolved after esclation
					//17//Resolved After TAT
					//	print_r($data);
					$cstate = trim($data[1]);
					$complain_id = trim($data[0]);
					$input["cstate_id"] = $cstate;
					$input["uploaded_date"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;
					$id = $complain_id;

					if ($cstate == 14 || $cstate == 16 || $cstate == 17) {
						$input["closed_date"] = date("Y-m-d H:i:s");
						$input["closed_by"] = $up_user;
						$input["status"] = 0;
					}
					if ($cstate == 15) {
						$input["searched_date"] = date("Y-m-d H:i:s");
						$input["searched_by"] = $up_user;
						$input["searched"] = 1;
						$input["status"] = 1;
					}

					$input2 = array();
					$input2["complain_id"] = $complain_id;
					$input2["cstate_id"] = $cstate;
					$input2["added_date"] = date("Y-m-d H:i:s");
					$input2["added_by"] = $up_user;

					$dailySiebels = $this->Complains_model->updateSRComplain($input, $id);
					if ($dailySiebels) {
						$dailySiebels2 = $this->ComplainStateLog_model->updateSRComplainStateLog($input2);
						$suceessful++;
					}

					//}
					//else
					//	$existing_users[]=$data[0];
					//if($row == 10) exit();
				}

				$row++; //Next Row
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	function uploadeRptComplaintCFLSiebelUpdate_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('Complains_model');
		$this->load->model('ComplainStateLog_model');

		$error = array();
		/*$csv = str_getcsv(file_get_contents($_FILES["file"]["tmp_name"]));
			echo '<pre>';
			print_r($csv);
		*/
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$header = fgetcsv($handle);
			$suceessful = 0;
			//print_r($header);
			//echo '<pre>';
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 3) {
					$file_row_error[] = $row;
				} else {
					//14//Reolsved With in TAT
					//15//TAT over Esclated to client
					//16//TAT over- Resolved after esclation
					//17//Resolved After TAT
					//	print_r($data);

					$cstate = trim($data[1]);
					$complain_id = trim($data[0]);
					//$closed 	= trim($data[2]);

					if ($data[2] != '') {
						$resudate = explode(' ', $data[2]);
						$resu = explode('/', $resudate[0]);
						$resutime = explode(':', $resudate[1]);

						//print_r($opendate); //exit();

						if (count($resudate) > 2) {
							//$newOpen = $data[2];
							$timr = $resutime[0];
							if ($timr == 12 && $resudate[2] == 'AM') {
								$timr = '00';
							} else if ($timr == 12 && $resudate[2] == 'PM') {
								$timr = '12';
							} else if ($resudate[2] == 'PM') {
								$timr += 12;
							}

							$closed = $resu[2] . "-" . STR_PAD($resu[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($resu[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($timr, 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($resutime[1], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($resutime[2], 2, 0, STR_PAD_LEFT);
						} else {
							$closed = $resu[2] . "-" . STR_PAD($resu[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($resu[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($resutime[0], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($resutime[1], 2, 0, STR_PAD_LEFT) . ":00";
						}
					} else {
						$closed = date("Y-m-d H:i:s");
					}

					if ($cstate == 'Closed') {

						$input["cstate_id"] = 6;
						$input["uploaded_date"] = date("Y-m-d H:i:s");
						$input["uploaded_by"] = $up_user;
						$id = $complain_id;
						$input["closed_date"] = $closed;
						$input["closed_by"] = $up_user;
						$input["status"] = 0;

						$input2 = array();
						$input2["complain_id"] = $complain_id;
						$input2["cstate_id"] = 6;
						$input2["added_date"] = date("Y-m-d H:i:s");
						$input2["added_by"] = $up_user;

						$dailySiebels = $this->Complains_model->updateSRComplain($input, $id);
						if ($dailySiebels) {
							$dailySiebels2 = $this->ComplainStateLog_model->updateSRComplainStateLog($input2);
							$suceessful++;
						}

					}

					//}
					//else
					//	$existing_users[] = $data[0];
					//if($row == 10) exit();
				}

				$row++; //Next Row
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	public function uploadeRptComplaintCFLSiebel2_post() {
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('Categories_model');
		$this->load->model('ComplainSiebels_model');

		$error = array();
		/*$csv = str_getcsv(file_get_contents($_FILES["file"]["tmp_name"]));
			echo '<pre>';
			print_r($csv);
		*/
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$header = fgetcsv($handle);
			$suceessful = 0;
			//print_r($header);
			//echo '<pre>';
			//Reading File data
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 24) {
					$file_row_error[] = $row;
				} else {
					$categories = $this->Categories_model->getCategoryID($data[1], $data[5]);
					// print_r($categories);
					$catCode = 0;
					//  exit();
					if (!empty($categories)) {
						$catCode = $categories;
					}
					//    print_r($catCode);
					//   exit();
					// print_r($data[2]);

					$resudate = explode(' ', $data[6]);
					$resu = explode('/', $resudate[0]);
					$resutime = explode(':', $resudate[1]);

					//print_r($opendate); //exit();

					if (count($resudate) > 2) {
						//$newOpen = $data[2];
						$timr = $resutime[0];
						if ($timr == 12 && $resudate[2] == 'AM') {
							$timr = '00';
						} else if ($timr == 12 && $resudate[2] == 'PM') {
							$timr = '12';
						} else if ($resudate[2] == 'PM') {
							$timr += 12;
						}

						$newResu = $resu[2] . "-" . STR_PAD($resu[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($resu[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($timr, 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($resutime[1], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($resutime[2], 2, 0, STR_PAD_LEFT);
					} else {
						$newResu = $resu[2] . "-" . STR_PAD($resu[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($resu[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($resutime[0], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($resutime[1], 2, 0, STR_PAD_LEFT) . ":00";
					}

					$opendate = explode(' ', $data[2]);
					$open = explode('/', $opendate[0]);
					$opentime = explode(':', $opendate[1]);

					//print_r($opendate); //exit();

					if (count($opendate) > 2) {
						//$newOpen = $data[2];
						$tim = $opentime[0];
						if ($tim == 12 && $opendate[2] == 'AM') {
							$tim = '00';
						} else if ($tim == 12 && $opendate[2] == 'PM') {
							$tim = '12';
						} else if ($opendate[2] == 'PM') {
							$tim += 12;
						}

						$newOpen = $open[2] . "-" . STR_PAD($open[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($open[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($tim, 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($opentime[1], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($opentime[2], 2, 0, STR_PAD_LEFT);
					} else {
						$newOpen = $open[2] . "-" . STR_PAD($open[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($open[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($opentime[0], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($opentime[1], 2, 0, STR_PAD_LEFT) . ":00";
					}

					//print_r($data[19]);
					$newClose = '';
					if ($data[19] != '') {
						$closedate = explode(' ', $data[19]);
						$close = explode('/', $closedate[0]);
						$closetime = explode(':', $closedate[1]);
						if (count($closedate) > 2) {
							//$newOpen = $data[2];
							$tim2 = $closetime[0];
							if ($tim2 == 12 && $closedate[2] == 'AM') {
								$tim2 = '00';
							} else if ($tim2 == 12 && $closedate[2] == 'PM') {
								$tim2 = '12';
							} else if ($closedate[2] == 'PM') {
								$tim2 += 12;
							}

							$newClose = $close[2] . "-" . STR_PAD($close[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($close[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($tim2, 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($closetime[1], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($closetime[2], 2, 0, STR_PAD_LEFT);

						} else {

							$newClose = $close[2] . "-" . STR_PAD($close[1], 2, 0, STR_PAD_LEFT) . "-" . STR_PAD($close[0], 2, 0, STR_PAD_LEFT) . " " . STR_PAD($closetime[0], 2, 0, STR_PAD_LEFT) . ":" . STR_PAD($closetime[1], 2, 0, STR_PAD_LEFT) . ":00";
						}
					}
					//	print_r($closedate);
					//	print_r($newClose);
					//exit();
					$input = array();
					$input["sr"] = $data[0];
					$input["workcode"] = $catCode; //$data[1];
					$input["added_date"] = $newOpen; // "STR_TO_DATE('".$data[2]."', '%e/%c/%Y %k:%i')";
					$input["msisdn"] = trim($data[3]);
					$input["asset_status"] = trim($data[4]);
					$input["tat"] = trim($data[5]);
					$input["resolution_date"] = $data[6];
					$input["remaining_tat"] = trim($data[7]);
					$input["refund_amount"] = trim($data[8]);
					$input["status"] = trim($data[9]);
					$input["substatus"] = trim($data[10]);
					$input["type"] = trim($data[11]);
					$input["description"] = trim($data[12]);
					$input["owner"] = trim($data[13]);
					$input["created_by"] = trim($data[14]);
					//	$input["abacus"] 		= trim($data[15]);
					$input["opt_msisdn"] = trim($data[15]);
					$input["sr_ticket_id"] = trim($data[16]);
					$input["date_time"] = $data[17];
					$input["severity"] = trim($data[18]);
					$input["closed_date"] = $newClose; //"STR_TO_DATE('".$data[20]."', '%e/%c/%Y %k:%i')";
					$input["revenue_profile"] = trim($data[20]);
					$input["subscription_type"] = trim($data[21]);
					$input["detail_sub_type"] = trim($data[22]);
					$input["comment"] = trim($data[23]);
					$input["upload_file_date"] = date("Y-m-d H:i:s");
					$input["upload_file_user"] = $up_user;
					//print_r($input);exit();

					//$this->load->model('ComplainSiebels_model');
					$dailySiebels = $this->ComplainSiebels_model->addComplainSiebel($input);
					if ($dailySiebels) {
						$suceessful++;
					}

					//}
					//else
					//	$existing_users[]=$data[0];
					//if($row == 10) exit();
				}

				$row++; //Next Row
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code

	}
	public function wings_get($id = null) {

		$this->load->model('Wings_model');
		//print_r('aa');
		$wings = $this->Wings_model->getAllWings($id);
		//print_r($categories);
		if ($wings) {
			$this->response($wings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any wing!'), 404);
		}

	}
	function dailySiebelWingMsisdnImport_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('DailySiebels_model');

		$dailySiebels = $this->DailySiebels_model->getDailySiebelWingMsisdnImport($id, $this->get('style'), $this->get('wing_id'), $this->get('from_date'), $this->get('to_date'));

		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		//header("Content-Type: text/x-csv");
		//header("Content-Disposition: attachment;filename='" . $this->get('type') . ".csv'");
		header("Content-type: application/octet-stream");
		header("Content-Disposition: attachment; filename=" . $this->get('type') . " Reoprt.xls");
		echo $this->to_excel($dailySiebels, $this->get('type'));
		exit();

	}
	function employee_get() {
		if (!$this->get('id')) {
			$this->response(NULL, 400);
		}

		$this->load->model('Employees_model');
		$employees = $this->Employees_model->get_employee_by_id($this->get('id'));

		if ($employees) {
			$this->response($employees, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'User could not be found'), 404);
		}
	}

	function employees_post() {
		$this->load->model('Employees_model');
		//$this->some_model->updateUser( $this->get('id') );
		$user = $this->post('employee');
		$message = $this->Employees_model->update_employee($user);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}

	function employee_delete() {
		//$this->some_model->deletesomething( $this->get('id') );
		$message = array('id' => $this->get('id'), 'message' => 'DELETED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function reportings_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		$this->load->model('Employees_model');
		$reportings = $this->Users_model->get_reportings();
		if ($reportings) {
			$this->response($reportings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function employees_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();
		//print_r($this->get('what')); exit();
		//$what = empty($this->get('what'))?'none':$this->get('what');

		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];
		$this->load->model('Employees_model');
		/*
			if($what == 'reporting'){
				$us = $this->Users_model->get_reportings();
				$users['users'] = $us[''];
			}
		*/
		if (empty($this->get('role_id'))) {
			if ($id == null) {
				$users = $this->Employees_model->get_employees();
			} else {
				$users = $this->Employees_model->get_employee_by_id($id);
			}
		} else {
			if (empty($this->get('condition'))) {
				$users = $this->Employees_model->get_employee_by_role_id($this->get('role_id'), $role_id);
			} else {
				$users = $this->Employees_model->get_employee_greater_or_equal_role_id($this->get('role_id'), $role_id);
			}

		}

		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function user_get() {
		if (!$this->get('id')) {
			$this->response(NULL, 400);
		}

		$this->load->model('Users_model');
		$users = $this->Users_model->get_user_by_id($this->get('id'));

		if ($user) {
			$this->response($user, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'User could not be found'), 404);
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

	function user_delete() {
		//$this->some_model->deletesomething( $this->get('id') );
		$message = array('id' => $this->get('id'), 'message' => 'DELETED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	/*function reportings_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);

		$reportings = $this->Users_model->get_reportings();
		if ($reportings) {
			$this->response($reportings, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}*/
	function setAgent_post() {
		$this->load->model('Users_model');
		//$this->some_model->updateUser( $this->get('id') );
		$user = $this->post('id');
		$message = $this->Users_model->change_reporting($user);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function agents_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();
		//print_r($this->get('what')); exit();
		//$what = empty($this->get('what'))?'none':$this->get('what');

		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];
		
		$this->load->model('Users_model');
		
		//if($what == 'reporting'){
			$users = $this->Users_model->get_my_reportings();
		//}		
		/*if (empty($this->get('role_id'))) {
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
		}*/

		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn`t find any users!'), 404);
		}
	}
	function getAgent_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();
		//print_r($this->get('what')); exit();
		//$what = empty($this->get('what'))?'none':$this->get('what');

		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];
		$this->load->model('Users_model');
		/*
			if($what == 'reporting'){
				$us = $this->Users_model->get_reportings();
				$users['users'] = $us[''];
			}
		*/
		

		$users = $this->Users_model->get_user_by_login2($this->get('login'));
			

		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function users_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		//print_r();
		//print_r($this->get('what')); exit();
		//$what = empty($this->get('what'))?'none':$this->get('what');

		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];
		$this->load->model('Users_model');
		/*
			if($what == 'reporting'){
				$us = $this->Users_model->get_reportings();
				$users['users'] = $us[''];
			}
		*/
		if ($this->get('from') == 'main') {
			$users = $this->Users_model->get_users($this->get('name'),$this->get('login'),$this->get('role_id'),$this->get('reporting_id'));
		}
		else if (empty($this->get('role_id'))) {
			if ($id == null) {
				$users = $this->Users_model->get_users($this->get('name'),$this->get('login'),$this->get('role_id'),$this->get('reporting_id'));
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
	function verifyLogin_get($id = null) {
		
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		
		$this->load->model('Users_model');
		$users = $this->Users_model->get_user_by_login($this->get('login_id'));
		
		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function resetPassword_get($oldPassword = null, $newPassword = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		$this->load->model('Users_model');

		//$oldPassword = $this->get('oldP');
		//$newPassword = $this->get('newP');

		$users = $this->Users_model->resetPassword($newPassword, $oldPassword);
		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t Reset Password!'), 404);
		}
	}
	function chatUsers_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		$this->load->model('Users_model');

		$users = $this->Users_model->get_chatUsers();

		if ($users) {
			$this->response($users, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function chats_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		$id = $this->get('uid');
		$this->load->model('Chats_model');

		$chats = $this->Chats_model->get_messageUsers($id);

		if ($chats) {
			$this->response($chats, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	function chatNotes_get($id = null) {
		//$users = $this->some_model->getSomething( $this->get('limit') );
		//print_r($id);
		$id = $this->get('uid');
		$this->load->model('Chats_model');

		$chats = $this->Chats_model->get_myMessage();

		if ($chats) {
			$this->response($chats, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any users!'), 404);
		}
	}
	public function send_post() {
		var_dump($this->request->body);
	}
	public function loginSession_post($return = null, $ph = null) {
		$sess_data = $this->session->userdata;
	//	print_r($sess_data['data_logged_in']);
			$data['active'] = $sess_data['data_logged_in']['active'];
			$data['area_id'] = $sess_data['data_logged_in']['area_id'];
			$data['attendence_shift_id'] = $sess_data['data_logged_in']['attendence_shift_id'];
			$data['cell'] = $sess_data['data_logged_in']['cell'];
		//	$data['created'] = $sess_data['data_logged_in']['created'];
		//	$data['created_by'] = $sess_data['data_logged_in']['created_by'];
		//	$data['deleted'] = $sess_data['data_logged_in']['deleted'];
		//	$data['grade'] = $sess_data['data_logged_in']['grade'];
			$data['id'] = $sess_data['data_logged_in']['id'];
		//	$data['last_login_ip'] = $sess_data['data_logged_in']['last_login_ip'];
		//	$data['last_login_time'] = $sess_data['data_logged_in']['last_login_time'];
			$data['login'] = $sess_data['data_logged_in']['login'];
			$data['name'] = $sess_data['data_logged_in']['name'];
		//	$data['online_status'] = $sess_data['data_logged_in']['online_status'];
		//	$data['password'] = $sess_data['data_logged_in']['password'];
			$data['region_id'] = $sess_data['data_logged_in']['region_id'];
		//	$data['reporting_id'] = $sess_data['data_logged_in']['reporting_id'];
			$data['role_id'] = $sess_data['data_logged_in']['role_id'];
			$data['territory_id'] = $sess_data['data_logged_in']['territory_id'];
		//	$data['updated'] = $sess_data['data_logged_in']['updated'];
		//	$data['updated_by'] = $sess_data['data_logged_in']['updated_by'];
			$data['user_name'] = $sess_data['data_logged_in']['user_name'];
			$data['wing_id'] = $sess_data['data_logged_in']['wing_id'];
			



		//$data = $sess_data['data_logged_in'];

		if ($data) {
			$this->response($this->session->userdata['data_logged_in'], 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	public function userRight($user_id) {
		$this->load->model('AccessCampiagns_model');
		//$user_id = $this->get('user_id');
		return $this->AccessCampiagns_model->getMyUserAccessCampiagn($user_id);
		/*if ($userAccesses2) {
			$this->response($userAccesses2, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}*/

	}
	public function usersRights_post($return = null) {

		$this->load->model('AccessCampiagns_model');
		//$this->load->model('Modules_model');

		$user_id = $this->post('user_id');
		$module_id = $this->post('module_id');
		//	print_r($user_id);
		//	print_r($module_id);
		$suserAccesses = $this->AccessCampiagns_model->setUserAccessCampiagn($user_id, $module_id);
		if ($suserAccesses) {
			$this->response($suserAccesses, 200); // 200 being the HTTP response code
			//$accesses = $this->userAccess($user_id);//if ($accesses) { ////// } 

		}else {
			$this->response(array('error' => 'Couldn\'t save user access!'), 404);
		}

	}
	public function rights_get($id=null) {

		$this->load->model('AccessCampiagns_model');
		
		if($this->get('user_id')){
			$accesses = $this->userRight($this->get('user_id'));
		}
		else{
			$accesses = $this->AccessCampiagns_model->getMyAccessCampiagn();
		}
		
		if (!empty($accesses)) {
			$this->response( array('rights' => $accesses), 200);
		} else {
			$this->response(array('error' => 'Please ask your administrator for rights.'), 404);
		}

	}
	public function accesses_get($id=null) {

		$this->load->model('Accesses_model');
		
		if($this->get('user_id')){
			$accesses = $this->userAccess($this->get('user_id'));
		}
		else{
			$accesses = $this->Accesses_model->getMyAccesses();
		}
		
		if (!empty($accesses)) {
			$this->response( array('accesses' => $accesses), 200);
		} else {
			$this->response(array('error' => 'Please ask your administrator for rights.'), 404);
		}

	}
	public function loginAccess_get($return = null) {

		$this->load->model('Accesses_model');
		$this->load->model('Modules_model');

		$accesses = $this->Accesses_model->getMyAccesses();
		if (!empty($accesses)) {
			/*$modules = $this->Modules_model->getMyModules($accesses);

			if ($modules) {*/
			$this->response($accesses, 200); // 200 being the HTTP response code
			/*} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}*/
		} else {
			$this->response(array('error' => 'Please ask your administrator for rights.'), 404);
		}

	}
	public function userAccess($user_id) {
		$this->load->model('Accesses_model');
		//$user_id = $this->get('user_id');
		return $this->Accesses_model->getMyUserAccesses($user_id);
		/*if ($userAccesses2) {
			$this->response($userAccesses2, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}*/

	}
	public function usersAccess_post($return = null) {

		$this->load->model('Accesses_model');
		$this->load->model('Modules_model');

		$user_id = $this->post('user_id');
		$module_id = $this->post('module_id');
		//	print_r($user_id);
		//	print_r($module_id);
		$suserAccesses = $this->Accesses_model->setUserAccesses($user_id, $module_id);
		if ($suserAccesses) {
			$this->response($suserAccesses, 200); // 200 being the HTTP response code
			//$accesses = $this->userAccess($user_id);//if ($accesses) { ////// } 

		}else {
			$this->response(array('error' => 'Couldn\'t save user access!'), 404);
		}

	}
	public function usersAccessaaaa_get($return = null) {

		$this->load->model('Accesses_model');
		$this->load->model('Modules_model');

		$user_id = $this->get('user_id');
		$module_id = $this->get('module_id');
		$accesses = $this->userAccess($user_id);
		//	print_r($user_id);
		//	print_r($module_id);
		$suserAccesses = $this->Accesses_model->setUserAccesses($user_id, $module_id);
		if ($suserAccesses) {
			
			if ($accesses) { ////
				$this->response($accesses, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}

		}

	}
	public function send_put() {
		var_dump($this->put('foo'));
	}
	function dispositions_get($id = null) {
	//	$this->load->model('Domains_model');

		$dispositions = $this->Dispositions_model->getAllDispositions($this->get('parent_id'));
		if ($dispositions) {
			$this->response($dispositions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any dispositions'), 404);
		}
	}
	function departments_get($id = null) {
	//	$this->load->model('Domains_model');

		$departments = $this->Departments_model->getAllDepartments($this->get('parent_id'), $this->get('fetch'));
		if ($departments) {
			$this->response($departments, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any department'), 404);
		}
	}
	function domains_get($id = null) {
		$this->load->model('Domains_model');

		$roles = $this->Domains_model->getAllDomains($this->get('parent_id'), $this->get('include'));
		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function roles_get($id = null) {
		$this->load->model('Roles_model');
		$roles = $this->Roles_model->getAllRoles($id);

		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function complains_get($return = null, $ph = null) {
		$this->load->model('Complains_model');
		if ($return != null) {
			$complains = $this->Complains_model->getComplainsCount($ph);
			$this->response($complains, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');
			$phone = $this->get('phone');

			$complains = $this->Complains_model->getAllComplains($start, $end, $phone);
			if ($complains) {
				$this->response($complains, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function openedComplains_get($return = null, $ph = null) {
		$this->load->model('Complains_model');
		if ($return != null) {
			$ocomplains = $this->Complains_model->getOpenComplainsCount();
			$this->response($ocomplains, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');

			$openedComplains = $this->Complains_model->getAllOpenedComplains($start, $end);
			if ($openedComplains) {
				$this->response($openedComplains, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}

	}
	function closedComplains_get($return = null, $ph = null) {
		$this->load->model('Complains_model');
		if ($return != null) {
			$ccomplains = $this->Complains_model->getCloseComplainsCount();
			$this->response($ccomplains, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');

			$closedComplains = $this->Complains_model->getAllClosedComplains($start, $end);
			if ($closedComplains) {
				$this->response($closedComplains, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}

	}
	function viewedComplains_get($return = null, $ph = null) {
		$this->load->model('Complains_model');
		if ($return != null) {
			$vcomplains = $this->Complains_model->getViewComplainsCount();
			$this->response($vcomplains, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');

			$viewedComplains = $this->Complains_model->getAllViewedComplains($start, $end);
			if ($viewedComplains) {
				$this->response($viewedComplains, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}

	}
	function complainLogs_get($return = null, $ph = null) {
		$this->load->model('ComplainLog_model');
		$cid = $this->get('cid');

		$complains = $this->ComplainLog_model->getAllComplains($cid);
		if ($complains) {
			$this->response($complains, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function complainLogs_Post() {
		$this->load->model('ComplainLog_model');
		$complain = $this->post('complainLog');
		//	print_r();
		$complains = $this->ComplainLog_model->update_complainlog($complain);
		if ($complains) {
			$this->response($complains, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function chats_Post() {
		$this->load->model('Chats_model');
		$chat = $this->post('chat');

		//print_r($chat); exit();
		//	print_r();
		$chats = $this->Chats_model->update_chat($chat);
		if ($chats) {
			$this->response($chats, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}

	}
	function complains_post() {
		$this->load->model('Complains_model');
		//$this->some_model->updateUser( $this->get('id') );
		$complain = $this->post('complain');

		//print_r($complain); exit();
		$message = $this->Complains_model->update_complain($complain);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function categories_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Categories_model');
		$categories = $this->Categories_model->getAllCategories($id);
		if ($categories) {
			$this->response($categories, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function categories_post($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Categories_model');
		$category = $this->post('category');

		//print_r($category);
		//exit();

		if ($category['id'] == 0) {
			unset($category['id']);
			$categories = $this->Categories_model->addCategories($category);
		} else {
			$id = $category['id'];
			unset($category['id']);
			$categories = $this->Categories_model->updateCategories($category, $id);
		}
		//exit();
		$this->response($categories, 200); // 200 being the HTTP response code
	}
	function topics_get($id = null) {
		$this->load->model('Topics_model');
		$roles = $this->Topics_model->getAllTopics($id);
		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function obCampaigns_get($id = null) {
		$this->load->model('ObCampaigns_model');
		$roles = $this->ObCampaigns_model->getAllObCampaigns($id);
		if ($roles) {
			$this->response($roles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function topics_post() {
		$this->load->model('Topics_model');
		//$this->some_model->updateUser( $this->get('id') );
		$topic = $this->post('topic');
		$message = $this->Topics_model->update_topic($topic);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function headlines_get($id = null) {
		$this->load->model('Headlines_model');
		$headlines = $this->Headlines_model->getAllHeadlines($id);
		if ($headlines) {
			$this->response($headlines, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function headlines_post() {
		$this->load->model('Headlines_model');
		//$this->some_model->updateUser( $this->get('id') );
		$headline = $this->post('headline');
		$message = $this->Headlines_model->update_headline($headline);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function banks_get($return = null, $topic = null, $headline = null, $text = null) {
		//print_r($return);
		//print_r($topic);
		//print_r($headline);
		$this->load->model('Banks_model');
		if ($return != null) {
			if ($return != 'searchCount') {
				$ph = null;
				$banks = $this->Banks_model->getBanksCount($ph);
				$this->response($banks, 200);
			} else {
				$banks = $this->Banks_model->getBanksSearchedCount($topic, $headline, $text);
				$this->response($banks, 200);
			}

		} else {
			$return = $this->get('rtrn');
			if ($return == 'SearchData') {
				$start = $this->get('start');
				$end = $this->get('end');
				$topic = $this->get('topic');
				$headline = $this->get('headline');
				$text = $this->get('text');
				$banks = $this->Banks_model->getAllSearchedBanks($start, $end, $topic, $headline, $text);
			} else {

				$start = $this->get('start');
				$end = $this->get('end');
				$banks = $this->Banks_model->getAllBanks($start, $end);
			}

			if ($banks) {
				$this->response($banks, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function banks_post() {
		$this->load->model('Banks_model');
		//$this->some_model->updateUser( $this->get('id') );
		//print_r($this->()); exit();
		$bank = $this->post('bank');
		//	replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/>/g, "&gt;").replace(, "&lt;")
		//$a = preg_replace ("/&quot;/",'"', preg_replace ("/&#39;/","'",preg_replace ("/&gt;/",">", preg_replace ("/&lt;/","<",$bank['description']))));
		//print_r($bank['description']); exit();
		//print_r(substr($bank['description'], 0, 30));
		//exit();
		$message = $this->Banks_model->update_bank($bank);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');
		$this->response($message, 200); // 200 being the HTTP response code
	}
	function obCampaignDetails_get($return = null, $topic = null, $headline = null, $text = null) {
		//print_r($return);
		//print_r($topic);
		//print_r($headline);
		$this->load->model('ObCampaignDetails_model');
		if ($return != null) {
			if ($return != 'searchCount') {
				$ph = null;
				$banks = $this->ObCampaignDetails_model->getObCampaignDetailsCount($ph);
				$this->response($banks, 200);
			} else {
				$banks = $this->ObCampaignDetails_model->getObCampaignDetailsSearchedCount($topic, $headline, $text);
				$this->response($banks, 200);
			}

		} else {
			$return = $this->get('rtrn');
			if ($return == 'SearchData') {
				$start = $this->get('start');
				$end = $this->get('end');
				$ob_campaign_id = $this->get('ob_campaign_id');
				$headline = $this->get('headline');
				$text = $this->get('text');
				$banks = $this->ObCampaignDetails_model->getAllSearchedObCampaignDetails($start, $end, $ob_campaign_id, $headline, $text);
			} else {

				$start = $this->get('start');
				$end = $this->get('end');
				$banks = $this->ObCampaignDetails_model->getAllObCampaignDetails($start, $end);
			}

			if ($banks) {
				$this->response($banks, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function obCampaignDetails_post() {

		$this->load->model('ObCampaignDetails_model');
		//$this->some_model->updateUser( $this->get('id') );
		//print_r($this->()); exit();
		$obCampaignDetail = $this->post('obCampaignDetail');
		//	replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/>/g, "&gt;").replace(, "&lt;")
		//$a = preg_replace ("/&quot;/",'"', preg_replace ("/&#39;/","'",preg_replace ("/&gt;/",">", preg_replace ("/&lt;/","<",$bank['description']))));
		//print_r($bank['description']); exit();
		//print_r(substr($bank['description'], 0, 30));
		//exit();
		$message = $this->ObCampaignDetails_model->update_obCampaignDetail($obCampaignDetail);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');
		$this->response($message, 200); // 200 being the HTTP response code
	}
	function bankAutoCompletes_get($return = null, $topic = null, $headline = null, $text = null) {
		//print_r($return);
		//print_r($topic);
		//print_r($headline);
		$this->load->model('Banks_model');
		if ($return != null) {
			$banks = $this->Banks_model->getBanksSearchedCount($topic, $headline, $text);
			$this->response($banks, 200);
		} else {
			$return = $this->get('rtrn');
			$start = $this->get('start');
			$end = $this->get('end');
			$topic = $this->get('topic');
			$headline = $this->get('headline');
			$text = $this->get('text');
			$banks = $this->Banks_model->getAllSearchedBanks($start, $end, $topic, $headline, $text);

			if ($banks) {
				$this->response($banks, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
			}
		}
	}
	function autoCompletes_get($return = null, $topic = null, $headline = null, $text = null) {
		//print_r($return);
		//print_r($topic);
		//print_r($headline);
		$this->load->model('Banks_model');
		//$return   = $this->get('rtrn');
		//$start 	  = $this->get('start');
		//$end   	  = $this->get('end');
		//echo 'aaa'.$topic 	  = $this->get('topic');
		//$headline = $this->get('headline');
		// echo 'txt'.$text     = $this->get('text');
		// echo $text.'= txt';
		$banks = $this->Banks_model->getAutoSearchedBanks($topic, $headline, $text);

		if ($banks) {
			$this->response($banks, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any complain!'), 404);
		}
		//}
	}
	function treeView_get($return = null) {
		$this->load->model('Titles_model');
		$titles = $this->Titles_model->getTitles($return);
		print_r($titles);
		exit();
	}

	function treeNode_get($action = null) {
		$this->load->model('Titles_model');
		$id = $this->get('id');
		$name = $this->get('name');

		$titles = $this->Titles_model->setTitle($action, $id, $name);
		print_r($titles);
		exit();
	}
	function treeNodeObCampaign_get($action = null) {
		$this->load->model('ObCampaigns_model');
		$id = $this->get('id');
		$name = $this->get('name');

		$titles = $this->ObCampaigns_model->setObCampaign($action, $id, $name);
		print_r($titles);
		exit();
	}
	function selectView_get($return = null) {
		$this->load->model('Titles_model');
		$titles = $this->Titles_model->getSelectTitles($return);
		print_r($titles);
		exit();
	}
	function selectObCampaignView_get($return = null) {
		$this->load->model('ObCampaigns_model');
		$titles = $this->ObCampaigns_model->getSelectObCampaigns($return); //Abc
		print_r($titles);
		exit();
	}
	function treeObCampaignView_get($return = null) {
		$this->load->model('ObCampaigns_model');
		$titles = $this->ObCampaigns_model->getObCampaign($return);
		print_r($titles);
		exit();
	}
	function showObCampaignDetailView_get($return = null) {

		$this->load->model('ObCampaignDetails_model');

		$ob_campaign_id = $this->get('ob_campaign_id');
		$id = $this->get('id');
		$banks = $this->ObCampaignDetails_model->getObCampaignDetailDetail($ob_campaign_id, $id);
		//	print_r($banks);
		if ($banks) {
			$this->response($banks, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'failed'), 404);
		}

	}
	function showObCampaignDetailViewByID_get($return = null) {

		$this->load->model('ObCampaignDetails_model');

		$ob_campaign_id = $this->get('ob_campaign_id');
		$id = $this->get('id');
		$banks = $this->ObCampaignDetails_model->getObCampaignDetailDetailByID($id);
		//	print_r($banks);
		if ($banks) {
			$this->response($banks, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'failed'), 404);
		}

	}
	function titles_get($id = null) {
		$this->load->model('Titles_model');
		$titles = $this->Titles_model->getAllTitles($id);
		if ($titles) {
			$this->response($titles, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any role!'), 404);
		}
	}
	function showDetailView_get($return = null) {

		$this->load->model('Banks_model');

		$topic = $this->get('topic_id');
		$id = $this->get('id');
		$banks = $this->Banks_model->getBankDetail($topic, $id);
		//	print_r($banks);
		if ($banks) {
			$this->response($banks, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'failed'), 404);
		}

	}
	function showDetailViewByID_get($return = null) {

		$this->load->model('Banks_model');

		$topic = $this->get('topic_id');
		$id = $this->get('id');
		$banks = $this->Banks_model->getBankDetailByID($topic);
		//	print_r($banks);
		if ($banks) {
			$this->response($banks, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'failed'), 404);
		}

	}
	function getSearchedData_get($return = null) {

		$this->load->model('Banks_model');

		$topic = urldecode($this->get('search'));
		//print_r($topic); exit();
		//$id = $this->get('id');
		$banks = $this->Banks_model->getSearchedBankData($topic);
		//print_r($banks);
		$this->response($banks, 200);

		/*if ($banks) { //echo 'b';
			$this->response($banks, 200); // 200 being the HTTP response code
			} else { //echo 'a';
			$this->response(array('error' => 'No record found'), 404);
		*/

	}
	function loadAllKeywords_get($return = null) {

		$this->load->model('Banks_model');

		//$topic = $this->get('search');
		//print_r($topic); exit();
		//$id = $this->get('id');
		$banks = $this->Banks_model->getSearchedBankKeywords(); //$topic
		//	print_r($banks);
		if ($banks) {
			$this->response($banks, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'No record found'), 404);
		}

	}
	function priceplans_post($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Priceplans_model');
		$priceplan = $this->post('priceplan');
		//print_r($bundletype);
		//exit();
		if ($priceplan['id'] == 0) {
			unset($priceplan['id']);
			$priceplans = $this->Priceplans_model->addPricePlans($priceplan);
		} else {
			$id = $priceplan['id'];
			unset($priceplan['id']);
			$priceplans = $this->Priceplans_model->updatePricePlans($priceplan, $id);
		}
		//exit();
		$this->response($priceplans, 200); // 200 being the HTTP response code

	}
	/*function priceplans_post() {
		$this->load->model('Priceplans_model');
		//$this->some_model->updateUser( $this->get('id') );
		$priceplans = $this->post('priceplan');

		//print_r($complain); exit();
		$message = $this->Priceplans_model->update_priceplans($priceplans);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}*/
	function priceplans_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Priceplans_model');
		$priceplans = $this->Priceplans_model->getAllPricePlans($id);
		if ($priceplans) {
			$this->response($priceplans, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any priceplans!'), 404);
		}
	}
	function bundletypes_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Bundletypes_model');
		if ($id == null && $this->get('id') != '') {
			$id = array();
			$id = array_values(array_unique($this->get('id')));
		}
		$bundletypes = $this->Bundletypes_model->getAllBundleTypes($id);
		if ($bundletypes) {
			$this->response($bundletypes, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any bundletypes!'), 404);
		}
	}
	function bundletypes_post($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Bundletypes_model');
		$bundletype = $this->post('bundletype');
		//print_r($bundletype);
		//exit();
		if ($bundletype['id'] == 0) {
			unset($bundletype['id']);
			$bundletypes = $this->Bundletypes_model->addBundleTypes($bundletype);
		} else {
			$id = $bundletype['id'];
			unset($bundletype['id']);
			$bundletypes = $this->Bundletypes_model->updateBundleTypes($bundletype, $id);
		}
		//exit();
		$this->response($bundletypes, 200); // 200 being the HTTP response code

	}
	function pricebundleplans_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Pricebundleplans_model');

		if ($id == null) {
			$id = $this->get('id');
		}

		$pricebundleplans = $this->Pricebundleplans_model->getAllPricebundleplans($id);
		if ($pricebundleplans) {
			$this->response($pricebundleplans, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any pricebundleplans!'), 404);
		}
	}
	function pricebundleplans_post($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Pricebundleplans_model');

		$pricebundleplan = $this->post('pricebundleplan');

		$pricebundleplan = $this->Pricebundleplans_model->setPricebundleplans($pricebundleplan);
		$this->response($pricebundleplan, 200); // 200 being the HTTP response code
	}
	function bundleplans_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$type = null;
		$this->load->model('Bundleplans_model');
		if ($id == null) {
			$id = array();
			$id = $this->get('id');
			$type = $this->get('type_id');
		}

		$bundleplans = $this->Bundleplans_model->getAllBundleplans($id, $type);
		if ($bundleplans) {
			$this->response($bundleplans, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any bundleplans!'), 404);
		}
	}
	function bundleplans_post($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Bundleplans_model');
		$bundleplan = $this->post('bundleplan');
		//print_r($bundletype);
		//exit();
		if ($bundleplan['id'] == 0) {
			unset($bundleplan['id']);
			$bundleplans = $this->Bundleplans_model->addBundlePlans($bundleplan);
		} else {
			$id = $bundleplan['id'];
			unset($bundleplan['id']);
			$bundleplans = $this->Bundleplans_model->updateBundlePlans($bundleplan, $id);
		}
		//exit();
		$this->response($bundleplans, 200); // 200 being the HTTP response code

	}

	function printExcelSheet_post() {
		$this->load->model('Complains_model');
		//$this->some_model->updateUser( $this->get('id') );
		$id = $this->post('id');
		$name = $this->post('name');
		//print_r($id);
		//print_r($name);
		//exit();
		$rpt = $this->Complains_model->getComplainsReport($id);
		return $this->to_excel($rpt, $name);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		//$this->response($message, 200); // 200 being the HTTP response code
	}
	function rptComplainUsers_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Users_model');

		$rptComplainUsers = $this->Users_model->getRptComplainUsers($id);

		if ($rptComplainUsers) {
			$this->response($rptComplainUsers, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any User!'), 404);
		}
	}
	function complainWorkCode_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Complains_model');

		$dailySiebels = $this->Complains_model->getComplainsWorkCode($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('from_date2'), $this->get('to_date2'), $this->get('entered'), $this->get('closed'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function complainWorkCodeMsisdnImport_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Complains_model');

		$dailySiebels = $this->Complains_model->getComplainsWorkCodeMsisdnImport($id, $this->get('from_date'), $this->get('to_date'), $this->get('from_date2'), $this->get('to_date2'), $this->get('entered'), $this->get('closed'), $this->get('type'));
		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		//header("Content-Type: text/x-csv");
		//header("Content-Disposition: attachment;filename='" . $this->get('type') . ".csv'");
		header("Content-type: application/octet-stream");
		header("Content-Disposition: attachment; filename=Complains Reoprt.xls");
		echo $this->to_excel($dailySiebels, 'Complains Report');
		exit();
	}
	function to_excel($array, $filename) {
		// header('Content-type: application/vnd.ms-excel');
		// header('Content-Disposition: attachment; filename='.$filename.'.xls');

		// Filter all keys, they'll be table headers
		$table = '';
		$h = array();
		foreach ($array as $row) {
			foreach ($row as $key => $val) {
				if (!in_array($key, $h)) {
					$h[] = $key;
				}
			}
		}
		//echo the entire table headers
		$table .= '<table><tr>';
		foreach ($h as $key) {
			$key = ucwords($key);
			$table .= '<th>' . $key . '</th>';
		}
		$table .= '</tr>';

		foreach ($array as $row) {
//->result_array()
			$table .= '<tr>';
			foreach ($row as $val) {
				$table .= $this->writeRow($val);
			}

		}
		$table .= '</tr>';
		$table .= '</table>';
		//print_r($table);
		return $table;
		// exit();
	}
	function writeRow($val) {
		return '<td>' . utf8_decode($val) . '</td>';
	}
	function uploadeBundleUsers_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('UpsellingUploads_model');
		//$this->load->model('ComplainStateLog_model');
		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0; //16:57:49-17:00:03//17:06:06-17-08-24
			//print_r($header);
			//echo '<pre>';
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
				//	print_r($data);
				//	exit();
				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 6) {
					$file_row_error[] = $row;
				} else {
					$msisdn = trim($data[0]);
					$current_pp = trim($data[1]);
					$total_bill = trim($data[2]);
					$current_bundle = trim($data[3]);
					$bundle_pitch = trim($data[4]);
					$total_consumption = trim($data[5]);

					$input["msisdn"] = $msisdn;
					$input["current_pp"] = $current_pp;
					$input["total_bill_amt"] = $total_bill;
					$input["current_bundle"] = $current_bundle;
					$input["bundle_pitch"] = $bundle_pitch;
					$input["total_consumption"] = $total_consumption;
					$input["uploaded_date"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;

					$file_row[] = $input;

					//$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
					//if ($dailySiebels) {
					//	$suceessful++;
					//}
				}

				$row++; //Next Row
			}
			$dailySiebels = $this->UpsellingUploads_model->setAllUpsellings($file_row);
			if ($dailySiebels) {
				$suceessful = count($dailySiebels);
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}
	function uploadeNonBundleUsers_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('UpsellingUploads_model');
		//$this->load->model('ComplainStateLog_model');

		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0;
			//print_r($header);
			//echo '<pre>';17:12:34 //--------------------------------------------------------------------
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {

				$num = count($data);
				//print_r($num);
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 5) {
					$file_row_error[] = $row;
				} else {

					$msisdn = trim($data[0]);
					$current_pp = trim($data[1]);
					$total_bill = trim($data[2]);
					$current_bundle = 'NONE';
					$bundle_pitch = trim($data[3]);
					$total_consumption = trim($data[4]);

					$input["msisdn"] = $msisdn;
					$input["current_pp"] = $current_pp;
					$input["total_bill_amt"] = $total_bill;
					$input["current_bundle"] = $current_bundle;
					$input["bundle_pitch"] = $bundle_pitch;
					$input["total_consumption"] = $total_consumption;
					$input["uploaded_date"] = date("Y-m-d H:i:s");
					$input["uploaded_by"] = $up_user;

					$file_row[] = $input;

				}

				$row++; //Next Row
			}
			$dailySiebels = $this->UpsellingUploads_model->setAllUpsellings($file_row);
			if ($dailySiebels) {
				$suceessful = count($dailySiebels);
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}
	function uploadeBundleUsersWays_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('UpsellingUploads_model');
		//$this->load->model('ComplainStateLog_model');

		//print_r(str_replace('\n',',',file_get_contents($_FILES["file"]["tmp_name"])));
		//exit();
		$error = array();
		$csv = file_get_contents($_FILES["file"]["tmp_name"]);
		$dataCSV = array_map("str_getcsv", preg_split('/\r*\n+|\r+/', $csv));

		foreach ($dataCSV as $key => $csv) {
			$count = count($csv);
			if ($key != 0 && $count == 6) {

				$msisdn = trim($csv[0]);
				$current_pp = trim($csv[1]);
				$total_bill = trim($csv[2]);
				$current_bundle = trim($csv[3]);
				$bundle_pitch = trim($csv[4]);
				$total_consumption = trim($csv[5]);

				$input["msisdn"] = $msisdn;
				$input["current_pp"] = $current_pp;
				$input["total_bill_amt"] = $total_bill;
				$input["current_bundle"] = $current_bundle;
				$input["bundle_pitch"] = $bundle_pitch;
				$input["total_consumption"] = $total_consumption;
				$input["uploaded_date"] = date("Y-m-d H:i:s");
				$input["uploaded_by"] = $up_user;

				$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
				if ($dailySiebels) {
					$suceessful++;
				}
			}
		}
		//$count =  count($csv);
		//echo '<pre>';
		//print_r($data);
		exit(); /**/

		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}
	function uploadeNonBundleUsersWays_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('UpsellingUploads_model');
		//$this->load->model('ComplainStateLog_model');

		$error = array();
		$csv = file_get_contents($_FILES["file"]["tmp_name"]);
		$dataCSV = array_map("str_getcsv", preg_split('/\r*\n+|\r+/', $csv));

		foreach ($dataCSV as $key => $csv) {
			$count = count($csv);
			if ($key != 0 && $count == 5) {

				$msisdn = trim($csv[0]);
				$current_pp = trim($csv[1]);
				$total_bill = trim($csv[2]);
				$current_bundle = 'NONE';
				$bundle_pitch = trim($csv[3]);
				$total_consumption = trim($csv[4]);

				$input["msisdn"] = $msisdn;
				$input["current_pp"] = $current_pp;
				$input["total_bill_amt"] = $total_bill;
				$input["current_bundle"] = $current_bundle;
				$input["bundle_pitch"] = $bundle_pitch;
				$input["total_consumption"] = $total_consumption;
				$input["uploaded_date"] = date("Y-m-d H:i:s");
				$input["uploaded_by"] = $up_user;

				$dailySiebels = $this->UpsellingUploads_model->addUpsellings($input);
				if ($dailySiebels) {
					$suceessful++;
				}
			}
		}
		//$count =  count($csv);
		//echo '<pre>';
		//print_r($data);

		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}
	function upsellings_get($return = null, $ph = null) {
		$this->load->model('Upsellings_model');
		if ($return != null) {
			$upsellings = $this->Upsellings_model->getUpsellingsCount($ph);
			$this->response($upsellings, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');
			$phone = $this->get('phone');

			$upsellings = $this->Upsellings_model->getAllUpsellings($start, $end, $phone);
			if ($upsellings) {
				$this->response($upsellings, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any upselling!'), 404);
			}
		}
	}
	function upsellings_post() {
		$this->load->model('Upsellings_model');
		$this->load->model('UpsellingUploads_model');
		//$this->some_model->updateUser( $this->get('id') );
		$upselling = $this->post('upselling');

		//print_r($complain); exit();
		if ($upselling['status'] != 2) {
			$upsellings = $this->UpsellingUploads_model->deleteUpsellingUploads($upselling['upoaded_id']);
		}

		$message = $this->Upsellings_model->update_upselling($upselling);
		//print_r($this->post('user'));
		//$message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

		$this->response($message, 200); // 200 being the HTTP response code
	}
	function upsellingUploads_get($return = null, $ph = null) {
		$this->load->model('UpsellingUploads_model');
		if ($return != null) {
			$upsellings = $this->UpsellingUploads_model->getUpsellingUploadsCount($ph);
			$this->response($upsellings, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');
			$phone = $this->get('phone');

			$upsellings = $this->UpsellingUploads_model->getAllUpsellingUploads($start, $end, $phone);
			if ($upsellings) {
				$this->response($upsellings, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any upselling upload!'), 404);
			}
		}
	}
	function deleteUpsellingUploads_get() {
		$this->load->model('UpsellingUploads_model');
		$upsellingUploads = $this->UpsellingUploads_model->deleteAllUpsellingUploads();
		if ($upsellingUploads) {
			$this->response($upsellingUploads, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t delete any upselling uploads!'), 404);
		}
	}
	function giveUserAccess_get() {
		$this->load->model('Users_model');
		$upsellingUploads = $this->UpsellingUploads_model->deleteAllUpsellingUploads();
		if ($upsellingUploads) {
			$this->response($upsellingUploads, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t delete any upselling uploads!'), 404);
		}
	}
	function uploadeNpsDatas_post() {

		//print_r("Im in"); exit();
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$this->load->model('NpsUploads_model');
		$this->load->model('NpsCategories_model');
		$this->load->model('Users_model');
		//$this->load->model('ComplainStateLog_model');

		//			$new_id = $this->Users_model->codeToID('ACPOST3522');
		//			print_r($new_id);
		//			exit();
		$error = array();
		$row = 1;
		if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
			//print_r("I m in Handler");
			//exit();
			$file_row_error = array();
			$file_row = array();
			$header = fgetcsv($handle);
			$suceessful = 0;
			//print_r($header);
			//echo '<pre>';17:12:34 //--------------------------------------------------------------------
			//exit();
			while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {

				$num = count($data);
				//print_r($num); exit();
				$emptyColumn = array();
				$missingColumn = false;
				foreach ($data as $key => $value) {
					if ($value == '') {
						$emptyColumn[] = $header[$key];
						$missingColumn = true;
					}
				}
				if ($num != 10) {
					$file_row_error[] = $row;
				} else {
					//14//Reolsved With in TAT
					//15//TAT over Esclated to client
					//16//TAT over- Resolved after esclation
					//17//Resolved After TAT

					$msisdn = trim($data[0]);
					$call_date = trim($data[1]);
					$category = trim($data[2]);
					$description = trim($data[3]);
					$user_id = trim($data[4]);
					$call_duration = trim($data[5]);
					$response = trim($data[6]);
					$score = trim($data[7]);
					$nps = trim($data[8]);
					$mainCategory = trim($data[9]);

					if ($msisdn == '') {
						continue;
					}

					$new_id = $this->Users_model->codeToID($user_id);
					if ($new_id > 0) {
						//print_r($new_id);
						//exit();
						$clDate = explode('-', $call_date);
						$clDateCount = count($clDate);
						$month = $this->dateStringTONumaric($clDate[1]);
						if ($clDateCount > 2) {

							$new_date = $clDate[2] . '-' . $month . '-' . str_pad($clDate[0], 2, 0, STR_PAD_LEFT) . ' 00:00:00';
						} else {
							$new_date = '2015-' . $month . '-' . str_pad($clDate[0], 2, 0, STR_PAD_LEFT) . ' 00:00:00';
						}

						if (empty($mainCategory) || $mainCategory == '0' || $mainCategory == '' || $mainCategory == '#N/A') {
							$mainCategory = '#N/A';
						}

						$new_main_category = $this->NpsCategories_model->getCategoryID($mainCategory, 0);
						$new_category = $this->NpsCategories_model->getCategoryID($category, $new_main_category);

						$input["msisdn"] = '0' . $msisdn;
						$input["call_date"] = $new_date;
						//$input["category"] 		= $category;
						$input["category_id"] = $new_category;
						$input["description"] = $description;
						$input["user_id"] = $new_id;
						$input["call_duration"] = $call_duration;
						$input["response"] = $response;
						$input["score"] = $score;
						$input["nps"] = $nps;

						$input["uploaded_date"] = date("Y-m-d H:i:s");
						$input["uploaded_by"] = $up_user;
						//	print_r($input);
						//	exit();
						//insert_batch
						$file_row[] = $input;
						//$nus = $this->NpsUploads_model->addNps($input);
						//if ($nus) {
						//	$suceessful++;
						//}
					} else {
						$file_row_error[] = $row . ' - User - ' . $user_id;
					}

				}

				$row++; //Next Row
			}
			//print_r($file_row);
			//exit();

			//
			$nus = $this->NpsUploads_model->setAllNps($file_row);
			if ($nus) {
				$suceessful = count($file_row);
			}
			fclose($handle); //closing file after reading all data
			//exit();
		}
		$this->response(array('error' => $file_row_error, 'success' => $suceessful), 200); // 200 being the HTTP response code
	}
	public function dateStringTONumaric($mon) {
		switch ($mon) {
			case 'jan':case 'Jan':
				return '01';
				break;
			case 'feb':case 'Feb':
				return '02';
				break;
			case 'mar':case 'Mar':
				return '03';
				break;
			case 'apr':case 'Apr':
				return '04';
				break;
			case 'may':case 'May':
				return '05';
				break;
			case 'jun':case 'Jun':
				return '06';
				break;
			case 'jul':case 'Jul':
				return '07';
				break;
			case 'aug':case 'Aug':
				return '08';
				break;
			case 'sep':case 'Sep':
				return '09';
				break;
			case 'oct':case 'Oct':
				return '10';
				break;
			case 'nov':case 'Nov':
				return '11';
				break;
			case 'dec':case 'Dec':
				return '12';
				break;

			default:
				return -1;
				break;
		}
	}
	function npsUploads_get($return = null, $ph = null) {
		$this->load->model('NpsUploads_model');
		if ($return != null) {
			$npsUploads = $this->NpsUploads_model->getNpsUploadsCount($ph);
			$this->response($npsUploads, 200);
		} else {
			$start = $this->get('start');
			$end = $this->get('end');
			$phone = $this->get('phone');

			$npsUploads = $this->NpsUploads_model->getAllNpsUploads($start, $end, $phone);
			if ($npsUploads) {
				$this->response($npsUploads, 200); // 200 being the HTTP response code
			} else {
				$this->response(array('error' => 'Couldn\'t find any Nps Uploaded Data!'), 404);
			}
		}
	}
	function npsCategories_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsCategories_model');
		$npsCategories = $this->NpsCategories_model->getAllNpsCategories($id);
		if ($npsCategories) {
			$this->response($npsCategories, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsResponsePercentage_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getNpsResponsePercentage($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('entered'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsDateWise_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getNpsDateWise($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('entered'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsWorkCode_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getNpsWorkCodeWise($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('entered'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsTeamLead_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getNpsTeamLeadWise($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('entered'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsTeamLeadScore_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getNpsTeamLeadWiseScore($id, $this->get('from_date'), $this->get('to_date'), $this->get('sSearch'), $this->get('iDisplayLength'), $this->get('iDisplayStart'), $this->get('iSortCol_0'), $this->get('sSortDir_0'), $this->get('entered'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function deleteNUploads_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->deleteNPSUploadedData($this->get('from_date'), $this->get('to_date'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any data for given date!'), 404);
		}
	}
	function npsTeamLeadScoreGraph_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getNpsTeamLeadWiseGraph($id, $this->get('from_date'), $this->get('to_date'), $this->get('type'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsDateGraph_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getDateWise($id, $this->get('from_date'), $this->get('to_date'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function npsCategoryGraph_get($id = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('NpsUploads_model');

		$dailySiebels = $this->NpsUploads_model->getCategoryWise($id, $this->get('from_date'), $this->get('to_date'));
		if ($dailySiebels) {
			$this->response($dailySiebels, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any category!'), 404);
		}
	}
	function obExcelFields_post($id = null) {
		$this->load->model('ObExcelFields_model');
		$obExcelField = $this->post('obExcelField');
		$obExcelFields = $this->ObExcelFields_model->setObExcelFields($obExcelField);
		if ($obExcelFields) {
			$this->response($obExcelFields, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t Save Excel Fields!'), 404);
		}
	}
	function obExcelFields_get($id = null) {
		$this->load->model('ObExcelFields_model');
		//print_r($this->get('ob_campaign_id'));
		$obExcelFields = $this->ObExcelFields_model->getObExcelFields($id, $this->get('ob_campaign_id'));
		if ($obExcelFields) {
			$this->response($obExcelFields, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any Excel Fields!'), 404);
		}
	}
	function obExcelValues_post($id = null) {
		$this->load->model('ObExcelValues_model');
		$obExcelValue = $this->post('obExcelValue');
		$obExcelValues = $this->ObExcelValues_model->setObExcelValues($obExcelValue);
		if ($obExcelValues) {
			$this->response($obExcelValues, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t Save Excel Values!'), 404);
		}
	}
	function obExcelFieldsnValues_get($id = null) {
		$this->load->model('ObExcelFields_model');
		$this->load->model('ObExcelValues_model');
		$obExcelFields = $this->ObExcelFields_model->getObExcelFields($id, $this->get('ob_campaign_id'));
		print_r($obExcelFields);exit();

		foreach ($obExcelFields as $index) {

		}
		//$obExcelValue = $this->post('obExcelValue');
		$obExcelValues = $this->ObExcelValues_model->getObExcelValues($obExcelFields);
		if ($obExcelValues) {
			$this->response($obExcelValues, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t Save Excel Values!'), 404);
		}
	}
	function targetNAchivedSmartDtoll_get($phone = null) {
		//print_r($this->get('id'));
		//	print_r($id);
		$this->load->model('Callactivities_model');
		$this->load->model('Consumers_model');

		$group = array('Lahore' => 'lahore', 'Karachi' => 'karachi', 'Islamabad' => 'islamabad', 'Multan' => 'multan');

		$callactivitiesAllVerifiedT = $this->Callactivities_model->getAllCallActivitiesDtollVerifiedTerritories();

		$callconsumersAll = $this->Consumers_model->getConsumersDtoll();

		$callactivitiesAll = $this->Callactivities_model->getAllCallActivitiesDtoll();
		$callactivitiesAllVerified = $this->Callactivities_model->getAllCallActivitiesDtollVerified();
		$callactivitiesAllAided = $this->Callactivities_model->getAllCallActivitiesDtollAided();
		$callactivitiesAllVideo = $this->Callactivities_model->getAllCallActivitiesDtollVideo();
		$callactivitiesAllPacket = $this->Callactivities_model->getAllCallActivitiesDtollPacket();

		//print_r($callactivitiesAllVerified);
		//print_r($callactivitiesAll);
		//print_r($callconsumersAll);
		//print_r($callconsumersAll);
		$callactivitiesAllVerifiedTSorted = $this->sortArr($callactivitiesAllVerifiedT);
		/*echo '<pre>';
			print_r($callactivitiesAllVerifiedTSorted);
		*/

		$target = array();
		$achived = array();

		$percentageVerified = array();
		$percentageAided = array();
		$percentageVideo = array();
		$percentagePacky = array();
		/*[{
			                name: 'Brands',
			                colorByPoint: true,
			                data: [{
			                    name: 'Not Shown',
			                    y: 56.33,

			                }, {
			                    name: 'Shown',
			                    y: 24.03,
			                }]
		*/
		foreach ($group as $key => $index) {

			//$target[]  = array('name' => $key, 'y' => intval($callconsumersAll[$index]), "color" => "#081321" );
			//$achived[] = array('name' => $key, 'y' => intval($callactivitiesAll[$index]), "color" => "#2da8d9" );

			if ($index == 'lahore') {
				$target[] = array('name' => $key, 'y' => 34735, "color" => "#081321");
				$achived[] = array('name' => $key, 'y' => 34583, "color" => "#2da8d9");
			} else if ($index == 'karachi') {
				$target[] = array('name' => $key, 'y' => 47335, "color" => "#081321");
				$achived[] = array('name' => $key, 'y' => 54801, "color" => "#2da8d9");
			} else if ($index == 'islamabad') {
				$target[] = array('name' => $key, 'y' => 49500, "color" => "#081321");
				$achived[] = array('name' => $key, 'y' => 48950, "color" => "#2da8d9");
			} else {
				$target[] = array('name' => $key, 'y' => 4020, "color" => "#081321");
				$achived[] = array('name' => $key, 'y' => 4147, "color" => "#2da8d9");
			}
			$percentageVerified[$key] = round((intval($callactivitiesAllVerified[$index]) / intval($callactivitiesAll[$index]) * 100), 2);

			$aided = round((intval($callactivitiesAllAided[$index]) / intval($callactivitiesAllVerified[$index]) * 100), 2);

			$unaided = 100 - $aided;
			$percentageAided[$index] = array('name' => $key, 'data' => array(0 => array('name' => 'Aided', 'y' => $aided)
				, 1 => array('name' => 'Unaided', 'y' => $unaided),
			),
			);

			$video = round((intval($callactivitiesAllVideo[$index]) / intval($callactivitiesAllVerified[$index]) * 100), 2);
			$unvideo = 100 - $video;
			$percentageVideo[$index] = array('name' => $key, 'data' => array(0 => array('name' => 'Not Shown', 'y' => $unvideo)
				, 1 => array('name' => 'Shown', 'y' => $video),
			),
			);

			$packy = round((intval($callactivitiesAllPacket[$index]) / intval($callactivitiesAllVerified[$index]) * 100), 2);
			$unpacky = 100 - $packy;
			$percentagePacky[$index] = array('name' => $key, 'data' => array(0 => array('name' => 'Not Offered', 'y' => $unpacky)
				, 1 => array('name' => 'Offered', 'y' => $packy),
			),
			);
			//print_r($callactivitiesAll[$index]);
		}
		$return = array('series' => array(
			0 => array('name' => 'Target', 'colorByPoint' => false, 'data' => $target),
			1 => array('name' => 'Achieved', 'colorByPoint' => false, 'data' => $achived),
		),
			'verified' => $percentageVerified,
			'aided' => $percentageAided,
			'video' => $percentageVideo,
			'pack' => $percentagePacky,
			'activity' => $callactivitiesAllVerifiedTSorted,

		);

		if ($return) {
			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}

		exit();
		/*[{
			            name: '',
			            colorByPoint: true,
			            data: [{
			                name: 'Lahore',
			                y: 5,
							color:"#081321",
			               // drilldown: 'animals'
			            }, {
			                name: 'Karachi',
			                y: 2,
							color:"#081321",

			            }, {
			                name: 'Islamabad',
			                y: 4,
							color:"#081321",
			            }, {
			                name: 'Multan',
			                y: 4,
							color:"#081321",
			            }
						]
			        }, {
			            name: 'Achieved',
			            colorByPoint: true,
			            data: [{
			                name: 'Lahore',
			                y: 1,
							color:"#2da8d9",
			            }, {
			                name: 'Karachi',
			                y: 5,
							color:"#2da8d9",
			            }, {
			                name: 'Islamabad',
			                y: 2,
							color:"#2da8d9",
			            }, {
			                name: 'Multan',
			                y: 6,
							color:"#2da8d9",
			            }]
		*/
		if ($consumerAll) {
			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}
		//$callactivitiesAll = $this->Callactivities_model->getAllCallActivities();
		exit();

		$callactivitiesAll = $this->Callactivities_model->getAllCallActivities();
		//echo '<pre>'; print_r($callactivitiesAll); exit();
		$regionsAll = $this->Regions_model->getAllRegions();
		$areasAll = $this->Areas_model->getAllAreas();
		// print_r($areasAll); //exit();
		$territoriesAll = $this->Territories_model->getAllTerritories();
		// print_r($territoriesAll); exit();
		$brandambassadorsAll = $this->Brandambassador_model->getAllBrandAmbassador('');
		$difference = $this->getSmartVOQDateDifference();
		//print_r($difference);
		//echo '<pre>'; print_r($brandambassadorsAll['rcount']); exit();
		$consumerAll = $this->Consumer_model->getAllConsumer();
		//echo '<pre>'; print_r($consumerAll); exit();
		$returnRegion = $returnRegion1 = $returnRegion2 = $regionName = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$regionBATotal = $brandambassadorsAll['rcount'];
		$regionCunTotal = $callactivitiesAll['rconsumers'];
		$regionVTotal = $callactivitiesAll['vrconsumers'];
		$regionUTotal = $callactivitiesAll['urconsumers'];
		$regionAdTotal = $callactivitiesAll['adrconsumers'];
		$regionUadTotal = $callactivitiesAll['uadrconsumers'];

		$regionCunTotal2 = $consumerAll['rconsumers'];
		$regionCunTotal1 = $brandambassadorsAll['rcount'];
		/* , 'vrconsumers' => $regionCountVarified,'vaconsumers' => $areaCountVarified,'vtconsumers' => $territoryCountVarified
			    , '' => $regionCountUnverified,'uaconsumers' => $areaCountUnverified,'utconsumers' => $territoryCountUnverified
		*/
		//  print_r($regionVTotal);
		//  print_r($regionUTotal);
		//  exit();

		$regionUpdate = array();
		foreach ($regionsAll as $rkey => $rindex) {

			$targetNAchivedNo['manager'] = $rindex['manager'];
			$targetNAchivedNo['managerid'] = $rindex['manager_id'];
			$targetNAchivedNo['region'] = $rindex['name'];
			$targetNAchivedNo['regionid'] = $rindex['id'];

			if (!array_key_exists($rindex['id'], $regionUTotal)) {
				$regionUTotal[$rindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $regionVTotal)) {
				$regionVTotal[$rindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $regionAdTotal)) {
				$regionAdTotal[$rindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $regionUadTotal)) {
				$regionUadTotal[$rindex['id']] = 0;
			}

			$regionUpdate[$rindex['id']]['unaided'] = $regionUadTotal[$rindex['id']];
			$regionUpdate[$rindex['id']]['aided'] = $regionAdTotal[$rindex['id']];

			$targetNAchivedNo['target'] = isset($regionUTotal[$rindex['id']]) ? $regionUTotal[$rindex['id']] : 0;
			$targetNAchivedNo['achived'] = isset($regionVTotal[$rindex['id']]) ? $regionVTotal[$rindex['id']] : 0;

			$total = $targetNAchivedNo['achived'] + $targetNAchivedNo['target'];
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['achived'] > 0 and $targetNAchivedNo['target'] == 0) {
				$targetNAchivedNo['percentage'] = 100;
			} else if ($total > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $total) * 100, 1);
			}

			//Region

			//	$targetNAchivedNo1['name'] = $rindex['name'];
			$targetNAchivedNo1 = isset($regionCunTotal1[$rindex['id']]) ? ($regionCunTotal1[$rindex['id']] * $difference * 20) : 0;
			//$targetNAchivedNo1['color']= '#013c4c';
			//	$targetNAchivedNo2['y'] = $rindex['name'];
			$targetNAchivedNo2 = isset($regionCunTotal2[$rindex['id']]) ? $regionCunTotal2[$rindex['id']] : 0;
			//$targetNAchivedNo2['color']= '#ea1c33';

			/*if($rindex['id'] == 2){
					$targetNAchivedNo1    = 8680;
					$targetNAchivedNo2    = 6010;
				}
				else if($rindex['id'] == 1){
					$targetNAchivedNo1    = 8460;
					$targetNAchivedNo2    = 5000;
				}
				else if($rindex['id'] == 3){
					$targetNAchivedNo1    = 5280;
					$targetNAchivedNo2    = 3056;
				}
				else{
					$targetNAchivedNo1    = 9100;
					$targetNAchivedNo2    = 6800;

			*/
			$regionName[] = $rindex['name'];
			$returnRegion[] = $targetNAchivedNo;

			$returnRegion1[] = $targetNAchivedNo1;
			$returnRegion2[] = $targetNAchivedNo2;

			//$regionUpdate = array('aided'=> $regionAdTotal, 'unaided' => $regionUadTotal);
			//$targetNAchivedNo
		}

		//$returnRegion1 =  usort($returnRegion, "myFieldSort");
		//, "myFieldSort");
		$returnArea = $returnArea1 = $returnArea2 = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$areaBATotal = $brandambassadorsAll['acount'];
		$areaCunTotal = $callactivitiesAll['aconsumers'];

		$areaVTotal = $callactivitiesAll['vaconsumers'];
		$areaUTotal = $callactivitiesAll['uaconsumers'];

		foreach ($areasAll as $akey => $aindex) {

			$targetNAchivedNo['amanager'] = $aindex['amanager'];
			$targetNAchivedNo['amanagerid'] = $aindex['amanager_id'];
			$targetNAchivedNo['area'] = $aindex['name'];
			$targetNAchivedNo['areaid'] = $aindex['id'];

			if (!array_key_exists($aindex['id'], $areaUTotal)) {
				$areaUTotal[$aindex['id']] = 0;
			}
			if (!array_key_exists($rindex['id'], $areaVTotal)) {

				$areaVTotal[$aindex['id']] = 0;
			}
			$targetNAchivedNo['target'] = isset($areaUTotal[$aindex['id']]) ? $areaUTotal[$aindex['id']] : 0; //$total; //isset($regionBATotal[$rindex['id']])?$regionBATotal[$rindex['id']]*20:0;
			$targetNAchivedNo['achived'] = isset($areaVTotal[$aindex['id']]) ? $areaVTotal[$aindex['id']] : 0;

			$total = $targetNAchivedNo['achived'] + $targetNAchivedNo['target'];
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['achived'] > 0 and $targetNAchivedNo['target'] == 0) {
				$targetNAchivedNo['percentage'] = 100;
			} else if ($total > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $total) * 100, 1);
			}

			//$targetNAchivedNo['target']   = isset($areaBATotal[$aindex['id']])?$areaBATotal[$aindex['id']]*20:0;
			//$targetNAchivedNo['achived']  = isset($areaCunTotal[$aindex['id']])?$areaCunTotal[$aindex['id']]:0;

			$returnArea[] = $targetNAchivedNo;
			/*$targetNAchivedNo1['name'] = $rindex['name'];
				$targetNAchivedNo1['y']    = $targetNAchivedNo['target'];
				$targetNAchivedNo1['color']= '#013c4c';

				$targetNAchivedNo2['name'] = $rindex['name'];
				$targetNAchivedNo2['y']    = $targetNAchivedNo['achived'];
				$targetNAchivedNo2['color']= '#ea1c33';

				$returnArea1[] = $targetNAchivedNo1;
				$returnArea2[] = $targetNAchivedNo2;
			*/
			//$targetNAchivedNo
		}

		$returnTerritory = $returnTerritory1 = $returnTerritory2 = array();
		$targetNAchivedNo = $targetNAchivedNo1 = $targetNAchivedNo2 = array();

		$territoryBATotal = $brandambassadorsAll['tcount'];
		$territoryCunTotal = $callactivitiesAll['tconsumers'];

		$territoryVTotal = $callactivitiesAll['vtconsumers'];
		$territoryUTotal = $callactivitiesAll['utconsumers'];

		foreach ($territoriesAll as $tkey => $tindex) {

			$targetNAchivedNo['tmanager'] = $tindex['tmanager'];
			$targetNAchivedNo['tmanagerid'] = $tindex['tmanager_id'];
			$targetNAchivedNo['territory'] = $tindex['name'];
			$targetNAchivedNo['territoryid'] = $tindex['id'];

			if (!array_key_exists($tindex['id'], $territoryUTotal)) {
				$territoryUTotal[$tindex['id']] = 0;
			}

			if (!array_key_exists($tindex['id'], $territoryVTotal)) {

				$territoryVTotal[$tindex['id']] = 0;
			}
			//else{
			$targetNAchivedNo['target'] = isset($territoryUTotal[$tindex['id']]) ? $territoryUTotal[$tindex['id']] : 0; //$total; //isset($regionBATotal[$rindex['id']])?$regionBATotal[$rindex['id']]*20:0;
			//}

			//	else{
			$targetNAchivedNo['achived'] = isset($territoryVTotal[$tindex['id']]) ? $territoryVTotal[$tindex['id']] : 0;
			//	}
			$total = $targetNAchivedNo['achived'] + $targetNAchivedNo['target'];
			$targetNAchivedNo['percentage'] = 0;
			if ($targetNAchivedNo['achived'] > 0 and $targetNAchivedNo['target'] == 0) {
				$targetNAchivedNo['percentage'] = 100;
			} else if ($total > 0) {
				$targetNAchivedNo['percentage'] = round(($targetNAchivedNo['achived'] / $total) * 100, 1);
			}
			$returnTerritory[] = $targetNAchivedNo;
			/*$targetNAchivedNo1['name'] = $rindex['name'];
				$targetNAchivedNo1['y']    = $targetNAchivedNo['target'];
				$targetNAchivedNo1['color']= '#013c4c';

				$targetNAchivedNo2['name'] = $rindex['name'];
				$targetNAchivedNo2['y']    = $targetNAchivedNo['achived'];
				$targetNAchivedNo2['color']= '#ea1c33';

				$returnArea1[] = $targetNAchivedNo1;
				$returnArea2[] = $targetNAchivedNo2;
			*/
			//$targetNAchivedNo
		}
		$returnRegionA = $this->sortArr($returnRegion);
		$returnAreaA = $this->sortArr($returnArea);
		$returnTerritoryA = $this->sortArr($returnTerritory);

		$return = array('series' => array('data' => array(0 => array('name' => 'Target', 'data' => $returnRegion1), 1 => array('name' => 'Achieved', 'data' => $returnRegion2),
		), 'regionName' => $regionName)
			, 'rdata' => $returnRegionA, 'adata' => $returnAreaA, 'tdata' => $returnTerritoryA, 'aided' => $regionUpdate);
		//$consumers = $this->Consumers_model->getAllConsumers($phone);
		if ($consumerAll) {
			$this->response($return, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any consumer!'), 404);
		}
		//}

		/*{
			            name: 'Target',
			            colorByPoint: true,
			            data: [{
			                name: 'North Region',
			                y: 5,
							color:"#013c4c",
			                drilldown: 'animals'
			            }, {
			                name: 'Sindh & Baluchistan Region',
			                y: 2,
							color:"#013c4c",
			                drilldown: 'fruits'
			            }, {
			                name: 'Southern Punjab Region',
			                y: 4,
							color:"#013c4c",
			                drilldown: 'cars'
			            }, {
			                name: 'Central Punjab Team',
			                y: 4,
							color:"#013c4c",
			                drilldown: 'sahil'
			            }
						]
			        }, {
			            name: 'Achieved',
			            colorByPoint: true,
			            data: [{
			                name: 'North Region',
			                y: 1,
							color:"#ea1c33",
			                drilldown: 'animals2'
			            }, {
			                name: 'Sindh & Baluchistan Region',
			                y: 5,
							color:"#ea1c33",
			                drilldown: 'fruits2'
			            }, {
			                name: 'Southern Punjab Region',
			                y: 2,
							color:"#ea1c33",
			                drilldown: 'cars2'
			            }, {
			                name: 'Central Punjab Team',
			                y: 6,
							color:"#ea1c33",
			                drilldown: 'sahil2'
			            }]
		*/
	}
}
