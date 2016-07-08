<?php namespace pholder;                        ?>
<?php require_once('common/api.php');           ?>
<?php class root extends \pholder\common\api {




    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->root();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }




    /** root **/
    private function root() {

        // get - root
        $root = $this->get_setting_global_root();

        // ? - root
        if( ! $root) {
            $root = '/';
        }

        // response
        $this->set_response_code(200);
        $this->set_response_data(array(
            'root' => $root
        ));

        // return
        return true;

    }




} $root = new root(); ?>
