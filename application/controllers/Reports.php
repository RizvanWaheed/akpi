<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Reports extends CI_Controller {

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
		$this->load->model('ClickLogs_model');
    }
  
 	public function index(){
        $this->load->view('login'); 
	}
	function agentDataTasksReport() {
 		$this->load->model('Monitorings_model');
 		$this->load->model('monitoringScores_model');
 		/*echo '<pre>';
 		//print_r($this->get);
 		print_r($this->input->get('from_date', TRUE));
 		print_r($this->input->get('to_date', TRUE));
 		print_r($this->input->get('for_id', TRUE));
 		print_r($this->input->get('belongs_to', TRUE));
 		exit();*/
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date   = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		
		
		//$sess_data = $this->session->userdata;		
		// $clarray = array();
		// $clarray['name'] = 'qualityMonitoringReport';
		// $clarray['clicked'] = date('Y-m-d H:i:s');
		// $clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		// $clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		// $clarray['parameters'] = $from_date.','.$to_date.','.$this->input->get('for_id', TRUE).','.$this->input->get('belongs_to', TRUE);
		// $this->ClickLogs_model->setClickLog($clarray);
		// //$f_dates = explode('/', trim($from_date));
		// //$t_dates = explode('/', trim($to_date));
		// //print_r()
		// $monitoring = $this->Monitorings_model->getAllMonitorings($from_date, $to_date, $this->input->get('for_id', TRUE), $this->input->get('belongs_to', TRUE));
		// if(empty($monitoring)){
		// 	echo 'No Record Found'; exit();
		// }
		// $monitoring_score = $this->monitoringScores_model->getAllMonitoringScores($monitoring);

		// $return = array();
		// foreach ($monitoring as $key => $index) {
		// 	$id = $index['id'];
		// 	$return[$id] = $index;
		// 	foreach ($monitoring_score as $key_score => $index_score) {
		// 		if ($index_score['monitoring_id'] == $id) {
		// 			if ($index_score['type'] == 'attribute') {
		// 				$return[$id][$index_score['name'] . ' Comment '] = $index_score['comment'];
		// 				$return[$id][$index_score['name'] . ' Score '] = $index_score['score'];
		// 			} else {
		// 				$return[$id][$index_score['name'] . ' Score '] = $index_score['score'];
		// 			}

		// 		}
		// 	}

		// }
		/*	
			print_r(array_keys(array_values($return)[0]));
			echo '<pre>';
			print_r($return);exit();
		*/
		$return = array();
		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"Task_" . $from_date . "-" . $to_date . ".csv\"");
		header("Pragma: no-cache");
		header("Expires: 0");
		$header = array_keys(array_values($return)[0]);
		$handle = fopen('php://output', 'w');
		fputcsv($handle, $header);
		foreach ($return as $product) {
			fputcsv($handle, $product);
		}
		fclose($handle);
		exit();
	}
 	function qualityMonitoringReport() {
 		$this->load->model('Monitorings_model');
 		$this->load->model('monitoringScores_model');
 		/*echo '<pre>';
 		//print_r($this->get);
 		print_r($this->input->get('from_date', TRUE));
 		print_r($this->input->get('to_date', TRUE));
 		print_r($this->input->get('for_id', TRUE));
 		print_r($this->input->get('belongs_to', TRUE));
 		exit();*/
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date   = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		
		
		//$sess_data = $this->session->userdata;		
		$clarray = array();
		$clarray['name'] = 'qualityMonitoringReport';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $from_date.','.$to_date.','.$this->input->get('for_id', TRUE).','.$this->input->get('belongs_to', TRUE);
		$this->ClickLogs_model->setClickLog($clarray);
		//$f_dates = explode('/', trim($from_date));
		//$t_dates = explode('/', trim($to_date));
		//print_r()
		$monitoring = $this->Monitorings_model->getAllMonitorings($from_date, $to_date, $this->input->get('for_id', TRUE), $this->input->get('belongs_to', TRUE));
		if(empty($monitoring)){
			echo 'No Record Found'; exit();
		}
		$monitoring_score = $this->monitoringScores_model->getAllMonitoringScores($monitoring);

		$return = array();
		foreach ($monitoring as $key => $index) {
			$id = $index['id'];
			$return[$id] = $index;
			foreach ($monitoring_score as $key_score => $index_score) {
				if ($index_score['monitoring_id'] == $id) {
					if ($index_score['type'] == 'attribute') {
						$return[$id][$index_score['name'] . ' Comment '] = $index_score['comment'];
						$return[$id][$index_score['name'] . ' Score '] = $index_score['score'];
					} else {
						$return[$id][$index_score['name'] . ' Score '] = $index_score['score'];
					}

				}
			}

		}
		/*	
			print_r(array_keys(array_values($return)[0]));
			echo '<pre>';
			print_r($return);exit();
		*/

		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"Quailty_Monitor_" . $from_date . "-" . $to_date . ".csv\"");
		header("Pragma: no-cache");
		header("Expires: 0");
		$header = array_keys(array_values($return)[0]);
		$handle = fopen('php://output', 'w');
		fputcsv($handle, $header);
		foreach ($return as $product) {
			fputcsv($handle, $product);
		}
		fclose($handle);
		exit();
	}
	function agentAttendenceMonitoringReport4($id = null) {
		$this->load->model('UserStateLogs_model');
		//print_r($this->get('id'));
		//	print_r($id);
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		if($id == null)	$id = $this->input->get('id', TRUE);
		
		$clarray = array();
		$clarray['name'] = 'agentAttendenceMonitoringReport';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $from_date.','.$to_date;
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		$questions = $this->UserStateLogs_model->getUserStateShiftLogs($id, $f_dates, $t_dates, $this->input->get('campaign_id'), $this->input->get('shift_timings'));
		
		//print_r($questions); exit();
		//
		header("Pragma: no-cache");
		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"User_Attendence.csv\"");
		header("Expires: 0");
		$header = array_keys(array_values($questions)[0]);
		ob_clean();
		//$header = array('Date', 'ID', 'Name', 'Break', 'Working', 'Total'); //array_keys(array_values($questions)[0]);
		$handle = fopen('php://output', 'w');
		//ob_clear();
		fputcsv($handle, $header);
		foreach ($questions as $product) {
			//fputcsv($handle, $product);//fputcsv($handle, array($product['date'] , $product['sip'], $product['name'], $product['Break'], $product['Working'], $product['total']));
			fputcsv($handle, array($product['date'], $product['name'] , $product['sip'], $product['Working_time'], $product['break_time'], $product['agent_time']));
		}
		fclose($handle);
		exit();

		/*if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}*/
	}
	function agentAttendenceMonitoringReport($id = null) {
		$this->load->model('UserStateLogs_model');
		//print_r($this->get('id'));
		//	print_r($id);
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		if($id == null)	$id = $this->input->get('id', TRUE);
		
		$clarray = array();
		$clarray['name'] = 'agentAttendenceMonitoringReport';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $from_date.','.$to_date;
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		$questions = $this->UserStateLogs_model->getUserStateLogs($id, $f_dates, $t_dates, $this->input->get('campaign_id'), $this->input->get('shift_timings'));
		
		//print_r($questions); exit();
		//
		header("Pragma: no-cache");
		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"User_Attendence.csv\"");
		header("Expires: 0");
		$header = array_keys(array_values($questions)[0]);
		ob_clean();
		//$header = array('Date', 'ID', 'Name', 'Break', 'Working', 'Total'); //array_keys(array_values($questions)[0]);
		$handle = fopen('php://output', 'w');
		//ob_clear();
		fputcsv($handle, $header);
		foreach ($questions as $product) {
			//fputcsv($handle, $product);//fputcsv($handle, array($product['date'] , $product['sip'], $product['name'], $product['Break'], $product['Working'], $product['total']));
			fputcsv($handle, array($product['date'], $product['name'] , $product['sip'], $product['Working_time'], $product['break_time'], $product['agent_time']));
		}
		fclose($handle);
		exit();

		/*if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}*/
	}
	function agentAttendenceMonitoringReport2($id = null) {
		$this->load->model('UserStateLogs_model');
		//print_r($this->get('id'));
		//	print_r($id);
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		if($id == null)	$id = $this->input->get('id', TRUE);
		
		$clarray = array();
		$clarray['name'] = 'agentAttendenceMonitoringReportHourly';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $f_dates.','.$t_dates;
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		
		$questions = $this->UserStateLogs_model->getUserStateLogs2($id, $f_dates, $t_dates);
		
		//print_r($questions); exit();
		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"User_Hourly_Attendence_" . $from_date . "-" . $to_date . ".csv\"");
		header("Pragma: no-cache");
		header("Expires: 0");
		$header = array_keys(array_values($questions)[0]);
		ob_clean();
		$handle = fopen('php://output', 'w');
		fputcsv($handle, $header);
		foreach ($questions as $product) {
			fputcsv($handle, $product); //fputcsv($handle, array($product['date'], $product['name'] , $product['sip'], $product['Working_time'], $product['b'], $product['Total']));
		}
		fclose($handle);
		exit();

		/*if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}*/
	}
	function agentAttendenceMonitoringReport3($id = null) {
		$this->load->model('UserStateLogs_model');
		//print_r($this->get('id'));
		//	print_r($id);
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		$fdate = $f_dates[2].'-'.$f_dates[0].'-'.$f_dates[1];
		$tdate = $t_dates[2].'-'.$t_dates[0].'-'.$t_dates[1];
		
		if($id == null)	$id = $this->input->get('id', TRUE);
		
		$clarray = array();
		$clarray['name'] = 'agentAttendenceMonitoringReportLoginLogOut';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $fdate.','.$tdate;
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		$questions = $this->UserStateLogs_model->getUserStateLogsLoginLogout($id, $fdate, $tdate);
		

		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"User_Login_Logout_Attendence_" . $fdate . "-" . $tdate . ".csv\"");
		header("Pragma: no-cache");
		header("Expires: 0");
		$header =  array('SIP', 'Name', 'Date', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout', 'Login', 'Logout');//array_keys(array_values($questions)[0]);
		ob_clean();
		$handle = fopen('php://output', 'w');
		fputcsv($handle, $header);
		$newArray = array();
		foreach ($questions as $product) {
			//$newAry = $product['sip'].','.$product['name'];
			 //fputcsv($handle, array($product['date'] , $product['sip'], $product['name'], $product['Break'], $product['Working'], $product['Total']));
			fputcsv($handle, $product);
		}
		fclose($handle);
		exit();

		/*if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}*/
	}
	function agentDataMonitoringReport($id = null) {
		$this->load->model('Activities_model');
		//print_r($this->get('id'));
		//	print_r($id);
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		if($id == null)	$id = $this->input->get('id', TRUE);
		
		$clarray = array();
		$clarray['name'] = 'agentDataMonitoringReport';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = implode(',',$f_dates).','.implode(',',$t_dates);
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		
		
		$questions = $this->Activities_model->getUserActivities($id, $f_dates, $t_dates, $this->input->get('monitoring_for_id', TRUE), $this->input->get('ticket_process', TRUE));
		
		//echo '<pre>'; print_r($questions); exit();
		if(!empty($questions)){
			header("Content-type: application/csv");
			header("Content-Disposition: attachment; filename=\"User_Activities_" . $from_date . "-" . $to_date . ".csv\"");
			header("Pragma: no-cache");
			header("Expires: 0");
			$header = array_keys(array_values($questions)[0]);
			ob_clean();
			$handle = fopen('php://output', 'w');
			fputcsv($handle, $header);
			foreach ($questions as $product) {
				fputcsv($handle, $product);
			}
			fclose($handle);
		}
		else{
			echo 'no data found';
		}
		exit();

		/*if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}*/
	}
	function consumerAgentDateImport($id = null) {
		$this->load->model('Complaints_model');
		//print_r($this->input->get);
		//	print_r($id);
		//$this->load->model('Callactivities_model');
		$clarray = array();
		$clarray['name'] = 'consumerAgentDateImport';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $this->input->get('from_date', TRUE).', '.$this->input->get('to_date', TRUE);
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		
		$callactivitiesAll = $this->Complaints_model->complaintAgentDateImport($id, $this->input->get('from_date', TRUE), $this->input->get('to_date', TRUE), $this->input->get('domain_id', TRUE), $this->input->get('from_form', TRUE)); //, $this->get('region'), $this->get('area'), $this->get('territory'));
		if(!empty($callactivitiesAll)){
			header("Content-type: application/csv");
			header("Content-Disposition: attachment; filename=\"Complaint_".$this->input->get('from_form', TRUE).".csv\"");//" . $from_date . "-" . $to_date . "
			header("Pragma: no-cache");
			header("Expires: 0");
			$header = array_keys(array_values($callactivitiesAll)[0]);
			ob_clean();
			$handle = fopen('php://output', 'w');
			fputcsv($handle, $header);
			foreach ($callactivitiesAll as $product) {
				fputcsv($handle, $product);
			}
			fclose($handle);
		}
		else{
			echo 'no data found';
		}
		exit();
		
		
		
		// if(empty($callactivitiesAll)){
		// 	echo 'No Record found';
		// 	exit();
		// } 
		// echo '<pre>';
		// print_r($callactivitiesAll); exit();
		// header("Pragma: public");
		// header("Expires: 0");
		// header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		// //header("Content-Type: text/x-csv");
		// //header("Content-Disposition: attachment;filename='" . $this->get('type') . ".csv'");
		// header("Content-type: application/octet-stream");
		// header("Content-Disposition: attachment; filename=Complaints Reoprt.xls");
		// header("Content-type: application/csv");
		// header("Content-Disposition: attachment; filename=\"Complaint.csv\"");//" . $from_date . "-" . $to_date . "
		// header("Pragma: no-cache");
		// header("Expires: 0");

		// echo $this->to_excel($callactivitiesAll, 'Complaints Report');
		// exit();
	}
	function accalations($id = null) {
		$this->load->model('Accalations_model');
		
		$clarray = array();
		$clarray['name'] = 'accalations';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $this->input->get('accalation_date', TRUE).', '.$this->input->get('accalation_status', TRUE).', '.$this->input->get('accalation_sub_department', TRUE);
		
		$this->ClickLogs_model->setClickLog($clarray);
		
		
		$accalations = $this->Accalations_model->getDownloadAccalations($this->input->get('accalation_date', TRUE), $this->input->get('accalation_status', TRUE), $this->input->get('accalation_sub_department', TRUE));	
			
		if(!empty($accalations)){
			header("Content-type: application/csv");
			header("Content-Disposition: attachment; filename=\"Complaint_Escalation_.csv\"");//" . $from_date . "-" . $to_date . "
			header("Pragma: no-cache");
			header("Expires: 0");
			$header = array_keys(array_values($accalations)[0]);
			ob_clean();
			$handle = fopen('php://output', 'w');
			fputcsv($handle, $header);
			foreach ($accalations as $product) {
				fputcsv($handle, $product);
			}
			fclose($handle);
		}
		else{
			echo 'no data found';
		}
		exit();
	}
	function surveyResultDateImport() {
		$this->load->model('SurveyResults_model');
		//print_r($this->get('id'));
		//	print_r($id);
		$from_date = !empty($this->input->get('from_date', TRUE)) ? $this->input->get('from_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($this->input->get('to_date', TRUE)) ? $this->input->get('to_date', TRUE) : date('m/d/Y', strtotime(date('Y-m-d')));

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));
		$survey_id = $this->input->get('survey_id', TRUE);
		$clarray = array();
		$clarray['name'] = 'surveyResultDateImport';
		$clarray['clicked'] = date('Y-m-d H:i:s');
		$clarray['clicked_by'] = $this->session->userdata['data_logged_in']['id'];
		$clarray['ip_address'] = $_SERVER['REMOTE_ADDR'];
		$clarray['parameters'] = $f_dates.', '.$t_dates.', '.$survey_id;
		
		$this->ClickLogs_model->setClickLog($clarray);
		//print_r($f_dates);
		//print_r($t_dates);
		//echo $survey_id;
		
		//if($id == null)	$id = $this->input->get('id', TRUE);
		$questions = $this->SurveyResults_model->getUserResults($f_dates, $t_dates, $survey_id);
		//exit();
		//print_r($questions); exit();

		header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=\"User_Survey_" . $from_date . "-" . $to_date . ".csv\"");
		header("Pragma: no-cache");
		header("Expires: 0");
		$header = array_keys(array_values($questions)[0]);
		//$header = array('Date', 'ID', 'Name', 'Break', 'Working', 'Total'); //array_keys(array_values($questions)[0]);
		$handle = fopen('php://output', 'w');
		fputcsv($handle, $header);
		foreach ($questions as $product) {
			fputcsv($handle, $product);//fputcsv($handle, array($product['date'] , $product['sip'], $product['name'], $product['Break'], $product['Working'], $product['total']));
		}
		fclose($handle);
		exit();

		/*if ($questions) {
			$this->response($questions, 200); // 200 being the HTTP response code
		} else {
			$this->response(array('error' => 'Couldn\'t find any question!'), 404);
		}*/
	}
} 
