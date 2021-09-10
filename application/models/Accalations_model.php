<?php
class Accalations_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		parent::__construct();
		$this->load->database();
	}
	public function getAccalationsCount($phone = null, $fields = null) {
		$this->db->select('*');
		if($phone != null && $fields != null){
			$this->db->where($fields, $phone);
		}
		
		$query = $this->db->count_all_results('accalations');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('accalationsCount' => $query);
	}
	public function save($accalation) {
		$insert = $this->db->insert('accalations', $accalation);
		return $this->db->insert_id();
		//return $insert;
	}
	///////////////////////////
	///////////////////////////////
	////////////////////////////////
	////////////////////////////////
	public function getDownloadAccalations($accalation_date = null, $accalation_status = null, $accalation_sub_department = null ) {
		$this->db->select('accalations.id, ticket_id, booking_id, domains.name  city, dept.name department_name, subdept.name sub_department_name, accalations.name, mobile, email, statement, cname, cmobile, cstatement, complaint_states.name status, users.name, accalations.created')
		->from('accalations')
		->join('domains', 'domains.id = accalations.domain_id')
		->join('users', 'users.id = accalations.created_by', 'left outer')
		->join('complaint_states', 'complaint_states.id = accalations.state_id', 'left outer') //, 'left outer'
		->join('departments dept', 'dept.id = accalations.department_id', 'left outer') //, 'left outer'
		->join('departments subdept', 'subdept.id = accalations.sub_department_id', 'left outer');

		if($accalation_date != null){
			$this->db->where('date(accalations.created)', $accalation_date);
		}
		if($accalation_status != null){
			$this->db->where('state_id', $accalation_status);
		} 
		if($accalation_sub_department != null){
			$this->db->where('sub_department_id', $accalation_sub_department);
		}
		
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('accalations.created', 'desc');
		$query = $this->db->get();
		return $query->result_array();
		//print_r($result); exit();
		/*foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['state_id'] == 6) {
				$result[$key]['status'] = 'Pending';
			} else {
				$result[$key]['status'] = 'Closed';
			}

		}*/
		
		//return $query->result();
		//print_r($query->result());
		//$result = $query->result_array();
		//return array('accalations' => $result);
	}
	public function getSingleAccalations($limit_start = null, $limit_end = null, $phone = null, $field = null) {
		$this->db->select('id, ticket_id, booking_id, domain_id, department_id, sub_department_id, name, mobile, email, statement, cname, cmobile, cstatement, state_id, created_by, created');
		$this->db->from('accalations');

		$this->db->like($field, $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('created', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['state_id'] == 6) {
				$result[$key]['status'] = true;
			} else {
				$result[$key]['status'] = false;
			}

		}
		
		//return $query->result();
		//print_r($query->result());
		return array('accalations' => $result);
	}
	public function getAllAccalations($limit_start = null, $limit_end = null, $phone = null, $field = null, $accalation_date = null, $accalation_status = null, $accalation_sub_department = null ) {
		$this->db->select('id, ticket_id, booking_id, domain_id, department_id, sub_department_id, name, mobile, email, statement, cname, cmobile, cstatement, state_id, created_by, created');
		$this->db->from('accalations');

		if($accalation_date != null){
			$this->db->where('date(created)', $accalation_date);
		}
		if($accalation_status != null){
			$this->db->where('state_id', $accalation_status);
		} 
		if($accalation_sub_department != null){
			$this->db->where('sub_department_id', $accalation_sub_department);
		}
		$this->db->like($field, $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('created', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['state_id'] == 6) {
				$result[$key]['status'] = true;
			} else {
				$result[$key]['status'] = false;
			}

		}
		
		//return $query->result();
		//print_r($query->result());
		return array('accalations' => $result, 'meta' => array('total'=> $this->getAccalationsCount( $phone, $field)));
	}
	public function getAllOpenedAccalations($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complains');
		$this->db->where('status', 1);
		$this->db->where('searched', 0);

		$this->db->order_by('date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();

		return array('openedAccalations' => $result);
	}
	public function getOpenAccalationsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 1);
		$this->db->where('searched', 0);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCountNew' => $query);
	}
	public function getAllClosedAccalations($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,closed_date,status,user_id');
		$this->db->from('complains');
		$this->db->where('status', 0);
		//$this->db->where('searched', 0);
		$this->db->order_by('closed_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}

		$query = $this->db->get();
		$result = $query->result_array();

		return array('closedAccalations' => $result);
	}
	public function getAllViewedAccalations($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,searched_date,status,user_id');
		$this->db->from('complains');
		$this->db->where('status', 1);
		$this->db->where('searched', 1);
		$this->db->order_by('searched_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}

		$query = $this->db->get();
		$result = $query->result_array();

		return array('viewedAccalations' => $result);
	}
	public function getViewAccalationsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 1);
		$this->db->where('searched', 1);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCountView' => $query);
	}
	public function getCloseAccalationsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 0);
		//$this->db->where('searched', 0);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCountClose' => $query);
	}
	
	function update_complain($data) {
		$id = $data['id'];
		unset($data['id']);
		//$data['password'] = $this->__encrip_password($data['password']);
		//$data['user_name'] = str_replace(' ','',$data['name']);
		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))
		
		if ($data['status'] == 0 && $id == 0) {
			$data['user_id'] = $data['closed_by']   = $sess_data['data_logged_in']['id'];
			$data['date']    = $data['closed_date'] = date("Y-m-d H:i:s");
			$data['description'] = base64_decode($data['description']);
			$data['status']  = 0; //Acknowledgement - Temp Restoration High ARPU
		}
		else if ($data['status'] == 0 && $id != 0) {
			$data['closed_by'] = $sess_data['data_logged_in']['id'];
			$data['closed_date'] = date("Y-m-d H:i:s");
		} else {
			$data['user_id'] = $sess_data['data_logged_in']['id'];
			$data['date'] = date("Y-m-d H:i:s");
			$data['status'] = 1;
			$data['description'] = base64_decode($data['description']);
		}
		
		if ($id == 0) {
			$insert = $this->db->insert('complains', $data);
		} else {
			$this->db->where('id', $id);
			$insert = $this->db->update('complains', $data);
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
	public function addAccalation($complain) {
		$insert = $this->db->insert('complains', $data);
		return $insert;
	}
	public function updateAccalation($complain) {
		$this->db->where('complain_id', $id);
		$this->db->update('complains', $data);
		$report = array();
		$report['error'] = $this->db->_error_number();
		$report['message'] = $this->db->_error_message();
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
	function deleteAccalation($id) {
		$this->db->where('complain_id', $id);
		$this->db->delete('complains');
	}
	function update_searched($id) {

		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complains');
		$this->db->where('searched', 0);
		$this->db->where('id', $id);

		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result);
		if (!empty($result)) {
			$sess_data = $this->session->userdata;
			$data['searched_by'] = $sess_data['data_logged_in']['id'];
			$data['searched_date'] = date("Y-m-d H:i:s");
			$data['searched'] = 1;
			$this->db->where('id', $id);
			$insert = $this->db->update('complains', $data);
		}
		//	return $insert;

	}
	function getAccalationsReport($id) {

		$this->db->select('phone,description,DATE_FORMAT(date, "%d:%m:%Y - %H:%i:%s") as date');
		$this->db->from('complains');
		$this->db->where('type', $id);

		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		return $result;

	}
	public function getAccalationsWorkCode($id = null, $fDate = null, $tDate = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
		$whereClause = '';
		$search_sql = '';
		$amt = 10;
		$start = 0;
		//print_r(empty($fDate));
		//print_r(empty($tDate));
		$from_date 	= !empty($fDate) ? $fDate : date('m/d/Y',  strtotime(date('Y-m-d')));
		$to_date 	= !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		

		//$from_date = !empty($fDate2) ? $fDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//$to_date = !empty($tDate2) ? $tDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//print_r($from_date);
		//print_r($to_date);
		//exit();
		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));
		$whereClause .= "and date(date) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(date) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";
		
  		if(!empty($fDate2) &&  !empty($tDate2)){
  			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";	
  		}
  		if(!empty($entered)){
  			$whereClause .= "and user_id = '" . $entered . "'   ";	
  		}
  		if(!empty($closed)){
  			$whereClause .= "and closed_by = '" . $closed . "'  ";
  		}
  		if(!empty($type)){
  			$whereClause .= "and type = '" . $type . "'  ";
  		}
		//$whereClause .= " and date(added_Date) BETWEEN '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "' and '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		if (!empty($sSearch)) {
			$stext = addslashes($sSearch);
			$whereClause .= "and type in (select id from categories where name  like '%$stext%') ";
		}
		//$amt = isset($iDisplayLength)?
		if (isset($iDisplayLength)) {
			$amt = (int) $iDisplayLength;
			if ($amt > 100 || $amt < 10) {
				$amt = 10;
			}
		}
		if (isset($iDisplayStart)) {
			$start = (int) $iDisplayStart;
			if ($start < 0) {
				$start = 0;
			}
		}
		$cols = array('phone', 'name', 'ui_name', 'date',  'cb_name', 'closed_date');
		$scol=0; $sdir='asc';
		//$iSortCol = null, $ = null
		if(isset($iSortCol)){
			$scol = (int)$iSortCol;
			if($scol>5 || $scol<0) $scol=0;
		}
		if(isset($iSortDir)){
			if($iSortDir!='asc') $sdir='desc';
		}
		$scol_name = $cols[$scol];
		$sort = $scol_name.' '.$sdir; 
		 /*
		$subQry = "select type , IFNULL((select name from categories where id = type), 'Workcode Missing') as name
						, sum(case when status = 1 and close_date >= now() then 1 else 0 end) as tatover
						, sum(case when status = 1 and close_date < now() then 1 else 0 end) as tatremain
						, sum(case when status = 0 is not null and close_date <= closed_date then 1 else 0 end) as tatontime
						, sum(case when status = 0 is not null and close_date > closed_date then 1 else 0 end) as tatoftime
					 from complains
					where type != ''
				       $whereClause
				  group by type, name
				  ";
*/

		$subQry = "select type, id, phone, date, status, user_id, closed_by, IFNULL(closed_date,'') as closed_date 
						, IFNULL((select name from categories where id = type), 'Category Missing') as name
						, IFNULL((select name from users where id = user_id), 'Unknown') as ui_name
						, IFNULL((select name from users where id = closed_by), '') as cb_name
						
					 from complains
					where type != ''
				    $whereClause
				  ";
		//print_r($subQry);

		$qry = "select phone, name, ui_name, date,  cb_name, closed_date from (" . $subQry . ") a order by $sort limit $start, $amt";
		//print_r($qry);
		$query_count = $this->db->query('select count(name) as cnt from (' . $subQry . ') b');
		$count = $query_count->result_array();
		$total_records = $count[0]['cnt'];
		$query = $this->db->query($qry);
		$result = $query->result_array();
		$return = array();
		foreach ($result as $key => $index) {
			$return[] = array($index['phone'], $index['name'], $index['ui_name'], $index['date'],  $index['cb_name'], $index['closed_date']);

		}
		return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

	}
	public function getAccalationsWorkCodeMsisdnImport($id = null, $fDate = null, $tDate = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
		$whereClause = '';
		$search_sql = '';
		$amt = 10;
		$start = 0;
		//print_r(empty($fDate));
		//print_r(empty($tDate));
		$from_date = !empty($fDate) ? $fDate : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		//$from_date = !empty($fDate2) ? $fDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//$to_date = !empty($tDate2) ? $tDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//print_r($from_date);
		//print_r($to_date);
		//exit();
		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));
		$whereClause .= "and date(date) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(date) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";
		
  		if(!empty($fDate2) &&  !empty($tDate2)){
  			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";	
  		}
  		if(!empty($entered)){
  			$whereClause .= "and user_id = '" . $entered . "'   ";	
  		}
  		if(!empty($closed)){
  			$whereClause .= "and closed_by = '" . $closed . "'  ";
  		}
  		if(!empty($type)){
  			$whereClause .= "and type = '" . $type . "'  ";
  		}
		//$whereClause .= " and date(added_Date) BETWEEN '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "' and '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		$subQry = "select type, id, phone, date, status, user_id, IFNULL(closed_date,'') as closed_date, closed_by
						, IFNULL((select name from categories where id = type), 'Workcode Missing') as name
						, IFNULL((select name from users where id = user_id), 'Unknown') as ui_name
						, IFNULL((select name from users where id = closed_by), '') as cb_name
						
					 from complains
					where type != ''
				       $whereClause
				  ";
		//print_r($subQry); exit();

		$qry = "select phone, name, ui_name as entered_by, date, cb_name as closed_by, closed_date from (" . $subQry . ") a ";
		$query = $this->db->query($qry);
		//$result = $query->result_array();
		return $query->result_array();


		

	}

}
?>
