<?php
class MonitoringFors_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function getAllMonitoringFors($id, $types = null) {
		//print_r($types);exit();
		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];
		//$company_id = $sess_data['data_logged_in']['company_id'];

		$this->db->select('id,name,status,category_level')->from('monitoring_for');
		if ($id != null) {
			$this->db->where('id', $id);
		}
		if ($types == 'users_monitoring_for') {
			$this->db->where('status', 1);
		}
		$query = $this->db->get();
		return array('monitoring_for' => $query->result_array());
	}
	public function setAllMonitoringFors($role) {
		if($role['id'] > 0){
			$this->db->where('id', $role['id']);
			return $this->db->update('monitoring_for', $role);
		}else{
			$insert = $this->db->insert('monitoring_for', $role);
			return $insert;
		}
		
	}
	public function updateRole($role) {
		$this->db->where('role_id', $id);
		$this->db->update('monitoring_for', $data);
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
	function deleteRole($id) {
		$this->db->where('id', $id);
		$this->db->delete('monitoring_for');
	}
}
?>
