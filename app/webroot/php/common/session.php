<?php namespace pholder\common; ?>
<?php class session {




    /** global(s) **/
    private $path       = null;
    private $size_bytes = null;
    private $size_human = null;




    /** __ - construct **/
    public function __construct() {
        session_start();
        $this->init();
        return true;
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

    /** get **/
    public function get() {
        return $_SESSION['pholder'];
    }

    /** init **/
    private function init() {
        if( ! isset($_SESSION['pholder'])) {
            $_SESSION['pholder']                    = array();
            $_SESSION['pholder']['path_prefix']     = "";
            $_SESSION['pholder']['path_suffix']     = "";
            $_SESSION['pholder']['paths']           = array();
            $_SESSION['pholder']['size']            = array();
            $_SESSION['pholder']['size']['bytes']   = 0;
            $_SESSION['pholder']['size']['human']   = 0;
        }
        return true;
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

    /** set - size - bytes **/
    public function set_size_bytes($bytes) {
        $this->size_bytes = $bytes;
    }

    /** set - size - human **/
    public function set_size_human($human) {
        $this->size_human = $human;
    }




}?>
