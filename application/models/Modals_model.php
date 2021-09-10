<?php
class Modals_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllModals($id, $product_id){
		$this->db->select('id,name');
		$this->db->from('modals');
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
		return array('modals' => $query->result_array());
	}
	public function addModals($modal){
		$sess_data = $this->session->userdata;
		$modal['added_by'] = $sess_data['data_logged_in']['id'];
		$modal['added_date'] = date("Y-m-d H:i:s");
		$modal['template'] = base64_decode($modal['template']);
		$insert = $this->db->insert('modals', $modal);
	    return $insert;
	}
	public function updateModals($modal, $id){
	//	print_r($modal);
		$sess_data = $this->session->userdata;
		$modal['updated_by'] = $sess_data['data_logged_in']['id'];
		$modal['updated_date'] = date("Y-m-d H:i:s");
		$modal['template'] = base64_decode($modal['template']);
		$this->db->where('id', $id);
		$this->db->update('modals', $modal);
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
	function deleteModal($id){
		$this->db->where('modal_id', $id);
		$this->db->delete('modals'); 
	}
}
?>	
