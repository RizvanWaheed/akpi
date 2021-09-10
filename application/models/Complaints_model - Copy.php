<?php
class Complaints_Copy_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function getAllComplaintCallActivities($id = null, $fDate = null, $tDate = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null, $region = null, $area = null, $territory = null, $report = null) {

		$whereClause = '';
		$search_sql = '';
		$amt = 10;
		$start = 0;

		$from_date = !empty($fDate) ? $fDate : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		//print_r($from_date);
		//print_r($to_date);
		//exit();

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		$whereClause .= "date(complaints.created) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(complaints.created) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		if (!empty($sSearch)) {
			$stext = addslashes($sSearch);
			$whereClause .= " and complaints.msisdn like '%$stext%' ";
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
		//if ($report == 'voq') {
		$cols = array('compmsisdn', 'compname', 'compcontact', 'compaddress'
			, 'compurchase', 'comproduct', 'compmodal', 'compproblem'
			, 'compstatus', 'compassignto', 'comppart', 'comppartprice', 'compcharges');

		/*<th >MSISDN</th>
			                <th >Complainer Name</th>
			                <th >Contact No.</th>
			                <th >Address</th>
			                <th >Purchase Date</th><!-- search on these three -->
			                <th >Product</th>
			                <th >Modal</th>
			                <th >Problem</th>
			                <th >Status</th><!-- search on these one -->
			                <th >Assign To</th><!-- search on these two -->
			                <th >Part</th>
			                <th >Part Price</th>
			                <th >Service Charges</th>*/
		//} else {
		//	$cols = array('cumsisdn', 'cuname', 'is_named', 'is_smoker', 'is_eighteen', 'is_met', 'is_remember', 'have_time', 'aided', 'call_status', 'agname', 'aglogin');
		//}
		$scol = 0;
		$sdir = 'asc';
		//$iSortCol = null, $ = null
		if (isset($iSortCol)) {
			$scol = (int) $iSortCol;
			if ($scol > 5 || $scol < 0) {
				$scol = 0;
			}

		}
		if (isset($iSortDir)) {
			if ($iSortDir != 'asc') {
				$sdir = 'desc';
			}

		}
		$scol_name = $cols[$scol];
		$sort = $scol_name . ' ' . $sdir;

		//echo '<pre>';
		$this->db->select('complaints.id as compid, complaints.msisdn as compmsisdn, complaints.part_price as comppartprice
			, complaints.service_price as compcharges, complaints.purchase_date as compurchase
			, customers.name as compname, customers.mobile as compcontact, customers.address as compaddress
			, products.name as comproduct, modals.name as compmodal, problems.name as compproblem
			, spareparts.name as comppart, users.name as compassignto, complaint_states.name as compstatus')
			->from('complaints')
			->join('customers', 'customers.id = complaints.customer_id')
			->join('users', 'users.id = complaints.assigned_to', 'left outer')
			->join('complaint_states', 'complaint_states.id = complaints.state_id', 'left outer') //, 'left outer'
			->join('products', 'products.id = complaints.product_id', 'left outer')
			->join('modals', 'modals.id = complaints.modal_id', 'left outer')
			->join('problems', 'problems.id = complaints.problem_id', 'left outer')
			->join('spareparts', 'spareparts.id = complaints.sparepart_id', 'left outer')
		//->where('consumers.name !=', '')
			->where($whereClause);
		/*if ($region != '' && $region != null && $region > 0) {
				$this->db->where('BrandAmbassador.regionID', $region);
			}
			if ($territory != '' && $territory != null && $territory > 0) {
				$this->db->where('BrandAmbassador.territoryID', $territory);
			}
			if ($area != '' && $area != null && $area > 0) {
				$this->db->where('BrandAmbassador.areaID', $area);

		*/

		$total_records = $this->db->get()->num_rows();

		$this->db->select('complaints.id as compid, complaints.msisdn as compmsisdn, complaints.part_price as comppartprice
			, complaints.service_price as compcharges, complaints.purchase_date as compurchase
			, customers.name as compname, customers.mobile as compcontact, customers.address as compaddress
			, products.name as comproduct, modals.name as compmodal, problems.name as compproblem
			, spareparts.name as comppart, users.name as compassignto, complaint_states.name as compstatus')
			->from('complaints')
			->join('customers', 'customers.id = complaints.customer_id')
			->join('users', 'users.id = complaints.assigned_to')
			->join('complaint_states', 'complaint_states.id = complaints.state_id', 'left outer') //, 'left outer'
			->join('products', 'products.id = complaints.product_id', 'left outer')
			->join('modals', 'modals.id = complaints.modal_id', 'left outer')
			->join('problems', 'problems.id = complaints.problem_id', 'left outer')
			->join('spareparts', 'spareparts.id = complaints.sparepart_id', 'left outer')
		//	->where('consumers.name !=', '')
			->where($whereClause);
		/*if ($region != '' && $region != null && $region > 0) {
				$this->db->where('BrandAmbassador.regionID', $region);
			}
			if ($territory != '' && $territory != null && $territory > 0) {
				$this->db->where('BrandAmbassador.territoryID', $territory);
			}
			if ($area != '' && $area != null && $area > 0) {
				$this->db->where('BrandAmbassador.areaID', $area);

		*/
		//->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
		//->where('BrandAmbassador.status', 'Enabled')
		//->where($whereClause);
		$this->db->order_by($scol_name, $sdir);
		if ($start && $amt) {
			$this->db->limit($amt, $start - 1);
		}
		$more = $this->db->get();
		//$count = $more = $this->db;
		//$total_records = $count->num_rows();;
		//print_r($total_records);

		$query = $more->result_array();
		//$result = $query;

		//print_r($query); exit();
		//$query = $this->db->get()->result_array();
		//'baname', 'baname',

		$return = array();
		foreach ($query as $key => $index) {
			$return[] = array($index['compmsisdn'], $index['compname'], $index['compcontact'], $index['compaddress']
				, $index['compurchase'], $index['comproduct'], $index['compmodal'], $index['compproblem']
				, $index['compstatus'], $index['compassignto'], $index['comppart'], $index['comppartprice'], $index['compcharges']);
			//$return[] = array($index['cumsisdn'], $index['cuname'], $isName, $isSmoker, $isEighteen, $isMet, $isRemembered, $haveTime, $aided, $call_status, $bagname);
		}

		return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

		exit();

		//print_r($result);
		//return $result;
	}
	public function getAllComplaints($limit_start = null, $limit_end = null, $phone = null) {

		$this->db->select('complaints.id, complaints.msisdn, product_id, purchase_date, modal_id
			, complaints.status, problem_id, customers.name, customers.mobile, customers.address, complaints.state_id');
		$this->db->from('complaints');
		$this->db->join('customers', 'customers.id = complaints.customer_id');
		$this->db->where('complaints.msisdn', $phone);
		$this->db->or_where('complaints.id', $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('complaints.created', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['status'] != 0) {
				$result[$key]['status'] = true;
			} else {
				$result[$key]['status'] = false;
			}

		}

		//return $query->result();
		//print_r($query->result());
		return array('complaints' => $result);
	}
	public function getAllOpenedComplaints($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complaints');
		$this->db->where('status', 1);
		$this->db->where('searched', 0);

		$this->db->order_by('date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();

		return array('openedComplaints' => $result);
	}
	public function getOpenComplaintsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 1);
		$this->db->where('searched', 0);
		$query = $this->db->count_all_results('complaints');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complaintsCountNew' => $query);
	}
	public function getAllClosedComplaints($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,closed_date,status,user_id');
		$this->db->from('complaints');
		$this->db->where('status', 0);
		//$this->db->where('searched', 0);
		$this->db->order_by('closed_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}

		$query = $this->db->get();
		$result = $query->result_array();

		return array('closedComplaints' => $result);
	}
	public function getAllViewedComplaints($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,searched_date,status,user_id');
		$this->db->from('complaints');
		$this->db->where('status', 1);
		$this->db->where('searched', 1);
		$this->db->order_by('searched_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}

		$query = $this->db->get();
		$result = $query->result_array();

		return array('viewedComplaints' => $result);
	}
	public function getViewComplaintsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 1);
		$this->db->where('searched', 1);
		$query = $this->db->count_all_results('complaints');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complaintsCountView' => $query);
	}
	public function getCloseComplaintsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 0);
		//$this->db->where('searched', 0);
		$query = $this->db->count_all_results('complaints');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complaintsCountClose' => $query);
	}
	public function getComplaintsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('msisdn', $phone);
		$query = $this->db->count_all_results('complaints');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complaintsCount' => $query);
	}
	public function update_complaints_data($data, $id) {
		/*$id = $data['id'];
		unset($data['id']);*/
		//$data['password'] = $this->__encrip_password($data['password']);
		//$data['user_name'] = str_replace(' ','',$data['name']);
		//$sess_data = $this->session->userdata;

		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))

		/*if ($data['status'] == 0 && $id == 0) {
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

		*/

		$this->db->where('id', $id);
		$this->db->update('complaints', $data);
		return true;
		/*} else {
			$this->db->where('id', $id);
			$insert = $this->db->update('complaints', $data);
		}*/
		/*return $insert;
			//$report = array();
			//$report['error'] = $this->db->_error_number();
			//$report['message'] = $this->db->_error_message();
			if ($report !== 0) {
				return true;
			} else {
				return false;
		*/
	}
	public function update_complaints($data) {
		/*$id = $data['id'];
		unset($data['id']);*/
		//$data['password'] = $this->__encrip_password($data['password']);
		//$data['user_name'] = str_replace(' ','',$data['name']);
		$sess_data = $this->session->userdata;
		$data['created_by'] = $sess_data['data_logged_in']['id'];
		$data['created'] = date("Y-m-d H:i:s");
		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))

		/*if ($data['status'] == 0 && $id == 0) {
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

		*/
		$insert = $this->db->insert('complaints', $data);
		return $this->db->insert_id();
		/*} else {
			$this->db->where('id', $id);
			$insert = $this->db->update('complaints', $data);
		}*/
		/*return $insert;
			//$report = array();
			//$report['error'] = $this->db->_error_number();
			//$report['message'] = $this->db->_error_message();
			if ($report !== 0) {
				return true;
			} else {
				return false;
		*/
	}
	public function addComplain($complain) {
		$insert = $this->db->insert('complaints', $data);
		return $insert;
	}
	public function updateComplain($complain) {
		$this->db->where('complain_id', $id);
		$this->db->update('complaints', $data);
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
	function deleteComplain($id) {
		$this->db->where('complain_id', $id);
		$this->db->delete('complaints');
	}
	function update_searched($id) {

		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complaints');
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
			$insert = $this->db->update('complaints', $data);
		}
		//	return $insert;

	}
	function getComplaintsReport($id) {

		$this->db->select('phone,description,DATE_FORMAT(date, "%d:%m:%Y - %H:%i:%s") as date');
		$this->db->from('complaints');
		$this->db->where('type', $id);

		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		return $result;

	}
	public function getComplaintsWorkCode($id = null, $fDate = null, $tDate = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
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

		if (!empty($fDate2) && !empty($tDate2)) {
			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";
		}
		if (!empty($entered)) {
			$whereClause .= "and user_id = '" . $entered . "'   ";
		}
		if (!empty($closed)) {
			$whereClause .= "and closed_by = '" . $closed . "'  ";
		}
		if (!empty($type)) {
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
		$cols = array('phone', 'name', 'ui_name', 'date', 'cb_name', 'closed_date');
		$scol = 0;
		$sdir = 'asc';
		//$iSortCol = null, $ = null
		if (isset($iSortCol)) {
			$scol = (int) $iSortCol;
			if ($scol > 5 || $scol < 0) {
				$scol = 0;
			}

		}
		if (isset($iSortDir)) {
			if ($iSortDir != 'asc') {
				$sdir = 'desc';
			}

		}
		$scol_name = $cols[$scol];
		$sort = $scol_name . ' ' . $sdir;
		/*
			$subQry = "select type , IFNULL((select name from categories where id = type), 'Workcode Missing') as name
							, sum(case when status = 1 and close_date >= now() then 1 else 0 end) as tatover
							, sum(case when status = 1 and close_date < now() then 1 else 0 end) as tatremain
							, sum(case when status = 0 is not null and close_date <= closed_date then 1 else 0 end) as tatontime
							, sum(case when status = 0 is not null and close_date > closed_date then 1 else 0 end) as tatoftime
						 from complaints
						where type != ''
					       $whereClause
					  group by type, name
					  ";
		*/

		$subQry = "select type, id, phone, date, status, user_id, closed_by, IFNULL(closed_date,'') as closed_date
						, IFNULL((select name from categories where id = type), 'Category Missing') as name
						, IFNULL((select name from users where id = user_id), 'Unknown') as ui_name
						, IFNULL((select name from users where id = closed_by), '') as cb_name

					 from complaints
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
			$return[] = array($index['phone'], $index['name'], $index['ui_name'], $index['date'], $index['cb_name'], $index['closed_date']);

		}
		return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

	}
	public function getComplaintsWorkCodeMsisdnImport($id = null, $fDate = null, $tDate = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
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

		if (!empty($fDate2) && !empty($tDate2)) {
			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";
		}
		if (!empty($entered)) {
			$whereClause .= "and user_id = '" . $entered . "'   ";
		}
		if (!empty($closed)) {
			$whereClause .= "and closed_by = '" . $closed . "'  ";
		}
		if (!empty($type)) {
			$whereClause .= "and type = '" . $type . "'  ";
		}
		//$whereClause .= " and date(added_Date) BETWEEN '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "' and '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		$subQry = "select type, id, phone, date, status, user_id, IFNULL(closed_date,'') as closed_date, closed_by
						, IFNULL((select name from categories where id = type), 'Workcode Missing') as name
						, IFNULL((select name from users where id = user_id), 'Unknown') as ui_name
						, IFNULL((select name from users where id = closed_by), '') as cb_name

					 from complaints
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
