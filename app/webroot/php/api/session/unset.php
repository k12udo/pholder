<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php class unsett extends \pholder\common\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
            $this->session = new \pholder\common\c\session();
        if( $this->unsett() ){
            $this->set_response_code(200);
        } else {
            $this->set_response_code(400);
        }
        return true;
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** unset **/
    private function unsett() {
        if( isset($_GET['filename'])    ){ return $this->unset_filename();    }
        if( isset($_GET['footer'])      ){ return $this->unset_footer();      }
        if( isset($_GET['header'])      ){ return $this->unset_header();      }
        if( isset($_GET['interpreter']) ){ return $this->unset_interpreter(); }
        if( isset($_GET['path_prefix']) ){ return $this->unset_path_prefix(); }
        if( isset($_GET['path_suffix']) ){ return $this->unset_path_suffix(); }
                                           return false;
    }

    /** unset - filename **/
    private function unset_filename() {
        $_SESSION['pholder']['script']['filename'] = "";
        return true;
    }

    /** unset - footer **/
    private function unset_footer() {
        $_SESSION['pholder']['script']['footer'] = array();
        return true;
    }

    /** unset - header **/
    private function unset_header() {
        $_SESSION['pholder']['script']['header'] = array();
        return true;
    }

    /** unset - interpreter  **/
    private function unset_interpreter() {
        $_SESSION['pholder']['script']['interpreter'] = "";
        return true;
    }

    /** unset - path - prefix **/
    private function unset_path_prefix() {
        $_SESSION['pholder']['script']['path']['prefix'] = "";
        return true;
    }

    /** unset - path - suffix **/
    private function unset_path_suffix() {
        $_SESSION['pholder']['script']['path']['suffix'] = "";
        return true;
    }




} $unsett = new unsett(); ?>
