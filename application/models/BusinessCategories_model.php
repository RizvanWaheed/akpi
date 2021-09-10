<?php
class BusinessCategories_model extends CI_Model {
	public function __construct()
    {
        $this->load->database();
	}
	protected function buildTree(array $elements, $parentId = 0) {
		$branch = array();
		foreach ($elements as $element) {
			if($parentId == 0){
				$parentId = $element['parent_id'];
			}
			if ($element['parent_id'] == $parentId) {
				$children = $this->buildTree($elements, $element['id']);
				if ($children) {
					$element['children'] = $children;
				}
				$branch[] = $element;
			}
		}

		return $branch;
	}
	function deleteMany($date){
		$this->db->where('date', $date);
		$this->db->delete('user_shifts'); 
	}
	public function saveMany($data){
		$insert = $this->db->insert_batch('agent_data', $data);
	    return $insert;
	}
	
	public function findAll($id=null){
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
	//	print_r($id);
		$this->db->select('*')->from('business_categories');
		if($id != null){
			//$this->db->join('agent_data_category_detail as adcd', 'adcd.business_category_id = business_categories', 'left');//agent_data
			$this->db->where('id', $id)->or_where('parent_id', $id);
			$query = $this->db->get();
			$new =  $query->result_array();
		//	print_r($new);
			$new = $this->buildTree($new);
			
		}
		else{
			$query = $this->db->get();
		 	$new =  $query->result_array();
		}
		// if($status!=null){
		// 	$this->db->where('status', $status);
		// }
		//  $query = $this->db->get();
		//  $new =  $query->result_array();
		// echo '<pre>'; print_r($new); exit();
		return array('tasks'=> $new);
		
	}
	public function findKey($from_time, $to_time){

		$this->db->select('id')->from('shift_timings')->where('from', $from_time)->where('to', $to_time)->limit(1);
		$query 	= $this->db->get();
		$new 		= $query->row_array();
		// print_r($new); exit();
		return $new['id'];
		
	}

	public function getUserStateLogsHourlyLogsAll($from_date, $to_date){
		$getListOfHours = $this->getListOfHoursAll($from_date, $to_date);
		$getListOfDays = $this->getListOfDays($from_date, $to_date);
		//print_r($getListOfHours); exit();
		/*$getListOfHours = $this->getListOfHours();
		$getListOfDays = $this->getListOfDays();*/
		//print_r($getListOfHours); exit();
		$this->db->select(' date, ac.campiagn_id, c.name campaign_name, u.name agent, u.login agent_id, u2.name teamlead, u2.login teamlead_id , '.$getListOfHours.'  '.$getListOfDays)//, created, modified
		->from('user_shifts- ')
		->join('users u', 'u.id = user_shifts.user_id')
		->join('users as u2', 'u.reporting_id = u2.id')
		->join('access_campiagns as ac', 'ac.user_id = user_shifts.user_id')
		->join('monitoring_for as c', 'c.id = ac.campiagn_id')
		->where('u.role_id', 11)
		->where('c.id != ', 9)
		->where('user_shifts.created >= ', $from_date)
		->where('user_shifts.modified <= ', $to_date)
		->where('user_shifts.user_state_id not in(5,1,2)')
		->where('user_shifts.modified is not null')
		//->where('user_id', $id)
		->group_by('date, ac.campiagn_id, campaign_name, u.name, u.login, u2.name, u2.login')
		//->having('time >', 0)
		->order_by('user_shifts.created', 'desc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}
	private function getListOfHoursAll($from_date, $to_date){

		$variable = $this->getHourlyArray();
		$select = ' ';

		foreach ($variable as $key => $value) {
			if($key == 1){
				$from = '00:00:00'; 	
				$to = $value;
			} 
			else{
				$from = $variable[$key-1]; 	
				$to = $value;
			}
			$select .= " SEC_TO_TIME(sum(case when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and (time(user_shifts.modified) <= '".$to."' and time(user_shifts.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created))
				 when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and (time(user_shifts.modified) > '".$to."' and time(user_shifts.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_shifts.created)))
				 when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and time(user_shifts.modified) between '".$from."' and '".$to."' and time(user_shifts.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_shifts.modified), '".$from."'))
				 when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and time(user_shifts.modified) > '".$to."' and time(user_shifts.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as working_hour_".$key." , 
				 SEC_TO_TIME(sum(case when user_state_id = 3 and date(user_shifts.created) = date(user_shifts.modified) and (time(user_shifts.modified) <= '".$to."' and time(user_shifts.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created))
				 when user_state_id = 3 and date(user_shifts.created) = date(user_shifts.modified) and (time(user_shifts.modified) > '".$to."' and time(user_shifts.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_shifts.created)))
				 when user_state_id = 3 and date(user_shifts.created) = date(user_shifts.modified) and time(user_shifts.modified) between '".$from."' and '".$to."' and time(user_shifts.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_shifts.modified), '".$from."'))
				 when user_state_id = 3 and date(user_shifts.created) = date(user_shifts.modified) and time(user_shifts.modified) > '".$to."' and time(user_shifts.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as break_hour_".$key." , 
				 ";
				// working_hour_
				// when user_state_id = 4 and date(user_shifts.created) < date(user_shifts.modified) and time(user_shifts.modified) < time(user_shifts.created) and TIMEDIFF(user_shifts.modified, user_shifts.created) <= TIME('03:00:00') then TIME_TO_SEC('01:00:00') else 0 end)

				/* SEC_TO_TIME(sum(case when user_state_id = 3 and (time(user_shifts.modified) <= '".$to."' and time(user_shifts.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created))
				 when user_state_id = 3 and (time(user_shifts.modified) > '".$to."' and time(user_shifts.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_shifts.created)))
				 when user_state_id = 3 and time(user_shifts.modified) between '".$from."' and '".$to."' and time(user_shifts.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_shifts.modified), '".$from."'))
				 when user_state_id = 3 and time(user_shifts.modified) > '".$to."' and time(user_shifts.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as break_hour_".$key." ,*/
		}
		
		return $select;	
	}
	public function getHourlyStatesDashboard($from_date, $to_date){
		//print_r($from_date);
		$fdate = '2019-01-12 00:00:00';
		$tdate = '2019-01-13 00:00:00';
		//$fdate = $from_date[2].'-'.$from_date[0].'-'.$from_date[1].' 00:00:00';
		//$tdate = $to_date[2].'-'.$to_date[0].'-'.$to_date[1].' 23:59:59';;
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$hourly = $this->getUserStateLogsHourlyLogsAll($fdate, $tdate);
		echo '<pre>';
		print_r($hourly);
		exit();
		//return $this->getUserStateLogsHourlyLogs($fdate, $tdate);
		return array_merge($this->getUserStateLogsHourlyLogs($fdate, $tdate), $this->getUserStateLogsHourlyTotals($fdate, $tdate));
		
		// //echo '<pre>'; print_r($result); exit();		
		// //exit();
		// return $respond;	
		// return array('UserStateLogs' => $respond);
	}
    public function getUserStateLogsLoginLogout($id, $fdate, $tdate){
		$fdate.= ' 00:00:00';
		$tdate.= ' 23:59:59';
		//print_r($fdate);
		//print_r($tdate);
		
		//$fdate = date('Y-m-d').' 00:00:00';
		//$tdate = date('Y-m-d').' 23:59:59';;
		
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_state_id, user_id, date, usrs.name, usrs.login as sip, ustates.name as states 
			, user_shifts.created as time')//, created, modified
		->from('user_shifts')
		->join('users usrs', 'usrs.id = user_shifts.user_id')
		->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		//->where('user_id', $id)//->where('user_shifts.modified is null')
		->where('user_shifts.user_state_id in (5,1)')
		//->group_by('user_state_id, user_id, date, ustates.name')
		->having('time >=', 0)
		->order_by('user_shifts.id', 'asc');
		//->limit(1);
		$query = $this->db->get();$result = $query->result_array();
		//echo '<pre>';
		//	print_r($result);

		$response = array();
		$count = 1; 
		foreach($result as $key => $index){
						
			if(!isset($response[$index['user_id']][$index['date']])){
				$response[$index['user_id']][$index['date']] = $index;
			}

			$response[$index['user_id']][$index['date']][] = array('states' => $index['states'], 'time' => $index['time']);

			$count++;
		}
		//echo '<pre>'; print_r($response); exit();
		//$newAry = '';
		$newAry = array();
		$newArray = array();
		foreach($response as $key => $index){
			foreach($index as $key2 => $index2){
				//$newAry = $index2['sip'].','.$index2['name'].','.$index2['date'];
				$newAry[] = $index2['sip'];
				$newAry[] = $index2['name'];
				$newAry[] = $index2['date'];
				$lastState = 'login';
				$count = 0;
				foreach($index2 as $key3 => $index3){
					if(is_array($index3)){
						if($count == 0 && $index3['states'] != 'login'){
							//$newAry[]['login'] = 'None';
							//$newAry[][$index3['states']] = $index3['time'];
							$newAry[] = 'None';
							$newAry[] = $index3['time'];
						}
						else if($index3['states'] == $lastState){
							//$newAry[][$index3['states']] = $index3['time'];
							$newAry[] = $index3['time'];
							$lastState = ($lastState=='login')?'Logout':'login';
							
						} 
						else{
							$newAry[] = 'None';
							$newAry[] = $index3['time'];
							//$newAry[][$lastState] = 'None';
							//$newAry[][$index3['states']] = $index3['time'];
							$lastState = ($index3['states']=='login')?'Logout':'login';
						}							
					}
					$count++;
				}
				
				$newArray[] = $newAry;
				unset($newAry);
			}
			 
		}
		//echo '<pre>';
		//print_r($newArray);
		//print_r($response); 
		//exit();
 
		return $newArray;
		
		$respond = array();
		$respond_count = 0;
		foreach($response as $key => $index){
			foreach($index as $key2 => $index2){
					$respond[$respond_count] = $index2;
					
					$second = $index2['total'];
					$minute = 0;
					$hour 	= 0;
					
					if($second > 59){
						$minute = floor($second/60);
						$second%=60;
					}
					if($minute > 59){
						$hour = floor($minute/60);
						$minute%=60;
					}
					$respond[$respond_count]['total'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);

					$respond_count++;
			}
		}
		//exit();
		return $respond;//[0];
	
		//return array('UserStateLogs' => $response);
	}
    public function getLoginUserIPStatsLogs($user_ip){
    	$fdate = date('Y-m-d').' 00:00:00';
		$tdate = date('Y-m-d').' 23:59:59';;
    	$query = $this->db->select('user_state_id, created_ip, usr.name, usr.id')//user_state_id, user_id, date, , created, modified
		->from('user_shifts')
		->join('users usr', 'usr.id = user_shifts.user_id')
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		->where('user_shifts.modified is null')
		->where('user_shifts.user_state_id !=', 5)		
		->where('user_shifts.created_ip', $user_ip)
		->order_by('user_shifts.id', 'desc')
		->limit(1)->get();
		return $query->row_array();//
    } 
    public function getLoginUserStatsLogs($user_id){
    	$fdate = date('Y-m-d').' 00:00:00';
		$tdate = date('Y-m-d').' 23:59:59';
    	$query = $this->db->select('user_state_id, created_ip')//user_state_id, user_id, date, , created, modified
		->from('user_shifts')
		///->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		->where('user_shifts.user_id', $user_id)
		->order_by('user_shifts.id', 'desc')
		->limit(1)->get();
		return $query->row_array();
    } 
    public function getCurrentCountOfAgent($user_id, $fdate, $tdate){

    	$query = $this->db->select('ustates.name as states ')//user_state_id, user_id, date, , created, modified
		->from('user_shifts')
		->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		->where('user_shifts.user_id', $user_id)
		->order_by('user_shifts.created', 'desc')
		->limit(1)->get();
		return $query->row_array();
    } 
    public function getCurrentStateOfAgent($user_id, $fdate, $tdate){
    	$query = $this->db->select('ustates.name as states ')//user_state_id, user_id, date, , created, modified
		->from('user_shifts')
		->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		//->where('user_shifts.created >=', $fdate)
		//->where('user_shifts.created <=', $tdate)
		->where('user_shifts.user_id', $user_id)
		->order_by('user_shifts.created', 'desc')
		->limit(1)->get();
		return $query->row_array();
    }
	public function getCurrentStateOfAgents($id, $fdate, $tdate){
    	$query = $this->db->select('max(user_shifts.created), ustates.name as states, user_shifts.user_id')//user_state_id, user_id, date, , created, modified
		->from('user_shifts')
		->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->join('users usrs', 'usrs.id = user_shifts.user_id and usrs.reporting_id = '.$id)
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		->group_by('ustates.name, user_shifts.user_id')
		->get();
		return $query->result_array();
    }
    public function getMyAgentStateLog($id){
	
		$fdate = date('Y-m-d').' 00:00:00';
		$tdate = date('Y-m-d').' 23:59:59';;
		
		$sess_data = $this->session->userdata;
		$ii =  'usrs.id = user_shifts.user_id  and usrs.reporting_id = '.$id;
		if($id == null || $id <= 0){
			$id = $sess_data['data_logged_in']['id'];
			$ii =  'usrs.id = user_shifts.user_id';
		}
		
		$query = $this->db->select('user_id, date, usrs.name, usrs.login as sip
		, SEC_TO_TIME(sum(case when user_state_id = 3 then TIME_TO_SEC(TIMEDIFF(IFNULL(user_shifts.modified, now()), user_shifts.created)) else 0 end )) break
		, SEC_TO_TIME(sum(case when user_state_id = 4 then TIME_TO_SEC(TIMEDIFF(IFNULL(user_shifts.modified, now()), user_shifts.created)) else 0 end )) working
		, SEC_TO_TIME(sum(TIME_TO_SEC(TIMEDIFF(IFNULL(user_shifts.modified, now()), user_shifts.created)))) total
		, sum(TIME_TO_SEC(TIMEDIFF(IFNULL(user_shifts.modified, now()), user_shifts.created))) avg
		')//, created, modified
		->from('user_shifts')
		->join('users usrs', $ii)//
		//->join('user_states ustates', 'ustates.id = user_shifts.user_state_id'), (select user_states.name as states from user_states where user_states.id = user_shifts.user_state_id) as current
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		->where('user_shifts.user_state_id not in(5,1,2)')
		//->where('user_id', $id)
		->group_by('user_id, date, usrs.name, usrs.login')
		->having('total >', 0)
		->order_by('user_shifts.created', 'desc')->get();
		//->limit(1);
		//$query = $this->db->get();
		$result = $query->result_array();
		//	echo '<pre>'; print_r($result); exit();
		$response = array();
		$respond_count = 0;
		//$abc = $this->getCurrentStateOfAgents($id, $fdate, $tdate);
		//echo '<pre>'; print_r($abc); exit();
		foreach($result as $key => $index){
			$user_id= $index['user_id'];
			/*$second = $index['time'];
			$minute = 0;
			$hour 	= 0;
			
			if($second > 59){
				$minute = floor($second/60);
				$second%=60;
			}
			if($minute > 59){
				$hour = floor($minute/60);
				$minute%=60;
			}*/
			//$response[$index['date']][$index['user_id']][$index['states']] = $result[$key]['tim'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);
			
			
			/*$response[$index['date']][$index['user_id']]['current'] = $this->getCurrentStateOfAgent($user_id, $fdate, $tdate)['states'];
			//$response[$index['date']][$index['user_id']]['tickets'] = $this->getTicketsOfAgent($user_id, $fdate, $tdate)['tickets'];
			//$response[$index['date']][$index['user_id']][$index['states']]['date'] = $index['date'];
			$response[$index['date']][$index['user_id']]['date'] = $index['date'];
			$response[$index['date']][$index['user_id']]['name'] = $index['name'];
			$response[$index['date']][$index['user_id']]['sip'] = $index['sip'];
			//if(!isset($response[$index['date']][$index['user_id']]['total'])){
			$response[$index['date']][$index['user_id']]['working'] = $index['working'];
			$response[$index['date']][$index['user_id']]['break'] = $index['break'];
			$response[$index['date']][$index['user_id']]['total'] = $index['total'];
			//}
			//$response[$index['date']][$index['user_id']]['total'] += $index['time'];
			//print_r($index);
			*/
			$response[$key]['current'] = $this->getCurrentStateOfAgent($user_id, $fdate, $tdate)['states'];
			//$response[$key]['tickets'] = $this->getTicketsOfAgent($user_id, $fdate, $tdate)['tickets'];
			//$response[$key][$index['states']]['date'] = $index['date'];
			$response[$key]['date'] = $index['date'];
			$response[$key]['name'] = $index['name'];
			$response[$key]['sip'] = $index['sip'];
			$response[$key]['sid'] = $index['user_id'];
			//if(!isset($response[$key]['total'])){
			$response[$key]['working'] = $index['working'];
			$response[$key]['break'] = $index['break'];
			$response[$key]['total'] = $index['total'];
			$response[$key]['avg'] = $index['avg'];
			
		}
		return $response;
		$respond = array();
		
		foreach($response as $key => $index){
			foreach($index as $key2 => $index2){
				//print_r($index2);
				/*foreach($index2 as $key3 => $index3){
					print_r($index3);*/
					$respond[$respond_count] = $index2;
					/*$respond[$respond_count] = $index2;
					$respond[$respond_count] = $index2;
					$respond[$respond_count] = $index2;*/
					$second = $index2['total'];
					$minute = 0;
					$hour 	= 0;
					
					if($second > 59){
						$minute = floor($second/60);
						$second%=60;
					}
					if($minute > 59){
						$hour = floor($minute/60);
						$minute%=60;
					}
					$respond[$respond_count]['total'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);

					$respond_count++;
				//}
			}
		}
		//exit();
		return $respond;
	
		return array('UserStateLogs' => $respond);
	}
    public function getMyStateLog(){
		//print_r($from_date);
		$fdate = date('Y-m-d').' 00:00:00';
		$tdate = date('Y-m-d').' 23:59:59';;
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_state_id, user_id, date, usrs.name, usrs.login as sip, ustates.name as states , sum(TIME_TO_SEC(TIMEDIFF((case when user_shifts.modified is null then now() else user_shifts.modified end), user_shifts.created))) time')//, created, modified
		->from('user_shifts')
		->join('users usrs', 'usrs.id = user_shifts.user_id')
		->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.created <=', $tdate)
		->where('user_id', $id)//->where('user_shifts.modified is null')
		->where('user_shifts.user_state_id not in(5,1,2)')
		->group_by('user_state_id, user_id, date, ustates.name')
		->having('time >=', 0)
		->order_by('user_shifts.id', 'desc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		$response = array();
		foreach($result as $key => $index){
			$second = $index['time'];
			$minute = 0;
			$hour 	= 0;
			
			if($second > 59){
				$minute = floor($second/60);
				$second%=60;
			}
			if($minute > 59){
				$hour = floor($minute/60);
				$minute%=60;
			}
			$response[$index['date']][$index['user_id']][$index['states']] = $result[$key]['tim'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);

			//$response[$index['date']][$index['user_id']][$index['states']] = $index['states'];
			//$response[$index['date']][$index['user_id']][$index['states']]['date'] = $index['date'];
			$response[$index['date']][$index['user_id']]['date'] = $index['date'];
			$response[$index['date']][$index['user_id']]['name'] = $index['name'];
			$response[$index['date']][$index['user_id']]['sip'] = $index['sip'];
			$response[$index['date']][$index['user_id']]['current'] = $this->getCurrentStateOfAgent($id, $fdate, $tdate)['states'];
			if(!isset($response[$index['date']][$index['user_id']]['total'])){
				$response[$index['date']][$index['user_id']]['total'] = 0;
			}
			$response[$index['date']][$index['user_id']]['total'] += $index['time'];
			//print_r($index);
		}
		
		$respond = array();
		$respond_count = 0;
		foreach($response as $key => $index){
			foreach($index as $key2 => $index2){
					$respond[$respond_count] = $index2;
					
					$second = $index2['total'];
					$minute = 0;
					$hour 	= 0;
					
					if($second > 59){
						$minute = floor($second/60);
						$second%=60;
					}
					if($minute > 59){
						$hour = floor($minute/60);
						$minute%=60;
					}
					$respond[$respond_count]['total'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);

					$respond_count++;
			}
		}
		//exit();
		return $respond;//[0];
	
		//return array('UserStateLogs' => $response);
	}
    public function getUserStateLogs_old($id, $from_date, $to_date){
		//print_r($from_date);
		$fdate = $from_date[2].'-'.$from_date[0].'-'.$from_date[1].' 00:00:00';
		$tdate = $to_date[2].'-'.$to_date[0].'-'.$to_date[1].' 23:59:59';;
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_state_id, user_id, date, usrs.name, usrs.login as sip, ustates.name as states 
		, sum(TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created))) time')//, created, modified
		->from('user_shifts-')
		->join('users usrs', 'usrs.id = user_shifts.user_id')
		->join('user_states ustates', 'ustates.id = user_shifts.user_state_id', 'left outer')
		->where('user_shifts.created >=', $fdate)
		->where('user_shifts.modified <=', $tdate)
		->where('user_shifts.user_state_id not in(5,1,2)')
		->where('user_shifts.modified is not null')
		//->where('user_id', $id)
		->group_by('user_state_id, user_id, date')
		->having('time >', 0)
		->order_by('user_shifts.created', 'desc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		$response = array();
		foreach($result as $key => $index){
			$second = $index['time'];
			$minute = 0;
			$hour 	= 0;
			
			if($second > 59){
				$minute = floor($second/60);
				$second%=60;
			}
			if($minute > 59){
				$hour = floor($minute/60);
				$minute%=60;
			}
			$response[$index['date']][$index['user_id']][$index['states']] = $result[$key]['tim'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);

			//$response[$index['date']][$index['user_id']][$index['states']] = $index['states'];
			//$response[$index['date']][$index['user_id']][$index['states']]['date'] = $index['date'];
			$response[$index['date']][$index['user_id']]['date'] = $index['date'];
			$response[$index['date']][$index['user_id']]['name'] = $index['name'];
			$response[$index['date']][$index['user_id']]['sip'] = $index['sip'];
			if(!isset($response[$index['date']][$index['user_id']]['total'])){
				$response[$index['date']][$index['user_id']]['total'] = 0;
			}
			$response[$index['date']][$index['user_id']]['total'] += $index['time'];
			//print_r($index);
		}
		$respond = array();
		$respond_count = 0;
		foreach($response as $key => $index){
			foreach($index as $key2 => $index2){
				//print_r($index2);
				/*foreach($index2 as $key3 => $index3){
					print_r($index3);*/
					$respond[$respond_count] = $index2;
					/*$respond[$respond_count] = $index2;
					$respond[$respond_count] = $index2;
					$respond[$respond_count] = $index2;*/
					$second = $index2['total'];
					$minute = 0;
					$hour 	= 0;
					
					if($second > 59){
						$minute = floor($second/60);
						$second%=60;
					}
					if($minute > 59){
						$hour = floor($minute/60);
						$minute%=60;
					}
					$respond[$respond_count]['total'] = str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);
					$respond_count++;
				//}
			}
		}
		//exit();
		return $respond;
	
		return array('UserStateLogs' => $respond);
	}
	public function getUserStateLogs($id, $from_date, $to_date){
		//print_r($from_date);
		$fdate = $from_date[2].'-'.$from_date[0].'-'.$from_date[1].' 00:00:00';
		$tdate = $to_date[2].'-'.$to_date[0].'-'.$to_date[1].' 23:59:59';;
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		//$getListOfHours = $this->getListOfHours($from_date, $to_date);
		$getListOfDays = $this->getListOfDays($from_date, $to_date);
		//print_r($getListOfHours); exit();
		/*$getListOfHours = $this->getListOfHours();
		$getListOfDays = $this->getListOfDays();*/
		//print_r($getListOfHours); exit();
		$this->db->select(' date, usrs.name, usrs.login as sip, '.$getListOfDays)//, created, modified
		->from('user_shifts')
		->join('users usrs', 'usrs.id = user_shifts.user_id')
		//->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >= ', $fdate)
		->where('user_shifts.modified <= ', $tdate)
		->where('user_shifts.user_state_id not in(5,1,2)')
		->where('user_shifts.modified is not null')
		//->where('user_id', $id)
		->group_by('date, usrs.login')
		//->having('time >', 0)
		->order_by('user_shifts.created', 'desc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		/*$query = $this->db->get();
		$result = $query->result_array();*/
		return $result;
	}
	private function timeConversion($second = null){
		$second = $index['time'];
		$minute = 0;
		$hour 	= 0;
		
		if($second > 59){
			$minute = floor($second/60);
			$second%=60;
		}
		if($minute > 59){
			$hour = floor($minute/60);
			$minute%=60;
		}
		return str_pad($hour,2,0,STR_PAD_LEFT).':'.str_pad($minute,2,0,STR_PAD_LEFT).':'.str_pad($second,2,0,STR_PAD_LEFT);
	}
	private function getHourlyArray(){

		return array( 1 => '01:00:00', 2 => '02:00:00', 3 => '03:00:00', 4 => '04:00:00', 5 => '05:00:00', 6 => '06:00:00', 7 => '07:00:00', 8 => '08:00:00' 
					  , 9 => '09:00:00', 10 => '10:00:00', 11 => '11:00:00', 12 => '12:00:00', 13 => '13:00:00', 14 => '14:00:00', 15 => '15:00:00', 16 => '16:00:00', 17 => '17:00:00' 
					  , 18 => '18:00:00', 19 => '19:00:00', 20 => '20:00:00', 21 => '21:00:00', 22 => '22:00:00', 23 => '23:00:00', 24 => '23:59:59' );
	}
	private function getListOfDays($from_date, $to_date){
		return ' SEC_TO_TIME(sum(case when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created )) else 0 end)) Working_time
			   , SEC_TO_TIME(sum(case when user_state_id = 3 and date(user_shifts.created) = date(user_shifts.modified) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created )) else 0 end)) break_time 
			   , SEC_TO_TIME(sum(case when date(user_shifts.created) = date(user_shifts.modified) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created )) else 0 end)) agent_time';
	}
	private function getListOfHours($from_date, $to_date){

		$variable = $this->getHourlyArray();
		$select = ' ';

		foreach ($variable as $key => $value) {
			if($key == 1){
				$from = '00:00:00'; 	
				$to = $value;
			} 
			else{
				$from = $variable[$key-1]; 	
				$to = $value;
			}
			$select .= " SEC_TO_TIME(sum(case when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and (time(user_shifts.modified) <= '".$to."' and time(user_shifts.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created))
				 when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and (time(user_shifts.modified) > '".$to."' and time(user_shifts.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_shifts.created)))
				 when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and time(user_shifts.modified) between '".$from."' and '".$to."' and time(user_shifts.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_shifts.modified), '".$from."'))
				 when user_state_id = 4 and date(user_shifts.created) = date(user_shifts.modified) and time(user_shifts.modified) > '".$to."' and time(user_shifts.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as hour_".$key." , 
				 ";
				// working_hour_
				// when user_state_id = 4 and date(user_shifts.created) < date(user_shifts.modified) and time(user_shifts.modified) < time(user_shifts.created) and TIMEDIFF(user_shifts.modified, user_shifts.created) <= TIME('03:00:00') then TIME_TO_SEC('01:00:00') else 0 end)

				/* SEC_TO_TIME(sum(case when user_state_id = 3 and (time(user_shifts.modified) <= '".$to."' and time(user_shifts.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_shifts.modified, user_shifts.created))
				 when user_state_id = 3 and (time(user_shifts.modified) > '".$to."' and time(user_shifts.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_shifts.created)))
				 when user_state_id = 3 and time(user_shifts.modified) between '".$from."' and '".$to."' and time(user_shifts.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_shifts.modified), '".$from."'))
				 when user_state_id = 3 and time(user_shifts.modified) > '".$to."' and time(user_shifts.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as break_hour_".$key." ,*/
		}
		
		return $select;	
	}
	public function getUserStateLogsHourlyTotals($from_date, $to_date){
		$getListOfHours = $this->getListOfHours($from_date, $to_date);
		$getListOfDays = $this->getListOfDays($from_date, $to_date);
		//print_r($getListOfHours); exit();
		$this->db->select('date, "Careem" as name, "Total" as sip, '.$getListOfHours.' '.$getListOfDays)//, created, modified
		->from('user_shifts')
		->join('users usrs', 'usrs.id = user_shifts.user_id')
		//->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >= ', $from_date)
		->where('user_shifts.modified <= ', $to_date)
		->where('user_shifts.user_state_id not in(5,1,2)')
		->where('user_shifts.modified is not null')
		//->where('user_id', $id)
		->group_by('date')
		//->having('time >', 0)
		->order_by('date', 'desc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}
	public function getUserStateLogsHourlyLogs($from_date, $to_date){
		$getListOfHours = $this->getListOfHours($from_date, $to_date);
		$getListOfDays = $this->getListOfDays($from_date, $to_date);
		//print_r($getListOfHours); exit();
		/*$getListOfHours = $this->getListOfHours();
		$getListOfDays = $this->getListOfDays();*/
		//print_r($getListOfHours); exit();
		$this->db->select(' date, usrs.name, usrs.login as sip , '.$getListOfHours.'  '.$getListOfDays)//, created, modified
		->from('user_shifts-')
		->join('users usrs', 'usrs.id = user_shifts.user_id')
		//->join('user_states ustates', 'ustates.id = user_shifts.user_state_id')
		->where('user_shifts.created >= ', $from_date)
		->where('user_shifts.modified <= ', $to_date)
		->where('user_shifts.user_state_id not in(5,1,2)')
		->where('user_shifts.modified is not null')
		//->where('user_id', $id)
		->group_by('date, usrs.login')
		//->having('time >', 0)
		->order_by('user_shifts.created', 'desc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}
	public function getUserStateLogs2($id, $from_date, $to_date){
		//print_r($from_date);
		$fdate = $from_date[2].'-'.$from_date[0].'-'.$from_date[1].' 00:00:00';
		$tdate = $to_date[2].'-'.$to_date[0].'-'.$to_date[1].' 23:59:59';;
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];
		//return $this->getUserStateLogsHourlyLogs($fdate, $tdate);
		return array_merge($this->getUserStateLogsHourlyLogs($fdate, $tdate), $this->getUserStateLogsHourlyTotals($fdate, $tdate));
		
		// //echo '<pre>'; print_r($result); exit();		
		// //exit();
		// return $respond;	
		// return array('UserStateLogs' => $respond);
	}
	public function getTicketsOfAgent($user_id, $fdate, $tdate){
    	$query = $this->db->select('count(*) as tickets ')//user_state_id, user_id, date, , created, modified
		->from('activities')
	//	->where('activities.ticket_no is not null')
		->where('date(activities.created)', date('Y-m-d'))
		//->where('activities.created <=', $tdate)
		->where('activities.created_by', $user_id)
		->order_by('activities.created', 'desc')
		->limit(1)->get();
		return $query->row_array();
    }
    public function getMystate(){
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_state_id, (select name from user_states where id = user_state_id) as name')
		->from('user_shifts')
		->where('user_id', $id)
		->order_by('id', 'desc')
		->limit(1);
		
		$query = $this->db->get();
		return $query->row_array(); //array('UserStateLogs' => );
	}
	public function getAllUserStateLogs($id){
		$sess_data = $this->session->userdata;
		$role_id   = $sess_data['data_logged_in']['role_id'];

		$this->db->select('id,name')->from('roles')->where('id >=', $role_id);
		if($id != null){
			$this->db->where('id', $id);
		}
		$query = $this->db->get();
		return array('roles' => $query->result_array());
	}
	public function findnUpdate($state, $ip, $user){

		$this->db->select('id')
		->from('user_shifts')
		->where('user_id', $user)
		->order_by('id', 'desc')
		->limit(1);
		 $query = $this->db->get();
		 $new =  $query->row_array();
		// print_r($new); exit();
		$sta = array( 'end_time' => time()
					//, 'modified' => date("Y-m-d H:i:s")
					, 'modified_ip' => $ip
					);

		$this->db->where('id', $new['id']);
		$this->db->update('user_shifts', $sta);
	}
	public function findnUpdateLogout($state, $ip, $user, $created_by){

		$this->db->select('id')
		->from('user_shifts')
		->where('user_id', $user)
		->order_by('id', 'desc')
		->limit(1);
		 $query = $this->db->get();
		 $new =  $query->row_array();
		// print_r($new); exit();
		$sta = array( 'end_time' => time()
					, 'modified_by' => $created_by
					, 'modified_ip' => $ip
					//, 'modified' => date("Y-m-d H:i:s")					
					);

		$this->db->where('id', $new['id']);
		$this->db->update('user_shifts', $sta);
	}
	public function setUserStatsLogoutLogs($state, $ip, $user_id, $created_by){

		//$user_id = $this->session->userdata['data_logged_in']['id'];
		$this->findnUpdateLogout($state, $ip, $user_id, $created_by);

		$sta = array('user_state_id' => $state
					, 'user_id' => $user_id
					, 'date' => date("Y-m-d")
					, 'time' => date("H:i:s")
					, 'start_time' => time()
					, 'created_ip' => $ip
					, 'created_by' => $created_by
					);
		return $this->saveUserStateLogs($sta);
	}
	public function setUserStatsLogs($state, $ip, $userid = null){

		$user_id = $this->session->userdata['data_logged_in']['id'];
		$this->findnUpdate($state, $ip, $user_id);

		$sta = array('user_state_id' => $state
					, 'user_id' => $user_id
					, 'date' => date("Y-m-d")
					, 'time' => date("H:i:s")
					, 'start_time' => time()
					, 'created_ip' => $ip
					);
		return $this->saveUserStateLogs($sta);
	}
	
	public function updateUserStateLogs($role){
		$this->db->where('role_id', $id);
		$this->db->update('user_shifts', $data);
		$report = array();
		$report['error'] = $this->db->_error_number();
		$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}
	
}
?>	
