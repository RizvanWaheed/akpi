<?php
class Modules_model extends CI_Model {

	/**
	 * Responsable for au to load the database
	 * @return void
	 */
	public function __construct() {
		$this->load->database();
	}
	public function get_my_modules($id, $status=1) {
		//print_r($accesses_id);
		/*$accesses = array();
		foreach ($accesses_id as $key => $index) {
			$accesses[] = $index['module_id'];
		}*/
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$role_id = $sess_data['data_logged_in']['role_id'];
		$project_id = $sess_data['data_logged_in']['project_id'];

		$this->db->select('id, name, link, desc as route, module_id, status, font, 0 as url');
		$this->db->from('modules');
		$this->db->where('status', $status);
		$this->db->where("modules.id in (select module_id from accesses where user_id = ".$user_id ." and status = 1)");
		
		$query = $this->db->get();

		//$this->db->where_in('id', $accesses);
		//return $query->result();
		//$moduleTree = $this->buildTree($query->result_array());

		$this->db->select('(id+55555) as id, name, link, route, 4 as module_id, status, font, 1 as url');
		$this->db->from('webpages');
		$this->db->where('status', $status);
		if($role_id == 317 || $role_id == 314){
			//$role_id != '305' && !empty($project_id)){
			$this->db->where("webpages.project_id in (".$project_id.")");
		}
		$query2 = $this->db->get();
		//print_r($query2->result_array());
		$modules = array(array(
				'id' => "4",
				'name' => 'Projects',
				'link' => 'projects',
				'route'=> 'projects',
				'module_id' => "1",
				'status'=> "1",
				'font' => '',
				'url' => "0"
			// ),
		// 	array(
		// 		'id' => "9",
		// 		'name' => 'Index',
		// 		'link' => 'index',
		// 		'route'=> 'index',
		// 		'module_id' => "4",
		// 		'status'=> "1",
		// 		'font' => '',
		// 		'url' => "0"
			));
		// return array('modules' =>  $query->result_array());
		// return array('modules' =>  array_merge($modules, $query->result_array()));
		return array('modules' =>  array_merge($modules, $query2->result_array(), $query->result_array()));
	}
	public function get_other_modules($id, $status=1) {
		//print_r($accesses_id);
		/*$accesses = array();
		foreach ($accesses_id as $key => $index) {
			$accesses[] = $index['module_id'];
		}*/
		$sess_data = $this->session->userdata;
		$user_id = $sess_data['data_logged_in']['id'];
		$this->db->select('modules.id, modules.name, modules.link, modules.module_id, IFNULL(accessed.status,0) as status, modules.font')
		->from('modules')
		->join('(select * from accesses where status = 1 and user_id = '.$id.') as accessed', 'accessed.module_id = modules.id', 'left');
		$this->db->where('modules.status', $status);
		$this->db->where("modules.id in (select module_id from accesses where user_id = ".$user_id ." and status = 1)");
		//$this->db->where_in('id', $accesses);
		$query = $this->db->get()->result_array();
		//return $query->result();
		//$moduleTree = $this->buildTree($query->result_array());
		return array('modules' => $query);
	}
	public function get_modules($id=null, $status=1) {
		//print_r($accesses_id);
		/*$accesses = array();
		foreach ($accesses_id as $key => $index) {
			$accesses[] = $index['module_id'];
		}*/

		$this->db->select('id, name, link, module_id, status, font');
		$this->db->from('modules');
		$this->db->where('status', $status);
		if($id != null){
			$this->db->where('id', $id);
		}
		//$this->db->where_in('id', $accesses);
		$query = $this->db->get()->result_array();
		//return $query->result();
		//$moduleTree = $this->buildTree($query->result_array());
		return array('modules' => $query);
	}
	public function getMyModules($accesses_id) {
		//print_r($accesses_id);
		$accesses = array();
		foreach ($accesses_id as $key => $index) {
			$accesses[] = $index['module_id'];
		}

		$this->db->select('id,name,link,module_id,font');
		$this->db->from('modules');
		$this->db->where('status', 1);
		$this->db->where_in('id', $accesses);
		$query = $this->db->get();
		//return $query->result();
		$moduleTree = $this->buildTree($query->result_array());
		return array('modules' => $moduleTree);
	}
	public function getMyUserModules($accesses_id, $accesses_user) {
		//print_r($accesses_id);
		$accesses = array();
		$users = array();
		foreach ($accesses_id as $key => $index) {
			$accesses[] = $index['module_id'];
		}
		foreach ($accesses_user as $key => $index) {
			$users[] = $index['module_id'];
		}

		$this->db->select('id,name,link,module_id');
		$this->db->from('modules');
		$this->db->where('status', 1);
		$this->db->where_in('id', $accesses);
		$query = $this->db->get();
		//return $query->result();
		$return = $query->result_array();
		foreach ($return as $key => $index) {
			if (in_array($index['id'], $users)) {
				$return[$key]['isChecked'] = true;
			} else {
				$return[$key]['isChecked'] = false;
			}
			//print_r();

		}
		//print_r($return);
		//exit();
		$moduleTree = $this->buildTree($return);
		return array('modules' => $moduleTree);
	}
	protected function buildTree(array $elements, $parentId = 1) {
		$branch = array();
		foreach ($elements as $element) {
			if ($element['module_id'] == $parentId) {
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
	public function getAccesses($values = null) {
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
