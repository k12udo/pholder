<?php namespace pholder\api\session;                ?>
<?php require_once('../common/api.php');            ?>
<?php require_once('../common/class/session.php');  ?>
<?php require_once('../common/trait/path.php');     ?>
<?php class sample extends \pholder\common\api {




    /** global(s) **/
    private $session = null;

    /** sample - data **/
    private $sample_data = array(
        '/home/user',
        '/media/audio/music.mp3',
        '/media/image/photo.jpg',
        '/media/video/movie.mp4',
        '/var/www',
        '/var/log'
    );

    /** trait(s) **/
    use \pholder\common\t\path;




    /** __ - construct - start **/
    public function __construct() {
                $this->session = new \pholder\common\c\session();
        return  $this->sample();
    }

    /** __ - desconstruct - end **/
    public function __destruct() {
        return  $this->display_json();
    }


    /** sample **/
    private function sample() {

        // get - **ix
        $prefix = $_SESSION['pholder']['script']['path']['prefix'];
        $suffix = $_SESSION['pholder']['script']['path']['suffix'];

        // prepare - sample
        $sample = "";
        foreach( $this->sample_data as $path ){
            $sample .= "<tr>";
            $sample .= "<td class='amber-text  prefix'>$prefix</td>";
            $sample .= "<td class='light-blue-text path'>$path</td>";
            $sample .= "<td class='amber-text  suffix'>$suffix</td>";
            $sample .= "</tr>";
        }

        // set - response
        $this->set_response_code(200);
        $this->set_response_data(array($sample));

        // return
        return true;

    }




} $sample = new sample(); ?>
