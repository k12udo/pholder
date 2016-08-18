<?php namespace pholder; ?>
<?php require_once('common/api.php'); ?>
<?php class download extends \pholder\common\api {




    /** __ - construct **/
    public function __construct() {
        return  $this->input();
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->download();
    }




    /** get **/
    private function download() {

        // ? - null
        if(is_null($this->input_path) ){
            $this->set_response_code(400);
            return false;
        }

        // headers - status - code
        http_response_code(200);

        // headers - download
        header('Content-Description: File Transfer');
        header('Content-Disposition: attachment; filename="'.basename($this->input_path).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($this->input_path));

        // clean & flush
        ob_clean();
        ob_end_flush();

        // iterate - file - chunks
        $handle = fopen($this->input_path, "rb");
        while (!feof($handle)) {
            echo fread($handle, 1000);
        }

        // return
        return true;

    }




} $download = new download(); ?>
