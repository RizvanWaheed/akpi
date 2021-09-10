<?php
class Options_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllOptions($id, $category, $slug){
		$this->db->select('id, name, category, slug, parent_id');
		$this->db->from('options');
		$this->db->where('status', 1);
		if($id != null && $id > 0){
			$this->db->where('id', $id);
		}
		if($category != null && $category > 0){
			$this->db->where('category', $category);
		}
		if($slug != null && $slug > 0){
			$this->db->where('category', $slug);
		}
		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	  	$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		//return $query->result();
		return array('options' => $query->result_array());
	}
	public function addOptions($option){
		$sess_data = $this->session->userdata;
		$option['added_by'] = $sess_data['data_logged_in']['id'];
		$option['added_date'] = date("Y-m-d H:i:s");
		$option['template'] = base64_decode($option['template']);
		$insert = $this->db->insert('options', $option);
	    return $insert;
	}
	public function updateOptions($option, $id){
	//	print_r($option);
		$sess_data = $this->session->userdata;
		$option['updated_by'] = $sess_data['data_logged_in']['id'];
		$option['updated_date'] = date("Y-m-d H:i:s");
		$option['template'] = base64_decode($option['template']);
		$this->db->where('id', $id);
		$this->db->update('options', $option);
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
	function deleteOption($id){
		$this->db->where('option_id', $id);
		$this->db->delete('options'); 
	}
}
?>	
