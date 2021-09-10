<?php
class Setups_model extends CI_Model {

	/**
	 * Responsable for auto load the database
	 * @return void
	 */
	public function __construct() {
		//$this->load->database();
		$this->asm_db = $this->load->database('asm', true);
	}
	public function __distructur() {
		$this->asm_db->close();		
	}
	function get($base_id, $group=null) {

		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$project_id = $sess_data['data_logged_in']['project_id'];



		$this->asm_db->select('*')->from('setups')
		->where('status', 1)
		->where_in('base_id', $base_id);//->or_where_in('id', $base_id)
		if($role_id != 305){
			$this->asm_db->where_in('parent_id', 'select id from asm.tbl_setups where parent_id in ( '.$project_id.' )');
		}
		if($group!=null){
			$this->asm_db->where_in('group', $group);
		}
		$this->asm_db->order_by('id', 'desc');
		$query = $this->asm_db->get();
		return array('setups' => $query->result_array());
		
	}
	

}
?>
