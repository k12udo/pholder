<?php namespace pholder; ?>
<?php class api {




    /** global(s) **/
    private $response_data = array();




    /** display - json **/
    public function display_json() {
        header('Content-Type: application/json');
        echo json_encode($this->response_data);
    }




    /** set - response - data **/
    public function set_response_data($data) {
        $this->response_data = $data;
    }





} ?>
