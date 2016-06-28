<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php class ready extends \pholder\common\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
                $this->session = new \pholder\common\c\session();
        return  $this->ready();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** ready **/
    private function ready() {

        // ? - ready
        if( ! empty($_SESSION['pholder']['script']['filename'])     &&
            ! empty($_SESSION['pholder']['script']['interpreter'])  &&
              count($_SESSION['pholder']['script']['path'] > 0)         ){

            // respond - ready
            $this->set_response_code(200);
            return true;

        } else {

            // respond - bad - request
            $this->set_response_code(400);
            return false;

        }

    }




} $ready = new ready(); ?>
