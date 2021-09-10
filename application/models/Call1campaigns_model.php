<?php
class Call1campaigns_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function setCallCampaignActivity($data) {
		//print_r($data);exit();
		$insert = array();
		$sess_data = $this->session->userdata;

		/*

			$insert[''] = $data['phoneConsumer']:03214823037
			$insert[''] = $data['nameConsumer']:Ali Ahmad
			$insert[''] = $data['isSmoker']:1
			$insert[''] = $data['isTopTraders']:1
			$insert[''] = $data['isQuestion111value']:0
			$insert[''] = $data['isQuestion112value']:0
			$insert[''] = $data['isQuestion113value']:0
			$insert[''] = $data['isQuestion114value']:0
			$insert[''] = $data['isQuestion2value']:1
			$insert[''] = $data['isQuestion21value']:
			$insert[''] = $data['isQuestion22value']:1
			$insert[''] = $data['isQuestion3value']:1
			$insert[''] = $data['isQuestion4value']:
			$insert[''] = $data['isQuestion51value']:0
			$insert[''] = $data['isQuestion52value']:0
			$insert[''] = $data['isQuestion53value']:0
			$insert[''] = $data['isQuestion54value']:0
			$insert[''] = $data['isQuestion55value']:0
			$insert[''] = $data['isQuestion6value']:1
			$insert[''] = $data['isQuestion7value']:1
			$insert[''] = $data['callStatus']:1
		*/

		$insert['consumer_number'] = $data['phoneConsumer'];
		$insert['consumer_name'] = $data['nameConsumer'];
		$insert['smoker'] = $data['isSmoker'];
		$insert['top_traders'] = $data['isTopTraders'];
		$insert['q_1_1'] = $data['isQuestion111value'];
		$insert['q_1_2'] = $data['isQuestion112value'];
		$insert['q_1_3'] = $data['isQuestion113value'];
		$insert['q_1_4'] = $data['isQuestion114value'];
		$insert['q_2_0'] = $data['isQuestion2value'];
		$insert['q_2_1'] = $data['isQuestion21value'];
		$insert['q_2_2'] = $data['isQuestion22value'];
		$insert['q_3_0'] = $data['isQuestion3value'];
		$insert['q_4_0'] = $data['isQuestion4value'];
		$insert['q_5_1'] = $data['isQuestion51value'];
		$insert['q_5_2'] = $data['isQuestion52value'];
		$insert['q_5_3'] = $data['isQuestion53value'];
		$insert['q_5_4'] = $data['isQuestion54value'];
		$insert['q_5_5'] = $data['isQuestion55value'];
		$insert['q_6_0'] = $data['isQuestion6value'];
		$insert['q_7_0'] = $data['isQuestion7value'];
		$insert['call_status'] = $data['callStatus'];

		$insert['added_by'] = $sess_data['data_logged_in']['id'];
		$insert['added'] = date('Y-m-d H:i:s');

		$insert = $this->db->insert('call1_campaigns', $insert);

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
	public function consumerAgentDateImport($id = null, $fDate = null) {
		//, $tDate = null, $region = null, $area = null, $territory = null) {

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

		$whereClause .= "date(created) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(created) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		$query = $this->db->select('call_activities.id, call_activities.call_status, is_named, is_smoker
			, is_eighteen, is_met, is_remember, have_time, aided, call_activities.ambassador_id, BrandAmbassador.code as bacode, BrandAmbassador.name as baname, users.login as aglogin, users.name as agname,consumers.msisdn as cumsisdn, consumers.name as cuname, BrandAmbassador.regionID, BrandAmbassador.areaID')
			->from('call_activities')
			->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
			->join('users', 'users.id = call_activities.created_by', 'left outer')
			->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id', 'left outer')
			->where('consumers.name !=', '')
		//->where('BrandAmbassador.regionID', $region)
		//->where('BrandAmbassador.areaID', $area)
		//->where('BrandAmbassador.territoryID -', $territory)
		//->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
		//->where('BrandAmbassador.status', 'Enabled')
			->where($whereClause)
			->get()->result_array();

		//echo '<pre>'; print_r($query);
		$return = array();
		foreach ($query as $key => $index) {

			$isName = 'No';
			$haveTime = 'No';
			$isSmoker = 'No';
			$isEighteen = 'No';
			$isMet = 'No';
			$isRemembered = 'No';
			$aided = '-';
			if ($index['is_named'] == 1) {
				$isName = 'Yes';
			}
			if ($index['have_time'] == 1) {
				$haveTime = 'Yes';
			}
			if ($index['is_smoker'] == 1 && $haveTime == 'Yes') {
				$isSmoker = 'Yes';
			}
			if ($index['is_eighteen'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes') {
				$isEighteen = 'Yes';
			}
			if ($index['is_met'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$isMet = 'Yes';
			}
			if ($index['is_remember'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$isRemembered = 'Yes';
			}

			if ($index['aided'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$aided = 'Yes';
			} else if ($index['aided'] == 0 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$aided = 'No';
			}

			if ($index['call_status'] == 1) {
				$call_status = 'Success Full';
			} else if ($index['call_status'] == 2) {
				$call_status = 'Wrong Number';
			} else if ($index['call_status'] == 3) {
				$call_status = 'Call Drop';
			} else if ($index['call_status'] == 4) {
				$call_status = 'Unsuccess Full';
			} else if ($index['call_status'] == 5) {
				$call_status = 'Number Busy';
			} else if ($index['call_status'] == 6) {
				$call_status = 'No Answar/ Switch off';
			} else if ($index['call_status'] == 7) {
				$call_status = 'Scheduled Call Back';
			}

			$return[] = array('msisdn' => $index['cumsisdn'], 'name' => $index['cuname'], 'Correct Name' => $isName, 'Have Time' => $haveTime, 'Smoker' => $isSmoker, 'More Then Eighteen' => $isEighteen, 'Met Brand Ambassador' => $isMet, 'Remember' => $isRemembered, 'Aided' => $aided, 'Call Status' => $call_status, 'Agent Name' => $index['agname'], 'Agent Login' => $index['aglogin']);
		}
		return $return;
		echo '<pre>';
		print_r($return);
		//return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

		exit();
		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();

		$regionCunCount = array();
		$areaCunCount = array();
		$territoryCunCount = array();

		foreach ($query as $key => $index) {
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCunCount)) {
				$regionCunCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCunCount)) {
				$areaCunCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount)) {
				$territoryCunCount[$index['territoryID']] = 0;
			}

			$regionCunCount[$index['regionID']] += $index['count'];
			$areaCunCount[$index['areaID']] += $index['count'];
			$territoryCunCount[$index['territoryID']] += $index['count'];

			if (!array_key_exists($index['regionID'], $regionCount)) {
				$regionCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCount)) {
				$areaCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCount)) {
				$territoryCount[$index['territoryID']] = 0;
			}

			$regionCount[$index['regionID']]++;
			$areaCount[$index['areaID']]++;
			$territoryCount[$index['territoryID']]++;
		}

		$return = array('rcount' => $regionCount, 'acount' => $areaCount, 'tcount' => $territoryCount, 'region' => $region, 'area' => $area, 'territory' => $territory, 'rconsumers' => $regionCunCount, 'aconsumers' => $areaCunCount, 'tconsumers' => $territoryCunCount);
		// print_r($return); exit();
		return $return;
		//print_r($result);
		//return $result;
	}
	public function getConsumerRegionAreaTerritoryImport($id = null, $fDate = null, $tDate = null, $region = null, $area = null, $territory = null) {

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

		$whereClause .= "date(created) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(created) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		$query = $this->db->select('call_activities.id, call_activities.call_status, is_named, is_smoker
			, is_eighteen, is_met, is_remember, have_time, aided, call_activities.ambassador_id, BrandAmbassador.code as bacode, BrandAmbassador.name as baname, consumers.msisdn as cumsisdn, consumers.name as cuname, BrandAmbassador.regionID, BrandAmbassador.areaID')
			->from('call_activities')
			->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
			->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id', 'left outer')
			->where('consumers.name !=', '')
			->where('BrandAmbassador.regionID', $region)
			->where('BrandAmbassador.areaID', $area)
			->where('BrandAmbassador.territoryID -', $territory)
		//->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
		//->where('BrandAmbassador.status', 'Enabled')
			->where($whereClause)
			->get()->result_array();

		//echo '<pre>'; print_r($query);
		$return = array();
		foreach ($query as $key => $index) {

			$isName = 'No';
			$haveTime = 'No';
			$isSmoker = 'No';
			$isEighteen = 'No';
			$isMet = 'No';
			$isRemembered = 'No';
			$aided = '-';
			if ($index['is_named'] == 1) {
				$isName = 'Yes';
			}
			if ($index['have_time'] == 1) {
				$haveTime = 'Yes';
			}
			if ($index['is_smoker'] == 1 && $haveTime == 'Yes') {
				$isSmoker = 'Yes';
			}
			if ($index['is_eighteen'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes') {
				$isEighteen = 'Yes';
			}
			if ($index['is_met'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$isMet = 'Yes';
			}
			if ($index['is_remember'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$isRemembered = 'Yes';
			}

			if ($index['aided'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$aided = 'Yes';
			} else if ($index['aided'] == 0 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$aided = 'No';
			}

			if ($index['call_status'] == 1) {
				$call_status = 'Success Full';
			} else if ($index['call_status'] == 2) {
				$call_status = 'Wrong Number';
			} else if ($index['call_status'] == 3) {
				$call_status = 'Call Drop';
			} else if ($index['call_status'] == 4) {
				$call_status = 'Unsuccess Full';
			} else if ($index['call_status'] == 5) {
				$call_status = 'Number Busy';
			} else if ($index['call_status'] == 6) {
				$call_status = 'No Answar/ Switch off';
			} else if ($index['call_status'] == 7) {
				$call_status = 'Scheduled Call Back';
			}

			$return[] = array('msisdn' => $index['cumsisdn'], 'name' => $index['cuname'], 'Correct Name' => $isName, 'Have Time' => $haveTime, 'Smoker' => $isSmoker, 'More Then Eighteen' => $isEighteen, 'Met Brand Ambassador' => $isMet, 'Remember' => $isRemembered, 'Aided' => $aided, 'Call Status' => $call_status, 'Brand Ambassador Name' => $index['baname']);
		}
		return $return;
		echo '<pre>';
		print_r($return);
		//return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

		exit();
		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();

		$regionCunCount = array();
		$areaCunCount = array();
		$territoryCunCount = array();

		foreach ($query as $key => $index) {
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCunCount)) {
				$regionCunCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCunCount)) {
				$areaCunCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount)) {
				$territoryCunCount[$index['territoryID']] = 0;
			}

			$regionCunCount[$index['regionID']] += $index['count'];
			$areaCunCount[$index['areaID']] += $index['count'];
			$territoryCunCount[$index['territoryID']] += $index['count'];

			if (!array_key_exists($index['regionID'], $regionCount)) {
				$regionCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCount)) {
				$areaCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCount)) {
				$territoryCount[$index['territoryID']] = 0;
			}

			$regionCount[$index['regionID']]++;
			$areaCount[$index['areaID']]++;
			$territoryCount[$index['territoryID']]++;
		}

		$return = array('rcount' => $regionCount, 'acount' => $areaCount, 'tcount' => $territoryCount, 'region' => $region, 'area' => $area, 'territory' => $territory, 'rconsumers' => $regionCunCount, 'aconsumers' => $areaCunCount, 'tconsumers' => $territoryCunCount);
		// print_r($return); exit();
		return $return;
		//print_r($result);
		//return $result;
	}
	function sortArr($locations, $orderby, $dir) {
		$sortArray = array();

		foreach ($locations as $location) {
			foreach ($location as $key => $value) {
				if (!isset($sortArray[$key])) {
					$sortArray[$key] = array();
				}
				$sortArray[$key][] = $value;
			}
		}

		//$orderby = "percentage"; //change this to whatever key you want from the array
		if ($dir == 'asc') {
			array_multisort($sortArray[$orderby], SORT_ASC, $locations);
		} else {
			array_multisort($sortArray[$orderby], SORT_DESC, $locations);
		}

		return $locations;
	}
	public function queryAllCallActivities($from_date, $to_date, $sSearch, $iDisplayLength, $iDisplayStart, $iSortCol, $iSortDir, $type) {

		$sess_data = $this->session->userdata;
		//return $sess_data;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$whereClause = '';
		$search_sql = '';
		$limit = 10;
		$start = 0;

		//print_r(empty($fDate));
		//print_r(empty($tDate));

		//$from_date = !empty($fDate2) ? $fDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//$to_date = !empty($tDate2) ? $tDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//print_r($from_date);
		//print_r($to_date);
		//exit();
		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));
		//print_r($f_dates);
		//print_r($t_dates);
		//	$whereClause .= "date(created) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
		//	and date(created) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";
		//$stext = '';

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
		$cols = array($type, 'varified', 'aided', 'unaided');
		$scol = 0;
		$sdir = 'asc';
		//$iSortCol = null, $ = null
		if (isset($iSortCol)) {
			$scol = (int) $iSortCol;
			if ($scol < 0) {
				$scol = 0;
			}

		}
		if (isset($iSortDir)) {
			if ($iSortDir != 'asc') {
				$sdir = 'desc';
			}

		}
		$scol_name = $cols[$scol];
		//echo $scol_name;
		//$sort = $scol_name.' '.$sdir;

		$this->db->select('call_activities.id, call_activities.call_status, is_named, is_smoker
						, is_eighteen, is_met, is_remember, have_time, aided, BrandAmbassador.brandAmbassadorID
						, BrandAmbassador.code, BrandAmbassador.name as ambassador, BrandAmbassador.regionID
						, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name as region, areas.name as area
						, territories.name as territory')
			->from('call_activities')
			->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
			->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id', 'left outer')
			->join('regions', 'regions.id = BrandAmbassador.regionID') //, 'right outer'
			->join('areas', 'areas.id = BrandAmbassador.areaID')
			->join('territories', 'territories.id = BrandAmbassador.territoryID');

		if (!empty($sSearch)) {
			$stext = addslashes($sSearch);
			$this->db->like('BrandAmbassador`.`name', $stext, 'both');
		}
		if ($region_id != '' && $region_id != null && $region_id > 0) {
			$this->db->where('BrandAmbassador.regionID', $region_id);
		}
		if ($territory_id != '' && $territory_id != null && $territory_id > 0) {
			$this->db->where('BrandAmbassador.territoryID', $territory_id);
		}
		if ($area_id != '' && $area_id != null && $area_id > 0) {
			$this->db->where('BrandAmbassador.areaID', $area_id);

		}

		$count = $more = $this->db->get();

		//->where('BrandAmbassador.status', 'Enabled')
		//->where('call_activities.call_status',1)

		//$count = $more = $this->db;
		$total_records = $count->num_rows();
		//print_r($total_records);
		$this->db->order_by($scol_name, $sdir);
		if ($start && $limit) {
			$more->limit($limit, $start - 1);
		}

		$query = $more->result_array();
		//print_r($query);
		//return array('query' => $query, 'total_records' => $total_records);
		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();
		$ambassador = array();

		$regionCountVarified = $regionCountUnverified = $regionCountAided = $regionCountUnaided = $regionCountName = $regionCountSmoker = $regionCountEighteen = $regionCountMet = $regionCountTime = array();
		$areaCountVarified = $areaCountUnverified = $areaCountAided = $areaCountUnaided = $areaCountName = $areaCountSmoker = $areaCountEighteen = $areaCountMet = $areaCountTime = array();
		$territoryCountVarified = $territoryCountUnverified = $territoryCountAided = $territoryCountUnaided = $territoryCountName = $territoryCountSmoker = $territoryCountEighteen = $territoryCountMet = $territoryCountTime = array();
		$baCountVarified = $baCountUnverified = $baCountAided = $baCountUnaided = $baCountName = $baCountSmoker = $baCountEighteen = $baCountMet = $baCountTime = array();

		foreach ($query as $key => $index) {
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;
			$ambassador[$index['brandAmbassadorID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCountAided)) {
				$regionCountAided[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountAided)) {
				$areaCountAided[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountAided)) {
				$territoryCountAided[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['brandAmbassadorID'], $baCountAided)) {
				$baCountAided[$index['brandAmbassadorID']] = 0;
			}

			if (!array_key_exists($index['regionID'], $regionCountUnaided)) {
				$regionCountUnaided[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountUnaided)) {
				$areaCountUnaided[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountUnaided)) {
				$territoryCountUnaided[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['brandAmbassadorID'], $baCountUnaided)) {
				$baCountUnaided[$index['brandAmbassadorID']] = 0;
			}

			if (!array_key_exists($index['regionID'], $regionCountVarified)) {
				$regionCountVarified[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountVarified)) {
				$areaCountVarified[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountVarified)) {
				$territoryCountVarified[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['brandAmbassadorID'], $baCountVarified)) {
				$baCountVarified[$index['brandAmbassadorID']] = 0;
			}

			if (!array_key_exists($index['regionID'], $regionCountUnverified)) {
				$regionCountUnverified[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountUnverified)) {
				$areaCountUnverified[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountUnverified)) {
				$territoryCountUnverified[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['brandAmbassadorID'], $baCountUnverified)) {
				$baCountUnverified[$index['brandAmbassadorID']] = 0;
			}

			if ($index['aided'] == 1) {
				$regionCountAided[$index['regionID']]++;
				$areaCountAided[$index['areaID']]++;
				$territoryCountAided[$index['territoryID']]++;
				$baCountAided[$index['brandAmbassadorID']]++;

			} else {
				$regionCountUnaided[$index['regionID']]++;
				$areaCountUnaided[$index['areaID']]++;
				$territoryCountUnaided[$index['territoryID']]++;
				$baCountUnaided[$index['brandAmbassadorID']]++;
			}
			if ($index['is_named'] == 1 && $index['is_smoker'] == 1 && $index['is_eighteen'] == 1 && $index['is_met'] == 1) {
				$regionCountVarified[$index['regionID']]++;
				$areaCountVarified[$index['areaID']]++;
				$territoryCountVarified[$index['territoryID']]++;
				$baCountVarified[$index['brandAmbassadorID']]++;
			} else {
				$regionCountUnverified[$index['regionID']]++;
				$areaCountUnverified[$index['areaID']]++;
				$territoryCountUnverified[$index['territoryID']]++;
				$baCountUnverified[$index['brandAmbassadorID']]++;
			}

			/*if($index['is_named'] == 0){
				    	   $regionCountName[$index['regionID']]++;
				    	   $areaCountName[$index['areaID']]++;
				    	   $territoryCountName[$index['territoryID']]++;
				    	   $baCountName[$index['brandAmbassadorID']]++;
					    }
					    if($index['is_smoker'] == 0){
					    	$regionCountSmoker[$index['regionID']]++;
					    	$areaCountSmoker[$index['areaID']]++;
				    	    $territoryCountSmoker[$index['territoryID']]++;
				    	    $baCountSmoker[$index['brandAmbassadorID']]++;
					    }
					    if($index['is_eighteen'] == 0){
					    	$regionCountEighteen[$index['regionID']]++;
					    	$areaCountEighteen[$index['areaID']]++;
				    	    $territoryCountEighteen[$index['territoryID']]++;
				    	    $baCountEighteen[$index['brandAmbassadorID']]++;
					    }
					    if($index['is_met'] == 0){
					    	$regionCountMet[$index['regionID']]++;
					    	$areaCountMet[$index['areaID']]++;
				    	    $territoryCountMet[$index['territoryID']]++;
				    	    $baCountMet[$index['brandAmbassadorID']]++;
					    }
					    if($index['have_time'] == 0){
					    	$regionCountTime[$index['regionID']]++;
					    	$areaCountTime[$index['areaID']]++;
				    	    $territoryCountTime[$index['territoryID']]++;
				    	    $baCountTime[$index['brandAmbassadorID']]++;
					    }
			*/
		}

		return array('region' => array('all' => $region
			, 'countVarified' => $regionCountVarified
			, 'countUnverified' => $regionCountUnverified
			, 'countAided' => $regionCountAided
			, 'countUnaided' => $regionCountUnaided,
		)
			, 'area' => array('all' => $area
				, 'countVarified' => $areaCountVarified
				, 'countUnverified' => $areaCountUnverified
				, 'countAided' => $areaCountAided
				, 'countUnaided' => $areaCountUnaided,
			)
			, 'territory' => array('all' => $territory
				, 'countVarified' => $territoryCountVarified
				, 'countUnverified' => $territoryCountUnverified
				, 'countAided' => $territoryCountAided
				, 'countUnaided' => $territoryCountUnaided,
			)
			, 'ambassador' => array('all' => $ambassador
				, 'countVarified' => $baCountVarified
				, 'countUnverified' => $baCountUnverified
				, 'countAided' => $baCountAided
				, 'countUnaided' => $baCountUnaided,
			),
		);

	}
	public function loadTerritoryData($sSearch, $iDisplayLength, $iDisplayStart, $iSortCol, $iSortDir, $region_id, $area_id, $territory_id) {

		// echo '<pre>'; print_r($ambassador); //exit();
		$count = 0;
		$return = $response = array();
		foreach ($territory as $key => $index) {

			$return['region'] = $index[0]['region'];
			$return['area'] = $index[0]['area'];
			$return['territory'] = $index[0]['territory'];
			$percentage = 0;
			$total = $territoryCountUnverified[$key] + $territoryCountVarified[$key];
			if ($territoryCountUnverified[$key] == 0) {
				$percentage = 100;
			}
			if ($total > 0) {
				$percentage = round(($territoryCountVarified[$key] / $total) * 100, 1);
			}
			$aided = $baCountAided[$key];
			$unaided = $baCountUnaided[$key];
			$return['aided'] = 0;
			$return['unaided'] = 0;
			$aidnot = $aided + $unaided;
			if ($aidnot > 0) {
				$return['aided'] = round(($aided / $aidnot) * 100, 1);
				$return['unaided'] = round(($unaided / $aidnot) * 100, 1);
			}

			$response[] = array($index[0]['region'] . ' - ' . $index[0]['area'], $index[0]['territory'], '', $index[0]['name'], $percentage, $return['aided'], $return['unaided']);

			$count++;

		}
		// echo $scol .'<pre>'; print_r($response); exit();
		$return2 = $this->sortArr($response, $scol, $sdir);
		foreach ($return2 as $key => $index) {
			$return2[$key][4] = $index[4] . '%';
			$return2[$key][5] = $index[5] . '%';
			$return2[$key][6] = $index[6] . '%';

		}
		//echo '<pre>'; print_r($return); exit();
		return array('iTotalRecords' => $count, 'iTotalDisplayRecords' => $count, 'aaData' => $return2);

	}
	public function loadAmbassadorData($data, $type, $iSortCol, $iSortDir) {
		//echo '<pre>'; print_r($data); exit();
		//$ambassador = $data['all'];
		//$ambassador = $data['ambassador'];
		$scol = 0;
		$sdir = 'asc';
		//$iSortCol = null, $ = null
		if (isset($iSortCol)) {
			$scol = (int) $iSortCol;
			if ($scol < 0) {
				$scol = 0;
			}

		}
		if (isset($iSortDir)) {
			if ($iSortDir != 'asc') {
				$sdir = 'desc';
			}

		}
		$count = 0;
		$return = $response = array();
		foreach ($data['all'] as $key => $index) {

			//$name = $index[$key][$type];

			/*$return['region']    = $index[0]['region'];
				    	$return['area']      = $index[0]['area'];
				    	$return['territory'] = $index[0]['territory'];
			*/
			$percentage = 0;
			$total = $data['countUnverified'][$key] + $data['countVarified'][$key]; //$baCountUnverified[$key]+$baCountVarified[$key];;
			if ($data['countUnverified'][$key] == 0) {
				$percentage = 100;
			}
			if ($total > 0) {
				$percentage = round(($data['countVarified'][$key] / $total) * 100, 1);
			}
			$return['varified'] = $percentage;

			$aided = $data['countAided'][$key];
			$unaided = $data['countUnaided'][$key];
			$returnAided = 0;
			$returnUnaided = 0;
			$aidnot = $aided + $unaided;
			if ($aidnot > 0) {
				$returnAided = round(($aided / $aidnot) * 100, 1);
				$returnUnaided = round(($unaided / $aidnot) * 100, 1);
			}

			$response[] = array($index[0][$type], $percentage, $returnAided, $returnUnaided);
			/*foreach($index as $key2 => $index2){

	    	}*/
			$count++;

		}
		// echo $scol .'<pre>'; print_r($response); exit();
		$return2 = $this->sortArr($response, $scol, $sdir);
		foreach ($return2 as $key => $index) {
			$return2[$key][1] = $index[1] . '%';
			$return2[$key][2] = $index[2] . '%';
			$return2[$key][3] = $index[3] . '%';

		} /**/
		//echo '<pre>'; print_r($return); exit();
		return array('iTotalRecords' => $count, 'iTotalDisplayRecords' => $count, 'aaData' => $return2);

	}
	public function getAllCallActivitiesLocation($id = null, $fDate = null, $tDate = null, $type = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null) {

		$sess_data = $this->session->userdata;
		//return $sess_data;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$from_date = !empty($fDate) ? $fDate : date('m/d/Y', strtotime(date('Y-m-d')));
		$to_date = !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		$query = $this->queryAllCallActivities($from_date, $to_date, $sSearch, $iDisplayLength, $iDisplayStart, $iSortCol, $iSortDir, $type);
		//print_r($query); exit();
		if (empty($query[$type]['all'])) {
			return array('iTotalRecords' => 0, 'iTotalDisplayRecords' => 0, 'aaData' => $query[$type]['all']);
		}
		return $this->loadAmbassadorData($query[$type], $type, $iSortCol, $iSortDir);

		echo '<pre>';
		print_r($query);exit();
		if ($type == 'region') {
			return $this->loadRegionData($query['region']);
		}
		if ($type == 'area') {
			return $this->loadAreaData($query['area']);
		}
		if ($type == 'territory') {
			return $this->loadTerritoryData($query['territory']);
		}
		if ($type == 'ambassador') {
			return $this->loadAmbassadorData($query['ambassador']);
		}

		exit();

	}
	public function getAllAgentCallActivities($id = null, $fDate = null, $tDate = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null, $region = null, $area = null, $territory = null) {

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

		$whereClause .= "date(created) >= '" . $f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . "'
  		and date(created) <= '" . $t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . "' ";

		if (!empty($sSearch)) {
			$stext = addslashes($sSearch);
			$whereClause .= " and consumers.msisdn like '%$stext%' ";
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
		$cols = array('cumsisdn', 'cuname', 'is_named', 'is_smoker', 'is_eighteen', 'is_met', 'is_remember', 'have_time', 'aided', 'call_status', 'bacode', 'baname');
		$scol = 0;
		$sdir = 'asc';
		//$iSortCol = null, $ = null
		if (isset($iSortCol)) {
			$scol = (int) $iSortCol;
			if ($scol > 5 || $scol < 0) {
				$scol = 0;
			}

		}
		if (isset($iSortDir)) {
			if ($iSortDir != 'asc') {
				$sdir = 'desc';
			}

		}
		$scol_name = $cols[$scol];
		$sort = $scol_name . ' ' . $sdir;

		//echo '<pre>';
		$this->db->select('call_activities.id, call_activities.call_status, is_named, is_smoker
			, is_eighteen, is_met, is_remember, have_time, aided, call_activities.ambassador_id, BrandAmbassador.code as bacode, BrandAmbassador.name as baname, users.name as agname, users.login as aglogin, consumers.msisdn as cumsisdn, consumers.name as cuname')
			->from('call_activities')
			->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
			->join('users', 'users.id = call_activities.created_by', 'left outer')
			->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id', 'left outer')
			->where('consumers.name !=', '')
			->where($whereClause);
		if ($region != '' && $region != null && $region > 0) {
			$this->db->where('BrandAmbassador.regionID', $region);
		}
		if ($territory != '' && $territory != null && $territory > 0) {
			$this->db->where('BrandAmbassador.territoryID', $territory);
		}
		if ($area != '' && $area != null && $area > 0) {
			$this->db->where('BrandAmbassador.areaID', $area);

		}

		$total_records = $this->db->get()->num_rows();

		$this->db->select('call_activities.id, call_activities.call_status, is_named, is_smoker
			, is_eighteen, is_met, is_remember, have_time, aided, call_activities.ambassador_id, BrandAmbassador.code as bacode, BrandAmbassador.name as baname, users.name as agname, users.login as aglogin, consumers.msisdn as cumsisdn, consumers.name as cuname')
			->from('call_activities')
			->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
			->join('users', 'users.id = call_activities.created_by', 'left outer')
			->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id', 'left outer')
			->where('consumers.name !=', '')
			->where($whereClause);
		if ($region != '' && $region != null && $region > 0) {
			$this->db->where('BrandAmbassador.regionID', $region);
		}
		if ($territory != '' && $territory != null && $territory > 0) {
			$this->db->where('BrandAmbassador.territoryID', $territory);
		}
		if ($area != '' && $area != null && $area > 0) {
			$this->db->where('BrandAmbassador.areaID', $area);

		}
		//->join('consumers', 'consumers.id = call_activities.consumer_id', 'left outer')
		//->where('BrandAmbassador.status', 'Enabled')
		//->where($whereClause);
		$this->db->order_by($scol_name, $sdir);
		if ($start && $amt) {
			$this->db->limit($amt, $start - 1);
		}
		$more = $this->db->get();
		//$count = $more = $this->db;
		//$total_records = $count->num_rows();;
		//print_r($total_records);

		$query = $more->result_array();
		//$result = $query;

		//print_r($query); exit();
		//$query = $this->db->get()->result_array();
		$cols = array('cumsisdn', 'cuname', 'is_named', 'is_smoker', 'is_eighteen', 'is_met', 'is_remember', 'have_time', 'aided', 'call_status', 'agname', 'aglogin'); //'baname', 'baname',

		$return = array();
		foreach ($query as $key => $index) {

			$isName = 'No';
			$haveTime = 'No';
			$isSmoker = 'No';
			$isEighteen = 'No';
			$isMet = 'No';
			$isRemembered = 'No';
			$aided = '-';
			if ($index['is_named'] == 1) {
				$isName = 'Yes';
			}
			if ($index['have_time'] == 1) {
				$haveTime = 'Yes';
			}
			if ($index['is_smoker'] == 1 && $haveTime == 'Yes') {
				$isSmoker = 'Yes';
			}
			if ($index['is_eighteen'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes') {
				$isEighteen = 'Yes';
			}
			if ($index['is_met'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$isMet = 'Yes';
			}
			if ($index['is_remember'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$isRemembered = 'Yes';
			}

			if ($index['aided'] == 1 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$aided = 'Yes';
			} else if ($index['aided'] == 0 && $haveTime == 'Yes' && $isSmoker == 'Yes' && $isEighteen == 'Yes') {
				$aided = 'No';
			}

			if ($index['call_status'] == 1) {
				$call_status = 'Success Full';
			} else if ($index['call_status'] == 2) {
				$call_status = 'Wrong Number';
			} else if ($index['call_status'] == 3) {
				$call_status = 'Call Drop';
			} else if ($index['call_status'] == 4) {
				$call_status = 'Unsuccess Full';
			} else if ($index['call_status'] == 5) {
				$call_status = 'Number Busy';
			} else if ($index['call_status'] == 6) {
				$call_status = 'No Answar/ Switch off';
			} else if ($index['call_status'] == 7) {
				$call_status = 'Scheduled Call Back';
			}

			$return[] = array($index['cumsisdn'], $index['cuname'], $isName, $isSmoker, $isEighteen, $isMet, $isRemembered, $haveTime, $aided, $call_status, $index['agname']);
		}

		return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);

		exit();
		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();

		$regionCunCount = array();
		$areaCunCount = array();
		$territoryCunCount = array();

		foreach ($query as $key => $index) {
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCunCount)) {
				$regionCunCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCunCount)) {
				$areaCunCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount)) {
				$territoryCunCount[$index['territoryID']] = 0;
			}

			$regionCunCount[$index['regionID']] += $index['count'];
			$areaCunCount[$index['areaID']] += $index['count'];
			$territoryCunCount[$index['territoryID']] += $index['count'];

			if (!array_key_exists($index['regionID'], $regionCount)) {
				$regionCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCount)) {
				$areaCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCount)) {
				$territoryCount[$index['territoryID']] = 0;
			}

			$regionCount[$index['regionID']]++;
			$areaCount[$index['areaID']]++;
			$territoryCount[$index['territoryID']]++;
		}

		$return = array('rcount' => $regionCount, 'acount' => $areaCount, 'tcount' => $territoryCount, 'region' => $region, 'area' => $area, 'territory' => $territory, 'rconsumers' => $regionCunCount, 'aconsumers' => $areaCunCount, 'tconsumers' => $territoryCunCount);
		// print_r($return); exit();
		return $return;
		//print_r($result);
		//return $result;
	}
	public function getAllCallActivities($phone = null) {
		$this->db->select('count(call_activities.id) as count,consumers.id, is_named, is_smoker, is_eighteen,  is_met, aided, have_time, call_status
						, call_activities.ambassador_id, BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name as region, areas.name as area, territories.name as territory');
		$this->db->from('call_activities');
		$this->db->join('consumers', 'consumers.id = call_activities.consumer_id');
		$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = consumers.ambassador_id', 'left outer');
		$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'right outer'); //, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID', 'right outer');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID', 'right outer');
		//$this->db->where('BrandAmbassador.status', 'Enabled');
		$this->db->where('call_activities.call_status', 1);
		//consumers.ambassador_id
		//$this->db->where('call_activities.call_status', 1);
		//$this->db->where('call_activities.is_smoker', 1);
		//$this->db->where('call_activities.is_eighteen', 1);
		//$this->db->where('call_activities.is_met', 1);
		$this->db->group_by('consumers.id, call_activities.ambassador_id, is_named, is_smoker, is_eighteen,  is_met, have_time, call_status, BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name, areas.name , territories.name');
		//echo '<pre>';
		//$query = $this->db->get();
		//$result = $query->result_array();
		//print_r($result); exit();/**/
		$query = $this->db->get()->result_array();

		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();

		$regionCunCount = $regionCountVarified = $regionCountUnverified = $regionCountAided = $regionCountUnaided = array();
		$areaCunCount = $areaCountVarified = $areaCountUnverified = $areaCountAided = $areaCountUnaided = array();
		$territoryCunCount = $territoryCountVarified = $territoryCountUnverified = $territoryCountAided = $territoryCountUnaided = array();

		/*$regionCountVarified = $regionCountUnverified = $regionCountAided = $regionCountUnaided = array();
			    $areaCountVarified = $areaCountUnverified = $areaCountAided = $areaCountUnaided = array();
			    $territoryCountVarified = $territoryCountUnverified = $territoryCountAided = $territoryCountUnaided = array();
			    $baCountVarified = $baCountUnverified = $baCountAided = $baCountUnaided = array();
		*/

		foreach ($query as $key => $index) {
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCunCount)) {
				$regionCunCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCunCount)) {
				$areaCunCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount)) {
				$territoryCunCount[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['regionID'], $regionCount)) {
				$regionCount[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCount)) {
				$areaCount[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCount)) {
				$territoryCount[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['regionID'], $regionCountVarified)) {
				$regionCountVarified[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountVarified)) {
				$areaCountVarified[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountVarified)) {
				$territoryCountVarified[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['regionID'], $regionCountUnverified)) {
				$regionCountUnverified[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountUnverified)) {
				$areaCountUnverified[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountUnverified)) {
				$territoryCountUnverified[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['regionID'], $regionCountAided)) {
				$regionCountAided[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountAided)) {
				$areaCountAided[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountAided)) {
				$territoryCountAided[$index['territoryID']] = 0;
			}
			if (!array_key_exists($index['regionID'], $regionCountUnaided)) {
				$regionCountUnaided[$index['regionID']] = 0;
			}
			if (!array_key_exists($index['areaID'], $areaCountUnaided)) {
				$areaCountUnaided[$index['areaID']] = 0;
			}
			if (!array_key_exists($index['territoryID'], $territoryCountUnaided)) {
				$territoryCountUnaided[$index['territoryID']] = 0;
			}

			$regionCunCount[$index['regionID']] += $index['count'];
			$areaCunCount[$index['areaID']] += $index['count'];
			$territoryCunCount[$index['territoryID']] += $index['count'];

			$regionCount[$index['regionID']]++;
			$areaCount[$index['areaID']]++;
			$territoryCount[$index['territoryID']]++;

			/* [12] => 217
				            [14] => 13
				            [15] => 3
				            [9] => 23
				            [7] => 44
				            [8] => 92
			*/
			if ($index['aided'] == 1) {
				$regionCountAided[$index['regionID']]++;
				$areaCountAided[$index['areaID']]++;
				$territoryCountAided[$index['territoryID']]++;
			} else {
				$regionCountUnaided[$index['regionID']]++;
				$areaCountUnaided[$index['areaID']]++;
				$territoryCountUnaided[$index['territoryID']]++;
			}
			if ($index['is_named'] == 1 && $index['is_smoker'] == 1 && $index['is_eighteen'] == 1 && $index['is_met'] == 1) {
				$regionCountVarified[$index['regionID']]++;
				$areaCountVarified[$index['areaID']]++;
				$territoryCountVarified[$index['territoryID']]++;
			} else {
				$regionCountUnverified[$index['regionID']]++;
				$areaCountUnverified[$index['areaID']]++;
				$territoryCountUnverified[$index['territoryID']]++;
			}

		}

		$return = array('rcount' => $regionCount
			, 'acount' => $areaCount
			, 'tcount' => $territoryCount
			, 'region' => $region
			, 'area' => $area
			, 'territory' => $territory
			, 'rconsumers' => $regionCunCount
			, 'aconsumers' => $areaCunCount
			, 'tconsumers' => $territoryCunCount
			, 'vrconsumers' => $regionCountVarified
			, 'vaconsumers' => $areaCountVarified
			, 'vtconsumers' => $territoryCountVarified
			, 'urconsumers' => $regionCountUnverified
			, 'uaconsumers' => $areaCountUnverified
			, 'utconsumers' => $territoryCountUnverified
			, 'adrconsumers' => $regionCountAided
			, 'adaconsumers' => $areaCountAided
			, 'adtconsumers' => $territoryCountAided
			, 'uadrconsumers' => $regionCountUnaided
			, 'uadaconsumers' => $areaCountUnaided
			, 'uadtconsumers' => $territoryCountUnaided,
		);
		//echo '<pre>'; print_r($return); exit();
		return $return;
		//print_r($result);
		//return $result;
	}
	public function updateCallActivity($data) {
		//print_r($data); exit();
		$insert = array();
		$sess_data = $this->session->userdata;
		$insert['consumer_id'] = $data['consumerID'];
		$insert['ambassador_id'] = $data['brandID'];
		$insert['brand_id'] = $data['ambassadorID'];
		$insert['call_status'] = $data['callStatus'];
		$insert['is_named'] = $data['isNamed'];
		$insert['is_smoker'] = $data['isSmoker'];
		$insert['is_eighteen'] = $data['isEighteen'];
		$insert['is_met'] = $data['isMet'];
		$insert['have_time'] = $data['haveTime'];
		$insert['is_remember'] = $data['isRemembered'];
		$insert['aided'] = $data['isAided'];

		$insert['created_by'] = $sess_data['data_logged_in']['id'];
		$insert['created'] = date('Y-m-d H:i:s');

		$insert = $this->db->insert('call_activities', $insert);

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
	public function getAllComplains($limit_start = null, $limit_end = null, $phone = null) {
		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complains');
		$this->db->like('phone', $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['status'] != 0) {
				$result[$key]['status'] = true;
			} else {
				$result[$key]['status'] = false;
			}

		}

		//return $query->result();
		//print_r($query->result());
		return array('complains' => $result);
	}
	public function getAllOpenedComplains($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complains');
		$this->db->where('status', 1);
		$this->db->where('searched', 0);

		$this->db->order_by('date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}
		$query = $this->db->get();
		$result = $query->result_array();

		return array('openedComplains' => $result);
	}
	public function getOpenComplainsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 1);
		$this->db->where('searched', 0);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCountNew' => $query);
	}
	public function getAllClosedComplains($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,closed_date,status,user_id');
		$this->db->from('complains');
		$this->db->where('status', 0);
		//$this->db->where('searched', 0);
		$this->db->order_by('closed_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}

		$query = $this->db->get();
		$result = $query->result_array();

		return array('closedComplains' => $result);
	}
	public function getAllViewedComplains($limit_start = null, $limit_end = null) {
		$this->db->select('id,phone,type,description,searched_date,status,user_id');
		$this->db->from('complains');
		$this->db->where('status', 1);
		$this->db->where('searched', 1);
		$this->db->order_by('searched_date', 'desc');
		if ($limit_start && $limit_end) {
			$this->db->limit(20, $limit_start - 1);
		}

		$query = $this->db->get();
		$result = $query->result_array();

		return array('viewedComplains' => $result);
	}
	public function getViewComplainsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 1);
		$this->db->where('searched', 1);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCountView' => $query);
	}
	public function getCloseComplainsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('status', 0);
		//$this->db->where('searched', 0);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCountClose' => $query);
	}
	public function getComplainsCount($phone = null) {
		$this->db->select('*');
		$this->db->where('phone', $phone);
		$query = $this->db->count_all_results('complains');
		//print_r($query);
		// $this->db->();
		//return $query;
		return array('complainsCount' => $query);
	}
	function update_complain($data) {
		$id = $data['id'];
		unset($data['id']);
		//$data['password'] = $this->__encrip_password($data['password']);
		//$data['user_name'] = str_replace(' ','',$data['name']);
		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();
		//if(array_key_exists ( 'description' , $data ))

		if ($data['status'] == 0 && $id == 0) {
			$data['user_id'] = $data['closed_by'] = $sess_data['data_logged_in']['id'];
			$data['date'] = $data['closed_date'] = date("Y-m-d H:i:s");
			$data['description'] = base64_decode($data['description']);
			$data['status'] = 0; //Acknowledgement - Temp Restoration High ARPU
		} else if ($data['status'] == 0 && $id != 0) {
			$data['closed_by'] = $sess_data['data_logged_in']['id'];
			$data['closed_date'] = date("Y-m-d H:i:s");
		} else {
			$data['user_id'] = $sess_data['data_logged_in']['id'];
			$data['date'] = date("Y-m-d H:i:s");
			$data['status'] = 1;
			$data['description'] = base64_decode($data['description']);
		}

		if ($id == 0) {
			$insert = $this->db->insert('complains', $data);
		} else {
			$this->db->where('id', $id);
			$insert = $this->db->update('complains', $data);
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
	public function addComplain($complain) {
		$insert = $this->db->insert('complains', $data);
		return $insert;
	}
	public function updateComplain($complain) {
		$this->db->where('complain_id', $id);
		$this->db->update('complains', $data);
		$report = array();
		$report['error'] = $this->db->_error_number();
		$report['message'] = $this->db->_error_message();
		if ($report !== 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Delete user
	 * @param int $id - user id
	 * @return boolean
	 */
	function deleteComplain($id) {
		$this->db->where('complain_id', $id);
		$this->db->delete('complains');
	}
	function update_searched($id) {

		$this->db->select('id,phone,type,description,date,status,user_id');
		$this->db->from('complains');
		$this->db->where('searched', 0);
		$this->db->where('id', $id);

		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result);
		if (!empty($result)) {
			$sess_data = $this->session->userdata;
			$data['searched_by'] = $sess_data['data_logged_in']['id'];
			$data['searched_date'] = date("Y-m-d H:i:s");
			$data['searched'] = 1;
			$this->db->where('id', $id);
			$insert = $this->db->update('complains', $data);
		}
		//	return $insert;

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
	public function getComplainsWorkCode($id = null, $fDate = null, $tDate = null, $sSearch = null, $iDisplayLength = null, $iDisplayStart = null, $iSortCol = null, $iSortDir = null, $fDate2 = null, $tDate2 = null, $entered = null, $closed = null, $type = null) {
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

		if (!empty($fDate2) && !empty($tDate2)) {
			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";
		}
		if (!empty($entered)) {
			$whereClause .= "and user_id = '" . $entered . "'   ";
		}
		if (!empty($closed)) {
			$whereClause .= "and closed_by = '" . $closed . "'  ";
		}
		if (!empty($type)) {
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
		$cols = array('phone', 'name', 'ui_name', 'date', 'cb_name', 'closed_date');
		$scol = 0;
		$sdir = 'asc';
		//$iSortCol = null, $ = null
		if (isset($iSortCol)) {
			$scol = (int) $iSortCol;
			if ($scol > 5 || $scol < 0) {
				$scol = 0;
			}

		}
		if (isset($iSortDir)) {
			if ($iSortDir != 'asc') {
				$sdir = 'desc';
			}

		}
		$scol_name = $cols[$scol];
		$sort = $scol_name . ' ' . $sdir;
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
			$return[] = array($index['phone'], $index['name'], $index['ui_name'], $index['date'], $index['cb_name'], $index['closed_date']);

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

		if (!empty($fDate2) && !empty($tDate2)) {
			$f2_dates = explode('/', trim($fDate2));
			$t2_dates = explode('/', trim($tDate2));
			$whereClause .= "and date(closed_date) >= '" . $f2_dates[2] . "-" . $f2_dates[0] . "-" . $f2_dates[1] . "'
  				and date(date) <= '" . $t2_dates[2] . "-" . $t2_dates[0] . "-" . $t2_dates[1] . "'  ";
		}
		if (!empty($entered)) {
			$whereClause .= "and user_id = '" . $entered . "'   ";
		}
		if (!empty($closed)) {
			$whereClause .= "and closed_by = '" . $closed . "'  ";
		}
		if (!empty($type)) {
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
