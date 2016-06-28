<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php class download extends \pholder\common\api {




    /** global(s) **/
    private $input_filename  = null;




    /** __ - construct **/
    public function __construct() {
                $this->session = new \pholder\common\c\session();
                $this->input();
        return  true;
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->download();
    }




    /** input - filename **/
    public function input_filename($filename) {
        $this->input_filename = $filename;
    }




    /** get **/
    private function download() {

        // headers - status - code
        http_response_code(200);

        // headers - plaintext
        header('Content-type: text/plain');

        // ? - headers - download
        if( $this->input_filename ){
            header("Content-Disposition: attachment; filename=".$this->input_filename);
        }

        // enumerate - session - path(s)
        foreach( $_SESSION['pholder']['paths'] as $path => $size ){
            print $path."\n";
        }

        // return
        return true;

    }




} $download = new download(); ?>
