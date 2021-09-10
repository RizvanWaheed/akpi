<?php
class MonitoringCategories_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function getAllMonitorCategories($id, $monitoring_for_id, $type_id, $parent_id, $base_id=null, $level=null) {
		$sess_data = $this->session->userdata;
		//$role_id = $sess_data['data_logged_in']['role_id'];
		//$monitoring_for_id[0] = ($monitoring_for_id[0]==8)?2:$monitoring_for_id[0];
		$monitoring_for_id[0] = ($monitoring_for_id[0]==10)?1:$monitoring_for_id[0];
		$monitoring_for_id[0] = ($monitoring_for_id[0]==6)?1:$monitoring_for_id[0];
		$this->db->select('id, name, monitoring_for_id, status, parent_id, level, base_id')
			->from('monitoring_categories')
			->where('status', 1);
		if ($id != null) {
			$this->db->where('id', $id);
		}
		if ($monitoring_for_id != null) {
			if(is_array($monitoring_for_id)){
				$this->db->where_in('monitoring_for_id', $monitoring_for_id);
			}else{
				$this->db->where('monitoring_for_id', $monitoring_for_id);
			}
			
		}
		if ($type_id != null) {
			$this->db->where('monitoring_only', $type_id);
		}
		if ($parent_id != null) {
			$this->db->where('parent_id', $parent_id);
		}
		$this->db->order_by('monitoring_for_id', 'asc');
		$this->db->order_by('id', 'desc');
		$query = $this->db->get();
		return array('monitoringCategories' => $query->result_array());
	}
	public function addEmailDrivers($email_driver) {
		$id = $email_driver['id'];
		$status = $email_driver['status'];
		//print_r($email_driver);
		$sess_data = $this->session->userdata;

		if ($id != 0) {
			unset($email_driver['id']);
			$email_driver['updated_by'] = $sess_data['data_logged_in']['id'];
			$email_driver['updated'] = date("Y-m-d H:i:s");
			return $this->updateEmailDrivers($id, $email_driver);
		}else{
			$email_driver['created_by'] = $sess_data['data_logged_in']['id'];
			$email_driver['created'] = date("Y-m-d H:i:s");
			$insert = $this->db->insert('monitoring_email_drivers', $email_driver);
			return $insert;
		}
		
		
	}
	public function updateEmailDrivers($id, $data) {
		$this->db->where('id', $id);
		return $this->db->update('monitoring_email_drivers', $data);
	}

	/**
	 * Delete user
	 * @param int $id - user id
	 * @return boolean
	 */
	function deleteRole($id) {
		$this->db->where('role_id', $id);
		$this->db->delete('monitoring_email_drivers');
	}
}
?>
