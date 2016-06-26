<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php require_once('../common/trait/path.php');     ?>
<?php class add extends \pholder\common\api {




    /** global(s) **/
    private $session = null;

    /** trait(s) **/
    use \pholder\common\t\path;




    /** __ - construct - start **/
    public function __construct() {
                $this->input();
                $this->session = new \pholder\common\c\session();
        return  $this->add();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** add **/
    private function add() {

        // ? - input - path
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }

        // get - size - bytes
        $size_bytes = $this->path_size($this->input_path);
        $size_human = $this->path_size_human($size_bytes);

        // session - set
        $this->session->set_path($this->input_path);
        $this->session->set_size_bytes($size_bytes);
        $this->session->set_size_human($size_human);

        // ? - session - add
        if( $this->session->add() ){

            // return - success
            $this->set_response_code(200);
            return true;

        } else {

            // return - error
            $this->set_response_code(400);
            return false;

        }

    }




} $add = new add(); ?>
