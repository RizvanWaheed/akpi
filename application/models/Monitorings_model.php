<?php
class Monitorings_model extends CI_Model {

	public function __construct() {
		$this->load->database();
	}
	public function others($index, $id) {
		$id -= 1;
		$glb = array();
		$glb['emailLanguage'] = array();
		$glb['emailLanguage'][0] = 'English';
		$glb['emailLanguage'][1] = 'Arabic';

		$glb['emailType'] = array();
		$glb['emailType'][0] = 'Inquiries';
		$glb['emailType'][1] = 'Complaint';
		$glb['emailType'][2] = 'Transaction';

		$glb['satisfaction'] = array();
		$glb['satisfaction'][0] = 'Satisfy';
		$glb['satisfaction'][1] = 'Dissatisfy';

		$glb['satisfactionReason'] = array();
		$glb['satisfactionReason'][0] = 'Careem Prosses & Prodact';
		$glb['satisfactionReason'][1] = 'CSR Performance';
		$glb['satisfactionReason'][2] = 'Call Center Procedures';
		$glb['satisfactionReason'][3] = 'Captain Performance and attitude';

		$glb['monitoringProcess'] = array();
		$glb['monitoringProcess'][0] = 'Remote';
		$glb['monitoringProcess'][1] = 'Side By Side';
		$glb['monitoringProcess'][2] = 'Calibration';
		$glb['monitoringProcess'][3] = 'Coaching';

		$glb['emailDriver'] = array();
		$glb['emailDriver'][0] = 'Amend the booking';
		$glb['emailDriver'][1] = 'Call from Cpatain';
		$glb['emailDriver'][2] = 'Campaigns';
		$glb['emailDriver'][3] = 'Captain Performance and attitude';
		$glb['emailDriver'][4] = 'Car Booking';
		$glb['emailDriver'][5] = 'Car types';
		$glb['emailDriver'][6] = 'Careem RT';
		$glb['emailDriver'][7] = 'Cash collection';
		$glb['emailDriver'][8] = 'Change the account data';
		$glb['emailDriver'][9] = 'Cpatain wants to join Careem';
		$glb['emailDriver'][10] = 'Credit card issus';
		$glb['emailDriver'][11] = 'Credit Issue (Refund, etc.)';
		$glb['emailDriver'][12] = 'Forgetting Possessions in car';
		$glb['emailDriver'][13] = 'How to use the app';
		$glb['emailDriver'][14] = 'Peak Issus';
		$glb['emailDriver'][15] = 'Pricing';
		$glb['emailDriver'][16] = 'Promo Code';
		$glb['emailDriver'][17] = 'Referral call (Invitation)';
		$glb['emailDriver'][18] = 'Campaigns';
		$glb['emailDriver'][19] = 'SMS Failure';

		/*if ($index) {
			$parray = ;
			foreach($parray as $index){
				$index['id'] ==
			}

		}*/
		return $glb[$index][$id];

	}
	public function getAllMonitorings($from, $to, $for_id = null, $belongs_to = null) {
//monitorings.created_by,	monitorings.created,
		/*$fDate = explode('/', $from);
		$tDate = explode('/', $to);

		$from_date = $fDate[2] . '-' . $fDate[0] . '-' . $fDate[1];
		$to_date = $tDate[2] . '-' . $tDate[0] . '-' . $tDate[1];*/

		$from_date = date('Y-m-d', strtotime($from));
		$to_date = date('Y-m-d', strtotime($to));

		/*print_r($from_date);
			print_r($to_date);, monitorings.date,	monitorings.time
		*/
	//	if($for_id == 1){

			$this->db->select('monitorings.id, monitorings.date, monitorings.ticket_no, monitorings.booking_no, agent.name agent_name, agent.login sip, tl.name as tl_name, monitored.name as monitored_name,	monitorings.customer, country.name as country_name,	city.name as city_name, emaillanguage.name as email_language, emailtype.name email_type,	drivertype.name as category,	driversubtype.name as subcategory, driverReason.name as reason, driversubReason.name as subreason, disputetype.name dispute_type, monitorings.score, monitorings.bouns, satisfaction.name as satisfy,	monitoringprocess.name as monitoring_process, monitorings.general_comment, monitorings.result,	satisfactionreason.name satisfaction_reason')
			->from('monitorings')
			
			->join('domains city', 'monitorings.city_id = city.id')
			->join('domains country', 'monitorings.country_id = country.id')
			
			->join('monitoring_categories drivertype', 'monitorings.email_driver_id = drivertype.id', 'left outer')
			->join('monitoring_categories driversubtype', 'monitorings.email_sub_driver_id = driversubtype.id', 'left outer')
			->join('monitoring_categories driverReason', 'monitorings.email_reason_id = driverReason.id', 'left outer')
			->join('monitoring_categories driversubReason', 'monitorings.email_sub_reason_id = driversubReason.id', 'left outer')

			->join('users agent', 'monitorings.agent_id = agent.id')
			->join('users tl', 'monitorings.tl_id = tl.id')
			->join('users monitored', 'monitorings.created_by = monitored.id')

			->join('options emaillanguage', 'monitorings.email_language_id = emaillanguage.id', 'left outer')
			->join('options emailtype', 'monitorings.email_type_id = emailtype.id', 'left outer')
			->join('options satisfactionreason', 'monitorings.customer_satisfaction_reason_id = satisfactionreason.id', 'left outer')
			->join('options monitoringprocess', 'monitorings.monitor_process_type_id = monitoringprocess.id', 'left outer')
			->join('options satisfaction', 'monitorings.customer_satisfaction_id = satisfaction.id', 'left outer')
			->join('options disputetype', 'monitorings.dispute_type_id = disputetype.id', 'left outer')

			->where('monitorings.monitoring_belongs', $belongs_to)
			->where('monitorings.monitoring_for_id', $for_id)
			->where('date(monitorings.created) >=', $from_date)
			->where('date(monitorings.created) <=', $to_date);
		/*}
		else{

			$this->db->select('monitorings.id, monitorings.date, monitorings.ticket_no, monitorings.booking_no, agent.name agent_name, agent.login sip, tl.name as tl_name, monitored.name as monitored_name,	monitorings.customer, country.name as country_name,	city.name as city_name, emaillanguage.name as email_language, emailtype.name email_type,	drivertype.name as category, driverReason.name as reason, disputetype.name dispute_type, monitorings.score, monitorings.bouns, satisfaction.name as satisfy,	monitoringprocess.name as monitoring_process, monitorings.general_comment, monitorings.result,	satisfactionreason.name satisfaction_reason')
			->from('monitorings')
			
			->join('domains city', 'monitorings.city_id = city.id')
			->join('domains country', 'monitorings.country_id = country.id')
			
			->join('monitoring_email_drivers drivertype', 'monitorings.email_driver_id = drivertype.id', 'left outer')
			//->join('monitoring_categories driversubtype', 'monitorings.email_sub_driver_id = driversubtype.id', 'left outer')
			->join('monitoring_email_drivers driverReason', 'monitorings.email_reason_id = driverReason.id', 'left outer')
			//->join('monitoring_categories driversubReason', 'monitorings.email_sub_reason_id = driversubReason.id', 'left outer')

			->join('users agent', 'monitorings.agent_id = agent.id')
			->join('users tl', 'monitorings.tl_id = tl.id')
			->join('users monitored', 'monitorings.created_by = monitored.id')

			->join('options emaillanguage', 'monitorings.email_language_id = emaillanguage.id', 'left outer')
			->join('options emailtype', 'monitorings.email_type_id = emailtype.id', 'left outer')
			->join('options satisfactionreason', 'monitorings.customer_satisfaction_reason_id = satisfactionreason.id', 'left outer')
			->join('options monitoringprocess', 'monitorings.monitor_process_type_id = monitoringprocess.id', 'left outer')
			->join('options satisfaction', 'monitorings.customer_satisfaction_id = satisfaction.id', 'left outer')
			->join('options disputetype', 'monitorings.dispute_type_id = disputetype.id', 'left outer')

			->where('monitorings.monitoring_belongs', $belongs_to)
			->where('monitorings.monitoring_for_id', $for_id)
			->where('date(monitorings.created) >=', $from_date)
			->where('date(monitorings.created) <=', $to_date);

		}*/
		
		/*		if ($id != null) {
					$this->db->where('id', $id);
				}
				$this->db->where('active', 'Y');
			    $this->db->limit(1);
		*/

		$query = $this->db->get();
		$result = $query->result_array();
		//exit();
		/*foreach ($result as $key => $index) {
			//print_r($index);
			$result[$key]['email_language'] = $this->others('emailLanguage', $index['email_language_id']);
			$result[$key]['email_type'] = $this->others('emailType', $index['email_type_id']);
			$result[$key]['email_driver'] = $this->others('emailDriver', $index['email_driver_id']);
			$result[$key]['customer_satisfaction'] = $this->others('satisfaction', $index['customer_satisfaction_id']);
			$result[$key]['monitor_process_type'] = $this->others('satisfactionReason', $index['monitor_process_type_id']);
			$result[$key]['customer_satisfaction_reason'] = $this->others('monitoringProcess', $index['customer_satisfaction_reason_id']);

			unset($result[$key]['email_language_id']);
			unset($result[$key]['email_type_id']);
			unset($result[$key]['email_driver_id']);
			unset($result[$key]['customer_satisfaction_id']);
			unset($result[$key]['monitor_process_type_id']);
			unset($result[$key]['customer_satisfaction_reason_id']);

		}*/
		//echo '<pre>'; print_r($result); exit();
		return $result;
		//return array('monitorings' => $result);
	}
	public function addMonitorings($monitoring) {
		$sess_data = $this->session->userdata;
		$monitoring['created_by'] = $sess_data['data_logged_in']['id'];
		$monitoring['created'] = date("Y-m-d H:i:s");
		$this->db->insert('monitorings', $monitoring);
		return $this->db->insert_id();
	}
	public function updateMonitorings($monitoring, $id) {
		//	print_r($monitoring);
		$sess_data = $this->session->userdata;
		$monitoring['updated_by'] = $sess_data['data_logged_in']['id'];
		$monitoring['updated_date'] = date("Y-m-d H:i:s");
		$monitoring['template'] = base64_decode($monitoring['template']);
		$this->db->where('id', $id);
		$this->db->update('monitorings', $monitoring);
		$report = array();
		//	$report['error'] = $this->db->_error_number();
		//	$report['message'] = $this->db->_error_message();
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
	function deleteProduct($id) {
		$this->db->where('monitoring_id', $id);
		$this->db->delete('monitorings');
	}
}
?>
