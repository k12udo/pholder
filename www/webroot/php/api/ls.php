<?php require_once('../api.php'); ?>
<?php class ls extends \pholder\api {




    /** input **/
    private $input_path = null;




    /** get - file - details **/
    private function get_file_details($file) {
                $details = array();
                $details ['name'] = $file;
                if($this->input_path != "/"){
                    $details['path'] = $this->input_path.'/'.$file;
                } else {
                    $details['path'] = $this->input_path.$file;
                }
                $details['mime'] = mime_content_type($details['path']);
                $details['icon'] = $this->get_file_icon($details['mime']);
        return  $details;
    }

    /** get - file - icon **/
    private function get_file_icon($mime) {
        switch($mime) {
            case 'directory':
                return 'folder_open';
            default:
                return 'insert_drive_file';
        }
    }

    /** get - files - details **/
    private function get_files_details($files) {
                $files_with_details = array();
                foreach($files as $file) {
                    $files_with_details[] = $this->get_file_details($file);
                }
        return  $files_with_details;
    }





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
            $files = $this->get_files_details(scandir($this->input_path));
            return   $this->set_response_data($files);
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
