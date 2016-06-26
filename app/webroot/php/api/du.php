<?php namespace pholder;                        ?>
<?php require_once('common/api.php');           ?>
<?php require_once('common/class/session.php'); ?>
<?php require_once('common/trait/path.php');    ?>
<?php class du extends \pholder\common\api {




    /** trait(s) **/
    use \pholder\common\t\path;




    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->du();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }




    /** du **/
    private function du() {

        // ? - input - path
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }

        // get - path - size - bytes
        $size_bytes = $this->path_size($this->input_path);

        // ? - bytes
        if( ! isset($size_bytes) || $size_bytes === false ){
            $this->set_response_code(400);
            return false;
        }

        // get - path - size - huamn
        $size_human = $this->path_size_human($size_bytes);

        // prepare - resposne
        $this->set_response_code(200);
        $this->set_response_data(array(
            'size_bytes' => $size_bytes,
            'size_human' => $size_human
        ));

        // return
        return  true;

    }




} $du = new du(); ?>
