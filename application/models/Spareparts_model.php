<?php
class Spareparts_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllSpareparts($id, $product_id){
		$this->db->select('id,name, price');
		$this->db->from('spareparts');
		$this->db->where('status', 1);
		if($id != null && $id > 0){
			$this->db->where('id', $id);
		}
		if($product_id != null && $product_id > 0){
			$this->db->where('product_id', $product_id);
		}
		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	  	$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		//return $query->result();
		return array('spareparts' => $query->result_array());
	}
	public function addSpareparts($sparepart){
		$sess_data = $this->session->userdata;
		$sparepart['added_by'] = $sess_data['data_logged_in']['id'];
		$sparepart['added_date'] = date("Y-m-d H:i:s");
		$sparepart['template'] = base64_decode($sparepart['template']);
		$insert = $this->db->insert('spareparts', $sparepart);
	    return $insert;
	}
	public function updateSpareparts($sparepart, $id){
	//	print_r($sparepart);
		$sess_data = $this->session->userdata;
		$sparepart['updated_by'] = $sess_data['data_logged_in']['id'];
		$sparepart['updated_date'] = date("Y-m-d H:i:s");
		$sparepart['template'] = base64_decode($sparepart['template']);
		$this->db->where('id', $id);
		$this->db->update('spareparts', $sparepart);
		$report = array();
	//	$report['error'] = $this->db->_error_number();
	//	$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

    /**
    * Delete user
    * @param int $id - user id
    * @return boolean
    */
	function deleteSparepart($id){
		$this->db->where('sparepart_id', $id);
		$this->db->delete('spareparts'); 
	}
}
?>	
