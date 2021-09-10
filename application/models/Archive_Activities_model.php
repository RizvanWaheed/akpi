<?php
class Archive_Activities_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database('archive', TRUE);
	}
	public function getAgenttickets($monitoring_for_id, $ticket_process) {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		if($monitoring_for_id == 1){
			$this->db->select('*')
			->from('activities')
			->where('activities.created_by', $id)
			->where('activities.monitoring_for_id',1);
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}else{
				$this->db->where('date(activities.created)', date('Y-m-d'));
			}
			$this->db->order_by('activities.created', 'desc');
		}
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
		}
		
		
		
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

		if($monitoring_for_id == 1){
			$this->db->select('date(activities.created) as date, time(activities.created) as time, agent.name name, agent.login sip, monitoring_for.name as campaign, category_email_drivers.name as category,sub_category_email_drivers.name as sub_category, reason_email_drivers.name as reason, sub_reason_email_drivers.name as sub_reason, (select name from domains where id = domain_id) as city, states.name as status, ticket_no, booking_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('users agent', 'activities.created_by = agent.id')
			->join('ticket_status states', 'activities.status = states.id')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_categories category_email_drivers', 'activities.email_driver_id = category_email_drivers.id')
			->join('monitoring_categories sub_category_email_drivers', 'activities.email_sub_driver_id = sub_category_email_drivers.id')
			->join('monitoring_categories reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id')
			->join('monitoring_categories sub_reason_email_drivers', 'activities.email_sub_reason_id = sub_reason_email_drivers.id')
			->where('activities.monitoring_for_id',1)
			->where('date(activities.created) >=', $fdate)
			->where('date(activities.created) <=', $tdate);
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}

			$this->db->order_by('activities.created', 'desc');;
		}
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
			
		}
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

		if($monitoring_for_id == 1){
			$this->db->select('activities.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, (select name from domains where id = domain_id) as city, ticket_no, adjust.amount, adjust.customer_adjustment, adjust.captain_adjustment, adjust.comment')
			->from('activities')
			->join('ticket_status states', 'activities.status = states.id')
			->join('activities_adjustments adjust', 'adjust.activity_id = activities.id and adjust.status = 1' , 'left')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_categories category_email_drivers', 'activities.email_driver_id = category_email_drivers.id')
			->join('monitoring_categories sub_category_email_drivers', 'activities.email_sub_driver_id = sub_category_email_drivers.id')
			->join('monitoring_categories reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id')
			->join('monitoring_categories sub_reason_email_drivers', 'activities.email_sub_reason_id = sub_reason_email_drivers.id')
			->where('activities.created_by', $id)
			->where('activities.monitoring_for_id',1)
			->where('date(activities.created)', date('Y-m-d'));
			if($ticket_process == 'adjustment'){
				$this->db->where('activities.ticket_process', $ticket_process);
			}
			$this->db->order_by('activities.created', 'desc');
		}
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
		}
		
		
		
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
		unset($activity['activitiesAdjustments']);
		if(empty($checking)){
			$sess_data = $this->session->userdata;
			$activity['created_by'] = $sess_data['data_logged_in']['id'];
			$activity['created'] = date("Y-m-d H:i:s");
			$insert = $this->db->insert('activities', $activity);
			//$insert_id = 
			$sctive['activity_id'] =  $this->db->insert_id();
			if( $activity['ticket_process'] == 'adjustment'){

				$sctive['created_by'] = $sess_data['data_logged_in']['id'];
				$sctive['created'] = date("Y-m-d H:i:s");
				$insert = $this->db->insert('activities_adjustments', $sctive);
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
