<?php namespace pholder\api; ?>
<?php require_once('../api.php'); ?>
<?php class find extends \pholder\api {


    /** ignore **/
    private $ignore_files = array('.', '..');

    /** limit **/
    private $limit_result = 250;


    /** __ - construct **/
    public function __construct() {
                $this->input();
        return  $this->find();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** input - term **/
    public function input_term($term) {
        return  $this->input_term = $term;
    }


    /** find **/
    private function find() {
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }
        if( is_null($this->input_term) ){
            $this->set_response_code(400);
            return false;
        }
        $files = $this->utility_find_files($this->input_path, $this->input_term);
        $files = $this->get_files_details($this->input_path, $files);
                 $this->set_response_code(200);
        return   $this->set_response_data($files);
    }


    /** utility - find - files **/
    private function utility_find_files($path, $term) {
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($path),
            RecursiveIteratorIterator::SELF_FIRST
        );
        $matches = array();
        foreach( $files as $path => $file ){
            $name = basename($path);
            if( strpos(strtolower($name), strtolower($term)) !== false ){
                if( ! in_array($name, $this->ignore_files)) {
                    $matches[] = $path;
                }
            }
            if(count($matches) == $this->limit_result){
                break;
            }
        }
        return $matches;
    }


} $find = new find(); ?>
