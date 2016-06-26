<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php require_once('../common/trait/path.php');     ?>
<?php class size extends \pholder\common\api {




    /** global(s) **/
    private $session = null;

    /** trait(s) **/
    use \pholder\common\t\path;




    /** __ - construct - start **/
    public function __construct() {
                $this->session = new \pholder\common\c\session();
        return  $this->get();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** get **/
    private function get() {

        // get - session - size
        $sizes          = $this->session->get_size();
        $sizes['human'] = $this->path_size_human($sizes['bytes']);

        // set - response
        $this->set_response_code(200);
        $this->set_response_data($sizes);

        // return
        return true;

    }




} $size = new size(); ?>
