<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php class set extends \pholder\common\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
            $this->session = new \pholder\common\c\session();
        if( $this->set() ){
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


    /** set **/
    private function set() {
        if( isset($_POST['filename'])    ){ return $this->set_filename($_POST['filename']);         }
        if( isset($_POST['footer'])      ){ return $this->set_footer();                             }
        if( isset($_POST['header'])      ){ return $this->set_header();                             }
        if( isset($_POST['interpreter']) ){ return $this->set_interpreter($_POST['interpreter']);   }
        if( isset($_POST['path_prefix']) ){ return $this->set_path_prefix($_POST['path_prefix']);   }
        if( isset($_POST['path_suffix']) ){ return $this->set_path_suffix($_POST['path_suffix']);   }
                                            return false;
    }

    /** set - filename **/
    private function set_filename($filename) {
        $_SESSION['pholder']['script']['filename'] = $filename;
        return true;
    }

    /** set - footer **/
    private function set_footer() {
        print_r($_GET);
        print_r($_POST);
    }

    /** set - header **/
    private function set_header() {
        print_r($_GET);
        print_r($_POST);
    }

    /** set - path - prefix **/
    private function set_path_prefix($prefix) {
        $_SESSION['pholder']['script']['path']['prefix'] = $prefix;
        return true;
    }

    /** set - path - suffix **/
    private function set_path_suffix($prefix) {
        $_SESSION['pholder']['script']['path']['suffix'] = $suffix;
        return true;
    }




} $set = new set(); ?>
