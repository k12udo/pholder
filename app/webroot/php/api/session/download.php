<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php class download extends \pholder\common\api {




    /** global(s) **/
    private $input_filename  = null;




    /** __ - construct **/
    public function __construct() {
                $this->session = new \pholder\common\c\session();
                $this->input();
        return  true;
    }

    /** __ - destruct **/
    public function __destruct() {
        return  $this->download();
    }




    /** input - filename **/
    public function input_filename($filename) {
        $this->input_filename = $filename;
    }




    /** get **/
    private function download() {

        // headers - status - code
        http_response_code(200);

        // headers - plaintext
        header('Content-type: text/plain');

        // ? - headers - download
        if( $this->input_filename ){
            header("Content-Disposition: attachment; filename=".$this->input_filename);
        }

        // var - prefix/suffix
        $prefix = $_SESSION['pholder']['script']['path']['prefix'];
        $suffix = $_SESSION['pholder']['script']['path']['suffix'];

        // var - path - max - length
        $length_max = 0;
        foreach( $_SESSION['pholder']['paths'] as $path => $size ){
            if( strlen($path) > $length_max ){
                $length_max = strlen($path);
            }
        }
        $length_max = $length_max + 3;

        // fix - prefix - trailing - space
        if( substr($prefix, -1) != " " ){ $prefix .= " "; }

        // | script

            // print - session - script - interpreter
            print $_SESSION['pholder']['script']['interpreter']."\n";

            // print - session - script - header(s)
            foreach( $_SESSION['pholder']['script']['header'] as $line ){
                print $line."\n";
            }

            // print - session - path(s)
            foreach( $_SESSION['pholder']['paths'] as $path => $size ){
                printf("%s%-${length_max}s%s\n", $prefix, '"'.$path.'"', $suffix);
            }

            // print - session - script - footer(s)
            foreach( $_SESSION['pholder']['script']['footer'] as $line ){
                print $line."\n";
            }

        // script |

        // return
        return true;

    }




} $download = new download(); ?>
