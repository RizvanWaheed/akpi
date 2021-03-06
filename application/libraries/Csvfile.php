<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Csvfile  {

    var $fields;            /** columns names retrieved after parsing */ 
    var $separator  =   ';';    /** separator used to explode each line */
    var $enclosure  =   '"';    /** enclosure used to decorate each field */

    var $max_row_size   =   0 ;    /** maximum row size to be used for decoding */
     public function __construct()
    {
      $this->ci =& get_instance();
    }
    function parse_file($p_Filepath) 
    {
        $file           =   fopen($p_Filepath, 'r');
        $this->fields   =   fgetcsv($file, $this->max_row_size, $this->separator, $this->enclosure);
        $keys_values    =   explode(',',$this->fields[0]);

        $content        =   array();
        $keys           =   $this->escape_string($keys_values);

		$i  =   1;
		
        while(($row = fgetcsv($file, $this->max_row_size, $this->separator, $this->enclosure)) != false ) 
        {
            if( $row != null ) { // skip empty lines
                $values         =   explode(',',$row[0]);
                if(count($keys) == count($values)){
                    $arr            =   array();
                    $new_values =   array();
                    $new_values =   $this->escape_string($values);
                    
                    for($j=0;$j<count($keys);$j++){
                        if($keys[$j] !=  ""){
                            $arr[str_replace(' ','_', strtolower($keys[$j]))] =   trim($new_values[$j]);
                        }
                    }
                    $content[$i]    =   $arr;
                    $i++;
                }
            }
        }
        fclose($file);
        return $content;
    }

    function escape_string($data)
    {
        $result =   array();
		$i=0;
		 
        /*if($i==3){
            break;
        }*/
        foreach($data as $row){
            $result[]   =   str_replace('"', '',trim($row));
        }
		$i++;
        return $result;
    }   
}
?>
