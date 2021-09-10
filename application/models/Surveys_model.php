<?php
class Surveys_model extends CI_Model {
 
    /**
    * Responsable for au to load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
	} 
	public function setSurvey($survey = array()){
		$insert = $this->db->insert('surveys', $survey);
		return $this->db->insert_id();
	   // return $insert;
	}
	public function getSurveyDashboard($id = null){
		
		$this->db->select('sq.id as question_id, u2.id as user_id, sq.name as question, sq.short_name as short_question, u2.name, c.id as campaign_id, c.name as campaign_name, count(sr.result) total, sum(case when sr.result in (0,1,2) then 1 else 0 end) dsat, sum(case when sr.result in (3) then 1 else 0 end) nut, sum(case when sr.result in (4,5) then 1 else 0 end) csat');
		$this->db->from('surveys as s');
		$this->db->join('survey_results as sr', 's.id = sr.survey_id');
		$this->db->join('survey_questions as sq', 'sq.id = sr.question_id');
		$this->db->join('survey_users as su', 'sr.user_id = su.user_id');

		$this->db->join('access_campiagns as ac', 'ac.user_id = su.user_id');
		$this->db->join('monitoring_for as c', 'c.id = ac.campiagn_id');
		
		$this->db->join('users as u', 'sr.user_id = u.id');
		$this->db->join('users as u2', 'u.reporting_id = u2.id');
		$this->db->where('u.role_id', 11);
		$this->db->where('c.id != ', 9);
		$this->db->where('sq.id >= ', 1);
		$this->db->where('s.id', $id);
		$this->db->group_by('question_id, user_id, question, short_question, u2.name, campaign_id, campaign_name');
		// if($id != null){
		// 	$this->db->where('id', $id);
		// }		
		// if($status != null){
		// 	$this->db->where('status', $status);
		// }
		
		// if($region_id != '' && $region_id != null && $region_id > 0){
		// 	$this->db->where('areas.region_id', $region_id);
		// }
		// if($area_id != '' && $area_id != null && $area_id > 0){
		// 	$this->db->where('areas.id', $area_id);
		// }

		//$this->db->like('name', $name, 'none');
		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);
		
		 //$a = ;
	     // $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
		$query = $this->db->get();
		//echo '<pre>';
		//print_r($query->result_array()); 
		
		$result = array();
		foreach($query->result_array() as $key => $index){
			if(!isset($result['overall'][0]['dsat'])) $result['overall'][0]['dsat'] = 0;
			if(!isset($result['overall'][0]['nut'])) $result['overall'][0]['nut'] = 0;
			if(!isset($result['overall'][0]['csat'])) $result['overall'][0]['csat'] = 0;
			if(!isset($result['overall'][0]['total'])) $result['overall'][0]['total'] = 0;

			$result['overall'][0]['dsat']+= $index['dsat'];
			$result['overall'][0]['nut']+= $index['nut'];
			$result['overall'][0]['csat']+= $index['csat'];
			$result['overall'][0]['total']+= $index['total'];
			$result['overall'][0]['title']= 'Overall Score';
			
			if(!isset($result['overall'][$index['campaign_id']]['dsat'])) $result['overall'][$index['campaign_id']]['dsat'] = 0;
			if(!isset($result['overall'][$index['campaign_id']]['nut'])) $result['overall'][$index['campaign_id']]['nut'] = 0;
			if(!isset($result['overall'][$index['campaign_id']]['csat'])) $result['overall'][$index['campaign_id']]['csat'] = 0;
			if(!isset($result['overall'][$index['campaign_id']]['total'])) $result['overall'][$index['campaign_id']]['total'] = 0;

			$result['overall'][$index['campaign_id']]['dsat']+= $index['dsat'];
			$result['overall'][$index['campaign_id']]['nut']+= $index['nut'];
			$result['overall'][$index['campaign_id']]['csat']+= $index['csat'];
			$result['overall'][$index['campaign_id']]['total']+= $index['total'];
			$result['overall'][$index['campaign_id']]['title']= $index['campaign_name'];

			
		//	if(!isset($result['overalltl']['title'])) $result['overalltl']['title'] = 'Teamlead Wise Overall Score';			
			if(!isset($result['overalltl'][$index['user_id']]['dsat'])) $result['overalltl'][$index['user_id']]['dsat'] = 0;
			if(!isset($result['overalltl'][$index['user_id']]['nut'])) $result['overalltl'][$index['user_id']]['nut'] = 0;
			if(!isset($result['overalltl'][$index['user_id']]['csat'])) $result['overalltl'][$index['user_id']]['csat'] = 0;
			if(!isset($result['overalltl'][$index['user_id']]['total'])) $result['overalltl'][$index['user_id']]['total'] = 0;

			$result['overalltl'][$index['user_id']]['dsat']+= $index['dsat'];
			$result['overalltl'][$index['user_id']]['nut']+= $index['nut'];
			$result['overalltl'][$index['user_id']]['csat']+= $index['csat'];
			$result['overalltl'][$index['user_id']]['total']+= $index['total'];
			$result['overalltl'][$index['user_id']]['name'] = $index['name'];
			$result['overalltl'][$index['user_id']]['uid'] = $index['user_id'];
			$result['overalltl'][$index['user_id']]['title'] = 'Teamlead Wise Overall Score';

			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////
			
			if(!isset($result['questions'][$index['question_id']]['dsat'])) $result['questions'][$index['question_id']]['dsat'] = 0;
			if(!isset($result['questions'][$index['question_id']]['nut'])) $result['questions'][$index['question_id']]['nut'] = 0;
			if(!isset($result['questions'][$index['question_id']]['csat'])) $result['questions'][$index['question_id']]['csat'] = 0;
			if(!isset($result['questions'][$index['question_id']]['total'])) $result['questions'][$index['question_id']]['total'] = 0;

			$result['questions'][$index['question_id']]['dsat']+= $index['dsat'];
			$result['questions'][$index['question_id']]['nut']+= $index['nut'];
			$result['questions'][$index['question_id']]['csat']+= $index['csat'];
			$result['questions'][$index['question_id']]['total']+= $index['total'];
			$result['questions'][$index['question_id']]['title']= $index['question'];
			$result['questions'][$index['question_id']]['short_title']= $index['short_question'];

			if(!isset($result['questions'][$index['question_id']]['tl'][$index['user_id']]['dsat'])) $result['questions'][$index['question_id']]['tl'][$index['user_id']]['dsat'] = 0;
			if(!isset($result['questions'][$index['question_id']]['tl'][$index['user_id']]['nut'])) $result['questions'][$index['question_id']]['tl'][$index['user_id']]['nut'] = 0;
			if(!isset($result['questions'][$index['question_id']]['tl'][$index['user_id']]['csat'])) $result['questions'][$index['question_id']]['tl'][$index['user_id']]['csat'] = 0;
			if(!isset($result['questions'][$index['question_id']]['tl'][$index['user_id']]['total'])) $result['questions'][$index['question_id']]['tl'][$index['user_id']]['total'] = 0;

			$result['questions'][$index['question_id']]['tl'][$index['user_id']]['dsat']+= $index['dsat'];
			$result['questions'][$index['question_id']]['tl'][$index['user_id']]['nut']+= $index['nut'];
			$result['questions'][$index['question_id']]['tl'][$index['user_id']]['csat']+= $index['csat'];
			$result['questions'][$index['question_id']]['tl'][$index['user_id']]['total']+= $index['total'];
			$result['questions'][$index['question_id']]['tl'][$index['user_id']]['title'] = $index['name'];
			
			

			if(!isset($result['users'][$index['user_id']][$index['question_id']]['dsat'])) $result['users'][$index['user_id']][$index['question_id']]['dsat'] = 0;
			if(!isset($result['users'][$index['user_id']][$index['question_id']]['nut'])) $result['users'][$index['user_id']][$index['question_id']]['nut'] = 0;
			if(!isset($result['users'][$index['user_id']][$index['question_id']]['csat'])) $result['users'][$index['user_id']][$index['question_id']]['csat'] = 0;
			if(!isset($result['users'][$index['user_id']][$index['question_id']]['total'])) $result['users'][$index['user_id']][$index['question_id']]['total'] = 0;

			$result['users'][$index['user_id']][$index['question_id']]['dsat']+= $index['dsat'];
			$result['users'][$index['user_id']][$index['question_id']]['nut']+= $index['nut'];
			$result['users'][$index['user_id']][$index['question_id']]['csat']+= $index['csat'];
			$result['users'][$index['user_id']][$index['question_id']]['total']+= $index['total'];
			$result['users'][$index['user_id']][$index['question_id']]['title'] = $index['short_question'];
			$result['users'][$index['user_id']][$index['question_id']]['uid'] = $index['user_id'];
			$result['users'][$index['user_id']][$index['question_id']]['name'] = $index['name'];


		}
		$result['overall']= array_values($result['overall']);
		$result['overalltl']= array_values($result['overalltl']);
		$result['questions']= array_values($result['questions']);
		foreach($result['questions'] as $key => $index){
			//if($key == 'tl')
			$result['questions'][$key]['tl']= array_values($index['tl']);
		}
		$result['users']= array_values($result['users']);
		foreach($result['users'] as $key => $index){
			//if($key == 'tl')
			$result['users'][$key]= array_values($index);
		}
		return $result;
		echo '<pre>';
		print_r($result); 
		exit();
	    return array('surveys' =>  $query->result_array());
	}
	public function find($id = null, $status = null){
		$this->db->select('id, name, from_date, to_date, users, questions, campaigns, created_by');
		$this->db->from('surveys');
		//$this->db->join('users', 'users.area_id = areas.id');
		if($id != null){
			$this->db->where('id', $id);
		}		
		if($status != null){
			$this->db->where('status', $status);
		}
		
		// if($region_id != '' && $region_id != null && $region_id > 0){
		// 	$this->db->where('areas.region_id', $region_id);
		// }
		// if($area_id != '' && $area_id != null && $area_id > 0){
		// 	$this->db->where('areas.id', $area_id);
		// }

		//$this->db->like('name', $name, 'none');
		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);
		
		 //$a = ;
	     // $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get();
	    return array('surveys' =>  $query->result_array());
	}
    function update_area($data) {

		$id = $data['id'];
		unset($data['id']);
		//print_r($data); exit();
		
		$insert = array();
		// $insert[''] = $data[''];

		$sess_data 	    	= $this->session->userdata;
		$insert['name'] 	= $data['name'];
		$insert['status'] 	= $data['status'];	
		
		$insert['region_id'] 	= isset($data['region_id'])?$data['region_id']:0;
		
		
		//$insert['lastUpdateUser'] = $sess_data['data_logged_in']['id'];

		
		if ($id == 0) {
			$insert['added']   = date("Y-m-d H:i:s");	
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
    public function get_areas($id = null, $region= null){
     	$sess_data 	= $this->session->userdata;
		//return $sess_data;
		$up_user 	= $sess_data['data_logged_in']['id'];
		$role_id 	= $sess_data['data_logged_in']['role_id'];
		$area_id 	= $sess_data['data_logged_in']['area_id'];

		$this->db->select('id, name, region_id, status');
		$this->db->from('areas');
		$this->db->where('status', 1);
		if($area_id != '' && $area_id != null && $area_id > 0){
			$this->db->where('id', $area_id);
		}
		if($id > 0 && $id != '' && $id != null){
			$this->db->where('id', $id);
		}
		if($region > 0 && $region != '' && $region != null){
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
    public function getAllAreas($region_id = '', $area_id=''){
		$this->db->select('areas.id, areas.name, users.name as amanager, users.id as amanager_id');
		$this->db->from('areas');
		$this->db->join('users', 'users.area_id = areas.id');
		$this->db->where('areas.status', 1);
		$this->db->where('users.role_id', 6);
		if($region_id != '' && $region_id != null && $region_id > 0){
			$this->db->where('areas.region_id', $region_id);
		}
		if($area_id != '' && $area_id != null && $area_id > 0){
			$this->db->where('areas.id', $area_id);
		}

		//$this->db->like('name', $name, 'none');
		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);
		
		 //$a = ;
	     // $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get();
	    return $query->result_array();
	}
    public function getAreaID($name){
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
	public function getAllWings($id){
		$this->db->select('id,name');
		$this->db->from('wings');//(case closable when 1 then true else "" end) as
		
	  	$this->db->order_by('name', 'asc');
		$query = $this->db->get();
		//print_r($query->result_array());exit();
		//return $query->result();
		return array('wings' => $query->result_array());
	}
	public function getComplainCategories($id){
		$this->db->select('id,name');
		$this->db->from('categories');
		$this->db->where('status', 1);
		if($id != null){
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
	public function addCategories($category){
		$insert = $this->db->insert('categories', $category);
	    return $insert;
	}
	public function updateCategories($category, $id){
	//	print_r($category);
		$this->db->where('id', $id);
		$this->db->update('categories', $category);
		$report = array();
	//	$report['error'] = $this->db->_error_number();
	//	$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

    /**
    * Delete user
    * @param int $id - user id
    * @return boolean
    */
	function deleteCategorie($id){
		$this->db->where('categorie_id', $id);
		$this->db->delete('categories'); 
	}
	public function getAllClosableCategories($id){
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
