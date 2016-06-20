<?php require_once('../api.php'); ?>
<?php class ls extends \pholder\api {




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
        if(is_dir($path)){
            $this->input_path = $path;
        }
        return  true;
    }




    /** ls **/
    private function ls() {
        if( ! is_null($this->input_path) ){
            return $this->set_response_data(scandir($this->input_path));
        } else {
            $this->set_response_code(400);
            return false;
        }
    }




    /** magic - start **/
    public function __construct() {
                $this->input();
        return  $this->ls();
    }

    /** magic - end **/
    public function __destruct() {
        return  $this->display_json();
    }




} $ls = new ls(); ?>
