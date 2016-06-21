<?php namespace pholder; ?>
<?php class api {




    /** global(s) **/
    private $response_code = null;
    private $response_data = array();




    /** display - json **/
    public function display_json() {
        http_response_code($this->response_code);
        header('Content-Type: application/json');
        echo json_encode($this->response_data);
    }

    /** display - error **/
    public function display_json_error($msg = null) {
        if( $msg ){
            $this->set_response_data(array('message' => $msg));
        }
        return $this->display_json();
    }


    /** download **/
    public function download($file) {
        if( $this->response_code == 200 ){
            header('Content-Description: File Transfer');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            readfile($file);
        }
        http_response_code($this->response_code);
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
