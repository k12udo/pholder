<?php namespace pholder\api; ?>
<?php require_once('../api.php'); ?>
<?php class ls extends \pholder\api {


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


} $ls = new ls(); ?>
