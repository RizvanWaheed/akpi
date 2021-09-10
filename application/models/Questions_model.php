<?php
class Questions_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    }
    protected function buildTree(array $elements, $parentId = 1) {
		$branch = array();
		//print_r($elements);
		foreach ($elements as $element) {
			$element['href'] =  '#'.str_replace(' ', '_', strtolower($element['name']));
			$element['hrefid'] =  str_replace(' ', '_', strtolower($element['name']));
			$element['score'] = ($element['fatal']==1)?'0':$element['value'];
			$element['state'] = $element['status'];
			$element['comment'] = ''; 
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
    public function getQuestionsTree($id, $status, $monitoring_for_id, $monitoring_belongs){
		$this->db->select('*');
		$this->db->from('questions');
		$this->db->where('status', 1);
		if($id != null && $id > 0){
			$this->db->where('id', $id);
		}
		if($monitoring_for_id != null && $monitoring_for_id > 0){
			$this->db->where('monitoring_for_id', $monitoring_for_id);
		}
		if($monitoring_belongs != null && $monitoring_belongs > 0){
			$this->db->where('belongs_to', $monitoring_belongs);
		}
		$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		$result = $query->result_array();
		//print_r($result);
		return $this->buildTree($result,0);
		//return $query->result();
		//return array('questions' => $tree);
	} 
	public function getAllQuestions($id, $category){
		$this->db->select('id, name, category');
		$this->db->from('questions');
		$this->db->where('status', 1);
		if($id != null && $id > 0){
			$this->db->where('id', $id);
		}
		if($category != null && $category > 0){
			$this->db->where('category', $category);
		}
		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	  	$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		//return $query->result();
		return array('questions' => $query->result_array());
	}
	public function addQuestions($question){
		$sess_data = $this->session->userdata;
		$question['added_by'] = $sess_data['data_logged_in']['id'];
		$question['added_date'] = date("Y-m-d H:i:s");
		$question['template'] = base64_decode($question['template']);
		$insert = $this->db->insert('questions', $question);
	    return $insert;
	}
	public function updateQuestions($question, $id){
	//	print_r($question);
		$sess_data = $this->session->userdata;
		$question['updated_by'] = $sess_data['data_logged_in']['id'];
		$question['updated_date'] = date("Y-m-d H:i:s");
		$question['template'] = base64_decode($question['template']);
		$this->db->where('id', $id);
		$this->db->update('questions', $question);
		$report = array();
	//	$report['error'] = $this->db->_error_number();
	//	$report['message'] = $this->db->_error_message();
		if($report !== 0){
			return true;
		}else{
			return false;
		}
	}

    /**
    * Delete user
    * @param int $id - user id
    * @return boolean
    */
	function deleteQuestion($id){
		$this->db->where('question_id', $id);
		$this->db->delete('questions'); 
	}
}
?>	
