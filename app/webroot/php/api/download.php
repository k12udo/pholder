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




    /** | download **/

        private function download() {

            // ? - apache

            // ? - php
            if( strtolower(substr($_SERVER['SERVER_SOFTWARE'], 0, 3)) == 'php' ){
                return $this->download_php();
            }

            // ? - no - match
            return $this->download_php();

        }

        private function download_apache() {

        }

        private function download_php() {

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
            $fp = fopen($this->input_path, 'rb');
            fpassthru($fp);

            // return
            return true;

        }




} $download = new download(); ?>
