<?php
class Activities_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
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
				 when user_state_id = 4 and date(user_state_logs.created) = date(user_state_logs.modified) and time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)
				 when user_state_id = 4 and date(user_state_logs.created) < date(user_state_logs.modified) and time(user_state_logs.modified) < time(user_state_logs.created) and TIMEDIFF(user_state_logs.modified, user_state_logs.created) <= TIME('03:00:00') then TIME_TO_SEC('01:00:00') else 0 end)) as hour_".$key." , 
				 ";
				//working_hour_
				/* SEC_TO_TIME(sum(case when user_state_id = 3 and (time(user_state_logs.modified) <= '".$to."' and time(user_state_logs.created) > '".$from."' ) then TIME_TO_SEC(TIMEDIFF(user_state_logs.modified, user_state_logs.created))
				 when user_state_id = 3 and (time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) between '".$from."' and '".$to."') then TIME_TO_SEC(TIMEDIFF('".$to."', time(user_state_logs.created)))
				 when user_state_id = 3 and time(user_state_logs.modified) between '".$from."' and '".$to."' and time(user_state_logs.created) < '".$from."' then TIME_TO_SEC(TIMEDIFF(time(user_state_logs.modified), '".$from."'))
				 when user_state_id = 3 and time(user_state_logs.modified) > '".$to."' and time(user_state_logs.created) <= '".$from."' then TIME_TO_SEC('01:00:00') else 0 end)) as break_hour_".$key." ,*/
		}
		
		return $select;	
	}
	public function getHourlyActivitiesDashboard($from_date = null, $to_date = null, $campaign_id = null){

	}
	public function getActivitiesDashboard($from_date = null, $to_date = null, $campaign_id = null){
		$from_date = '2019-01-12 00:00:00';
		$to_date = '2019-01-19 00:00:00';
		$this->db->select("ac.campiagn_id, c.name campaign_name, u.name agent, u.login agent_id, u2.name teamlead, u2.login teamlead_id, date(a.created) as entered, count(*) activities
		, sum(case when a.ticket_process = 'ticket' or a.ticket_process = '' or a.ticket_process is null then 1 else 0 end) tickets
		, sum(case when a.ticket_process = 'adjustment' then 1 else 0 end) adjustments
		, sum(case when a.ticket_process = 'escalation' then 1 else 0 end) escalations");
		$this->db->from('activities a');
		$this->db->join('users as u', 'a.created_by = u.id');
		$this->db->join('users as u2', 'u.reporting_id = u2.id');
		$this->db->join('access_campiagns as ac', 'ac.user_id = a.created_by');
		$this->db->join('monitoring_for as c', 'c.id = ac.campiagn_id');		
		$this->db->where('u.role_id', 11);
		$this->db->where('c.id != ', 9);
		if($from_date != '' && $from_date != null){
			$this->db->where('date(a.created) >=', $from_date);
		}
		if($to_date != '' && $to_date != null){
			$this->db->where('date(a.created) <=', $to_date);
		}
		$this->db->group_by('ac.campiagn_id, campaign_name, u.name, u.login, u2.name, u2.login , entered');		
		$this->db->order_by('a.created', 'asc');
		
		$query = $this->db->get();
		//print_r($query->result_array());
		
		$result = array();
		foreach($query->result_array() as $key => $index){
			
			if(!isset($result['campaignwise'][$index['campiagn_id']]['tickets'])) $result['campaignwise'][$index['campiagn_id']]['tickets'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['adjustments'])) $result['campaignwise'][$index['campiagn_id']]['adjustments'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['escalations'])) $result['campaignwise'][$index['campiagn_id']]['escalations'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['activities'])) $result['campaignwise'][$index['campiagn_id']]['activities'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['tickets'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['tickets'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['adjustments'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['adjustments'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['escalations'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['escalations'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['activities'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['activities'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['tickets'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['tickets'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['adjustments'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['adjustments'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['escalations'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['escalations'] = 0;
			if(!isset($result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['activities'])) $result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['activities'] = 0;

			$result['campaignwise'][$index['campiagn_id']]['tickets'] += $index['tickets'];
			$result['campaignwise'][$index['campiagn_id']]['adjustments'] += $index['adjustments'];
			$result['campaignwise'][$index['campiagn_id']]['escalations'] += $index['escalations'];
			$result['campaignwise'][$index['campiagn_id']]['activities'] += $index['activities'];
			$result['campaignwise'][$index['campiagn_id']]['name'] = $index['campaign_name'];
			
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['tickets'] += $index['tickets'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['adjustments'] += $index['adjustments'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['escalations'] += $index['escalations'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['activities'] += $index['activities'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['name'] = $index['teamlead'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['login'] = $index['teamlead_id'];
		
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['tickets'] += $index['tickets'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['adjustments'] += $index['adjustments'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['escalations'] += $index['escalations'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['activities'] += $index['activities'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['name'] = $index['agent'];
			$result['campaignwise'][$index['campiagn_id']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['login'] = $index['agent_id'];

			if(!isset($result['datewise'][$index['entered']]['tickets'])) $result['datewise'][$index['entered']]['tickets'] = 0;
			if(!isset($result['datewise'][$index['entered']]['adjustments'])) $result['datewise'][$index['entered']]['adjustments'] = 0;
			if(!isset($result['datewise'][$index['entered']]['escalations'])) $result['datewise'][$index['entered']]['escalations'] = 0;
			if(!isset($result['datewise'][$index['entered']]['activities'])) $result['datewise'][$index['entered']]['activities'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['tickets'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['tickets'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['adjustments'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['adjustments'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['escalations'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['escalations'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['activities'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['activities'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['tickets'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['tickets'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['adjustments'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['adjustments'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['escalations'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['escalations'] = 0;
			if(!isset($result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['activities'])) $result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['activities'] = 0;

			$result['datewise'][$index['entered']]['tickets'] += $index['tickets'];
			$result['datewise'][$index['entered']]['adjustments'] += $index['adjustments'];
			$result['datewise'][$index['entered']]['escalations'] += $index['escalations'];
			$result['datewise'][$index['entered']]['activities'] += $index['activities'];
			$result['datewise'][$index['entered']]['name'] = $index['entered'];
		
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['tickets'] += $index['tickets'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['adjustments'] += $index['adjustments'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['escalations'] += $index['escalations'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['activities'] += $index['activities'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['name'] = $index['teamlead'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['login'] = $index['teamlead_id'];
		
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['tickets'] += $index['tickets'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['adjustments'] += $index['adjustments'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['escalations'] += $index['escalations'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['activities'] += $index['activities'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['name'] = $index['agent'];
			$result['datewise'][$index['entered']]['childen'][$index['teamlead_id']]['childen'][$index['agent_id']]['login'] = $index['agent_id'];



			if(!isset($result['teamwise'][$index['teamlead_id']]['tickets'])) $result['teamwise'][$index['teamlead_id']]['tickets'] = 0;
			if(!isset($result['teamwise'][$index['teamlead_id']]['adjustments'])) $result['teamwise'][$index['teamlead_id']]['adjustments'] = 0;
			if(!isset($result['teamwise'][$index['teamlead_id']]['escalations'])) $result['teamwise'][$index['teamlead_id']]['escalations'] = 0;
			if(!isset($result['teamwise'][$index['teamlead_id']]['activities'])) $result['teamwise'][$index['teamlead_id']]['activities'] = 0;

			$result['teamwise'][$index['teamlead_id']]['tickets'] += $index['tickets'];
			$result['teamwise'][$index['teamlead_id']]['adjustments'] += $index['adjustments'];
			$result['teamwise'][$index['teamlead_id']]['escalations'] += $index['escalations'];
			$result['teamwise'][$index['teamlead_id']]['activities'] += $index['activities'];
			$result['teamwise'][$index['teamlead_id']]['name'] = $index['teamlead'];
			$result['teamwise'][$index['teamlead_id']]['login'] = $index['teamlead_id'];


			if(!isset($result['agentwise'][$index['agent_id']]['tickets'])) $result['agentwise'][$index['agent_id']]['tickets'] = 0;
			if(!isset($result['agentwise'][$index['agent_id']]['adjustments'])) $result['agentwise'][$index['agent_id']]['adjustments'] = 0;
			if(!isset($result['agentwise'][$index['agent_id']]['escalations'])) $result['agentwise'][$index['agent_id']]['escalations'] = 0;
			if(!isset($result['agentwise'][$index['agent_id']]['activities'])) $result['agentwise'][$index['agent_id']]['activities'] = 0;

			$result['agentwise'][$index['agent_id']]['tickets'] += $index['tickets'];
			$result['agentwise'][$index['agent_id']]['adjustments'] += $index['adjustments'];
			$result['agentwise'][$index['agent_id']]['escalations'] += $index['escalations'];
			$result['agentwise'][$index['agent_id']]['activities'] += $index['activities'];
			$result['agentwise'][$index['agent_id']]['name'] = $index['agent'];
			$result['agentwise'][$index['agent_id']]['login'] = $index['agent_id'];
		}
		//print_r($result);
		//exit();
		$result['campaignwise'] = array_values($result['campaignwise']);
		foreach ($result['campaignwise'] as $key => $index){
			$result['campaignwise'][$key]['childen'] = array_values($index['childen']);
			foreach(array_values($index['childen']) as $ky => $idx){
				$result['campaignwise'][$key]['childen'][$ky]['childen'] = array_values($idx['childen']);
			}
		}
		$result['datewise'] = array_values($result['datewise']);
		foreach ($result['datewise'] as $key => $index){
			///echo '<pre>'; print_r($index); exit();
			$result['datewise'][$key]['childen'] = array_values($index['childen']);
			foreach(array_values($index['childen']) as $ky => $idx){
			//	echo '<pre>'; print_r($index2); exit();
			// 	echo 'key';
			// 	print_r($key2);
			// 	echo 'index2';
			// if(is_array($index2)){
					//	echo '<pre>'; print_r($idx); 
					//exit();
					//print_r($index2);
					$result['datewise'][$key]['childen'][$ky]['childen'] = array_values($idx['childen']);
				//}
			}
		
			// print_r($index);
			// if(is_array($index)){
			// 	print_r($index);
			// 	$result['datewise']['chillern'] = array_values($index);
			// }
			
		}
		return $result;



	}
	public function graphActivities($id, $fDate, $tDate) {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		$from_date = !empty($fDate) ? $fDate : date('m/d/Y',  strtotime(date('Y-m-d')));
		$to_date = !empty($tDate) ? $tDate : date('m/d/Y', strtotime(date('Y-m-d')));

		//if($monitoring_for_id == 1){
			$this->db->select('activities.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, (select name from domains where id = domain_id) as city, ticket_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('ticket_status states', 'activities.created_by = states.id')
			->join('users usrs', 'activities.created_by = usrs.id')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_categories category_email_drivers', 'activities.email_driver_id = category_email_drivers.id', 'left')
			->join('monitoring_categories sub_category_email_drivers', 'activities.email_sub_driver_id = sub_category_email_drivers.id', 'left')
			->join('monitoring_categories reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id', 'left')
			->join('monitoring_categories sub_reason_email_drivers', 'activities.email_sub_reason_id = sub_reason_email_drivers.id', 'left')
		//	->where('activities.created_by', $id)
		//	->where('activities.monitoring_for_id',$monitoring_for_id)
			->where('date(activities.created) >=', $from_date)
			->where('date(activities.created) <=', $to_date);
			// if($ticket_process == 'adjustment'){
			// 	$this->db->where('activities.ticket_process', $ticket_process);
			// }
			$this->db->order_by('activities.created', 'asc');
			$query = $this->db->get()->result_array();
			print_r($query);
			exit();
		/*}
		else{
			$this->db->select('activities.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, (select name from domains where id = domain_id) as city, ticket_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('ticket_status states', 'activities.status = states.id')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_email_drivers category_email_drivers', 'activities.email_driver_id = category_email_drivers.id')
			->join('monitoring_email_drivers reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id')
			->where('activities.created_by', $id)
			->where('activities.ticket_process', $ticket_process)
			->where('activities.monitoring_for_id !=',1)
			->where('date(activities.created)', date('Y-m-d'));
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}
			$this->db->order_by('activities.created', 'desc');
		}*/
		
		
		
		$query = $this->db->get();
		return array('table' => $query->result_array(), 'total' => count($query->result_array()));
		//return array('emaildrivers' => $query->result_array());
	}
	public function getAgenttickets($monitoring_for_id, $ticket_process) {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		//if($monitoring_for_id == 1){
			$this->db->select('*')
			->from('activities')
			->where('activities.created_by', $id)
			->where('activities.monitoring_for_id',$monitoring_for_id);
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}else{
				$this->db->where('date(activities.created)', date('Y-m-d'));
			}
			$this->db->order_by('activities.created', 'desc');
/*		}
		else{
			$this->db->select('*')
			->from('activities')
			->where('activities.created_by', $id)
			->where('activities.ticket_process', $ticket_process)
			->where('activities.monitoring_for_id !=',1);
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}else{
				$this->db->where('date(activities.created)', date('Y-m-d'));
			}
			$this->db->order_by('activities.created', 'desc');
		}*/
		
		
		
		$query = $this->db->get();
		return array('activities' => $query->result_array(), 'meta' => count($query->result_array()));
		//return array('emaildrivers' => $query->result_array());
	}
	public function getUserActivities($id, $from_date, $to_date, $monitoring_for_id = null, $ticket_process = null){
		//print_r($from_date);
		$fdate = $from_date[2].'-'.$from_date[0].'-'.$from_date[1].' 00:00:00';
		$tdate = $to_date[2].'-'.$to_date[0].'-'.$to_date[1].' 23:59:59';;
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		//if($monitoring_for_id == 1){
			$this->db->select('date(activities.created) as date, time(activities.created) as time, agent.name name, agent.login sip, monitoring_for.name as campaign, category_email_drivers.name as category,sub_category_email_drivers.name as sub_category, reason_email_drivers.name as reason, sub_reason_email_drivers.name as sub_reason, (select name from domains where id = domain_id) as city, states.name as status, ticket_no, booking_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('users agent-', 'activities.created_by = agent.id')
			->join('ticket_status states', 'activities.status = states.id')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_categories category_email_drivers', 'activities.email_driver_id = category_email_drivers.id', 'left')
			->join('monitoring_categories sub_category_email_drivers', 'activities.email_sub_driver_id = sub_category_email_drivers.id', 'left')
			->join('monitoring_categories reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id', 'left')
			->join('monitoring_categories sub_reason_email_drivers', 'activities.email_sub_reason_id = sub_reason_email_drivers.id', 'left')
			->where('activities.monitoring_for_id',$monitoring_for_id)
			->where('date(activities.created) >=', $fdate)
			->where('date(activities.created) <=', $tdate);
			if($ticket_process != 'ticket'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}

			$this->db->order_by('activities.created', 'desc');
		/*}
		else{
			
			$this->db->select('date(activities.created) as date, time(activities.created) as time, agent.name name, agent.login sip, monitoring_for.name as campaign, category_email_drivers.name as category, (select name from domains where id = domain_id) as city, reason_email_drivers.name as reason, states.name as status, ticket_no, booking_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
				->from('activities')
				->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
				->join('users agent', 'activities.created_by = agent.id')
				->join('ticket_status states', 'activities.status = states.id')
				->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
				->join('monitoring_email_drivers category_email_drivers', 'activities.email_driver_id = category_email_drivers.id')
				->join('monitoring_email_drivers reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id')
				->where('activities.monitoring_for_id',$monitoring_for_id)
				->where('date(activities.created) >=', $fdate)
				->where('date(activities.created) <=', $tdate);
				if($ticket_process == 'adjustment'){
					$this->db->where('activities.ticket_process', $ticket_process);
				}				
				$this->db->order_by('activities.created', 'desc');
			
		}*/
		$query = $this->db->get();
		//print_r($query->result_array()); exit();
		return $query->result_array();
		//return array('table' => $query->result_array(), 'total' => count($query->result_array()));
		//return array('emaildrivers' => $query->result_array());
	}
	public function getAllMonitorEmailDrivers($id, $for_id, $type_id) {
		$sess_data = $this->session->userdata;
		//$role_id = $sess_data['data_logged_in']['role_id'];
		$this->db->select('id, name, monitoring_for_id, status')
			->from('monitoring_email_drivers')
			->where('status', 1);
		if ($id != null) {
			$this->db->where('id', $id);
		}
		if ($for_id != null) {
			$this->db->where('monitoring_for_id', $for_id);
		}
		if ($type_id != null) {
			$this->db->where('monitoring', $type_id);
		}
		$query = $this->db->get();
		return array('emaildrivers' => $query->result_array());
	}
	public function getMyTicket($monitoring_for_id, $ticket_process) {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		//if($monitoring_for_id == 1){
			$this->db->select('activities.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, (select name from domains where id = domain_id) as city, ticket_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('ticket_status states', 'activities.status = states.id')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_categories category_email_drivers', 'activities.email_driver_id = category_email_drivers.id', 'left')
			->join('monitoring_categories sub_category_email_drivers', 'activities.email_sub_driver_id = sub_category_email_drivers.id', 'left')
			->join('monitoring_categories reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id', 'left')
			->join('monitoring_categories sub_reason_email_drivers', 'activities.email_sub_reason_id = sub_reason_email_drivers.id', 'left')
			->where('activities.created_by', $id)
			->where('activities.monitoring_for_id',$monitoring_for_id)
			->where('date(activities.created)', date('Y-m-d'));
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}
			$this->db->order_by('activities.created', 'desc');
		/*}
		else{
			$this->db->select('activities.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, (select name from domains where id = domain_id) as city, ticket_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('ticket_status states', 'activities.status = states.id')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_email_drivers category_email_drivers', 'activities.email_driver_id = category_email_drivers.id')
			->join('monitoring_email_drivers reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id')
			->where('activities.created_by', $id)
			->where('activities.ticket_process', $ticket_process)
			->where('activities.monitoring_for_id !=',1)
			->where('date(activities.created)', date('Y-m-d'));
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}
			$this->db->order_by('activities.created', 'desc');
		}*/
		
		
		
		$query = $this->db->get();
		return array('table' => $query->result_array(), 'total' => count($query->result_array()));
		//return array('emaildrivers' => $query->result_array());
	}
	public function findTicketsByTicketNo($data){
		//echo 'Im in';
		//echo $data;
		$this->db->select('id,  monitoring_for_id, email_driver_id, email_reason_id, status, ticket_no, created_by, domain_id, email_sub_driver_id, email_sub_reason_id')
			->from('activities')
			->where('id', $data)
		//	->where('activities.status', $data2)
		//	->where('date(created)', date('Y-m-d'))
			->order_by('created', 'desc')->limit(1);
		
		
		$query = $this->db->get();
		return $query->row_array();
		//print_r($query->row_array());
		//print_r($data); 
		//exit();

	}
	private function checkIfExist($data, $data2){
		
		$this->db->select('id, (select name from monitoring_for where id = monitoring_for_id) as campaing, (select name from monitoring_email_drivers where id = email_driver_id) as edriver, (select name from monitoring_email_drivers where id = email_reason_id) as ereason, (select name from ticket_status where id = activities.status) as status, ticket_no')
			->from('activities')
			->where('ticket_no', $data)
		//	->where('activities.status', $data2)
			->where('date(created)', date('Y-m-d'))
			->order_by('created', 'desc')->limit(1);
		
		
		$query = $this->db->get();
		return $query->row_array();
		//print_r($query->row_array());
		//print_r($data); exit();

	}
	public function addAgenttickets($activity) {

		//$id = $email_driver['id'];
		//$status = $email_driver['status'];
		//print_r($activity);
		$checking = $this->checkIfExist(trim($activity['ticket_no']), trim($activity['status']));
		//return ;
		$sctive = isset($activity['activitiesAdjustments'])?$activity['activitiesAdjustments']:array();
		$dctive = isset($activity['activitiesEscalations'])?$activity['activitiesEscalations']:array();
		unset($activity['activitiesAdjustments']);
		unset($activity['activitiesEscalations']);
		if(empty($checking)){
			$sess_data = $this->session->userdata;
			$activity['created_by'] = $sess_data['data_logged_in']['id'];
			$activity['created'] = date("Y-m-d H:i:s");
			$insert = $this->db->insert('activities', $activity);
			//$insert_id = 
			$dctive['activity_id'] = $sctive['activity_id'] =  $this->db->insert_id();
		//	if( $activity['ticket_process'] == 'adjustment'){
				$sctive['created_by'] = $sess_data['data_logged_in']['id'];
				$sctive['created'] = date("Y-m-d H:i:s");
				$insert = $this->db->insert('activities_adjustments', $sctive);
		//	}
			if( $activity['ticket_process'] == 'escalation'){
				$dctive['created_by'] = $sess_data['data_logged_in']['id'];
				$dctive['created'] = date("Y-m-d H:i:s");
				$insert = $this->db->insert('activities_escalations', $dctive);
			}
			
			return array('activities' => array(), 'meta' => array('find'=> false , 'rs' => $insert));
		}
		else{
			return array('activities' => array(), 'meta' => array('find'=> true , 'rs' => $checking));
		}
		
		
	}
	public function getTodayTicketsOfAgent($users){
    	$query = $this->db->select('count(*) as tickets, created_by')//user_state_id, user_id, date, , created, modified
		->from('activities')
		->where('activities.created_by in ('.$users.')')
		->where('date(activities.created)', date('Y-m-d'))
		->group_by('created_by')
		->get();
		return $query->result_array();
    }
	public function updateEmailDrivers($id, $data) {
		$this->db->where('id', $id);
		return $this->db->update('monitoring_email_drivers', $data);
	}

	/**
	 * Delete user
	 * @param int $id - user id
	 * @return boolean
	 */
	function deleteRole($id) {
		$this->db->where('role_id', $id);
		$this->db->delete('monitoring_email_drivers');
	}
}
?>
