<?php
class MonitoringActivities_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function runRendomizer($date=null) {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];
		
		$this->db->select('id, monitoring_for_id, user_id, belong_id, percentage ')
			->from('monitoring_rendomizers')
			->where('status',1)
			->order_by('created', 'desc')->order_by('monitoring_for_id', 'desc');
				
		$query = $this->db->get()->result_array();
		//echo '<pre>';
		//print_r($query); //exit();
		$monitoring_for = '';
		foreach($query as $key => $index){
			//if($monitoring_for = '' || $monitoring_for != $index['monitoring_for_id']){$this->db->where_not_in('id', $ids);
			//$monitoring_for = $index['monitoring_for_id'];
			//$this->db->distinct();
			
			$this->db->select('distinct(activities.created_by) as activity_user, activities.monitoring_for_id,	max(`activities`.`ticket_no`) as ticket_no ')
			->from('activities')
			->where('date(created)',$date)
			->where('activities.ticket_no is not null')
			->where('monitoring_for_id',$index['monitoring_for_id'])
			->where("activities.created_by NOT IN (select activity_user from monitoring_activities where ticket_date = '$date' ) ")
			->group_by('activities.created_by, activities.monitoring_for_id')
			->order_by('activities.created_by','RANDOM')// 'RAND()')
			->limit($index['percentage']);
			$query2 = $this->db->get()->result_array();

			if(!empty($query2)){
				foreach($query2 as $key2 => $index2){
					$query2[$key2]['ticket_date'] = $date;
					$query2[$key2]['user_id'] = $index['user_id'];
				}
				$this->db->insert_batch('monitoring_activities', $query2);
			}
			/*
			}
			else{

				$this->db->select('distinct(created_by) as user_id, monitoring_for_id, ticket_no ')
				->from('activities')
				->where('date(created)',$date)
				->where('monitoring_for_id',$index['monitoring_for_id'])
				->group_by('created_by', 'desc')
				->order_by('user_id','RANDOM')// 'RAND()')
				->limit($index['percentage']);
				$query2 = $this->db->get()->result_array();
			}
			*/			
			//print_r($query2); 

		}
		return true;
		//exit();
		//return array('table' => $query->result_array(), 'total' => count($query->result_array()));
		//return array('emaildrivers' => $query->result_array());
	}
	public function myRendomizers($monitoring_for_id=null) {
		$sess_data = $this->session->userdata;
		$id = $sess_data['data_logged_in']['id'];

		///if($monitoring_for_id == 1){
			$this->db->select('mact.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, domains.name as city, mact.ticket_no, mact.activity_id')
			->from('monitoring_activities mact')
			->join('activities', 'mact.ticket_no = activities.ticket_no')
			->join('ticket_status states', 'activities.status = states.id')
			->join('domains', 'activities.domain_id = domains.id')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_categories category_email_drivers', 'activities.email_driver_id = category_email_drivers.id', 'right')
			//->join('monitoring_categories sub_category_email_drivers', 'activities.email_sub_driver_id = sub_category_email_drivers.id')
			->join('monitoring_categories reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id', 'right' )
			//->join('monitoring_categories sub_reason_email_drivers', 'activities.email_sub_reason_id = sub_reason_email_drivers.id')
			->where('mact.user_id' ,$id)
			//->where('activities.monitoring_for_id',1)
			//->where('date(activities.created)', date('Y-m-d'))
			->order_by('activities.created', 'desc');;
		/*}
		else{
			$this->db->select('activities.id, monitoring_for.name as campaing, category_email_drivers.name as edriver, reason_email_drivers.name as ereason, states.name as status, (select name from domains where id = domain_id) as city, ticket_no')
			->from('activities')
			->join('ticket_status states', 'activities.status = states.id')
			->join('monitoring_for', 'activities.monitoring_for_id = monitoring_for.id')
			->join('monitoring_email_drivers category_email_drivers', 'activities.email_driver_id = category_email_drivers.id')
			->join('monitoring_email_drivers reason_email_drivers', 'activities.email_reason_id = reason_email_drivers.id')
			->where('activities.created_by', $id)
			->where('activities.monitoring_for_id !=',1)
			->where('date(activities.created)', date('Y-m-d'))
			->order_by('activities.created', 'desc');;
		}*/
		return $this->db->get()->result_array();
		//$query = $this->db->get();
		//return array('table' => $query->result_array(), 'total' => count($query->result_array()));
		//return array('emaildrivers' => $query->result_array());
	}
	public function getAllMonitorRendomizers($id, $monitoring_for_id, $type_id, $parent_id, $base_id=null, $level=null) {
		$sess_data = $this->session->userdata;
		//$role_id = $sess_data['data_logged_in']['role_id'];

		$this->db->select('id, name, monitoring_for_id, status, parent_id, level, base_id')
			->from('monitoring_categories')
			->where('status', 1);
		if ($id != null) {
			$this->db->where('id', $id);
		}
		if ($monitoring_for_id != null) {
			$this->db->where('monitoring_for_id', $monitoring_for_id);
		}
		if ($type_id != null) {
			$this->db->where('monitoring_only', $type_id);
		}
		if ($parent_id != null) {
			$this->db->where('parent_id', $parent_id);
		}
		$this->db->order_by('monitoring_for_id', 'asc');
		$this->db->order_by('id', 'desc');
		$query = $this->db->get();
		return array('monitoringRendomizers' => $query->result_array());
	}
	public function setAllMonitoringRendomizers($email_driver) {
		$id = 0;
		if(isset($email_driver['id'])){
			$id = $email_driver['id'];
			unset($email_driver['id']);
		}
		
		//$status = $email_driver['status'];
		//print_r($email_driver);
		$sess_data = $this->session->userdata;

		if ($id != 0) {
			unset($email_driver['id']);
			$email_driver['updated_by'] = $sess_data['data_logged_in']['id'];
			$email_driver['updated'] = date("Y-m-d H:i:s");
			return $this->updateEmailDrivers($id, $email_driver);
		}else{
			$email_driver['created_by'] = $sess_data['data_logged_in']['id'];
			$email_driver['created'] = date("Y-m-d H:i:s");
			$insert = $this->db->insert('monitoring_rendomizers', $email_driver);
			return $insert;
		}
		
		
	}
	public function updateEmailDrivers($id, $data) {
		$this->db->where('id', $id);
		return $this->db->update('monitoring_rendomizers', $data);
	}

	/**
	 * Delete user
	 * @param int $id - user id
	 * @return boolean
	 */
	function deleteRole($id) {
		$this->db->where('role_id', $id);
		$this->db->delete('monitoring_rendomizers');
	}
}
?>
