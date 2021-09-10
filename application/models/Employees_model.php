<?php
class Employees_model extends CI_Model {

	/**
	 * Responsable for auto load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	function __encrip_password($password) {
		return md5($password);
	}
	function resetPassword($newPassword, $oldPassword) {
		//print_r($newPassword);
		//print_r($oldPassword);
		$new = $this->__encrip_password($newPassword);
		$old = $this->__encrip_password($oldPassword);

		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['login'];

		$this->db->select('*');
		$this->db->from('employees');
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
			$insert = $this->db->update('employees', $data);
			return true;
		} else {
			return false;
		}

	}
	function validate($user_name, $password, $login_ip) {
		$this->db->select('*')->from('employees')
		->where('deleted', 0)->where('active', 'Y')
		->where('login', $user_name)->where('password', $password)
		->order_by('id', 'desc')->limit(1);
		$query = $this->db->get();
		$result = $query->row_array();

		if (!empty($result)) {
			$id = $result['id'];
			$data['online_status'] = 1;
			$data['last_login_time'] = date('Y-m-d h:i:s');
			$data['last_login_ip'] = $login_ip;
			$this->db->where('id', $id);
			$insert = $this->db->update('employees', $data);

		}
		//print_r($query->result_array());
		//exit();
		return $result;
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
		$this->db->from('employees');
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
	public function get_employee_by_id($id) {
		$this->db->select('user_name, login, id, active, role_id, name, active, area_id, territory_id');
		$this->db->from('employees');
		$this->db->where('id', $id);
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//	print_r($query->result());
		return array('employees' => $query->result()); //$query->result_array();

	}
	public function get_employee_by_role_id($role_id, $role) {
		$this->db->select('user_name,login,id,active,role_id,name,active');
		$this->db->from('employees');
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
		return array('employees' => $query->result()); //$query->result_array();

	}
	public function get_employee_greater_or_equal_role_id($role_id, $role) {
		$this->db->select('user_name,login,id,active,role_id,name,active, reporting_id');
		$this->db->from('employees');
		$this->db->where('role_id >=', $role_id);
		//echo 'i m in';
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		return array('employees' => $query->result()); //$query->result_array();

	}
	public function codeToID($id) {
		$this->db->select('id');
		$this->db->from('employees');
		$this->db->like('login', $id, 'none');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$query = $this->db->get();
		//	print_r($query->result());
		$employee = $query->result_array();
		if (empty($employee)) {
			return 0;
		}
		return $employee[0]['id'];
		//return array('employees' => ); //$query->result_array();

	}
	public function get_reportings() {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];

		$this->db->select('id, role_id, name');
		$this->db->from('employees');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where('role_id >=', $role_id);

		$this->db->order_by('role_id', 'ASC');
		$query = $this->db->get();

		return array('reportings' => $query->result_array());
	}
	public function roleEmployeeList($column, $column_value) {
		$this->db->select('id,role_id');
		$this->db->from('employees');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where($column, $column_value);
		$query = $this->db->get();
		$return = $query->result_array();
		return $return;

	}
	public function get_employees($search_string = null, $order = null, $order_type = 'Asc', $limit_start = null, $limit_end = null) {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];
		$wing_id = $sess_data['data_logged_in']['wing_id'];

		$this->db->select('user_name,login,id,active,role_id,name,active,reporting_id');
		$this->db->from('employees');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		$this->db->where('role_id >=', $role_id);
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
		$this->db->group_by('id');

		if ($order) {
			$this->db->order_by($order, $order_type);
		} else {
			$this->db->order_by('id', $order_type);
		}

		if ($limit_start && $limit_end) {
			$this->db->limit($limit_start, $limit_end);
		}

		if ($limit_start != null) {
			$this->db->limit($limit_start, $limit_end);
		}

		$query = $this->db->get();

		return array('employees' => $query->result_array());
	}

	function count_employee($search_string = null, $order = null) {
		$this->db->select('*');
		$this->db->from('employees');
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

	function store_employee($data) {
		$insert = $this->db->insert('employees', $data);
		return $insert;
	}
	public function get_chatEmployees() {
		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];
		$user_id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_name,login,id,active,role_id,name,active,online_status');
		$this->db->from('employees');
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
		return array('chatEmployees' => $result);
	}
	/**
	 * Update user
	 * @param array $data - associative array with data to store
	 * @return boolean
	 */
	function select_employee($login){
		$this->db->select('login')->from('employees')->where('login', $login)->where('deleted', 0)->where('active', 'Y');
		$query = $this->db->get();
		$result = $query->result_array();
		if (empty($result)) {
			return true;
		}else{
			return false;
		}
	}
	function update_employee($data) {
		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))

		$sess_data['data_logged_in']['id'];

		$id = $data['id'];
		unset($data['id']);

		if ($id == 0) {
			$data['created'] 	= date("Y-m-d H:i:s");
			$data['created_by'] = $sess_data['data_logged_in']['id'];
			$data['wing_id'] 	= $sess_data['data_logged_in']['wing_id'];
			//$data['password'] = $this->__encrip_password($data['password']);
			$data['area_id']    = ($data['area_id'] == "")?null:$data['area_id'];
			$data['territory_id'] = isset($data['territory_id'])?$data['territory_id']:null;
			$data['user_name'] 	= str_replace(' ', '', $data['name']);
			$insert = $this->db->insert('employees', $data);

		} else if ($id != 0 && isset($data['active']) && $data['active'] == 'N') {
			$this->db->where('id', $id);
			$insert = $this->db->update('employees', $data);
		} else {
			$data['updated'] = date("Y-m-d H:i:s");
			$data['updated_by'] = $sess_data['data_logged_in']['id'];
			$data['wing_id'] = $sess_data['data_logged_in']['wing_id'];
			//$data['password'] = $this->__encrip_password($data['password']);
			$data['user_name'] = str_replace(' ', '', $data['name']);
			$this->db->where('id', $id);
			$insert = $this->db->update('employees', $data);
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
	public function logout() {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];
		$data['online_status'] = 0;
		$this->db->where('id', $id);
		$insert = $this->db->update('employees', $data);
		return $insert;
	}
	public function otherLogout($id) {
		/*$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];*/
		$data['online_status'] = 0;
		$this->db->where('id', $id);
		$insert = $this->db->update('employees', $data);
		return $insert;
	}
	public function getRptComplainEmployees() {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];

		$this->db->select('id, role_id, name');
		$this->db->from('employees');
		$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
		//$this->db->where('role_id != ', $role_id);
		$this->db->where_not_in('role_id', array(1, 2));
		//$this->db->where('role_id', $role_id+1);
		$this->db->order_by('role_id', 'ASC');
		$query = $this->db->get();

		return array('rptComplainEmployees' => $query->result_array());
	}

}
?>
