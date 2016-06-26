<?php namespace pholder\api\session; ?>
<?php require_once('../common/api.php'); ?>
<?php require_once('../common/class/session.php'); ?>
<?php class remove extends \pholder\common\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
                $this->input();
                $this->session = new \pholder\common\c\session();
                $this->session->set_path($this->input_path);
        return  $this->rm();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** remove **/
    private function rm() {
        $this->set_response_code(200);
        $this->session->rm();
        return true;
    }


} $remove = new remove(); ?>
