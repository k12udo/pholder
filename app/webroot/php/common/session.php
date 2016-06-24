<?php namespace pholder\common; ?>
<?php class session {



    /** input(s) **/
    private $path = null;



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
        $_SESSION['pholder']['total_size'] += $this->size_bytes;

        // return
        return true;
    }


    /** init **/
    private function init() {
        if( ! isset($_SESSION['pholder'])) {
            $_SESSION['pholder']                = array();
            $_SESSION['pholder']['path_prefix'] = "";
            $_SESSION['pholder']['path_suffix'] = "";
            $_SESSION['pholder']['paths']       = array();
            $_SESSION['pholder']['total_size']  = 0;
        }
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
