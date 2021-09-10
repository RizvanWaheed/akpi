<?php
class Users_model extends CI_Model {

	/**
	 * Responsable for auto load the database
	 * @return void
	 */
	public $id;
	public $role_id;
	public $center_id;
	public $project_id;
	public $login;
	public $reportee;
	public $reporting;

	public function __construct() {
		//$this->load->database();
		$this->asm_db = $this->load->database('asm', true);
	}
	public function __distructur() {
		$this->asm_db->close();		
	}
	function __encrip_password($password) {
		return md5($password);
	}
	function loginDecode($value){
		return base64_decode(strrev($value));
	}
	function loginEncode($value){
		return strrev(base64_encode($value));
	}
	// function getReportings($user_id, $role_id){
	// 	return strrev(base64_encode($value));
	// }
	function getReportings($id){
		$this->asm_db->select('users.id as id')->from('users')
		->where('users.deleted', 0)
		->join('employees', 'users.employee_id = employees.id')
		->where('employees.reporting_to', $id)
		->order_by('users.id', 'desc');
		$query = $this->asm_db->get();
		return $query->result_array();
	}

	function resetPassword($newPassword, $oldPassword) {
		//print_r($newPassword);
		//print_r($oldPassword);
		$new = $this->__encrip_password($newPassword);
		$old = $this->__encrip_password($oldPassword);

		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['login'];

		$this->db->select('*');
		$this->db->from('users');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where('login', $id);
		$this->db->where('password', $old);
		$this->db->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result);

		if (!empty($result)) {
			$id = $result[0]['id'];
			$data['password'] = $new;
			$this->db->where('id', $id);
			$insert = $this->db->update('users', $data);
			return true;
		} else {
			return false;
		}

	}
	function validate($user_name, $password, $login_ip) {
		$this->asm_db->select('users.id as id, users.role_id as role_id, users.name as name, users.login, , users.employee_id
		, tbl_employees.sub_campaign_id, tbl_employees.campaign_id, tbl_employees.project_id, tbl_employees.center_id
		, (select name from tbl_setups where id = tbl_employees.sub_campaign_id) as subcampaign
		, (select name from tbl_setups where id = tbl_employees.center_id) as center
		, (select name from tbl_setups where id = tbl_employees.campaign_id) as campaign
		, (select name from tbl_setups where id = tbl_employees.project_id) as project')->from('users')
		->where('users.deleted', 0)
		->where('login', $user_name)->where('password', $password)
		->join('employees', 'users.employee_id = employees.id')//, 'right')
		->order_by('users.id', 'desc')->limit(1);
		$query = $this->asm_db->get();
		$result = $query->row_array();

		if (!empty($result)) {
			$id = $result['id'];
			$result['reportee'] = $this->getReportings($result['employee_id']);
			// $data['online_status'] = 1;
			$data['last_login_time'] = date('Y-m-d h:i:s');
			$data['login_user_ip'] = $login_ip;
			$this->asm_db->where('id', $id);
			$insert = $this->asm_db->update('users', $data);

		}
		$this->asm_db->close();
		//print_r($query->result_array());
		//exit();
		return $result;
	}

	function get(){
		$sess_data = $this->session->userdata;
		//print_r($sess_data);
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		
		$this->asm_db->select("usr.login, usr.id, usr.role_id, CONCAT(usr.login,' - ',usr.name) as name, usr.employee_id")
		->from('users as usr')
		->join('employees', 'usr.employee_id = employees.id')
		->where('usr.deleted', 0);
		//if($user_id > 10){
		//	$this->db->join('access_campiagns', 'access_campiagns.status = 1 and access_campiagns.user_id = '.$user_id);
		//}
		// $this->db->where('users.id in (select acs.user_id from access_campiagns acs where acs.campiagn_id in (select campiagn_id from access_campiagns ac where ac.user_id = '.$user_id.' ) )');
		// $this->db->where('users.deleted', 0)->where('users.active', 'Y')->where('users.role_id >=', $role_id);
		if(!empty($this->id)){
			$this->asm_db->where('usr.id', $this->id);
		}
		if(!empty($this->role_id)){
			$this->asm_db->where('usr.role_id', $this->role_id);
		}
		if(!empty($this->project_id)){
			$this->asm_db->where('employees.project_id', $this->project_id);
		}
		if(!empty($this->center_id)){
			$this->asm_db->where('employees.center_id', $this->center_id);
		}
		if(!empty($this->login)){
			$this->asm_db->where('usr.login', $this->login);
		}
		if($this->reporting == 'me'){
			$this->asm_db->where('usr.id', $this->reportee);
		}
		
		// $this->db->group_by('users.id');

		// if ($order) {
		// 	$this->db->order_by($order, $direction);
		// } else {
		$this->asm_db->order_by('usr.id', 'ASC');
		// }

		// if ($page && $limit) {
		// 	///$this->db->limit($limit_start, $limit_end);
		// }

		// if ($page != null) {
		// 	//$this->db->limit($limit_start, $limit_end);
		// }

		$query = $this->asm_db->get();

		return array('users' => $query->result_array());
	}

	function get_db_session_data() {
		$query = $this->db->select('user_data')->get('ci_sessions');
		$user = array(); /* array to store the user data we fetch */
		foreach ($query->result() as $row) {
			$udata = unserialize($row->user_data);
			/* put data in array using username as key */
			$user['user_name'] = $udata['user_name'];
			$user['is_logged_in'] = $udata['is_logged_in'];
		}
		return $user;
	}
	function login($username, $password) {
		$this->db->select('id, username, password');
		$this->db->from('users');
		// 	$this->db->where('username', $username);
		// 	$this->db->where('password', MD5($password));
		// 	$this->db->limit(1);

		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return $query->result();
		} else {
			return false;
		}
	}
	public function loginidToUserid($id) {
		$query = $this->db->select('id')->from('users')->where('login', $id)->get();
		return $query->row_array()['id'];
		//	print_r($query->result());
		//return array('users' => $query->row_array()); //$query->result_array();

	}
	public function get_user_by_login2($id) {
		$this->db->select('u1.login, u1.id, (select name from roles where id = u1.role_id) as role
			, (select name from users where id = u1.reporting_id) as reporting, u1.name');
		$this->db->from('users u1');
		$this->db->where('u1.login', $id);
		$this->db->where('u1.deleted', 0);
		$this->db->where('u1.active', 'Y');
		$query = $this->db->get();
		return $query->row_array();
		//	print_r($query->result());
		//return array('users' => $query->row_array()); //$query->result_array();

	}
	public function get_my_reportings($id = null) {
		
		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];

		$this->db->select('user_name, login, id, active, role_id, name, active, reporting_id');
		$this->db->from('users');
		$this->db->where('reporting_id', $up_user);
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//	print_r($query->result());
		return array('agents' => $query->result()); //$query->result_array();

	}
	public function get_user_by_login($id) {
		$this->db->select('user_name, login, id, active, role_id, name, active, area_id, territory_id');
		$this->db->from('users');
		$this->db->where('login', $id);
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//	print_r($query->result());
		return array('users' => $query->row_array()); //$query->result_array();

	}
	public function get_user_by_id($id) {
		$this->db->select('user_name, login, id, active, role_id, name, active, area_id, territory_id');
		$this->db->from('users');
		$this->db->where('id', $id);
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//	print_r($query->result());
		return array('users' => $query->result()); //$query->result_array();

	}
	public function get_user_by_role_id($role_id, $role) {
		$this->db->select('user_name,login,id,active,role_id,name,active');
		$this->db->from('users');
		$this->db->where('role_id', $role_id);
		/*if($role != 1){
			if($role != 3){
				$this->db->where('role_id >', $role);
				$this->db->where('role_id <=', 9);
				$this->db->where('role_id !=', 3);
			}
			else{
				//$this->db->where('role_id >', $id);
				$this->db->where('role_id >', 9);
			}
			$this->db->where('role_id !=', 0);
		}*/
		//$this->db->where('id !=', 5);
		//$this->db->where('reporting_id !=', 5);
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//print_r($query->result());
		return array('users' => $query->result()); //$query->result_array();

	}
	public function get_user_greater_or_equal_role_id($role_id, $role) {
		$this->db->select('user_name,login,id,active,role_id,name,active, reporting_id');
		$this->db->from('users');
		$this->db->where('role_id >=', $role_id);
		//echo 'i m in';
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		return array('users' => $query->result()); //$query->result_array();

	}
	public function codeToID($id) {
		$this->db->select('id');
		$this->db->from('users');
		$this->db->like('login', $id, 'none');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//	print_r($query->result());
		$users = $query->result_array();
		if (empty($users)) {
			return 0;
		}
		return $users[0]['id'];
		//return array('users' => ); //$query->result_array();

	}
	public function getMyReportings($id = null) {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];

		$this->db->select('*');
		$this->db->from('users');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		//if($id != null && $id != ''){
			$this->db->where('reporting_id', $id);
			$query = $this->db->get();
			return $query->num_rows();
		//}
		//$this->db->order_by('role_id', 'ASC');
		//$query = $this->db->get();

		//return array('reportings' => $query->result_array());
	}
	public function get_reportings() {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];

		$this->db->select('id,role_id,name');
		$this->db->from('users');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where('role_id >=', $role_id);

		$this->db->order_by('role_id', 'ASC');
		$query = $this->db->get();

		return array('reportings' => $query->result_array());
	}
	public function roleUserList($column, $column_value) {
		$this->db->select('id,role_id');
		$this->db->from('users');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where($column, $column_value);
		$query = $this->db->get();
		$return = $query->result_array();
		return $return;

	}
	public function get_users($search =null, $order = null, $direction = 'Asc', $page = null, $limit = null) {

		$sess_data = $this->session->userdata;
		//print_r($sess_data);
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$wing_id = $sess_data['data_logged_in']['wing_id'];
		//$campaign_id = $sess_data['data_campaign'];
		$this->db->select('user_name, login,users.id, active, role_id, name, active, reporting_id, area_id');
		$this->db->from('users');
		//if($user_id > 10){
		//	$this->db->join('access_campiagns', 'access_campiagns.status = 1 and access_campiagns.user_id = '.$user_id);
		//}
		$this->db->where('users.id in (select acs.user_id from access_campiagns acs where acs.campiagn_id in (select campiagn_id from access_campiagns ac where ac.user_id = '.$user_id.' ) )');
		$this->db->where('users.deleted', 0)->where('users.active', 'Y')->where('users.role_id >=', $role_id);
		if(isset($search['name']) && $search['name'] != null){
			$this->db->like('users.name', $search['name']);
		}
		if(isset($search['login']) && $search['login'] != null){
			$this->db->like('users.login', $search['login'] );
		}
		if(isset($search['role_id']) && $search['role_id'] != null){
			$this->db->like('users.role_id', $search['role_id']);
		}
		if(isset($search['area_id']) && $search['area_id'] != null){
			$this->db->like('users.area_id', $search['area_id']);
		}
		if(isset($search['reporting_id']) && $search['reporting_id'] != null){
			$this->db->like('users.reporting_id', $search['reporting_id']);
		}
		
		/*if($role_id != 1){
					$this->db->where('wing_id', $wing_id);
				}
				if ($search_string) {
					$this->db->like('name', $search_string);

			if ($role_id != 1) {
				if ($role_id == 2) {
					$roles_array = array(4, 6, 8);
					$this->db->where('role_id >', $role_id);
					$this->db->where_in('role_id', $roles_array);
				} else if ($role_id == 3) {
					//$this->db->where('role_id >', $id);
					$roles_array = array(10, 11);
					//$this->db->where('id =', $role_id);
					$this->db->where_in('id', $roles_array);
				} else {
					$roles_array = array(4, 6, 8);
					$this->db->where('id >', $role_id);
					$this->db->where_in('id', $roles_array);
				}
		*/
		$this->db->group_by('users.id');

		if ($order) {
			$this->db->order_by($order, $direction);
		} else {
			$this->db->order_by('users.id', $direction);
		}

		if ($page && $limit) {
			///$this->db->limit($limit_start, $limit_end);
		}

		if ($page != null) {
			//$this->db->limit($limit_start, $limit_end);
		}

		$query = $this->db->get();

		return array('users' => $query->result_array());
	}

	function count_users($search_string = null, $order = null) {
		$this->db->select('*');
		$this->db->from('users');
		if ($search_string) {
			$this->db->like('name', $search_string);
		}
		if ($order) {
			$this->db->order_by($order, 'Asc');
		} else {
			$this->db->order_by('id', 'Asc');
		}
		$query = $this->db->get();
		return $query->num_rows();
	}

	function store_users($data) {
		$insert = $this->db->insert('users', $data);
		return $insert;
	}
	public function get_chatUsers() {
		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];
		$user_id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_name,login,id,active,role_id,name,active,online_status');
		$this->db->from('users');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where_not_in('id', $user_id);
		if ($role_id == 1 || $role_id == 2 || $role_id == 3) {
			$this->db->where('role_id >=', $role_id);
		} else if ($role_id == 4) {
			$this->db->where_in('role_id', array(3, 4, 5));
		} else if ($role_id == 5) {
			$this->db->where_in('role_id', array(3, 4));
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); return;
		foreach ($result as $key => $index) {
			if ($index['online_status'] == 1) {
				$result[$key]['online_status'] = true;
			} else {
				$result[$key]['online_status'] = false;
			}

		}
		return array('chatUsers' => $result);
	}
	/**
	 * Update user
	 * @param array $data - associative array with data to store
	 * @return boolean
	 */
	function select_user($login){
		$this->db->select('login')->from('users')->where('login', $login)->where('deleted', 0)->where('active', 'Y');
		$query = $this->db->get();
		$result = $query->result_array();
		if (empty($result)) {
			return true;
		}else{
			return false;
		}
	}
	function update_user($data) {
		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))

		$sess_data['data_logged_in']['id'];

		$id = $data['id'];
		unset($data['id']);
		
		//echo '<pre>';
		//print_r($data['reporting_id']);
		//exit();
		
		if ($id == 0) {
			$data['created'] 	= date("Y-m-d H:i:s");
			$data['created_by'] = $sess_data['data_logged_in']['id'];
			$data['wing_id'] 	= $sess_data['data_logged_in']['wing_id'];
			$data['password'] 	= $this->__encrip_password($data['password']);
			$data['area_id']    = ($data['area_id'] == "")?null:$data['area_id'];
			$data['territory_id'] = ($data['territory_id'] == "")?null:$data['territory_id'];
			$data['user_name'] 	= str_replace(' ', '', $data['name']);
			$insert = $this->db->insert('users', $data);
			$user_id =  $this->db->insert_id();
			$dat2 = array();
			$dat2['user_id'] 		= $user_id;
			$dat2['reporting_to'] 	= $data['reporting_id'];
			$dat2['created'] 		= date("Y-m-d H:i:s");
			$dat2['created_by'] 	= $sess_data['data_logged_in']['id'];
			$insert = $this->db->insert('user_reportings', $dat2);

			//$this->db->trans_start();
			//$this->db->trans_complete();

		} else if ($id != 0 && isset($data['active']) && $data['active'] == 'N') {
			$this->db->where('id', $id);
			$insert = $this->db->update('users', $data);
		} else {
			$data['updated'] = date("Y-m-d H:i:s");
			$data['updated_by'] = $sess_data['data_logged_in']['id'];
			$data['wing_id'] = $sess_data['data_logged_in']['wing_id'];

			$data['password'] = $this->__encrip_password($data['password']);
			$data['user_name'] = str_replace(' ', '', $data['name']);
			$this->db->where('id', $id);
			$insert = $this->db->update('users', $data);
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
	function change_reporting($id) {
		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))
			$data['updated']      = date("Y-m-d H:i:s");
			$data['updated_by']   = $sess_data['data_logged_in']['id'];
			$data['reporting_id'] = $sess_data['data_logged_in']['id'];
			$this->db->where('id', $id);
			$insert = $this->db->update('users', $data);


			$dat2['user_id'] 		= $id;
			$dat2['reporting_to'] 	= $sess_data['data_logged_in']['id'];
			$dat2['created'] 		= date("Y-m-d H:i:s");
			$dat2['created_by'] 	= $sess_data['data_logged_in']['id'];
			$insert = $this->db->insert('user_reportings', $dat2);
		
		return $insert;
		
	}
	public function logout() {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];
		$data['online_status'] = 0;
		$this->db->where('id', $id);
		$insert = $this->db->update('users', $data);
		return $insert;
	}
	public function otherLogout($id) {
		/*$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];*/
		$data['online_status'] = 0;
		$this->db->where('id', $id);
		$insert = $this->db->update('users', $data);
		return $insert;
	}
	public function getRptComplainUsers() {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];

		$this->db->select('id, role_id, name');
		$this->db->from('users');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		//$this->db->where('role_id != ', $role_id);
		$this->db->where_not_in('role_id', array(1, 2));
		//$this->db->where('role_id', $role_id+1);
		$this->db->order_by('role_id', 'ASC');
		$query = $this->db->get();

		return array('rptComplainUsers' => $query->result_array());
	}

}
?>
