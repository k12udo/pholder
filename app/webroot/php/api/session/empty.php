<?php namespace pholder\api\session; ?>
<?php require_once('../../api.php'); ?>
<?php require_once('../../common/session.php'); ?>
<?php class get extends \pholder\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
                $this->input();
                $this->session = new \pholder\common\session();
                $this->session->set_path($this->input_path);
        return  $this->is_empty();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** get **/
    private function is_empty() {
                $this->set_response_code(200);
                $this->set_response_data(array(
                    "empty" => $this->session->is_empty()
                ));
        return  true;
    }


} $get = new get(); ?>
