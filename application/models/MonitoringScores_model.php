<?php
class monitoringScores_model extends CI_Model {

	public function __construct() {
		$this->load->database();
	}
	public function getAllMonitoringScores($monitoring) {
		//	echo $phone;
		$this->db->select('monitoring_scores.id, question_id, monitoring_id, monitoring_scores.score, comment, CONCAT(qstn.name, " - ", qstn2.name) as name, qstn.type')
			->from('monitoring_scores')
			->join('questions qstn', 'monitoring_scores.question_id = qstn.id')
			->join('questions qstn2', 'qstn.parent_id = qstn2.id', 'left outer')
			->where_in('monitoring_id', array_column($monitoring, 'id'));
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		/*$this->db->order_by('uploaded_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}*/
		$query = $this->db->get();
		return $query->result_array();
		/*print_r($result);exit();
			//print_r($result); exit();
			//return $query->result();
			//print_r($query->result());
		*/
	}
	public function getmonitoringScoresUploadsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('msisdn', $phone);
		$query = $this->db->count_all_results('monitoring_scores');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('upsellinguploadsCount' => $query);
	}
	public function setAllMonitoringScoress($monitoringscores) {
		//print_r($monitoringscores);
		$insert = $this->db->insert_batch('monitoring_scores', $monitoringscores);
		return $insert;
	}
	public function addmonitoringScoress($upselling) {
		$insert = $this->db->insert('monitoring_scores', $upselling);
		return $insert;
	}

	function deletemonitoringScoresUploads($id) {
		$this->db->where('id', $id);
		return $this->db->empty_table('monitoring_scores');
	}
	function deleteAllmonitoringScoresUploads() {
		//$this->db->where('id', $id);
		return $this->db->empty_table('monitoring_scores');
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

}
?>
