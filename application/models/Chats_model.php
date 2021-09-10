<?php
class Chats_model extends CI_Model {
	
	public function __construct() {
		$this->load->database();
	}
	public function get_messageUsers($cid) {

		$sess_data = $this->session->userdata;
		//print_r($sess_data); exit();
		$did = $sess_data['data_logged_in']['id'];
		
		//date= date("Y-m-d H:i:s");
		$this->db->select("from_id,to_id,id,message,sent,recd, ( case from_id when '$did' then true else false end ) as stat");
		$this->db->from('chats');
		$this->db->where("((from_id = '$cid' and to_id = '$did') or (from_id = '$did' and to_id = '$cid'))");
		//$this->db->where('from_id', $cid);
		//$this->db->having('to_id', $did); 
		$this->db->order_by('sent', 'ASC');
		//$this->db->limit(20, 1);
		
		$query = $this->db->get();

		$data  = $query->result_array();
		//print_r($data); exit();
		$visited_array = array(); 
		foreach($data as $key => $index){
			//print_r($index);
			if($did != $index['from_id']){
				$visited_array[] = $index['id'];
			}
			if($index['stat'] == 1 ){
				$data[$key]['stat'] = true;
			}else{
				$data[$key]['stat'] = false;
			}

		}//todo instert all vlue ids here to do further process.
		if(!empty($visited_array)){
			$datadata['visited'] = 1;
		 	$this->db->where_in('id', $visited_array);
		 	$insert = $this->db->update('chats', $datadata);
		}
 		return array('chats' => $data);
	}
	public function get_myMessage() {

		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();
		//print_r($sess_data); //exit();
		$did = $sess_data['data_logged_in']['id'];
		
		//date= date("Y-m-d H:i:s");
		$this->db->select("from_id,to_id,id,message, sent, recd, ( case from_id when '$did' then true else false end ) as stat");
		$this->db->from('chats');
		$this->db->where("to_id", $did);
		$this->db->where("visited",0);
		//$this->db->where('from_id', $cid);
		//$this->db->having('to_id', $did); 
		$this->db->order_by('sent', 'Desc');
		//$this->db->limit(20, 1);
		
		$query = $this->db->get();
		$data  = $query->result_array();
		//print_r($data); exit();
		foreach($data as $key => $index){
			//print_r($index);
			$index['message'] = substr($index['message'],0,50);
			if($index['stat'] == 1 ){
				$data[$key]['stat'] = true;
			}else{
				$data[$key]['stat'] = false;
			}

		}
		return array('chatNotes' => $data);
	}
	function count_users($search_string = null, $order = null) {
		$this->db->select('*');
		$this->db->from('users');
		if ($search_string) {
			$this->db->like('name', $search_string);
		}
		if ($order) {
			$this->db->order_by($order, 'Asc');
		} else {
			$this->db->order_by('sent', 'Asc');
		}
		$query = $this->db->get();
		return $query->num_rows();
	}

	
	function update_chat($data) {
		//$data['user_name'] = str_replace(' ','',$data['name']);
		$todo = $data['recd'];
		unset($data['recd']);
		$sess_data = $this->session->userdata;	
		$data['from_id'] = $sess_data['data_logged_in']['id'];
		$data['sent']    = date("Y-m-d H:i:s");
		if($todo == 'single'){
			$insert = $this->db->insert('chats', $data);
		}
		else{
			$role_id = ($todo == 'lead')?4:5;
			$value   = $this->getUsersList('role_id',$role_id);
			foreach($value as $key => $index){
				$data['to_id'] = $index['id'];
				$insert = $this->db->insert('chats', $data);
				

			}
		}
		return $insert;
		
	}

	function getUsersList($column = null, $column_value = null){
		$CI =& get_instance();
		$CI->load->model('Users_model');
		return $CI->Users_model->roleUserList($column, $column_value);

	}

}
?>
