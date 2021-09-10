<?php
class Consumer_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function getAllBrandConsumer($from_date, $to_date) {
		$ft_date = date('Y-m-d');

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		$from_time = !empty($from_date) ? strtotime($f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . ' 00:00:00') : strtotime($ft_date . ' 00:00:00');
		$to_time = !empty($to_date) ? strtotime($t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . ' 23:59:59') : strtotime($ft_date . ' 23:59:59');

		$sess_data = $this->session->userdata;
		$up_user = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$region_id = $sess_data['data_logged_in']['region_id'];
		$area_id = $sess_data['data_logged_in']['area_id'];
		$territory_id = $sess_data['data_logged_in']['territory_id'];

		$this->db->select('Consumer.brandID , Brand.name, Brand.code, sum(case Consumer.status when "Unverified" then 1 else 0 end) unverified, sum(case Consumer.status when "Verified" then 1 else 0 end) verified ');
		$this->db->from('Consumer');
		$this->db->join('Brand', 'Brand.brandID = Consumer.brandID');
		$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = Consumer.brandAmbassadorID');
		$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'left outer'); //, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		$this->db->where('BrandAmbassador.status', 'Enabled');
		//	$this->db->where('Consumer.creationTime >=', $from_time);
		//	$this->db->where('Consumer.creationTime <=', $to_time);
		$this->db->group_by('Consumer.brandID  , Brand.name, Brand.code');
		$query = $this->db->get()->result_array();
		//echo '<pre>';
		//print_r($query);
		//exit();
		$categories = array();
		$totalsArray = array('verified' => 0, 'unverified' => 0);
		$data = array();
		$colors = array(0 => "#008d4c", 1 => "#e08e0b", 2 => "#555299", 3 => "#d73925", 4 => "#367fa9", 5 => "#7cb5ec", 6 => "#434348", 7 => "#90ed7d", 8 => "#f7a35c", 9 => "#91e8e1");
		foreach ($query as $key => $index) {
			//$categories[$index['brandID']]['name'] = $index['name'];
			$inCo = $key % 9;
			$categories[] = $index['name'];

			$totals = $index['verified'] + $index['unverified'];
			$verified = 0;
			$unverified = 0;
			if ($totals > 0) {

				$verified = round(($index['verified'] / $totals) * 100, 1);
				$unverified = round(($index['unverified'] / $totals) * 100, 1);

			}
			//$data[$key]['verified'] = $index['verified'];
			//$data[$key]['unverified'] = $index['unverified'];
			$data[$key]['y'] = $totals;
			$data[$key]['color'] = $colors[$inCo];
			$data[$key]['drilldown']['name'] = $index['name'];
			$data[$key]['drilldown']['categories'] = array($index['code'] . ' Verified', $index['code'] . ' Unverified');
			$data[$key]['drilldown']['data'] = array($index['verified'], $index['unverified']);
			$data[$key]['drilldown']['color'] = $colors[$inCo];
			//print_r($index['verified']);
			//print_r($index['unverified']);

			$totalsArray['verified'] += $index['verified'];
			$totalsArray['unverified'] += $index['unverified'];

			/*y: 56.33,
				            color: colors[0],
				            drilldown: {
				                name: 'MSIE versions',
				                categories: ['MSIE 6.0', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0', 'MSIE 10.0', 'MSIE 11.0'],
				                data: [1.06, 0.5, 17.2, 8.11, 5.33, 24.13],
				                color: colors[0]
			*/

		}
		//echo '<pre>';
		//print_r($totalsArray);
		//print_r($totalsArray);
		//print_r($data);exit();

		foreach ($data as $k => $i) {
			//$data[]

			$tot = $totalsArray['verified'] + $totalsArray['unverified'];
			//$data[$key]['verified'] = $index['verified'];
			//$data[$key]['unverified']
			if ($tot > 0) {
				$data[$k]['y'] = round(($i['y'] / $tot) * 100, 2);
				$data[$k]['drilldown']['data'][0] = round(($i['drilldown']['data'][0] / $tot) * 100, 2);
				$data[$k]['drilldown']['data'][1] = round(($i['drilldown']['data'][1] / $tot) * 100, 2);

			}

		}

		return array('categories' => $categories, 'data' => $data);
		//print_r($result);
		//return $result;
	}
	public function findNUpdateAllConsumers($input) {
		//	echo $phone;
		$phone = $input['msisdn'];

		$this->db->select('consumerID');
		$this->db->from('Consumer');
		$this->db->like('msisdn', $phone);
		$this->db->like('company', 'mad');

		$query = $this->db->get();
		$result = $query->result_array();

		if (!empty($result)) {
			$this->db->like('msisdn', $phone);
			$this->db->like('company', 'mad');
			$this->db->update('Consumer', $input);
			return true;
		} else {
			$insert = $this->db->insert('Consumer', $input);
			return $insert;
			//return false;
		}
		//print_r($result); exit();
		//return $query->result();
		//print_r($query->result());
		//return array('upsellingUploads' => $result);
	}
	public function getAllConsumerTypesNew($region_id = '', $area_id = '', $territory_id = '', $from_date = '', $to_date = '') {
		$ft_date = date('Y-m-d');

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		$from_time = !empty($from_date) ? strtotime($f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . ' 00:00:00') : strtotime($ft_date . ' 00:00:00');
		$to_time = !empty($to_date) ? strtotime($t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . ' 23:59:59') : strtotime($ft_date . ' 23:59:59');

		//$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID');
		//$this->db->from('consumer');
		//$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Enabled');*/
		//  $this->db->limit(35);
		//$this->db->order_by('id', 'desc');count(consumerID) as count,
		$this->db->select('distinct(Consumer.brandAmbassadorID), count(Consumer.consumerID) as consumeresin , Consumer.status as cstat, Consumer.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name as region, areas.name as area, territories.name as territory');
		$this->db->from('Consumer');
		$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = Consumer.brandAmbassadorID', 'left outer');
		$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'left outer'); //, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		$this->db->where('BrandAmbassador.status', 'Enabled');
		if ($territory_id != '' && $territory_id != null && $territory_id > 0) {
			$this->db->where('BrandAmbassador.territoryID', $territory_id);
		}
		//$this->db->where('Consumer.status', 'Verified');
		$this->db->where('Consumer.creationTime >=', $from_time);
		$this->db->where('Consumer.creationTime <=', $to_time);
		$this->db->group_by('Consumer.status, Consumer.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name, areas.name, territories.name');
		//$query = $this->db->get();
		//$result = $query->result_array();
		$query = $this->db->get()->result_array();

		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();

		$regionCunCount = array();
		$areaCunCount = array();
		$territoryCunCount = array();

		$regionCunCount2 = array();
		$areaCunCount2 = array();
		$territoryCunCount2 = array();

		foreach ($query as $key => $index) {
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCunCount)) {
				$regionCunCount[$index['regionID']] = array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['areaID'], $areaCunCount)) {
				$areaCunCount[$index['areaID']] = array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount)) {
				$territoryCunCount[$index['territoryID']] = array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['regionID'], $regionCunCount2)) {
				$regionCunCount2[$index['regionID']] = 0; //array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['areaID'], $areaCunCount2)) {
				$areaCunCount2[$index['areaID']] = 0; //array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount2)) {
				$territoryCunCount2[$index['territoryID']] = 0; //array('Verified' => 0, 'Unverified' => 0);
			}

			$regionCunCount2[$index['regionID']] += $index['consumeresin'];

			$areaCunCount2[$index['areaID']] += $index['consumeresin'];

			$territoryCunCount2[$index['territoryID']] += $index['consumeresin'];

			$regionCunCount[$index['regionID']][$index['cstat']]++; // $index['cstat'];
			$areaCunCount[$index['areaID']][$index['cstat']]++; // $index['verified'];
			$territoryCunCount[$index['territoryID']][$index['cstat']]++; // += $index['verified'];

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

		$return = array('rcount' => $regionCount, 'acount' => $areaCount, 'tcount' => $territoryCount, 'region' => $region, 'area' => $area, 'territory' => $territory, 'rconsumers' => $regionCunCount, 'aconsumers' => $areaCunCount, 'tconsumers' => $territoryCunCount, 'rconsumers2' => $regionCunCount2, 'aconsumers2' => $areaCunCount2, 'tconsumers2' => $territoryCunCount2);
		// print_r($return); exit();
		return $return;
		//print_r($result);
		//return $result;
	}
	public function getAllConsumerTypes($region_id = '', $area_id = '', $territory_id = '', $from_date = '', $to_date = '') {
		//echo '--'.$from_date;;
		//echo '--'.$to_date;;

		$ft_date = date('Y-m-d');

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		$from_time = !empty($from_date) ? strtotime($f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . ' 00:00:00') : strtotime($ft_date . ' 00:00:00');
		$to_time = !empty($to_date) ? strtotime($t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . ' 23:59:59') : strtotime($ft_date . ' 23:59:59');
		// echo date('Y-m-d H:i:s',$from_time);
		// echo date('Y-m-d H:i:s',$to_time);

		//$from_date = !empty($fDate2) ? $fDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//$to_date = !empty($tDate2) ? $tDate2 : date('m/d/Y', (strtotime('-1 day', strtotime(date('Y-m-d')))));
		//print_r($from_date);
		//print_r($to_date);
		//exit();
		//$f_dates = explode('/', trim($from_date));
		//$t_dates = explode('/', trim($to_date));

		//$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID');
		//$this->db->from('consumer');
		//$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Enabled');*/
		//  $this->db->limit(35);
		//$this->db->order_by('id', 'desc');
		$this->db->select('count(Consumer.consumerID) as count, Consumer.status as cstat, Consumer.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name as region, areas.name as area, territories.name as territory, Consumer.creationTime');
		$this->db->from('Consumer');
		$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = Consumer.brandAmbassadorID');
		$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'left outer'); //, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		$this->db->where('BrandAmbassador.status', 'Enabled');
		if ($territory_id != '' && $territory_id != null && $territory_id > 0) {
			$this->db->where('BrandAmbassador.territoryID', $territory_id);
		}
		//$this->db->where('Consumer.status', 'Verified');
		$this->db->where('Consumer.creationTime >=', $from_time);
		$this->db->where('Consumer.creationTime <=', $to_time);
		$this->db->group_by('Consumer.status, Consumer.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name, areas.name, territories.name, Consumer.creationTime');
		//$query = $this->db->get();
		//$result = $query->result_array();
		$query = $this->db->get()->result_array();
		//print_r()
		$regionCount = array();
		$areaCount = array();
		$territoryCount = array();

		$region = array();
		$area = array();
		$territory = array();

		$regionCunCount = array();
		$areaCunCount = array();
		$territoryCunCount = array();
		//echo '<pre>';print_r($query); //exit();
		foreach ($query as $key => $index) {
			//print_r(date('Y-m-d H:i:s',$index['creationTime']));
			$region[$index['regionID']][] = $index;
			$area[$index['areaID']][] = $index;
			$territory[$index['territoryID']][] = $index;

			if (!array_key_exists($index['regionID'], $regionCunCount)) {
				$regionCunCount[$index['regionID']] = array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['areaID'], $areaCunCount)) {
				$areaCunCount[$index['areaID']] = array('Verified' => 0, 'Unverified' => 0);
			}
			if (!array_key_exists($index['territoryID'], $territoryCunCount)) {
				$territoryCunCount[$index['territoryID']] = array('Verified' => 0, 'Unverified' => 0);
			}

			$regionCunCount[$index['regionID']][$index['cstat']] += $index['count'];
			$areaCunCount[$index['areaID']][$index['cstat']] += $index['count'];
			$territoryCunCount[$index['territoryID']][$index['cstat']] += $index['count'];

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
	public function getAllAmbassadorConsumer($ambassador = null, $from_date, $to_date) {
		$ft_date = date('Y-m-d');

		$f_dates = explode('/', trim($from_date));
		$t_dates = explode('/', trim($to_date));

		$from_time = !empty($from_date) ? strtotime($f_dates[2] . "-" . $f_dates[0] . "-" . $f_dates[1] . ' 00:00:00') : strtotime($ft_date . ' 00:00:00');
		$to_time = !empty($to_date) ? strtotime($t_dates[2] . "-" . $t_dates[0] . "-" . $t_dates[1] . ' 23:59:59') : strtotime($ft_date . ' 23:59:59');

		$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID, status');
		$this->db->from('Consumer');
		$this->db->where('Consumer.brandAmbassadorID', $ambassador);
		$this->db->where('Consumer.creationTime >=', $from_time);
		$this->db->where('Consumer.creationTime <=', $to_time);

		$total_records = $this->db->get()->num_rows();

		$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID, status');
		$this->db->from('Consumer');
		$this->db->where('Consumer.brandAmbassadorID', $ambassador);
		$this->db->where('Consumer.creationTime >=', $from_time);
		$this->db->where('Consumer.creationTime <=', $to_time);

		$query = $this->db->get()->result_array();

		//print_r($query);
		//exit();

		foreach ($query as $key => $index) {
			$return[] = array($index['msisdn'], $index['name'], $index['cnic'], $index['status']);
		}
		// print_r($return); exit();
		return array('iTotalRecords' => $total_records, 'iTotalDisplayRecords' => $total_records, 'aaData' => $return);
		//print_r($result);
		//return $result;
	}
	public function getAllConsumer($phone = null) {

		$f_date = date('Y-m-d', strtotime('-1 day'));
		$date_from_s = strtotime($f_date . ' 00:00:00');
		$date_to_s = strtotime($f_date . ' 23:59:59');

		//$this->db->select('consumerID, name, msisdn, cnic, brandID, brandAmbassadorID');
		//$this->db->from('consumer');
		//$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Enabled');*/
		//  $this->db->limit(35);
		//$this->db->order_by('id', 'desc');
		$this->db->select('count(consumerID) as count, Consumer.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name as region, areas.name as area, territories.name as territory');
		$this->db->from('Consumer');
		$this->db->join('BrandAmbassador', 'BrandAmbassador.brandAmbassadorID = Consumer.brandAmbassadorID');
		$this->db->join('regions', 'regions.id = BrandAmbassador.regionID', 'left outer'); //, 'right outer'
		$this->db->join('areas', 'areas.id = BrandAmbassador.areaID');
		$this->db->join('territories', 'territories.id = BrandAmbassador.territoryID');
		//$this->db->where('BrandAmbassador.status', 'Enabled');
		//$this->db->where('Consumer.status', 'Verified');
		//$this->db->where('Consumer.creationTime >=', $date_from_s);
		//$this->db->where('Consumer.creationTime <=', $date_to_s);
		$this->db->group_by('Consumer.brandAmbassadorID,BrandAmbassador.code, BrandAmbassador.name, BrandAmbassador.regionID, BrandAmbassador.areaID, BrandAmbassador.territoryID, regions.name, areas.name, territories.name');
		//$query = $this->db->get();
		//$result = $query->result_array();
		$query = $this->db->get()->result_array();

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
	public function getAllConsumerByPhoneNumber($phone = null) {
		$this->db->select('id,name,msisdn,cnic,brand_id,ambassador_id');
		$this->db->from('consumer');
		$this->db->like('msisdn', $phone);
		/*$this->db->where('active', 'Y');*/
		//  $this->db->limit(35);
		$this->db->order_by('id', 'desc');

		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result); exit();
		/*foreach ($result as $key => $index) {
			//print_r($index['status']);
			if ($index['status'] != 0) {
				$result[$key]['status'] = true;
			} else {
				$result[$key]['status'] = false;
			}

		}*/
		if (empty($result)) {
			return false;
		}

		return $result[0];
		//return $query->result();
		//print_r($result[0]); exit();
		//return array('consumers' => $result);
	}
	public function setAllConsumerGTs($consumer) {
		$insert = $this->db->insert_batch('consumer', $consumer);
		return $insert;
	}

}
?>
