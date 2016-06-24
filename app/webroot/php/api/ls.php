<?php namespace pholder\api; ?>
<?php require_once('../api.php'); ?>
<?php class ls extends \pholder\api {


    /** ignore **/
    private $ignore_files = array('.');


    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->ls();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** ls **/
    private function ls() {
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }
        $files = scandir($this->input_path);
        $files = $this->utility_absolute_path($this->input_path, $files);
        $files = $this->get_files_details($this->input_path, $files);
        return   $this->set_response_data($files);
    }


    /** utility - absolute - path - files **/
    private function utility_absolute_path($base, $files) {
        $files_absolute = array();
        foreach($files as $file) {
            if( ! in_array($file, $this->ignore_files) ){
                $path = $base."/".$file;
                $files_absolute[] = $path;
            }
        }
        return $files_absolute;
    }


} $ls = new ls(); ?>
