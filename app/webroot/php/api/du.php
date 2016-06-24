<?php namespace pholder\api; ?>
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
                if(is_file($path) || is_dir($path)){
                    $this->input_path = $path;
                }
        return  true;
    }




    /** du **/
    private function du() {

        // ? - input - path
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }

        // get - bytes
        $bytes = $this->utility_path_size($this->input_path);

        // ? - bytes
        if( ! isset($bytes) || $bytes === false ){
            $this->set_response_code(400);
            return false;
        }

        // prepare - data
        $data = array(
            'size' => $this->utility_human_readable($bytes)
        );

        // prepare - resposne
        $this->set_response_code(200);
        $this->set_response_data($data);

        // return
        return  true;

    }




    /** magic - start **/
    public function __construct() {
                $this->input();
        return  $this->du();
    }

    /** magic - end **/
    public function __destruct() {
        return  $this->display_json();
    }




} $ls = new ls(); ?>
