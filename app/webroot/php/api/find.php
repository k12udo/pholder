<?php namespace pholder\api;                    ?>
<?php require_once('common/api.php');           ?>
<?php require_once('common/class/session.php'); ?>
<?php require_once('common/trait/path.php');    ?>
<?php class find extends \pholder\common\api {




    /** global(s) **/
    private $ignore_files = array('.', '..');
    private $limit_result = 250;

    /** trait(s) **/
    use \pholder\common\t\path;




    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->find();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }




    /** input - term **/
    public function input_term($term) {
        return  $this->input_term = $term;
    }




    /** find **/
    private function find() {

        // ? - null - path
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }

        // ? - null - term
        if( is_null($this->input_term) ){
            $this->set_response_code(400);
            return false;
        }

        // find + prepare - paths
        $paths = $this->path_find($this->input_path, $this->input_term);
        $paths = $this->paths_details($paths);

        // ? - no - results
        if( count($paths) == 0 ){
            $this->set_response_code(404);
            return false;
        }

        // set - response
        $this->set_response_code(200);
        $this->set_response_data($paths);

        // return
        return true;

    }




} $find = new find(); ?>
