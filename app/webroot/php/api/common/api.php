<?php namespace pholder\common; ?>
<?php class api {




    /** global(s) **/
    private $response_code = null;
    private $response_data = array();

    /** config **/
    private $config = __DIR__."/../../../../config";

    /** input **/
    public $input_path = null;




    /** display - json **/
    public function display_json() {
        http_response_code($this->response_code);
        header('Content-Type: application/json');
        echo json_encode($this->response_data);
    }

    /** display - error **/
    public function display_json_error($message = null) {
        if( $message ){
            $this->set_response_data(array('message' => $msg));
        }
        return $this->display_json();
    }




    /** get - setting - global - root **/
    public function get_setting_global_root() {
        if(file_exists($this->config.'/global.root') ){
            if($root = trim(file_get_contents($this->config.'/global.root'))) {
                if(is_dir($root)) {
                    return $root;
                }
            }
        }
        return false;
    }




    /** input **/
    public function input() {
        foreach($_GET as $key => $value) {
            $method = "input_$key";
            if(method_exists($this, $method)) {
                $this->$method($value);
            }
        }
        foreach($_POST as $key => $value) {
            $method = "input_$key";
            if(method_exists($this, $method)) {
                $this->$method($value);
            }
        }
        return  true;
    }

    /** input - path **/
    public function input_path($path) {
        if($root = $this->get_setting_global_root()){
            if(strpos($path, $root) !== 0){
                return false;
            }
        }
        if(is_dir($path) || is_file($path)){
            $this->input_path = $path;
        }
        return  true;
    }




    /** set - response - code **/
    public function set_response_code($code) {
        $this->response_code = $code;
    }

    /** set - response - data **/
    public function set_response_data($data) {
        $this->response_data = $data;
    }




}?>
