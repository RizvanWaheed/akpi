<?php
class Accesses_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function __destruct()
    {
		$this->db->close();
		if (class_exists('CI_DB') AND isset($CI->db))
		{
			$CI->db->close();
		}
	}	
	public function set_accesses($data) {

		$sess_data = $this->session->userdata;
		$role_id = $sess_data['data_logged_in']['role_id'];
		$company_id = $sess_data['data_logged_in']['company_id'];

		$this->db->select('id,status');
		$this->db->from('accesses');
		$this->db->where('user_id', $data['user_id']);
		$this->db->where('module_id', $data['module_id']);

		$query = $this->db->get();
		$q1 = $query->row_array();
		//print_r($q1);
		if (empty($q1)) {
			$data['created_by'] = $sess_data['data_logged_in']['id'];
			$data['created'] = date("Y-m-d H:i:s");
			//$data['module_id'] = $module_id;
			//$data['user_id'] = $user_id;

			$insert = $this->db->insert('accesses', $data);
			//add new row
		} else {
			$data['updated_by'] = $sess_data['data_logged_in']['id'];
			$data['updated'] = date("Y-m-d H:i:s");
			//$data['status'] = ($q1['status'] == 1) ? 0 : 1;

			$this->db->where('id', $q1['id']);
			$insert = $this->db->update('accesses', $data);
			//add update row
		}
		return $insert;
		//	print_r($query->result_array());
		//	exit();

	}
	public function get_accesses($id, $for=null, $status=1){
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		/*
		$wing_id = $sess_data['data_logged_in']['wing_id'];
		accessed.module_id as mod2,
		*///(case when accessed.module_id then 1 else 0 end) as status
		$this->db->select('id, user_id, module_id, IFNULL(status,0) as status, level' )
		->from('accesses');
		if($for == 'me'){
			$this->db->where('accesses.user_id', $user_id);
		}
		if($status == 1){
			$this->db->where('accesses.status', $status);
		}
		
		$this->db->order_by('accesses.id', 'asc');
		$query = $this->db->get();
		$result = $query->result_array();
		return array('accesses' => $result);
	}
	public function getMyUserAccesses($user) {

		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		/*
		$wing_id = $sess_data['data_logged_in']['wing_id'];
		accessed.module_id as mod2,
		*///(case when accessed.module_id then 1 else 0 end) as status
		$this->db->select('modules.id, modules.name, modules.link, IFNULL(accessed.status,0) as status' )
		->from('accesses')
		->join('modules', 'modules.id = accesses.module_id and modules.status = 1')
		->join('(select * from accesses where status = 1 and user_id = '.$user.') as accessed', 'accessed.module_id = accesses.module_id', 'left')
		->where('accesses.status', 1)->where('accesses.user_id', $user_id)
		->order_by('modules.id', 'asc');
		$query = $this->db->get();
		return $query->result_array();
		//print_r($query->result_array());exit();
		//$moduleTree = $this->buildTree($query->result_array());
		//return array('modules' => $moduleTree);

	}
	public function getMyAccesses() {

		/*$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$company_id = $sess_data['data_logged_in']['company_id'];

		$this->db->select('module_id');
		$this->db->from('accesses');
		$this->db->where('status', 1);
		//$this->db->where('company_id', $company_id);
		$this->db->where('user_id', $user_id);
		$query = $this->db->get();
		return $query->result_array();*/
		
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		/*$wing_id = $sess_data['data_logged_in']['wing_id'];*/

		$this->db->select('modules.id, modules.name, modules.link, modules.module_id')
		->from('accesses')
		->join('modules', 'modules.id = accesses.module_id and modules.status = 1')
		->where('accesses.status', 1)->where('accesses.user_id', $user_id);
		$query = $this->db->get();
		return $query->result_array();
	}
	public function getUserAccesses($user_id) {
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		/*
		$wing_id = $sess_data['data_logged_in']['wing_id'];
		accessed.module_id as mod2,
		*///(case when accessed.module_id then 1 else 0 end) as status
		$this->db->select('modules.id, modules.name, modules.link, IFNULL(accessed.status,0) as status' )
		->from('accesses')
		->join('modules', 'modules.id = accesses.module_id and modules.status = 1')
		->join('(select * from accesses where status = 1 and user_id = '.$user.') as accessed', 'accessed.module_id = accesses.module_id', 'left')
		->where('accesses.status', 1)->where('accesses.user_id', $user_id)
		->order_by('modules.id', 'asc');
		$query = $this->db->get();
		return $query->result_array();
		/*$sess_data = $this->session->userdata;

		$role_id = $sess_data['data_logged_in']['role_id'];
		$company_id = $sess_data['data_logged_in']['company_id'];
//print_r()
		$this->db->select('module_id');
		$this->db->from('accesses');
		$this->db->where('status', 1);
		if ($role_id != 1) {
		//	$this->db->where('company_id', $company_id);
		}
		$this->db->where('user_id', $user_id);
		$query = $this->db->get();
		return $query->result_array();*/
		//print_r($query->result_array());

	}
	public function setUserAccesses($user_id, $module_id) {

		$sess_data = $this->session->userdata;

		$role_id = $sess_data['data_logged_in']['role_id'];
		$company_id = $sess_data['data_logged_in']['sub_campaign_id'];

		$this->db->select('id,status');
		$this->db->from('accesses');
		// if ($role_id != 1) {
		// 	$this->db->where('company_id', $company_id);
		// }
		$this->db->where('user_id', $user_id);
		$this->db->where('module_id', $module_id);

		$query = $this->db->get();
		$q1 = $query->row_array();
		//print_r($q1);
		if (empty($q1)) {
			$data['created_by'] = $sess_data['data_logged_in']['id'];
			$data['created'] = date("Y-m-d H:i:s");
			$data['module_id'] = $module_id;
			$data['user_id'] = $user_id;

			$insert = $this->db->insert('accesses', $data);

			//add new row
		} else {
			$data['updated_by'] = $sess_data['data_logged_in']['id'];
			$data['updated'] = date("Y-m-d H:i:s");
			$data['status'] = ($q1['status'] == 1) ? 0 : 1;

			$this->db->where('id', $q1['id']);
			$insert = $this->db->update('accesses', $data);
			//add update row
		}
		return $insert;
		//	print_r($query->result_array());
		//	exit();

	}
	protected function buildTree(array $elements, $parentId = 1) {
		$branch = array();
		foreach ($elements as $element) {
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
	protected function buildTree1(array $elements, $parentId = 1) {
		// $branch = array();
		$branch = '<ul>';
		foreach ($elements as $element) {
			$branch .= '<ul>';
			if ($element['parent_id'] == $parentId) {
				$children = $this->buildTree1($elements, $element['id']);
				if ($children) {
					$branch .= '<li>' . $children['name'] . '</li>';
				}
				$branch .= '<li>' . $element['name'] . '</li>';
			}
			$branch .= '</ul>';
		}

		return $branch .= '</ul>';
	}
	protected function buildTreeHtml(array $elements) {
		//    $branch = array();
		$branch = '';
		$branch .= '<ul>';
		foreach ($elements as $key => $element) {
			$fb = array_key_exists("children", $element);
			//	print_r($key);
			//	print_r($element);
			$icon = ($fb) ? ' glyphicon-folder-open ' : ' glyphicon-file ';
			$branch .= '<li class="parent_li"><span {{action "setValues"  ' . $element['id'] . ' target="view" }}><span class="glyphicon ' . $icon . '"></span><a href="javascript:;" name="' . $element['id'] . '">' . $element['name'] . '</a></span>';
			if (array_key_exists("children", $element)) {
				$branch .= $this->buildTreeHtml($element['children']);
			}
			$branch .= '</li>';
			// exit();
		}

		$branch .= '</ul>';
		return $branch;
		// print_r($branch); exit();
	}
	public function getAccesses2($values = null) {
		$this->db->select('id,name,is_leaf,parent_id,status');
		$this->db->from('titles');
		$this->db->where('status', '1');
		$this->db->where('id >', '1');
		$this->db->order_by('parent_id', 'asc');
		$query = $this->db->get();

		$result = $query->result_array();
		//	print_r($result); exit();
		$tree = $this->buildTree($result);
		$htree = $this->buildTreeHtml($tree); //exit();
		return trim($htree);

	}

	public function setTitle($action, $id, $name = null) {
		//print_r($data); exit();
		//$data['password'] = $this->__encrip_password($data['password']);
		//$data['user_name'] = str_replace(' ','',$data['name']);
		$sess_data = $this->session->userdata;
		//print_r($sess_data['data_logged_in']['id']); exit();

		if ($action == 'add') {
			$data['parent_id'] = $id;
			$data['name'] = $name;
			$data['added_by'] = $sess_data['data_logged_in']['id'];
			$data['added_date'] = date("Y-m-d H:i:s");
			$data['status'] = 1;
			$insert = $this->db->insert('titles', $data);
			if ($insert) {
				$return = $this->db->insert_id();
			}
		} else if ($action == 'edit') {
			//$data['id'] 		  = $id;
			$data['name'] = $name;
			$data['updated_by'] = $sess_data['data_logged_in']['id'];
			$data['updated_date'] = date("Y-m-d H:i:s");

			$this->db->where('id', $id);
			$return = $this->db->update('titles', $data);

		} else if ($action == 'delete') {
			$data['deleted_by'] = $sess_data['data_logged_in']['id'];
			$data['deleted_date'] = date("Y-m-d H:i:s");
			$data['status'] = 0;

			$this->db->where('id', $id);
			$return = $this->db->update('titles', $data);
		}

		return $return;
	}
	public function buildSelectHtml(array $elements, $margin = 15) {
		//    $branch = array();
		$branch = '';
		foreach ($elements as $key => $element) {

			if (array_key_exists("children", $element)) {
				//style="padding-left:'.$margin-=10.'px"
				$branch .= '<optgroup  label="' . $element['name'] . '">';
				$branch .= $this->buildSelectHtml($element['children'], $margin += 15);
				$branch .= '<optgroup>';
			} else {
				//style="padding-left:'.$margin.'px"
				$branch .= '<option  value=' . $element['id'] . '>' . $element['name'] . '</option>';
			}
		}

		return $branch;
		// print_r($branch); exit();
	}
	public function sortSelectTree(array $elems) {
		$a1 = array();
		$a2 = array();
		foreach ($elems as $index) {

			if (array_key_exists("children", $index)) {
				$a1[] = $this->sortSelectTree($index['children']);
			} else {
				$a2[] = $index;
			}
		}
		$a = array_merge($a1, $a2);
		return $a;
	}
	public function getSelectTitles($values = null) {
		$this->db->select('id,name,is_leaf,parent_id,status');
		$this->db->from('titles');
		$this->db->where('status', '1');
		$this->db->where('id >', '1');
		$this->db->order_by('parent_id', 'asc');
		$query = $this->db->get();

		$result = $query->result_array();
		//	print_r($result); exit();
		$tree = $this->buildTree($result);
		//	$htree = $this->sortSelectTree($tree); //exit();
		//print_r($htree); exit();
		$ftree = $this->buildSelectHtml($tree);
		return trim($ftree);
		//	print_r( $htree );
		//	print_r( $tree );
		//	exit();

	}
	public function buildSearchSelectHtml(array $elements, $margin = 15) {
		//    $branch = array();
		$branch = '';
		foreach ($elements as $key => $element) {

			if (array_key_exists("children", $element)) {
				//style="padding-left:'.$margin-=10.'px"
				$branch .= '<option class="optionGroup"  value=' . $element['id'] . '>' . $element['name'] . '</option>';
				$branch .= $this->buildSearchSelectHtml($element['children'], $margin += 15);
				//$branch.='<optgroup>';
			} else {
				//style="padding-left:'.$margin.'px"
				$branch .= '<option class="optionChild" value=' . $element['id'] . '>' . $element['name'] . '</option>';
			}
		}

		return $branch;
		// print_r($branch); exit();
	}
	public function sortSearchSelectTree(array $elems) {
		$a1 = array();
		$a2 = array();
		foreach ($elems as $index) {

			if (array_key_exists("children", $index)) {
				$a1[] = $this->sortSelectTree($index['children']);
			} else {
				$a2[] = $index;
			}
		}
		$a = array_merge($a1, $a2);
		return $a;
	}
	public function getSearchSelectTitles($values = null) {
		$this->db->select('id,name,is_leaf,parent_id,status');
		$this->db->from('titles');
		$this->db->where('status', '1');
		$this->db->where('id >', '1');
		$this->db->order_by('parent_id', 'asc');
		$query = $this->db->get();

		$result = $query->result_array();
		//	print_r($result); exit();
		$tree = $this->buildTree($result);
		//	$htree = $this->sortSelectTree($tree); //exit();
		//print_r($htree); exit();
		$ftree = $this->buildSearchSelectHtml($tree);
		return trim($ftree);
		//	print_r( $htree );
		//	print_r( $tree );
		//	exit();

	}
	public function getTitle($id) {

		$this->db->select('name');
		$this->db->from('titles');
		$this->db->where('status', 1);
		$this->db->where('id', $id);

		$query = $this->db->get();
		$result = $query->result_array();
		if (empty($result)) {
			return $result;
		} else {
			return $result[0]['name'];
		}
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
}
?>
