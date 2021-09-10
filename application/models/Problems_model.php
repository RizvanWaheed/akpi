<?php
class Problems_model extends CI_Model {

	public function __construct() {
		$this->load->database();
	}
	public function getAllProblems($id, $product_id) {
		$this->db->select('id,name');
		$this->db->from('problems');
		$this->db->where('status', 1);
		if ($id != null && $id > 0) {
			$this->db->where('id', $id);
		}
		if ($product_id != null && $product_id > 0) {
			$this->db->where('product_id', $product_id);
		}
		$this->db->or_where('product_id', 0);
		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
		$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		//return $query->result();
		return array('problems' => $query->result_array());
	}
	public function addProblems($problem) {
		$sess_data = $this->session->userdata;
		$problem['added_by'] = $sess_data['data_logged_in']['id'];
		$problem['added_date'] = date("Y-m-d H:i:s");
		$problem['template'] = base64_decode($problem['template']);
		$insert = $this->db->insert('problems', $problem);
		return $insert;
	}
	public function updateProblems($problem, $id) {
		//	print_r($problem);
		$sess_data = $this->session->userdata;
		$problem['updated_by'] = $sess_data['data_logged_in']['id'];
		$problem['updated_date'] = date("Y-m-d H:i:s");
		$problem['template'] = base64_decode($problem['template']);
		$this->db->where('id', $id);
		$this->db->update('problems', $problem);
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
	function deleteProblem($id) {
		$this->db->where('problem_id', $id);
		$this->db->delete('problems');
	}
}
?>
