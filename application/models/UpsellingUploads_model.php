<?php
class UpsellingUploads_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllUpsellingUploads($limit_start = null, $limit_end = null, $phone = null) {
	//	echo $phone;
		$this->db->select('id,msisdn,current_pp,total_bill_amt,current_bundle,bundle_pitch,total_consumption, uploaded_date, uploaded_by');
		$this->db->from('upselling_uploads');
		$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('uploaded_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		//return $query->result();
		//print_r($query->result());
		return array('upsellingUploads' => $result);
	}
	public function getUpsellingUploadsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('msisdn', $phone);
		$query = $this->db->count_all_results('upselling_uploads');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('upsellinguploadsCount' => $query);
	}
	public function setAllUpsellings($upselling){
		$insert = $this->db->insert_batch('upselling_uploads', $upselling);
	    return $insert;
	}
	public function addUpsellings($upselling){
		$insert = $this->db->insert('upselling_uploads', $upselling);
	    return $insert;
	}
	
	function deleteUpsellingUploads($id){
		$this->db->where('id', $id);
		return $this->db->empty_table('upselling_uploads'); 
	}
	function deleteAllUpsellingUploads(){
		//$this->db->where('id', $id);
		return $this->db->empty_table('upselling_uploads'); 
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

   
}
?>	
