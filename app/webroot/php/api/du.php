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
                if( is_null($this->input_path) ){
                    $this->set_response_code(400);
                    return false;
                }
                if( is_dir($this->input_path) ){
                    $bytes = $this->utility_directory_size($this->input_path);
                }
                if( is_file($this->input_path) ){
                    $bytes = $this->utility_file_size($this->input_path);
                }
                if( is_dir($this->input_path) ){
                    $bytes = $this->utility_directory_size($this->input_path);
                }
                if( is_file($this->input_path) ){
                    $bytes = $this->utility_file_size($this->input_path);
                }
                if( ! isset($bytes) || $bytes === false ){
                    $this->set_response_code(400);
                    return false;
                }
                $data = array(
                    'size' => $this->utility_human_readable($bytes)
                );
                $this->set_response_code(200);
                $this->set_response_data($data);
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




    /** utility - calculate - file - size **/
    private function utility_directory_size($path) {
        if( ! is_dir($path) ){
            return false;
        }
        try {
            $bytestotal = 0;
            $path = realpath($path);
            if($path!==false){
                foreach(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS)) as $object){
                    $bytestotal += $object->getSize();
                }
            }
            return $bytestotal;
        } catch( Exception $e ){
            return false;
        }
    }

    /** utility - calculate - file - size **/
    private function utility_file_size($path) {
        if( ! is_file($path) ){
            return false;
        }
        return filesize($path);
    }


    /** utility - human - readable **/
    private function utility_human_readable($size, $unit = "") {
        if( (!$unit && $size >= 1<<30) || $unit == "GB")
            return number_format($size/(1<<30),2)."GB";
        if( (!$unit && $size >= 1<<20) || $unit == "MB")
            return number_format($size/(1<<20),2)."MB";
        if( (!$unit && $size >= 1<<10) || $unit == "KB")
            return number_format($size/(1<<10),2)."KB";
        return number_format($size)." bytes";
    }




} $ls = new ls(); ?>
