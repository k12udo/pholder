<?php namespace pholder\common\c; ?>
<?php session_start();            ?>
<?php class session {




    /** global(s) **/
    private $path       = null;
    private $size_bytes = null;
    private $size_human = null;




    /** __ - construct **/
    public function __construct() {
        return $this->init();
    }


    /** add **/
    public function add() {

        // ? - already - added
        if(isset($_SESSION['pholder']['paths'][$this->path])){
            return true;
        }

        // add - session - path
        $_SESSION['pholder']['paths'][$this->path] = array(
            'size_bytes' => $this->size_bytes,
            'size_human' => $this->size_human
        );

        // add - session - total - size
        $_SESSION['pholder']['size']['bytes'] += $this->size_bytes;

        // return
        return true;

    }


    /** exists **/
    public function exists() {
        $return = false;
        foreach($_SESSION['pholder']['paths'] as $path => $sizes){
            if (strpos($path, $this->path) === 0) {
                $return = "ancestor";
            }
            if ($this->path == $path) {
                return "parent";
            }
            if (strpos($this->path, $path) === 0) {
                return "child";
            }
        }
        return $return;
    }


    /** get **/
    public function get() {
        return $_SESSION['pholder'];
    }

    /** get - sizes **/
    public function get_size() {
        return $_SESSION['pholder']['size'];
    }


    /** init **/
    private function init() {
        if( ! isset($_SESSION['pholder'])) {
            $_SESSION['pholder']                                = array();
            $_SESSION['pholder']['paths']                       = array();
            $_SESSION['pholder']['script']                      = array();
            $_SESSION['pholder']['script']['filename']          = "";
            $_SESSION['pholder']['script']['footer']            = array();
            $_SESSION['pholder']['script']['header']            = array();
            $_SESSION['pholder']['script']['interpreter']       = "";
            $_SESSION['pholder']['script']['path']              = array();
            $_SESSION['pholder']['script']['path']['prefix']    = "";
            $_SESSION['pholder']['script']['path']['suffix']    = "";
            $_SESSION['pholder']['size']                        = array();
            $_SESSION['pholder']['size']['bytes']               = 0;
        }
        return true;
    }


    /** is - empty **/
    public function is_empty() {
        if(count($_SESSION['pholder']['paths']) == 0){
            return true;
        } else {
            return false;
        }
    }


    /** remove **/
    public function rm() {

        // ? - already - removed
        if( ! isset($_SESSION['pholder']['paths'][$this->path])){
            return true;
        }

        // minus - session - total - size
        $_SESSION['pholder']['size']['bytes'] -= $_SESSION['pholder']['paths'][$this->path]['size_bytes'];

        // remove - session - path
        unset($_SESSION['pholder']['paths'][$this->path]);

        // return
        return true;

    }

    /** set - path **/
    public function set_path($path) {
        if(is_file($path) || is_dir($path)){
            $this->path = $path;
            return true;
        }
        return false;
    }

    /** set - path **/
    public function set_size_bytes($size_bytes) {
        $this->size_bytes = $size_bytes;
    }

    /** set - path **/
    public function set_size_human($size_human) {
        $this->size_human = $size_human;
    }




}?>
