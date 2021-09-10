<?php
class SurveyResults_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function getUserResults($from_date, $to_date, $survey_id) {
		$fdate = $from_date[2].'-'.$from_date[0].'-'.$from_date[1];
		$tdate = $to_date[2].'-'.$to_date[0].'-'.$to_date[1];
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];
		/*$qQuery = $this->db->select('id, name')->from('survey_questions')->where('status' , 1)->get();
		$qQueryResult = $qQuery->result_array();
		$queryHeader = ''; 
		foreach($qQueryResult as $key => $index){
			$queryHeader .= ' , case when survey_results.question_id = '.$index['id'].' then survey_results.result end as '.str_replace(" ", "_", str_replace("/", "-", str_replace("'", "", str_replace(",", "", $index['name'])))).' ';
		}
		//echo str_replace("'", "", str_replace(",", "", $queryHeader));
		echo $queryHeader;
		echo '<pre>';
		print_r($qQuery->result_array());
		*/
		$this->db->select('survey_results.user_id,  survey_results.survey_id, survey_results.question_id, survey_results.result, survey_questions.name, surveys.name as sname, users.name as uname,  users.login ,IFNULL(survey_users.completed, 0) as complete, survey_users.feedback' )//, "inactive" as status
		->from('survey_results')
		->join('surveys', 'surveys.id = survey_results.survey_id')		
		->join('users', 'users.id = survey_results.user_id')
		->join('survey_users', 'users.id = survey_users.user_id', 'left outer')
		->join('survey_questions', 'survey_questions.id = survey_results.question_id')
		->where('survey_results.survey_id',  $survey_id);
		
		//->where('surveys.from_date <=', $fdate)
		//->where('surveys.to_date >=', $tdate);
	//	->where('survey_results.user_id in (select user_id from survey_users where user_id = '.$user_id.' )')
	//	->where('modules.campiagn_id >', 0)
	//	->where('survey_results.user_id', $user_id);
		$query = $this->db->get();
		$query_result = $query->result_array();
		$result = array();
		foreach($query_result as $qresult){
			$result[$qresult['user_id']]['SIP'] = $qresult['login'];
			$result[$qresult['user_id']]['Name'] = $qresult['uname'];
			$result[$qresult['user_id']]['Status'] = ($qresult['complete'])?'Complete':'Incomplete';
			$result[$qresult['user_id']]['Feedback'] = $qresult['feedback'];
			$result[$qresult['user_id']][trim($qresult['name'])] = $qresult['result'];
			
		}
		return $result;
		////echo '<pre>';
		//print_r($result);
		//print_r($query->result_array());
		//foreach()
		exit();
		return $query->result_array();
		
		//$this->db->limit(220);
		/*
			$this->db->where('active', 'Y');

	    */
		//$a = ;
		// $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		//return $query->result();
		return array('surveyResults' => $query->result_array());
	}
	public function updation($survey_result) {
		//	print_r($category);
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		
		$survey_result['modified_by'] = $user_id;
		$survey_result['modified'] = date('Y-m-d H:i:s');
		$id = $survey_result['id'];
		unset($survey_result['id']);
		$this->db->where('id', $id);
		return $this->db->update('survey_results', $survey_result);
		// $report = array();
		//	$report['error'] = $this->db->_error_number();
		//	$report['message'] = $this->db->_error_message();
		// if ($report !== 0) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
	public function getMySurvey(){
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		/*$wing_id = $sess_data['data_logged_in']['wing_id'];*/

		$this->db->select('count(survey_results.user_id) as count,  survey_id, (select id from survey_users where `survey_results`.`survey_id` = `survey_users`.`survey_id` 
		AND `survey_users`.`user_id` = `survey_results`.`user_id`) as saved')//, "inactive" as status
		->from('survey_results')
		->join('surveys', 'surveys.id = survey_results.survey_id and surveys.status = 1')
		->where('surveys.from_date <=', date('Y-m-d'))
		->where('surveys.to_date >=', date('Y-m-d'))
	//	->where('survey_results.user_id in (select user_id from survey_users where user_id = '.$user_id.' )')
	//	->where('modules.campiagn_id >', 0)
		->where('survey_results.user_id', $user_id);
		$query = $this->db->get();
		return $query->result_array();
	}
	public function insertion($data){
		return $this->db->insert_batch('survey_results', $data); 
	}
	public function findMy($survey_id) {
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$this->db->select('id, survey_id, question_id, user_id, created_by, created, result');
		$this->db->from('survey_results');
	
		$this->db->where('user_id', $user_id);
		$this->db->where('survey_id', $survey_id);
		
		//$this->db->limit(220);
		/*
			$this->db->where('active', 'Y');

	    */
		//$a = ;
		// $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		//return $query->result();
		return array('surveyResults' => $query->result_array());
	}
	public function find($id=null, $status=1, $survey_id=null) {
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$this->db->select('id, survey_id, question_id, user_id, created_by, created');
		$this->db->from('survey_results');
		if ($id != null) {
			$this->db->where('id', $id);
		}
		else{
			$this->db->where('user_id', $user_id);
		}
		if ($survey_id != null) {
			$this->db->where('survey_id', $survey_id);
		}
		if ($status != null) {
			$this->db->where('status', $status);
		}
		
		//$this->db->limit(220);
		/*
			$this->db->where('active', 'Y');

	    */
		//$a = ;
		// $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		//return $query->result();
		return array('surveyQuestions' => $query->result_array());
	}
	function update_area($data) {

		$id = $data['id'];
		unset($data['id']);
		//print_r($data); exit();

		$insert = array();
		// $insert[''] = $data[''];

		$sess_data = $this->session->userdata;
		$insert['name'] = $data['name'];
		$insert['status'] = $data['status'];

		$insert['region_id'] = isset($data['region_id']) ? $data['region_id'] : 0;

		//$insert['lastUpdateUser'] = $sess_data['data_logged_in']['id'];

		if ($id == 0) {
			$insert['added'] = date("Y-m-d H:i:s");
			$insert['added_by'] = $sess_data['data_logged_in']['id'];
			$insert = $this->db->insert('areas', $insert);

		} else {
			$insert['updated'] = date("Y-m-d H:i:s");
			$insert['updated_by'] = $sess_data['data_logged_in']['id'];
			$this->db->where('id', $id);
			$insert = $this->db->update('areas', $insert);
		}
		return $insert;
		//$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if ($report !== 0) {
			return true;
		} else {
			return false;
		}
	}
	public function get_areas($id = null, $region = null) {
		$sess_data = $this->session->userdata;
		//return $sess_data;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];

		$this->db->select('id, name, region_id, status');
		$this->db->from('areas');
		$this->db->where('status', 1);
		if ($area_id != '' && $area_id != null && $area_id > 0) {
			$this->db->where('id', $area_id);
		}
		if ($id > 0 && $id != '' && $id != null) {
			$this->db->where('id', $id);
		}
		if ($region > 0 && $region != '' && $region != null) {
			$this->db->where('region_id', $region);
		}
		//$this->db->like('name', $name, 'none');

		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);

		//$a = ;
		// $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$query = $this->db->get();
		return array('areas' => $query->result_array());
	}
	public function getAllDepartments($parent_id = null, $fetch = null) {
		$this->db->select('id, name, parent_id, status');
		$this->db->from('departments');
		$this->db->where('status', 1);
		if($parent_id != '' && $parent_id != null){
			$this->db->where('parent_id', $parent_id);
			if($fetch == 'with_parent'){
				$this->db->or_where('id', $parent_id);
			}

		}
		/*if ($region_id != '' && $region_id != null && $region_id > 0) {
				$this->db->where('areas.region_id', $region_id);
			}
			if ($area_id != '' && $area_id != null && $area_id > 0) {
				$this->db->where('areas.id', $area_id);
		*/

		//$this->db->like('name', $name, 'none');
		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);

		//$a = ;
		// $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$query = $this->db->get();
		return $arrayName = array('departments' => $query->result_array());
	}
	public function getAreaID($name) {
		$this->db->select('id');
		$this->db->from('areas');
		$this->db->like('name', $name, 'none');

		//$this->db->where('name', $name);
		//	$this->db->where('status', 1);

		//$a = ;
		// $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$query = $this->db->get();
		return $query->result_array();
	}
	public function getAllWings($id) {
		$this->db->select('id,name');
		$this->db->from('wings'); //(case closable when 1 then true else "" end) as

		$this->db->order_by('name', 'asc');
		$query = $this->db->get();
		//print_r($query->result_array());exit();
		//return $query->result();
		return array('wings' => $query->result_array());
	}
	public function getComplainCategories($id) {
		$this->db->select('id,name');
		$this->db->from('categories');
		$this->db->where('status', 1);
		if ($id != null) {
			$this->db->where('id', $id);
		}
		//$this->db->limit(220);
		/*
			$this->db->where('active', 'Y');

	    */
		//$a = ;
		// $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$this->db->order_by('name', 'asc');
		$query = $this->db->get();
		//return $query->result();
		return array('categories' => $query->result_array());
	}
	public function addCategories($category) {
		$insert = $this->db->insert('categories', $category);
		return $insert;
	}
	public function updateCategories($category, $id) {
		//	print_r($category);
		$this->db->where('id', $id);
		$this->db->update('categories', $category);
		$report = array();
		//	$report['error'] = $this->db->_error_number();
		//	$report['message'] = $this->db->_error_message();
		if ($report !== 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Delete user
	 * @param int $id - user id
	 * @return boolean
	 */
	function deleteCategorie($id) {
		$this->db->where('categorie_id', $id);
		$this->db->delete('categories');
	}
	public function getAllClosableCategories($id) {
		$this->db->select('id');
		$this->db->from('categories');
		$this->db->where('id', $id);
		$this->db->where('status', 1);
		$this->db->where('closable', 1);

		//$a = ;
		// $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
		//print_r($a);
		// exit();
		$query = $this->db->get();
		return $query->result_array();
		//return $query->result();
		//return array('categories' => );
	}

}
?>
