<?php
class access
{    
    function __construct(){
         $obj=& get_instance();
    }
    function index(){
        $obj=& get_instance(); 
        $segment1 = $obj->uri->segment(1);
		$segment2 = $obj->uri->segment(2);
		$segment3 = $obj->uri->segment(3);
		//print_r($segment3); exit();
       // print_r($segment1);
       // print_r($segment2); 
       // print_r($obj->session->userdata('is_logged_in')); 
       // exit('hahahahaha');
	   // print_r($obj->session->userdata('is_logged_in'));
	   //$CI =& get_instance();
 	   //if($CI ->router->class=="AdminData"){//write your code}
		
		if($obj->session->userdata('is_logged_in') !=true && ($segment1=='Abacus' || $segment2=='validate_credentials')){
             return true;
        }else if($obj->session->userdata('is_logged_in') !=true && ($segment1=='Abacus' || $segment2=='reset_credentials')){
             return true;
        }else if($obj->session->userdata('is_logged_in') == true && $segment1=='Abacus' && $segment2=='login' && $segment3 ==''){
			redirect( base_url('Abacus/bpo'),'refresh');
		}else if($obj->session->userdata('is_logged_in') == true ){
            return true;
        }else{ redirect( base_url('Abacus/login'),'refresh');
        }
        
    }
}
?>
