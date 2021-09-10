<?php
class MonitoringFields_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
	} 
	public function createCategoriesSetupTree($elements, $parentId=0, $parentName=''){

		$branch = array();
		// 	echo '<pre>';
		// 	print_r($elements[0]['children']);
	  	//	print_r($elements);
		
		foreach ($elements as $element) {
			//	print_r($element);
			if ($element['parent_id'] == $parentId) {
	            $children = $this->createCategoriesSetupTree($elements, $element['id'], $element['name']);
	            if ($children) {
	                $element['children'] = $children;
	            }
	            $element['parent_name'] = $parentName;
				$branch[] = $element;
				//unset($element);
			}
			// else{ $branch[] = $element; }
	    }
		// print_r($branch);
		// exit();
	    return $branch;
	}
	private function getTableValues($table_name, $base_slug, $type='table'){
		$this->db->select('*')->from($table_name)->where($base_slug);
		$query = $this->db->get();
		$query_array = $query->result_array();
		if($type == 'treeTable'){
			foreach($query_array as $i => $data){
				if($data['base_id'] == $data['parent_id']) $query_array[$i]['parent_id'] = 0;
			}
			return $this->createCategoriesSetupTree($query_array);
		}
		return $query_array;

		$this->db->select('*')->from($table_name)->where('status', 1);
		
		// if($base_slug == "monitoring_process"){
		// 	$this->db->where('base_slug', $base_slug);
		// }
		// else{
			$this->db->where('base_slug', $base_slug);
		// }
		
		$query = $this->db->get();
		$query_array = $query->result_array();
		//return $query->result_array();
		//echo $base_slug;
		foreach($query_array as $i => $data){
			if($data['base_id'] == $data['parent_id']) $query_array[$i]['parent_id'] = 0;
		}
		return $this->createCategoriesSetupTree($query_array);

	}
	// private function getTableValues($table_name, $base_slug){
	// 	$this->db->select('*')->from($table_name)->where($base_slug);
	// 	$query = $this->db->get();
	// 	$query_array = $query->result_array();
	// 	return $query_array;

	// 	$this->db->select('*')->from($table_name)->where('status', 1);
		
	// 	// if($base_slug == "monitoring_process"){
	// 	// 	$this->db->where('base_slug', $base_slug);
	// 	// }
	// 	// else{
	// 		$this->db->where('base_slug', $base_slug);
	// 	// }
		
	// 	$query = $this->db->get();
	// 	$query_array = $query->result_array();
	// 	//return $query->result_array();
	// 	//echo $base_slug;
	// 	foreach($query_array as $i => $data){
	// 		if($data['base_id'] == $data['parent_id']) $query_array[$i]['parent_id'] = 0;
	// 	}
	// 	return $this->createCategoriesSetupTree($query_array);

	// }
	public function getMonitoringFields($id, $status=0, $monitoring_for_id){
		$this->db->select('*');
		$this->db->from('monitoring_fields');
		$this->db->where('status', $status);
		if($id != null && $id > 0){
			$this->db->where('id', $id);
		}
		if($monitoring_for_id != null && $monitoring_for_id > 0){
			$this->db->where('monitoring_for_id', $monitoring_for_id);
		}
		$this->db->order_by('order', 'ASC');
		$query = $this->db->get();
		$query_result = $query->result_array();
		//echo '<pre>';
		//print_r($query->result_array());
		foreach($query_result as $key => $index){
			if($index['type'] == 'enum'){
				$dt = explode(',',$index['conditions']);
				$dr = array();
				foreach($dt as $dd){
					$dr[] = array('id'=> $dd, 'name'=>$dd);
				}
				$query_result[$key]['children'] = $dr;
			}
			if($index['type'] == 'table' ){//&& $index['value'] == 'options'
				$query_result[$key]['children'] = $this->getTableValues($index['table'], $index['conditions']);//str_replace(' ','_',strtolower($index['name'])));
			}
		}
		//print_r($query_result);
		//exit();

		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	   //  	$this->db->order_by('name', 'ASC');
		
		//return $query->result();
		return $query_result;
		//return array('monitoringFields' => $query_result);
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
