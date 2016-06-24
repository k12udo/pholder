<?php namespace pholder\api; ?>
<?php require_once('../api.php'); ?>
<?php class get extends \pholder\api {


    /** __ - construct **/
    public function __construct() {
                $this->input();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->get();
    }


    /** get **/
    private function get() {
        if( ! is_null($this->input_path) ){
            $this->set_response_code(200);
            $this->download($this->input_path);
            return true;
        } else {
            $this->set_response_code(400);
            $this->display_json_error("invalid path to file");
            return false;
        }
    }


} $get = new get(); ?>
