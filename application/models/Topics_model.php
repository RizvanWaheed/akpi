<?php
class Topics_model extends CI_Model {
 
    /**
    * Responsable for au to load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllTopics($id){
		$sess_data = $this->session->userdata;
		$role_id   = $sess_data['data_logged_in']['role_id'];
		$this->db->select('id,name');
		$this->db->from('topics');
		$this->db->where('status', 1);
		//$this->db->where('id >=', $role_id);
		/*$this->db->where('deleted', 0);
		$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	  	if($id != null){
			$this->db->where('id', $id);
		}
		$query = $this->db->get();
		//return $query->result();
		return array('topics' => $query->result_array());
	}
	public function addRole($role){
		$insert = $this->db->insert('topics', $data);
	    return $insert;
	}
	public function update_topic($data){
		$id = $data['id'];
		unset($data['id']);
		$sess_data = $this->session->userdata;
		$data['added_by']   = $sess_data['data_logged_in']['id'];
		$data['added_date'] = date("Y-m-d H:i:s");
		if($id == 0){
			$insert = $this->db->insert('topics', $data);
		}	
		else{
			$this->db->where('id', $id);
			$insert =  $this->db->update('topics', $data);
		
		}
		return $insert;
		//$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
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
	function deleteRole($id){
		$this->db->where('role_id', $id);
		$this->db->delete('roles'); 
	}
}
?>	
