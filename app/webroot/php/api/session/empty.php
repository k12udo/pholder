<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php class empt extends \pholder\common\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
                $this->session = new \pholder\common\c\session();
        return  $this->empt();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** empt **/
    private function empt() {
        $_SESSION['pholder']['paths']           =   array();
        $_SESSION['pholder']['size']['bytes']   =   0;
        $_SESSION['pholder']['size']['human']   =   null;
        $this->set_response_code(200);
        return true;
    }




} $empt = new empt(); ?>
