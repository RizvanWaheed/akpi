<?php
class ComplaintStates_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function get_complaint_states($id) {

		$this->db->select('id, name, status');
		$this->db->from('complaint_states');
		//$this->db->where('complaint_id', $complaint_id);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
	//	$this->db->order_by('date', 'remarks');
		/*if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}*/
		$query = $this->db->get();
		$result = $query->result_array();
	
		return array('complaintStates' => $result);
	}

	

}
?>
