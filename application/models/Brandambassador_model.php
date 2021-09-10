<?php

class Brandambassador_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
    function update_brandambassador($data) {
		$id = $data['id'];
		unset($data['id']);

		$insert = array();
		$insert2 = array();
	//	print_r($data);
		$sess_data 	    		= $this->session->userdata;
		$up_user 	    		= $sess_data['data_logged_in']['id'];
		$role_id 	    		= $sess_data['data_logged_in']['role_id'];
		$insert['regionID'] 	= $sess_data['data_logged_in']['region_id'];
		$insert['areaID'] 		= $sess_data['data_logged_in']['area_id'];
		$insert['territoryID'] 	= $sess_data['data_logged_in']['territory_id'];
		$insert['creationTime'] = date("Y-m-d H:i:s");

		$insert['code'] = $data['code'];
		$insert['marketID'] = $data['marketID'];
		$insert['mobileNo1'] = $data['mobileNo1'];
		$insert['mobileNo2'] = $data['mobileNo2'];
		$insert['name'] = $data['name'];
		$insert['status'] = $data['status'];
		$insert['lastUpdateUser'] = $up_user;


		//$data['password'] = $this->__encrip_password($data['password']);
		//$data['user_name'] = str_replace(' ', '', $data['name']);		
		$insert2['status'] = 'Suspended';
		if ($id == 0) {
			
			$this->db->where('mobileNo1', $data['mobileNo1']);
			$inserting = $this->db->update('BrandAmbassador', $insert2);

			$insert = $this->db->insert('BrandAmbassador', $insert);

		} else {
			$this->db->where('brandAmbassadorID', $id);
			$insert = $this->db->update('BrandAmbassador', $insert);
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
    function get_brandambassadors(){
    	$sess_data 	    = $this->session->userdata;
		$up_user 	    = $sess_data['data_logged_in']['id'];
		$role_id 	    = $sess_data['data_logged_in']['role_id'];
		$region_id 	    = $sess_data['data_logged_in']['region_id'];
		$area_id 	    = $sess_data['data_logged_in']['area_id'];
		$territory_id 	= $sess_data['data_logged_in']['territory_id'];

		$this->db->select('brandAmbassadorID, BrandAmbassador.code, BrandAmbassador.name, mobileNo1, mobileNo2, Market.name as marketName, BrandAmbassador.status, BrandAmbassador.marketID');
		//	, regionID, areaID, territoryID, regions.name as region, areas.name as area, territories.name as territory');
		$this->db->from('BrandAmbassador');
		$this->db->join('Market', 'Market.marketID 	= BrandAmbassador.marketID');
		//$this->db->join('regions', 'regions.id 	= BrandAmbassador.regionID');//, 'right outer', 'left outer'
		//$this->db->join('areas', 'areas.id 		= BrandAmbassador.areaID');
		//$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		//$this->db->where('BrandAmbassador.status', 'Enabled');
		if( $region_id != '' && $region_id != null && $region_id > 0 ){
			$this->db->where('BrandAmbassador.regionID', $region_id);
		}
		if( $territory_id != '' && $territory_id != null && $territory_id > 0 ){
			$this->db->where('BrandAmbassador.territoryID', $territory_id);
		}
		if( $area_id != '' && $area_id != null && $area_id > 0 ){
			$this->db->where('BrandAmbassador.areaID', $area_id);
		}
		
	    $query = $this->db->get()->result_array();
	    $result = array();
	    foreach($query as $key  => $index){
    		$result['brandambassadors'][$key]['id'] 		= $index['brandAmbassadorID'];
			$result['brandambassadors'][$key]['code'] 		= $index['code'];
			$result['brandambassadors'][$key]['name'] 		= $index['name'];
			$result['brandambassadors'][$key]['mobileNo1']	= $index['mobileNo1'];
			$result['brandambassadors'][$key]['mobileNo2']	= $index['mobileNo2'];
			$result['brandambassadors'][$key]['status'] 	= $index['status'];
			$result['brandambassadors'][$key]['marketID'] 	= $index['marketID'];	    
		}
	    return $result;
	    //echo '<pre>';
	   // print_r($query);
    }
    public function getAllBrandAmbassador($region_id='', $area_id='', $territory_id =''){
		$this->db->select('brandAmbassadorID, BrandAmbassador.code, BrandAmbassador.name, regionID, areaID, territoryID, regions.name as region, areas.name as area, territories.name as territory');
		$this->db->from('BrandAmbassador');
		$this->db->join('regions', 'regions.id 	= BrandAmbassador.regionID');//, 'right outer', 'left outer'
		$this->db->join('areas', 'areas.id 		= BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		$this->db->where('BrandAmbassador.status', 'Enabled');
		$this->db->where('regions.status', 1);
		$this->db->where('areas.status', 1);
		$this->db->where('territories.status', 1);

		
		if( $region_id != '' && $region_id != null && $region_id > 0 ){
			$this->db->where('BrandAmbassador.regionID', $region_id);
		}
		if( $territory_id != '' && $territory_id != null && $territory_id > 0 ){
			$this->db->where('BrandAmbassador.territoryID', $territory_id);
		}
		if( $area_id != '' && $area_id != null && $area_id > 0 ){
			$this->db->where('BrandAmbassador.areaID', $area_id);
		}
		//$this->db->like('name', $name, 'none');

		//$this->db->where('name', $name);
	//	$this->db->where('status', 1);
	
		 //$a = ;
	     // $a = array( 'sb'	=> strrev(base64_encode('=EDZwATboFWT')), 'bs'	=> base64_encode(strrev('=EDZwATboFWT')) );
	     //print_r($a);
	     // exit();
	    $query = $this->db->get()->result_array();
	    
	    $regionCount 	= array();
	    $areaCount 		= array();
	    $territoryCount = array();

	    $region 	= array();
	    $area 		= array();
	    $territory 	= array();

	    foreach($query as $key => $index){
	    	$region[$index['regionID']][] = $index; 
	    	$area[$index['areaID']][] = $index;
	    	$territory[$index['territoryID']][] = $index;

	    	if(!array_key_exists($index['regionID'], $regionCount)){
	    		$regionCount[$index['regionID']] = 0;
	    	}
	    	if(!array_key_exists($index['areaID'], $areaCount)){
	    		$areaCount[$index['areaID']] = 0;
	    	}
	    	if(!array_key_exists($index['territoryID'], $territoryCount)){
	    		$territoryCount[$index['territoryID']] = 0;
	    	}

	    	$regionCount[$index['regionID']]++;
	    	$areaCount[$index['areaID']]++;
	    	$territoryCount[$index['territoryID']]++;
	    }

	    $return = array('rcount' =>  $regionCount, 'acount' => $areaCount, 'tcount'=> $territoryCount, 'region'=> $region, 'area'=> $area, 'territory'=> $territory);
	    //print_r($return); exit();
	    return $return;
	}
	public function getAllUpsellingUploads($limit_start = null, $limit_end = null, $phone = null) {
	//	echo $phone;
		$this->db->select('id,msisdn,current_pp,total_bill_amt,current_bundle,bundle_pitch,total_consumption, uploaded_date, uploaded_by');
		$this->db->from('upselling_uploads');
		$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('uploaded_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		//return $query->result();
		//print_r($query->result());
		return array('upsellingUploads' => $result);
	}
	public function findNUpdateAllBrandAmbassador($input) {
	//	echo $phone;
		$phone = $input['mobileNo1'];

		$this->db->select('brandAmbassadorID');
		$this->db->from('BrandAmbassador');
		$this->db->like('mobileNo1', $phone);
	
		$query  = $this->db->get();
		$result = $query->result_array();

		if(!empty($result)){
			$this->db->where('mobileNo1', $phone);
			$this->db->update('BrandAmbassador', $input);
			return true;
		}
		else{
			$insert = $this->db->insert('BrandAmbassador', $input);
	    	return $insert;
			//return false;
		}
		//print_r($result); exit();
		//return $query->result();
		//print_r($query->result());
		//return array('upsellingUploads' => $result);
	}
	public function getBrandAmbassadorID($phone, $name, $condition = null) {
		//echo $phone;
		$this->db->select('brandAmbassadorID');
		$this->db->from('BrandAmbassador');
		$this->db->where('status', 'Suspended');
		$this->db->like('mobileNo1', $phone);
		$this->db->or_like('mobileNo2', $phone);
	
		$query  = $this->db->get();
		$result = $query->result_array();
		//print_r($result);
		if(!empty($result)){
			return $result[0]['brandAmbassadorID'];
		}
		else{
			$insert['code']     	= 'mad';
			$insert['name']     	= $name;	
			$insert['mobileNo1']	= $phone;
			$insert['mobileNo2']	= '';
			$insert['address']  	= 'Uploader';
			$insert['actualTarget'] = '';
			$insert['marketID'] 	= 0;
			$insert['status'] 		= 'Suspended'; //'Suspended';
			$insert['creationTime'] = '';
			$insert['lastUpdateTime']= '';
			$insert['lastUpdateUser']= '';
			$insert['regionID']		= 0;
			$insert['areaID']		= 0;
			$insert['territoryID']	= 0;
			$insert['reporting_to']	= 2;

			$insert = $this->db->insert('BrandAmbassador', $insert);
			return $this->db->insert_id();
			//return false;	
		}
		
		
		//print_r($result); exit();
		//return $query->result();
		//print_r($query->result());
		//return array('upsellingUploads' => $result);
		
	}
	public function updateAllBrandAmbassador($category, $id){
	//	print_r($category);
		$this->db->where('brandAmbassadorID', $id);
		$this->db->update('brandambassador', $category);
		$report = array();
	//	$report['error'] = $this->db->_error_number();
	//	$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

   
}
?>	
