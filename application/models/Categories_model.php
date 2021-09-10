<?php
class Categories_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllCategories($id){
		$this->db->select('id,name,tat,template');
		$this->db->from('categories');
		$this->db->where('status', 1);
		if($id != null){
			$this->db->where('id', $id);
		}
		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	  	$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		//return $query->result();
		return array('categories' => $query->result_array());
	}
	public function addCategories($category){
		$sess_data = $this->session->userdata;
		$category['added_by'] = $sess_data['data_logged_in']['id'];
		$category['added_date'] = date("Y-m-d H:i:s");
		$category['template'] = base64_decode($category['template']);
		$insert = $this->db->insert('categories', $category);
	    return $insert;
	}
	public function updateCategories($category, $id){
	//	print_r($category);
		$sess_data = $this->session->userdata;
		$category['updated_by'] = $sess_data['data_logged_in']['id'];
		$category['updated_date'] = date("Y-m-d H:i:s");
		$category['template'] = base64_decode($category['template']);
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

    /**
    * Delete user
    * @param int $id - user id
    * @return boolean
    */
	function deleteCategorie($id){
		$this->db->where('categorie_id', $id);
		$this->db->delete('categories'); 
	}
}
?>	
