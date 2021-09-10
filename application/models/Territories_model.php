<?php
class Territories_model extends CI_Model {
 
    /**
    * Responsable for au to load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    } 
    function update_territory($data) {

		$id = $data['id'];
		unset($data['id']);
		//print_r($data); exit();
		
		$insert = array();
		// $insert[''] = $data[''];

		$sess_data 	    	= $this->session->userdata;
		$insert['name'] 	= $data['name'];
		$insert['status'] 	= $data['status'];	
		
		$insert['area_id'] 		= isset($data['area_id'])?$data['area_id']:0;;
		$insert['region_id'] 	= isset($data['region_id'])?$data['region_id']:0;
		
		
		//$insert['lastUpdateUser'] = $sess_data['data_logged_in']['id'];

		
		if ($id == 0) {
			$insert['added']   = date("Y-m-d H:i:s");	
			$insert['added_by'] = $sess_data['data_logged_in']['id'];
			$insert = $this->db->insert('territories', $insert);

		} else {
			$insert['updated'] = date("Y-m-d H:i:s");
			$insert['updated_by'] = $sess_data['data_logged_in']['id'];
			$this->db->where('id', $id);
			$insert = $this->db->update('territories', $insert);
		}
		return $insert;
		//$report = array();
		//$report['error'] = $this->db->_error_number();
		//$report['message'] = $this->db->_error_message();
		if ($report !== 0) {
			return true;
		} else {
			return false;
		}
	}
    public function get_territories($id = null, $region=null, $area=null){
     	$sess_data 	= $this->session->userdata;
		//return $sess_data;
		$up_user 	= $sess_data['data_logged_in']['id'];
		$role_id 	= $sess_data['data_logged_in']['role_id'];
		$territory_id 	= $sess_data['data_logged_in']['territory_id'];

		$this->db->select('id, name, region_id, area_id, status');
		$this->db->from('territories');
		$this->db->where('territories.status', 1);
		if($territory_id != '' && $territory_id != null && $territory_id > 0){
			$this->db->where('id', $territory_id);
		}
		if($id > 0 && $id != '' && $id != null){
			$this->db->where('id', $id);
		}
		if($region != '' && $region != null && $region > 0){
			$this->db->where('region_id', $region);
		}
		if($area > 0 && $area != '' && $area != null){
			$this->db->where('area_id', $area);
		}
		//$this->db->like('name', $name, 'none');

		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);
		
		 //$a = ;
	     // $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get();
	    return array('territories' => $query->result_array());
	}
     public function getAllTerritories($region_id='', $area_id = '', $territory_id=''){

		$this->db->select('territories.id, territories.name, users.name as tmanager, users.id as tmanager_id');
		$this->db->from('territories');
		$this->db->join('users', 'users.territory_id = territories.id');
		$this->db->where('territories.status', 1);
		$this->db->where('users.role_id', 8);
		
		if($territory_id != '' && $territory_id != null && $territory_id > 0){
			$this->db->where('territories.id', $territory_id);
		}
		if($area_id != '' && $area_id != null && $area_id > 0){
			$this->db->where('territories.area_id', $area_id);
		}
		if($region_id != '' && $region_id != null && $region_id > 0){
			$this->db->where('territories.region_id', $region_id);
		}
		
		//$this->db->like('name', $name, 'none');

		//  $this->db->where('name', $name);
		//	$this->db->where('status', 1);
		
		 //$a = ;
	     // $a = array( 'sb' => strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get();
	    return $query->result_array();
	}
    public function getTerritoryID($name){
		$this->db->select('id');
		$this->db->from('territories');
		$this->db->like('name', $name, 'none'); 
		//$this->db->where('name', $name);
	//	$this->db->where('status', 1);
	
		 //$a = ;
	     // $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get();
	    return $query->result_array();
	}
	public function getAllWings($id){
		$this->db->select('id,name');
		$this->db->from('wings');//(case closable when 1 then true else "" end) as
		
	  	$this->db->order_by('name', 'asc');
		$query = $this->db->get();
		//print_r($query->result_array());exit();
		//return $query->result();
		return array('wings' => $query->result_array());
	}
	public function getComplainCategories($id){
		$this->db->select('id,name');
		$this->db->from('categories');
		$this->db->where('status', 1);
		if($id != null){
			$this->db->where('id', $id);
		}
		//$this->db->limit(220);
		/*
			$this->db->where('active', 'Y');
	    	
	    */
	    //$a = ;
	   // $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	    //print_r($a);
	   // exit();
	  	$this->db->order_by('name', 'asc');
		$query = $this->db->get();
		//return $query->result();
		return array('categories' => $query->result_array());
	}
	public function addCategories($category){
		$insert = $this->db->insert('categories', $category);
	    return $insert;
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

    /**
    * Delete user
    * @param int $id - user id
    * @return boolean
    */
	function deleteCategorie($id){
		$this->db->where('categorie_id', $id);
		$this->db->delete('categories'); 
	}
	public function getAllClosableCategories($id){
		$this->db->select('id');
		$this->db->from('categories');
		$this->db->where('id', $id);
		$this->db->where('status', 1);
		$this->db->where('closable', 1);

		 //$a = ;
	     // $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get();
	    return $query->result_array();
		//return $query->result();
		//return array('categories' => );
	}
	
}
?>	
