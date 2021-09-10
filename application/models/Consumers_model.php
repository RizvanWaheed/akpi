<?php

class Consumers_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function getConsumersDtoll($phone = null) {
		//$date_from_s = strtotime($date_from.' 00:00:00');
		//if(!empty($date_to))
		//$date_to_s = strtotime($date_to.' 23:59:59');
		
		//$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID');
		//$this->db->from('consumer');
		//$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Enabled');*/
		//  $this->db->limit(35);
		//$this->db->order_by('id', 'desc');
		$this->db->select('count(id) as count, sum(case when consumers.city = "multan" then 1 else 0 end) multan, , sum(case when consumers.city = "lahore" then 1 else 0 end) lahore,
		, sum(case when consumers.city = "karachi" then 1 else 0 end) karachi, sum(case when consumers.city = "islamabad" then 1 else 0 end) islamabad');
		$this->db->from('consumers');
		//$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id');
		/*$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'left outer');//, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');*/
		//$this->db->where('BrandAmbassador.status', 'Enabled');
		//$this->db->where('consumers.status', 'Verified');
		/*$this->db->group_by('consumers.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name, areas.name, territories.name');*/ 
		//$query = $this->db->get();
		//$result = $query->result_array();
		$query = $this->db->get()->result_array();
		//print_r($query);
	    return $query[0];
	    $regionCount 	= array();
	    $areaCount 		= array();
	    $territoryCount = array();

	    $region 	= array();
	    $area 		= array();
	    $territory 	= array();

	    $regionCunCount = array();
	    $areaCunCount = array();
	    $territoryCunCount = array();

	    foreach($query as $key => $index){
	    	$region[$index['regionID']][] = $index; 
	    	$area[$index['areaID']][] = $index;
	    	$territory[$index['territoryID']][] = $index;

	    	if(!array_key_exists($index['regionID'], $regionCunCount)){
	    		$regionCunCount[$index['regionID']] = 0;
	    	}
	    	if(!array_key_exists($index['areaID'], $areaCunCount)){
	    		$areaCunCount[$index['areaID']] = 0;
	    	}
	    	if(!array_key_exists($index['territoryID'], $territoryCunCount)){
	    		$territoryCunCount[$index['territoryID']] = 0;
	    	}

	    	$regionCunCount[$index['regionID']] += $index['count'];
	    	$areaCunCount[$index['areaID']] += $index['count'];
	    	$territoryCunCount[$index['territoryID']] += $index['count'];

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

	    $return = array('rcount' =>  $regionCount, 'acount' => $areaCount, 'tcount'=> $territoryCount, 'region'=> $region, 'area'=> $area, 'territory'=> $territory, 'rconsumers' => $regionCunCount,'aconsumers' => $areaCunCount,'tconsumers' => $territoryCunCount);
	   // print_r($return); exit();
	    return $return;
		//print_r($result);
		//return $result;
	}
	public function getAllConsumersData($phone = null) {
		//$date_from_s = strtotime($date_from.' 00:00:00');
		//if(!empty($date_to))
		//$date_to_s = strtotime($date_to.' 23:59:59');
		
		//$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID');
		//$this->db->from('consumer');
		//$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Enabled');*/
		//  $this->db->limit(35);
		//$this->db->order_by('id', 'desc');
		$this->db->select('count(consumerID) as count, consumers.ambassador_id,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name as region, areas.name as area, territories.name as territory');
		$this->db->from('consumers');
		$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id');
		$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'left outer');//, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		//$this->db->where('BrandAmbassador.status', 'Enabled');
		//$this->db->where('consumers.status', 'Verified');
		$this->db->group_by('consumers.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name, areas.name, territories.name'); 
		//$query = $this->db->get();
		//$result = $query->result_array();
		$query = $this->db->get()->result_array();
	    
	    $regionCount 	= array();
	    $areaCount 		= array();
	    $territoryCount = array();

	    $region 	= array();
	    $area 		= array();
	    $territory 	= array();

	    $regionCunCount = array();
	    $areaCunCount = array();
	    $territoryCunCount = array();

	    foreach($query as $key => $index){
	    	$region[$index['regionID']][] = $index; 
	    	$area[$index['areaID']][] = $index;
	    	$territory[$index['territoryID']][] = $index;

	    	if(!array_key_exists($index['regionID'], $regionCunCount)){
	    		$regionCunCount[$index['regionID']] = 0;
	    	}
	    	if(!array_key_exists($index['areaID'], $areaCunCount)){
	    		$areaCunCount[$index['areaID']] = 0;
	    	}
	    	if(!array_key_exists($index['territoryID'], $territoryCunCount)){
	    		$territoryCunCount[$index['territoryID']] = 0;
	    	}

	    	$regionCunCount[$index['regionID']] += $index['count'];
	    	$areaCunCount[$index['areaID']] += $index['count'];
	    	$territoryCunCount[$index['territoryID']] += $index['count'];

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

	    $return = array('rcount' =>  $regionCount, 'acount' => $areaCount, 'tcount'=> $territoryCount, 'region'=> $region, 'area'=> $area, 'territory'=> $territory, 'rconsumers' => $regionCunCount,'aconsumers' => $areaCunCount,'tconsumers' => $territoryCunCount);
	   // print_r($return); exit();
	    return $return;
		//print_r($result);
		//return $result;
	}
	public function getAllConsumerByPhoneNumber($phone = null) {

		$this->db->select('id, name, msisdn, cnic, brand_id, ambassador_id');
		$this->db->from('consumers');
		$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('id', 'desc');
		
		$query = $this->db->get();
		$result = $query->result_array();
		// print_r($result); exit();
		/*foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['status'] != 0) {
				$result[$key]['status'] = true;
			} else {
				$result[$key]['status'] = false;
			}
		}*/
		if(empty($result)){
			return false;	
		} 		
		return $result[0];
		//return $query->result();
		//print_r($result[0]); exit();
		//return array('consumers' => $result);
	}
	
	function getComplainsReport($id) {

		$this->db->select('phone,description,DATE_FORMAT(date, "%d:%m:%Y - %H:%i:%s") as date');
		$this->db->from('complains');
		$this->db->where('type', $id);

		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		return $result;

	}
	public function findNUpdateAllConsumers($input) {
	//	echo $phone;
		$phone = $input['msisdn'];

		$this->db->select('id');
		$this->db->from('consumers');
		$this->db->like('msisdn', $phone);
	
		$query  = $this->db->get();
		$result = $query->result_array();

		if(!empty($result)){
			$this->db->where('msisdn', $phone);
			$this->db->update('consumers', $input);
			return true;
		}
		else{
			$insert = $this->db->insert('consumers', $input);
	    	return $insert;
			//return false;
		}
		//print_r($result); exit();
		//return $query->result();
		//print_r($query->result());
		//return array('upsellingUploads' => $result);
	}
	public function getComplainsWorkCode($id = null, $fDate = null, $tDate = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
		$whereClause = '';
		$search_sql = '';
		$amt = 10;
		$start = 0;
		//print_r(empty($fDate));
		//print_r(empty($tDate));
		$from_date = !empty($fDate) ? $fDate : date('m/d/Y',  strtotime(date('Y-m-d')));
		$to_date = !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		//$from_date = !empty($fDate2) ? $fDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//$to_date = !empty($tDate2) ? $tDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//print_r($from_date);
		//print_r($to_date);
		//exit();
		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));
		$whereClause .= "and date(date) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(date) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";
		
  		if(!empty($fDate2) &&  !empty($tDate2)){
  			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";	
  		}
  		if(!empty($entered)){
  			$whereClause .= "and user_id = '" . $entered . "'   ";	
  		}
  		if(!empty($closed)){
  			$whereClause .= "and closed_by = '" . $closed . "'  ";
  		}
  		if(!empty($type)){
  			$whereClause .= "and type = '" . $type . "'  ";
  		}
		//$whereClause .= " and date(added_Date) BETWEEN '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "' and '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		if (!empty($sSearch)) {
			$stext = addslashes($sSearch);
			$whereClause .= "and type in (select id from categories where name  like '%$stext%') ";
		}
		//$amt = isset($iDisplayLength)?
		if (isset($iDisplayLength)) {
			$amt = (int) $iDisplayLength;
			if ($amt > 100 || $amt < 10) {
				$amt = 10;
			}
		}
		if (isset($iDisplayStart)) {
			$start = (int) $iDisplayStart;
			if ($start < 0) {
				$start = 0;
			}
		}
		$cols = array('phone', 'name', 'ui_name', 'date',  'cb_name', 'closed_date');
		$scol=0; $sdir='asc';
		//$iSortCol = null, $ = null
		if(isset($iSortCol)){
			$scol = (int)$iSortCol;
			if($scol>5 || $scol<0) $scol=0;
		}
		if(isset($iSortDir)){
			if($iSortDir!='asc') $sdir='desc';
		}
		$scol_name = $cols[$scol];
		$sort = $scol_name.' '.$sdir; 
		 /*
		$subQry = "select type , IFNULL((select name from categories where id = type), 'Workcode Missing') as name
						, sum(case when status = 1 and close_date >= now() then 1 else 0 end) as tatover
						, sum(case when status = 1 and close_date < now() then 1 else 0 end) as tatremain
						, sum(case when status = 0 is not null and close_date <= closed_date then 1 else 0 end) as tatontime
						, sum(case when status = 0 is not null and close_date > closed_date then 1 else 0 end) as tatoftime
					 from complains
					where type != ''
				       $whereClause
				  group by type, name
				  ";
*/

		$subQry = "select type, id, phone, date, status, user_id, closed_by, IFNULL(closed_date,'') as closed_date 
						, IFNULL((select name from categories where id = type), 'Category Missing') as name
						, IFNULL((select name from users where id = user_id), 'Unknown') as ui_name
						, IFNULL((select name from users where id = closed_by), '') as cb_name
						
					 from complains
					where type != ''
				    $whereClause
				  ";
		//print_r($subQry);

		$qry = "select phone, name, ui_name, date,  cb_name, closed_date from (" . $subQry . ") a order by $sort limit $start, $amt";
		//print_r($qry);
		$query_count = $this->db->query('select count(name) as cnt from (' . $subQry . ') b');
		$count = $query_count->result_array();
		$total_records = $count[0]['cnt'];
		$query = $this->db->query($qry);
		$result = $query->result_array();
		$return = array();
		foreach ($result as $key => $index) {
			$return[] = array($index['phone'], $index['name'], $index['ui_name'], $index['date'],  $index['cb_name'], $index['closed_date']);

		}
		return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

	}
	public function getComplainsWorkCodeMsisdnImport($id = null, $fDate = null, $tDate = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
		$whereClause = '';
		$search_sql = '';
		$amt = 10;
		$start = 0;
		//print_r(empty($fDate));
		//print_r(empty($tDate));
		$from_date = !empty($fDate) ? $fDate : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		//$from_date = !empty($fDate2) ? $fDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//$to_date = !empty($tDate2) ? $tDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//print_r($from_date);
		//print_r($to_date);
		//exit();
		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));
		$whereClause .= "and date(date) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(date) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";
		
  		if(!empty($fDate2) &&  !empty($tDate2)){
  			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";	
  		}
  		if(!empty($entered)){
  			$whereClause .= "and user_id = '" . $entered . "'   ";	
  		}
  		if(!empty($closed)){
  			$whereClause .= "and closed_by = '" . $closed . "'  ";
  		}
  		if(!empty($type)){
  			$whereClause .= "and type = '" . $type . "'  ";
  		}
		//$whereClause .= " and date(added_Date) BETWEEN '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "' and '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		$subQry = "select type, id, phone, date, status, user_id, IFNULL(closed_date,'') as closed_date, closed_by
						, IFNULL((select name from categories where id = type), 'Workcode Missing') as name
						, IFNULL((select name from users where id = user_id), 'Unknown') as ui_name
						, IFNULL((select name from users where id = closed_by), '') as cb_name
						
					 from complains
					where type != ''
				       $whereClause
				  ";
		//print_r($subQry); exit();

		$qry = "select phone, name, ui_name as entered_by, date, cb_name as closed_by, closed_date from (" . $subQry . ") a ";
		$query = $this->db->query($qry);
		//$result = $query->result_array();
		return $query->result_array();


		

	}

}
?>
