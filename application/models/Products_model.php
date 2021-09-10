<?php
class Products_model extends CI_Model {
 
    public function __construct()
    {
        $this->load->database();
    } 
	public function getAllProducts($id){
		$this->db->select('id,name,tat');
		$this->db->from('products');
		$this->db->where('status', 1);
		if($id != null){
			$this->db->where('id', $id);
		}
		/*$this->db->where('active', 'Y');
	    $this->db->limit(1);*/
	  	$this->db->order_by('name', 'ASC');
		$query = $this->db->get();
		//return $query->result();
		return array('products' => $query->result_array());
	}
	public function addProducts($product){
		$sess_data = $this->session->userdata;
		$product['added_by'] = $sess_data['data_logged_in']['id'];
		$product['added_date'] = date("Y-m-d H:i:s");
		$product['template'] = base64_decode($product['template']);
		$insert = $this->db->insert('products', $product);
	    return $insert;
	}
	public function updateProducts($product, $id){
	//	print_r($product);
		$sess_data = $this->session->userdata;
		$product['updated_by'] = $sess_data['data_logged_in']['id'];
		$product['updated_date'] = date("Y-m-d H:i:s");
		$product['template'] = base64_decode($product['template']);
		$this->db->where('id', $id);
		$this->db->update('products', $product);
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
	function deleteProduct($id){
		$this->db->where('product_id', $id);
		$this->db->delete('products'); 
	}
}
?>	
