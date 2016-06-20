<?php require_once('../api.php'); ?>
<?php class get extends \pholder\api {




    /** input **/
    private $input_path = null;




    /** input **/
    private function input() {
                foreach($_POST as $key => $value) {
                    $method = "input_$key";
                    if(method_exists($this, $method)) {
                        $this->$method($value);
                    }
                }
        return  true;
    }

    /** input - path **/
    private function input_path($path) {
                if(file_exists($path)){
                    $this->input_path = $path;
                }
        return  true;
    }


    /** get **/
    private function get() {
        if( ! is_null($this->input_path) ){
            $this->set_response_code(200);
            $this->download($this->input_path);
            return true;
        } else {
            $this->set_response_code(400);
            $this->display_json_error("invalid path to file");
            return false;
        }
    }


    /** magic - start **/
    public function __construct() {
                $this->input();
    }

    /** magic - end **/
    public function __destruct() {
        return  $this->get();
    }


} $get = new get(); ?>
