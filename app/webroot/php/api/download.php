<?php namespace pholder; ?>
<?php require_once('common/api.php'); ?>
<?php class get extends \pholder\common\api {




    /** __ - construct **/
    public function __construct() {
        return  $this->input();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->get();
    }




    /** get **/
    private function get() {

        // ? - null
        if(is_null($this->input_path) ){
            $this->set_response_code(400);
            $this->display_json_error("invalid path to file");
            return false;
        }

        // get - path - download
        $this->set_response_code(200);
        $this->download($this->input_path);
        return true;

    }




} $get = new get(); ?>
