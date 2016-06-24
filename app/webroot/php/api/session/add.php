<?php require_once('../../api.php'); ?>
<?php class add extends \pholder\api {




    /** input **/
    private $input_path = null;




    /** input **/
    private function input() {

        // set - input(s)
        foreach($_POST as $key => $value) {
            $method = "input_$key";
            if(method_exists($this, $method)) {
                $this->$method($value);
            }
        }

        // return
        return  true;

    }

    /** input - path **/
    private function input_path($path) {

        // ? - dir
        if(is_dir($path)){
            $this->input_path = $path;
        }

        // return
        return  true;

    }


    /** add **/
    private function add() {

        // ? - input - path
        if($this->input_path == null) {
            $this->set_response_code(400);
            return false;
        }

        // ? - add - data - session
        if($this->add_session($this->input_path)){
            $this->set_response_code(200);
            return true;
        } else {
            $this->set_response_code(400);
            return false;
        }

    }


    /** add - session **/
    private function add_session($path) {

        // ? - already - added
        if(isset($_SESSION['pholder']['script']['paths'][$path])){
            return true;
        }

            // calculate - sizes
            $size_bytes = $this->utility_path_size($path);
        if( $size_bytes ){
            $size_human = $this->utility_human_readable($size_bytes);
        } else {
            $size_human = false;
        }

        // add - session - path
        $_SESSION['pholder']['script']['paths'][$path] = array(
            'size_bytes' => $size_bytes,
            'size_human' => $size_human
        );

        // add - session - total - size
        $_SESSION['pholder']['script']['total_size'] += $size_bytes;

        // return
        return true;
    }


    /** magic - start **/
    public function __construct() {
                $this->input();
                $this->session_init();
        return  $this->add();
    }

    /** magic - end **/
    public function __destruct() {
        return  $this->display_json();
    }


} $add = new add(); ?>
