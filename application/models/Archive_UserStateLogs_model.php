<?php
class Archive_UserStateLogs_model extends CI_Model {
 
    /**
    * Responsable for au to load the database
    * @return void
    */
    public function __construct()
    {
        $this->load->database('archive', TRUE);
    }
     public function getUserStateLogsLoginLogout($id, $fdate, $tdate){
		$fdate.= ' 00:00:00';
		$tdate.= ' 23:59:59';
		//print_r($fdate);
		//print_r($tdate);
		
		//$fdate = date('Y-m-d').' 00:00:00';
		//$tdate = date('Y-m-d').' 23:59:59';		
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$this->db->select('user_state_id, user_id, date, usrs.name, usrs.login as sip, ustates.name as states 
			, user_state_logs.created as time')//, created, modified
		->from('user_state_logs')
		->join('users usrs', 'usrs.id = user_state_logs.user_id')
		->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		//->where('user_id', $id)//->where('user_state_logs.modified is null')
		->where('user_state_logs.user_state_id in (5,1)')
		//->group_by('user_state_id, user_id, date, ustates.name')
		->having('time >=', 0)
		->order_by('user_state_logs.id', 'asc');
		//->limit(1);
		$query = $this->db->get();
		$result = $query->result_array();

		$response = array();
		$count = 1; 
		foreach($result as $key => $index){
			
			
			if(!isset($response[$index['user_id']][$index['date']])){
				$response[$index['user_id']][$index['date']] = $index;
			}

			/*[user_state_id] => 1
                            [user_id] => 1
                            [date] => 2018-06-22
                            [name] => Muhammad Rizwan Waheed
                            [sip] => muhammad.rizwan
                            [states] => Login
                            [time] => 2018-06-22 16:18:01*/
			$response[$index['user_id']][$index['date']][] = array('states' => $index['states'], 'time' => $index['time']);

			/*if($count%2==0){
				// echo $count.'equal';
			}
			else{
				// echo $count.'notequal';	
				if($index['states'] == 'Login'){
					$response[$index['user_id']][] = 
					
					$response[$key]['date'] = $index['date'];
					$response[$key]['name'] = $index['name'];
					$response[$key]['sip'] = $index['sip'];
					$response[$key]['sid'] = $index['user_id'];
					//if(!isset($response[$key]['total'])){
					$response[$key]['working'] = $index['working'];
					$response[$key]['break'] = $index['break'];
					$response[$key]['total'] = $index['total'];
				}
			}*/


			$count++;

			
			//$response[$index['date']][$index['user_id']]['total'] += $index['time'];
			//print_r($index);
		}
		//echo '<pre>';
		//$newAry = '';
		$newAry = array();
		$newArray = array();
		foreach($response as $key => $index){
			foreach($index as $key2 => $index2){
				//$newAry = $index2['sip'].','.$index2['name'].','.$index2['date'];
				$newAry[] = $index2['sip'];
				$newAry[] = $index2['name'];
				$newAry[] = $index2['date'];
				$lastState = 'Login';
				foreach($index2 as $key3 => $index3){
					if(is_array($index3)){
						if($index3['states'] == $lastState){
							//$newAry .= ', '.$index3['time'];
							$newAry[] = $index3['time'];
							$lastState = ($lastState=='Login')?'Logout':'Login';
						} 
						else{
							//$newAry .= ', '.'None ,'.$index3['time'];
							$newAry[] = 'None';
							$newAry[] = $index3['time'];
							$lastState = ($lastState=='Login')?'Login':'Logout';
						}							
					}
				}
				
				$newArray[] = $newAry;
				unset($newAry);
			}
			 
		}
		/*echo '<pre>';
		print_r($newArray);
		print_r($response); 
		exit();
*/
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
		->from('user_state_logs')
		->join('users usr', 'usr.id = user_state_logs.user_id')
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		->where('user_state_logs.modified is null')
		->where('user_state_logs.user_state_id !=', 5)		
		->where('user_state_logs.created_ip', $user_ip)
		->order_by('user_state_logs.created', 'desc')
		->limit(1)->get();
		return $query->row_array();//
    } 
    public function getLoginUserStatsLogs($user_id){
    	$fdate = date('Y-m-d').' 00:00:00';
		$tdate = date('Y-m-d').' 23:59:59';
    	$query = $this->db->select('user_state_id, created_ip')//user_state_id, user_id, date, , created, modified
		->from('user_state_logs')
		///->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		->where('user_state_logs.user_id', $user_id)
		->order_by('user_state_logs.created', 'desc')
		->limit(1)->get();
		return $query->row_array();
    } 
    public function getCurrentCountOfAgent($user_id, $fdate, $tdate){

    	$query = $this->db->select('ustates.name as states ')//user_state_id, user_id, date, , created, modified
		->from('user_state_logs')
		->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		->where('user_state_logs.user_id', $user_id)
		->order_by('user_state_logs.created', 'desc')
		->limit(1)->get();
		return $query->row_array();
    } 
    public function getCurrentStateOfAgent($user_id, $fdate, $tdate){
    	$query = $this->db->select('ustates.name as states ')//user_state_id, user_id, date, , created, modified
		->from('user_state_logs')
		->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		//->where('user_state_logs.created >=', $fdate)
		//->where('user_state_logs.created <=', $tdate)
		->where('user_state_logs.user_id', $user_id)
		->order_by('user_state_logs.created', 'desc')
		->limit(1)->get();
		return $query->row_array();
    }
	public function getCurrentStateOfAgents($id, $fdate, $tdate){
    	$query = $this->db->select('max(user_state_logs.created), ustates.name as states, user_state_logs.user_id')//user_state_id, user_id, date, , created, modified
		->from('user_state_logs')
		->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->join('users usrs', 'usrs.id = user_state_logs.user_id and usrs.reporting_id = '.$id)
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		->group_by('ustates.name, user_state_logs.user_id')
		->get();
		return $query->result_array();
    }
    public function getMyAgentStateLog($id){
		//print_r($id);
		$fdate = date('Y-m-d').' 00:00:00';
		$tdate = date('Y-m-d').' 23:59:59';;
		
		$sess_data = $this->session->userdata;
		$ii =  'usrs.id = user_state_logs.user_id and usrs.reporting_id = '.$id;
		if($id == null || $id <= 0){
			$id = $sess_data['data_logged_in']['id'];
			$ii =  'usrs.id = user_state_logs.user_id ';
		}
		//print_r($id);
		
		$query = $this->db->select('user_id, date, usrs.name, usrs.login as sip
		, SEC_TO_TIME(sum(case when user_state_id = 3 then TIME_TO_SEC(TIMEDIFF(IFNULL(user_state_logs.modified, now()), user_state_logs.created)) else 0 end )) break
		, SEC_TO_TIME(sum(case when user_state_id = 4 then TIME_TO_SEC(TIMEDIFF(IFNULL(user_state_logs.modified, now()), user_state_logs.created)) else 0 end )) working
		, SEC_TO_TIME(sum(TIME_TO_SEC(TIMEDIFF(IFNULL(user_state_logs.modified, now()), user_state_logs.created)))) total
		, sum(TIME_TO_SEC(TIMEDIFF(IFNULL(user_state_logs.modified, now()), user_state_logs.created))) avg
		')//, created, modified
		->from('user_state_logs')
		->join('users usrs', $ii)//
		//->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id'), (select user_states.name as states from user_states where user_states.id = user_state_logs.user_state_id) as current
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		->where('user_state_logs.user_state_id not in(5,1,2)')
		//->where('user_id', $id)
		->group_by('user_id, date, usrs.name, usrs.login')
		->having('total >', 0)
		->order_by('user_state_logs.created', 'desc')->get();
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

		$this->db->select('user_state_id, user_id, date, usrs.name, usrs.login as sip, ustates.name as states , sum(TIME_TO_SEC(TIMEDIFF((case when user_state_logs.modified is null then now() else user_state_logs.modified end), user_state_logs.created))) time')//, created, modified
		->from('user_state_logs')
		->join('users usrs', 'usrs.id = user_state_logs.user_id')
		->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.created <=', $tdate)
		->where('user_id', $id)//->where('user_state_logs.modified is null')
		->where('user_state_logs.user_state_id not in(5,1,2)')
		->group_by('user_state_id, user_id, date, ustates.name')
		->having('time >=', 0)
		->order_by('user_state_logs.id', 'desc');
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
		, sum(TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created))) time')//, created, modified
		->from('user_state_logs-')
		->join('users usrs', 'usrs.id = user_state_logs.user_id')
		->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id', 'left outer')
		->where('user_state_logs.created >=', $fdate)
		->where('user_state_logs.modified <=', $tdate)
		->where('user_state_logs.user_state_id not in(5,1,2)')
		->where('user_state_logs.modified is not null')
		//->where('user_id', $id)
		->group_by('user_state_id, user_id, date')
		->having('time >', 0)
		->order_by('user_state_logs.created', 'desc');
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
		->from('user_state_logs')
		->join('users usrs', 'usrs.id = user_state_logs.user_id')
		//->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >= ', $fdate)
		->where('user_state_logs.modified <= ', $tdate)
		->where('user_state_logs.user_state_id not in(5,1,2)')
		->where('user_state_logs.modified is not null')
		//->where('user_id', $id)
		->group_by('date, usrs.login')
		//->having('time >', 0)
		->order_by('user_state_logs.created', 'desc');
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
		return ' SEC_TO_TIME(sum(case when user_state_id = 4 and date(user_state_logs.created) = date(user_state_logs.modified) then TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created )) else 0 end)) Working_time, SEC_TO_TIME(sum(case when user_state_id = 3 and date(user_state_logs.created) = date(user_state_logs.modified) then TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created )) else 0 end)) break_time ,SEC_TO_TIME(sum(case when date(user_state_logs.created) = date(user_state_logs.modified) then TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created )) else 0 end)) agent_time';
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
			$select .= " SEC_TO_TIME(sum(case when user_state_id = 4 and date(user_state_logs.created) = date(user_state_logs.modified) and (time(user_state_logs.modified) <= '".$to."' and time(user_state_logs.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created))
				 when user_state_id = 4 and date(user_state_logs.created) = date(user_state_logs.modified) and (time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_state_logs.created)))
				 when user_state_id = 4 and date(user_state_logs.created) = date(user_state_logs.modified) and time(user_state_logs.modified) between '".$from."' and '".$to."' and time(user_state_logs.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_state_logs.modified), '".$from."'))
				 when user_state_id = 4 and date(user_state_logs.created) = date(user_state_logs.modified) and time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as hour_".$key." , ";
				//working_hour_
				/* SEC_TO_TIME(sum(case when user_state_id = 3 and (time(user_state_logs.modified) <= '".$to."' and time(user_state_logs.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created))
				 when user_state_id = 3 and (time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_state_logs.created)))
				 when user_state_id = 3 and time(user_state_logs.modified) between '".$from."' and '".$to."' and time(user_state_logs.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_state_logs.modified), '".$from."'))
				 when user_state_id = 3 and time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as break_hour_".$key." ,*/
		}
		
		return $select;	
	}
	public function getUserStateLogsHourlyTotals($from_date, $to_date){
		$getListOfHours = $this->getListOfHours($from_date, $to_date);
		$getListOfDays = $this->getListOfDays($from_date, $to_date);
		//print_r($getListOfHours); exit();
		$this->db->select('date, "Careem" as name, "Total" as sip
		, '.$getListOfHours.' '.$getListOfDays)//, created, modified
		->from('user_state_logs')
		->join('users usrs', 'usrs.id = user_state_logs.user_id')
		//->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >= ', $from_date)
		->where('user_state_logs.modified <= ', $to_date)
		->where('user_state_logs.user_state_id not in(5,1,2)')
		->where('user_state_logs.modified is not null')
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
		$this->db->select(' date, usrs.name, usrs.login as sip
		, '.$getListOfHours.'  '.$getListOfDays)//, created, modified
		->from('user_state_logs')
		->join('users usrs', 'usrs.id = user_state_logs.user_id')
		//->join('user_states ustates', 'ustates.id = user_state_logs.user_state_id')
		->where('user_state_logs.created >= ', $from_date)
		->where('user_state_logs.modified <= ', $to_date)
		->where('user_state_logs.user_state_id not in(5,1,2)')
		->where('user_state_logs.modified is not null')
		//->where('user_id', $id)
		->group_by('date, usrs.login')
		//->having('time >', 0)
		->order_by('user_state_logs.created', 'desc');
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
		->from('user_state_logs')
		->where('user_id', $id)
		->order_by('created', 'desc')
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
		->from('user_state_logs')
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
		$this->db->update('user_state_logs', $sta);
	}
	public function findnUpdateLogout($state, $ip, $user, $created_by){

		$this->db->select('id')
		->from('user_state_logs')
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
		$this->db->update('user_state_logs', $sta);
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
	public function saveUserStateLogs($data){
		$insert = $this->db->insert('user_state_logs', $data);
	    return $insert;
	}
	public function updateUserStateLogs($role){
		$this->db->where('role_id', $id);
		$this->db->update('roles', $data);
		$report = array();
		$report['error'] = $this->db->_error_number();
		$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}
	function deleteUserStateLogs($id){
		$this->db->where('role_id', $id);
		$this->db->delete('roles'); 
	}
}
?>	
