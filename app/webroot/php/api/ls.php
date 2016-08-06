<?php namespace pholder;                        ?>
<?php require_once('common/api.php');           ?>
<?php require_once('common/class/session.php'); ?>
<?php require_once('common/trait/path.php');    ?>
<?php class ls extends \pholder\common\api {




    /** trait(s) **/
    use \pholder\common\t\path;

    /** global(s) **/
    private $ignore_files = array('.');

    /** global(s) - input **/
    public $input_limit  = null;
    public $input_offset = null;
    public $input_path   = null;




    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->ls();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }




    /** input - limit **/
    public function input_limit($input_limit) {
        if( is_numeric($input_limit) ){
            $this->input_limit = $input_limit;
            return true;
        } else {
            return false;
        }
    }

    /** input - offset **/
    public function input_offset($input_offset) {
        if( is_numeric($input_offset) ){
            $this->input_offset = $input_offset;
            return true;
        } else {
            return false;
        }
    }




    /** ls **/
    private function ls() {

                // ? - path
                if( is_null($this->input_path) ){
                    $this->set_response_code(400);
                    return false;
                }

                // prepare - path(s) - light
                $paths = scandir($this->input_path);
                $paths = $this->paths_clean($paths);
        natsort($paths);

        // prepare - path(s) - offset
        if( $this->input_offset ){
            $paths = array_slice($paths, $this->input_offset);
        }

        // prepare - path(s) - limit
        if( $this->input_limit ){
            $paths = array_slice($paths, 0, $this->input_limit);
        }

        // prepare - path(s) - heavy
        $paths = $this->paths_absolute($this->input_path, $paths);
        $paths = $this->paths_details($paths);
        $paths = $this->set_response_data($paths);

        // return - path(s)
        return $paths;

    }




} $ls = new ls(); ?>
