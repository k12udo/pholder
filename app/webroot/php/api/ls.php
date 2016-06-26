<?php namespace pholder;                        ?>
<?php require_once('common/api.php');           ?>
<?php require_once('common/class/session.php'); ?>
<?php require_once('common/trait/path.php');    ?>
<?php class ls extends \pholder\common\api {




    /** trait(s) **/
    use \pholder\common\t\path;

    /** ignore **/
    private $ignore_files = array('.');




    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->ls();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }




    /** ls **/
    private function ls() {

        // ? - path
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }

        // get - path(s)
        $paths = scandir($this->input_path);

        // prepare - path(s)
        $paths = $this->paths_clean($paths);
        $paths = $this->paths_absolute($this->input_path, $paths);
        $paths = $this->paths_details($paths);
        $paths = $this->set_response_data($paths);

        // return - path(s)
        return $paths;

    }




} $ls = new ls(); ?>
