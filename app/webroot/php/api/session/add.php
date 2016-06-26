<?php namespace pholder\api\session; ?>
<?php require_once('../../api.php'); ?>
<?php require_once('../common/class/session.php'); ?>
<?php class add extends \pholder\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
                $this->input();
                $this->session = new \pholder\common\c\session();
                $this->session->set_path(
                    $this->input_path
                );
        return  $this->add();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** add **/
    private function add() {
        if($this->session->add()){
            $this->set_response_code(200);
            return true;
        } else {
            $this->set_response_code(400);
            return false;
        }
    }


} $add = new add(); ?>
