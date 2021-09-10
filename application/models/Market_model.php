<?php
class Market_model extends CI_Model {
 
    /**
    * Responsable for au to load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database();
    } 
    function update_market($data) {
		$id = $data['id'];
		unset($data['id']);

		//print_r($data); exit();
		
		$insert = array();

		// $insert[''] = $data[''];
		$sess_data 	    	= $this->session->userdata;
		$insert['name'] 	= $data['name'];
		$insert['status'] 	= $data['status'];	
		
		$insert['areaID'] 		= isset($data['area_id'])?$data['area_id']:0;;
		$insert['territoryID'] 	= isset($data['territory_id'])?$data['territory_id']:0;
		$insert['regionID'] 	= isset($data['region_id'])?$data['region_id']:0;
		
		
		$insert['lastUpdateUser'] = $sess_data['data_logged_in']['id'];

		
		if ($id == 0) {
			$insert['creationTime']   = strtotime(date("Y-m-d H:i:s"));	
			$insert = $this->db->insert('Market', $insert);

		} else {
			$insert['lastUpdateTime'] = strtotime(date("Y-m-d H:i:s"));
			$this->db->where('marketID', $id);
			$insert = $this->db->update('Market', $insert);
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
    public function get_markets($id = null){
		$this->db->select('MarketID as id, name, status, (case when regionID > 0 then regionID else 0 end)  as region_id, (case when areaID > 0 then areaID else 0 end) as area_id, (case when territoryID > 0 then territoryID else 0 end) as territory_id');
		$this->db->from('Market');
		$this->db->where('name !=', ''); 
		if($id != null && $id > 0 && $id != ''){
			$this->db->where('MarketID', $id);
		}
		//
	//	$this->db->where('status', 1);
	
		$query = $this->db->get()->result_array();;
	    $response = array('markets' => $query);
	    /*foreach($query as $key => $index){
	    	$response['markets'][$key]['id'] = $index['MarketID'];
	    	$response['markets'][$key]['name'] = $index['name'];
	    }*/
	    return $response; //array('market'.$query);
	}
    public function getMarketID($name){
		$this->db->select('id');
		$this->db->from('market');
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
