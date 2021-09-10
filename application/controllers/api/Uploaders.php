<?php defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
class Uploaders extends REST_Controller {//  CI_Controller //

    function __construct() {
        date_default_timezone_set("Asia/Karachi"); 
		parent::__construct();
		ini_set('MAX_EXECUTION_TIME', 0);
		//error_reporting(E_ALL);  // turn on all errors, warnings and notices for easier debugging
		//ini_set('max_execution_time', 123456);
		ini_set('max_input_time', -1);
		ini_set('memory_limit', '2048M');
		set_time_limit(0);

		if (!$this->session->userdata('is_logged_in')) {
			// header('Location');	// echo base_url(); // header('Location:'.base_url());
			$this->load->view('login');
			return 'sessionEnd';
		}
		//$this->load->model('ClickLogs_model');
    }
  
 	public function index(){
        $this->load->view('login'); 
	}
	public function agentDataSheetsFile_post(){

		$this->load->library('csvfile');
		$this->load->model('AgentData_model');

		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		
		$from_date = $this->input->post('fromDate');

		$path = $_FILES['file']['tmp_name'];
		$result = $this->csvfile->parse_file($path);

		//print_r($result);
		//exit();
		// [task_id] => 400
        //     [agent_id] => 180790
        //     [sr_#] => 149
        //     [sr_time] => 12/31/2019 12:45
        //     [other] => Text
		foreach ($result as $key => $index) {
			if (empty($index['date'])) {
				$result[$key]['date'] = $from_date;
				$result[$key]['uploaded_by'] = $user_id;
				$result[$key]['uploaded'] = date('Y-m-d H:i:s');
				$result[$key]['sr_time'] = date('Y-m-d H:i:s', strtotime($index['sr_time']));
				$result[$key]['user_id'] = $this->Users_model->loginidToUserid($index['user_id']);
				// if(strtotime($index['to_time'])){
				// 	// echo $index['to_time'].'---'.strtotime($index['to_time']).'\n';

				// 	$result[$key]['shift_timing_id'] = $this->ShiftTimings_model->findKey($index['from_time'], $index['to_time']);
				// 	$result[$key]['shift_day_id'] = 7;
					
				// 	$result[$key]['from_time'] = strtotime('-1 hours', strtotime($from_date.' '.$result[$key]['from_time']));
				// 	$result[$key]['to_time'] = strtotime('1 hours', strtotime($from_date.' '.$result[$key]['to_time']));
				// }else{
				// 	//$index['to_time'];
				// 	$result[$key]['shift_timing_id'] = 1;
				// 	$result[$key]['shift_day_id'] = $this->ShiftDays_model->findKey(str_replace(' ','_',strtolower(trim($index['from_time']))));
				// 	$result[$key]['from_time'] = strtotime($from_date.' 00:00:00');
				// 	$result[$key]['to_time'] = strtotime($from_date.' 00:00:00');
				// 	//$this->Users_model->loginidToUserid($index['to_time']);
				// 	// echo $index['to_time'].'Not a time';
				// }
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
		// print_r($result);
		// exit();
		$current = $this->AgentData_model->saveMany($result);
		if ($current) {
			$this->response($current, 200); // 200 being the HTTP response code
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
} 
