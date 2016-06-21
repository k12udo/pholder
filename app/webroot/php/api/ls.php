<?php require_once('../api.php'); ?>
<?php class ls extends \pholder\api {




    /** input **/
    private $input_path = null;

    /** ignore **/
    private $ignore_files = array('.');




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
        if( is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }
        $files = scandir($this->input_path);
        $files = $this->utility_absolute_path($this->input_path, $files);
        $files = $this->get_files_details($this->input_path, $files);
        return   $this->set_response_data($files);
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


    /** utility - absolute - path - files **/
    private function utility_absolute_path($base, $files) {
        $files_absolute = array();
        foreach($files as $file) {
            if( ! in_array($file, $this->ignore_files) ){
                $path = $base."/".$file;
                $files_absolute[] = $path;
            }
        }
        return $files_absolute;
    }


} $ls = new ls(); ?>
