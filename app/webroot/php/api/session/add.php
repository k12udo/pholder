<?php namespace pholder\api\session; ?>
<?php require_once('../../api.php'); ?>
<?php require_once('../../common/session.php'); ?>
<?php class add extends \pholder\api {




    /** global(s) **/
    private $session = null;




    /** __ - construct - start **/
    public function __construct() {
                $this->session = new \pholder\common\session();
                $this->input();
        return  $this->add();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** add **/
    private function add() {

            // path
            $path = $this->input_path;

            // ? - input - path
            if($path == null) {
                $this->set_response_code(400);
                return false;
            }

            // calculate - sizes
            $size_bytes = $this->utility_path_size($path);
        if( $size_bytes ){
            $size_human = $this->utility_human_readable($size_bytes);
        } else {
            $size_human = false;
        }

        // set - session - data
        $this->session->set_path($path);
        $this->session->set_size_bytes($size_bytes);
        $this->session->set_size_human($size_human);

        // ? - session - add - data
        if($this->session->add()){
            $this->set_response_code(200);
            return true;
        } else {
            $this->set_response_code(400);
            return false;
        }

    }


    /** session - add **/
    public function session_add($path) {

        // ? - already - added
        if(isset($_SESSION['pholder']['paths'][$path])){
            return true;
        }

        // add - session - path
        $_SESSION['pholder']['paths'][$path] = array(
            'size_bytes' => $size_bytes,
            'size_human' => $size_human
        );

        // add - session - total - size
        $_SESSION['pholder']['total_size'] += $size_bytes;

        // return
        return true;
    }


} $add = new add(); ?>
